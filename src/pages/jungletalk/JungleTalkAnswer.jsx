import React, { useMemo } from "react";
import {
  Container,
  TopImageWrapper,
  OverlayText,
  WhiteContainer,
  MyQuestion,
  AnswerText,
  BackButton,
} from "./JungleTalk.styles";
import BackIcon from "../../assets/icons/BackIcon.svg";
import LawImage from "../../assets/images/LawImage.png";
import OtherQuestion from "./OtherQuestion";

const lawImages = Array(10).fill(LawImage);

//배경이미지 랜덤으로
const JungleTalkAnswer = ({ question, answer, lawText, dummyQuestions, setStep }) => {
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * lawImages.length);
    return lawImages[randomIndex];
  }, []);
  return (
    <Container>
      <BackButton onClick={() => setStep(2)}>
        <img src={BackIcon} alt="뒤로가기" />
      </BackButton>
      <TopImageWrapper>
        <img src={randomImage} alt="법 관련 이미지" />
        <OverlayText>
          <p>{lawText}</p>
        </OverlayText>
      </TopImageWrapper>
      <WhiteContainer>
        <MyQuestion>
          <strong>나의 질문</strong>
          <br />
          {question}
        </MyQuestion>
        <AnswerText>
          <strong>정글톡</strong>
          <br />
          {answer}
        </AnswerText>
        <OtherQuestion
          title="다른 사람들의 궁금증"
          questions={dummyQuestions}
          onClick={(i, q) => console.log("클릭한 질문:", q)}
        />
      </WhiteContainer>
    </Container>
  );
};

export default JungleTalkAnswer;
