import React from "react";
import {
  Container,
  Section,
  Title,
  Description,
  FloatingButton,
  Highlight,
} from "./JungleTalk.styles";

import OtherQuestion from "./OtherQuestion";
import styled from "styled-components";

const JungleTalkMain = ({ setStep, onQuestionClick, questions }) => {
  return (
    <Mainwrapper>
      <Container $isStep3={false}>
        <Section>
          <Title>
            정글챗AI
            <Highlight />
          </Title>

          <Description>
            정치가 어렵게 느껴지시나요?
            <br />
            어디에 물어보기 망설여졌던 정치 관련 궁금증,
            <br />
            이제는 정글챗AI에게 편하게 물어보세요!
            <br />
            복잡한 정치 이슈도 중립적인 시선으로 쉽게 풀어드립니다.
          </Description>

          <OtherQuestion
            title="다른 사람들의 궁금증"
            questions={questions}
            onClick={(i, q) => onQuestionClick?.(q)}
          />
          <FloatingButton onClick={() => setStep(2)}>+ 질문하기</FloatingButton>
        </Section>
      </Container>
    </Mainwrapper>
  );
};

export default JungleTalkMain;

const Mainwrapper = styled.div`
  margin-top: 50px;
`;
