import axios from "axios";
import { GraphQLClient } from "graphql-request";

export const datoApi = axios.create({
  baseURL: "https://graphql.datocms.com",
  headers: {
    Authorization: `Bearer ${process.env.DATOCMS_READ_API_TOKEN}`,
  },
});

export function getAllComunities({ query, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_READ_API_TOKEN}`,
    },
  });

  return client.request(query);
}
