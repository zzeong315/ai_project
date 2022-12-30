import { useEffect } from "react";
import styled from "styled-components";
import { Wrapper } from "../styles/layout";
import MyInfo from "@components/page/mypage/MyInfo";
import MyPageTab from "@components/page/mypage/MyPageTab";
import EditConnection from "@components/page/mypage/EditConnection";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";
import { useRecoilState, useRecoilValue } from "recoil";
import { mypageState } from "@recoil/mypage";

const Mypage = () => {
  const [pageState, setPageState] = useRecoilState(mypageState);

  return (
    <MypageArea>
      <div className="tab">
        <MyPageTab />
      </div>
      <div className="main">
        {pageState === "mypage" && <MyInfo />}
        {pageState === "connect" && <EditConnection />}
      </div>
    </MypageArea>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const MypageArea = styled(Wrapper)`
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 10% 80% 10%;

  grid-template-areas:
    " .  tab  . "
    " .  main . ";

  align-content: center;

  .tab {
    grid-area: tab;
    align-self: center;
    justify-self: center;
  }

  .main {
    grid-area: main;
    align-self: center;

    width: 100%;
    height: 100%;
  }
`;

export default Mypage;
