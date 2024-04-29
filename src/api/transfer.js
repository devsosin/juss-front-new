
import { axiosClient } from "../utils/axios";

export const transferMoney = async ({ token, body }) => {
  const data = axiosClient({
    url: `/transfer`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ...body },
  }).then((resp) => resp?.data?.transactions);
  return data;
};