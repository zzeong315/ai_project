import { AnxiosIcon, HurtIcon, SadIcon } from "@components/icons/EmotionIcon";
import { Container, Wrapper } from "@styles/layout";
import Link from "next/link";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <ErrorContainer>
        <ErrorImgBox>
          <AnxiosIcon height={90} />
          <SadIcon height={100}/>
          <HurtIcon height={90} />
        </ErrorImgBox>
        <ErrorTextBox>
          <MainText>죄송합니다.</MainText>
          <MainText>현재 찾을 수 없는 페이지를 요청하셨습니다.</MainText>
          <SmallText>존재하지 않는 주소를 입력하셨거나, <br/>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</SmallText>
          <Link href='/'>
            <Button>홈으로 가기</Button>
          </Link>
        </ErrorTextBox>
      </ErrorContainer>
    </Wrapper>
  )
};

const ErrorContainer = styled(Container)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 90%;
  height: 88vh;
`;
const SmallText = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  color: ${props => props.theme.color.fontSub};
  line-height: 23px;
`;
const MainText = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
`;
const ErrorTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 3em;
  font-weight: 600;
`;
const Button = styled.button`
  margin-top: 1.5em;
`;
const ErrorImgBox = styled(ErrorTextBox)`
  gap: 20px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

export default NotFound;