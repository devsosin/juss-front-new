import { axiosClient } from "../utils/axios";

export const getAccounts = async ({ token, isShow }) => {
  const data = axiosClient
    .get(`/accounts` + (isShow !== undefined ? "?isShow=" + isShow : ""), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.accounts);
  return data;
};

export const getAccount = async ({ token, accountId }) => {
  const data = axiosClient
    .get(`/account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data);
  return data;
};

export const getRecents = async ({ token, type }) => {
  const data = axiosClient
    .get(`/recent?type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => resp?.data?.accounts);
  return data;
};

export const toggleFavorite = async ({ token, id }) => {
  const data = axiosClient({
    url: `/favorite/${id}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp);
  return data;
};
