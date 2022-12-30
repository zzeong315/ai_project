import { CloseIcon } from "@components/icons/CloseIcon";
import { isDeleteUserModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { deleteUser } from "@services/api/user";
import { removeCookie } from "@services/utils/cookies";
import { Box } from "@styles/layout";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";
import { ModalWrapper, ModalContainer, Overlay, Cancel, AgreeButton, DenyButton } from "@styles/modal_layout";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DeleteUserModal = () => {
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useRecoilState(isDeleteUserModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const queryClient = useQueryClient();

  const handleClickDelete = () => {
    if (checked) {
      const status = deleteUser(user?.id!);
      setIsDeleteUserOpen(false);
      setUser(null);
      removeCookie("userToken");
      queryClient.clear();

      router.push("/");
    } else {
      alert("내용을 확인 후 체크해주세요.");
    }
  };
  const handleChangeCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const handleClickClose = () => {
    setIsDeleteUserOpen(false);
  };

  return (
    <AnimatePresence>
      {isDeleteUserOpen && (
        <ModalWrapper>
          <ModalContainer {...ModalVariant}>
            <Cancel onClick={handleClickClose}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            <DescArea>
              <Title>정말 탈퇴하시겠습니까?</Title>
              <Desc>
                서비스 탈퇴 시 일정 및 일기 데이터가<br></br>모두 삭제되오니 신중하게 결정해 주세요.
              </Desc>
              <Box>
                <input type="checkbox" checked={checked} onChange={handleChangeCheck} />
                <label>확인하였습니다.</label>
              </Box>
            </DescArea>
            <ButtonArea>
              <AgreeButton onClick={handleClickDelete}>탈퇴</AgreeButton>
              <DenyButton onClick={handleClickClose}>취소</DenyButton>
            </ButtonArea>
          </ModalContainer>
          <Overlay {...OverlayVariant} onClick={handleClickClose} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
  margin-bottom: 0.5rem;
`;

const Desc = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  margin-bottom: 1rem;
  line-height: 20px;
  font-weight: 600;
`;

const DescArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  color: ${props => props.theme.color.fontMain};
  input {
    margin: 0.1em 0.5em 0 0;
    background-color: ${props => props.theme.color.button};
  }
  label {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;

const ButtonArea = styled.div``;

export default DeleteUserModal;
