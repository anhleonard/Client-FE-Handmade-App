import axios from "axios";
import { headerUrl } from "./authentication";

export const getProducts = async (query?: any) => {
  const params = new URLSearchParams(query).toString();
  return await axios
    .get(`${headerUrl}/products/filter?${params}`)
    .then((res) => res.data);
};

export const singleProduct = async (productId: number) => {
  return await axios
    .get(`${headerUrl}/products/${productId}`)
    .then((res) => res.data);
};
