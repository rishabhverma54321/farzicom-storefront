import SearchPage from "Themes/views/Search/View";
import React from "react";
import Layout from "@temp/components/Layout";
import { clientSSR } from "@temp/client";
import winston from "winston";
import STSearchPage from "./content/STSearchPage";
import Head from "next/head";
import headerAndFooterQuery, { ShopMetaQuery } from "@temp/gloablQueries/queries";

const ExtractMetaSSR = React.FC<{
  shopMeta
}> = ({
  shopMeta
}) => {
  return <Head>
    <title>Search result page</title>
  </Head>
};

export async function getStaticProps(context) {
  // const logger = winston.createLogger({
  //   level: "info",
  //   format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  //   transports: [
  //     //
  //     // - Write all logs with importance level of `error` or less to `error.log`
  //     // - Write all logs with importance level of `info` or less to `combined.log`
  //     //
  //     new winston.transports.File({ filename: "error.log", level: "error" }),
  //     new winston.transports.File({ filename: "combined.log" }),
  //   ],
  // });

  try {
    const headerAndFooterData = await clientSSR.query({
      query: headerAndFooterQuery,
      fetchPolicy: "no-cache",
    });
    const shopMeta = await clientSSR.query({
      query: ShopMetaQuery,
      fetchPolicy: "no-cache",
    });

    // logger.log(
    //   "search page",
    //   JSON.stringify({
    //     headerAndFooterData,
    //     shopMeta,
    //   })
    // );

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

export default function Search({ headerAndFooterData, shopMeta }) {
  return (
    <>
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        {/* <ExtractMetaSSR shopMeta={shopMeta} /> */}
        {/* <STSearchPage /> */}
      </Layout>
    </>
  );
}
