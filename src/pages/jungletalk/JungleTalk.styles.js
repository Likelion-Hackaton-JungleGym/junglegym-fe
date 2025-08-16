import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  background-color: #fff;
  &.answerHaeder {
    //필요 없으면 이 부분 버리기
  }
`;

export const Section = styled.section`
  margin-top: 35px;
  padding: 0 30px;
`;

export const Title = styled.h2`
  position: relative;
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  z-index: 0;
`;

export const Description = styled.p`
  margin: 5px 0 40px;
  font-size: 14px;
  color: #000;
  line-height: 1.4;
`;

export const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 100px;
  margin-top: 15px;
  align-items: center;
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
  font-size: 15px;
  color: #000;
  transition: all 0.2s ease;
  min-height: 45px;
  width: 100%;
`;

export const QuestionText = styled.div`
  font-size: 15px;
  color: #000;
  line-height: 1.4;
  margin-bottom: 0;
`;

export const CheckAnswerText = styled.div`
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 55px;
  background: #7471f9;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 14px;
  border-radius: 999px;
  z-index: 20;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const AbsoluteBackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-family: "Pretendard", sans-serif;
  height: 250px;
  border: 1px solid #fff;
  border-radius: 10px;
  font-size: 20px;
  resize: none;
  color: #000;
  outline: none;

  &::placeholder {
    color: #d6d6d6;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 12px 0px;
  color: #b5b5b5;

  input[type="checkbox"] {
    transform: scale(1.5);
    margin-right: 18px;
  }
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  margin: 15px 0;
  padding: 12px 0;
  height: 45px;
  border-radius: 25px;
  background: #7471f9;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  padding: 0;
  margin-top: 15px;
  font-size: 13px;
  color: #000;
  font-weight: 400;
  line-height: 1.4;
`;

export const TopImageWrapper = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 16px;
`;

export const OverlayText = styled.div`
  position: relative;
  z-index: 5;
  color: #fff;
  font-size: 17px;
  line-height: 1.4;
  white-space: pre-line;
`;

export const WhiteContainer = styled.div`
  background: white;
  padding: 20px 16px;
`;

export const MyQuestion = styled.div`
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.5;
`;

export const AnswerText = styled.div`
  margin-top: 24px;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const Highlight = styled.div`
  position: absolute;
  bottom: 2px;
  width: 100px;
  left: -6px;
  height: 13px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
`;
