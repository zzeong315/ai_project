import { atom } from "recoil";
import { formatDate } from "@services/utils/formatDate";

export const diarywriteState = atom({
  key: "istextareaopen",
  default: false,
});

export const clickedDiaryDateState = atom({
  key: "clickedDiaryDate",
  default: String(formatDate(new Date())),
});

export const clickedDiaryMonthState = atom({
  key: "clickedDiaryMonth",
  default: String(formatDate(new Date())).substring(0, 7),
});

export const today = atom({
  key: "today",
  default: String(formatDate(new Date())),
});
