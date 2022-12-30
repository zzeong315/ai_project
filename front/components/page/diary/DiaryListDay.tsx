import { Box } from "@styles/layout";
import { MonthDiaryProps } from "@type/diary";
import React from "react";
import styled from "styled-components";
import getDayString from "@services/utils/getDayString";

const DiaryListDay = ({ diary }: MonthDiaryProps) => {
  const dayStr = getDayString(diary.date.substring(0, 10));

  return (
    <DateBox>
      <Date1>{dayStr}</Date1>
      <Date2>{diary.date.substring(8, 10)}</Date2>
    </DateBox>
  );
};

const DateBox = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.color.purpleBox};
  border-radius: 0;
  flex-direction: column;
  color: ${props => props.theme.color.fontDark};
  margin: 0 1em;
`;

const Date1 = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  padding: 0.1em;
`;
const Date2 = styled(Date1)`
  font-size: ${props => props.theme.fontSize.textLg};
  font-weight: bold;
`;

export default DiaryListDay;
