import { User } from "@type/user";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loginStateSelector = selector({
  key: "loginState",
  get: ({ get }) => (get(userAtom)?.accessToken ? true : false),
});
