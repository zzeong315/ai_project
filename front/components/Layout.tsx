import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector, userAtom } from "../recoil/user";
import AfterNavbar from "./nav/AfterNavbar";
import AlarmModal from "./modal/AlarmModal";
import BeforeNavBar from "./nav/BeforeNavbar";
import SurveyModal from "./page/mypage/modal/SurveyModal";

export interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const Layout = ({ children, darkMode, setDarkMode }: LayoutProps) => {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  return (
    <>
      {isLoginState && (
        <LayoutWrapper>
          <AfterNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div>{children}</div>
          <AlarmModal />
          {user && user?.isFirstLogin === 0 && <SurveyModal />}
        </LayoutWrapper>
      )}
      {isLoginState || (
        <>
          <BeforeNavBar />
          <div>{children}</div>
        </>
      )}
    </>
  );
};

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 720px;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
  }
`;

export default Layout;
