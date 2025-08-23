
import { api } from "../api/client";

/* ---------- small utils ---------- */
const clean = (s) => (typeof s === "string" ? s.trim() : "");
const youtubeThumb = (link) => {
  const m = clean(link).match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

/* ---------- JungleDictionary ---------- */
export async function getDictionaries() {
  try {
    const res = await api.get("/dictionaries");
    const raw = Array.isArray(res?.data?.data) ? res.data.data : [];
    return raw.map((item) => ({
      id: item.id,
      category: item.keyword,
      title: item.title,
      subtitle: item.subtitle,
      content: item.content,
      desc: item.content,
    }));
  } catch (err) {
    console.error("사전 데이터 가져오기 실패:", err?.response?.status, err?.response?.data || err);
    throw new Error(err?.response?.data?.message || "예상치 못한 서버 오류가 발생했습니다.");
  }
}

export async function getDictionariesDetail(dictionaryId) {
  try {
    const res = await api.get(`/dictionaries/${dictionaryId}`);
    const raw = res?.data?.data || {};
    return {
      id: raw.id,
      category: raw.keyword,
      title: raw.title,
      subtitle: raw.subtitle,
      content: raw.content,
      desc: raw.content,
    };
  } catch (err) {
    console.error("상세 데이터 가져오기 실패:", err?.response?.status, err?.response?.data || err);
    throw new Error(err?.response?.data?.message || "예상치 못한 서버 오류가 발생했습니다.");
  }
}

/* ---------- JungleSound (Newsletters) ---------- */
export async function getNewsletters() {
  try {
    const res = await api.get("/regions/newsletters");
    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
    return arr.map((it) => ({
      ...it,
      id: it.newsletterId ?? it.id,
      thumbnail:
        it.thumbnailUrl?.trim?.() ||
        "" ||
        it.thumbnailImg?.trim?.() ||
        "" ||
        (it.link ? `https://img.youtube.com/vi/${it.link.split("v=")[1]}/hqdefault.jpg` : null) ||
        "/placeholder.png",
    }));
  } catch (err) {
    console.error("뉴스레터 목록 실패:", err);
    throw err;
  }
}

export async function getNewsletterDetail(newsletterId) {
  if (!newsletterId) throw new Error("Invalid newsletterId");
  const idStr = String(newsletterId);
  try {
    const res = await api.get(`/newsletters/${idStr}`);
    const raw = res?.data?.data;

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

    // fallback to list lookup
  }
  try {
    const res = await api.get("/regions/newsletters");
    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
    const found = arr.find((it) => String(it.newsletterId || it.id) === idStr);
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
  } catch {
    // ignore
  }
  return null;
}

/* ---------- WeeklyNews ---------- */
export async function getWeeklyNews({ signal, params } = {}) {
  const regionName = params?.regionName ?? "성북구";
  const res = await api.get("/regions/weeklynews", { signal, params: { regionName } });
  return res.data;

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
