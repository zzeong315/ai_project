import Calendar from "@components/page/planner/Calendar";
import TodoTemplate from "@components/page/planner/TodoTemplate";
import { GetServerSidePropsContext } from "next";
import styled from "styled-components";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { Container, Wrapper } from "../styles/layout";

const Planner = () => {
  return (
    <PlannerWrapper>
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
      <TodoContainer>
        <TodoTemplate />
      </TodoContainer>
    </PlannerWrapper>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const PlannerWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 60% 35%;
  gap: 15px;
  @media screen and (max-width: 850px) {
    display: flex;
    height: auto;
    flex-direction: column;
  }
`;

const CalendarContainer = styled(Container)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 95vh;
  width: 100%;
  @media screen and (max-width: 850px) {
    margin-top: 30px;
    width: 90%;
  }
`;

const TodoContainer = styled(CalendarContainer)`
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  @media screen and (max-width: 850px) {
    margin-bottom: 30px;
    width: 90%;
  }
`;

export default Planner;
