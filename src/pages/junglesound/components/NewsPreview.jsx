import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getNewsletters } from "../../../shared/api/endpoints";

const stripMarkdown = (s = "") =>
  String(s)
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|_)/g, "")
    .replace(/~~/g, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ""))
    .replace(/^[>]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const ellipsize = (text = "", max = 60) => {
  const t = text.trim();
  return t.length > max ? { text: t.slice(0, max), truncated: true } : { text, truncated: false };
};

const DEFAULT_REGION = "성북구";
const toNum = (v) => (typeof v === "number" ? v : parseInt(v, 10) || 0);

export default function NewsPreview({ region: propRegion }) {
  const [searchParams] = useSearchParams();
  // URL > props > sessionStorage > 기본값
  const region = useMemo(() => {
    const fromUrl = searchParams.get("region");
    if (fromUrl) return decodeURIComponent(fromUrl);
    if (propRegion) return propRegion;
    return sessionStorage.getItem("selectedRegion") || DEFAULT_REGION;
  }, [propRegion, searchParams]);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        // ⬇️ 지역 파라미터 전달!
        const data = await getNewsletters({
          signal: ctrl.signal,
          params: { regionName: region },
        });

        const arr = Array.isArray(data) ? data : [];
        // 서버가 region 필터를 안 해주면 클라에서 한 번 더 필터
        const filtered = arr.some((x) => x.regionName)
          ? arr.filter((x) => x.regionName === region)
          : arr;

        const sorted = filtered.slice().sort((a, b) => toNum(a.id) - toNum(b.id));
        setList(sorted);
      } catch (e) {
        // 🔇 취소는 무시 (StrictMode 개발모드에서 흔함)
        if (
          e?.code === "ERR_CANCELED" ||
          e?.name === "CanceledError" ||
          e?.message === "canceled" ||
          ctrl.signal.aborted
        ) {
          return;
        }
        console.error("[NewsPreview] fetch 실패:", e);
        setList([]);
      } finally {
        if (!cancelled) setLoading(false); // 언마운트 후 상태 변경 방지
      }
    })();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [region]);

  if (loading) return <Empty>불러오는 중…</Empty>;
  if (!list.length) return <Empty>이 지역의 뉴스레터가 없어요.</Empty>;

  return (
    <>
      {list.map((it) => {
        const title = stripMarkdown(it.title);
        const preview = stripMarkdown(it.content1);
        const { text, truncated } = ellipsize(preview, 60);

        return (
          <Wrapper key={`${region}-${it.id}`}>
            <PreviewWrapper>
              <NewsTitle>{title}</NewsTitle>
              <Date>{it.date}</Date>
              <PreviewContents>
                {text}
                {truncated && <More>···</More>}
              </PreviewContents>
              <ThumbnailWrapper>
                <Thumbnail src={it.thumbnail} alt="" />
              </ThumbnailWrapper>
            </PreviewWrapper>
            {/* 지역 컨텍스트 유지 */}
            <LinkButton to={`/junglesound/${it.id}?region=${encodeURIComponent(region)}`}>
              <Detail>{`자세히 보기 >`}</Detail>
            </LinkButton>
          </Wrapper>
        );
      })}
    </>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
  border: 0.5px solid #d2d2d2;
  margin: 10px 5px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(17, 17, 17, 0.05);
  overflow: hidden;
`;

const PreviewWrapper = styled.div`
  padding: 20px;
  white-space: pre-wrap;
`;

const NewsTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111;
  margin-bottom: 6px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #8a8a8a;
  margin: 10px 0px;
  right: 0;
`;

const PreviewContents = styled.div`
  font-size: 13px;
  line-height: 1.3;
  color: #444;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const ThumbnailWrapper = styled.div`
  margin-top: 14px;
  height: 160px;
  background: #f3f3f5;
  overflow: hidden;
  border-radius: 5px;
`;

const Detail = styled.div`
  background-color: #7471f9;
  color: #ffffff;
  font-weight: 300;
  font-size: 14px;
  text-align: center;
  padding: 12px 16px;
`;

const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: white;
`;

const More = styled.span`
  color: #7471f9;
`;
