import { MonthEmotionProps } from "@type/stamp";
import { atom } from "recoil";

export const isEmoAnalysisAtom = atom({
  key: "isEmoAnalysis",
  default: false,
});

export const MonthEmotionAtom = atom<MonthEmotionProps>({
  key: "MonthEmotion",
  default: {},
});