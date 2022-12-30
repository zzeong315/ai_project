import { isEmoAnalysisAtom, MonthEmotionAtom } from "@recoil/stamp";
import { colorList, emojiList } from "@services/utils/emojiList";
import { sumMonthEmotion } from "@services/utils/sumMonthEmotion";
import { Box } from "@styles/layout";
import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

const EmotionAnalysis = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("기쁨");
  const [isEmoAnalysisOpen, setIsEmoAnalysisOpen] = useRecoilState(isEmoAnalysisAtom);
  const MonthEmotionData = useRecoilValue(MonthEmotionAtom);
  const EmotionObj = sumMonthEmotion(MonthEmotionData);
  const totalDays = Object.values(MonthEmotionData).length;

  const handleClickDetail = (key: string) => {
    setIsEmoAnalysisOpen(true);
    setSelectedEmotion(key);
  };

  return (
    <EmotionAnalsisBox>
      {isEmoAnalysisOpen ? (
        <EmotionDetailBox bordercolor={colorList(selectedEmotion, 0.5)}>
          <DetailContainer>
            <DetailEmotion>
              <DetailEmoji>{emojiList(selectedEmotion, 40)}</DetailEmoji>
              <DetailTitleBox>
                <DetailTitle>{selectedEmotion}</DetailTitle>
                <EmotionDetailPercent>
                  {Math.floor((EmotionObj[selectedEmotion] / totalDays) * 100)}%
                </EmotionDetailPercent>
              </DetailTitleBox>
            </DetailEmotion>
            <DetailTextBox>
              <DetailText>
                일기를 쓴 <span>{totalDays}</span>일 중에
                <span>{selectedEmotion}</span>감정을 느낀 날은 <br />
                <span>{EmotionObj[selectedEmotion]}</span>일로{" "}
                <span>{Math.floor((EmotionObj[selectedEmotion] / totalDays) * 100)}%</span>입니다.
              </DetailText>
            </DetailTextBox>
            <ButtonBox>
              <Button onClick={() => setIsEmoAnalysisOpen(false)}>전체 감정보기 →</Button>
              <Link href="/planner">
                <Button>오늘의 추천활동 보러가기 →</Button>
              </Link>
            </ButtonBox>
          </DetailContainer>
        </EmotionDetailBox>
      ) : (
        <EmotionCoverBox>
          {Object.entries(EmotionObj).map(([key, value]) => (
            <EmotionBox
              key={key}
              bgcolor={colorList(key, 0.2)}
              bordercolor={colorList(key, 1)}
              onClick={() => handleClickDetail(key)}
            >
              <Emoji>{emojiList(key, 18)}</Emoji>
              <TextBox>
                <Emotion>{key}</Emotion>
                <EmotionPercent>{Math.floor((value / totalDays) * 100)}%</EmotionPercent>
              </TextBox>
            </EmotionBox>
          ))}
        </EmotionCoverBox>
      )}
    </EmotionAnalsisBox>
  );
};

const EmotionAnalsisBox = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 1em;

  @media screen and (max-width: 850px) {
    width: 100%;
    height: auto;
  }
`;
const EmotionCoverBox = styled(Box)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${props => props.theme.color.nav};
`;
const EmotionBox = styled(Box)<{ bgcolor: string | null; bordercolor: string | null }>`
  justify-content: space-between;
  padding: 0.5em 0.3em 0.5em 0.3em;
  width: 90%;
  ${props =>
    css`
      &:hover {
        background: ${props.bgcolor};
        border: 1px solid ${props.bordercolor};
      }
    `}
`;
const Emoji = styled(Box)`
  border-radius: 0;
  width: 4em;
`;
const TextBox = styled(Box)`
  justify-content: space-between;
  width: 80%;
`;
const Emotion = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  margin-right: 0.3em;
  font-weight: 600;
`;
const EmotionPercent = styled(Emotion)`
  font-size: ${props => props.theme.fontSize.textMain};
`;
const EmotionDetailBox = styled(EmotionCoverBox)<{ bordercolor: string | null }>`
  background-color: ${props => props.theme.color.nav};
  border: 2px solid ${props => props.bordercolor};
  padding: 1em 1em 0.5em 1em;
`;
const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DetailEmoji = styled(Box)`
  margin-left: 5px;
`;
const DetailTitleBox = styled(Box)`
  align-items: flex-end;
`;
const DetailTitle = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  font-weight: 600;
  padding-bottom: 3px;
  padding-right: 5px;
`;
const DetailEmotion = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (min-width: 850px) and (max-width: 1150px) {
    ${DetailTitleBox} {
      width: 100%;
      justify-content: space-between;
    }
    ${DetailTitle} {
      font-size: ${props => props.theme.fontSize.textLg};
    }
    ${DetailEmoji} {
      display: none;
    }
  }
`;
const EmotionDetailPercent = styled.p`
  font-size: 30px;
`;
const DetailTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DetailText = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  padding: 3px;
  text-align: center;
  span {
    font-size: ${props => props.theme.fontSize.textSm};
    font-weight: 600;
    padding: 0 3px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  box-shadow: none;
  padding: 0.3em 0 0 0;
  margin: 0;
  font-size: ${props => props.theme.fontSize.textXs};
  background: none;
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.fontMain};
    background: none;
    font-weight: 700;
  }
`;
export default EmotionAnalysis;
