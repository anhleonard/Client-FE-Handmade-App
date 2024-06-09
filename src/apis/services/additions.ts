import axios from "axios";
import { headerUrl } from "./authentication";

export const updateAddition = async (
  additionId: number,
  variables: any,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(
      `${headerUrl}/auctions/update-addition/${additionId}`,
      variables,
      config
    )
    .then((res) => res.data);
};
