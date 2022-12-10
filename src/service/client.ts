import axios from "axios";

export const createAxiosClient = (baseURL: string, apiKey: string) =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: apiKey,
    },
    timeout: 1000,
  });
