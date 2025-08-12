// src/pages/junglepeople/peopleData.js
import leeseungro from "./profiles/img/leeseungro.svg";
import ohsehun from "./profiles/img/ohsehun.svg";
import kimyungbae from "./profiles/img/kimyungbae.svg";
import kimnamgeun from "./profiles/img/kimnamgeun.svg";

import BlueParty from "./profiles/img/BlueParty.svg";
import RedParty from "./profiles/img/RedParty.svg";

import SeongbukMayor from "./profiles/img/SeongbukMayor.svg";
import SeoulMayor from "./profiles/img/SeoulMayor.svg";
import SeongbukGap from "./profiles/img/SeongbukGap.svg";
import SeongbukEul from "./profiles/img/SeongbukEul.svg";

export const PEOPLE = {
  leeseungro: {
    id: "leeseungro",
    name: "이승로",
    photo: leeseungro,
    partyImg: BlueParty,
    positionImg: SeongbukMayor,
    areas: ["정릉동", "길음 1/2동", "마마동", "파파동", "가가동", "나나동"],
  },
  ohsehun: {
    id: "ohsehun",
    name: "오세훈",
    photo: ohsehun,
    partyImg: RedParty,
    positionImg: SeoulMayor,
    areas: ["세훈1동", "세훈2동"],
  },
  kimyungbae: {
    id: "kimyungbae",
    name: "김영배",
    photo: kimyungbae,
    partyImg: BlueParty,
    positionImg: SeongbukGap,
    areas: ["영배1동", "영배2동"],
  },
  kimnamgeun: {
    id: "kimnamgeun",
    name: "김남근",
    photo: kimnamgeun,
    partyImg: BlueParty,
    positionImg: SeongbukEul,
    areas: ["남근1동", "남근2동"],
  },
};

export const PEOPLE_LIST = Object.values(PEOPLE);
