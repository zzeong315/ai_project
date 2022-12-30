import { MonthPlan } from "@type/planner";
import { axiosInstance } from "./axiosInstance";

//한달의 감정 (사용자)
export const getMonthEmotion = async ({ nowYear, nowMonth }: MonthPlan) => {
  try {
    const { data } = await axiosInstance.get(`diary/emotions?year=${nowYear}&month=${nowMonth}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//한달의 감정 (친구)
export const getPartnerMonthEmotion = async ({ nowYear, nowMonth }: MonthPlan) => {
  try {
    const { data } = await axiosInstance.get(`diary/friend/emotions?year=${nowYear}&month=${nowMonth}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
