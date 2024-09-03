import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { createSaleorClient } from "@saleor/sdk";
import { apiUrl, apiUrlSSR, restApiUrl } from "@src/constants";
import { setContext } from "apollo-link-context";
import createUploadLink  from "apollo-upload-client/createUploadLink.mjs";
import { ApolloLink } from "apollo-link";

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

const authLink = setContext(async (_, { headers }) => {
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

export const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache: new InMemoryCache({ addTypename: false }),
});

export const clientSSR = new ApolloClient({
  link: authLink.concat(httpLinkSSR),
  cache: new InMemoryCache({ addTypename: false }),
});
