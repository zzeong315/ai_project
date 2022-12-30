import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../styles/common_style";
import { Box } from "@styles/layout";
import { AgreeButton, Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { CloseIcon } from "../icons/CloseIcon";
import { useRecoilState } from "recoil";
import { isFindPasswordModalAtom } from "@recoil/modal";
import { FindUserPassword } from "@services/api/user";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";
import { AnimatePresence } from "framer-motion";

export interface FindPasswordFormValue {
  email: string;
}

const FindPasswordModal = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useRecoilState(isFindPasswordModalAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValue>();

  const findPwSubmit = async (data: FindPasswordFormValue) => {
    FindUserPassword(data).then(status => {
      if (status === 201) {
        setIsEmailSent(true);
      } else {
        alert("올바른 이메일인지 확인해주세요.");
      }
    });
  };

  return (
    <AnimatePresence>
      {isFindPasswordOpen && (
        <ModalWrapper>
          <ModalContainer height="300px" {...ModalVariant}>
            <Cancel onClick={() => setIsFindPasswordOpen(false)}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            {isEmailSent ? (
              <CheckDesc>
                <p>
                  메일로 임시 비밀번호를 발송했습니다.
                  <br></br>
                  확인 후 로그인해 주세요.
                </p>
                <AgreeButton onClick={() => setIsFindPasswordOpen(false)}>
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </AgreeButton>
              </CheckDesc>
            ) : (
              <>
                <FindTitle>비밀번호 찾기</FindTitle>
                <FindDesc>가입할 때 입력하신 이메일로 임시 비밀번호를 발송해 드립니다.</FindDesc>
                <EmailForm onSubmit={handleSubmit(findPwSubmit)}>
                  <InputBox>
                    <EmailInput
                      placeholder="이메일을 입력하세요."
                      {...register("email", {
                        required: true,
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "잘못된 이메일 형식입니다.",
                        },
                      })}
                    />
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  </InputBox>
                  <button type="submit">비밀번호 찾기</button>
                </EmailForm>
              </>
            )}
          </ModalContainer>
          <Overlay {...OverlayVariant} onClick={() => setIsFindPasswordOpen(false)} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default FindPasswordModal;

const FindTitle = styled.h2`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textLg};
  margin: 1em;
  font-weight: 600;
`;

const FindDesc = styled.p`
  color: ${props => props.theme.color.fontSub};
  font-size: ${props => props.theme.fontSize.textSm};
  margin-bottom: 2em;
  font-weight: 600;
  @media screen and (max-width: 850px) {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: center;
  margin: 0.3em;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5em;
`;

const EmailInput = styled.input`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 0.5em;
  width: 70%;
  border: none;
  border: 1px solid ${props => props.theme.color.border};
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  width: 100%;
`;

const CheckDesc = styled.div`
  height: 100%;
  margin-top: 3.5em;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 2em;
  }
`;
