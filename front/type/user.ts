export const LOGIN = {
  NORMAL: "normal",
  KAKAO: "kakao",
  GOOGLE: "google",
};

export interface User {
  id: string;
  email?: string;
  accessToken: string;
  nickname?: string;
  friendCode?: string;
  password?: string;
  confirmPassword?: string;
  survey?: string[];
  socialId?: string;
  isFirstLogin?: number;
}

export interface UserJoinForm extends Pick<User, "email" | "nickname" | "password" | "confirmPassword"> {}

export interface UserLoginForm extends Pick<User, "email" | "password"> {}

export interface PasswordForm {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export interface NicknameForm {
  id: string;
  nickname: string;
}

export interface SurveyForm {
  id: string;
  survey?: string[];
}

export interface kakaoForm {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}
