// CardNews.jsx
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ICON_MAP } from "./CardNewsData";
import { CARD_MAP } from "./CardNewsData";
import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

// 아이템 기준 "고정 랜덤"으로 아이콘 선택(깜빡임 X)
// 바꿔가며 랜덤으로 보고 싶으면 아래 useMemo 대신 Math.random() 쓰면 됨
function chooseIcon(category, key) {
  const list = ICON_MAP[category] ?? [];
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

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/regions/weeklynews");
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];

        const mapped = list.map((it) => ({
          id: it.id,
          newsCategory: it.newsCategory,
          title: it.title,
          oneLineContent: it.oneLineContent,
          summary: it.summary,
          date: it.date,
          link: it.link,
          card: CARD_MAP[it.id], // ← 아이디값으로 카드 지정
          mediaImgUrl: it.mediaImgUrl, // ← 그래프는 mediaImgUrl
        }));

        setItems(mapped);
        setCurrent(0);
        setExpanded(false);
      } catch (e) {
        console.error("weeklynews fetch 실패:", e);
        setItems([]);
      }
    })();
  }, []);

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

  // 고정 랜덤 아이콘
  const iconSrc = useMemo(() => (item ? chooseIcon(item.newsCategory, item.id) : null), [item]);

  // 로딩/빈 상태
  if (!len) {
    return (
      <Wrapper>
        <Date>25년 8월 1주차</Date>
        <Empty>지난주 뉴스가 없거나 불러오는 중이에요.</Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Date>25년 8월 1주차</Date>

      <Viewport>
        {/* 배경: 이전/다음 프리뷰 */}
        <PrevPeek aria-hidden>
          <PeekImg src={items[prevIndex]?.card} alt="" />
        </PrevPeek>
        <NextPeek aria-hidden>
          <PeekImg src={items[nextIndex]?.card} alt="" />
        </NextPeek>

        {/* 카드 */}
        <Card
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} / ${len}`}
          onClick={() => setExpanded((v) => !v)}
        >
          <MainImg src={item.card} alt="" />

          {!expanded ? (
            <CompactOverlay>
              {!!iconSrc && <OverlayIcon src={iconSrc} alt="" />}
              {item.title && <OverlayTitle>{item.title}</OverlayTitle>}
              {item.oneLineContent && <OverlayDesc>{item.oneLineContent}</OverlayDesc>}
            </CompactOverlay>
          ) : (
            <ExpandedOverlay>
              {item.title && <OverlayTitle2>{item.title}</OverlayTitle2>}
              {item.summary && <OverlayBody>{item.summary}</OverlayBody>}
              <FooterRow>
                <Source>{item.date && <span className="date">{item.date}</span>}</Source>

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
              </FooterRow>
              {/* 그래프 */}
              {item.mediaImgUrl && <GraphImg src={item.mediaImgUrl} alt="" />}
            </ExpandedOverlay>
          )}
        </Card>

        {/* 화살표 & 점 */}
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

/* ---------- styles (기존 유지) ---------- */
const GUTTER = 7;
const PEEK_WIDTH = 50;

const Wrapper = styled.div`
  max-width: 420px;
  width: 100%;
  margin: 0 0 55px;
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
  padding: 15px 10px 10px;
`;

const Viewport = styled.div`
  position: relative;
  width: 350px;
  height: 320px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;

const PeekBase = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.96);
  transform-origin: center;
  overflow: hidden;
  filter: blur(0.2px);
  opacity: 0.92;
`;

const PrevPeek = styled(PeekBase)`
  clip-path: inset(0 calc(100% - ${PEEK_WIDTH}px) 0 0);
  left: -2%;
`;
const NextPeek = styled(PeekBase)`
  clip-path: inset(0 0 0 calc(100% - ${PEEK_WIDTH}px));
  right: -2%;
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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
  padding: 0px 20px 60px;
  color: #fff;
  z-index: 3;
  pointer-events: none;
  gap: 6px;
`;

const OverlayIcon = styled.img`
  width: 180px;
  height: 180px;
`;

const OverlayTitle = styled.div`
  margin: 0 0 8px;
  font-size: 23px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 90%;
  white-space: pre-line;
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
  overflow: hidden;
`;

const ExpandedOverlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 18px 20px;
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
  font-size: 21px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 90%;
  white-space: pre-line;
`;

const OverlayBody = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
`;

const GraphImg = styled.img`
  align-self: center;
  width: 92%;
  max-width: 330px;
  height: auto;
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
  left: ${GUTTER - 13}px;
`;
const ArrowRight = styled(ArrowBase)`
  right: ${GUTTER - 12}px;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
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
  width: ${(p) => (p.$active ? 7 : 5)}px;
  height: ${(p) => (p.$active ? 7 : 5)}px;
  border-radius: 50%;
  border: none;
  background: ${(p) => (p.$active ? "#FFFFFF" : "#e0e0e0")};
  cursor: pointer;
  transition: all 160ms ease;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
  padding: 5px 10px;
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
