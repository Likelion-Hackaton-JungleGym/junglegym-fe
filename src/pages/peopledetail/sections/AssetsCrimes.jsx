import {
  Card,
  Title,
  InfoList,
  InfoItem,
  InfoKey,
  InfoValue,
  BulletList,
} from "../PeopleDetail.styles.js";

/**
 * assets: { total?: string, year?: string, details?: string[] }
 * crimes: { count?: number, items?: string[] }
 */
export default function AssetsCrimes({ assets = {}, crimes = {} }) {
  const hasAssets = assets && (assets.total || (assets.details?.length || 0) > 0);
  const hasCrimes = crimes && (typeof crimes.count === "number" || (crimes.items?.length || 0) > 0);

  return (
    <>
      <Card>
        <Title>재산</Title>
        {hasAssets ? (
          <>
            <InfoList>
              {assets.total && (
                <InfoItem>
                  <InfoKey>총액</InfoKey>
                  <InfoValue>{assets.total}</InfoValue>
                </InfoItem>
              )}
              {assets.year && (
                <InfoItem>
                  <InfoKey>기준년도</InfoKey>
                  <InfoValue>{assets.year}</InfoValue>
                </InfoItem>
              )}
            </InfoList>
            {(assets.details?.length || 0) > 0 && (
              <BulletList>
                {assets.details.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </BulletList>
            )}
          </>
        ) : (
          <InfoValue>정보 준비 중</InfoValue>
        )}
      </Card>

      <Card>
        <Title>전과</Title>
        {hasCrimes ? (
          <>
            {typeof crimes.count === "number" && <InfoValue>건수: {crimes.count}건</InfoValue>}
            {(crimes.items?.length || 0) > 0 && (
              <BulletList>
                {crimes.items.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </BulletList>
            )}
          </>
        ) : (
          <InfoValue>정보 준비 중</InfoValue>
        )}
      </Card>
    </>
  );
}
