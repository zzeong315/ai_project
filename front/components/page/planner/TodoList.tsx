import { Container } from "@styles/layout";
import { Planner } from "@type/planner";
import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { CheckIcon } from "@components/icons/CheckIcon";

const TodoList = ({ todos }: { todos: Planner[] | undefined }) => {
  return (
    <ListContainer>
      <TitleBox>
        <CheckIcon />
        <p>계획한 일정</p>
      </TitleBox>
      {todos?.map(todo => todo.isRecommended === 0 && <TodoItem {...todo} />)}
    </ListContainer>
  );
};

const ListContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  p {
    margin-left: 0.3em;
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textMd};
  }
`;

export default TodoList;
