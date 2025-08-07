import React from "react";
import {
  Container,
  Section,
  BackButton,
  Textarea,
  CheckBoxLabel,
  SubmitButton,
  FooterText,
} from "./JungleTalk.styles";
import BackIcon from "../../assets/icons/BackIcon.svg";

const JungleTalkQuestion = ({ question, setQuestion, isPrivate, setIsPrivate, setStep, handleSubmit }) => {
  return (
    <Container>
      <Section>
        <BackButton onClick={() => setStep(1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </BackButton>
        <Textarea
          placeholder={"고민이나 질문을 입력해주세요\n내용이 구체적일수록 답변이 정확해요"}
          maxLength={200}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <CheckBoxLabel>
          <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
          비공개 질문
        </CheckBoxLabel>
        <SubmitButton disabled={question.trim().length === 0} onClick={handleSubmit}>
          작성 완료
        </SubmitButton>
        <FooterText>
          정글톡AI는 단순 ChatGPT와 달리 존재하지 않는 답변을 인위적으로 생성하지 않으며, 정치적으로 편향된 해석을 줄 수 있는 답을 제공하지 않습니다. 헌법·법률·판례·행정관례에 기반해 중립적이고 정확하게 안내해드립니다.
        </FooterText>
      </Section>
    </Container>
  );
};

export default JungleTalkQuestion;