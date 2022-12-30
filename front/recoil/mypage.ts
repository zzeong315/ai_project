import { atom } from "recoil";

type tab = "mypage" | "connect";

export const mypageState = atom<tab>({
  key: "mypagetab",
  default: "mypage",
});
