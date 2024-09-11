import "@src/styles/index.scss";
import { SaleorProvider } from "@saleor/sdk";
import NextQueryParamProvider from "next-query-params";
import {
  OverlayProvider,
  OverlayManager,
  OverlayProvider2,
  OverlayManager2,
} from "@components/templates";
import type { AppProps } from "next/app";
import { client, saleorClient } from "@src/client";
import { ApolloProvider } from "react-apollo";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import React from "react";
import { defaultTheme, GlobalStyle } from "Themes/globalStyles";
import ErrorBoundary from "./ErrorBoundary";

export const ShopMetaContext = React.createContext({} as any);

export default function App({ Component, pageProps }: AppProps) {
  console.log("plix-client", client);
  return (
    <ErrorBoundary>
      <ShopMetaContext.Provider
        value={pageProps?.shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <IntlProvider locale="en">
          <ThemeProvider theme={defaultTheme}>
            <SaleorProvider client={saleorClient}>
              <ApolloProvider client={client}>
                <OverlayProvider2>
                  <OverlayProvider>
                    <GlobalStyle />
                    {/* <NextQueryParamProvider> */}
                    <Component {...pageProps} />
                    {/* </NextQueryParamProvider> */}
                    <OverlayManager />
                    <OverlayManager2 />
                  </OverlayProvider>
                </OverlayProvider2>
              </ApolloProvider>
            </SaleorProvider>
          </ThemeProvider>
        </IntlProvider>
      </ShopMetaContext.Provider>
    </ErrorBoundary>
  );
}
