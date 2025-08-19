import styled from "styled-components";
import { Link } from "react-router-dom";
import leeseungro from "../components/img/Leeseungro.svg";
import kimyungbae from "../components/img/Kimyungbae.svg";
import kimnamgeun from "../components/img/Kimnamgeun.svg";
import ohsehun from "../components/img/Ohsehun.svg";

const people = [
  {
    id: "leeseungro",
    path: "/junglepeople/leeseungro",
    name: "이승로",
    title: "성북구청장",
    photo: leeseungro,
  },
  {
    id: "kimyungbae",
    path: "/junglepeople/kimyungbae",
    name: "김영배",
    title: "성북구갑",
    photo: kimyungbae,
  },
  {
    id: "kimnamgeun",
    path: "/junglepeople/kimnamgeun",
    name: "김남근",
    title: "성북구을",
    photo: kimnamgeun,
  },
  {
    id: "ohsehun",
    path: "/junglepeople/ohsehun",
    name: "오세훈",
    title: "서울특별시장",
    photo: ohsehun,
  },
];

export default function Minipeople() {
  return (
    <Wrapper>
      <Text>
        <PageTitle>정글 사람들</PageTitle>
        <Plus to="/junglepeople">
          <p>{`전체보기 >`}</p>
        </Plus>
      </Text>

      <MiniPeople className="scroll-container">
        <PeopleCard>
          {people.map((p) => (
            <Person key={p.id}>
              <CardLink to={p.path}>
                <Img src={p.photo} alt={`${p.name} 사진`} />
                <Info>
                  <Name>{p.name}</Name>
                  <Title>{p.title}</Title>
                </Info>
              </CardLink>
            </Person>
          ))}
        </PeopleCard>
      </MiniPeople>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px 0px 10px 10px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Pretendard;
`;

const PageTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const Plus = styled(Link)`
  color: #959595;
  font-size: 13px;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;
`;

const MiniPeople = styled.div`
  display: flex;
  margin: 12px 0 50px;
  &.scroll-container {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  &.scroll-container::-webkit-scrollbar {
    height: 0;
  }
`;

const PeopleCard = styled.div`
  display: flex;
  gap: 3.9%;
`;

const Person = styled.div`
  flex: 0 0 auto;
  width: 95px;
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
`;

const Img = styled.img`
  width: 105%;
  display: block;
  cursor: pointer;
`;

const Info = styled.div`
  padding: 5px 2px 0px;
  text-align: left;
  background: transparent;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
  //line-height: 1.25;
  //letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
