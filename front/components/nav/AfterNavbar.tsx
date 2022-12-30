import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Box, Container } from "../../styles/layout";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/user";
import { removeCookie } from "@services/utils/cookies";
import { LogoBlackIcon, LogoWhiteIcon } from "../icons/LogoIcon";
import { AlarmIcon } from "../icons/AlarmIcon";
import { UserIcon } from "../icons/UserIcon";
import { checkRequestFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@styles/common_style";
import { isAlarmModalAtom } from "@recoil/modal";
import { ReceiveFriend } from "@type/friend";
import React, { ReactNode, useState } from "react";
import { RightarrowIcon } from "../icons/ArrowIcons";
import Home from "public/icon/home.svg";
import Mypage from "public/icon/me.svg";
import Note from "public/icon/note.svg";
import Notepad from "public/icon/notepad.svg";
import Hamburger from "public/icon/hamburger.svg";
import { Overlay } from "@styles/modal_layout";
import { CloseIcon } from "../icons/CloseIcon";

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const navMenus = ["홈", "일정관리", "교환일기", "마이페이지"];
const navLinks = ["/stamp", "/planner", "/diary", "/mypage"];

const mapMenuToIcon: { [key: string]: () => ReactNode } = {
  홈: () => <HomeIcon />,
  일정관리: () => <NotepadIcon />,
  교환일기: () => <NoteIcon />,
  마이페이지: () => <MypageIcon />,
};

const AfterNavBar = ({ darkMode, setDarkMode }: LayoutProps) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const setIsAlarmOpen = useSetRecoilState<boolean>(isAlarmModalAtom);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const { data: receiveFriends } = useQuery<ReceiveFriend[]>(["friend", "list"], () => checkRequestFriend("receive"));

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };
  const handleAlarmClick = () => {
    setIsOpenMenu(false);
    setIsAlarmOpen(true);
  };
  const onClickLogout = async () => {
    const result = confirm("로그아웃 하시겠어요?");
    if (result) {
      setUser(null);
      removeCookie("userToken");
      router.push("/");
    }
  };
  return (
    <NavContainer>
      <Nav open={isOpenMenu}>
        <LogoBox>{darkMode ? <LogoWhiteIcon height={73} /> : <LogoBlackIcon height={73} />}</LogoBox>
        <UserBox>
          <AlarmButton onClick={handleAlarmClick}>
            <AlarmIcon width={18} height={18} />
            {receiveFriends && receiveFriends?.length >= 1 && (
              <AlarmNumber>
                <p>{receiveFriends.length}</p>
              </AlarmNumber>
            )}
          </AlarmButton>
          <UserIcon width={60} height={60} />
        </UserBox>
        <TextBox1>{`${user?.nickname} 님`}</TextBox1>
        <DarkModeBox>
          <SwitchBox>
            <input type="checkbox" onChange={toggleTheme} />
            <RoundSlider className="slider"></RoundSlider>
          </SwitchBox>
        </DarkModeBox>

        {/* navigation 구현 */}
        <NavLink>
          {navMenus.map((menu, index) => (
            <Link href={navLinks[index]} key={index}>
              <LinkButton
                className={router.pathname === navLinks[index] ? "active" : ""}
                onClick={() => setIsOpenMenu(false)}
              >
                <IconBox>{mapMenuToIcon[menu]()}</IconBox>
                <TextBox>
                  <a>{menu}</a>
                </TextBox>
                {router.pathname === navLinks[index] ? (
                  <ArrowBox>
                    <RightarrowIcon color={"#5C38FF"} />
                  </ArrowBox>
                ) : (
                  ""
                )}
              </LinkButton>
            </Link>
          ))}
        </NavLink>
        <a onClick={onClickLogout}>로그아웃</a>
      </Nav>
      <TopNav>
        <IconBox onClick={() => setIsOpenMenu(cur => !cur)}>
          {isOpenMenu ? <CloseIcon width={23} height={23} /> : <HamburgerIcon />}
        </IconBox>
        <Link href="/">
          <LogoBox>{darkMode ? <LogoWhiteIcon height={50} /> : <LogoBlackIcon height={50} />}</LogoBox>
        </Link>
      </TopNav>
      {isOpenMenu && <Overlay />}
    </NavContainer>
  );
};

const NavContainer = styled.div`
  width: 240px;
  height: 100vh;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;
const LogoBox = styled(Box)`
  width: 100%;
  overflow: visible;
  @media screen and (max-width: 960px) {
    width: 20%;
  }
`;
const Nav = styled(Container)<{ open: boolean }>`
  position: relative;
  flex-direction: column;
  width: 240px;
  height: 100vh;
  justify-content: space-around;
  padding: 2em 0;
  margin: 0;
  border-radius: 0;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 960px) {
    display: none;

    ${props =>
      props.open &&
      css`
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 50%;
        height: 100vh;
        z-index: 200;
        /* transform: translateX(100%);
      transition: transform 0.5s ease-in-out;      */
      `}
    ${LogoBox} {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    ${props =>
      props.open &&
      css`
        width: 80%;
      `}
  }
`;
const NavLink = styled(Container)`
  flex-direction: column;
  margin: 1.5em 1em 5em 1em;
  width: 100%;
`;
const HomeIcon = styled(Home)``;
const NoteIcon = styled(Note)``;
const NotepadIcon = styled(Notepad)``;
const MypageIcon = styled(Mypage)``;

const LinkButton = styled.div`
  width: 100%;
  height: 10vh;
  border-radius: 0;
  font-size: ${props => props.theme.fontSize.textMd};
  color: ${props => props.theme.color.fontMain};
  background-color: ${props => props.theme.color.nav};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${NoteIcon}, ${HomeIcon}, ${MypageIcon}, ${NotepadIcon} {
    path {
      fill: ${props => props.theme.color.fontMain};
    }
  }
  &.active {
    justify-content: space-between;
    background-color: rgba(219, 202, 244, 0.5);
    border-radius: 0px 50px 50px 0px;
    width: 100%;
    a {
      color: ${props => props.theme.color.fontPoint};
      font-size: ${props => props.theme.fontSize.textMd};
      font-weight: bold;
    }
    ${NoteIcon}, ${HomeIcon}, ${MypageIcon}, ${NotepadIcon} {
      path {
        fill: ${props => props.theme.color.fontPoint};
      }
    }
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
  }
`;
const TextBox = styled(Box)`
  width: 90px;
`;
const UserBox = styled(Container)`
  flex-direction: column;
  width: 35%;
  margin: 1em 0 0.5em 0;
`;
const AlarmButton = styled(Box)`
  width: 100%;
  justify-content: flex-end;
  margin: 0.5em;
  cursor: pointer;
`;
const AlarmNumber = styled(Box)`
  background-color: ${props => colors.red};
  width: 1.5em;
  height: 1.5em;
  font-size: 10px;
  margin-left: -7px;
  margin-top: -12px;
  color: ${props => props.theme.color.white};
  cursor: pointer;
`;
const TextBox1 = styled(Box)`
  margin-bottom: 10px;
  font-size: ${props => props.theme.fontSize.textMain};
`;
const DarkModeBox = styled(Box)`
  overflow: visible;
`;
const SwitchBox = styled.label`
  position: relative;
  align-items: center;
  display: inline-block;
  cursor: pointer;
  width: 2.8em;
  height: 1.4em;

  input {
    content: "";
    position: absolute;
    left: 0;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 250ms linear;
  }
  input:checked + .slider {
    background-color: ${props => props.theme.color.button};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${props => props.theme.color.button};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.4em);
    -ms-transform: translateX(1.4em);
    transform: translateX(1.4em);
  }
`;
const RoundSlider = styled.span`
  border-radius: 30px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 1.1em;
    width: 1.1em;
    left: 3px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;
const IconBox = styled(Box)`
  margin: 0 1.3em 0 1.8em;
  &:hover {
    opacity: 0.8;
    scale: 1.1;
  }
`;
const ArrowBox = styled.div`
  justify-self: flex-end;
  margin-right: 1em;
`;
const HamburgerIcon = styled(Hamburger)`
  path {
    fill: ${props => props.theme.color.fontMain};
  }
`;
const TopNav = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    z-index: 200;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.color.nav};
  }
`;
export default React.memo(AfterNavBar);
// export default AfterNavBar;
