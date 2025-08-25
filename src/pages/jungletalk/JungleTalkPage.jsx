import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import JungleTalkMain from "./JungleTalkMain";
import JungleTalkQuestion from "./JungleTalkQuestion";
import JungleTalkAnswer from "./JungleTalkAnswer";
import { useJungleTalkStore } from "../../store/jungleTalkStore";
import { askJungleTalkAI, getChats } from "../../shared/utils/chatApi.js";
import LoadingBar from "./LoadingBar";

const JungleTalkPage = () => {
  const { step, setStep: setStepRaw } = useJungleTalkStore();

  const [question, setQuestion] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lawText, setLawText] = useState("");
  const [fromOthers, setFromOthers] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

  const [latestQuestions, setLatestQuestions] = useState([]);

  // --- 최상단으로 스크롤 유틸 ---
  const scrollToTop = () => {
    try {
      console.log("스크롤 시도 중...");
      
      // scrollRoot div를 찾아서 스크롤
      const scrollRoot = document.getElementById('scrollRoot');
      if (scrollRoot) {
        scrollRoot.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        scrollRoot.scrollTop = 0;
        scrollRoot.scrollLeft = 0;
        console.log("scrollRoot 스크롤 완료");
      } else {
        console.log("scrollRoot를 찾을 수 없음");
      }
      
    } catch (error) {
      console.log("스크롤 에러:", error);
    }
  };

  // --- setStep 래퍼: 호출 즉시 상단 이동 ---
  const setStepAndScroll = (next) => {
    setStepRaw(next);
    // setState는 비동기이므로 setTimeout으로 지연 실행
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const questionsForUI = useMemo(() => latestQuestions, [latestQuestions]);

  // 페이지 마운트 시 step을 1로 초기화
  useEffect(() => {
    setStepRaw(1);
  }, []);

  // step 변경 시마다 상단으로 (useLayoutEffect로 DOM 업데이트 후 즉시 실행)
  useLayoutEffect(() => {
    console.log("스크롤 실행 - step:", step);
    scrollToTop();
  }, [step]);

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
      // 에러 발생 시 기본 답변 설정 (사과 문구 제거, 중립 톤)
      setAnswer("현재 일시적인 문제로 답변 생성이 제한되어 있습니다. 잠시 후 다시 시도해 주세요.");
      setLawText("연결 문제로 관련 법 조항을 불러오지 못했습니다.");
    } finally {
      setTimeout(() => {
        setIsAnswerLoading(false);
        setStepAndScroll(3); // Answer로 전환 + 상단 고정
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
      setAnswer("현재 일시적인 문제로 답변 생성이 제한되어 있습니다. 잠시 후 다시 시도해 주세요.");
      setLawText("연결 문제로 관련 법 조항을 불러오지 못했습니다.");
    } finally {
      setTimeout(() => {
        setIsAnswerLoading(false);
        setStepAndScroll(3);
      }, 1000);
    }
  };

  return (
    <>
      {step === 1 && (
        <JungleTalkMain
          setStep={setStepAndScroll}
          questions={questionsForUI}
          onQuestionClick={openAnswer}
        />
      )}

      {step === 2 && (
        <JungleTalkQuestion
          question={question}
          setQuestion={setQuestion}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          setStep={setStepAndScroll}
          handleSubmit={handleSubmit}
        />
      )}

      {isAnswerLoading && <LoadingBar durationMs={5000} />}

      {step === 3 && (
        <JungleTalkAnswer
          question={question}
          answer={answer}
          lawText={lawText}
          setStep={setStepAndScroll}
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
