import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/common_style";
import { useForm } from "react-hook-form";
import { LOGIN, UserJoinForm } from "@type/user";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Box, Container, Wrapper } from "@styles/layout";
import { userJoin } from "../services/api/user";
import Router from "next/router";
import withGetServerSideProps from "@hocs/withGetServerSideProps";

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserJoinForm>();

  const onSubmit = handleSubmit(data => {
    delete data.confirmPassword;
    userJoin(data).then(status => {
      if (status === 201) {
        alert("회원가입이 완료되었습니다. 가입한 이메일에 메일함을 확인해주세요.");
        Router.push("/login");
      }
    });
  });

  return (
    <JoinWrap>
      <JoinContainer>
        <JoinTitle>회원가입</JoinTitle>

        <form onSubmit={onSubmit}>
          <InputBox>
            <JoinInput
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
            />
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </InputBox>
          <InputBox>
            <JoinInput
              placeholder="닉네임"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "2자 이상 입력해주세요.",
                },
                maxLength: {
                  value: 8,
                  message: "8자 이하 입력해주세요.",
                },
              })}
            />
            <ErrorMessage>{errors?.nickname?.message}</ErrorMessage>
          </InputBox>
          <InputBox>
            <JoinInput
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: { value: 8, message: "8자 이상 입력해주세요." },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  message: "숫자,특수문자,영문 포함 8자리 이상 적어주세요.",
                },
              })}
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputBox>
          <InputBox>
            <JoinInput
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "비밀번호를 한번 더 입력해 주세요",
                validate: value => watch("password") === value || "비밀번호가 일치하지 않습니다.",
              })}
            />
            <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
          </InputBox>

          <JoinButton>회원가입</JoinButton>
        </form>
        <SocialContainer>
          <p>SNS 계정으로 가입 </p>
          <SocialBox>
            <Link href={"/"}>
              <IconBox social={LOGIN.KAKAO}>
                <Image src={"/icon/kakao_icon.svg"} width={20} height={20} alt="kakao" />
              </IconBox>
            </Link>
          </SocialBox>
        </SocialContainer>
      </JoinContainer>
    </JoinWrap>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

export default Join;

const JoinWrap = styled(Wrapper)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.background};
`;
const JoinTitle = styled.h2`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textXl};
  height: 50px;
  margin-bottom: 20px;

  @media screen and (max-width: 850px) {
    font-size: 24px;
  }
`;

const JoinContainer = styled(Container)`
  width: 500px;
  background-color: ${props => props.theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 850px) {
    width: 370px;
    align-items: center;
  }
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const JoinInput = styled.input`
  width: 500px;
  height: 50px;
  font-size: ${props => props.theme.fontSize.textMain};
  padding: 0 10px;

  border: none;
  background-color: ${props => props.theme.color.background};
  border-bottom: 1px solid ${colors.gray_300};

  &:first-child {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

const JoinButton = styled.button`
  margin-top: 20px;
  width: 500px;
  height: 50px;

  @media screen and (max-width: 850px) {
    width: 350px;
  }
`;

const SocialContainer = styled(Box)`
  width: 100%;
  padding: 10px 10px;
  margin-top: 30px;
  background-color: ${props => props.theme.color.background};
  justify-content: space-between;
  border: none;
  border-radius: 0;

  @media screen and (max-width: 850px) {
    width: 350px;
  }
`;
const SocialBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const IconBox = styled(Box)<{ social: string }>`
  width: 40px;
  height: 40px;
  background-color: ${props => (props.social === LOGIN.KAKAO ? "#FEE500" : colors.white)};
  border: ${props => (props.social === LOGIN.KAKAO ? "none" : "1px solid #7d8bda")};
  border-radius: 50%;
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
  &:hover {
    opacity: 80%;
  }
`;

const EtcBox = styled(Box)`
  margin-top: 20px;
  padding: 10px 0;
  width: 100%;

  & > * {
    text-align: center;
    cursor: pointer;
  }
`;

const EtcTextBox = styled(Box)`
  width: 50%;
  height: 35px;
  border-radius: 0;
  &:first-child {
    border-right: 1px solid ${props => props.theme.color.border};
  }
`;
