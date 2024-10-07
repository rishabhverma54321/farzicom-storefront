import React, { useEffect, useRef, useState } from "react";
import { useAuthState, useCheckoutState } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { clientSSR } from "@temp/client";
import Layout from "@temp/components/Layout";
import AccountSectionNext from "@components/farzicom-ui-kit/AccountSectionNext";
import winston from "winston";
import { useRouter } from "next/router";
import { getMetadataValue, parseJson, kwikpassEvent } from "@utils/misc";
import OrderDetail from "./OrderDetail";
import styles from "./index.module.scss";
import UserInfo from "@components/farzicom-ui-kit/AccountSectionNext/UserInfo";
import { ShopMetaContext } from "../_app.page";
import headerAndFooterQuery, {
  ShopMetaQuery,
} from "@temp/gloablQueries/queries";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
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

const AccuntInfo = ({
  targetRef,
  closeHandler,
  setshowLogoutpopup,
  showLogoutpopup,
}) => {
  return (
    <>
      <UserInfo />
    </>
  );
};

export default function OrderHistoryPage({ headerAndFooterData, shopMeta }) {
  const { authenticated, authenticating } = useAuthState();
  const history = useCustomHistory();
  const [showLogoutpopup, setshowLogoutpopup] = useState(false);

  const targetRef = useRef(null);
  const closeHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (targetRef.current && !targetRef.current.contains(event.target)) {
      setshowLogoutpopup(false);
    }
  };
  const shopmetadata = React.useContext(ShopMetaContext);
  const kwikpass_config =
    shopmetadata &&
    getMetadataValue(shopmetadata, "kwikpass_config") &&
    parseJson(getMetadataValue(shopmetadata, "kwikpass_config"));
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

  const router = useRouter();
  const { slug } = router.query;
  console.log("router.query", router.query);
  const { checkout } = useCheckoutState();
  // for kwikpass event trigger
  useEffect(() => {
    const kwikpassType = "other";
    const kwikpassData = {
      cart_id: checkout?.id,
    };
    kwikpassEvent(kwikpassType, kwikpassData);
  }, []);
  if (authenticated && slug) {
    return (
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        <>
          <AccuntInfo
            targetRef={targetRef}
            closeHandler={(e) => closeHandler(e)}
            setshowLogoutpopup={setshowLogoutpopup}
            showLogoutpopup={showLogoutpopup}
          />
          <OrderDetail order_token={slug} />
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
