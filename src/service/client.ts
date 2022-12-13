import axios from "axios";

export const createAxiosClient = (baseURL: string, apiKey: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: apiKey,
    },
    timeout: 1000,
  });
};
