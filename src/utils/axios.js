import axios from "axios";

export const isProduction = process.env.NODE_ENV === "production";
export const serverEndPoint = process.env.REACT_APP_API_ROOT;

export const axiosClient = axios.create({
  baseURL: serverEndPoint,
  withCredentials: true,
});
