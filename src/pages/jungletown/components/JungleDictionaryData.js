import dict1 from "./img/dict1.svg?url";
import dict2 from "./img/dict2.svg?url";
import dict3 from "./img/dict3.svg?url";
import dict4 from "./img/dict4.svg?url";
import dict5 from "./img/dict5.svg?url";

import dictBig1 from "./img/dictBig1.svg?url";
import dictBig2 from "./img/dictBig2.svg?url";
import dictBig3 from "./img/dictBig3.svg?url";
import dictBig4 from "./img/dictBig4.svg?url";
import dictBig5 from "./img/dictBig5.svg?url";

import dictIcon1 from "./img/dictIcon1.svg?url";
import dictIcon2 from "./img/dictIcon2.svg?url";
import dictIcon3 from "./img/dictIcon3.svg?url";
import dictIcon4 from "./img/dictIcon4.svg?url";
import dictIcon5 from "./img/dictIcon5.svg?url";

import HOT1 from "./img/HOT1.svg?url";
import HOT2 from "./img/HOT2.svg?url";
import HOT3 from "./img/HOT3.svg?url";
import HOT4 from "./img/HOT4.svg?url";
import HOT5 from "./img/HOT5.svg?url";

export const DICTIONARY = [
  {
    id: 1,
    miniCard: dict1,
    bigCard: dictBig1,
    icon: dictIcon1,
    hotRank: HOT1,
    category: "사람보다 당",
    title: "비례대표 vs 지역구",
    subtitle: "정당 vs 인물, 투표 방식의 차이",
    image: "img1",
    desc: `국회의원은 크게 두 가지 방식으로 뽑아요.
지역구 의원은 ‘동네 대표’예요. 주민들이 특정 후보를 직접 선택하고, 뽑힌 의원은 도로, 복지, 청년 정책 등 생활과 밀접한 지역 문제를 챙겨요. 인구가 많은 지역은 같은 수를 채워 여러 선거구로 나누어 각각 의원을 뽑기도 합니다.
반대로 비례대표 의원은 ‘정당 성적표’로 뽑아요.
정당이 얻은 투표율에 따라 의석을 배분하고, 정당이 정한 순서대로 당선자를 결정해요. 이들은 여성, 청년, 장애인, 환경, 노동 등 특정 분야 전문가로 각 사회 전반의 다양한 목소리를 국회에 반영하려고 해요.
정리하자면, 지역구 의원은 우리 동네 대표, 비례대표 의원은 사회 다양한 목소리를 담는 대표라고 이해하면 돼요.`,
  },
  {
    id: 2,
    miniCard: dict2,
    bigCard: dictBig2,
    icon: dictIcon2,
    hotRank: HOT2,
    category: "구역분할",
    title: "‘을’ 지역은 무슨 뜻?",
    subtitle: "지역구 이름, 가나다순!",
    image: dictIcon2,
    desc: `한 지역에 인구가 많으면 국회의원을 한 명만 뽑기 어려워요. 그래서 선거구를 나눠 갑·을·병·정처럼 표시합니다.
예를 들어 강남구가 너무 크다면 강남갑과 강남을로 나뉘어 각각 의원을 뽑는 거죠. 여기서 ‘갑·을’은 잘잘못이나 순위를 뜻하지 않아요. 단순히 한자 순서(甲乙丙丁)에서 차례대로 붙이는 행정 구분이에요.
쉽게 말하면, 강남구라는 큰 학교를 두 개 반으로 나눠 1반·2반으로 부른다고 생각하면 돼요. 갑은 1반, 을은 2반 같은 개념이죠. 그러니 “갑 지역이 더 낫다, 을 지역이 뒤처진다”는 의미는 전혀 없어요.`,
  },
  {
    id: 3,
    miniCard: dict3,
    bigCard: dictBig3,
    icon: dictIcon3,
    hotRank: HOT3,
    category: "여야차이",
    title: "여당 vs 야당",
    subtitle: "지역구 누가 여당이고, 누가 야당일까?, 가나다순!",
    image: dictIcon3,
    desc: `정치 뉴스를 보면 늘 나오는 말이 여당과 야당이에요.
여당은 쉽게 말해 지금 대통령(정부)을 돕는 정당이에요. 대통령이 소속된 정당, 혹은 그와 협력하는 정당이 여당이 되죠.
반대로 야당은 정부와 다른 목소리를 내는 정당이에요. 여당을 견제하고 비판하면서 대안을 내는 역할을 해요. 중요한 건 여·야는 고정된 게 아니라는 점이에요.
선거 결과에 따라 바뀌고, 같은 당이라도 정권을 잡으면 여당, 놓치면 야당이 돼요. 즉, 여당=운전대 잡은 팀, 야당=옆자리에서 길잡이 하는 팀이라고 이해하면 쉬워요.`,
  },
  {
    id: 4,
    miniCard: dict4,
    bigCard: dictBig4,
    icon: dictIcon4,
    hotRank: HOT4,
    category: "총리직무",
    title: "대통령 말고 총리도 있잖아?",
    subtitle: "국무총리의 역할",
    image: dictIcon4,
    desc: `우리나라에서 가장 권한이 큰 건 대통령이에요.
그렇다면 국무총리는 뭘 할까요? 총리는 쉽게 말해 행정부의 반장이에요. 각 부처 장관들이 잘 협력하도록 조정하고, 문제가 생기면 대통령 대신 회의를 주재하기도 해요. 또 장관 임명 과정에서 대통령을 보좌하고, 잘못된 부분이 있으면 대통령에게 건의할 수도 있죠.
대통령이 ‘전체 학교 교장 선생님’이라면, 국무총리는 ‘부장 교사’ 같은 역할이에요. 교장이 모든 걸 다 챙길 수 없으니 총리가 부처들을 관리하며 실무를 맡는 거예요.`,
  },
  {
    id: 5,
    miniCard: dict5,
    bigCard: dictBig5,
    icon: dictIcon5,
    hotRank: HOT5,
    category: "정당기호",
    title: "왜 1번, 2번일까?",
    subtitle: "정당 번호 정하는 법",
    image: dictIcon5,
    desc: `선거 때마다 후보 이름 앞에 붙는 1번, 2번, 3번 같은 번호, 어떻게 정해질까요? 이건 정당이 국회 의석을 얼마나 가지고 있느냐로 결정돼요. 현재 국회에서 가장 의석이 많은 정당이 1번, 그다음이 2번이에요. 의석이 없는 소수정당은 추첨으로 3번, 4번 같은 번호를 배정받아요.
즉, 번호는 정당의 힘을 보여주는 지표이기도 하죠. 다만 번호가 순위를 의미하진 않아요. 그냥 투표용지에서 쉽게 구분하기 위한 표시일 뿐이에요. 마치 운동회에서 팀 조끼 색깔을 나누는 것과 같다고 생각하면 돼요.`,
  },
];
