import { createSaleorClient } from "@saleor/sdk";
import { apiUrl, apiUrlSSR, restApiUrl } from "@temp/constants";
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const saleorClient = createSaleorClient({
  apiUrl,
  channel: "default-channel",
  opts: {},
  restApiUrl,
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
  cache: new InMemoryCache({ addTypename: false }),
});

export const clientSSR = new ApolloClient({
  link: authLink.concat(httpLinkSSR),
  cache: new InMemoryCache({ addTypename: true }),
});
