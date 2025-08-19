import { useState } from "react";
import styled from "styled-components";

import { CARDNEWS } from "./CardNewsData";
import bgImg from "./img/bgCard.svg";

import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

export default function CardNews() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false); // 확장 여부
  const len = CARDNEWS.length;
  const item = CARDNEWS[current];

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
        <BgImg src={bgImg} alt="" />

        {/* 카드 */}
        <Card
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} / ${len}`}
          onClick={() => setExpanded((v) => !v)} // 클릭 시 토글
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
                    onClick={(e) => e.stopPropagation()} // 카드 클릭 토글 방지
                  >
                    원문 기사 보기
                  </ArticleBtn>
                )}
              </FooterRow>
              {item.graph && <GraphImg src={item.graph} alt="" />}
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
          {CARDNEWS.map((_, i) => (
            <Dot
              key={i}
              $active={i === current}
              onClick={() => {
                setCurrent(i);
                setExpanded(false);
              }}
            />
          ))}
        </Dots>
      </Viewport>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const GUTTER = 10;

const Wrapper = styled.div`
  margin-bottom: 55px;
  max-width: 420px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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
  width: 95%;
  height: 320px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;

const BgImg = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  width: 340px;
  height: 292px;
  transform: translateY(-53%);
  z-index: 0;
`;

const Card = styled.div`
  position: absolute;
  inset: 0;
  left: ${GUTTER}px;
  right: ${GUTTER}px;
  border-radius: 16px;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
`;

const MainImg = styled.img`
  width: 320px;
  height: 300px;
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
  width: 200px;
  height: 200px;
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

const OverlayTitle2 = styled.div`
  margin: 0 0 8px;
  font-size: 21px;
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

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 왼쪽/오른쪽 정렬 */
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
  pointer-events: auto; /* ExpandedOverlay가 pointer-events:none 이라 버튼만 활성화 */
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
