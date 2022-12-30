import styled from "styled-components";
import React from "react";

import { useRecoilState } from "recoil";
import { mypageState } from "@recoil/mypage";

const MyPageTab = () => {
  const [pageState, setPageState] = useRecoilState(mypageState);

  return (
    <Tab>
      <TapTitle className={pageState === "mypage" ? "clicked" : ""} onClick={() => setPageState("mypage")}>
        내 정보
      </TapTitle>

      <hr></hr>
      <TapTitle className={pageState === "connect" ? "clicked" : ""} onClick={() => setPageState("connect")}>
        연결 관리
      </TapTitle>
    </Tab>
  );
};

const Tab = styled.div`
  display: flex;
  justify-content: center;

  width: 300px;

  hr {
    border-top: 1px solid ${props => props.theme.color.fontMain};
  }
`;

const TapTitle = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  margin: 0.5rem 0.5rem;
  color: ${props => props.theme.color.fontSub};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.color.fontMain};
  }
  &.clicked {
    color: ${props => props.theme.color.fontMain};
  }
`;

export default MyPageTab;
