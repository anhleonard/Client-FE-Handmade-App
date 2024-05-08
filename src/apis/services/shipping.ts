import axios from "axios";
import { headerUrl } from "./authentication";

const headers = {
  token: "aa9e9285-0d56-11ef-b1d4-92b443b7a897",
};

export const getProvinces = async () => {
  return await axios
    .get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};

export const getDistricts = async (provinceId: number) => {
  return await axios
    .get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};

export const getWards = async (districtId: number) => {
  return await axios
    .get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        headers,
      }
    )
    .then((res) => res.data);
};
