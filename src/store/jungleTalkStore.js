import { create } from "zustand";
import { getChats } from "../shared/utils/chatApi";

export const useJungleTalkStore = create((set, get) => ({
  step: 1,
  latestQuestions: [], // [{ question, answer, constitution, ... }]
  latestLoadedAt: 0, // 간단한 캐싱용 (ms)
  setStep: (step) => set({ step }),

  // 최신 질문 로드
  loadLatestQuestions: async ({ limit = 10, force = false } = {}) => {
    const now = Date.now();
    const { latestLoadedAt } = get();

    // 30초 이내에 불렀으면 스킵 (불필요한 중복 호출 방지)
    if (!force && now - latestLoadedAt < 30_000) return;

    const { list } = await getChats({ limit });
    set({ latestQuestions: list, latestLoadedAt: now });
  },
}));
