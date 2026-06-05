import { create } from "zustand";

type Lang = "en" | "np";

interface LangStore {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

export const useLangStore = create<LangStore>()((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
  toggle: () => set((s) => ({ lang: s.lang === "en" ? "np" : "en" })),
}));
