import React, { useState } from "react";
import {
  KeyPromisesContainer,
  CategoryItem,
  CategoryHeader,
  CategoryTitle,
  CategoryContent,
  CategoryArrow,
  CategorySummary,
  DetailPromises,
  PromiseNumber,
  PromiseStatus,
  PromiseContent,
  MoreLink,
  CardTitle,
  CategoryDivider,
  EmptyMessage,
} from "../ProfileDetail.styles.js";
import { getCategoryPromises } from "../../../shared/utils/politicianApi.js";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon.svg";

const KeyPromises = ({ categories = [], homepageUrl = null }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [detailPromises, setDetailPromises] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  // 모든 카테고리 표시
  const allCategories = categories;

  const handleCategoryClick = async (categoryId) => {
    // 같은 카테고리를 클릭한 경우: 토글 (열려있으면 닫기, 닫혀있으면 열기)
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);

      // 토글이 닫힐 때 해당 카테고리의 뒤집힌 카드들을 초기화
      const currentPromises = detailPromises[categoryId] || [];
      const newFlippedCards = { ...flippedCards };
      currentPromises.forEach((promise) => {
        if (newFlippedCards[promise.promiseId]) {
          delete newFlippedCards[promise.promiseId];
        }
      });
      setFlippedCards(newFlippedCards);
      return;
    }

    // 다른 카테고리를 클릭한 경우: 기존 토글 닫고 새로운 토글 열기
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
        return "#E1E0FF";
      case "이행후 계속추진":
        return "#D8ECFF";
      case "정상추진":
        return "#D8ECFF";
      case "보류":
        return "#FFE5E6";
      default:
        return "#E1E0FF";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "완료":
        return "#4846D8";
      case "이행후 계속추진":
        return "#3889E0";
      case "정상추진":
        return "#3889E0";
      case "보류":
        return "#FF2B38";
      default:
        return "#4846D8";
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

  if (!allCategories || allCategories.length === 0) {
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
        {allCategories.map((category) => {
          const isExpanded = expandedCategory === category.categoryId;
          const isLoading = loadingCategory === category.categoryId;
          const promises = detailPromises[category.categoryId] || [];

          return (
            <React.Fragment key={category.categoryId}>
              <CategoryItem>
                <CategoryHeader onClick={() => handleCategoryClick(category.categoryId)}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <CategoryTitle>{category.title}</CategoryTitle>
                      <CategoryArrow>
                        <img
                          src={ArrowDownIcon}
                          alt="화살표"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </CategoryArrow>
                    </div>
                    <CategorySummary>{category.content}</CategorySummary>
                  </div>
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
                          const hasGoal = promise.goal && promise.goal.trim() !== "";

                          return (
                            <div key={promise.promiseId} style={{ marginBottom: 8 }}>
                              <div
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    if (hasGoal) {
                                      handleCardClick(promise.promiseId);
                                    }
                                  }
                                }}
                                onClick={() => {
                                  if (hasGoal) {
                                    handleCardClick(promise.promiseId);
                                  }
                                }}
                                style={{
                                  position: "relative",
                                  borderRadius: 12,
                                  cursor: hasGoal ? "pointer" : "default",
                                  minHeight: "80px",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                {/* 앞면: 공약 내용 */}
                                <div
                                  style={{
                                    border: "1px solid #D2D2D2",
                                    borderRadius: 12,
                                    background: "#fff",
                                    padding: "20px",
                                    opacity: isFlipped ? 0 : 1,
                                    transition: "opacity 0.6s ease-in-out",
                                    pointerEvents: isFlipped ? "none" : "auto",
                                    zIndex: isFlipped ? 1 : 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    width: "100%",
                                    minHeight: "80px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 8,
                                      width: "100%",
                                      justifyContent: "center",
                                    }}
                                  >
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
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                      <PromiseNumber>{promiseIndex + 1}</PromiseNumber>
                                      <PromiseContent>{promise.name}</PromiseContent>
                                    </div>
                                  </div>
                                </div>

                                {/* 뒷면: 공약 목표 (목표가 있을 때만 렌더링) */}
                                {hasGoal && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      border: "1px solid #D2D2D2",
                                      borderRadius: 12,
                                      background: "#7471F9",
                                      padding: "20px",
                                      opacity: isFlipped ? 1 : 0,
                                      transition: "opacity 0.6s ease-in-out",
                                      pointerEvents: isFlipped ? "auto" : "none",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      gap: 8,
                                      zIndex: isFlipped ? 2 : 1,
                                      minHeight: "80px",
                                      width: "100%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        alignItems: "flex-start",
                                        width: "100%",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#7471F9",
                                          fontSize: "12px",
                                          fontWeight: "700",
                                          background: "#fff",
                                          border: "1px solid #D2D2D2",
                                          borderRadius: "9px",
                                          padding: "2px 10px",
                                          alignSelf: "flex-start",
                                        }}
                                      >
                                        공약 목표
                                      </div>
                                      <div
                                        style={{
                                          color: "#fff",
                                          fontSize: "13px",
                                          lineHeight: "1.4",
                                          width: "100%",
                                        }}
                                      >
                                        {promise.goal}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </DetailPromises>
                    ) : (
                      <EmptyMessage>세부 공약이 없습니다.</EmptyMessage>
                    )}
                  </CategoryContent>
                )}
              </CategoryItem>
              {/* 모든 CategoryItem 뒤에 구분선 추가 */}
              <CategoryDivider />
            </React.Fragment>
          );
        })}

        {homepageUrl && (
          <MoreLink
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            더 보기 &gt;
          </MoreLink>
        )}
      </div>
    </KeyPromisesContainer>
  );
};

export default KeyPromises;
