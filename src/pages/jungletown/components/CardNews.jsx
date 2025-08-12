import { useState } from "react";
import styled from "styled-components";

import CardNews1 from "../components/img/CardNews1.svg?url";
import CardNews2 from "../components/img/CardNews2.svg?url";
import CardNews3 from "../components/img/CardNews3.svg?url";
import CardNews4 from "../components/img/CardNews4.svg?url";
import CardNews5 from "../components/img/CardNews5.svg?url";

import leftButton from "../components/img/leftButton.svg?url";
import rightButton from "../components/img/rightButton.svg?url";

export default function CardNews() {
  const images = [CardNews1, CardNews2, CardNews3, CardNews4, CardNews5];
  const [current, setCurrent] = useState(0);

  const prevIndex = (current - 1 + images.length) % images.length;
  const nextIndex = (current + 1) % images.length;

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

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
  font-size: 19px;
  font-weight: 600;
  padding: 10px;
`;

const Viewport = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 320px;
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
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  bottom: 30px;
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
