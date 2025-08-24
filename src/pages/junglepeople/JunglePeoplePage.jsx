import { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "./components/Title";
import Profile from "./components/Profile";
import OrgChart from "./components/OrgChart";
import { useSearchParams } from "react-router-dom";
import { getPoliticiansByRegion } from "../../shared/utils/politicianApi.js";

export default function JunglePeoplePage() {
  const [searchParams] = useSearchParams();
  const [politicians, setPoliticians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedRegion = searchParams.get("region") || "성북구";

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        console.log("지역별 정치인 리스트 조회 시작", { selectedRegion });
        const data = await getPoliticiansByRegion(selectedRegion);
        console.log("지역별 정치인 리스트:", data);
        setPoliticians(data);
      } catch (err) {
        console.error("지역별 정치인 리스트 조회 실패:", err);
        setPoliticians([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoliticians();
  }, [selectedRegion]);

  return (
    <Wrapper>
      {!isLoading && <Title selectedRegion={selectedRegion} />}
      <Profile politicians={politicians} isLoading={isLoading} selectedRegion={selectedRegion} />
      {!isLoading && <OrgChart />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 13px;
`;
