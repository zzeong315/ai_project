export interface Diary {
  title: string;
  id?: string;
  friendId?: string;
  userId?: string;
  nickname: string;
  content: string;
  date: string;
}

export interface MonthDiaries {
  id?: string;
  date: string;
  content: string;
}

export interface DiaryProps {
  diary: Diary | undefined;
}

export interface MonthDiaryProps {
  diary: MonthDiaries;
}