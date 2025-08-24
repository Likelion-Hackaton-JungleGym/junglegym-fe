import styled from "styled-components";
import { useEffect, useState } from "react";
import { getDictionaries } from "../../../shared/api/endpoints";
import { getDictionariesDetail } from "../../../shared/api/endpoints";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // 줄바꿈을 위해 필요
import { DICTIONARY } from "../components/JungleDictionaryData";
import xButton from "../components/img/xButton.svg";

export default function JungleDictionary() {
  const [list, setList] = useState([]); // 전체 데이터
  const [selected, setSelected] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const toNum = (v) => (typeof v === "number" ? v : parseInt(v, 10) || 0);

  useEffect(() => {
    console.log("🔍 목록 API 호출 시작");
    getDictionaries()
      .then((data) => {
        console.log("✅ 목록 데이터 받음:", data);
        const sorted = (Array.isArray(data) ? data : [])
          .slice()
          .sort((a, b) => toNum(a.id) - toNum(b.id));
        const assetMap = Object.fromEntries(DICTIONARY.map((d) => [String(d.id), d]));
        const merged = sorted.map((it) => ({ ...it, ...(assetMap[String(it.id)] || {}) }));
        setList(merged);
      })
      .catch((e) => {
        console.error("❌ 목록 API 실패:", e);
        // 임시로 로컬 데이터만 사용
        const assetMap = Object.fromEntries(DICTIONARY.map((d) => [String(d.id), d]));
        const localData = DICTIONARY.map((item) => ({
          ...item,
          ...(assetMap[String(item.id)] || {}),
        }));
        setList(localData);
      });
  }, []);
  const handleCardClick = async (item) => {
    console.log("🔍 선택된 아이템:", item);
    setSelected(item);

    try {
      const detailData = await getDictionariesDetail(item.id);
      setSelectedDetail(detailData);
    } catch (error) {
      console.error("❌ 상세 API 실패:", error);
    }
  };

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [selected]);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // remarkBreaks 플러그인 사용으로 formatContent 함수 불필요

  return (
    <Wrapper>
      <Text>
        <Title>정글사전</Title>
      </Text>

      <DictCards className="scroll-container">
        {list.map((it) => (
          <Card key={it.id} onClick={() => handleCardClick(it)}>
            {it.miniCard && <Bg src={it.miniCard} alt="" aria-hidden />}
            {it.hotRank && <Ribbon src={it.hotRank} alt="hot" />}
            <Body>
              <IconBox>{it.icon && <Icon src={it.icon} alt="" />}</IconBox>
              <CardBottom>
                <Pill>{it.category}</Pill>
                <H3>{it.title}</H3>
                <Sub>{it.subtitle}</Sub>
              </CardBottom>
            </Body>
          </Card>
        ))}
      </DictCards>

      {selected && (
        <>
          <Dim onClick={() => setSelected(null)} />
          <Modal>
            <ModalCard>
              {selected.bigCard && <ModalBg src={selected.bigCard} alt="" />}
              <CloseBtn onClick={() => setSelected(null)} aria-label="닫기">
                <img src={xButton} />
              </CloseBtn>

              <Top>
                <PillLg>{selected.category}</PillLg>
                <ModalTitle>{selected.title}</ModalTitle>
                <ModalSub>{selected.subtitle}</ModalSub>
              </Top>

              {selected.icon && (
                <IconCenter>
                  <IconImg src={selected.icon} alt="" />
                </IconCenter>
              )}
              <Desc>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {selectedDetail?.content ||
                    selected.content ||
                    selectedDetail?.desc ||
                    selected.desc}
                </ReactMarkdown>
              </Desc>
            </ModalCard>
          </Modal>
        </>
      )}
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
  margin: 10px 0 10px 0px;
`;

const Text = styled.div``;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const DictCards = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  &.scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
  }
  &.scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Card = styled.article`
  position: relative;
  margin-bottom: 10px;
  width: clamp(150px, 42vw, 200px);
  aspect-ratio: 200 / 270; /* 높이 자동 */

  border-radius: 10px;
  overflow: hidden;
  flex: 0 0 auto;
  cursor: pointer;
`;

const Bg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

const Ribbon = styled.img`
  position: absolute;
  top: -2px;
  right: 15px;
  width: clamp(36px, 12vw, 50px);
  z-index: 2;
`;

const Body = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px 15px 0px 15px;
  z-index: 1;
  @media (max-width: 390px) {
    padding: 12px;
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  width: clamp(96px, 33vw, 135px);
  height: auto;
  margin: 10px 0px;
`;

const CardBottom = styled.div`
  height: 80px;
  margin: 10px 0px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  color: #333;
  @media (max-width: 390px) {
    font-size: 11px;
  }
`;

const H3 = styled.h3`
  margin: 8px 5px 4px;
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

const Sub = styled.p`
  font-size: 12px;
  margin: 0px 5px 0px;
  color: #555;
  letter-spacing: -0.3px;
`;

/* ===== Modal ===== */
const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(78, 78, 78, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
`;
const HEADER_H = 80; // 실제 헤더 높이에 맞춰 조절
const Modal = styled.div`
  position: fixed;
  /* 상단을 헤더 + 안전영역만큼 비워두고, 남은 영역에서 중앙정렬 */
  inset: calc(env(safe-area-inset-top) + ${HEADER_H}px) 0 0 0;
  display: grid;
  place-items: center;
  z-index: 1001;
  padding: 12px;
`;

const ModalCard = styled.div`
  position: relative;
  width: min(345px, 100%);
  max-width: 100%;
  height: auto;
  max-height: calc(100dvh - (env(safe-area-inset-top) + ${HEADER_H}px) - 24px);
  overflow: hidden auto;
  border-radius: 13px;
  padding: clamp(10px, 2.5vw, 18px) clamp(16px, 4vw, 24px);
  margin: 0px 10px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  background: transparent;
`;

const ModalBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  border-radius: 13px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  width: 44px; /* 터치 타겟 44px 이상 */
  height: 44px;
  border: 0;
  background: transparent;
  color: #7b7b7b;
  font-size: 20px;
  font-weight: 100;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
`;

const Top = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
`;

const PillLg = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  margin-top: 20px;
  margin-left: -3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 500;
  font-size: 12px;
  color: #333;
`;

const ModalTitle = styled.h2`
  margin: 5px 0 2px;
  font-size: clamp(18px, 6vw, 24px);
  font-weight: 500;
  letter-spacing: -0.4px;
  color: #111;
  line-height: 1.3;
`;

const ModalSub = styled.p`
  margin: 0 0 10px;
  font-size: clamp(13px, 4.5vw, 16px);
  color: #333;
  letter-spacing: -0.2px;
`;

const Desc = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: clamp(12px, 3.8vw, 14px);
  max-height: min(56dvh, 480px);
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: #222;
  overflow: auto;
  padding-right: 2px;
  /* 마크다운 기본 요소 약간 정리 */
  & h1,
  & h2,
  & h3 {
    margin: 1em 0 0.5em;
    font-weight: 700;
  }
  & p {
    margin: 0.6em 0;
  }
  & ul,
  & ol {
    padding-left: 1.2em;
  }
  & li {
    margin: 0.2em 0;
  }
  & img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const IconCenter = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin: 12px 0 4px;
`;

const IconImg = styled.img`
  width: clamp(110px, 42vw, 180px);
  height: auto;
`;
