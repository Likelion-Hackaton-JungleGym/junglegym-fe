import { api } from "../api/client";

/* ---------- small utils ---------- */
const clean = (s) => (typeof s === "string" ? s.trim() : "");
const youtubeThumb = (link) => {
  const m = clean(link).match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

/* 공통: 응답에서 배열을 뽑아내기 */
const pickArray = (payload) => {
  const cands = [
    payload?.data?.data,
    payload?.data?.items,
    payload?.data?.list,
    payload?.data,
    payload?.items,
    payload?.list,
    Array.isArray(payload) ? payload : null,
  ].filter(Array.isArray);
  return cands[0] || [];
};

/* ---------- JungleDictionary ---------- */
export async function getDictionaries() {
  try {
    const res = await api.get("/dictionaries");
    const raw = pickArray(res?.data);
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
/** 지역별 뉴스레터 목록 (URL ?region= / props.region → params.regionName 으로 전달) */
export async function getNewsletters({ signal, params } = {}) {
  try {
    const regionName = params?.regionName; // 없으면 서버가 전체 반환
    const res = await api.get("/regions/newsletters", {
      signal,
      params: regionName ? { regionName } : undefined,
    });

    const arr = pickArray(res?.data);
    return arr.map((it) => {
      const id = it.newsletterId ?? it.id;
      const thumb =
        clean(it.thumbnailUrl) ||
        clean(it.thumbnailImg) ||
        youtubeThumb(clean(it.link)) ||
        "/placeholder.png";
      return {
        ...it,
        id,
        newsletterId: id,
        thumbnail: thumb,
        regionName: it.regionName ?? it.region ?? it.districtName ?? "",
      };
    });
  } catch (err) {
    if (
      err?.code === "ERR_CANCELED" ||
      err?.name === "CanceledError" ||
      err?.message === "canceled"
    ) {
      throw err; // 조용히 위로 전달
    }
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
    // 개별 상세가 없으면 목록에서 찾아서 변환
  }
  try {
    const res = await api.get("/regions/newsletters");
    const arr = pickArray(res?.data);
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
  } catch (err) {
    console.warn("뉴스레터 상세 조회 실패(목록 fallback으로 진행):", err);
  }
  return null;
}

/* ---------- WeeklyNews ---------- */
/** 지역별 주간 뉴스 (정규화해서 배열 반환) */
export async function getWeeklyNews({ signal, params } = {}) {
  const regionName = params?.regionName ?? "성북구";
  const res = await api.get("/regions/weeklynews", { signal, params: { regionName } });

  const raw = pickArray(res?.data);
  return raw.map((it, i) => ({
    id: it.id ?? it.newsId ?? i,
    newsCategory: it.newsCategory ?? it.category ?? "",
    title: it.title ?? "",
    oneLineContent: it.oneLineContent ?? it.subtitle ?? "",
    summary: it.summary ?? "",
    date: it.date ?? it.publishedAt ?? "",
    link: it.link ?? it.url ?? "",
    mediaImgUrl: it.mediaImgUrl ?? it.imageUrl ?? it.thumbnailImg ?? "",
    media: it.media ?? it.source ?? "",
  }));
}

/* ──────────────────────────────
 * 정글피플 / 정글톡 (예시)
 * ────────────────────────────── */
export async function getJunglePeople({ signal, params } = {}) {
  const res = await api.get("/junglepeople", { signal, params });
  const arr = pickArray(res?.data);
  return arr ?? [];
}

export async function createJungleTalk(payload, { signal } = {}) {
  const res = await api.post("/jungletalk", payload, { signal });
  return res.data;
}
