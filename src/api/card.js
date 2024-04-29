import { axiosClient } from "../utils/axios";

export const getCards = async ({ token, ym }) => {
  const data = axiosClient
    .get(`/cards?ym=${ym}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.cards);
  return data;
};