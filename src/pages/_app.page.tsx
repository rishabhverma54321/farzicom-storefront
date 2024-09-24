import "@temp/styles/index.scss";
import { SaleorProvider } from "@saleor/sdk";
import NextAdapterPages from "next-query-params/pages";
import { QueryParamProvider } from "use-query-params";
import type { AppProps } from "next/app";
import { client, saleorClient } from "@temp/client";
import { ApolloProvider } from "react-apollo";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import React, { useEffect, useState } from "react";
import { defaultTheme, GlobalStyle } from "Themes/globalStyles";
import ErrorBoundary from "./ErrorBoundary";
import {
  OverlayManager,
  OverlayManager2,
  OverlayProvider,
  OverlayProvider2,
} from "@temp/components";
import Script from "next/script";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import Head from "next/head";
import { clientName, fbPixelId, gtmId } from "@temp/constants";
import GetUserStatus from "./GetUserStatus";
import { CLIENT } from "Themes/config";
import { loadScriptWithContent } from "@temp/core/utils";

export const ShopMetaContext = React.createContext({} as any);

export default function App({ Component, pageProps }: AppProps) {
  const [isClevertapScriptLoaded, setIsClevertapScriptLoaded] = useState(false);
  const shopmetadata =
    pageProps?.shopMeta?.data?.shopmeta?.edges[0].node?.metadata;
  const kwikpass_config =
    getMetadataValue(shopmetadata, "kwikpass_config") &&
    parseJson(getMetadataValue(shopmetadata, "kwikpass_config"));

  const gtmScriptContent = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${gtmId}');
  `;

  const fbScriptContent = `
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq(
    "init",
    "${fbPixelId}"
  );
  fbq("track", "PageView");
`;

  useEffect(() => {
    const clevertapScriptContent = `
  if ("${CLIENT}" === "plixlifefc") {
    var clevertap = {
      event: [],
      profile: [],
      region: "eu1",
      account: [],
      onUserLogin: [],
      notifications: [],
      privacy: [],
    };
    // clevertap.account.push({ id: "TEST-RZZ-87Z-7Z6Z" });
    clevertap.account.push({
      id: "${process.env.NEXT_PUBLIC_CLEVERTAP_PROJECT_ID}",
    });
    clevertap.profile.push({
      "Site": {
        "isMultiValue": "true"
      }
     });
    clevertap.privacy.push({ optOut: false });
    clevertap.privacy.push({ useIP: false });
    (function () {
      var wzr = document.createElement("script");
      wzr.type = "text/javascript";
      wzr.async = true;
      wzr.src =
        ("https:" == document.location.protocol
          ? "https://d2r1yp2w7bby2u.cloudfront.net"
          : "http://static.clevertap.com") + "/js/clevertap.min.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(wzr, s);
    })();
  } else {
    var clevertap = {
      event: [],
      profile: [],
      region: "in1",
      account: [],
      onUserLogin: [],
      notifications: [],
      privacy: [],
    };
    // clevertap.account.push({ id: "TEST-RZZ-87Z-7Z6Z" });
    clevertap.account.push({
      id: "${process.env.NEXT_PUBLIC_CLEVERTAP_PROJECT_ID}",
    });
    clevertap.privacy.push({ optOut: false });
    clevertap.privacy.push({ useIP: false });
    (function () {
      var wzr = document.createElement("script");
      wzr.type = "text/javascript";
      wzr.async = true;
      wzr.src =
        ("https:" == document.location.protocol
          ? "https://d2r1yp2w7bby2u.cloudfront.net"
          : "http://static.clevertap.com") + "/js/a.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(wzr, s);
    })();
  }
  `;

    window.addEventListener("load", () => {
      // loadScriptWithContent("", fbScriptContent);
      const countries = [
        "US",
        "AU",
        "SE",
        "PL",
        "NL",
        "ES",
        "IT",
        "DE",
        "FR",
        "MX",
        "CA",
      ];
      const country = sessionStorage.getItem("country");
      const shouldLoadScript = country && !countries.includes(country);
      const clevertapScript =
        shouldLoadScript && loadScriptWithContent("", clevertapScriptContent);

      clevertapScript && setIsClevertapScriptLoaded(true);
    });
  }, []);

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
                    <QueryParamProvider adapter={NextAdapterPages}>
                      <Head>
                        <link
                          rel="preconnect"
                          href="https://dev.visualwebsiteoptimizer.com"
                        />
                        <link
                          rel="preconnect"
                          href="https://static.farziengineer.co"
                        />
                        <script
                          dangerouslySetInnerHTML={{
                            __html: `
                                if(localStorage.cache_version != "1692518605000" && !localStorage.data_checkout){
                                  localStorage.setItem("cache_version","1692518605000")
                                } else if(localStorage.cache_version != "1692518605000" && localStorage.data_checkout) {
                                  localStorage.clear()
                                  localStorage.setItem("cache_version","1692518605000")
                                  location.reload();    
                                }`,
                          }}
                        />
                        <script
                          defer
                          crossOrigin="anonymous"
                          dangerouslySetInnerHTML={{
                            __html: gtmScriptContent,
                          }}
                        />
                        <script
                          defer
                          crossOrigin="anonymous"
                          dangerouslySetInnerHTML={{
                            __html: fbScriptContent,
                          }}
                        />
                        <link
                          rel="shortcut icon"
                          href={`/${clientName}/favicon.png`}
                        />
                        <meta
                          name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                        />
                        {getScriptMeta(
                          pageProps?.shopMeta?.data?.shopmeta?.edges[0].node
                            ?.metadata,
                          "global"
                        )}
                      </Head>
                      {kwikpass_config &&
                      kwikpass_config?.enable &&
                      kwikpass_config?.script ? (
                        <Script
                          id="kwikpass_config"
                          src={kwikpass_config?.script}
                          strategy="afterInteractive"
                        />
                      ) : (
                        ""
                      )}

                      <noscript>
                        <iframe
                          src="https://www.googletagmanager.com/ns.html?id=GTM-W9PXJQ7"
                          height="0"
                          width="0"
                          style={{
                            height: 0,
                            width: 0,
                            display: "none",
                            visibility: "hidden",
                          }}
                        />
                      </noscript>
                      <div className="root-component-container">
                        <GetUserStatus />
                        <Component {...pageProps} />
                        <div id="modal-root" />
                      </div>
                    </QueryParamProvider>
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
