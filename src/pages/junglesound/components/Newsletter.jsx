import styled from "styled-components";
import { useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";

import { SOUND } from "./NewsletterData.js";
import chevronBack from "./img/chevron-back.svg";
import newsLinkIcon from "./img/newsLinkIcon.svg";

export default function Newsletter() {
  const { id } = useParams();
  const key = decodeURIComponent(String(id || ""));

  const items = Array.isArray(SOUND) ? SOUND : Object.values(SOUND ?? {});
  const newsletter = Array.isArray(SOUND)
    ? items.find((it) => String(it.NewsLink ?? it.id ?? it.slug) === key)
    : SOUND[key] ?? items.find((it) => String(it.NewsLink ?? it.id ?? it.slug) === key);

  if (!newsletter) {
    return (
      <Empty>
        페이지를 찾을 수 없습니다. <br />
        <br />
        <BackButton to="/junglesound">{">정글의 소리로 돌아가기"}</BackButton>
      </Empty>
    );
  }

  return <NewsletterView {...newsletter} />;
}

function NewsletterView({
  title,
  date,
  thumbnail,
  newsLink,
  percentImg,
  inTitle,
  subtitle1,
  content1,
  subtitle2,
  content2,
  todayQuestion,
  titleQuestion,
  questionContent,
}) {
  const { setHeaderMode } = useOutletContext();

  useEffect(() => {
    setHeaderMode?.("hidden");
    return () => setHeaderMode?.("fixed");
  }, [setHeaderMode]);

  return (
    <Wrapper>
      <Top>
        <ChevronImg to="/junglesound">
          <img src={chevronBack} alt="뒤로가기" />
        </ChevronImg>
      </Top>
      <Bottom>
        <Title>{title}</Title>
        <Date>{date}</Date>
        <ThumbnailWrapper>
          <Thumbnail src={thumbnail} alt="뉴스 썸네일" />
          {newsLink && (
            <NewsLinkWrapper
              to={newsLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="원문 보기"
            >
              <NewsLink src={newsLinkIcon} alt="원문 링크" />
            </NewsLinkWrapper>
          )}
        </ThumbnailWrapper>
        <PercentWrapper>
          <PercentImg src={percentImg} />
        </PercentWrapper>
        <InTitle>{inTitle}</InTitle>
        <Subtitle1>{subtitle1}</Subtitle1>
        <Content1>{content1}</Content1>
        <Subtitle2>{subtitle2}</Subtitle2>
        <Content2>{content2}</Content2>
        <TodayQuestion>{todayQuestion}</TodayQuestion>
        <TitleQuestion>{titleQuestion}</TitleQuestion>
        <QuestionContent>{questionContent}</QuestionContent>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* margin: 0px 3px; */
  white-space: pre-line;
`;

const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
`;

const BackButton = styled(Link)`
  text-decoration: none;
  color: darkgray;
`;

const Top = styled.div`
  height: 120px;
  border-bottom: 1px solid #e9e9e9;
  padding-left: 13px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: 15px;
`;

const ChevronImg = styled(Link)``;

const Bottom = styled.div`
  margin: 10px;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #111;
  margin: 10px 3px 6px 3px;
`;

const Date = styled.div`
  color: #808080;
  font-size: 13px;
  font-weight: 400;
  margin: 20px 3px 7px;
`;

const ThumbnailWrapper = styled.div`
  background-color: #e6e5e5;
  border-radius: 5px;
  height: 170px;
  margin: 0px 3px 14px 3px;
  overflow: hidden;
  position: relative; /* 아이콘 배치용 */
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* 가운데 기준으로 균등하게 잘림 */
  display: block;
`;

const NewsLinkWrapper = styled(Link)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: inline-flex;
  padding: 6px;
  border-radius: 999px;
`;

const NewsLink = styled.img`
  width: 25px;
  height: 25px;
  display: block;
`;

const PercentWrapper = styled.div`
  background-color: #d1d1d1;
  border-radius: 8px;
  margin: 0px 3px 40px 3px;
  height: 70px;
`;

const PercentImg = styled.img`
  width: 100%;
  display: block;
`;

const InTitle = styled.span`
  font-size: 21px;
  font-weight: 500;
  color: #111;
  margin-bottom: 6px;
  padding-left: 3px;
  padding-right: 2px;
  background: linear-gradient(to top, #e1e0ff 40%, transparent 40%);
  display: inline;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

const Subtitle1 = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  padding-left: 3px;
`;

const Content1 = styled.div`
  font-size: 14px;
  margin-top: 5px;
  line-height: 1.45;
  padding-left: 3px;
  font-weight: 300;
`;

const Subtitle2 = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  padding-left: 3px;
`;

const Content2 = styled.div`
  font-size: 14px;
  margin-top: 5px;
  line-height: 1.45;
  margin-bottom: 50px;
  padding-left: 3px;
  font-weight: 300;
`;

const TodayQuestion = styled.div`
  position: relative;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
  color: #111;
  margin: 0px 3px 6px 0px;
  z-index: 0;
  padding-left: 3px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.08em;
    height: 12px;
    width: 103%;
    background: #e1e0ff;
    border-radius: 2px;
    z-index: -1;
    transform: translateY(4px);
  }
`;

const TitleQuestion = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 5px 5px 16px;
  margin: 5px 3px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 4px;
    width: 4px;
    background: #9290ff;
  }
`;

const QuestionContent = styled.div`
  font-size: 14px;
  margin: 7px 10px 10px;
  padding-left: 3px;
  font-weight: 300;
  line-height: 1.4;
`;
