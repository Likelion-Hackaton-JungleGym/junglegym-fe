import styled from "styled-components";
import { useEffect, useState } from "react";
import { getDictionaries } from "../../../shared/api/endpoints";
import { getDictionariesDetail } from "../../../shared/api/endpoints";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DICTIONARY } from "../components/JungleDictionaryData";

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
        setList([]);
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
              <Pill>{it.category}</Pill>
              <H3>{it.title}</H3>
              <Sub>{it.subtitle}</Sub>
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
                ×
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedDetail?.desc || selected.desc}
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
  margin: 10px 0 10px 10px;
`;

const Text = styled.div``;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const DictCards = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 10px;
  &.scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  &.scroll-container::-webkit-scrollbar {
    height: 0;
  }
`;

const Card = styled.article`
  position: relative;
  width: 188px;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
  flex: 0 0 auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
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
  top: 0;
  right: 15px;
  width: 40px;
  z-index: 2;
`;

const Body = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  z-index: 1;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;
const Icon = styled.img`
  width: 130px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: #333;
`;

const H3 = styled.h3`
  margin: 8px 0 4px;
  font-size: 17px;
  font-weight: 700;
  color: #111;
`;

const Sub = styled.p`
  font-size: 12px;
  color: #555;
  letter-spacing: -0.3px;
`;

/* ===== Modal ===== */
const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1001;
`;

const ModalCard = styled.div`
  position: relative;
  width: min(92vw, 360px);
  max-height: 82vh;
  overflow: auto;
  border-radius: 16px;
  padding: 18px 18px 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  background: transparent; /* ✅ 이미지가 깔리므로 투명 */
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
  border-radius: 16px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: #6b6b6b;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
`;

const Top = styled.div`
  position: relative;
  z-index: 1; /* 배경 위로 */
  margin-bottom: 8px;
`;

const PillLg = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 700;
  font-size: 12px;
  color: #333;
`;

const ModalTitle = styled.h2`
  margin: 10px 0 2px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: #111;
  line-height: 1.3;
`;

const ModalSub = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  color: #555;
  letter-spacing: -0.2px;
`;

const Desc = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: #222;
  max-height: 42vh;
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
  z-index: 1; /* 배경 위로 */
  display: flex;
  justify-content: center;
  margin: 6px 0 12px;
`;

const IconImg = styled.img`
  width: 120px;
  height: auto;
`;
