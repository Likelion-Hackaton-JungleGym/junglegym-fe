import React from 'react';
import styled, { keyframes } from 'styled-components';
import LoadingIcon from '../../assets/icons/Loading.svg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-in;
`;

const CharacterContainer = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const LoadingImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #8B7FF9;
  margin: 0 0 24px 0;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 8px;
  background-color: #E8E5FF;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #8B7FF9;
  border-radius: 4px;
  animation: ${progressAnimation} 2s ease-in-out infinite;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <CharacterContainer>
        <LoadingImage src={LoadingIcon} alt="정글 탐험 캐릭터" />
      </CharacterContainer>
      <LoadingText>정글 탐험 중... 답을 곧 가져올게요</LoadingText>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
    </LoadingContainer>
  );
};

export default LoadingScreen; 