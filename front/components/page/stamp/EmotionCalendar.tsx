import { LeftarrowIcon, RightarrowIcon } from "@components/icons/ArrowIcons";
import { MonthEmotionAtom } from "@recoil/stamp";
import { getMonthEmotion, getPartnerMonthEmotion } from "@services/api/stamp";
import { getEmoji } from "@services/utils/getEmoji";
import { Box } from "@styles/layout";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";

interface calendarProps {
  isUserCalendar: boolean;
}

const EmotionCalendar = ({ isUserCalendar }: calendarProps) => {
  const setMonthEmotionData = useSetRecoilState(MonthEmotionAtom);
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const MONTHS = ["1 월", "2 월", "3 월", "4 월", "5 월", "6 월", "7 월", "8 월", "9 월", "10 월", "11 월", "12 월"];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  const { data: emotion } = useQuery(
    [
      "emotion",
      isUserCalendar ? "me" : "friend",
      year.toString(),
      (month + 1 <= 9 ? "0" + (month + 1) : month + 1).toString(),
    ],
    () => {
      return isUserCalendar
        ? getMonthEmotion({ nowYear: year, nowMonth: month + 1 })
        : getPartnerMonthEmotion({ nowYear: year, nowMonth: month + 1 });
    },
    {
      onSuccess: data => setMonthEmotionData(data),
    },
  );

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;
  const monthDays = days[month] + (startDay - 1);

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(year, month - 1, day))}>
          <LeftarrowIcon color={"#5C38FF"} />
        </Button>
        <MonthBox>
          <Year>{year}년</Year>
          <Month>{MONTHS[month]}</Month>
        </MonthBox>
        <Button onClick={() => setDate(new Date(year, month + 1, day))}>
          <RightarrowIcon color={"#5C38FF"} />
        </Button>
      </Header>
      <Body>
        <WeekBox>
          {DAYS_OF_THE_WEEK.map(w => (
            <WeekTile key={w}>
              <WeekText>{w}</WeekText>
            </WeekTile>
          ))}
        </WeekBox>
        <DayBox>
          {Array(monthDays)
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2);

              return (
                <DayTile
                  key={index}
                  onClick={() => setDate(new Date(year, month, d))}
                  className={monthDays > 35 ? "shortHeight" : ""}
                  isToday={year === today.getFullYear() && month === today.getMonth() && d === today.getDate()}
                  notInMonth={d < 1}
                >
                  {d > 0 ? <DayText>{d}</DayText> : ""}
                  {emotion && d in emotion ? <EmojiBox key={d}>{getEmoji(emotion[d])}</EmojiBox> : null}
                </DayTile>
              );
            })}
        </DayBox>
      </Body>
    </Frame>
  );
};

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1em;
`;

const Header = styled.div`
  height: 5vh;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;
const MonthBox = styled(Box)`
  margin: 0 0.5em;
`;
const Year = styled(Box)`
  font-size: ${props => props.theme.fontSize.textMd};
  margin: 0.5em;
  /* color: ${props => props.theme.color.fontSub}; */
`;
const Month = styled(Box)`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textMd};
`;
const ButtonBox = styled(Box)`
  height: 100%;
  align-items: flex-end;
`;
const Button = styled.div`
  cursor: pointer;
  padding: 0 1em;
  align-self: center;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WeekBox = styled(Box)`
  width: 100%;
  height: 2vh;
  border-radius: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.color.fontMain};
`;
const DayBox = styled(WeekBox)`
  flex-wrap: wrap;
  padding-top: 1em;
  height: 40vh;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
`;

const WeekTile = styled.div`
  width: 14.28%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderSize.borderSm};
  cursor: pointer;
`;
const DayTile = styled.div<{ isToday: boolean; notInMonth: boolean }>`
  width: 14.28%;
  height: 8.3vh;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.color.purpleBox};
  border-radius: ${props => props.theme.borderSize.borderSm};
  cursor: pointer;

  &.shortHeight {
    height: 7vh;
  }
  ${props =>
    props.isToday &&
    css`
      background: ${props => props.theme.color.purpleBox};
      font-weight: bold;
      color: ${props => props.theme.color.fontPoint};
      :focus {
        background: #6f48eb33;
        font-weight: bold;
        color: ${props => props.theme.color.fontPoint};
      }
    `}
  ${props =>
    props.notInMonth &&
    css`
      background: none;
      border: none;
      :hover {
        background: none;
      }
    `}
`;
const EmojiBox = styled(Box)`
  border-radius: 0;
  font-size: ${props => props.theme.fontSize.textXl};
`;

const WeekText = styled.p`
  font-weight: 500;
  @media screen and (max-width: 850px) {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const DayText = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  margin: 0.5em;
  @media screen and (max-width: 850px) {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;

export default React.memo(EmotionCalendar);
