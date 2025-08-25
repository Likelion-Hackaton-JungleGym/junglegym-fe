const BASE = import.meta.env.BASE_URL; // 루트 배포면 "/"
const VER = import.meta.env.VITE_ASSET_VER || ""; // 캐시 버스터(선택)
const v = VER ? `?v=${VER}` : "";
const img = (name) => `${BASE}images/${name}${v}`;

import CardNews1 from "./img/CardNews1.svg?url";
import CardNews2 from "./img/CardNews2.svg?url";
import CardNews3 from "./img/CardNews3.svg?url";
import CardNews4 from "./img/CardNews4.svg?url";
import CardNews5 from "./img/CardNews5.svg?url";
import CardNews6 from "./img/CardNews6.svg?url";
import CardNews7 from "./img/CardNews7.svg?url";
import CardNews8 from "./img/CardNews8.svg?url";

const pol1 = img("pol1.svg");
const pol2 = img("pol2.svg");
const eco1 = img("eco1.svg");
const eco2 = img("eco2.svg");
const soc1 = img("soc1.svg");
const soc2 = img("soc2.svg");
const world1 = img("world1.svg");
const world2 = img("world2.svg");
const cul1 = img("cul1.svg");
const cul2 = img("cul2.svg");
const it1 = img("it1.svg");
const it2 = img("it2.svg");

export const ICON_MAP = {
  정치: [pol1, pol2],
  경제: [eco1, eco2],
  사회: [soc1, soc2],
  세계: [world1, world2],
  "생활/문화": [cul1, cul2],
  "IT/과학": [it1, it2],
};
export const CARD_MAP = {
  1: CardNews1,
  2: CardNews2,
  3: CardNews3,
  4: CardNews4,
  5: CardNews5,
  6: CardNews6,
  7: CardNews7,
  8: CardNews8,
};

export const CARDNEWS = [
  {
    id: 1,
    card: CardNews1,
    newsCategory: "정치",
  },
  {
    id: 2,
    card: CardNews2,
    newsCategory: "경제",
  },
  {
    id: 3,
    card: CardNews3,
    newsCategory: "사회",
  },
  {
    id: 4,
    card: CardNews4,
    newsCategory: "세계",
  },
  {
    id: 5,
    card: CardNews5,
    newsCategory: "생활/문화",
  },
];
