// shared/utils/newsApi.js
import api from "../utils/politicianApi"; // 네 axios 인스턴스 (default export)

// ✅ 실제 엔드포인트
const PATH_WEEKLY_NEWS = "/api/regions/weeklynews";

/** 응답에서 뉴스 배열을 찾아 표준화 */
function normalizeWeeklyNewsPayload(payload) {
  if (!payload) return [];

  // 1) 가장 흔한 스키마들 빠르게 처리
  if (Array.isArray(payload?.data)) return mapItems(payload.data);
  if (Array.isArray(payload?.items)) return mapItems(payload.items);
  if (Array.isArray(payload)) return mapItems(payload);

  // 2) success/code/message/data 형태(백엔드에서 자주 씀)
  if (typeof payload === "object" && "success" in payload && Array.isArray(payload?.data)) {
    return mapItems(payload.data);
  }

  // 3) data.content / data.items / data.list 등
  const cand =
    payload?.data?.content ||
    payload?.data?.items ||
    payload?.data?.list ||
    payload?.content ||
    payload?.list;

  if (Array.isArray(cand)) return mapItems(cand);

  // 4) 마지막으로 깊이 탐색(어떤 키 밑에 배열이 있든 찾아냄)
  const { arr, path } = findArrayDeep(payload);
  if (arr.length) {
    console.log("[weeklyNews] auto-detected array at:", path);
    return mapItems(arr);
  }

  console.warn("[weeklyNews] no array found in payload keys:", Object.keys(payload || {}));
  return [];
}

function mapItems(arr) {
  return arr.map((it, i) => ({
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

function findArrayDeep(root) {
  const q = [{ node: root, path: "root" }];
  const seen = new Set();
  while (q.length) {
    const { node, path } = q.shift();
    if (!node || typeof node !== "object" || seen.has(node)) continue;
    seen.add(node);

    if (Array.isArray(node)) return { arr: node, path };

    for (const k of Object.keys(node)) {
      q.push({ node: node[k], path: `${path}.${k}` });
    }
  }
  return { arr: [], path: "" };
}

/** 지역별 주간 뉴스 */
export async function getWeeklyNewsByRegion(region, opts = {}) {
  if (!region) return [];
  const res = await api.get(PATH_WEEKLY_NEWS, {
    ...opts,
    params: { regionName: region }, // ⚠️ 서버 키 한 가지로 고정
  });

  const list = normalizeWeeklyNewsPayload(res?.data);

  // 디버그 로그
  console.log("[weeklyNews]", {
    region,
    count: list.length,
    sample: list[0],
    rawType: typeof res?.data,
  });

  return list;
}
