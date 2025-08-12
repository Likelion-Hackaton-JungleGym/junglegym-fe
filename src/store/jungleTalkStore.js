import { create } from "zustand";

export const useJungleTalkStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));
