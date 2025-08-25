import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getPoliticiansByRegion } from "../../../shared/utils/politicianApi";

const DEFAULT_REGION = "성북구";

// UI용 정규화 (API 필드명이 바뀌어도 안전하게 매핑)
const normalizePeople = (arr = []) =>
  arr.map((p) => ({
    id: p.id ?? p.politicianId ?? p.slug ?? String(p.name ?? ""),
    slug: p.slug ?? p.id ?? p.politicianId ?? String(p.name ?? ""),
    name: p.name ?? p.politicianName ?? p.koreanName ?? "",
    title: p.roleName || p.polyName || p.regionName || "",
    photo: p.profileImg || p.photoUrl || p.imageUrl || null,
    polyName: p.polyName || p.partyName || p.party || "", // 정당 정보 추가
  }));

const getInitials = (name = "") => String(name).trim().slice(0, 2);

export default function MiniPeople({ region: propRegion }) {
  const [searchParams] = useSearchParams();

  // URL > props > sessionStorage > 기본값
  const region = useMemo(() => {
    const fromUrl = searchParams.get("region");
    if (fromUrl) return decodeURIComponent(fromUrl);
    if (propRegion) return propRegion;
    return sessionStorage.getItem("selectedRegion") || DEFAULT_REGION;
  }, [propRegion, searchParams]);

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AbortController 사용 (0단계 패치 적용 시)
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    setLoading(true);

    (async () => {
      try {
        const raw = await getPoliticiansByRegion(
          region,
          ctrl ? { signal: ctrl.signal } : undefined
        );
        setPeople(normalizePeople(Array.isArray(raw) ? raw : []));
      } catch (e) {
        // 0단계 패치 안 했거나, 네트워크 취소 아닌 에러
        if (
          e?.name === "CanceledError" ||
          e?.code === "ERR_CANCELED" ||
          e?.message === "canceled"
        ) {
          // 무시
        } else {
          console.error("[MiniPeople] fetch 실패:", e);
          setPeople([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl?.abort?.();
  }, [region]);

  const getPersonPath = (p) => `/junglepeople/${encodeURIComponent(p.id ?? p.slug)}`;

  return (
    <Wrapper>
      <Text>
        <PageTitle>정글 사람들</PageTitle>
        <Plus to={`/junglepeople?region=${encodeURIComponent(region)}`}>
          <p>{`전체보기 >`}</p>
        </Plus>
      </Text>

      <MiniPeopleWrap className="scroll-container">
        <PeopleCard>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Person key={`skeleton-${i}`}>
                <Skeleton />
                <Info>
                  <Name style={{ background: "#f3f3f3", height: 18, borderRadius: 4 }} />
                  <Title
                    style={{ background: "#f6f6f6", height: 14, borderRadius: 4, marginTop: 6 }}
                  />
                </Info>
              </Person>
            ))
          ) : people.length === 0 ? (
            <Empty>선택한 지역의 인물 정보가 없어요.</Empty>
          ) : (
            people.map((p) => {
              const getBgColor = (polyName) => {
                if (polyName?.includes("더불어민주당")) return "#4191E6";
                if (polyName?.includes("국민의힘")) return "#F8575E";
                return "#f5f5f5"; // 기본값
              };

              const bgColor = getBgColor(p.polyName);

              return (
                <Person key={`${region}-${p.id}`}>
                  <CardLink to={`${getPersonPath(p)}?region=${encodeURIComponent(region)}`}>
                    {p.photo ? (
                      <ImageWrapper $bg={bgColor}>
                        <Img src={p.photo} alt={`${p.name} 사진`} />
                      </ImageWrapper>
                    ) : (
                      <AvatarFallback
                        aria-label={`${p.name} 사진 없음`}
                        style={{ background: bgColor }}
                      >
                        {getInitials(p.name)}
                      </AvatarFallback>
                    )}
                    <Info>
                      <Name title={p.name}>{p.name}</Name>
                      <Title title={p.title}>{p.title}</Title>
                    </Info>
                  </CardLink>
                </Person>
              );
            })
          )}
        </PeopleCard>
      </MiniPeopleWrap>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
  margin: 10px 0px 10px 0px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Pretendard;
`;

const PageTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const Plus = styled(Link)`
  color: #959595;
  font-size: 13px;
  text-decoration: none;
  margin-right: 35px;
  cursor: pointer;
`;

const MiniPeopleWrap = styled.div`
  display: flex;
  margin: 12px 0 50px;
  &.scroll-container {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  &.scroll-container::-webkit-scrollbar {
    height: 0;
  }
`;

const PeopleCard = styled.div`
  display: flex;
  gap: 3.9%;
`;

const Person = styled.div`
  flex: 0 0 auto;
  width: 95px;
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  cursor: pointer;
`;

const AvatarFallback = styled.div`
  width: 105%;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #f0f1f5;
  color: #555;
  font-weight: 700;
  font-size: 18px;
  user-select: none;
`;

const Info = styled.div`
  padding: 5px 2px 0px;
  text-align: left;
  background: transparent;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Skeleton = styled.div`
  width: 105%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background: linear-gradient(90deg, #f2f2f2 25%, #f7f7f7 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 105%;
  aspect-ratio: 1 / 1;
  background: ${(p) => p.$bg};
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Empty = styled.div`
  color: #999;
  padding: 10px 4px;
`;
