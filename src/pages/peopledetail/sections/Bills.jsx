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
import Pagination from "./Pagination.jsx";

const Bills = ({ bills = [], totalPages = 1, currentPage = 1, onPageChange }) => {
  const [flipped, setFlipped] = useState({});

  // 발의법률안이 없을 때 처리
  if (!bills || bills.length === 0) {
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#666",
          fontSize: "14px",
          background: "#fff",
          border: "1px solid #d9d9d9",
          borderRadius: "12px",
        }}
      >
        아직 등록된 정보가 없어요
      </div>
    );
  }

  const handlePageChange = (page) => {
    onPageChange(page);
    setFlipped({}); // 페이지 변경 시 모든 카드를 앞면으로
  };

  // 각 법안의 상세 정보를 뒷면 데이터로 사용
  const backMap = useMemo(() => {
    const map = new Map();
    bills.forEach((bill, i) => {
      // API 데이터에서 상세 정보 추출
      const backData = {
        category: bill.category || "아직 미확정",
        link: bill.link || "",
        details: bill.details || [],
      };
      map.set(i, backData);
    });
    return map;
  }, [bills]);

  const toggleFlip = (idx) => setFlipped((p) => ({ ...p, [idx]: !p[idx] }));
  const onKeyToggle = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(idx);
    }
  };

  return (
    <>
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
                    borderRadius: 15,
                    background: "#fff",
                    padding: 20,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}
                  >
                    <h4
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#000",
                        margin: 0,
                        flex: 1,
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {bill.title}
                    </h4>
                    <div
                      style={{ display: "flex", alignItems: "flex-start", gap: 5, flexShrink: 0 }}
                    >
                      <span
                        style={{
                          padding: "4px 13px",
                          borderRadius: 12,
                          fontSize: 12,
                          fontWeight: 500,
                          background: "#E1E0FF",
                          color: "#4B48F3",
                          whiteSpace: "nowrap",
                          marginTop: "2px",
                        }}
                      >
                        {bill.status}
                      </span>
                      <Arrow
                        style={{
                          transform: isFlipped ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          marginTop: "2px",
                        }}
                      >
                        <img src={NextIcon} alt="뒤집기" />
                      </Arrow>
                    </div>
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
                    background: "#746F89",
                    padding: "20px 20px",
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
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            background: "#FFFFFF",
                            color: "#2F2E34",
                            fontSize: 12,
                            fontWeight: 600,
                            borderRadius: 30,
                            padding: "5px 10px",
                          }}
                        >
                          {back.category || back.status || "아직 미확정"}
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
                              fontSize: 12,
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
                              {d.replace(/^[•·\s]+/, "")}
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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Bills;
