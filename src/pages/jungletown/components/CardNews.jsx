import { useState } from "react";
import styled from "styled-components";

import CardNews1 from "../components/img/CardNews1.svg?url";
import CardNews2 from "../components/img/CardNews2.svg?url";
import CardNews3 from "../components/img/CardNews3.svg?url";
import CardNews4 from "../components/img/CardNews4.svg?url";
import CardNews5 from "../components/img/CardNews5.svg?url";

import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

//import Group9962 from "../components/img/Group9962.svg";

export default function CardNews() {
  const images = [CardNews1, CardNews2, CardNews3, CardNews4, CardNews5];
  const [current, setCurrent] = useState(0);

  const prevIndex = (current - 1 + images.length) % images.length;
  const nextIndex = (current + 1) % images.length;

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  const meta = [
    {
      icon: "사회",
      title: "성북, 자치회관 프로그램 온라인 접수",
      desc: "누구나 클릭 한 번으로 신청 가능",
    },
    { icon: "경제", title: "제목 2", desc: "설명 2 ..." },
    // ...
  ];
  return (
    <Wrapper>
      <Date>25년 8월 1주차</Date>

      <Viewport>
        <PrevPeek>
          <PeekImg src={images[prevIndex]} />
        </PrevPeek>
        <NextPeek>
          <PeekImg src={images[nextIndex]} />
        </NextPeek>
        <Card>
          <MainImg src={images[current]} alt={`card-${current + 1}`} />
          <Overlay>
            {meta[current]?.icon && <OverlayIcon>{meta[current].icon}</OverlayIcon>}
            {meta[current]?.title && <OverlayTitle>{meta[current].title}</OverlayTitle>}
            {meta[current]?.desc && <OverlayDesc>{meta[current].desc}</OverlayDesc>}
          </Overlay>
        </Card>

        <ArrowLeft onClick={prev} aria-label="이전">
          <ArrowIcon src={leftButton} alt="" />
        </ArrowLeft>
        <ArrowRight onClick={next} aria-label="다음">
          <ArrowIcon src={rightButton} alt="" />
        </ArrowRight>
        <Dots>
          {images.map((_, i) => (
            <Dot key={i} $active={i === current} onClick={() => setCurrent(i)} />
          ))}
        </Dots>
      </Viewport>
    </Wrapper>
  );
}

const PEEK_WIDTH = 50;
const GUTTER = 18;

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
  font-size: 16px;
  font-weight: 600;
  padding: 15px 10px 10px;
`;

const Viewport = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 95%;
  height: 320px; //나중에
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;

const Card = styled.div`
  position: absolute;
  top: 0;
  left: ${GUTTER}px;
  right: ${GUTTER}px;
  bottom: 0;
  border-radius: 16px;
  overflow: hidden;
  z-index: 2;
  border-radius: 16px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0; /* 카드 전체 덮기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 20px 66px; /* 하단 점(dot)과 간격 */
  color: #fff;
  z-index: 3;
  pointer-events: none; /* 오버레이 위에서도 화살표 클릭 되게 */
`;

const OverlayIcon = styled.div`
  margin-bottom: 10px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
`;
//나중에 이미지로 바꾸기

const OverlayTitle = styled.div`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 90%;
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
`;

const OverlayDesc = styled.div`
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  opacity: 0.9;
  max-width: 85%;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 스샷처럼 한 줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PeekBase = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.9);
  transform-origin: center;
  border-radius: 16px;
  overflow: hidden;
`;

const PeekImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PrevPeek = styled(PeekBase)`
  clip-path: inset(0 calc(100% - ${PEEK_WIDTH}px) 0 0);
  left: -3%;
`;

const NextPeek = styled(PeekBase)`
  clip-path: inset(0 0 0 calc(100% - ${PEEK_WIDTH}px));
  right: -3%;
`;

const ArrowBase = styled.button`
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  box-shadow: none;
  cursor: pointer;
  z-index: 4;
  display: grid;
  place-items: center;
  padding: 0;
`;

const ArrowLeft = styled(ArrowBase)`
  left: ${GUTTER - 10}px;
`;
const ArrowRight = styled(ArrowBase)`
  right: ${GUTTER - 10}px;
`;

const Dots = styled.div`
  position: absolute;
  display: flex;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
  justify-content: center;
  align-items: center;
  gap: 6px;
  z-index: 5;
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  display: block;
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
