import {
  Card,
  CardTitle,
  Row,
  InfoIcon,
  InfoLabel,
  InfoValuePrimary,
  InfoValueStrong,
  ValueStack,
  SummaryStrong,
  DetailContainer,
  DetailItem,
} from "../ProfileDetail.styles.js";

import BirthIcon from "../../../assets/icons/BirthIcon.svg";
import ReelectionIcon from "../../../assets/icons/ReelectionIcon.svg";
import CommitteeIcon from "../../../assets/icons/CommitteeIcon.svg";
import MilitaryIcon from "../../../assets/icons/MilitaryIcon.svg";

const BasicInfo = ({ basic }) => {
  // ageDetails 데이터를 처리하여 배열로 변환
  const processAgeDetails = (basic) => {
    // 1. ageDetails 배열이 있으면 우선 사용
    if (Array.isArray(basic?.ageDetails)) {
      return basic.ageDetails.filter(Boolean);
    }
    
    // 2. ageDetail1이 문자열이고 쉼표나 줄바꿈이 포함되어 있으면 분리
    if (typeof basic?.ageDetail1 === 'string' && basic.ageDetail1 !== "—") {
      return basic.ageDetail1
        .split(/[,\n]/) // 쉼표나 줄바꿈으로 분리
        .map(item => item.trim())
        .filter(Boolean);
    }
    
    // 3. 개별 필드들 확인
    return [basic?.ageDetail1, basic?.ageDetail2, basic?.ageDetail3]
      .filter(item => item && item !== "—");
  };

  const ageDetails = processAgeDetails(basic);

  return (
    <Card>
      <CardTitle>기본 정보</CardTitle>

      {/* 생년월일 */}
      <Row>
        <InfoIcon>
          <img src={BirthIcon} alt="생년월일" />
        </InfoIcon>
        <ValueStack>
          <InfoLabel>생년월일</InfoLabel>
          <InfoValuePrimary>{basic.birth}</InfoValuePrimary>
        </ValueStack>
      </Row>

      {/* 재선여부 */}
      <Row>
        <InfoIcon>
          <img src={ReelectionIcon} alt="재선여부" />
        </InfoIcon>
        <ValueStack>
          <InfoLabel>재선여부</InfoLabel>
          <InfoValuePrimary>{basic.ageSummary}</InfoValuePrimary>
          <DetailContainer>
            {ageDetails.map((detail, idx) => (
              <DetailItem key={idx}>{detail}</DetailItem>
            ))}
          </DetailContainer>
        </ValueStack>
      </Row>

      {/* 소속위원회 */}
      <Row>
        <InfoIcon>
          <img src={CommitteeIcon} alt="소속위원회" />
        </InfoIcon>
        <ValueStack>
          <InfoLabel>소속위원회</InfoLabel>
          <InfoValuePrimary>{basic.committee}</InfoValuePrimary>
        </ValueStack>
      </Row>

      {/* 병역사항 */}
      <Row>
        <InfoIcon>
          <img src={MilitaryIcon} alt="병역사항" />
        </InfoIcon>
        <ValueStack>
          <InfoLabel>병역사항</InfoLabel>
          <InfoValuePrimary>{basic.military}</InfoValuePrimary>
        </ValueStack>
      </Row>
    </Card>
  );
};

export default BasicInfo;
