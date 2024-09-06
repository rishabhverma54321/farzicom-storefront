import "@src/styles/index.scss";
import { SaleorProvider } from "@saleor/sdk";
import type { AppProps } from "next/app";
import { saleorClient } from "@src/client";
import { IntlProvider } from "react-intl";
import React from "react";

export const ShopMetaContext = React.createContext({} as any);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShopMetaContext.Provider
      value={pageProps?.shopMeta?.data.shopmeta.edges[0].node.metadata}
    >
      <IntlProvider locale="en">
      <SaleorProvider client={saleorClient}>
        <>
          <Component {...pageProps} />{" "}
        </>
      </SaleorProvider>
      </IntlProvider>
    </ShopMetaContext.Provider>
  );
}
