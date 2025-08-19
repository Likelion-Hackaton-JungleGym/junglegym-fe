import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPoliticianById } from "../../../shared/utils/politicianApi.js";
import TooltipImg from "./profiles/img/TooltipButton.svg";

import ProfileDetails from "../../peopledetail/ProfileDetails.jsx";

import BlueParty from "./profiles/img/BlueParty.svg";
import RedParty from "./profiles/img/RedParty.svg";
import RoleIcon from "./profiles/img/RoleIcon.svg";


function normalizePolitician(apiData = {}) {
  const d = apiData || {};
  const safe = (v) => (typeof v === "string" ? v.trim() : v ?? "");

  return {
    id: d.id ?? null,
    name: safe(d.name),
    polyName: safe(d.polyName),
    roleName: safe(d.roleName),
    committee: safe(d.committee),
    birth: safe(d.birth),
    retryNumber: d.retryNumber ?? null,
    retryUnit: safe(d.retryUnit),
    profileImg: safe(d.profileImg),
    military: safe(d.military),
    regionList: safe(d.regionText)
      ? safe(d.regionText).split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    careerSummary: safe(d.careerSummary),
  };
}

export default function PersonProfile() {
  const { id } = useParams();
  const [politician, setPolitician] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolitician = async () => {
      try {
        const numericId = parseInt(id);
        const res = await getPoliticianById(numericId);
        // 스웨거 구조: { success, code, message, data: { ... } }
        const raw = res?.data ?? res; // 혹시 직접 객체가 올 수도 있어 방어
        setPolitician(normalizePolitician(raw));
      } catch (err) {
        setError(err?.message || "fetch failed");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolitician();
  }, [id]);

  if (isLoading) {
    return (
      <Empty>
        정치인 정보를 불러오는 중...
      </Empty>
    );
  }

  if (error && !politician) {
    return (
      <Empty>
        존재하지 않는 인물이에요. <Link to="/junglepeople">뒤로가기</Link>
      </Empty>
    );
  }

  return (
    <>
      {politician ? (
        <ProfileView politician={politician} />
      ) : (
        <Empty>데이터가 없어요.</Empty>
      )}
      {/* 하단 상세 - 이미 가져온 politician 데이터 전달 */}
      <ProfileDetails politicianId={parseInt(id)} politician={politician} />
    </>
  );
}

function ProfileView({ politician = {} }) {
  const [open, setOpen] = useState(false);

  // 지역 정보 파싱 (regionText를 배열로 변환)
  const areas = Array.isArray(politician.regionList)
    ? politician.regionList
    : (politician.regionText
        ? String(politician.regionText)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : []);

  const getBgColor = (polyName) => {
    if (polyName?.includes("더불어민주당")) return "#4191E6";
    if (polyName?.includes("국민의힘")) return "#F8575E";
    return "#f5f5f5"; // 기본값
  };
  const bg = getBgColor(politician.polyName);

  const getPartyIcon = (polyName) => {
    if (polyName?.includes("더불어민주당")) return BlueParty;
    if (polyName?.includes("국민의힘")) return RedParty;
    return null; // 매칭 안 되면 아이콘 숨김
  };

  const partyIcon = getPartyIcon(politician.polyName);
  return (
    <Wrapper>
      <Card>
        <Top $bg={bg}>
          <ProfileImg
            src={politician.profileImg || "/dummy-profile.jpg"}
            alt={`${politician.name} 사진`}
            onError={(e) => {
              e.currentTarget.src = "/dummy-profile.jpg";
            }}
          />
        </Top>
      </Card>
             <Name>{politician.name}</Name>
       <PartyWrapper>
         {partyIcon && <PartyIcon src={partyIcon} alt="정당" />}
       </PartyWrapper>
       <PositionWrapper>
         <PositionIcon src={RoleIcon} alt="직책" />
         <PositionText>{politician.roleName || "직책"}</PositionText>
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

const Card = styled.article`
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  border: 1px solid #d2d2d2;
`;

const Top = styled.div`
  position: relative;
  height: 184px;
  background: ${(p) => p.$bg};
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
const PartyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  gap: 8px;
  flex-direction: column;
`;
const PartyIcon = styled.img`
  width: 100px;
  height: auto;
  opacity: 0.6;
`;

const PartyText = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const PositionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 25px;
  gap: 8px;
`;
const PositionIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;
const PositionText = styled.div`
  font-size: 18px;
  color: #666;
  font-weight: 500;
`;
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
