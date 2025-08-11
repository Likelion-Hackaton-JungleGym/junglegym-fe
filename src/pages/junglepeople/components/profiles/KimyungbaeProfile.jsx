import styled from "styled-components";

export default function KimyungbaeProfile() {
  return (
    <Wrapper>
      <Title>김영배 프로필</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px;
  font-family: Pretendard;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin-top: 50px;
`;
