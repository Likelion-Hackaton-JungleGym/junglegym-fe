import styled from "styled-components";
import { Link } from "react-router-dom";
import leeseungroCard from "./img/leeseungroCard.svg";
import ohsehunCard from "./img/ohsehunCard.svg";
import kimyungbaeCard from "./img/kimyungbaeCard.svg";
import kimnamgeunCard from "./img/kimnamgeunCard.svg";

export default function Profile() {
  const people = [
    { path: "/junglepeople/leeseungro", img: leeseungroCard, alt: "이승로" },
    { path: "/junglepeople/ohsehun", img: ohsehunCard, alt: "오세훈" },
    { path: "/junglepeople/kimyungbae", img: kimyungbaeCard, alt: "김영배" },
    { path: "/junglepeople/kimnamgeun", img: kimnamgeunCard, alt: "김남근" },
  ];

  return (
    <Wrapper>
      <ProfileCards>
        {people.map((person, index) => (
          <ProfileCard key={index}>
            <Link to={person.path}>
              <Img src={person.img} alt={person.alt} />
            </Link>
          </ProfileCard>
        ))}
      </ProfileCards>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px 10px;
`;

const ProfileCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ProfileCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 160px;
  height: auto;
  cursor: pointer;
`;
