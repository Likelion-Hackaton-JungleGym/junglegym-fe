import { useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Container,
  TopImageWrapper,
  OverlayText,
  WhiteContainer,
  MyQuestion,
  AnswerText,
  AbsoluteBackButton,
  SubTitle,
} from "./JungleTalk.styles";
import BackIcon from "../../assets/icons/BackIcon.svg";
import LawImage1 from "../../assets/images/LawImage1.png";
import LawImage2 from "../../assets/images/LawImage2.png";
import LawImage3 from "../../assets/images/LawImage3.png";
import LawImage4 from "../../assets/images/LawImage4.png";
import OtherQuestion from "./OtherQuestion";

const lawImages = [LawImage1, LawImage2, LawImage3, LawImage4];

const JungleTalkAnswer = ({
  question,
  answer,
  lawText,
  setStep,
  fromOthers,
  dummyQuestions,
  onOtherClick,
}) => {
  const { setHeaderMode, setIsStep3 } = useOutletContext();

  useEffect(() => {
    setIsStep3(true);
    setHeaderMode("hidden"); // step3 페이지 진입
    return () => {
      setIsStep3(false);
      setHeaderMode("fixed"); // 페이지 떠날 때 복구
    };
  }, [setHeaderMode, setIsStep3]);
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * lawImages.length);
    return lawImages[randomIndex];
  }, []);
  return (
    <Container $isStep3={true}>
      <TopImageWrapper $bg={randomImage}>
        <AbsoluteBackButton onClick={() => setStep(1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </AbsoluteBackButton>
        <OverlayText>{(lawText && lawText.trim()) || ""}</OverlayText>
      </TopImageWrapper>
      <WhiteContainer>
        <MyQuestion>
          <SubTitle>
            <strong>{fromOthers ? "다른 이의 질문" : "나의 질문"}</strong>
            <br />
          </SubTitle>
          {(question && question.trim()) || ""}
        </MyQuestion>
        <AnswerText>
          <SubTitle>
            <strong>정글챗</strong>
            <br />
          </SubTitle>
          {(answer && answer.trim()) || ""}
        </AnswerText>
        <OtherQuestion
          title="다른 사람들의 질문"
          questions={dummyQuestions}
          showCheckAnswer
          onClick={(i, q) => onOtherClick?.(q)}
        />
      </WhiteContainer>
    </Container>
  );
};

export default JungleTalkAnswer;
