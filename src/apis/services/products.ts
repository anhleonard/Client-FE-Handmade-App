import axios from "axios";
import { headerUrl } from "./authentication";
import { UpdateFavouriteProductsValues } from "../types";

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

export const getFavouriteProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/favourite-products`, null, config)
    .then((res) => res.data);
};

export const updateFavouriteProducts = async (
  update: UpdateFavouriteProductsValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/products/update-favourite-products`, update, config)
    .then((res) => res.data);
};
