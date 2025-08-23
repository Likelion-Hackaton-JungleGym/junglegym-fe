import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LoadingImg from "../../assets/icons/Loading.svg";

/**
 * Props
 * - durationMs: 총 진행 시간(ms) (기본 1000ms)
 * - step: 1틱에서 증가시킬 퍼센트 (기본 5)
 * - intervalMs: 틱 간격(ms) (기본 50ms)
 * - offsetTop: 상단 오프셋 반영해 세로 중앙 (기본 0, 필요시 사용)
 * - paused: 일시정지 여부
 * - onComplete: 완료 시 1회 호출
 */
const LoadingBar = ({
  durationMs = 1000,
  step = 5,
  intervalMs = 50,
  offsetTop = 0,
  paused = false,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const doneRef = useRef(false); // onComplete 1회 보장

  // prefers-reduced-motion 대응
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // intervalMs를 durationMs/step으로 재계산 (옵션)
  const effectiveInterval = intervalMs ?? Math.max(10, Math.floor(durationMs / (100 / step)));

  useEffect(() => {
    if (paused || progress >= 100) return;

    timerRef.current = setTimeout(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, effectiveInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // progress와 paused, effectiveInterval, step 변경에 반응
  }, [progress, paused, effectiveInterval, step]);

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      if (onComplete) onComplete();
    }
  }, [progress, onComplete]);

  return (
    <Wrapper $offsetTop={offsetTop}>
      <Img src={LoadingImg} alt="로딩 중" />
      <LoadingText>정글 속에서 답을 찾는 중...</LoadingText>

      <BarBg
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(progress)}
        aria-label="검색 진행률"
      >
        <BarFill style={{ width: `${progress}%` }} $reduced={prefersReducedMotion} />
      </BarBg>
    </Wrapper>
  );
};

export default LoadingBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 화면 전체 기준 중앙 정렬, 상단 오프셋 있으면 그만큼 줄이기 */
  min-height: ${({ $offsetTop }) => ($offsetTop ? `calc(100vh - ${$offsetTop}px)` : "100vh")};
  padding: 16px;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 16px;
  user-select: none;
  -webkit-user-drag: none;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #7471f9;
  margin: 8px 0 20px;
  text-align: center;
`;

const BarBg = styled.div`
  width: min(720px, 80%);
  height: 8px;
  border-radius: 4px;
  background-color: rgba(116, 113, 249, 0.2);
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background-color: #7471f9;
  border-radius: 4px;
  /* 모션 민감 사용자 배려: reduce면 transition 최소화 */
  transition: ${({ $reduced }) => ($reduced ? "none" : "width 0.18s ease-out")};
`;
