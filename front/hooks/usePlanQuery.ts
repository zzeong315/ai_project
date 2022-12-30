import { useQuery } from "@tanstack/react-query";
import { getDayPlan } from "../services/api/planner";

const usePlanQuery = (date: string) => {
  const [year, month, day] = date.split("-");
  return useQuery(["plan", year, month, day], () => getDayPlan(date));
};

export default usePlanQuery;
