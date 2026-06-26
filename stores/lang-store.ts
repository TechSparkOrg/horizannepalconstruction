import { create } from "zustand"

interface LangState {
  lang: string
  toggle: () => void
}

export const useLangStore = create<LangState>((set) => ({
  lang: "en",
  toggle: () => set((s) => ({ lang: s.lang === "en" ? "ne" : "en" })),
}))
