import axios from "axios";
import { headerUrl } from "./authentication";
import { OrderStatusValues, OrderValues } from "../types";

export const createOrder = async (variables: OrderValues, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(`${headerUrl}/orders/create`, variables, config)
    .then((res) => res.data);
};

export const ordersByStatus = async (
  variables: OrderStatusValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const values = variables?.status ? variables : null;

  return await axios
    .post(`${headerUrl}/orders/client-orders`, values, config)
    .then((res) => res.data);
};
