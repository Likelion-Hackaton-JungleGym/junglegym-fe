import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getPoliticianById } from "../../../shared/utils/politicianApi.js";
import TooltipImg from "./profiles/img/TooltipButton.svg";

import ProfileDetails from "../../peopledetail/ProfileDetails.jsx";
import LoadingScreen from "../../../shared/components/LoadingScreen.jsx";

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
      ? safe(d.regionText)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    careerSummary: safe(d.careerSummary),
  };
}

export default function PersonProfile() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
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
    return <LoadingScreen />;
  }

  if (error && !politician) {
    const currentRegion = searchParams.get("region");
    const backLink = currentRegion
      ? `/junglepeople?region=${encodeURIComponent(currentRegion)}`
      : "/junglepeople";

    return (
      <Empty>
        존재하지 않는 인물이에요. <Link to={backLink}>뒤로가기</Link>
      </Empty>
    );
  }

  return (
    <>
      {politician ? <ProfileView politician={politician} /> : <Empty>데이터가 없어요.</Empty>}
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
    : politician.regionText
    ? String(politician.regionText)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  //const getBgColor = (polyName) => {
  //if (polyName?.includes("더불어민주당")) return "#4191E6";
  //if (polyName?.includes("국민의힘")) return "#F8575E";
  //return "#f5f5f5"; // 기본값
  //};
  //  const bg = getBgColor(politician.polyName);

  const getPartyIcon = (polyName) => {
    if (polyName?.includes("더불어민주당")) return BlueParty;
    if (polyName?.includes("국민의힘")) return RedParty;
    return null; // 매칭 안 되면 아이콘 숨김
  };

  const partyIcon = getPartyIcon(politician.polyName);

  // 구청장, 시장인 경우 Tooltip 버튼 숨김
  const shouldShowTooltip =
    !politician.roleName?.includes("구청장") && !politician.roleName?.includes("시장");

  return (
    <Wrapper>
      <Card>
        <Top>
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
      <PartyWrapper>{partyIcon && <PartyIcon src={partyIcon} alt="정당" />}</PartyWrapper>
      <PositionWrapper>
        <PositionIcon src={RoleIcon} alt="직책" />
        <PositionText>{politician.roleName || "직책"}</PositionText>
        {shouldShowTooltip && (
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
        )}
      </PositionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  margin-top: 20px;
  // padding: 60px 20px 0;
  font-family: Pretendard;
`;

const Card = styled.article`
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #d2d2d2;
`;

const Top = styled.div`
  position: relative;
  height: 170px;
  width: 170px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 10px 10px 0 0;
  transition: transform 0.2s ease;
  margin-top: 20px;

  /* 이미지가 없거나 로드 실패 시 배경색 표시 */
  &:not([src]),
  &[src=""],
  &[src*="undefined"],
  &[src*="null"] {
    background-color: #f5f5f5;
  }

  /* 이미지 로딩 최적화 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 이미지가 배경을 완전히 채우도록 */
  min-width: 100%;
  min-height: 100%;

  /* 강제로 배경을 채우도록 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Name = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin: 10px 0 5px;
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
`;

const PositionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 25px;
  gap: 8px;
`;
const PositionIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const PositionText = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: 500;
`;
const TooltipWrapper = styled.div`
  position: relative;
  margin-left: 0px;
`;
const TooltipButton = styled.img`
  position: absolute;
  top: -7px;
`;
const TooltipBox = styled.div`
  position: absolute;
  top: 50%;
  left: calc(100% + 20px);
  transform: translateY(-50%);
  width: 80px;
  padding: 3px 3px 3px 3px;
  background: #f8f8fb;
  border-radius: 10px;
  border: 1px dashed #8e8e8e;
`;
const TooltipText = styled.div`
  font-size: 11px;
  color: #767676;
  line-height: 1.3;
  text-align: left;
  white-space: pre-line;
  margin: 2px 2px 2px 2px;
`;
const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
`;
