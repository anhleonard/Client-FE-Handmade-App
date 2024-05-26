import axios from "axios";
import { headerUrl } from "./authentication";

export const storeCollections = async (storeId: number) => {
  const url = `${headerUrl}/collections/store/${storeId}`;

  return await axios.get(url).then((res) => res.data);
};
