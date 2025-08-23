import { api } from "./client";
import { DICTIONARY } from "../../pages/jungletown/components/JungleDictionaryData";

/* ──────────────────────────────
 * 공통 유틸
 * ────────────────────────────── */
const clean = (s) => (typeof s === "string" ? s.trim() : "");
const youtubeThumb = (link) => {
  const m = link?.match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

// API 응답 안전 추출
const getData = (res) => res?.data?.data ?? res?.data ?? null;

/* ──────────────────────────────
 * 정글사전(JungleDictionary)
 * ────────────────────────────── */
const imageDataMap = DICTIONARY.reduce((acc, item) => {
  acc[item.id] = {
    miniCard: item.miniCard,
    bigCard: item.bigCard,
    icon: item.icon,
    hotRank: item.hotRank,
  };
  return acc;
}, {});

const mergeDictionaryItem = (apiItem = {}) => {
  const imageData = imageDataMap[apiItem.id] || {};
  return {
    id: apiItem.id,
    category: apiItem.keyword,
    title: apiItem.title,
    subtitle: apiItem.subtitle,
    content: apiItem.content,
    desc: apiItem.content, // 호환용
    miniCard: imageData.miniCard ?? null,
    bigCard: imageData.bigCard ?? null,
    icon: imageData.icon ?? null,
    hotRank: imageData.hotRank ?? null,
  };
};

export async function getDictionaries({ signal, params } = {}) {
  const res = await api.get("/dictionaries", { signal, params });
  const raw = Array.isArray(getData(res)) ? getData(res) : [];
  return raw.map(mergeDictionaryItem);
}

export async function getDictionariesDetail(dictionaryId, { signal } = {}) {
  if (!dictionaryId) throw new Error("Invalid dictionaryId");
  const res = await api.get(`/dictionaries/${dictionaryId}`, { signal });
  const raw = getData(res) || {};
  return mergeDictionaryItem(raw);
}

/* ──────────────────────────────
 * 정글사운드 (Newsletters)
 * ────────────────────────────── */
export async function getNewsletters({ signal, params } = {}) {
  const res = await api.get("/regions/newsletters", { signal, params });
  const arr = Array.isArray(getData(res)) ? getData(res) : [];
  return arr.map((it) => ({
    ...it,
    id: it.newsletterId, // 라우팅 호환
    thumbnail:
      clean(it.thumbnailUrl) ||
      clean(it.thumbnailImg) ||
      youtubeThumb(clean(it.link)) ||
      "/placeholder.png",
    thumbnailUrl: clean(it.thumbnailUrl) || clean(it.thumbnailImg),
  }));
}

export async function getNewsletterDetail(newsletterId, { signal } = {}) {
  if (!newsletterId) throw new Error("Invalid newsletterId");
  const idStr = String(newsletterId);

  // 1차: 상세
  try {
    const res = await api.get(`/newsletters/${idStr}`, { signal });
    const raw = getData(res);
    if (raw) {
      return {
        ...raw,
        id: raw.id ?? idStr,
        newsletterId: raw.newsletterId ?? raw.id ?? idStr,
        thumbnail:
          clean(raw.thumbnailUrl) ||
          clean(raw.thumbnailImg) ||
          youtubeThumb(clean(raw.link)) ||
          "/placeholder.png",
        thumbnailUrl: clean(raw.thumbnailUrl) || clean(raw.thumbnailImg),
      };
    }
  } catch {
    // 무시 후 목록 폴백 시도
  }

  // 2차: 목록 폴백
  const list = await getNewsletters({ signal });
  const found = list.find((it) => String(it.newsletterId || it.id) === idStr);
  if (found) {
    return {
      ...found,
      id: found.newsletterId || found.id || idStr,
      newsletterId: found.newsletterId || found.id || idStr,
      thumbnail:
        clean(found.thumbnailUrl) ||
        clean(found.thumbnailImg) ||
        youtubeThumb(clean(found.link)) ||
        "/placeholder.png",
      thumbnailUrl: clean(found.thumbnailUrl) || clean(found.thumbnailImg),
      // 상세에서만 있는 필드들 빈 값
      mediaImgUrl: found.mediaImgUrl ?? null,
      inTitle: null,
      subtitle1: null,
      subtitle2: null,
      content2: null,
      todayQuestion: null,
      titleQuestion: null,
      questionContent: null,
    };
  }

  return null;
}

/* ──────────────────────────────
 * 지난주 뉴스
 * ────────────────────────────── */
export async function getWeeklyNews({ signal, params } = {}) {
  const res = await api.get("/regions/weeklynews", { signal, params });
  return res.data; // { success, code, message, data: [...] }
}

/* ──────────────────────────────
 * 정글피플 / 정글톡 (예시)
 * ────────────────────────────── */
export async function getJunglePeople({ signal, params } = {}) {
  const res = await api.get("/junglepeople", { signal, params });
  return getData(res) ?? [];
}

export async function createJungleTalk(payload, { signal } = {}) {
  const res = await api.post("/jungletalk", payload, { signal });
  return res.data;
}
