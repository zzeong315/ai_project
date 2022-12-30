import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/common_style";
import { useForm } from "react-hook-form";
import { LOGIN, UserLoginForm } from "@type/user";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Box, Container, Wrapper } from "@styles/layout";
import { requestLogin } from "../services/api/user";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/user";
import { useRouter } from "next/router";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { isFindPasswordModalAtom } from "@recoil/modal";
import FindPasswordModal from "@components/modal/FindPasswordModal";
import { kakaoInit } from "@services/utils/kakaoInit";

const Login = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);
  const setIsFindPasswordOpen = useSetRecoilState(isFindPasswordModalAtom);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserLoginForm>();

  const onLoginSubmit = async (data: UserLoginForm) => {
    try {
      const { id, accessToken, email, nickname, friendCode, isFirstLogin } = await requestLogin(data);
      if (accessToken) {
        setUser({ id, email, accessToken, nickname, friendCode, isFirstLogin });
        router.replace("/");
      }
    } catch (err) {}
  };

  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const handleClickKakao = () => {
    const kakao = kakaoInit();
    kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  return (
    <LoginWrap>
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>

        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <InputBox>
            <LoginInput
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
          <InputBox>
            <LoginInput
              type="password"
              placeholder="비밀번호를 입력하세요."
              {...register("password", { required: true, minLength: { value: 4, message: "4자 이상 입력해주세요." } })}
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputBox>
          <LoginButtonBox>
            <LoginButton>로그인</LoginButton>
          </LoginButtonBox>
        </form>
        <SocialContainer>
          <p>SNS 간편로그인 </p>
          <SocialBox>
            <IconBox social={LOGIN.KAKAO} onClick={handleClickKakao}>
              <Image src={"/icon/kakao_icon.svg"} width={20} height={20} alt="kakao" />
            </IconBox>
          </SocialBox>
        </SocialContainer>
        <EtcBox>
          <EtcTextBox>
            <Link href="/join">
              <a>회원가입</a>
            </Link>
          </EtcTextBox>
          <EtcTextBox onClick={() => setIsFindPasswordOpen(true)}>비밀번호 찾기</EtcTextBox>
        </EtcBox>
        <FindPasswordModal />
      </LoginContainer>
    </LoginWrap>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

export default Login;

const LoginWrap = styled(Wrapper)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.background};
`;
const LoginTitle = styled.h2`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textXl};
  height: 50px;
  margin-bottom: 20px;

  @media screen and (max-width: 850px) {
    font-size: 24px;
  }
`;

const LoginContainer = styled(Container)`
  width: 500px;
  background-color: ${props => props.theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 850px) {
    width: 370px;
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

const LoginInput = styled.input`
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
const LoginButton = styled.button`
  margin-top: 20px;
  width: 500px;
  height: 50px;

  @media screen and (max-width: 850px) {
    width: 350px;
  }
`;
const LoginButtonBox = styled(Box)`
  width: 100%;
`;
const SocialContainer = styled(Container)`
  width: 100%;
  padding: 10px 10px;
  margin-top: 20px;
  background-color: ${props => props.theme.color.background};
  justify-content: space-between;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${props => props.theme.color.border};

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
