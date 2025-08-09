import styled from "styled-components";
//import { Link } from "react-router-dom";
import leeseungro from "./img/leeseungro.svg";
import ohsehun from "./img/ohsehun.svg";
import kimyungbae from "./img/kimyungbae.svg";
import kimnamgeun from "./img/kimnamgeun.svg";

export default function Profile() {
  return (
    <wrapper>
      <ProfileCards class="image-container">
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
    </wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

const ProfileCards = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
  gap: 20px; /* 카드 간격 */
`;

const ProfileCard = styled.div`
  height: 100px;
  //  display: flex;
  //  justify-content: center;
  //align-items: center;
`;

const Img = styled.img`
  width: 50%; /* 이미지를 80% 크기로 설정 */
  height: auto;
  cursor: pointer;
`;
