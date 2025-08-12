import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { PEOPLE } from "./peopleData";
import TooltipImg from "./profiles/img/TooltipButton.svg";

export default function PersonProfile() {
  const { id } = useParams();
  const person = PEOPLE[id];

  if (!person) {
    return (
      <Empty>
        존재하지 않는 인물이에요. <Link to="/junglepeople">목록으로</Link>
      </Empty>
    );
  }

  return <ProfileView {...person} />;
}

function ProfileView({ name, photo, partyImg, positionImg, areas }) {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      <ProfileImg src={photo} alt={`${name} 사진`} />
      <Name>{name}</Name>
      <PartyImg src={partyImg} alt="정당" />
      <PositionWrapper>
        <PositionImg src={positionImg} alt="직책" />
        <TooltipWrapper>
          <TooltipButton
            src={TooltipImg}
            alt="담당 지역 툴팁 열기"
            onClick={() => setOpen((v) => !v)}
          />
          {open && (
            <TooltipBox role="dialog" aria-label="담당 지역">
              <TooltipText>{areas.map((a) => `• ${a}`).join("\n")}</TooltipText>
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
  width: 110px;
  padding: 6px 10px;
  background: #e0e0e0;
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
const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
`;
