import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
  background-color: #fff;
`;

export const Section = styled.section`
  margin-top: 20px;
  padding: 0 16px;
`;

export const Title = styled.h2`
  font-size: 25px;
  font-weight: 700;
`;

export const Description = styled.p`
  margin: 12px 0 24px;
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
  margin-bottom: 70px;
  margin-top: 24px;
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  font-size: 15px;
  color: #000;
  transition: all 0.2s ease;
`;

export const QuestionText = styled.div`
  font-size: 15px;
  color: #000;
  line-height: 1.4;
  margin-bottom: 8px;
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
  background: #7471F9;
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
  cursor: pointer;
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
  height: 250px;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 10px;
  font-size: 20px;
  resize: none;
  color: #000;
  outline: none;

  &::placeholder {
    color: #b5b5b5;
    font-size: 20px;
  }
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 12px 20px;
  color: #b5b5b5;

  input[type="checkbox"] {
    transform: scale(1.5);
    margin-right: 18px;
  }
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  margin: 15px auto;
  padding: 12px;
  height: 55px;
  width: 95%;
  border-radius: 999px;
  background: #7471F9;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

export const FooterText = styled.p`
  padding: 0 10px;
  margin-top: 15px;
  font-size: 13px;
  color: #000;
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
