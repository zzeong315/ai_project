import { Box, Container } from "@styles/layout";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { diarywriteState, clickedDiaryDateState } from "../../../recoil/diary";
import DiaryTextarea from "./DiaryTextarea";
import PartnerDiary from "./PartnerDiary";
import UserDiary from "./UserDiary";
import getDayString from "../../../services/utils/getDayString";
import { useGetDiary } from "@hooks/useGetDiary";

interface TitleProps {
  title: string | undefined;
}

const DiaryMain = ({ title }: TitleProps) => {
  const isTextAreaOpen = useRecoilValue(diarywriteState);
  const clickedDiaryDate = useRecoilValue(clickedDiaryDateState);

  const yyyymmdd = useMemo(() => clickedDiaryDate?.substring(0, 10), [clickedDiaryDate]);
  const [year, month, day] = yyyymmdd.split("-");
  const dayStr = getDayString(clickedDiaryDate);

  const { userDiary, partnerDiary } = useGetDiary(yyyymmdd);

  return (
    <MainContainer>
      <TextBox>
        <Title>{title}</Title>
        <Date>
          {year}년 {month}월 {day}일 {dayStr}요일
        </Date>
      </TextBox>
      {isTextAreaOpen ? (
        <InsideContainer>
          <DiaryTextarea />
        </InsideContainer>
      ) : (
        <InsideContainer2>
          <UserDiary diary={userDiary} />
          <PartnerDiary diary={partnerDiary} />
        </InsideContainer2>
      )}
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 25px;
  justify-content: space-evenly;
`;

const TextBox = styled(Box)`
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.textLg};
  line-height: 29px;
  padding-bottom: 1em;
`;

const Date = styled(Title)`
  font-size: ${props => props.theme.fontSize.textMain};
  padding-bottom: 0;
`;
const InsideContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InsideContainer2 = styled(InsideContainer)`
  flex-direction: column;
  width: 100%;
  height: 80%;
  justify-content: space-evenly;
`;

export default DiaryMain;
