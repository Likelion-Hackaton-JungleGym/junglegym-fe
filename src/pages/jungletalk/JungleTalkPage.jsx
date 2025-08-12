import React, { useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";
import { useJungleTalkStore } from "../../store/jungleTalkStore";

const JungleTalkPage = () => {
  const { step, setStep } = useJungleTalkStore();
  const [question, setQuestion] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lawText, setLawText] = useState("");
  const [fromOthers, setFromOthers] = useState(false);

  const fillDummy = () => {
    setAnswer(
      "서울시장처럼 지방자치단체장은 대부분 정당에 소속된 사람이 많습니다. 다만 법적으로는 정당 소속이 필수는 아닙니다."
    );
    setLawText(
      "헌법 제116조 제1항\n“지방자치단체의 장은 주민의 보통·평등·직접·비밀선거에 의하여 선출한다.”\n→ 정당 소속 여부는 법적으로 강제되지 않습니다.\n\n행정관례: 대한민국의 광역자치단체장(서울특별시장 포함)은 대부분 정당 공천을 통해 출마하며, 정당 간 정치적 경쟁이 존재합니다."
    );
  };

  const handleSubmit = () => {
    if (question.trim().length === 0) return;
    setFromOthers(false);
    fillDummy();
    setStep(3);
  };

  const openAnswer = (q) => {
    setQuestion(q);
    setFromOthers(true);
    fillDummy();
    if (step !== 3) setStep(3);
  };

  const dummyQuestions = [
    "비례대표와 지역갑을은 어떻게 다른건가요?",
    "국회의원은 몇 명이고, 다 뭐 하는 사람들이에요?",
    "정당이 많던데, 무소속이랑 정당 후보는 뭐가 달라?",
    "뉴스에서 비례 몇 석 가져간다 이런 건 무슨 뜻이야?",
    "선거 공보물 진짜 봐야 돼? 뭘 보고 판단해요?",
    "의원이 법안 발의했다는데, 그게 통과되려면 뭐가 필요한데?",
    "정책은 많은데 왜 내 삶은 그대로일까?",
    "안녕하세용",
    "배고파용",
    "너무졸리당",
  ];

  return (
    <>
      {step === 1 && (
        <JungleTalkMain
          setStep={setStep}
          questions={dummyQuestions}
          onQuestionClick={openAnswer}
        />
      )}

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
          setStep={setStep}
          fromOthers={fromOthers}
          dummyQuestions={dummyQuestions}
          onOtherClick={openAnswer}   
        />
      )}
    </>
  );
};

export default JungleTalkPage;
