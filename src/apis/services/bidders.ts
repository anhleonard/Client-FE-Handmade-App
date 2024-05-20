import axios from "axios";
import { headerUrl } from "./authentication";

export const updateBidder = async (
  id: number,
  variables: any,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update-bidder/${id}`, variables, config)
    .then((res) => res.data);
};
