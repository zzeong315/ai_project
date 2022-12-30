import { axiosInstance } from "./axiosInstance";

export const postDiary = async (diaryData: Object) => {
  const bodyData = JSON.stringify(diaryData);

  try {
    const { status } = await axiosInstance.post("diary", bodyData);
    return status;
  } catch (err) {
    console.log(err);
  }
};

// 월 별 다이어리 데이터 가져오기
export const getDiaries = async (month: string) => {
  try {
    const { data } = await axiosInstance.get(`diary?period=monthly&month=${month}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 특정 날짜 하루의 다이어리 가져오기
export const getDiary = async (date: string) => {
  try {
    const { data } = await axiosInstance.get(`diary?period=daily&date=${date}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
