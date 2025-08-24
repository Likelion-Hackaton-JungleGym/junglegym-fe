import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getWeeklyNews } from "../../../shared/api/endpoints";
import { ICON_MAP } from "./CardNewsData";
import { CARD_MAP } from "./CardNewsData";
import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

function chooseIcon(category, key) {
  const c = String(category || "").trim();
  const list = ICON_MAP[c] ?? [];
  if (!list.length) return null;
  let h = 0;
  const s = String(key ?? "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return list[Math.abs(h) % list.length];
}

export default function CardNews() {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // ✅ 기본 지역 (필요하면 props나 전역 상태로 치환하기 쉬움)
  const DEFAULT_REGION = "성북구";

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        // ✅ regionName 파라미터를 함께 전달
        const json = await getWeeklyNews({
          signal: ctrl.signal,
          params: { regionName: DEFAULT_REGION },
        });

        const list = Array.isArray(json?.data) ? json.data : [];
        const toNum = (v) => (typeof v === "number" ? v : parseInt(v, 10) || 0);
        const sorted = list.slice().sort((a, b) => toNum(a.id) - toNum(b.id));
        const mapped = sorted.map((it, i) => ({
          id: it.id,
          newsCategory: it.newsCategory,
          title: it.title,
          oneLineContent: it.oneLineContent,
          summary: it.summary,
          date: it.date,
          link: it.link,
          card: CARD_MAP[i + 1] ?? CARD_MAP[(i % 6) + 1],
          mediaImgUrl: it.mediaImgUrl,
          media: it.media,
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

        // ✅ 상태코드/본문 함께 출력
        console.error(
          "getWeeklyNews 실패:",
          err.userMessage || err.message,
          "| status:",
          err.response?.status,
          "| body:",
          err.response?.data
        );

        setItems([]);
      }
    })();
    return () => ctrl.abort();
  }, []); // DEFAULT_REGION을 바꿔서 재호출하고 싶다면 deps에 추가

  const len = items.length;
  const item = items[current];
  const prevIndex = (current - 1 + len) % Math.max(1, len || 1);
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

  const iconSrc = useMemo(() => (item ? chooseIcon(item.newsCategory, item.id) : null), [item]);

  if (!len) {
    return (
      <Wrapper>
        <Date>25년 8월 3주차</Date>
        <Empty>뉴스를 불러오는 중...</Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Date>25년 8월 3주차</Date>

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
              <IconWrapper>{!!iconSrc && <OverlayIcon src={iconSrc} alt="" />}</IconWrapper>
              {item.title && <OverlayTitle>{item.title}</OverlayTitle>}
              {item.oneLineContent && <OverlayDesc>{item.oneLineContent}</OverlayDesc>}
            </CompactOverlay>
          ) : (
            <ExpandedOverlay>
              {item.title && <OverlayTitle2>{item.title}</OverlayTitle2>}
              {item.summary && <OverlayBody>{item.summary}</OverlayBody>}
              <FooterRow>
                <FooterLeft>
                  <Media>{item.media && <span className="media">{item.media}</span>}</Media>
                  <Source>{item.date && <span className="date">{item.date}</span>}</Source>
                </FooterLeft>
                <FootrtRight>
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
                </FootrtRight>
              </FooterRow>
              <GraphWrapper>
                {item.mediaImgUrl && (
                  <GraphImg src={item.mediaImgUrl} alt="" loading="lazy" decoding="async" />
                )}
              </GraphWrapper>
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

/* ---------- styles ---------- */
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

const Date = styled.div`
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
  transform: scale(0.9);
  transform-origin: center;
  overflow: hidden;
  filter: blur(0.2px);
  opacity: 0.92;
`;

const PrevPeek = styled(PeekBase)`
  clip-path: inset(0 calc(100% - ${PEEK_WIDTH}px) 0 0);
  left: -3%;
`;
const NextPeek = styled(PeekBase)`
  clip-path: inset(0 0 0 calc(100% - ${PEEK_WIDTH}px));
  right: -3%;
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
  bottom: 10px;
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
  justify-content: center;
  text-align: center;
  padding: 0px 20px 40px;
  color: #fff;
  z-index: 3;
  pointer-events: none;
  gap: 6px;
`;

const IconWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
`;

const OverlayIcon = styled.img`
  width: 230px;
  height: 200px;
  z-index: 1;
  transform: translateY(-10px);
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
  max-height: calc(2 * 1.35em);
  margin-top: -30px;
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

const ExpandedOverlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  color: #fff;
  z-index: 3;
  pointer-events: none;
  gap: 10px;
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
  padding: 0px 0px 10px;
  //margin-top: 5px;
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

const Dots = styled.div`
  position: absolute;
  display: flex;
  bottom: 38px;
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

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  // margin-top: 30px;
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 1px;
  align-items: center;
`;
const FootrtRight = styled.div``;

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
  padding: 3px 18px;
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
