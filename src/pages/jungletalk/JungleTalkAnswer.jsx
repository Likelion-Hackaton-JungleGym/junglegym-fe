import React from "react";
import {
  Container,
  TopImageWrapper,
  OverlayText,
  WhiteContainer,
  MyQuestion,
  AnswerText,
  SubTitle,
  QuestionList,
  QuestionCard
} from "./JungleTalk.styles";
import LawImage from "../../assets/images/LawImage.png";

const JungleTalkAnswer = ({ question, answer, lawText, dummyQuestions }) => {
  return (
    <Container>
      <TopImageWrapper>
        <img src={LawImage} alt="법 관련 이미지" />
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
        <SubTitle>다른 사람들의 질문</SubTitle>
        <QuestionList>
          {dummyQuestions.map((q, i) => (
            <QuestionCard key={i}>{q}</QuestionCard>
          ))}
        </QuestionList>
      </WhiteContainer>
    </Container>
  );
};

export default JungleTalkAnswer;
