import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getNewsletterDetail } from "../../../shared/api/endpoints";
import chevronBack from "./img/chevron-back.svg";
import newsLinkIcon from "./img/newsLinkIcon.svg";

export default function Newsletter() {
  const params = useParams();
  const newsletterId = params.newsletterId ?? params.id;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setHeaderMode } = useOutletContext() ?? {};

  // 최신 요청만 반영하기 위한 요청 ID 시퀀스
  const reqIdRef = useRef(0);

  useEffect(() => {
    setHeaderMode?.("hidden");
    return () => setHeaderMode?.("fixed");
  }, [setHeaderMode]);

  useEffect(() => {
    console.log("[detail] 전체 params =", params);
    console.log("[detail] newsletterId =", newsletterId, typeof newsletterId);
    console.log("[detail] 현재 URL =", window.location.pathname);

    if (!newsletterId) {
      console.log("[detail] newsletterId가 없음");
      setItem(null);
      setLoading(false);
      return;
    }

    const myId = ++reqIdRef.current; // 이 이펙트의 요청 ID
    setLoading(true);

    // axios AbortController 사용 가능(axios v1 이상)
    const controller = new AbortController();

    (async () => {
      try {
        console.log("[detail] API 호출 시작...");
        const data = await getNewsletterDetail(newsletterId, { signal: controller.signal });
        // 최신 요청만 반영
        if (reqIdRef.current === myId) {
          console.log("[detail] API 호출 결과:", data);
          setItem(data);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          console.log("[detail] 요청 취소됨");
        } else {
          console.error("[detail] 에러 발생:", error);
          if (reqIdRef.current === myId) setItem(null);
        }
      } finally {
        if (reqIdRef.current === myId) setLoading(false);
      }
    })();

    // cleanup: 다음 요청이 시작되면 이전 요청 취소
    return () => controller.abort();
  }, [newsletterId, params]);

  if (loading) return <Empty>불러오는 중…</Empty>;

  if (!item) {
    return (
      <Empty>
        페이지를 찾을 수 없습니다. <br />
        <br />
        <BackButton to="/junglesound">{">정글의 소리로 돌아가기"}</BackButton>
      </Empty>
    );
  }

  return <NewsletterView {...item} />;
}

/* --- 보정 유틸: 따옴표가 굵게 안 먹는 케이스 자동 수정 --- */
const fixBoldQuotes = (s = "") =>
  s
    // 스마트 쿼트 ‘ ’
    .replace(/\*\*‘(.+?)’\*\*/g, "‘**$1**’")
    // 스마트 쿼트 “ ”
    .replace(/\*\*“(.+?)”\*\*/g, "“**$1**”")
    // 일반 따옴표 ' "
    .replace(/\*\*'(.+?)'\*\*/g, "'**$1**'")
    .replace(/\*\*"(.+?)"\*\*/g, '"**$1**"');

const getYoutubeThumb = (link) => {
  const m = link?.match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

function NewsletterView({
  title,
  date,
  link,
  mediaImgUrl,
  inTitle,
  subtitle1,
  content1,
  subtitle2,
  content2,
  todayQuestion,
  titleQuestion,
  questionContent,
  thumbnail,
  thumbnailUrl,
}) {
  const thumb = thumbnail || thumbnailUrl || getYoutubeThumb(link) || "/placeholder.png";
  const md = (x) => fixBoldQuotes(x ?? "");

  return (
    <Wrapper>
      <Top>
        <ChevronImg to="/junglesound" aria-label="뒤로가기">
          <img src={chevronBack} alt="뒤로가기" />
        </ChevronImg>
      </Top>

      <Bottom>
        <Title>{title}</Title>
        <Date>{date}</Date>

        <ThumbnailWrapper>
          <Thumbnail
            src={thumb}
            alt="뉴스 썸네일"
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
          />
          {link && (
            <NewsLinkAnchor
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="원문 보기"
            >
              <NewsLink src={newsLinkIcon} alt="원문 링크" />
            </NewsLinkAnchor>
          )}
        </ThumbnailWrapper>

        {mediaImgUrl && (
          <PercentWrapper>
            <PercentText>이슈를 다룬 채널의 정치 성향 분포</PercentText>
            <PercentImg src={mediaImgUrl} alt="미디어 로고" />
          </PercentWrapper>
        )}

        {inTitle && <InTitle>{inTitle}</InTitle>}

        {subtitle1 && <Subtitle1>{subtitle1}</Subtitle1>}
        {content1 && (
          <Md>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{md(content1)}</ReactMarkdown>
          </Md>
        )}

        {subtitle2 && <Subtitle2>{subtitle2}</Subtitle2>}
        {content2 && (
          <Md>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{md(content2)}</ReactMarkdown>
          </Md>
        )}

        {todayQuestion && <TodayQuestion>{todayQuestion}</TodayQuestion>}
        {titleQuestion && <TitleQuestion>{titleQuestion}</TitleQuestion>}
        {questionContent && (
          <QuestionContentWrapper>
            <Md>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{md(questionContent)}</ReactMarkdown>
            </Md>
          </QuestionContentWrapper>
        )}
      </Bottom>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
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
  border-bottom: 1.5px solid #dfdfdf;
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
  margin: 8px 3px 6px 3px;
`;

const Date = styled.div`
  color: #808080;
  font-size: 13px;
  font-weight: 400;
  margin: 20px 3px 7px;
`;

const ThumbnailWrapper = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  height: 190px;
  margin: 0px 3px 14px 3px;
  overflow: hidden;
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const NewsLinkAnchor = styled.a`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: inline-flex;
  padding: 6px;
  border-radius: 999px;
`;

const NewsLink = styled.img`
  width: 36px;
  height: 36px;
  display: block;
`;

const PercentWrapper = styled.div`
  background-color: #f3f3f3;
  border-radius: 8px;
  margin: 0px 3px 40px;
  height: 70px;
  border: 1px solid #e1e1e1;
`;

const PercentText = styled.div`
  font-size: 14px;
  margin: 1px 3px 3px;
  padding: 10px 10px 0px;
`;

const PercentImg = styled.img`
  width: 340px;
  height: auto;
  display: block;
  padding: 3px 10px 0px;
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

const Md = styled.div`
  font-size: 14px;
  margin-top: 5px;
  line-height: 1.6;
  padding-left: 3px;
  font-weight: 300;
  white-space: pre-wrap;

  p {
    margin: 0 0 10px 0;
  }
  ul,
  ol {
    margin: 0 0 10px 18px;
    line-height: 1.2;
    // margin-bottom: 0;
  }
  strong {
    font-weight: 600;
  }
`;

const Subtitle2 = styled(Subtitle1)`
  margin-top: 30px;
`;

const TodayQuestion = styled.div`
  position: relative;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
  color: #111;
  margin: 30px 3px 6px 0px;
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
  font-size: 17px;
  font-weight: 500;
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

const QuestionContentWrapper = styled.div`
  margin-top: -10px;
  letter-spacing: 0.01em; /* 글자 간격 */
  word-spacing: 0.02em; /* 단어 간격 (한국어엔 영향 적지만 섞인 영문에 도움) */
  line-height: 1.7; /* 줄 간격 */
  //word-break: keep-all; /* 한국어 단어 중간 줄바꿈 방지 */
  overflow-wrap: anywhere; /* 너무 긴 단어 강제 줄바꿈 */

  /* ⬇️ 이 섹션(질문 리스트) 안에서만 목록 간격 타이트하게 */
  ${Md} ul,
 ${Md} ol {
    margin: 0 0 6px 18px; /* 리스트 블록 자체 아래 여백 살짝 축소 */
  }
  ${Md} li {
    margin-bottom: -13px; /* 항목-항목 간격 축소 (필요시 0~6px 사이에서 조절) */
    line-height: 1.4; /* 항목 내부 줄간도 약간 타이트하게 */
  }
  ${Md} li:last-child {
    margin-bottom: 0; /* 마지막 항목은 추가 여백 제거 */
  }
  ${Md} li p {
    margin: 0; /* ReactMarkdown이 li 안에 p를 넣어 줄 때 생기는 여백 제거 */
  }
`;
