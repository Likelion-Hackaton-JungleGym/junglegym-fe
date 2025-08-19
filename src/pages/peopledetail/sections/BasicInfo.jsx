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

const BasicInfo = ({ basic }) => (
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
        <SummaryStrong>{basic.ageSummary}</SummaryStrong>
        <DetailContainer>
          {basic.ageDetail1 && <DetailItem>{basic.ageDetail1}</DetailItem>}
          {basic.ageDetail2 && <DetailItem>{basic.ageDetail2}</DetailItem>}
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
        <InfoValueStrong>{basic.committee}</InfoValueStrong>
      </ValueStack>
    </Row>

    {/* 병역사항 */}
    <Row>
      <InfoIcon>
        <img src={MilitaryIcon} alt="병역사항" />
      </InfoIcon>
      <ValueStack>
        <InfoLabel>병역사항</InfoLabel>
        <InfoValueStrong>{basic.military}</InfoValueStrong>
      </ValueStack>
    </Row>
  </Card>
);

export default BasicInfo;
