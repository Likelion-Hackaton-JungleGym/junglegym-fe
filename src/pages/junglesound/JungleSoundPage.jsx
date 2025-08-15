import styled from "styled-components";
import NewsLetters from "./components/Newsletter.jsx";

export default function JungleSoundPage() {
  return (
    <Wrapper>
      <HighlightText>
        정글의 소리
        <Highlight />
      </HighlightText>
      <SubText>
        같은 정책을 우리 동네 관점으로 해석하고,
        <br /> 지역 차이를 비교·질문하는 뉴스레터
      </SubText>
      <NewsLettersWrapper>
        <NewsLetters id="newsletter1" />
        <NewsLetters id="newsletter2" />
        <NewsLetters id="newsletter3" />
        <NewsLetters id="newsletter4" />
        <NewsLetters id="newsletter5" />
      </NewsLettersWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px;
`;

const HighlightText = styled.div`
  position: relative;
  margin: 5px;
  color: #111111;
  text-align: center;
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  padding-top: 20px;
  letter-spacing: -1px;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 135px;
  height: 13px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
  transform: translateX(-50%);
`;

const SubText = styled.p`
  color: #111111;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-bottom: 30px;
`;

const NewsLettersWrapper = styled.div`
  margin: 10px 0px;
`;
