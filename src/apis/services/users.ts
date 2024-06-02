import axios from "axios";
import { headerUrl } from "./authentication";
import { UpdateUserValues } from "../types";

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
