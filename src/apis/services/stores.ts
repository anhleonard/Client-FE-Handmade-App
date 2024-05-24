import axios from "axios";
import { headerUrl } from "./authentication";

export const singleStore = async (storeId: number) => {
  const url = `${headerUrl}/stores/${storeId}`;
  return await axios.get(url).then((res) => res.data);
};

export const filterStoreProducts = async (storeId: number, query?: any) => {
  const params = new URLSearchParams(query).toString();

  const url = `${headerUrl}/products/filter-store-products/${storeId}?${params}`;

  return await axios.get(url).then((res) => res.data);
};
