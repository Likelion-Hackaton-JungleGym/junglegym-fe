import CardNews1 from "./img/CardNews1.svg";
import CardNews2 from "./img/CardNews2.svg";
import CardNews3 from "./img/CardNews3.svg";
import CardNews4 from "./img/CardNews4.svg";
import CardNews5 from "./img/CardNews5.svg";

import graph1 from "./img/graph1.svg";
import graph2 from "./img/graph1.svg";
import graph3 from "./img/graph1.svg";
import graph4 from "./img/graph1.svg";
import graph5 from "./img/graph1.svg";

import pol1 from "./img/정치1.svg";
import pol2 from "./img/정치2.svg";
import eco1 from "./img/경제1.svg";
import eco2 from "./img/경제2.svg";
import soc1 from "./img/사회1.svg";
import soc2 from "./img/사회2.svg";
import world1 from "./img/세계1.svg";
import world2 from "./img/세계2.svg";
import cul1 from "./img/생활문화1.svg";
import cul2 from "./img/생활문화2.svg";
import it1 from "./img/IT과학1.svg";
import it2 from "./img/IT과학2.svg";

export const ICON_MAP = {
  정치: [pol1, pol2],
  경제: [eco1, eco2],
  사회: [soc1, soc2],
  세계: [world1, world2],
  "생활/문화": [cul1, cul2],
  "IT/과학": [it1, it2],
};

export const CARDNEWS = [
  {
    id: 1,
    card: CardNews1,
    newsCategory: "정치",
    title: `성북, 자치회관 프로그램
    온라인 접수`,
    oneLineContent: "누구나 클릭 한 번으로 신청 가능",
    summary: `성북구가 자치회관 프로그램 신청 방식을 개선해 온라인 접수 시스템을 시범 운영 중입니다. PC나 스마트폰으로 언제든 프로그램을 확인하고 신청할 수 있습니다. 노년층을 고려해 단계적으로 도입하며, 9월부터 일부 프로그램에 우선 적용하고 2026년에는 전면 확대할 계획입니다.`,
    name: "국회일보",
    date: "2025.08.11",
    graph: graph1,
    link: "링크,,",
  },
  {
    id: 2,
    card: CardNews2,
    newsCategory: "경제",
    title: `2성북, 자치회관 프로그램
    온라인 접수`,
    oneLineContent: "2누구나 클릭 한 번으로 신청 가능",
    summary: `성북구가 자치회관 프로그램 신청 방식을 개선해 온라인 접수 시스템을 시범 운영 중입니다. PC나 스마트폰으로 언제든 프로그램을 확인하고 신청할 수 있습니다. 노년층을 고려해 단계적으로 도입하며, 9월부터 일부 프로그램에 우선 적용하고 2026년에는 전면 확대할 계획입니다.`,
    name: "국회일보",
    date: "2025.02.02",
    graph: graph2,
    link: "링크,,",
  },
  {
    id: 3,
    card: CardNews3,
    newsCategory: "사회",
    title: `3성북, 자치회관 프로그램
    온라인 접수`,
    oneLineContent: "3누구나 클릭 한 번으로 신청 가능",
    summary: `성북구가 자치회관 프로그램 신청 방식을 개선해 온라인 접수 시스템을 시범 운영 중입니다. PC나 스마트폰으로 언제든 프로그램을 확인하고 신청할 수 있습니다. 노년층을 고려해 단계적으로 도입하며, 9월부터 일부 프로그램에 우선 적용하고 2026년에는 전면 확대할 계획입니다.`,
    name: "국회일보",
    date: "2025.03.03",
    graph: graph3,
    link: "링크,,",
  },
  {
    id: 4,
    card: CardNews4,
    newsCategory: "세계",
    title: `4성북, 자치회관 프로그램
    온라인 접수`,
    oneLineContent: "4누구나 클릭 한 번으로 신청 가능",
    summary: `성북구가 자치회관 프로그램 신청 방식을 개선해 온라인 접수 시스템을 시범 운영 중입니다. PC나 스마트폰으로 언제든 프로그램을 확인하고 신청할 수 있습니다. 노년층을 고려해 단계적으로 도입하며, 9월부터 일부 프로그램에 우선 적용하고 2026년에는 전면 확대할 계획입니다.`,
    name: "국회일보",
    date: "2025.04.04",
    graph: graph4,
    link: "링크,,",
  },
  {
    id: 5,
    card: CardNews5,
    newsCategory: "생활/문화",
    title: `5성북, 자치회관 프로그램
    온라인 접수`,
    oneLineContent: "5누구나 클릭 한 번으로 신청 가능",
    summary: `성북구가 자치회관 프로그램 신청 방식을 개선해 온라인 접수 시스템을 시범 운영 중입니다. PC나 스마트폰으로 언제든 프로그램을 확인하고 신청할 수 있습니다. 노년층을 고려해 단계적으로 도입하며, 9월부터 일부 프로그램에 우선 적용하고 2026년에는 전면 확대할 계획입니다.`,
    name: "국회일보",
    date: "2025.05.05",
    graph: graph5,
    link: "링크,,",
  },
];
