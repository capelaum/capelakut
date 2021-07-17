import axios from "axios";
import { GraphQLClient } from "graphql-request";
const { SiteClient } = require("datocms-client");

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

// create SiteClient from datocms-client and create query to return all records from the community
export async function getAllComunityRecords() {
  const client = new SiteClient(process.env.DATOCMS_READ_API_TOKEN);

  const records = await client.items.all({
    "filter[type]": "comunity",
  });

  return records;
}

export async function getAllTestimonialRecords() {
  const client = new SiteClient(process.env.DATOCMS_READ_API_TOKEN);

  const records = await client.items.all({
    "filter[type]": "testimonial",
  });

  return records;
}
