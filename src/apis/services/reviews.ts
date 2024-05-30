import axios from "axios";
import { CreateReviewValues } from "../types";
import { headerUrl } from "./authentication";

export const createReview = async (
  variables: CreateReviewValues,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/reviews/create`, variables, config)
    .then((res) => res.data);
};

export const getCreatedReview = async (query: any) => {
  const params = new URLSearchParams(query).toString();

  return await axios
    .get(`${headerUrl}/reviews/created-review?${params}`)
    .then((res) => res.data);
};
