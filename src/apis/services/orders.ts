import axios from "axios";
import { headerUrl } from "./authentication";
import { CancelOrderValues, OrderStatusValues, OrderValues } from "../types";

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
  token: string,
  variables?: OrderStatusValues
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

export const singleOrder = async (orderId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${headerUrl}/orders/${orderId}`, config)
    .then((res) => res.data);
};

export const cancelOrder = async (
  orderId: number,
  variables: CancelOrderValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/cancel/${orderId}`, variables, config)
    .then((res) => res.data);
};

export const canceledOrderStoreRating = async (orderId: number) => {
  return await axios
    .get(`${headerUrl}/orders/rating/${orderId}`)
    .then((res) => res.data);
};
