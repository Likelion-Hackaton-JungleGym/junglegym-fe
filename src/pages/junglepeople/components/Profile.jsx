import styled from "styled-components";
//import { Link } from "react-router-dom";
import leeseungro from "./img/leeseungro.svg";
import ohsehun from "./img/ohsehun.svg";
import kimyungbae from "./img/kimyungbae.svg";
import kimnamgeun from "./img/kimnamgeun.svg";

export default function Profile() {
  return (
    <Wrapper>
      <ProfileCards>
        <ProfileCard>
          {/*} <Link to="/leeseungroProfile">*/}
          <Img src={leeseungro} />
          {/*</Link>*/}
        </ProfileCard>
        <ProfileCard>
          {/*} <Link to="/ohsehunProfile">*/}
          <Img src={ohsehun} />
          {/*</Link>*/}
        </ProfileCard>
        <ProfileCard>
          {/*} <Link to="/kimyungbaeProfile">*/}
          <Img src={kimyungbae} />
          {/*</Link>*/}
        </ProfileCard>
        <ProfileCard>
          {/*} <Link to="/kimnamgeunProfile">*/}
          <Img src={kimnamgeun} />
          {/*</Link>*/}
        </ProfileCard>
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
