import axios from "axios";
import { headerUrl } from "./authentication";

const headers = {
  token: "bebd3fbf-2c85-11ef-b33d-56f88582bd22",
};

export const getProvinces = async () => {
  return await axios
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};

export const getDistricts = async (provinceId: number) => {
  return await axios
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};

export const getWards = async (districtId: number) => {
  return await axios
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};

export const createShipping = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/shippings/create`, variables, config)
    .then((res) => res.data);
};

export const getShippingByUserId = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/shippings`, variables, config)
    .then((res) => res.data);
};

export const updateShipping = async (
  shippingId: number,
  variables: any,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/shippings/update/${shippingId}`, variables, config)
    .then((res) => res.data);
};

export const getSingleShipping = async (shippingId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${headerUrl}/shippings/${shippingId}`, config)
    .then((res) => res.data);
};
