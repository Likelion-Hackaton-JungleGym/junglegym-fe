import styled from "styled-components";
import Title from "./components/Title";
import CardNews from "./components/CardNews";
import MiniPeople from "./components/MiniPeople";
import JungleDictionary from "./components/JungleDictionary";

import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_REGION = "성북구";

export default function JungleTownPage() {
  const [searchParams] = useSearchParams();

  // URL > sessionStorage > 기본값 순으로 지역 결정
  const region = useMemo(() => {
    const fromUrl = searchParams.get("region");
    if (fromUrl) return decodeURIComponent(fromUrl);
    const fromStorage = sessionStorage.getItem("selectedRegion");
    return fromStorage || DEFAULT_REGION;
  }, [searchParams]);

  return (
    <Wrapper>
      <MarginBox1>
        <Title />
      </MarginBox1>
      <CardNews key={region} regions={[region]} />
      <MarginBox2>
        <MiniPeople key={region} regions={[region]} />
        <JungleDictionary />
      </MarginBox2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: -20px;
  padding: 20px;
`;

const MarginBox1 = styled.div`
  padding: 10px;
  margin: 5px;
`;

const MarginBox2 = styled.div`
  padding: -10px;
  margin: 0px -15px 10px 10px;
`;
