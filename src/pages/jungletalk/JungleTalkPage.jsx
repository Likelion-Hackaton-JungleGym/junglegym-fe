import React, { useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";
import { useJungleTalkStore } from "../../store/jungleTalkStore";
import { askJungleTalkAI } from "../../shared/utils/ChatApi.js";

const JungleTalkPage = () => {
  const { step, setStep } = useJungleTalkStore();
  const [question, setQuestion] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lawText, setLawText] = useState("");
  const [fromOthers, setFromOthers] = useState(false);

  const handleSubmit = async () => {
 const q = question.trim();
    if (!q) return;
    setFromOthers(false);
    setStep(2); // 로딩
   try {
      const data = await askJungleTalkAI(q, { privated: isPrivate });
      setAnswer(data?.answer ?? "");
      setLawText(data?.constitution ?? "");
      setStep(3);
    } catch (e) {
      console.log("[ask error]", e?.response?.data || e.message);
      alert("답변을 가져오는 중 문제가 발생했어. 잠시 후 다시 시도해줘.");
      setStep(1);
    }
  };

 const openAnswer = async (q) => {
    const qq = String(q || "").trim();
    if (!qq) return;
    setQuestion(qq);
    setFromOthers(true);
    setStep(2); // 로딩
    try {
      const data = await askJungleTalkAI(qq, { privated: false });
      setAnswer(data?.answer ?? "");
      setLawText(data?.constitution ?? "");
      setStep(3);
    } catch (e) {
      console.log("[ask error]", e?.response?.data || e.message);
      alert("답변을 불러오지 못했어요.");
      setStep(1);
    }
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
