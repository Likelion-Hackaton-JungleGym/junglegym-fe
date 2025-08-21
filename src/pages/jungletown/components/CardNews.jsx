import { useState } from "react";
import styled from "styled-components";

import { CARDNEWS } from "./CardNewsData";
import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

export default function CardNews() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const len = CARDNEWS.length;
  const item = CARDNEWS[current];

  const prevIndex = (current - 1 + len) % len;
  const nextIndex = (current + 1) % len;

  const prev = () => {
    setCurrent((i) => (i === 0 ? len - 1 : i - 1));
    setExpanded(false);
  };
  const next = () => {
    setCurrent((i) => (i === len - 1 ? 0 : i + 1));
    setExpanded(false);
  };

  return (
    <Wrapper>
      <Date>25년 8월 1주차</Date>

      <Viewport>
        {/* ---- 배경: 이전/다음 카드 프리뷰 ---- */}
        <PrevPeek aria-hidden>
          <PeekImg src={CARDNEWS[prevIndex]?.card} alt="" />
        </PrevPeek>
        <NextPeek aria-hidden>
          <PeekImg src={CARDNEWS[nextIndex]?.card} alt="" />
        </NextPeek>

        {/* ---- 카드 ---- */}
        <Card
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} / ${len}`}
          onClick={() => setExpanded((v) => !v)}
        >
          <MainImg src={item.card} alt="" />

          {!expanded ? (
            <CompactOverlay>
              {item.icon && <OverlayIcon src={item.icon} alt="" />}
              {item.title && <OverlayTitle>{item.title}</OverlayTitle>}
              {item.content1 && <OverlayDesc>{item.content1}</OverlayDesc>}
            </CompactOverlay>
          ) : (
            <ExpandedOverlay>
              {item.title && <OverlayTitle2>{item.title}</OverlayTitle2>}
              {item.content2 && <OverlayBody>{item.content2}</OverlayBody>}
              <FooterRow>
                <Source>
                  {item.name && <span>{item.name}</span>}
                  {item.date && <span className="date">{item.date}</span>}
                </Source>

                {item.newslink && (
                  <ArticleBtn
                    href={item.newslink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    원문 기사 보기
                  </ArticleBtn>
                )}
              </FooterRow>
              {item.graph && <GraphImg src={item.graph} alt="" />}
            </ExpandedOverlay>
          )}
        </Card>

        {/* ---- 화살표 & 점 ---- */}
        <ArrowLeft onClick={prev} aria-label="이전">
          <ArrowIcon src={leftButton} alt="" />
        </ArrowLeft>
        <ArrowRight onClick={next} aria-label="다음">
          <ArrowIcon src={rightButton} alt="" />
        </ArrowRight>

        <Dots>
          {CARDNEWS.map((_, i) => (
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
  margin: 0 0 55px;
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

/* ===== 배경 프리뷰 (이전/다음) ===== */
const PeekBase = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.96);
  transform-origin: center;
  //border-radius: 16px;
  overflow: hidden;
  filter: blur(0.2px); /* 미세하게 경계 부드럽게 */
  opacity: 0.92;
`;

const PrevPeek = styled(PeekBase)`
  clip-path: inset(0 calc(100% - ${PEEK_WIDTH}px) 0 0);
  left: -2%; //왜 늘리면 짤려보이지 모서리가
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

/* ===== 카드 ===== */
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); //밑에도 보이고 더 사아아하게
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* ===== Compact (축약) ===== */
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

/* ===== Expanded (확장) ===== */
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

/* ===== Arrows & Dots ===== */
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

/* ===== Footer ===== */
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
