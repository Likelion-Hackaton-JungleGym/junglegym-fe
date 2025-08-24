import React from "react";
import {
  Container,
  Title,
  ProgressSection,
  ProgressTitle,
  ProgressDate,
  ProgressHeader,
  ProgressBars,
  ProgressBar,
  ProgressBarLabel,
  ProgressBarCount,
  TableSection,
  TableTitle,
  TableContainer,
  TableElement,
  TableRowElement,
  TableCellElement,
  TableHeader,
  SubtotalRowElement,
  SectionRowElement,
  CardTitle,
} from "../ProfileDetail.styles.js";

const COLS = ["20%", "30%", "30%"];

const PromiseProgress = ({ promiseData }) => {
  if (!promiseData) {
    return (
      <Container>
        <CardTitle>공약 사업 이행 현황</CardTitle>
        <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
          아직 등록된 정보가 없어요
        </div>
      </Container>
    );
  }

  const {
    totalCount,
    doneCount,
    ongoingCount,
    inProgressNormalCount,
    inProgressPartialCount,
    onHoldCount,
    cancelledCount,
    completedSubtotal,
    inProgressSubtotal,
    notImplementedSubtotal,
    doneRate,
    ongoingRate,
    inProgressNormalRate,
    inProgressPartialRate,
    onHoldRate,
    cancelledRate,
    completedSubtotalRate,
    inProgressSubtotalRate,
    notImplementedSubtotalRate,
    updatedDate,
  } = promiseData;

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <Container>
      <CardTitle>공약 사업 이행 현황</CardTitle>

      {/* 공약이행 완료도 섹션 */}
      <ProgressSection>
        <ProgressHeader>
          <ProgressTitle>공약이행 완료도</ProgressTitle>
          <ProgressDate>{formatDate(updatedDate)} 기준</ProgressDate>
        </ProgressHeader>

        <ProgressBars>
          {(() => {
            const maxCount = Math.max(doneCount, ongoingCount, inProgressNormalCount, onHoldCount);
            const getWidth = (count) => {
              if (count === 0) return 100;
              if (maxCount === 0) return 100;
              return (count / maxCount) * 90;
            };

            return (
              <>
                <ProgressBar color="#6765F7" width={getWidth(doneCount)}>
                  <ProgressBarLabel>완료</ProgressBarLabel>
                  <ProgressBarCount>{doneCount}개</ProgressBarCount>
                </ProgressBar>

                <ProgressBar color="#A3A2FE" width={getWidth(ongoingCount)}>
                  <ProgressBarLabel>이행 후 계속추진</ProgressBarLabel>
                  <ProgressBarCount>{ongoingCount}개</ProgressBarCount>
                </ProgressBar>

                <ProgressBar
                  className="light-bg"
                  color="#E1E0FF"
                  width={getWidth(inProgressNormalCount)}
                >
                  <ProgressBarLabel>정상추진</ProgressBarLabel>
                  <ProgressBarCount>{inProgressNormalCount}개</ProgressBarCount>
                </ProgressBar>

                <ProgressBar className="light-bg" color="#E1E1E1" width={getWidth(onHoldCount)}>
                  <ProgressBarLabel>미이행</ProgressBarLabel>
                  <ProgressBarCount>{onHoldCount}개</ProgressBarCount>
                </ProgressBar>
              </>
            );
          })()}
        </ProgressBars>
      </ProgressSection>

      {/* 추진 현황 테이블 섹션 */}
      <TableSection>
        <TableTitle>추진 현황</TableTitle>

        <TableContainer>
          <TableElement>
            <colgroup>
              {COLS.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>

            <thead>
              <TableRowElement>
                {/* 1열: "사업 수" */}
                <TableHeader scope="col">사업 수</TableHeader>
                {/* 2~3열 병합 */}
                <TableHeader colSpan={2} className="num">
                  {totalCount}개(100%)
                </TableHeader>
              </TableRowElement>
            </thead>
            <tbody>
              {/* 완료 (rowSpan=3) */}
              <TableRowElement className="section-start">
                <TableCellElement rowSpan={3} className="section">
                  완료
                </TableCellElement>
                <TableCellElement>이행 완료</TableCellElement>
                <TableCellElement className="num">
                  {doneCount}개({doneRate}%)
                </TableCellElement>
              </TableRowElement>

              <TableRowElement>
                <TableCellElement>이행 후 계속 추진</TableCellElement>
                <TableCellElement className="num">
                  {ongoingCount}개({ongoingRate}%)
                </TableCellElement>
              </TableRowElement>
              <SubtotalRowElement>
                <TableCellElement className="subtotal">소계</TableCellElement>
                <TableCellElement className="subtotal num">
                  {completedSubtotal}개({completedSubtotalRate}%)
                </TableCellElement>
              </SubtotalRowElement>

              {/* 추진 중 (rowSpan=3) */}
              <TableRowElement className="section-start">
                <TableCellElement rowSpan={3} className="section">
                  추진 중
                </TableCellElement>
                <TableCellElement>정상 추진</TableCellElement>
                <TableCellElement className="num">
                  {inProgressNormalCount}개({inProgressNormalRate}%)
                </TableCellElement>
              </TableRowElement>
              <TableRowElement>
                <TableCellElement>일부 추진</TableCellElement>
                <TableCellElement className="num">
                  {inProgressPartialCount > 0
                    ? `${inProgressPartialCount}개(${inProgressPartialRate}%)`
                    : "—"}
                </TableCellElement>
              </TableRowElement>

              <SubtotalRowElement>
                <TableCellElement className="subtotal">소계</TableCellElement>
                <TableCellElement className="subtotal num">
                  {inProgressSubtotal}개({inProgressSubtotalRate}%)
                </TableCellElement>
              </SubtotalRowElement>

              {/* 미이행 (rowSpan=3) */}
              <TableRowElement className="section-start">
                <TableCellElement rowSpan={3} className="section">
                  미이행
                </TableCellElement>
                <TableCellElement>보류</TableCellElement>
                <TableCellElement className="num">
                  {onHoldCount > 0 ? `${onHoldCount}개(${onHoldRate}%)` : "—"}
                </TableCellElement>
              </TableRowElement>

              <TableRowElement>
                <TableCellElement>불이행</TableCellElement>
                <TableCellElement className="num">
                  {cancelledCount > 0 ? `${cancelledCount}개(${cancelledRate}%)` : "—"}
                </TableCellElement>
              </TableRowElement>
              <SubtotalRowElement>
                <TableCellElement className="subtotal">소계</TableCellElement>
                <TableCellElement className="subtotal num">
                  {notImplementedSubtotal}개({notImplementedSubtotalRate}%)
                </TableCellElement>
              </SubtotalRowElement>
            </tbody>
          </TableElement>
        </TableContainer>
      </TableSection>
    </Container>
  );
};

export default PromiseProgress;
