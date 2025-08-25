import React, { useEffect, useMemo, useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";
import { useJungleTalkStore } from "../../store/jungleTalkStore";
import { askJungleTalkAI, getChats } from "../../shared/utils/chatApi.js";
import LoadingBar from "./LoadingBar";



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
    return latestQuestions;
  }, [latestQuestions]);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("[JungleTalkPage] API 호출 시작");
        const { list } = await getChats({ limit: 10 });
        console.log("[JungleTalkPage] API 응답", list);
        const onlyQuestions = list
          .map((v) => v?.question)
          .filter((q) => typeof q === "string" && q.trim().length > 0);
        console.log("[JungleTalkPage] 필터링된 질문들", onlyQuestions);
        setLatestQuestions(onlyQuestions);
      } catch (e) {
        console.log("[JungleTalkPage] API 호출 실패", e?.response?.data || e.message);
        setLatestQuestions([]);
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
      // 에러 발생 시 기본 답변 설정
      setAnswer("죄송합니다. 현재 서버에 일시적인 문제가 있어 답변을 제공할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setLawText("서버 연결 문제로 관련 법 조항을 불러올 수 없습니다.");
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
      const data = await askJungleTalkAI(qq, { privated: true });
      console.log("[openAnswer] API 응답 성공", data);
      setAnswer(data?.answer ?? "");
      setLawText(data?.constitution ?? "");
    } catch (e) {
      console.log("[openAnswer] API 에러", e?.response?.data || e.message);
      // 에러 발생 시 기본 답변 설정
      setAnswer("죄송합니다. 현재 서버에 일시적인 문제가 있어 답변을 제공할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setLawText("서버 연결 문제로 관련 법 조항을 불러올 수 없습니다.");
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
          loading={isAnswerLoading}
        />
      )}
    </>
  );
};

export default JungleTalkPage;
