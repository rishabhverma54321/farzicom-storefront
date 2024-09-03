import "@src/styles/globals.css";
import { SaleorProvider } from "@saleor/sdk";
import type { AppProps } from "next/app";
import { saleorClient } from "@src/pages/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SaleorProvider client={saleorClient}>
      <>
        <Component {...pageProps} />{" "}
      </>
    </SaleorProvider>
  );
}
