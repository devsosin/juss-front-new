import { axiosClient } from "../utils/axios";

export const startJuss = async () => {
  const data = axiosClient.post(`/start`, {}).then((resp) => resp);
  return data;
};
