import axios from "axios";

export const datoApi = axios.create({
  baseURL: "https://graphql.datocms.com",
  headers: {
    Authorization: process.env.DATOCMS_READ_API_TOKEN,
  },
});
