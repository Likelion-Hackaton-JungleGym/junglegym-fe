import React from "react";
import { SubTitle, QuestionList, QuestionCard, QuestionText, CheckAnswerText } from "./JungleTalk.styles";

const OtherQuestion = ({ title, questions, onClick, showCheckAnswer = false }) => {
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

  return (
    <>
      <SubTitle>{title}</SubTitle>
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
};

export default OtherQuestion;
