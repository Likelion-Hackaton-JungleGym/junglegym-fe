import React from "react";
import { 
  SubTitle, 
  SectionTitle,
  QuestionList,
  QuestionCard,
  OtherQuestionContainer, 
  QuestionItem,
  QuestionText, 
  CheckAnswerText,
  QuestionDivider,
  QuestionCount
} from "./JungleTalk.styles";
import styled from "styled-components";

const ListQuestionText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OtherQuestion = ({ title, questions, onClick, showCheckAnswer = false, variant = "card" }) => {
  const defaultQuestions = [
    "비례대표와 지역갑을은 어떻게 다른건가요?",
    "국회의원은 몇 명이고, 다 뭐 하는 사람들이에요?",
    "정당이 많던데, 무소속이랑 정당 후보는 뭐가 달라?",
    "뉴스에서 비례 몇 석 가져간다 이런 건 무슨 뜻이야?",
    "선거 공보물 진짜 봐야 돼? 뭘 보고 판단해요?",
    "의원이 법안 발의했다는데, 그게 통과되려면 뭐가 필요한데?",
    "정책은 많은데 왜 내 삶은 그대로일까?",
    "안녕하세용",
    "배고파용",
    "너무졸리당"
  ];

  const displayQuestions = questions || defaultQuestions;

  // step1 (메인) - 카드 형식
  if (variant === "card") {
    return (
      <>
        <SectionTitle>{title}</SectionTitle>
        <QuestionList>
          {displayQuestions.map((question, i) => (
            <QuestionCard key={i} onClick={() => onClick?.(i, question)}>
              <div>
                <QuestionText>{question}</QuestionText>
                {showCheckAnswer && (
                  <CheckAnswerText>답변을 확인해보세요 {'>'}</CheckAnswerText>
                )}
              </div>
            </QuestionCard>
          ))}
        </QuestionList>
      </>
    );
  }

  // step3 (답변 화면) - 리스트 형식
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SectionTitle>{title}</SectionTitle>
      </div>
      <OtherQuestionContainer>
        {displayQuestions.map((question, i) => (
          <React.Fragment key={i}>
            <QuestionItem onClick={() => onClick?.(i, question)}>
              <ListQuestionText>{question}</ListQuestionText>
              {showCheckAnswer && (
                <CheckAnswerText>답변을 확인해보세요 {'>'}</CheckAnswerText>
              )}
            </QuestionItem>
            {i < displayQuestions.length - 1 && <QuestionDivider />}
          </React.Fragment>
        ))}
      </OtherQuestionContainer>
    </>
  );
};

export default OtherQuestion;
