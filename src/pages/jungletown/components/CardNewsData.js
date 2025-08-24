import CardNews1 from "./img/CardNews1.svg?url";
import CardNews2 from "./img/CardNews2.svg?url";
import CardNews3 from "./img/CardNews3.svg?url";
import CardNews4 from "./img/CardNews4.svg?url";
import CardNews5 from "./img/CardNews5.svg?url";
import CardNews6 from "./img/CardNews6.svg?url";

import pol1 from "./img/pol1.svg?url";
import pol2 from "./img/pol2.svg?url";
import eco1 from "./img/eco1.svg?url";
import eco2 from "./img/eco2.svg?url";
import soc1 from "./img/soc1.svg?url";
import soc2 from "./img/soc2.svg?url";
import world1 from "./img/world1.svg?url";
import world2 from "./img/world2.svg?url";
import cul1 from "./img/cul1.svg?url";
import cul2 from "./img/cul2.svg?url";
import it1 from "./img/it1.svg?url";
import it2 from "./img/it2.svg?url";

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
