import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import React from "react";
import styles from "./index.module.scss";
import Layout from "@temp/components/Layout";
import { clientSSR } from "@temp/client";
import winston from "winston";
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
      "404 page",
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

export default function Custom404({ headerAndFooterData, shopMeta }) {
  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.text404}>404</div>
          <div className={styles.textDescription}>
            We couldn't find the page you were looking for!
          </div>
        </div>

        <ContinueShoppingNext minHeight="100px" />
      </div>
    </Layout>
  );
}
