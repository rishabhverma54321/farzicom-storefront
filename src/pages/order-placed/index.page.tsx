import { clientSSR } from "@temp/client";
import React from "react";
import MainEntryThankyouPage from "./CustomThankyouPages/MainEntryThankyouPage";
import winston from "winston";
import Head from "next/head";
import { getScriptMeta } from "@utils/misc";
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
      "order page",
      JSON.stringify({
        headerAndFooterData: headerAndFooterData,
        shopMeta: shopMeta,
      })
    );

    return {
      props: {
        headerAndFooterData: headerAndFooterData,
        shopMeta: shopMeta,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);
  }
}

const NextThankyoupage = ({ headerAndFooterData, shopMeta }) => {
  return (
    <>
      <Head>
        {/* <script src="https://checkout.gokwik.co/integration.js" /> */}
        {getScriptMeta(
          shopMeta?.data.shopmeta.edges[0].node.metadata,
          "thankyoupage"
        )}
      </Head>
      <MainEntryThankyouPage
        headerAndFooterData={headerAndFooterData}
        shopMeta={shopMeta}
      />
    </>
  );
};

export default React.memo(NextThankyoupage);
