import { useState, useMemo } from "react";
import {
  ListContainer,
  DateText,
  Arrow,
  ProposerContainer,
  ProposerLabel,
  ProposerName,
  ProposerNames,
} from "../ProfileDetail.styles.js";
import NextIcon from "../../../assets/icons/NextIcon.svg";
import LinkIcon from "../../../assets/icons/LinkIcon.svg";

/** 뒷면 데이터 매칭: id → title → index 순으로 찾는다 */
function findBackData(frontBill, idx, nextBills) {
  if (!nextBills || nextBills.length === 0) return null;

  // 1) id 매칭
  if (frontBill?.id != null) {
    const byId = nextBills.find((b) => b?.id === frontBill.id);
    if (byId) return byId;
  }
  // 2) title 정확 일치
  if (frontBill?.title) {
    const byTitle = nextBills.find((b) => b?.title === frontBill.title);
    if (byTitle) return byTitle;
  }
  // 3) index 폴백
  return nextBills[idx] || null;
}

const Bills = ({ bills = [], nextBills = [] }) => {
  const [flipped, setFlipped] = useState({});

  // 미리 앞→뒤 매칭 테이블 구성(성능/안정성)
  const backMap = useMemo(() => {
    const map = new Map();
    bills.forEach((front, i) => {
      map.set(i, findBackData(front, i, nextBills));
    });
    return map;
  }, [bills, nextBills]);

  const toggleFlip = (idx) => setFlipped((p) => ({ ...p, [idx]: !p[idx] }));
  const onKeyToggle = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(idx);
    }
  };

  return (
    <ListContainer style={{ gap: 16 }}>
      {bills.map((bill, index) => {
        const isFlipped = !!flipped[index];
        const back = backMap.get(index); // 뒷면에 쓸 nextBills 데이터(없으면 null)

        return (
          <div key={bill.id ?? index} style={{ perspective: "1200px" }}>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyToggle(e, index)}
              onClick={() => toggleFlip(index)}
              style={{
                position: "relative",
                borderRadius: 12,
                height: "100%",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.4s ease-in-out",
                cursor: "pointer",
                willChange: "transform",
              }}
            >
              {/* FRONT: bills */}
              <div
                style={{
                  position: "relative",
                  border: "1px solid #D2D2D2",
                  borderRadius: 12,
                  background: "#fff",
                  padding: 16,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#333",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {bill.title}
                  </h4>
                  <span
                    style={{
                      padding: "4px 13px",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500,
                      background: "#E1E0FF",
                      color: "#4B48F3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bill.status}
                  </span>
                  <Arrow
                    style={{
                      transform: isFlipped ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <img src={NextIcon} alt="뒤집기" />
                  </Arrow>
                </div>

                <DateText>{bill.date} 발의</DateText>
                <ProposerContainer>
                  <ProposerLabel>대표발의자</ProposerLabel>
                  <ProposerName>{bill.mainProposer}</ProposerName>
                </ProposerContainer>
                <ProposerContainer>
                  <ProposerLabel>공동발의자</ProposerLabel>
                  <ProposerNames>{(bill.coProposers ?? []).join(", ")}</ProposerNames>
                </ProposerContainer>
              </div>

              {/* BACK: nextBills 매칭 결과(back) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid #D2D2D2",
                  borderRadius: 12,
                  background: "#6E67A6",
                  padding: "20px 20px 18px",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {/* back 데이터가 있을 때만 표시, 없으면 간단 안내 */}
                {back ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span
                        style={{
                          display: "inline-block",
                          background: "#EDEBFF",
                          color: "#3D388F",
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: "6px 10px",
                        }}
                      >
                        {back.category || back.status || "정보"}
                      </span>

                      {back.link && (
                        <a
                          href={back.link}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            color: "#fff",
                            fontSize: 14,
                          }}
                          title="관련 링크"
                        >
                          <img src={LinkIcon} alt="Notice" />
                        </a>
                      )}
                    </div>

                    <div style={{ overflow: "visible", maxHeight: "none" }}>
                      <ul style={{ margin: 0, paddingLeft: 13 }}>
                        {(back.details ?? []).map((d, i) => (
                          <li key={i} style={{ color: "#fff", fontSize: 12, marginBottom: 6 }}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div style={{ color: "#fff", fontSize: 14 }}>연결된 상세 정보가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </ListContainer>
  );
};

export default Bills;
