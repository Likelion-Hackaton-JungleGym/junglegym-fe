import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import styled from "styled-components";
//import LandingImage from "../assets/images/Landing.svg";
//import LandingIcon from "../assets/icons/LandingIcon2.jpg";
import LandingIcon from "../assets/icons/LandingIcon.svg";
import LandingMap from "../assets/icons/LandingMap.svg";

import BackArrowIcon from "../assets/icons/BackArrowIcon.svg";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon.svg";
import { getAllRegions } from "../shared/utils/politicianApi.js";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setHeaderMode } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedDistrict, setSelectedDistrict] = useState("성북구");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //선택된 지역구들만 표시 (나중에 추가할 수도 있어서 주석으로 보존)
  const [districts, setDistricts] = useState([
    "강남구",
    "강북구",
    "마포구",
    "서초구",
    "성동구",
    "성북구",
    //"송파구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    // 나중에 추가할 수 있는 지역구들:
    // "강동구",
    // "강서구",
    // "관악구",
    // "광진구",
    // "구로구",
    // "금천구",
    // "노원구",
    // "도봉구",
    // "동대문구",
    // "동작구",
    // "서대문구",
    // "양천구",
    // "중랑구",
  ]);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(true);

  useEffect(() => {
    setHeaderMode("hidden");
    return () => setHeaderMode("fixed");
  }, [setHeaderMode]);

  // URL 파라미터에서 지역구 정보 읽기
  useEffect(() => {
    const regionFromUrl = searchParams.get("region");
    if (regionFromUrl) {
      setSelectedDistrict(regionFromUrl);
    } else {
      const regionFromStorage = sessionStorage.getItem("selectedRegion");
      if (regionFromStorage) {
        setSelectedDistrict(regionFromStorage);
      }
    }
  }, [searchParams]);

  // API에서 지역구 목록 가져오기 (선택된 지역구들만 필터링)
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const regions = await getAllRegions();
        const allRegions = Array.isArray(regions) ? regions.filter(Boolean) : [];

        // 원하는 지역구들만 필터링 (나중에 추가할 수도 있어서 주석으로 보존)
        const allowedRegions = [
          "강남구",
          "강북구",
          "마포구",
          "서초구",
          "성동구",
          "성북구",
          //"송파구",
          "영등포구",
          "용산구",
          "은평구",
          "종로구",
          "중구",
          // 나중에 추가할 수 있는 지역구들:
          // "강동구", "강서구", "관악구", "광진구", "구로구", "금천구",
          // "노원구", "도봉구", "동대문구", "동작구", "서대문구", "양천구", "중랑구"
        ];

        const filteredList = allRegions.filter((region) => allowedRegions.includes(region));

        setDistricts(filteredList);

        // 현재 선택이 목록에 없으면 첫 항목으로 보정
        setSelectedDistrict((cur) => (filteredList.includes(cur) ? cur : filteredList[0] ?? cur));
      } catch (err) {
        console.error("지역구 목록 조회 실패:", err);
        // 실패 시 초기 하드코딩 목록 그대로 사용
      } finally {
        setIsLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, []);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setIsDropdownOpen(false);

    // URL 파라미터 업데이트
    setSearchParams({ region: district });

    // sessionStorage에 지역구 정보 저장
    sessionStorage.setItem("selectedRegion", district);

    // 지역구별 페이지로 이동 (URL 파라미터로 지역구 정보 전달)
    navigate(`/?region=${encodeURIComponent(district)}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={BackArrowIcon} alt="뒤로가기" />
        </BackButton>
      </Header>
      <Divider />
      <Content>
        <Title>
          <TitleText>다른 정글 탐험하기</TitleText>
          <Highlight />
        </Title>

        <Subtitle>
          어렵고 복잡한 정치, <br /> <StrongText>우리 동네</StrongText> 이야기부터 알아볼까요?
        </Subtitle>

        <ImageContainer>
          <LandingMapImg src={LandingMap} alt="랜딩 페이지 지도" />
          <LandingIconImg src={LandingIcon} alt="랜딩 페이지 캐릭터" />
        </ImageContainer>
      </Content>

      <DistrictSelector>
        <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)} $isOpen={isDropdownOpen}>
          <span style={{ color: isDropdownOpen ? "#7471f9" : "#a7a7a7" }}>
            {isLoadingDistricts ? "로딩 중..." : selectedDistrict}
          </span>
          <ChevronIcon $isOpen={isDropdownOpen} src={ArrowDownIcon} alt="화살표" />
        </DropdownButton>

        {isDropdownOpen && (
          <DropdownList>
            {isLoadingDistricts ? (
              <DropdownItem>
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  지역구 목록을 불러오는 중...
                </div>
              </DropdownItem>
            ) : (
              districts.map((district, index) => (
                <div key={district}>
                  <DropdownItem
                    onClick={() => handleDistrictSelect(district)}
                    $isSelected={district === selectedDistrict}
                  >
                    {district}
                  </DropdownItem>
                  {index < districts.length - 1 && <DropdownDivider />}
                </div>
              ))
            )}
          </DropdownList>
        )}
      </DistrictSelector>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackIcon = styled.img`
  width: 30px;
  height: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 5px;
  margin-left: 12px;
`;

const Title = styled.h1`
  position: relative;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 8px;
  width: fit-content;
`;

const TitleText = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
  position: relative;
  z-index: 1;
  display: inline-block;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: 400;
  margin-bottom: 0px;
  line-height: 24px;
  max-width: 300px;
`;

const StrongText = styled.span`
  font-weight: 600;
`;

const ImageContainer = styled.div`
  position: relative; /* 절대배치 기준 */
  width: 100%;
  max-width: 360px; /* 필요시 조정 */
  margin-left: 3px;
`;

const LandingMapImg = styled.img`
  width: 70%;
  height: auto;
  display: block; /* 여백 제거 */
  z-index: 1; /* 아래쪽 레이어 */
  margin-bottom: 50px;
  margin-left: 70px;
`;

const LandingIconImg = styled.img`
  position: absolute; /* 지도 위에 겹치기 */
  bottom: 20px; /* 위치 미세조정 */
  width: 25%; /* 아이콘 크기 (반응형) */
  height: auto;
  z-index: 2; /* 지도보다 위 */
  pointer-events: none; /* 클릭 방해 안 하도록(선택) */
  /* 필요하면 살짝 띄우기: transform: translate(0, 6px); */
`;

const DistrictSelector = styled.div`
  position: relative;
  padding: 20px 20px 0;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 14px 32px;
  background: #fff;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 600;
  color: #a7a7a7;
  transition: all 0.2s ease;
  width: 350px;
  height: 50px;

  &:hover {
    border-color: #7471f9;
  }
`;

const ChevronIcon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(0deg)
    brightness(0.65) contrast(0.65);
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  right: 20px;
  background: #fff;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  max-height: 175px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 5px;
`;

const DropdownItem = styled.div`
  padding: 14px 32px;
  font-size: 17px;
  color: ${({ $isSelected }) => ($isSelected ? "#7471F9" : "#A7A7A7")};
  background: ${({ $isSelected }) => ($isSelected ? "#E1E0FF" : "#fff")};
  cursor: pointer;

  &:hover {
    background: #f8f8ff;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #d2d2d2;
`;

const Highlight = styled.div`
  position: absolute;
  left: -5px;
  bottom: 2px;
  width: calc(100% + 10px);
  height: 12px;
  background: #e1e0ff;
  border-radius: 2px;
  z-index: 0;
`;

export default LandingPage;
