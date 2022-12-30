import { Box } from "@styles/layout";
import React from "react";
import styled from "styled-components";
import { MonthDiaries } from "@type/diary";
import DiaryListDay from "./DiaryListDay";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clickedDiaryDateState, clickedDiaryMonthState, today } from "@recoil/diary";
import { useGetDiaries } from "@hooks/useGetDiaries";
import { diarywriteState } from "@recoil/diary";

const DiaryListItem = () => {
  const setClickedDiaryDate = useSetRecoilState(clickedDiaryDateState);
  const todayDate = useRecoilValue(today);
  const clickedMonth = useRecoilValue(clickedDiaryMonthState);
  const setIsTextAreaOpen = useSetRecoilState(diarywriteState);

  const getTodayMain = () => {
    setClickedDiaryDate(todayDate);
  };

  const isTodayWritten = (element: MonthDiaries) => {
    return element.date.substring(0, 10) === todayDate;
  };

  const handleClickDate = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) setClickedDiaryDate(e.currentTarget.id);
    setIsTextAreaOpen(false);
  };

  const { monthDiaryList } = useGetDiaries(clickedMonth);

  return (
    <>
      {monthDiaryList &&
      monthDiaryList.length > 0 &&
      monthDiaryList.find(el => el?.some(diary => isTodayWritten(diary))) ? (
        <></>
      ) : (
        <WriteTodayDiaryBtn onClick={getTodayMain}>오늘 일기 쓰기</WriteTodayDiaryBtn>
      )}

      {monthDiaryList && monthDiaryList.length > 0 ? (
        monthDiaryList
          ?.slice(0)
          .reverse()
          .map(diaries => (
            <ListItemBox key={diaries[0]?.id} id={diaries[0].date} onClick={handleClickDate}>
              <DiaryListDay diary={diaries[0]} />
              <Text>
                {diaries[0]?.content.length < 16 ? diaries[0]?.content : diaries[0]?.content.substring(0, 15) + "..."}
              </Text>
            </ListItemBox>
          ))
      ) : (
        <TextBox>작성된 일기가 없습니다.</TextBox>
      )}
    </>
  );
};

const WriteTodayDiaryBtn = styled.p`
  background-color: ${props => props.theme.color.purpleBox};
  width: 100%;
  font-size: ${props => props.theme.fontSize.textSm};
  color: ${props => props.theme.color.fontMain};
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.color.buttonHover};
    color: ${props => props.theme.color.white};
    font-weight: 600;
  }
`;

const ListItemBox = styled(Box)`
  width: 100%;
  height: 5em;
  border-radius: 0;
  border-bottom: 0.5px solid ${props => props.theme.color.border};
  display: grid;
  grid-template-columns: 25% 75%;
  align-items: center;
  justify-content: flex-start;
  &.active {
    background-color: rgba(142, 117, 253, 0.5);
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
  }
`;
const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 0.5em;
`;
const TextBox = styled(Box)`
  padding: 1.5em;
`;

export default DiaryListItem;
