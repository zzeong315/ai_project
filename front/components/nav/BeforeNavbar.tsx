import Link from "next/link";
import styled from "styled-components";
import { LogoBlackIcon } from "../icons/LogoIcon";

const BeforeNavBar = () => {
  return (
    <Header>
      <LogoBlackIcon />
      <Link href="/login">
        <button>서비스 이용하러 가기</button>
      </Link>
    </Header>
  );
};

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 999;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: ${props => props.theme.fontSize.textLg};

  button {
    height: 70%;
    box-shadow: none;

    @media screen and (max-width: 850px) {
      font-size: ${props => props.theme.fontSize.textMain};
      height: 2.5em;
      width: 11em;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
`;

export default BeforeNavBar;
