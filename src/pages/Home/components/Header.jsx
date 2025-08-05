import ReactIcon from "@/assets/icons/react.svg?react";
import styled from "styled-components";

export const Header = () => {
  return (
    <Title>
      <ReactIcon />한 학기동안 세션 듣고 방학 스터디하느라 정말 고생 많으셨습니다👍🥺
    </Title>
  );
};

const Title = styled.h1`
  color: green;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
