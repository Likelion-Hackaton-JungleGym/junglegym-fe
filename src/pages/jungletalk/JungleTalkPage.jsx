import React, { useEffect, useMemo, useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";
import { useJungleTalkStore } from "../../store/jungleTalkStore";
import { askJungleTalkAI, getChats } from "../../shared/utils/chatApi.js";
import LoadingBar from "./LoadingBar";

const DUMMY_QUESTIONS = [
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

const JungleTalkPage = () => {
  const { step, setStep } = useJungleTalkStore();

  const [question, setQuestion] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lawText, setLawText] = useState("");
  const [fromOthers, setFromOthers] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

  const [latestQuestions, setLatestQuestions] = useState([]);

  const questionsForUI = useMemo(() => {
    if (latestQuestions.length > 0) return latestQuestions;
    return DUMMY_QUESTIONS;
  }, [latestQuestions]);

  useEffect(() => {
    const load = async () => {
      try {
        const { list } = await getChats({ limit: 10 });
        const onlyQuestions = list
          .map((v) => v?.question)
          .filter((q) => typeof q === "string" && q.trim().length > 0);
        setLatestQuestions(onlyQuestions);
      } catch (e) {
        console.log("[getChats error]", e?.response?.data || e.message);
      }
    };

    if (step === 1) load();

    const onVisible = () => {
      if (document.visibilityState === "visible" && step === 1) load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [step]);

  const handleSubmit = async () => {
    const q = question.trim();
    if (!q) return;
    console.log("[handleSubmit] 시작", { question: q, isPrivate });
    setFromOthers(false);
    setIsAnswerLoading(true);
    try {
      const data = await askJungleTalkAI(q, { privated: isPrivate });
      console.log("[handleSubmit] API 응답 성공", data);
      setAnswer(data?.answer ?? "");
      setLawText(data?.constitution ?? "");
    } catch (e) {
      console.log("[handleSubmit] API 에러", e?.response?.data || e.message);
      alert("답변을 가져오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      setStep(1);
    } finally {
      // 로딩 상태를 조금 더 유지하여 사용자가 로딩 화면을 볼 수 있도록 함
      setTimeout(() => {
        setIsAnswerLoading(false);
        setStep(3);
      }, 1000);
    }
  };

  const openAnswer = async (q) => {
    const qq = String(q || "").trim();
    if (!qq) return;
    console.log("[openAnswer] 시작", { question: qq });
    setQuestion(qq);
    setFromOthers(true);
    setIsAnswerLoading(true);
    setAnswer("");
    setLawText("");
    try {
      const data = await askJungleTalkAI(qq, { privated: false });
      console.log("[openAnswer] API 응답 성공", data);
      setAnswer(data?.answer ?? "");
      setLawText(data?.constitution ?? "");
    } catch (e) {
      console.log("[openAnswer] API 에러", e?.response?.data || e.message);
      alert("답변을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      setStep(1);
    } finally {
      // 로딩 상태를 조금 더 유지하여 사용자가 로딩 화면을 볼 수 있도록 함
      setTimeout(() => {
        setIsAnswerLoading(false);
        setStep(3);
      }, 1000);
    }
  };

  return (
    <>
      {step === 1 && (
        <JungleTalkMain setStep={setStep} questions={questionsForUI} onQuestionClick={openAnswer} />
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

      {isAnswerLoading && (
        <LoadingBar durationMs={5000} />
      )}

      {step === 3 && (
        <JungleTalkAnswer
          question={question}
          answer={answer}
          lawText={lawText}
          setStep={setStep}
          fromOthers={fromOthers}
          dummyQuestions={questionsForUI}
          onOtherClick={openAnswer}
          isLoading={isAnswerLoading}
        />
      )}
    </>
  );
};

export default JungleTalkPage;
