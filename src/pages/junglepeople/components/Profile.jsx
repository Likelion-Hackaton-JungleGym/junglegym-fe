import styled from "styled-components";
import { Link } from "react-router-dom";
import { PEOPLE_LIST } from "./peopleData";

export default function Profile() {
  return (
    <Wrapper>
      <Grid>
        {PEOPLE_LIST.map((p) => (
          <CardLink to={p.path} key={p.id} aria-label={`${p.name} 상세`}>
            <Card>
              <Top $bg={p.bg}>
                <Badge src={p.badge} alt="정당" />
                <Person src={p.cropPhoto} alt={`${p.name}`} />
              </Top>
              <Bottom>
                <Name>{p.name}</Name>
                <Title>{p.title}</Title>
              </Bottom>
            </Card>
          </CardLink>
        ))}
      </Grid>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const Wrapper = styled.div`
  margin: 30px auto;
  padding: 0 5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 13px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.article`
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 2px solid #d2d2d2;
`;

const Top = styled.div`
  position: relative;
  height: 184px;
  background: ${(p) => p.$bg};
`;

const Person = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom;
  display: block;
`;

const Badge = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  height: 19px;
  z-index: 2;
  pointer-events: none;
`;

const Bottom = styled.div`
  background: #fff;
  text-align: center;
  width: 160px;
  height: 62px;
  padding: 10px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #111;
`;

const Title = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: #797979;
`;
