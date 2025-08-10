import React from "react";
import { SubTitle, QuestionList, QuestionCard } from "./JungleTalk.styles";

const OtherQuestion = ({ title, questions, onClick }) => {
  return (
    <>
      <SubTitle>{title}</SubTitle>
      <QuestionList>
        {questions.map((q, i) => (
          <QuestionCard key={i} onClick={() => onClick?.(i, q)}>
            {q.length > 40 ? `${q.slice(0, 40)}...` : q}
          </QuestionCard>
        ))}
      </QuestionList>
    </>
  );
};

export default OtherQuestion;
