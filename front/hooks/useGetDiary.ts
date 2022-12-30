import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from "@recoil/user";

export const useGetDiary = (date: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm-dd' 형태) 를 인자로 받습니다.
  const user = useRecoilValue(userAtom);
  const [userDiary, setUserDiary] = useState<Diary>();
  const [partnerDiary, setPartnerDiary] = useState<Diary>();
  const [year, month, day] = date.split("-");

  const { data } = useQuery(["diaries", year, month, day], () => getDiary(date), {
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!data) {
      setUserDiary(undefined);
      setPartnerDiary(undefined);
    }

    if (data?.diaries?.find((el: any) => el.userId === user?.id)) {
      const userDiaryInfo = data?.diaries?.find((el: any) => el.userId === user?.id);
      setUserDiary({
        title: data?.title!,
        userId: userDiaryInfo.userId,
        id: userDiaryInfo.id,
        nickname: userDiaryInfo.nickname,
        content: userDiaryInfo.content,
        date: userDiaryInfo.date?.substring(0, 10),
      });
    } else {
      setUserDiary(undefined);
    }

    if (data?.diaries?.find((el: any) => el.userId !== user?.id)) {
      const partnerDiaryInfo = data?.diaries?.find((el: any) => el.userId !== user?.id);
      setPartnerDiary({
        title: data?.title!,
        userId: partnerDiaryInfo.userId,
        id: partnerDiaryInfo.id,
        nickname: partnerDiaryInfo.nickname,
        content: partnerDiaryInfo.content,
        date: partnerDiaryInfo.date?.substring(0, 10),
      });
    } else {
      setPartnerDiary(undefined);
    }
  }, [data]);

  return { userDiary, partnerDiary };
};
