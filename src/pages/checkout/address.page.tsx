import { clientSSR } from "@temp/client";
import React from "react";
import winston from "winston";
import Head from "next/head";
import { getMetadataValue, parseJson } from "@utils/misc";
import { headerAndFooterQuery, ShopMetaQuery } from "../queries";
import MainEntryCheckout from "./CustomCheckouts/MainEntryCheckout";



const ExtractMetaSSR = React.FC<{
  shopMeta
}> = ({
  shopMeta
}) => {
  return <Head>
    <title>Checkout Page</title>
  </Head>
};

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
      "category page",
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

const NextCheckoutPage = ({ headerAndFooterData, shopMeta }) => {
  const shopMetadata = shopMeta?.data.shopmeta.edges[0].node.metadata;
  const otplessShopMeta =
    shopMetadata &&
    getMetadataValue(shopMetadata, "otpless") &&
    parseJson(getMetadataValue(shopMetadata, "otpless"));
  return (
    <>
      <Head>
        {otplessShopMeta?.enable && (
          <script type="text/javascript" src="https://otpless.com/auth.js" />
        )}
      </Head>
      <ExtractMetaSSR shopMeta={shopMeta} />
      <MainEntryCheckout
      headerAndFooterData={headerAndFooterData}
      shopMeta={shopMeta}
    />
    </>
    
  );
};

export default React.memo(NextCheckoutPage);
