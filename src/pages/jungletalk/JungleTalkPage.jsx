import React, { useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";

const JungleTalkPage = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lawText, setLawText] = useState("");

  const handleSubmit = () => {
    if (question.trim().length === 0) return;
    setAnswer(
      "서울시장처럼 지방자치단체장은 대부분 정당에 소속된 사람이 많습니다. 다만 법적으로는 정당 소속이 필수는 아닙니다."
    );
    setLawText(
      "헌법 제116조 제1항\n“지방자치단체의 장은 주민의 보통·평등·직접·비밀선거에 의하여 선출한다.”\n→ 정당 소속 여부는 법적으로 강제되지 않습니다.\n\n행정관례: 대한민국의 광역자치단체장(서울특별시장 포함)은 대부분 정당 공천을 통해 출마하며, 정당 간 정치적 경쟁이 존재합니다."
    );
    setStep(3);
  };

  return (
    <>
      {step === 1 && <JungleTalkMain setStep={setStep} />}
      {step === 2 && (
        <JungleTalkQuestion
          question={question}
          setQuestion={setQuestion}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          setStep={setStep}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 3 && (
        <JungleTalkAnswer
          question={question}
          answer={answer}
          lawText={lawText}
          dummyQuestions={Array(10).fill("비례대표와 지역감은 어떻게 다른건가요?")}
        />
      )}
    </>
  );
};

export default JungleTalkPage;
