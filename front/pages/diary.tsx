import styled from "styled-components";
import DiaryMain from "@components/page/diary/DiaryMain";
import DiarySidebar from "@components/page/diary/DiarySidebar";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";
import { Container, Wrapper } from "../styles/layout";
import { useGetFriend } from "@hooks/useGetFriend";
import Loading from "@components/Loading";
import { motion } from "framer-motion";
import Note from "public/icon/note.svg";
import { colors } from "@styles/common_style";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { mypageState } from "@recoil/mypage";

const Diary = () => {
  const router = useRouter();
  const { isConnected, isLoading, friendInfo } = useGetFriend();
  const [pageState, setPageState] = useRecoilState(mypageState);

  const handleClickConnect = () => {
    setPageState("connect");
    router.push("/mypage");
  };

  return !isLoading ? (
    <>
      {isConnected ? (
        <DiaryWrapper>
          <SidebarContainer>
            <DiarySidebar />
          </SidebarContainer>
          <DiaryContainer>
            <DiaryMain title={friendInfo?.title} />
          </DiaryContainer>
        </DiaryWrapper>
      ) : (
        <DiaryWrapper2>
          <UnconnectedContainer>
            <TextBox>
              <NoteIcon />
              <MainText>아직 친구와 연결되어 있지 않네요!</MainText>
              <MainText style={{ marginBottom: 12 }}>일기를 작성하시려면 먼저 친구와 연결해 주세요.</MainText>
              <SmallText>우쥬 교환일기는 친구와 일기를 공유하는 서비스로 친구와 연결 후 이용할 수 있습니다.</SmallText>
              <SmallText>{`마이페이지 > 연결 관리에서 친구와 연결을 맺고 서로의 일기를 교환해보세요.`}</SmallText>

              <Button onClick={handleClickConnect}>친구 연결하러 가기</Button>
            </TextBox>
          </UnconnectedContainer>
        </DiaryWrapper2>
      )}
    </>
  ) : (
    <>
      <Loading></Loading>
    </>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const DiaryWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 26% 70%;
  width: 100%;
  gap: 1.5%;

  @media screen and (max-width: 850px) {
    display: flex;
    height: auto;
    flex-direction: column;
  }
`;
const DiaryWrapper2 = styled(Wrapper)`
  width: 100%;
`;
const SidebarContainer = styled(Container)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 95vh;
  position: relative;

  @media screen and (max-width: 850px) {
    margin-top: 30px;
    width: 90%;
  }
`;
const DiaryContainer = styled(SidebarContainer)`
  padding: 2em 1em;
`;
const UnconnectedContainer = styled(SidebarContainer)`
  width: 90%;
  height: 88vh;
  /* background-color: ${props => props.theme.color.purpleBox}; */
`;
const NoteIcon = styled(Note)`
  width: 50px;
  height: 50px;
  margin-bottom: 1em;
  path {
    fill: ${colors.purple_300};
  }
`;
const SmallText = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  color: ${props => props.theme.color.fontSub};
  line-height: 23px;
`;
const MainText = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
  line-height: 30px;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 3em;
  font-weight: 600;
  gap: 5px;
`;
const Button = styled(motion.button)`
  width: 15em;
  height: 3em;
  margin-top: 1.5em;
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
`;
export default Diary;
