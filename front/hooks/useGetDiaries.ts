import { useQuery } from "@tanstack/react-query";
import { getDiaries } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

export const useGetDiaries = (date: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm') 를 인자로 받습니다.
  const [monthDiaryList, setMonthDiaryList] = useState<Array<Array<Diary>> | undefined>();

  const [year, month] = date.split("-");

  const { data } = useQuery(["diaries", year, month], () => getDiaries(date), {
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && Object.values(data.diaries)) {
      setMonthDiaryList(Object.values(data.diaries));
    } else {
      setMonthDiaryList([]);
    }
  }, [data]);

  return { monthDiaryList };
};
