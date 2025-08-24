import React, { useState } from "react";
import {
  Container,
  KeyPromisesContainer,
  Title,
  CategoryItem,
  CategoryHeader,
  CategoryTitle,
  CategoryContent,
  CategoryArrow,
  CategorySummary,
  DetailPromises,
  PromiseCard,
  PromiseCardFront,
  PromiseCardBack,
  PromiseNumber,
  PromiseStatus,
  PromiseContent,
  MoreLink,
  CardTitle,
} from "../ProfileDetail.styles.js";
import { getCategoryPromises } from "../../../shared/utils/politicianApi.js";

const KeyPromises = ({ categories = [] }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [detailPromises, setDetailPromises] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  // 상위 5개 카테고리만 표시
  const top5Categories = categories.slice(0, 5);

  const handleCategoryClick = async (categoryId) => {
    if (expandedCategory === categoryId) {
      // 이미 펼쳐진 카테고리면 닫기
      setExpandedCategory(null);
      return;
    }

    // 다른 카테고리 펼치기
    setExpandedCategory(categoryId);

    // 이미 로드된 데이터가 있으면 재사용
    if (detailPromises[categoryId]) {
      return;
    }

    // 상세 공약 데이터 로드
    setLoadingCategory(categoryId);
    try {
      const promises = await getCategoryPromises(categoryId);
      setDetailPromises((prev) => ({
        ...prev,
        [categoryId]: promises || [],
      }));
    } catch (error) {
      console.error("상세 공약 로드 실패:", error);
      setDetailPromises((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
    } finally {
      setLoadingCategory(null);
    }
  };

  const handleCardClick = (promiseId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [promiseId]: !prev[promiseId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "#6765F7";
      case "이행후 계속추진":
        return "#A3A2FE";
      case "정상추진":
        return "#E1E0FF";
      case "보류":
        return "#E1E1E1";
      default:
        return "#E1E1E1";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "완료":
      case "이행후 계속추진":
        return "white";
      case "정상추진":
      case "보류":
        return "#333";
      default:
        return "#333";
    }
  };

  const getStatusDisplay = (promise) => {
    if (!promise.progress || !promise.progressLabel) {
      return null;
    }
    return {
      color: getStatusColor(promise.progress),
      textColor: getStatusTextColor(promise.progress),
      label: promise.progressLabel,
    };
  };

  if (!top5Categories || top5Categories.length === 0) {
    return (
      <KeyPromisesContainer>
        <div className="key-promises-title">
          <CardTitle>핵심 공약</CardTitle>
        </div>
        <div className="key-promises-content">
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
            아직 등록된 정보가 없어요
          </div>
        </div>
      </KeyPromisesContainer>
    );
  }

  return (
    <KeyPromisesContainer>
      <div className="key-promises-title">
        <CardTitle>핵심 공약</CardTitle>
      </div>
      <div className="key-promises-content">
        {top5Categories.map((category) => {
          const isExpanded = expandedCategory === category.categoryId;
          const isLoading = loadingCategory === category.categoryId;
          const promises = detailPromises[category.categoryId] || [];

          return (
            <CategoryItem key={category.categoryId}>
              <CategoryHeader
                onClick={() => handleCategoryClick(category.categoryId)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategorySummary>{category.content}</CategorySummary>
                </div>
                <CategoryArrow>{isExpanded ? "▲" : "▼"}</CategoryArrow>
              </CategoryHeader>

              {isExpanded && (
                <CategoryContent>
                  {isLoading ? (
                    <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                      세부 공약을 불러오는 중...
                    </div>
                  ) : promises.length > 0 ? (
                    <DetailPromises>
                      {promises.map((promise, promiseIndex) => {
                        const statusDisplay = getStatusDisplay(promise);
                        const isFlipped = flippedCards[promise.promiseId];

                        return (
                          <PromiseCard
                            key={promise.promiseId}
                            onClick={() => handleCardClick(promise.promiseId)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                transformStyle: "preserve-3d",
                                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                transition: "transform 0.4s ease-in-out",
                              }}
                            >
                              {/* 앞면: 공약 내용 */}
                              <PromiseCardFront>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                  <PromiseNumber>{promiseIndex + 1}</PromiseNumber>
                                  <div style={{ flex: 1 }}>
                                    {statusDisplay && (
                                      <PromiseStatus
                                        style={{
                                          backgroundColor: statusDisplay.color,
                                          color: statusDisplay.textColor,
                                        }}
                                      >
                                        {statusDisplay.label}
                                      </PromiseStatus>
                                    )}
                                    <PromiseContent>
                                      <div style={{ fontWeight: "400", marginBottom: "4px" }}>
                                        {promise.name}
                                      </div>
                                    </PromiseContent>
                                  </div>
                                </div>
                              </PromiseCardFront>

                              {/* 뒷면: 공약 목표 */}
                              <PromiseCardBack>
                                <div style={{ background: "#7471F9", padding: "12px" }}>
                                  <div
                                    style={{
                                      font: "12px",
                                      fontWeight: "700",
                                      marginBottom: "4px",
                                      color: "#7471F9",
                                    }}
                                  >
                                    공약 목표
                                  </div>
                                  <div
                                    style={{ color: "#fff", fontSize: "14px", lineHeight: "1.5" }}
                                  >
                                    {promise.goal || "목표 정보가 없습니다."}
                                  </div>
                                </div>
                              </PromiseCardBack>
                            </div>
                          </PromiseCard>
                        );
                      })}
                    </DetailPromises>
                  ) : (
                    <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                      세부 공약이 없습니다.
                    </div>
                  )}
                </CategoryContent>
              )}
            </CategoryItem>
          );
        })}

        {categories.length > 5 && (
          <MoreLink href="#" style={{ marginTop: "16px" }}>
            더 보기 &gt;
          </MoreLink>
        )}
      </div>
    </KeyPromisesContainer>
  );
};

export default KeyPromises;
