import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNewsletters } from "../../../shared/api/endpoints";

// HTML & 마크다운 기호 제거 함수
const stripMarkdown = (s = "") =>
  String(s)
    // 이미지 ![alt](url)
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    // 링크 [text](url) -> text
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    // 굵게/기울임 **, *, _, __
    .replace(/(\*\*|__|\*|_)/g, "")
    // 취소선 ~~
    .replace(/~~/g, "")
    // 인라인 코드 `code`
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ""))
    // 헤더/리스트/인용
    .replace(/^[>]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    // HTML 태그
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    // 특수 엔티티
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // 공백 정리
    .replace(/\s+/g, " ")
    .trim();

const ellipsize = (text = "", max = 60) => {
  const t = text.trim();
  return t.length > max
    ? { text: t.slice(0, max), truncated: true }
    : { text: t, truncated: false };
};

export default function NewsPreview() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getNewsletters();
        setList(data);
      } catch {
        setList([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Empty>불러오는 중…</Empty>;
  if (!list.length) return <Empty>표시할 뉴스레터가 없어요.</Empty>;

  return (
    <>
      {list.map((it) => {
        const title = stripMarkdown(it.title); // 제목에서도 기호 제거
        const preview = stripMarkdown(it.content1); // 본문 요약도 기호 제거
        const { text, truncated } = ellipsize(preview, 60);

        return (
          <Wrapper key={it.id}>
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
            <LinkButton to={`/junglesound/${it.id}`}>
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
  height: 120px;
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
