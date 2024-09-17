import { ShopMetaQuery } from "@components/organisms/AddToCartSectionWow/queries";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { useAuthState } from "@saleor/sdk";
import { clientSSR } from "@temp/clients";
import Layout from "@temp/components/Layout";
import { getMetadataValue, parseJson } from "@utils/misc";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import winston from "winston";
import { headerAndFooterQuery } from "../queries";
import MainLogin from "./CustomLogin/MainLogin";
import Head from "next/head";

const ExtractMetaSSR = React.FC<{
  shopMeta
}> = ({
  shopMeta
}) => {
  return <Head>
    <title>Login Page</title>
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
      "login page",
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

const NextLoginPage = ({ headerAndFooterData, shopMeta }) => {
  const { authenticated, authenticating } = useAuthState();
  const [guestUser, setGuestUser] = useState(false)
  const history = useCustomHistory();

  useEffect(() => {
    if (authenticated && !authenticating && !guestUser) {
      history.push("/");
    }else{
      setGuestUser(true)
    }
  }, [authenticated]);

  const shopMetadata = shopMeta?.data.shopmeta.edges[0].node.metadata;
  const otplessShopMeta =
    shopMetadata &&
    getMetadataValue(shopMetadata, "otpless") &&
    parseJson(getMetadataValue(shopMetadata, "otpless"));
  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      <Head>
        {otplessShopMeta?.enable && (
          <script type="text/javascript" src="https://otpless.com/auth.js" />
        )}
      </Head>
      <ExtractMetaSSR shopMeta={shopMeta} />
      <MainLogin />
    </Layout>
  );
};

export default React.memo(NextLoginPage);
