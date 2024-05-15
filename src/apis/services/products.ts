import axios from "axios";
import { headerUrl } from "./authentication";

export const getProducts = async (query?: any) => {
  return await axios
    .get(`${headerUrl}/products/filter`)
    .then((res) => res.data);
};

export const singleProduct = async (productId: number) => {
  return await axios
    .get(`${headerUrl}/products/${productId}`)
    .then((res) => res.data);
};
