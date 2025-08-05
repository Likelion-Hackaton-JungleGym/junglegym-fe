import styled from "styled-components";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <Layout>
      <Header />
      <p>그동안 배운걸 바탕으로 드디어 결실을 거둘 때가 왔습니다.</p>
      <p>본걱젹으로 팀으로 하는 프로젝트인만큼 추천드리는 초기 세팅을 예시로 준비해봤습니다.</p>
      <p>
        그대로 따라하는 것 보다는, 본인 팀만의 폴더 구조나 파일 이름같은 것들을 개발 시작 전에
        충분히 얘기해서 정해놓고 하는걸 추천드립니다.
        <br />
        (그래야 나중에 깃허브 충돌이 안나요..!)
      </p>
      <p>
        열심히 달려온 여러분에게 주어지는 흔치 않은 기회이니, 이 기회 놓치지 마시고 한달동안 조금만
        더 힘내서 해커톤 잘 마무리합시다!!!
      </p>
      <p>기술적이거나 기술 외적인 부분으로 도움이 필요하면 언제든지 멘토에게 연락주세요 :)</p>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
