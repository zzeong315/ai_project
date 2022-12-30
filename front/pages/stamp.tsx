import EmotionAnalysis from "@components/page/stamp/EmotionAnalysis";
import EmotionCalendar from "@components/page/stamp/EmotionCalendar";
import EmotionGraph from "@components/page/stamp/EmotionGraph";
import StampDiary from "@components/page/stamp/StampDiary";
import StampTodoList from "@components/page/stamp/StampTodoList";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { Box, Container, Wrapper } from "@styles/layout";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import styled from "styled-components";
import { useGetFriend } from "@hooks/useGetFriend";
import { useRecoilValue } from "recoil";
import { MonthEmotionAtom } from "@recoil/stamp";
import { emojiList } from "@services/utils/emojiList";

const emotion = ["기쁨", "상처", "당황", "분노", "불안", "슬픔"];

const Stamp = () => {
  const [openStamp, setOpenStamp] = useState<boolean>(false);
  const [isUserCalendar, setIsUserCalendar] = useState<boolean>(true);
  const { isConnected } = useGetFriend();
  const MonthEmotion = useRecoilValue(MonthEmotionAtom);

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "user") {
      setIsUserCalendar(true);
      setOpenStamp(false);
    } else if (target.id === "partner") {
      setIsUserCalendar(false);
      setOpenStamp(true);
    }
  };

  return (
    <StampWrapper>
      <LeftContainer>
        <LeftBox>
          <StampDiary />
        </LeftBox>
        <LeftBox>
          <StampTodoList />
        </LeftBox>
      </LeftContainer>
      <RightContainer>
        {isConnected && (
          <ButtonBox>
            <Button onClick={handleToggle} id={"user"} className={openStamp ? "" : "active"}>
              나
            </Button>
            <Button onClick={handleToggle} id={"partner"} className={openStamp ? "active" : ""}>
              친구
            </Button>
          </ButtonBox>
        )}
        <CalendarBox>
          <EmotionCalendar isUserCalendar={isUserCalendar} />
        </CalendarBox>
        <EmotionBox>
          {isConnected ? (
            Object.keys(MonthEmotion).length !== 0 ? (
              <BottomAnalysis>
                <EmotionGraph />
                <EmotionAnalysis />
              </BottomAnalysis>
            ) : (
              <TextBox>
                <p>분석할 일기가 없습니다.</p>
                <EmojiBox>{emotion.map(e => emojiList(e, 20))}</EmojiBox>
              </TextBox>
            )
          ) : (
            <p>친구와 연결하고 감정 분석 기능을 경험해 보세요!</p>
          )}
        </EmotionBox>
      </RightContainer>
    </StampWrapper>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const StampWrapper = styled(Wrapper)`
  justify-content: space-evenly;
  @media screen and (max-width: 850px) {
    height: auto;
    flex-direction: column;
  }
`;

const LeftContainer = styled(Container)`
  flex-direction: column;
  justify-content: space-between;
  width: 36%;
  height: 95vh;
  background-color: ${props => props.theme.color.background};
  @media screen and (max-width: 850px) {
    margin-top: 30px;
    width: 90%;
  }
`;

const RightContainer = styled(Container)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  width: 58%;
  height: 95vh;

  @media screen and (max-width: 850px) {
    margin: 1em 0;
    width: 90%;
    height: auto;
  }
`;

const LeftBox = styled(Box)`
  width: 100%;
  height: 49%;
  background-color: ${props => props.theme.color.nav};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const ButtonBox = styled.div`
  width: 100%;
  justify-content: flex-start;
  padding: 0 1.5em;
`;
const Button = styled.button`
  box-shadow: none;
  background-color: inherit;
  color: ${props => props.theme.color.fontMain};
  width: 50%;
  height: 5vh;
  border-radius: 0;
  &.active {
    border-bottom: 2px solid ${props => props.theme.color.fontPoint};
    color: ${props => props.theme.color.fontPoint};
    font-weight: 700;
  }
  :hover {
    background-color: inherit;
    font-weight: 700;
  }
`;
const CalendarBox = styled.div`
  width: 85%;
  height: 55vh;
`;
const BottomAnalysis = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;
const EmotionBox = styled(CalendarBox)`
  margin-top: 2vh;
  width: 90%;
  height: 30vh;
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.borderSize.borderSm};
  background-color: ${props => props.theme.color.purpleBox};
  justify-content: center;
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};

  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: 1em;
  }
`;
const TextBox = styled(Box)`
  flex-direction: column;
  gap: 1.5em;
`;
const EmojiBox = styled(Box)`
  gap: 1em;
`;

export default Stamp;
