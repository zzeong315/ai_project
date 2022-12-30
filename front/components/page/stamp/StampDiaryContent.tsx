import { Box } from "@styles/layout";
import React from "react";
import styled from "styled-components";
import { today } from "@recoil/diary";
import { useRecoilValue } from "recoil";
import { useGetDiary } from "@hooks/useGetDiary";
import { useGetFriend } from "@hooks/useGetFriend";

const StampDiaryContent = () => {
  const { isConnected } = useGetFriend();
  const todayDate = useRecoilValue(today);
  const { userDiary, partnerDiary } = useGetDiary(todayDate);

  return (
    <ContentBox>
      <DiarySummary>
        <Name>나</Name>
        <Content>
          {!isConnected ? (
            <p>먼저 친구와 연결해 보세요!</p>
          ) : userDiary !== undefined ? (
            userDiary?.content.length < 28 ? (
              userDiary?.content
            ) : (
              userDiary?.content.substring(0, 28) + "..."
            )
          ) : (
            "작성된 일기가 없습니다."
          )}
        </Content>
      </DiarySummary>
      <PartnerDiarySummary>
        <PartnerName>상대</PartnerName>
        <Content>
          {!isConnected ? (
            <p>먼저 친구와 연결해 보세요!</p>
          ) : partnerDiary !== undefined ? (
            partnerDiary?.content.length < 28 ? (
              partnerDiary?.content
            ) : (
              partnerDiary?.content.substring(0, 28) + "..."
            )
          ) : (
            "작성된 일기가 없습니다."
          )}
        </Content>
      </PartnerDiarySummary>
    </ContentBox>
  );
};
const ContentBox = styled(Box)`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const DiarySummary = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  width: 100%;
  margin: 0.5em 0;
  height: 37%;
  display: grid;
  grid-template-columns: 12% 88%;
  justify-content: flex-start;
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
  /* border: 1px solid ${props => props.theme.color.borderPoint}; */
`;
const Name = styled(Box)`
  background-color: ${props => props.theme.color.button};
  height: 100%;
  color: ${props => props.theme.color.white};
  border-radius: 8px 0 0 8px;
`;
const Content = styled(Box)`
  height: 100%;
  justify-content: flex-start;
  padding: 1em;
`;
const PartnerDiarySummary = styled(DiarySummary)`
  background-color: ${props => props.theme.color.grayBox};
  /* border: 1px solid ${props => props.theme.color.border}; */
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
`;
const PartnerName = styled(Name)`
  background-color: ${props => props.theme.color.fontSub};
`;

export default StampDiaryContent;
