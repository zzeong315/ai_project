import { Box, Container } from "@styles/layout";
import Link from "next/link";
import styled from "styled-components";

const StampTodoNone = () => {
  return (
    <NoneContainer>
      <NoneBox>
        <NoneText>오늘의 일정이 없습니다.</NoneText>
        <NoneText>추가해주세요 ! </NoneText>
      </NoneBox>
      <Link href="/planner">
        <Button>+ 일정추가</Button>
      </Link>
    </NoneContainer>
  );
};
export default StampTodoNone;

const NoneContainer = styled(Container)`
  flex-direction: column;
  width: 80%;
  height: 90%;
  background-color: ${props => props.theme.color.purpleBox};
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
`;
const NoneBox = styled(Box)`
  flex-direction: column;
  height: 30%;
`;
const NoneText = styled.p`
  color: ${props => props.theme.color.fontMain};
  &:first-child {
    margin-bottom: 5px;
  }
`;
const Button = styled.button`
  font-size: ${props => props.theme.fontSize.textSm};
`;
