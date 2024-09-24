import React, { useEffect } from "react";
import { useAuthState } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { clientSSR } from "@temp/client";
import Layout from "@temp/components/Layout";
import AccountSectionNext from "@components/farzicom-ui-kit/AccountSectionNext";
import winston from "winston";
import { getMetadataValue, parseJson } from "@utils/misc";
import { ShopMetaContext } from "../_app.page";
import headerAndFooterQuery, { ShopMetaQuery } from "@temp/gloablQueries/queries";

export async function getStaticProps(context) {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });
  try {
    const headerAndFooterData = await clientSSR.query({
      query: headerAndFooterQuery,
      fetchPolicy: "no-cache",
    });
    const shopMeta = await clientSSR.query({
      query: ShopMetaQuery,
      fetchPolicy: "no-cache",
    });

    logger.log(
      "address page",
      JSON.stringify({
        headerAndFooterData,
        shopMeta,
      })
    );

    return {
      props: {
        headerAndFooterData,
        shopMeta,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);
  }
}

export default function OrderHistoryPage({ headerAndFooterData, shopMeta }) {
  const { authenticated, authenticating } = useAuthState();
  const history = useCustomHistory();

  const shopmetadata = React.useContext(ShopMetaContext);
  const kwikpass_config = shopmetadata && getMetadataValue(shopmetadata, "kwikpass_config") && parseJson(getMetadataValue(shopmetadata, "kwikpass_config"))
  
  useEffect(() => {
    if (!authenticated && !authenticating) {

      if (kwikpass_config?.enable) {
        if (typeof handleCustomLogin === "function") {
          handleCustomLogin(true);
        }
      } else {
        history.push("/page/login");
      }
    }
  }, []);

  if (authenticated) {
    return (
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        <>
          <AccountSectionNext />
        </>
      </Layout>
    );
  }
  return (
    <>
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        <div style={{ minHeight: "700px" }} />
      </Layout>
    </>
  );
}
