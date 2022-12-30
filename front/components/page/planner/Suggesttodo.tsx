import React from "react";
import styled from "styled-components";
import { CheckIcon } from "@components/icons/CheckIcon";
import { Box, Container } from "@styles/layout";
import { Planner } from "@type/planner";
import TodoItem from "./TodoItem";

const Suggesttodo = ({ plan }: { plan: Planner | undefined }) => {
  return (
    <SuggestContainer>
      <TitleBox>
        <CheckIcon />
        <Text>추천 활동</Text>
      </TitleBox>
      <CheckBox></CheckBox>
      {plan ? <TodoItem {...plan} /> : <NoneItem>추천 일정이 없습니다.</NoneItem>}
    </SuggestContainer>
  );
};

const SuggestContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
`;

export const TitleBox = styled(Box)`
  justify-content: flex-start;
  align-items: center;
  padding: 1em 0;
  width: 100%;
`;
const Text = styled.p`
  margin-left: 0.3em;
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textMd};
`;
const CheckBox = styled(Box)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

const NoneItem = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

export default Suggesttodo;
