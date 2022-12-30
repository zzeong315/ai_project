import { getCookie } from "@services/utils/cookies";
import axios from "axios";
export const BASE_URL = "http://kdt-ai5-team05.elicecoding.com:5000";
// export const BASE_URL = "http://localhost:8080/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers = config.headers ?? {};

    //요청을 보내기 전에 수행할 일
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers.Authorization = `Bearer ${getCookie("userToken")}`;
    return config;
  },
  error => {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);
