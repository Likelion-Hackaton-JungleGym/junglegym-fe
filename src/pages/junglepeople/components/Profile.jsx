import styled from "styled-components";
import { Link } from "react-router-dom";
import LoadingScreen from "../../../shared/components/LoadingScreen";

import RedPartyWhite from "./img/redPartyWhite.svg";
import BluePartyWhite from "./img/bluePartyWhite.svg";

export default function Profile({ politicians = [], isLoading = false, selectedRegion }) {
  // API 데이터를 새로운 UI 구조에 맞게 변환
  const people = politicians.map((politician) => {
    const getBadge = (polyName) => {
      if (polyName?.includes("더불어민주당")) return BluePartyWhite;
      if (polyName?.includes("국민의힘")) return RedPartyWhite;
      return;
    };

    const getBorderColor = (polyName) => {
      if (polyName?.includes("더불어민주당")) return "#4191E6";
      if (polyName?.includes("국민의힘")) return "#F8575E";
      return "#fff"; // 기본값
    };

    // 이미지 URL 검증 및 기본값 설정
    const getProfileImage = (profileImg) => {
      if (
        !profileImg ||
        profileImg === "" ||
        profileImg.includes("undefined") ||
        profileImg.includes("null")
      ) {
        return "/dummy-profile.jpg";
      }
      return profileImg;
    };

    return {
      id: politician.id,
      path: `/junglepeople/${politician.id}`,
      name: politician.name,
      title: politician.roleName,
      cropPhoto: getProfileImage(politician.profileImg),
      badge: getBadge(politician.polyName),
      borderColor: getBorderColor(politician.polyName),
    };
  });

  // 로딩 중일 때
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 데이터가 없을 때 처리
  if (politicians.length === 0) {
    return (
      <Wrapper>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#666",
            fontSize: "16px",
          }}
        >
          {selectedRegion
            ? `${selectedRegion}의 정치인 정보를 준비 중입니다.`
            : "정치인 정보를 준비 중입니다."}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid>
        {people.map((p) => (
          <CardLink to={p.path} key={p.id} aria-label={`${p.name} 상세`}>
            <Card>
              <Top $borderColor={p.borderColor}>
                <Badge src={p.badge} alt="정당" />
                <PersonWrapper>
                  <Person
                    src={p.cropPhoto}
                    alt={`${p.name}`}
                    onError={(e) => {
                      e.target.src = "/dummy-profile.jpg";
                    }}
                  />
                </PersonWrapper>
              </Top>
              <Bottom>
                <Name>{p.name}</Name>
                <Title>{p.title}</Title>
              </Bottom>
            </Card>
          </CardLink>
        ))}
      </Grid>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
  margin: 30px auto 30px;
  padding: 0 5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.article`
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1.5px solid #d6d6d6;
  height: 230px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03), 1px 0px 10px rgba(0, 0, 0, 0.03),
    0px 1px 10px rgba(0, 0, 0, 0.03);
  //offset-x offset-y blur-radius spread-radius color;
`;

const Top = styled.div`
  position: relative;
  height: 200px;
  background: #f5f5f5;
  border-radius: 10px 10px 0 0;
  border-bottom: 5px solid ${(p) => p.$borderColor};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Person = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 10px 10px 0 0;
  transition: transform 0.2s ease;
  //transform: translateY(10px);
  margin-top: 10px;

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

const Badge = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  height: 19px;
  z-index: 2;
  pointer-events: none;
`;

const Bottom = styled.div`
  background: #fff;
  text-align: center;
  width: 160px;
  height: 62px;
  padding: 10px;
`;

const Name = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  color: #111;
`;

const Title = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: #797979;
`;
