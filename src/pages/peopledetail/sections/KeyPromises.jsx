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
  CategoryDivider,
  Card3DContainer,
  Card3DWrapper,
  CardFront,
  CardBack,
  CardContentContainer,
  CardContentRow,
  BackContent,
  BackTitle,
  BackText,
  EmptyMessage,
} from "../ProfileDetail.styles.js";
import { getCategoryPromises } from "../../../shared/utils/politicianApi.js";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon.svg";

const KeyPromises = ({ categories = [] }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [detailPromises, setDetailPromises] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  // 상위 5개 카테고리만 표시
  const top5Categories = categories.slice(0, 5);

  const handleCategoryClick = async (categoryId) => {
    // 같은 카테고리를 클릭한 경우: 토글 (열려있으면 닫기, 닫혀있으면 열기)
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      
      // 토글이 닫힐 때 해당 카테고리의 뒤집힌 카드들을 초기화
      const currentPromises = detailPromises[categoryId] || [];
      const newFlippedCards = { ...flippedCards };
      currentPromises.forEach(promise => {
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
                          <Card3DContainer key={promise.promiseId}>
                            <Card3DWrapper
                              role="button"
                              tabIndex={0}
                              $isFlipped={isFlipped}
                              $hasGoal={hasGoal}
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
                            >
                              {/* 앞면: 공약 내용 */}
                              <CardFront>
                                <CardContentContainer>
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
                                  <CardContentRow>
                                    <PromiseNumber>{promiseIndex + 1}</PromiseNumber>
                                    <PromiseContent>{promise.name}</PromiseContent>
                                  </CardContentRow>
                                </CardContentContainer>
                              </CardFront>

                              {/* 뒷면: 공약 목표 (목표가 있을 때만 렌더링) */}
                              {hasGoal && (
                                <CardBack>
                                  <BackContent>
                                    <BackTitle>공약 목표</BackTitle>
                                    <BackText>{promise.goal}</BackText>
                                  </BackContent>
                                </CardBack>
                              )}
                            </Card3DWrapper>
                          </Card3DContainer>
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
