import axios from "axios";
import { CreateAuctionValues, CreatePaidAuction } from "../types";
import { headerUrl } from "./authentication";

export const createAuction = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create`, variables, config)
    .then((res) => res.data);
};

export const filterAuctions = async (query?: any) => {
  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/auctions/filter?${params}`;

  return await axios.get(url).then((res) => res.data);
};

export const singleAuction = async (id: number) => {
  const url = `${headerUrl}/auctions/${id}`;

  return await axios.get(url).then((res) => res.data);
};

export const allClientAuctions = async (token: string, variables: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/client-auctions`, variables, config)
    .then((res) => res.data);
};

export const updateAuction = async (
  auctionId: number,
  variables: any,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update/${auctionId}`, variables, config)
    .then((res) => res.data);
};

export const createPaidAuction = async (
  variables: CreatePaidAuction,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create-paid-auction`, variables, config)
    .then((res) => res.data);
};

export const updatePaidAuction = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update-paid-auction`, variables, config)
    .then((res) => res.data);
};

export const filterTopAuctions = async () => {
  return await axios.get(`${headerUrl}/auctions/top`).then((res) => res.data);
};
