import { createSaleorClient } from "@saleor/sdk";
import { apiUrl, apiUrlSSR, restApiUrl } from "@temp/constants";
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const wizzyConfig = {
  headers: {
    "x-store-id": "f7ef7722893211eea1b742010aa0000e",
    "x-store-secret": "a3f553d79c4e19d8cf166add444dfd00",
    "x-api-key":
      "ZVFmSGhXMDJteTFwUUFycjBhTGZqU3R3Q1ppcy96dWVySDNGRzg2MFNCOU1BVFlSYlRzdmdtLzhMdFlwWjY0aUM3NlFNS2xIV21ORDBWRjV5L2pWMFE9PQ==",
  },
  baseUrl: "https://api.wizzy.ai/v1",
};

export const saleorClient = createSaleorClient({
  apiUrl,
  channel: "default-channel",
  opts: {},
  restApiUrl,
  wizzyConfig,
});

const httpLink = createHttpLink({
  uri: apiUrl,
});

const httpLinkSSR = createHttpLink({
  uri: apiUrlSSR,
});

const authLink: ApolloLink = setContext(async (_, { headers }) => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const linkOptions = {
  credentials: "include",
  uri: apiUrl,
};

const uploadLink = createUploadLink(linkOptions);

const links = [authLink, uploadLink];

export const client:any = new ApolloClient({
  link: ApolloLink.from(links),
  cache: new InMemoryCache({ addTypename: true }),
});

export const clientSSR = new ApolloClient({
  link: authLink.concat(httpLinkSSR),
  cache: new InMemoryCache({ addTypename: true }),
});
