import axios from "axios";
import { headerUrl } from "./authentication";
import { OrderProductValues } from "../types";

export const createOrderProduct = async (
  variables: OrderProductValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(`${headerUrl}/order-products/create`, variables, config)
    .then((res) => res.data);
};

export const orderProductsByUser = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(`${headerUrl}/order-products/`, config)
    .then((res) => res.data);
};
