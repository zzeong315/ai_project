import { Box } from "@styles/layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StampTodoBox from "./StampTodoBox";
import Link from "next/link";
import { Planner } from "@type/planner";
import { formatDate } from "@services/utils/formatDate";
import usePlanQuery from "@hooks/usePlanQuery";
import StampTodoNone from "./StampTodoNone";
import { CheckIcon } from "@components/icons/CheckIcon";

const StampTodoList = () => {
  const [todos, setTodos] = useState<Planner[] | null>(null);
  const today = formatDate(new Date());
  const { data: planData } = usePlanQuery(today);

  useEffect(() => {
    setTodos(planData);
  }, [planData]);

  return (
    <StampTodoContainer>
      <HeaderBox>
        <TitleBox>
          <CheckIconBox>
            <CheckIcon />
          </CheckIconBox>
          <Title>오늘의 할일</Title>
        </TitleBox>
        {todos?.length === 0 || (
          <Link href="/planner">
            <PlannerLink>+ 더보기</PlannerLink>
          </Link>
        )}
      </HeaderBox>
      <ContentBox>
        {todos?.length === 0 ? (
          <StampTodoNone />
        ) : (
          todos?.map(todo => (
            <StampTodoBox
              key={todo.id}
              description={todo.description}
              isCompleted={todo.isCompleted}
              isRecommended={todo.isRecommended}
            />
          ))
        )}
      </ContentBox>
    </StampTodoContainer>
  );
};

const StampTodoContainer = styled.div`
  width: 90%;
  height: 85%;
  display: grid;
  grid-template-rows: 20% 80%;
`;
const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const TitleBox = styled(Box)`
  font-size: ${props => props.theme.fontSize.textLg};
  font-weight: 700;
`;
const CheckIconBox = styled(Box)`
  margin: 0.5em;
`;
const Title = styled.p``;
const PlannerLink = styled.button`
  border-radius: ${props => props.theme.borderSize.borderMd};
  font-size: ${props => props.theme.fontSize.textXs};
  background-color: ${props => props.theme.color.purpleBox};
  color: ${props => props.theme.color.fontMain};
  align-self: center;
  box-shadow: 0 2px 3px ${props => props.theme.color.dark_shadow};
`;
const ContentBox = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;
export default React.memo(StampTodoList);
