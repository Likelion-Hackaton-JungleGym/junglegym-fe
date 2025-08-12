import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LoadingBar = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [progress, onComplete]);

  return (
    <Wrapper>
      <LoadingText>정글 속에서 답을 찾는 중...</LoadingText>
      <BarBg>
        <BarFill style={{ width: `${progress}%` }} />
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
  height: calc(100vh - 400px); 
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #7471f9;
  margin-bottom: 20px;
`;

const BarBg = styled.div`
  width: 80%;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(116, 113, 249, 0.2);
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background-color: #7471f9;
  border-radius: 3px;
  transition: width 0.05s linear;
`;