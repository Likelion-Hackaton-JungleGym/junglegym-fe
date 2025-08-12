import styled from "styled-components";
import { Link } from "react-router-dom";
import leeseungro from "./img/leeseungro.svg";
import ohsehun from "./img/ohsehun.svg";
import kimyungbae from "./img/kimyungbae.svg";
import kimnamgeun from "./img/kimnamgeun.svg";

export default function Profile() {
  const people = [
    { path: "/junglepeople/leeseungro", img: leeseungro, alt: "이승로" },
    { path: "/junglepeople/ohsehun", img: ohsehun, alt: "오세훈" },
    { path: "/junglepeople/kimyungbae", img: kimyungbae, alt: "김영배" },
    { path: "/junglepeople/kimnamgeun", img: kimnamgeun, alt: "김남근" },
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
