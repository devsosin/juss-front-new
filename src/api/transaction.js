import { axiosClient } from "../utils/axios";

export const getTransactions = async ({ token, accountId }) => {
  const data = axiosClient
    .get(`/transaction/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.transactions);
  return data;
};

export const getUsed = async ({ token }) => {
  const data = axiosClient
    .get(`/used`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.amount);
  return data;
};

export const getTopay = async ({ token }) => {
  const data = axiosClient
    .get(`/topay`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.topay);
  return data;
};