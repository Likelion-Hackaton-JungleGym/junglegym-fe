import {
  Card,
  CardTitle,
  Header,
  ListContainer,
  NoteSection,
  NoteIcon,
  NoteText,
  Row,
} from "../ProfileDetail.styles.js";

import CrimeStarIcon from "../../../assets/icons/CrimeStarIcon.svg";
import NoticeIcon from "../../../assets/icons/NoticeIcon.svg";

const Crimes = ({ crimes }) => (
  <Card>
    {/* 제목 + 총 건수(알약 모양) */}
    <Row style={{ alignItems: "center", justifyContent: "flex-start", gap: 12, margin: 0 }}>
      <CardTitle style={{ marginBottom: 0 }}>전과 기록</CardTitle>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 12px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          color: "#ff4d4f",
          background: "#ffecec",
        }}
      >
        총 {crimes.count}건
      </span>
    </Row>

    {/* 리스트(항목 간 큰 간격) */}
    <ListContainer style={{ gap: 56, margin: "40px 0 40px" }}>
      {crimes.items.map((crime, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* 붉은 별 아이콘 */}
          <span style={{ width: 28, height: 28, marginBottom: 12 }}>
            <img
              src={CrimeStarIcon}
              alt="전과 아이콘"
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </span>

          {/* 제목 */}
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#111",
              lineHeight: 1.35,
              margin: "0 0 12px",
            }}
          >
            {crime.title}
          </h1>

          {/* 벌금(붉은색 강조) */}
          <Header style={{ margin: 0, color: "#d32f2f", fontSize: 16, fontWeight: 500 }}>
            {crime.penalty}
          </Header>
        </div>
      ))}
    </ListContainer>

    {/* 참고사항 */}
    <NoteSection style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <NoteIcon>
          <img src={NoticeIcon} alt="Notice" />
        </NoteIcon>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#666" }}>참고 사항</span>
      </div>
      <NoteText>
        후보자 본인이 제출한 소명서를 기준으로 합니다. 자세한 정보는 중앙선거관리위원회 홈페이지에서
        확인하실 수 있습니다.
      </NoteText>
    </NoteSection>
  </Card>
);

export default Crimes;
