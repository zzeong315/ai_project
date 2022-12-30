import { atom } from "recoil";

export const isCodeModalAtom = atom<boolean>({
  key: "isCodeModal",
  default: false,
});
