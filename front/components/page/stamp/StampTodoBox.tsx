import { Box } from "@styles/layout";
import { Planner } from "@type/planner";
import React from "react";
import styled from "styled-components";

const StampTodoBox = (plan: Planner) => {
  return (
    <TodoBox className={plan.isCompleted === 1 ? "finish" : ""}>
      <Text>{plan.description}</Text>
    </TodoBox>
  );
};

const Text = styled.p`
  height: 100%;
`;

const TodoBox = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  /* border: 1px solid ${props => props.theme.color.borderPoint}; */
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
  width: 95%;
  justify-content: flex-start;
  margin-bottom: 0.8em;
  padding: 0.8em 1.2em;

  &.finish {
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.grayBox};
    ${Text} {
      font-style: italic;
      text-decoration: line-through;
      color: ${props => props.theme.color.fontSub};
    }
  }
`;
export default StampTodoBox;
