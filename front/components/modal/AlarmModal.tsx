import { isAlarmModalAtom } from "@recoil/modal";
import { checkRequestFriend, confirmFriend, rejectFriend } from "@services/api/friend";
import { colors } from "@styles/common_style";
import { Box } from "@styles/layout";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";
import { Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReceiveFriend } from "@type/friend";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CloseIcon } from "../icons/CloseIcon";

const AlarmModal = () => {
  const queryClient = useQueryClient();
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(isAlarmModalAtom);
  const { data: receiveFriends } = useQuery<ReceiveFriend[]>(["friend", "list"], () => checkRequestFriend("receive"));

  const acceptMutation = useMutation((data: ReceiveFriend) => confirmFriend(data?.id!), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["friend"]);
      setIsAlarmOpen(false);
      alert("친구수락이 완료되었습니다.");
    },
    onError: () => {
      alert("잠시후에 다시 시도해주세요.");
    },
  });

  const deleteMutation = useMutation((data: ReceiveFriend) => rejectFriend(data?.id!), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["friend", "info"]);
      alert("친구거절이 완료되었습니다.");
    },
    onError: () => {
      alert("잠시후에 다시 시도해주세요.");
    },
  });

  const handleAgreeClick = async (friendInfo: ReceiveFriend) => {
    const result = window.confirm("친구요청을 수락하시겠어요?");
    if (result) {
      acceptMutation.mutate(friendInfo);
    }
  };
  const handleDenyClick = async (friendInfo: ReceiveFriend) => {
    const result = window.confirm("친구요청을 거절하시겠어요?");
    if (result) {
      deleteMutation.mutate(friendInfo);
    }
  };
  const handleCancelClick = () => {
    setIsAlarmOpen(false);
  };

  return (
    <AnimatePresence>
      {isAlarmOpen && (
        <ModalWrapper>
          <ModalContainer height="500px" {...ModalVariant}>
            <Cancel onClick={handleCancelClick}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            <ContentArea>
              <Title>알림</Title>
              <FriendAlarm>
                <SubTitle>✓ 친구 요청 확인</SubTitle>
                {receiveFriends && receiveFriends?.length >= 1 ? (
                  receiveFriends.map(friend => (
                    <Content key={friend.id}>
                      <Text>{`${friend.fromUserNickname}님에게 친구요청이 왔습니다.`}</Text>
                      <Box>
                        <AgreeButton onClick={() => handleAgreeClick(friend)}>수락</AgreeButton>
                        <DenyButton onClick={() => handleDenyClick(friend)}>거절</DenyButton>
                      </Box>
                    </Content>
                  ))
                ) : (
                  <NoFriendBox>친구요청이 없습니다.</NoFriendBox>
                )}
              </FriendAlarm>
            </ContentArea>
          </ModalContainer>
          <Overlay {...OverlayVariant} onClick={handleCancelClick} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const ContentArea = styled(Box)`
  flex-direction: column;
  width: 100%;
`;
const FriendAlarm = styled(Box)`
  width: 100%;
  flex-direction: column;
`;
const Content = styled(Box)`
  width: 100%;
  padding: 0.5em 2em;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.textLg};
  color: ${props => props.theme.color.fontPoint};
  margin: 1em 0 1.5em 0;
  font-weight: bold;
`;
const SubTitle = styled.p`
  align-self: flex-start;
  padding: 0.5em 1em 0.5em 1.5em;
  color: ${props => props.theme.color.fontPoint};
  font-weight: 600;
`;
const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
`;
const AgreeButton = styled.button`
  font-size: ${props => props.theme.fontSize.textXs};
  padding: 0.3em 0.5em;
  margin-left: 0.3em;
  border-radius: 5px;
`;
const DenyButton = styled(AgreeButton)`
  background-color: ${props => colors.red};
  &:hover {
    background-color: ${props => colors.red};
    opacity: 0.8;
  }
`;
const NoFriendBox = styled(Box)`
  padding: 2em 2em;
`;

export default AlarmModal;
