import { atom } from "recoil";

export const isSurveyModalAtom = atom({
  key: "isSurveyModal",
  default: false,
});

export const isAlarmModalAtom = atom({
  key: "isAlarmModal",
  default: false,
});

export const isDeleteUserModalAtom = atom({
  key: "isDeleteUserModal",
  default: false,
});

export const isDisconnectModalAtom = atom({
  key: "isDisconnectModal",
  default: false,
});

export const isChangePasswordModalAtom = atom({
  key: "isChangePasswordModal",
  default: false,
});

export const isChangeNicknameModalAtom = atom({
  key: "isChangeNicknameModal",
  default: false,
});

export const isFindPasswordModalAtom = atom({
  key: "isFindPasswordModal",
  default: false,
});