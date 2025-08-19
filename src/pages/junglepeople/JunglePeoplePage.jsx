import { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "./components/Title";
import Profile from "./components/Profile";
import OrgChart from "./components/OrgChart";
import { useOutletContext } from "react-router-dom";
import { getPoliticiansByRegion } from "../../shared/utils/politicianApi.js";

export default function JunglePeoplePage() {
  const { setHeaderMode } = useOutletContext();
  const [politicians, setPoliticians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHeaderMode("hideOnScroll");
    return () => setHeaderMode("fixed");
  }, [setHeaderMode]);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        console.log('지역별 정치인 리스트 조회 시작');
        const data = await getPoliticiansByRegion(); // regionName 파라미터 제거
        console.log('지역별 정치인 리스트:', data);
        setPoliticians(data);
      } catch (err) {
        console.error('지역별 정치인 리스트 조회 실패:', err);
        setPoliticians([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoliticians();
  }, []);

  return (
    <Wrapper>
      <Title />
      <Profile politicians={politicians} isLoading={isLoading} />
      <OrgChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;
