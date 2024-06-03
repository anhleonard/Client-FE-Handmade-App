import axios from "axios";
import { headerUrl } from "./authentication";
import { ChangePasswordValues, UpdateUserValues } from "../types";

export const updateUser = async (
  id: number,
  variables: UpdateUserValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/users/update/${id}`, variables, config)
    .then((res) => res.data);
};

export const changePassword = async (
  variables: ChangePasswordValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/users/change-password`, variables, config)
    .then((res) => res.data);
};

export const getDefaultShipping = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${headerUrl}/shippings/default`, config)
    .then((res) => res.data);
};
