import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { SOUND } from "./NewsletterData.js";

export default function Newsletters({ id: propId }) {
  const { id: routeId } = useParams();
  const id = propId ?? routeId;
  const sound = id ? SOUND[id] : undefined;

  if (!sound) {
    return (
      <Empty>
        존재하지 않는 소리예요. <Link to="/junglesound">목록으로</Link>
      </Empty>
    );
  }

  return <SoundView {...sound} />;
}

function SoundView({ newsletterTitle, date, previewContents, etcLink }) {
  return (
    <Wrapper>
      <PreviewWrapper>
        <NewsletterTitle>{newsletterTitle}</NewsletterTitle>
        <Date>{date}</Date>
        <PreviewContents dangerouslySetInnerHTML={{ __html: previewContents }} />
        <EtcLink>{etcLink}</EtcLink>
      </PreviewWrapper>
      <Detail>{`자세히 보기 >`}</Detail>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  border: 0.5px solid #d2d2d2;
  margin: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(17, 17, 17, 0.05);
  overflow: hidden;
`;

const PreviewWrapper = styled.div`
  padding: 20px;
`;

const NewsletterTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #8a8a8a;
  margin-bottom: 10px;
`;

const PreviewContents = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #444;
`;

const EtcLink = styled.div`
  margin-top: 14px;
  height: 140px;
  //border-radius: 12px;
  background: #f3f3f5;
  display: grid;
  place-items: center;
  color: #b1b1b8;
  font-size: 14px;
`;

const Detail = styled.div`
  background-color: #7471f9;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  padding: 12px 16px;
`;

const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
`;
