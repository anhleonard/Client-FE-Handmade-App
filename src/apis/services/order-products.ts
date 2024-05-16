import axios from "axios";
import { headerUrl } from "./authentication";
import { OrderProductValues, UpdateOrderProductValues } from "../types";

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

export const updatedOrderProduct = async (
  id: number,
  variables: UpdateOrderProductValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .put(`${headerUrl}/order-products/update/${id}`, variables, config)
    .then((res) => res.data);
};

export const deleteOrderProduct = async (id: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .delete(`${headerUrl}/order-products/delete/${id}`, config)
    .then((res) => res.data);
};

export const selectedOrderProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(`${headerUrl}/order-products/selected-order-products/`, null, config)
    .then((res) => res.data);
};
