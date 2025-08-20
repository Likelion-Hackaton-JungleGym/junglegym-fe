import styled from "styled-components";
import { useEffect, useState } from "react";
import { DICTIONARY } from "../components/JungleDictionaryData.js";

export default function JungleDictionary() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [selected]);

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
        {DICTIONARY.map((it) => (
          <Card key={it.id} onClick={() => setSelected(it)}>
            <Bg src={it.miniCard} alt="" aria-hidden />
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
          <Modal role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
              <ModalBg src={selected.bigCard} alt="" aria-hidden />

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

              <Desc>{selected.desc}</Desc>
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
  background: #f8cdb1; /* 배경 이미지 로드 전 폴백 색 */
`;

const ModalBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 배경 꽉 채우기 */
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

const Desc = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: -0.2px;
  white-space: pre-line;
  color: #222;
  max-height: 42vh;
  overflow: auto;
  padding-right: 2px;
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
