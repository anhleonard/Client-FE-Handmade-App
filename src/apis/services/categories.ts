import axios from "axios";
import { headerUrl } from "./authentication";

export const allCategories = async () => {
  return await axios.get(`${headerUrl}/categories`).then((res) => res.data);
};

export const findAllCategories = async () => {
  return await axios.get(`${headerUrl}/categories/all`).then((res) => res.data);
};

export const singleCategory = async (id: number, query?: any) => {
  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/categories/filter/${id}?${params}`;

  return await axios.get(url).then((res) => res.data);
};
