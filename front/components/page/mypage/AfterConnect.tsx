import { PencilIcon, SmallCheckIcon } from "@components/icons/CheckIcon";
import { HandshakeIcon } from "@components/icons/HandshakeIcon";
import { UserIcon } from "@components/icons/UserIcon";
import { isDisconnectModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { changeDiaryTitle } from "@services/api/friend";
import { fontSize } from "@styles/common_style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FriendProps } from "@type/friend";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Container } from "../../../styles/layout";
import FriendDisconnectModal from "./modal/FriendDisconnectModal";

const timeReset = (date: Date) => {
  const targetResetTime: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return targetResetTime.getTime();
};

const AfterConnect = ({ friend }: FriendProps) => {
  const queryClient = useQueryClient();
  const setIsDisconnectOpen = useSetRecoilState(isDisconnectModalAtom);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const user = useRecoilValue(userAtom);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ title: string }>();

  const updateMutation = useMutation(({ title }: { title: string }) => changeDiaryTitle(title), {
    onSuccess: () => {
      queryClient.invalidateQueries(["friend", "info"]);
      setIsEdit(false);
      resetField("title");
    },
  });

  const day = useMemo(() => {
    if (friend) {
      const today = new Date();
      const targetDay = new Date(friend?.createdAt);

      const diffDate = timeReset(today) - timeReset(targetDay);
      return Math.trunc(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
    }
  }, [friend]);

  const onChangeSubmit = async ({ title }: { title: string }) => {
    updateMutation.mutate({ title });
  };

  return (
    <>
      <ContentArea>
        <div className="info">
          {isEdit ? (
            <div>
              <Form onSubmit={handleSubmit(onChangeSubmit)}>
                <Input
                  autoFocus
                  defaultValue={friend.title}
                  placeholder="다이어리 이름을 입력해주세요."
                  {...register("title", {
                    required: true,
                    minLength: { value: 2, message: "2자 이상 입력해주세요." },
                  })}
                />
                <EditButton type="submit">
                  {" "}
                  <SmallCheckIcon />
                </EditButton>
              </Form>
              <ErrorMessage>{errors?.title?.message}</ErrorMessage>
            </div>
          ) : (
            <>
              <DiaryName>
                <p>{friend.title}</p>
                <EditIcon onClick={() => setIsEdit(true)}>
                  <PencilIcon />
                </EditIcon>
              </DiaryName>
            </>
          )}
          <Profile>
            <User>
              <UserIcon width={80} height={80} />
              <p className="userName">{user?.nickname}</p>
            </User>
            <HandshakeIcon />
            <Mate>
              <UserIcon width={80} height={80} />
              <p className="mateName">{friend?.toUserNickname}</p>
            </Mate>
          </Profile>
          <Dday>
            <p>
              <BoldText>{friend?.toUserNickname}</BoldText>와 일기를 공유한 지 <BoldText>{day}</BoldText>일
            </p>
            <p>앞으로 더 많은 일기를 기록하여 서로의 감정을 공유해보아요~</p>
          </Dday>
        </div>
        <DisconnectA onClick={() => setIsDisconnectOpen(true)}>연결 끊기</DisconnectA>
        <FriendDisconnectModal />
      </ContentArea>
    </>
  );
};

const ContentArea = styled(Container)`
  display: grid;
  position: relative;
  grid-template-areas: "info";
  width: 100%;
  height: 70vh;
  padding: 1.5rem 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    height: 80%;
  }
`;
const EditButton = styled.button`
  position: absolute;
  padding: 0;
  right: 0;
  border-radius: 6px;
  width: 30px;
  height: 30px;
`;

const DiaryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  p {
    font-size: ${props => props.theme.fontSize.textLg};
    color: ${props => props.theme.color.fontMain};
  }
`;
const Profile = styled.div`
  display: flex;
  height: 25vh;
  align-items: center;
  gap: 20px;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 120px;
  font-weight: 600;

  @media screen and (max-width: 850px) {
    width: 80px;
  }
`;
const Mate = styled(User)``;
const Dday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 0.03em;
  margin-top: 2vh;
  gap: 20px;
  p {
    margin: 0 1em;
  }
  @media screen and (max-width: 850px) {
    p {
      font-size: ${props => props.theme.fontSize.textSm};
      margin: 0 2em;
      text-align: center;
    }
  }
`;
const ErrorMessage = styled.p`
  font-size: ${fontSize.textXs};
  margin-top: 5px;
`;

const DisconnectA = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
  text-decoration: underline;
  background-color: ${props => props.theme.color.nav};
  color: ${props => props.theme.color.fontSub};
  font-size: ${fontSize.textSm};
  &:hover {
    color: ${props => props.theme.color.fontMain};
  }
`;
const Form = styled.form`
  display: flex;
  position: relative;
`;
const EditIcon = styled.div`
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;
const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 6px;
  padding-right: 40px;
`;
const BoldText = styled.span`
  font-size: ${props => props.theme.fontSize.textMd};
  color: ${props => props.theme.color.fontPoint};
  font-weight: 500;
  margin: 0 3px;
`;

// export default React.memo(AfterConnect);
export default AfterConnect;
