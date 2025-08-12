import { useState } from "react";
import styled from "styled-components";
import kimnamgeun from "./img/kimnamgeun.svg";
import SeongbukEul from "./img/SeongbukEul.svg";
import BlueParty from "./img/BlueParty.svg";
import TooltipImg from "./img/TooltipButton.svg";

export default function KimnamgeunProfile() {
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleTooltip = () => setShowTooltip((prev) => !prev);

  return (
    <Wrapper>
      <ProfileImg src={kimnamgeun} />
      <Name>김남근</Name>
      <PartyImg src={BlueParty} />
      <PositionWrapper>
        <PositionImg src={SeongbukEul} />
        <TooltipWrapper>
          <TooltipButton src={TooltipImg} onClick={toggleTooltip} />
          {showTooltip && (
            <TooltipBox>
              <TooltipText>
                • 정릉동
                <br />• 길음 1/2동
                <br />• 마마동
                <br />• 파파동
                <br />• 가가동
                <br />• 나나동
              </TooltipText>
            </TooltipBox>
          )}
        </TooltipWrapper>
      </PositionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  font-family: Pretendard;
`;

const ProfileImg = styled.img`
  width: 160px;
  height: auto;
  //border-radius: 8px;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 5px;
`;

const PartyImg = styled.img`
  margin: 5px;
`;

const PositionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 25px;
`;

const PositionImg = styled.img``;

const TooltipWrapper = styled.div`
  position: relative;
  margin-left: 4px;
`;

const TooltipButton = styled.img`
  cursor: pointer;
`;

const TooltipBox = styled.div`
  position: absolute;
  top: 50%;
  left: calc(100% + 8px);
  transform: translateY(-50%);
  width: 95px;
  //height: 150px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 8px;
  border: 1px dashed #8e8e8e;
`;

const TooltipText = styled.div`
  font-size: 14px;
  color: gray;
  line-height: 1.5;
  text-align: left;
  white-space: pre-line;
`;
