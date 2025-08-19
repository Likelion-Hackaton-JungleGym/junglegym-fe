import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { SOUND } from "./NewsletterData.js";

export default function Newsletters({ id: propId }) {
  const { id: routeId } = useParams();
  const id = propId ?? routeId;

  const items = Array.isArray(SOUND) ? SOUND : Object.values(SOUND ?? {});
  const sound = id
    ? Array.isArray(SOUND)
      ? items.find((it) => String(it.NewsLink ?? it.id ?? it.slug) === String(id))
      : SOUND[id] ?? items.find((it) => String(it.NewsLink ?? it.id ?? it.slug) === String(id))
    : undefined;

  if (!sound) {
    return (
      <Empty>
        페이지를 찾을 수 없습니다. <br />
        <br />
        <LinkButton to="/junglesound">{">정글의 소리로 돌아가기"}</LinkButton>
      </Empty>
    );
  }

  const keyForRoute = encodeURIComponent(String(sound.NewsLink ?? sound.id ?? sound.slug));

  return <SoundView {...sound} keyForRoute={keyForRoute} />;
}

const stripHtml = (html = "") =>
  String(html)
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
  return t.length > max
    ? { text: t.slice(0, max), truncated: true }
    : { text: t, truncated: false };
};

function SoundView({ title, date, content1, newsLink, thumbnail, keyForRoute }) {
  const { text, truncated } = ellipsize(stripHtml(content1), 60);
  return (
    <Wrapper>
      <PreviewWrapper>
        <NewsTitle>{title}</NewsTitle>
        <Date>{date}</Date>
        <PreviewContents>
          {text}
          {truncated && <More>···</More>}
        </PreviewContents>
        <BackButton to={newsLink}>
          <EtcLink>{thumbnail}</EtcLink>
        </BackButton>
      </PreviewWrapper>
      <LinkButton to={`/junglesound/${keyForRoute}`}>
        <Detail>{`자세히 보기 >`}</Detail>
      </LinkButton>
    </Wrapper>
  );
}

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

const EtcLink = styled.div`
  margin-top: 14px;
  height: 120px;
  background: #f3f3f5;
  display: grid;
  place-items: center;
  color: #b1b1b8;
  font-size: 14px;
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

const BackButton = styled(Link)`
  text-decoration: none;
  color: darkgray;
`;
