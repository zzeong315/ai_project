export type requestType = "send" | "receive";

export type FCodeType = "code1" | "code2" | "code3" | "code4" | "code5" | "code6";
export type MatchCodeFormValue = { [K in FCodeType]: string };

export interface ReceiveFriend {
  id: number;
  fromUserId: string;
  fromUserNickname: string;
  createdAt: Date;
}

export interface Friend {
  toUserId: string;
  toUserNickname: string;
  title: string;
  createdAt: Date;
}
export interface FriendProps {
  friend: Friend;
}
