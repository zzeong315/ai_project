import { atom } from "recoil";

export const dayAtom = atom<Date>({
  key: "day",
  default: new Date(),
});
