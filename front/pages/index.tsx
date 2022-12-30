import { Wrapper } from "../styles/layout";
import { useRecoilValue } from "recoil";
import { loginStateSelector } from "../recoil/user";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import About from "@components/page/about/About";
import { useRouter } from "next/router";
import { getCookie } from "@services/utils/cookies";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

const Home: NextPage = () => {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  useEffect(() => {
    if (isLoginState && getCookie("userToken")) {
      router.push("/stamp");
    } else {
      queryClient.clear();
    }
  }, [isLoginState]);

  return (
    <>
      <NewWrapper>{isLoginState || <About />}</NewWrapper>
    </>
  );
};

const NewWrapper = styled(Wrapper)`
  height: 440vh;
`;
export default Home;
