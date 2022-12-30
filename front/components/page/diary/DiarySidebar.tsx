import { Box, Container } from "@styles/layout";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import DiaryListItem from "./DiaryListItem";
import { useRecoilState } from "recoil";
import { clickedDiaryMonthState } from "@recoil/diary";
import { LeftarrowIcon, RightarrowIcon } from "@components/icons/ArrowIcons";

const DiarySidebar = () => {
  const [clickedMonth, setClickedMonth] = useRecoilState(clickedDiaryMonthState);

  const nowYearStr = useMemo(() => clickedMonth.substring(0, 4), [clickedMonth]);
  const nowMonth = useMemo(() => Number(clickedMonth.substring(5, 7)), [clickedMonth]);
  let returnMonth;
  let yearStr;

  const handleChangeLastMonth = useCallback(() => {
    if (nowMonth === 1) {
      returnMonth = 12;
      yearStr = String(Number(nowYearStr) - 1);
    } else {
      returnMonth = nowMonth - 1;
      yearStr = nowYearStr;
    }

    const returnMonthStr = yearStr + "-" + String(returnMonth);
    setClickedMonth(returnMonthStr);
  }, [nowYearStr, nowMonth]);

  const handleChangeNextMonth = useCallback(() => {
    if (nowMonth === 12) {
      returnMonth = 1;
      yearStr = String(Number(nowYearStr) + 1);
    } else {
      returnMonth = nowMonth + 1;
      yearStr = nowYearStr;
    }

    const returnMonthStr = yearStr + "-" + String(returnMonth);
    setClickedMonth(returnMonthStr);
  }, [nowYearStr, nowMonth]);

  return (
    <SidebarContainer>
      <MonthBox>
        <ChangeLastMonth onClick={handleChangeLastMonth}>
          <LeftarrowIcon color={"white"} />
        </ChangeLastMonth>
        {clickedMonth.substring(0, 4)}년 {clickedMonth.substring(5, 7)}월
        <ChangeNextMonth onClick={handleChangeNextMonth}>
          <RightarrowIcon color={"white"} />
        </ChangeNextMonth>
      </MonthBox>
      <DiaryListItem />
    </SidebarContainer>
  );
};

const ChangeLastMonth = styled.button`
  font-size: ${props => props.theme.fontSize.textXs};
  box-shadow: none;
`;

const ChangeNextMonth = styled.button`
  font-size: ${props => props.theme.fontSize.textXs};
  box-shadow: none;
`;

const SidebarContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const MonthBox = styled(Box)`
  background-color: ${props => props.theme.color.button};
  width: 100%;
  height: 2.5em;
  border-radius: 10px 10px 0 0;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.textMd};
  font-weight: 500;
  line-height: 26px;

  gap: 10px;
`;

export default DiarySidebar;
