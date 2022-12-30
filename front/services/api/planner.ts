import { MonthPlan, Planner } from "@type/planner";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//전체 날짜의 일정
export const getPlans = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`planner/${userId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//지정한 날짜의 일정
export const getDayPlan = async (date: string) => {
  try {
    const { data } = await axiosInstance.get(`planner?date=${date}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//플랜생성
export const createPlan = async (planInfo: Planner) => {
  try {
    const { status } = await axiosInstance.post("planner", planInfo);
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};

//플랜 삭제
export const deletePlan = async (id: number) => {
  try {
    const { status } = await axiosInstance.delete(`planner/${id}`);
    return status;
  } catch (err) {
    console.log(err);
  }
};

//플랜수정
export const updatePlan = async (planInfo: Planner) => {
  const { id, description } = planInfo;
  try {
    const { status } = await axiosInstance.put(`planner/${id}`, { description });
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};

//플랜 완료상태 수정
export const checkPlan = async (id: number) => {
  try {
    const { status } = await axiosInstance.patch(`planner/${id}`);
    return status;
  } catch (err) {
    console.log(err);
  }
};

//전체 날짜의 일정
export const getMonthplan = async ({ nowYear, nowMonth }: MonthPlan) => {
  try {
    const { data } = await axiosInstance.get(`planner/check/month?year=${nowYear}&month=${nowMonth}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
