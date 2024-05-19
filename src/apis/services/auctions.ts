import axios from "axios";
import { CreateAuctionValues } from "../types";
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

  console.log({ url });

  return await axios.get(url).then((res) => res.data);
};

export const singleAuction = async (id: number) => {
  const url = `${headerUrl}/auctions/${id}`;

  return await axios.get(url).then((res) => res.data);
};
