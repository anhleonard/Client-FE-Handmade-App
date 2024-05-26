import axios from "axios";
import { CreatePaymentValues } from "../types";
import { headerUrl } from "./authentication";

export const createPayment = async (
  variables: CreatePaymentValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(`${headerUrl}/payment`, variables, config)
    .then((res) => res.data);
};

export const checkingPayment = async (apptransid: string) => {
  return await axios
    .get(`${headerUrl}/payment/check-order-status/${apptransid}`)
    .then((res) => res.data);
};
