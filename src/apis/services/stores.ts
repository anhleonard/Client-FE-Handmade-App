import axios from "axios";
import { headerUrl } from "./authentication";
import { ChangeFollowerValues } from "../types";

export const singleStore = async (storeId: number) => {
  const url = `${headerUrl}/stores/${storeId}`;
  return await axios.get(url).then((res) => res.data);
};

export const filterStoreProducts = async (storeId: number, query?: any) => {
  const params = new URLSearchParams(query).toString();

  const url = `${headerUrl}/products/filter-store-products/${storeId}?${params}`;

  return await axios.get(url).then((res) => res.data);
};

export const changeFollower = async (
  variables: ChangeFollowerValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/stores/change-follower`, variables, config)
    .then((res) => res.data);
};
