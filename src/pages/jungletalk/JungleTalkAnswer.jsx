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
} from "./JungleTalk.styles";
import BackIcon from "../../assets/icons/BackIcon.svg";
import RectangleIcon from "../../assets/icons/Rectangle.svg";
import LawImage1 from "../../assets/images/LawImage1.svg";
import LawImage2 from "../../assets/images/LawImage2.svg";
import LawImage3 from "../../assets/images/LawImage3.svg";
import LawImage4 from "../../assets/images/LawImage4.svg";
import LawImage5 from "../../assets/images/LawImage5.svg";
import LawImage6 from "../../assets/images/LawImage6.svg";
import LawImage7 from "../../assets/images/LawImage7.svg";
import LawImage8 from "../../assets/images/LawImage8.svg";

import OtherQuestion from "./OtherQuestion";
import { CardTitle } from "../../../src/pages/peopledetail/ProfileDetail.styles.js";

const lawImages = [
  LawImage1,
  LawImage2,
  LawImage3,
  LawImage4,
  LawImage5,
  LawImage6,
  LawImage7,
  LawImage8,
];

const JungleTalkAnswer = ({
  question,
  answer,
  lawText,
  setStep,
  fromOthers,
  dummyQuestions: questions,
  onOtherClick,
  loading,
}) => {
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * lawImages.length);
    return lawImages[randomIndex];
  }, []);

  const { setHeaderMode } = useOutletContext();

  useEffect(() => {
    setHeaderMode("hidden");
    return () => setHeaderMode("fixed"); // 페이지 떠날 때 원복
  }, [setHeaderMode]);

  return (
    <Container className="answerHeader">
      <TopImageWrapper $bg={randomImage}>
        <AbsoluteBackButton onClick={() => setStep(1)}>
          <img src={BackIcon} alt="뒤로가기" style={{ filter: "brightness(0) invert(1)" }} />
        </AbsoluteBackButton>
        <OverlayText>{(lawText && lawText.trim()) || ""}</OverlayText>
      </TopImageWrapper>
      <WhiteContainer>
        <MyQuestion>
          <div>
            <CardTitle style={{ marginLeft: "5px" }}>
              {fromOthers ? "다른 이의 질문" : "나의 질문"}
            </CardTitle>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "3px" }}>
            <img
              src={RectangleIcon}
              alt=""
              style={{ width: "10px", height: "16px", marginTop: "4px", flexShrink: 0 }}
            />
            {(question && question.trim()) || ""}
          </div>
        </MyQuestion>

        <div style={{ marginLeft: "8px" }}>
          <CardTitle style={{ marginLeft: "5px" }}>정글챗</CardTitle>
        </div>
        <AnswerText>
          {(answer && answer.trim().replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")) || ""}
        </AnswerText>
        <OtherQuestion
          title="다른 사람들의 질문"
          questions={questions}
          showCheckAnswer
          onClick={(i, q) => {
            if (loading) return;
            onOtherClick?.(q);
          }}
          disabled={loading}
          variant="list"
        />
      </WhiteContainer>
    </Container>
  );
};

export default JungleTalkAnswer;
