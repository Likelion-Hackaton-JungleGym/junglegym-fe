import React, { useMemo } from "react";
import {
  Container,
  TopImageWrapper,
  OverlayText,
  WhiteContainer,
  MyQuestion,
  AnswerText,
  AbsoluteBackButton,
  SubTitle,
} from "./JungleTalk.styles";
import BackIcon from "../../assets/icons/BackIcon.svg";
import LawImage from "../../assets/images/LawImage.png";
import OtherQuestion from "./OtherQuestion";

const lawImages = Array(10).fill(LawImage);

const JungleTalkAnswer = ({ question, answer, lawText, setStep }) => {
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * lawImages.length);
    return lawImages[randomIndex];
  }, []);
  return (
    <Container $isStep3={true}>
      <TopImageWrapper $bg={randomImage}>
        <AbsoluteBackButton onClick={() => setStep(1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </AbsoluteBackButton>
        <OverlayText>{lawText}</OverlayText>
      </TopImageWrapper>
      <WhiteContainer>
        <MyQuestion>
          <SubTitle>
            <strong>나의 질문</strong>
            <br />
          </SubTitle>

          {question}
        </MyQuestion>
        <AnswerText>
          <SubTitle>
            <strong>정글톡</strong>
            <br />
          </SubTitle>

          {answer}
        </AnswerText>
        <OtherQuestion
          title="다른 사람들의 질문"
          showCheckAnswer={true}
          onClick={(i, q) => console.log("클릭한 질문:", q)}
        />
      </WhiteContainer>
    </Container>
  );
};

export default JungleTalkAnswer;
