import axios from "axios";

export const isProduction = process.env.NODE_ENV === "production";
export const serverEndPoint = process.env.REACT_APP_API_ROOT;

const axiosClient = axios.create({
  baseURL: serverEndPoint,
  // withCredentials: true,
});

const resInterceptor = (res) => {
  console.log(res);
  return res;
};

const reqInterceptor = (config) => {
  return config;
};

const errInterceptor = (error) => {
  if (error.response?.status === 500) {
    // 토큰 삭제 후 홈 화면으로 이동
    localStorage.removeItem("jwt-token");
    window.location.href = "/start";
    return;
  }
  return Promise.reject(error); // 에러를 계속 전파하도록 처리
};

axiosClient.interceptors.request.use(reqInterceptor, errInterceptor);
axiosClient.interceptors.response.use(resInterceptor, errInterceptor);

export { axiosClient };
