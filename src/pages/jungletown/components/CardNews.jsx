import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
// 🔁 새 API 유틸
import { getWeeklyNewsByRegion } from "../../../shared/utils/newsApi";
import { getCurrentKoreanWeekLabel } from "../../../shared/utils/dateUtils";

import { ICON_MAP } from "./CardNewsData";
import { CARD_MAP } from "./CardNewsData";
import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

/* ---------- utils ---------- */

function truncateText(str = "", max = 32) {
  if (str.length <= max) return str;
  return str.slice(0, max) + "…"; //점점점대신 뭔가 바꾸고 싶음
}

function chooseIcon(category, key) {
  const c = String(category || "").trim();
  const list = ICON_MAP[c] ?? [];
  if (!list.length) return null;
  let h = 0;
  const s = String(key ?? "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return list[Math.abs(h) % list.length];
}
const buildKey = (region, it) =>
  `${region}__${it?.id ?? ""}__${it?.link ?? ""}__${it?.title ?? ""}`;

/* ---------- component ---------- */
const DEFAULT_REGION = "성북구";

export default function CardNews({ regions }) {
  const [searchParams] = useSearchParams();
  const [weekLabel, setWeekLabel] = useState("");

  useEffect(() => {
    setWeekLabel(getCurrentKoreanWeekLabel(new Date()));
  }, []);

  // URL > props(배열/문자열) > sessionStorage > 기본값
  const region = useMemo(() => {
    const fromUrl = searchParams.get("region");
    if (fromUrl) return decodeURIComponent(fromUrl);
    if (Array.isArray(regions) && regions[0]) return regions[0];
    if (typeof regions === "string" && regions) return regions;
    return sessionStorage.getItem("selectedRegion") || DEFAULT_REGION;
  }, [regions, searchParams]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        console.log("[CardNews] fetch start:", region);
        const list = await getWeeklyNewsByRegion(region, { signal: ctrl.signal });

        // 카드 매핑 + 안정 키 + 지역 표시
        const mapped = list.map((it, i) => ({
          region,
          key: buildKey(region, it),
          ...it,
          card: CARD_MAP[(i % 6) + 1], // 1~6 반복
        }));

        setItems(mapped);
        setCurrent(0);
        setExpanded(false);
      } catch (err) {
        if (
          axios.isCancel?.(err) ||
          err?.code === "ERR_CANCELED" ||
          err?.name === "CanceledError" ||
          err?.message === "canceled"
        ) {
          return;
        }
        console.error(
          `[CardNews] getWeeklyNewsByRegion 실패(${region}):`,
          err.userMessage || err.message,
          "| status:",
          err.response?.status,
          "| body:",
          err.response?.data
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [region]);

  const len = items.length;
  const item = items[current];

  const prevIndex = (current - 1 + Math.max(1, len)) % Math.max(1, len || 1);
  const nextIndex = (current + 1) % Math.max(1, len || 1);

  const prev = () => {
    if (!len) return;
    setCurrent((i) => (i === 0 ? len - 1 : i - 1));
    setExpanded(false);
  };
  const next = () => {
    if (!len) return;
    setCurrent((i) => (i === len - 1 ? 0 : i + 1));
    setExpanded(false);
  };

  const iconSrc = useMemo(() => (item ? chooseIcon(item.newsCategory, item.key) : null), [item]);
  if (loading) {
    return (
      <Wrapper>
        <WeekLabel>{weekLabel}</WeekLabel>
        <Empty>뉴스를 불러오는 중...</Empty>
      </Wrapper>
    );
  }
  if (!len) {
    return (
      <Wrapper>
        <WeekLabel>{weekLabel}</WeekLabel>
        <Empty>이 지역의 주간 뉴스가 없어요.</Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <WeekLabel>{weekLabel}</WeekLabel>

      <Viewport>
        <PrevPeek aria-hidden>
          <PeekImg src={items[prevIndex]?.card} alt="" />
        </PrevPeek>
        <NextPeek aria-hidden>
          <PeekImg src={items[nextIndex]?.card} alt="" />
        </NextPeek>

        <Card
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} / ${len}`}
          onClick={() => setExpanded((v) => !v)}
        >
          <MainImg src={item.card} alt="" loading="lazy" decoding="async" />

          {!expanded ? (
            <CompactOverlay>
              <RegionChip>{item.region}</RegionChip>
              <IconWrapper>{!!iconSrc && <OverlayIcon src={iconSrc} alt="" />}</IconWrapper>
              {item.title && <OverlayTitle>{item.title}</OverlayTitle>}
              {item.oneLineContent && <OverlayDesc>{item.oneLineContent}</OverlayDesc>}
            </CompactOverlay>
          ) : (
            <ExpandedOverlay>
              <RegionChip>{item.region}</RegionChip>
              {item.title && <OverlayTitle2>{truncateText(item.title, 32)}</OverlayTitle2>}
              {item.summary && <OverlayBody>{item.summary}</OverlayBody>}
              <BottomStack>
                <GraphWrapper>
                  {item.mediaImgUrl && (
                    <GraphImg src={item.mediaImgUrl} alt="" loading="lazy" decoding="async" />
                  )}
                </GraphWrapper>
                <FooterRow>
                  <FooterLeft>
                    <Media>{item.media && <span className="media">{item.media}</span>}</Media>
                    <Source>{item.date && <span className="date">{item.date}</span>}</Source>
                  </FooterLeft>
                  <FooterRight>
                    {item.link && (
                      <ArticleBtn
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        원문 기사 보기
                      </ArticleBtn>
                    )}
                  </FooterRight>
                </FooterRow>
              </BottomStack>
            </ExpandedOverlay>
          )}
        </Card>

        <ArrowLeft onClick={prev} aria-label="이전">
          <ArrowIcon src={leftButton} alt="" />
        </ArrowLeft>
        <ArrowRight onClick={next} aria-label="다음">
          <ArrowIcon src={rightButton} alt="" />
        </ArrowRight>

        <Dots>
          {items.map((_, i) => (
            <Dot
              key={i}
              $active={i === current}
              onClick={() => {
                setCurrent(i);
                setExpanded(false);
              }}
              aria-label={`${i + 1}번으로 이동`}
            />
          ))}
        </Dots>
      </Viewport>
    </Wrapper>
  );
}

/* ---------- styles (기존 그대로) ---------- */
const GUTTER = 7;
const PEEK_WIDTH = 50;

const Wrapper = styled.div`
  max-width: 420px;
  width: 100%;
  margin: 0px 0px 55px;
  padding: 0px 0px;
`;
const Empty = styled.div`
  color: #666;
  text-align: center;
  padding: 20px 0 40px;
`;

const WeekLabel = styled.div`
  color: #111;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  padding: 15px 10px 5px;
`;

const Viewport = styled.div`
  position: relative;
  width: 350px;
  height: 320px;
  margin: 0 auto;
  border-radius: 16px;
`;

const PeekBase = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.93);
  transform-origin: center;
  overflow: hidden;
  filter: blur(0.2px);
  opacity: 0.92;
`;

const PrevPeek = styled(PeekBase)`
  clip-path: inset(0 calc(100% - ${PEEK_WIDTH}px) 0 0);
  left: -2%;
  bottom: 3%;
`;
const NextPeek = styled(PeekBase)`
  clip-path: inset(0 0 0 calc(100% - ${PEEK_WIDTH}px));
  right: -2%;
  bottom: 3%;
`;

const PeekImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Card = styled.div`
  position: absolute;
  top: 0;
  left: ${GUTTER}px;
  right: ${GUTTER}px;
  border-radius: 16px;
  //  bottom: 10px;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
  transform: scale(0.95);
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CompactOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding: 0 20px 45px;
  color: #fff;
  z-index: 3;
  pointer-events: none;
  gap: 8px;
`;

const RegionChip = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  pointer-events: none;
  z-index: 4;
`;

const IconWrapper = styled.div`
  width: clamp(160px, 42vw, 200px);
  height: clamp(120px, 38vw, 170px);
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
`;

const OverlayIcon = styled.img`
  width: 230px;
  height: 200px;
  z-index: 1;
  transform: translateY(-6px);
`;

const OverlayTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.35;
  max-width: 90%;
  max-height: calc(2 * em);
  position: relative;
  z-index: 2;
`;

const OverlayDesc = styled.div`
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  opacity: 0.9;
  max-width: 85%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  z-index: 2;
`;

//----------------------------------

const ExpandedOverlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 30px 30px 40px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  color: #fff;
  z-index: 3;
  pointer-events: none;
`;

const BottomStack = styled.div`
  display: flex;
  flex-direction: column;
  //  gap: 10px;
  margin-top: auto;
  pointer-events: none;
`;

const OverlayTitle2 = styled.div`
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 95%;
  white-space: pre-line;
`;

const OverlayBody = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
`;

const GraphImg = styled.img`
  align-self: center;
  width: 100%;
  max-width: 330px;
  height: auto;
  opacity: 0.9;
`;

const GraphWrapper = styled.div`
  padding: 5px 0px;
  pointer-events: none;
  //  margin-bottom: -15px;
`;

const ArrowBase = styled.button`
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  z-index: 4;
  display: grid;
  place-items: center;
  padding: 0;
`;

const ArrowLeft = styled(ArrowBase)`
  left: ${GUTTER - 8}px;
`;
const ArrowRight = styled(ArrowBase)`
  right: ${GUTTER - 8}px;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  // pointer-events: auto; /* 버튼 클릭 가능 */
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 2px;
  padding: 3px 0px;
`;
const FooterRight = styled.div``;

const Media = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
`;

const Source = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  .date {
    opacity: 0.9;
  }
`;

const ArticleBtn = styled.a`
  pointer-events: auto;
  display: inline-block;
  padding: 2.5px 16px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 200;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  transition: background 120ms ease, transform 120ms ease;
  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const Dots = styled.div`
  position: absolute;
  display: flex;
  bottom: 35px;
  transform: translateX(-50%);
  left: 50%;
  justify-content: center;
  align-items: center;
  gap: 6px;
  z-index: 5;
`;

const Dot = styled.button`
  width: ${(p) => (p.$active ? 7 : 4)}px;
  height: ${(p) => (p.$active ? 7 : 4)}px;
  border-radius: 50%;
  border: none;
  background: ${(p) => (p.$active ? "#FFFFFF" : "#e0e0e0")};
  cursor: pointer;
  transition: all 160ms ease;
`;
