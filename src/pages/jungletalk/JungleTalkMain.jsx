import React from "react";
import {
  Container,
  Section,
  Title,
  Description,
  SubTitle,
  QuestionList,
  QuestionCard,
  FloatingButton
} from "./JungleTalk.styles";

const JungleTalkMain = ({ setStep }) => {
  const dummyQuestions = Array(10).fill("비례대표와 지역감은 어떻게 다른건가요?");
  return (
    <Container>
      <Section>
        <Title>정글톡AI</Title>
        <Description>
          정치가 어렵게 느껴지시나요?
          <br />
          어디에 물어보기 망설여졌던 정치 관련 궁금증,
          <br />
          이제는 정글톡AI에게 편하게 물어보세요!
          <br />
          복잡한 정치 이슈도 중립적인 시선으로 쉽게 풀어드립니다.
        </Description>

        <SubTitle>다른 사람들의 궁금증</SubTitle>
        <QuestionList>
          {dummyQuestions.map((q, i) => (
            <QuestionCard key={i}>{q}</QuestionCard>
          ))}
        </QuestionList>
        <FloatingButton onClick={() => setStep(2)}>+ 질문하기</FloatingButton>
      </Section>
    </Container>
  );
};

export default JungleTalkMain;