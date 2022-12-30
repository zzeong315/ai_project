import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AgreeButton, Cancel, DenyButton, ModalContainer, ModalWrapper, Overlay, Title } from "@styles/modal_layout";
import { CloseIcon } from "@components/icons/CloseIcon";
import { useRecoilValue, useRecoilState } from "recoil";
import { isChangePasswordModalAtom } from "@recoil/modal";
import { Box } from "@styles/layout";
import { changePassword } from "@services/api/user";
import { userAtom } from "@recoil/user";
import { AnimatePresence } from "framer-motion";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";

interface ChangePasswordFormValue {
  currentPassword: string;
  toChangePassword: string;
  toChangePasswordConfirm: string;
}

const ChangePasswordModal = () => {
  const user = useRecoilValue(userAtom);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useRecoilState(isChangePasswordModalAtom);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValue>();

  const onSubmitHandler: SubmitHandler<ChangePasswordFormValue> = data => {
    changePassword({ id: user?.id!, oldPassword: data.currentPassword, newPassword: data.toChangePassword });
    setIsChangePasswordOpen(false);
  };

  const closeModal = () => {
    setIsChangePasswordOpen(false);
    reset();
  };

  return (
    <AnimatePresence>
      {isChangePasswordOpen && (
        <ModalWrapper>
          <InfoModalContainer {...ModalVariant}>
            <Cancel onClick={closeModal}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            <Title>비밀번호 변경</Title>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <FormBox>
                <label>현재 비밀번호</label>
                <InputArea>
                  <input
                    {...register("currentPassword", { required: "현재 비밀번호를 입력해 주세요." })}
                    type="password"
                  ></input>
                  <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
                </InputArea>
                <label>변경할 비밀번호</label>
                <InputArea>
                  <input
                    {...register("toChangePassword", {
                      required: "변경할 비밀번호를 입력해 주세요.",
                      minLength: { value: 8, message: "8자 이상 입력해 주세요." },
                    })}
                    type="password"
                  ></input>
                  <ErrorMessage>{errors?.toChangePassword?.message}</ErrorMessage>
                </InputArea>
                <label>변경할 비밀번호 확인</label>
                <InputArea>
                  <input
                    {...register("toChangePasswordConfirm", {
                      required: "변경할 비밀번호를 한 번 더 입력해 주세요.",
                      validate: value => watch("toChangePassword") === value || "변경할 비밀번호가 일치하지 않습니다.",
                    })}
                    type="password"
                  ></input>
                  <ErrorMessage>{errors?.toChangePasswordConfirm?.message}</ErrorMessage>
                </InputArea>
              </FormBox>
              <ButtonArea>
                <AgreeButton type="submit">변경</AgreeButton>
                <DenyButton onClick={closeModal}>취소</DenyButton>
              </ButtonArea>
            </form>
          </InfoModalContainer>
          <Overlay {...OverlayVariant} onClick={closeModal} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const InfoModalContainer = styled(ModalContainer)`
  display: flex;
  flex-direction: column;
  height: 450px;

  label {
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textSm};
  }

  input {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;

    width: 300px;
    height: 30px;
  }
`;
const FormBox = styled.div`
  margin-bottom: 2em;
`;
const ButtonArea = styled(Box)``;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.color.fontMain};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

export default ChangePasswordModal;
