import { dayAtom } from "@recoil/planner";
import { formatDate } from "@services/utils/formatDate";
import usePlanQuery from "@hooks/usePlanQuery";
import { Container } from "@styles/layout";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Suggesttodo from "./Suggesttodo";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";

const TodoTemplate = () => {
  const [todos, setTodos] = useState<Planner[] | null>(null);
  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day = formatDate(recoilDay);
  const { data: planData } = usePlanQuery(day);

  useEffect(() => {
    setTodos(planData);
  }, [planData]);

  return (
    <TemplateContainer>
      <Suggesttodo plan={todos?.find(todo => todo.isRecommended === 1)} />
      <TodoList todos={todos?.filter(todo => todo.isRecommended === 0)} />
      <TodoCreate />
    </TemplateContainer>
  );
};

const TemplateContainer = styled(Container)`
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3vh 5vh;
  height: 100%;
  overflow-y: auto;
  @media screen and (max-width: 850px) {
    height: auto;
  }
`;
export default TodoTemplate;
