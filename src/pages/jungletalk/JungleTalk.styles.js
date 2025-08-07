import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
  background-color: #fff;
`;

export const Section = styled.section`
  margin-top: 20px;
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
  margin-bottom: 20px;
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 70px;
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  height: 55px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  color: #000;
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
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-bottom: 16px;
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
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OverlayText = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: white;
  font-size: 14px;
  line-height: 1.4;
  padding: 12px;
  border-radius: 8px;
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
`;
