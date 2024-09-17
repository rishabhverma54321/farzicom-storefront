import { ShopMetaQuery } from "@components/organisms/AddToCartSectionWow/queries";
import { clientSSR } from "@temp/clients";
import Layout from "@temp/components/Layout";
import { getMetadataValue } from "@utils/misc";
import React from "react";
import winston from "winston";
import { headerAndFooterQuery } from "../queries";
import MainLogin from "./CustomLogin/MainLogin";
import MainShop from "./CustomShop/MainShop";
import {
  ShopNextProducts,
  ShopNextProductsVariables,
} from "./gqlTypes/ShopNextProducts";
import { ShopPage } from "./gqlTypes/ShopPage";
import { ShopNextProductsQuery, shopPageQuery } from "./queries";

export interface IShopNextProductsWithID {
  id: string;
  data: ShopNextProducts;
  name?: string;
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
    const shopPageData = await clientSSR.query<ShopPage, {}>({
      query: shopPageQuery,
    });

    const shopPageMetadata = shopPageData.data.page.metadata;

    const collections =
      shopPageMetadata &&
      getMetadataValue(shopPageMetadata, "collections") &&
      JSON.parse(getMetadataValue(shopPageMetadata, "collections"));

    const collectionDataArray: Array<IShopNextProductsWithID> = [];

    for (let i = 0; i < collections.length; i++) {
      try {
        const { data } = await clientSSR.query<
          ShopNextProducts,
          ShopNextProductsVariables
        >({
          query: ShopNextProductsQuery,
          variables: {
            filter: {
              collections: [collections[i]?.id],
            },
            first: 100,
          },
        });

        collectionDataArray.push({ id: collections[i]?.id, data });
      } catch (e) {
        console.log("error>>>", e);
      }
    }

    logger.log(
      "shop page",
      JSON.stringify({
        headerAndFooterData,
        shopMeta,
        collectionDataArray,
        shopPageData,
      })
    );

    return {
      props: {
        headerAndFooterData,
        shopMeta,
        collectionDataArray,
        shopPageData,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);
  }
}

const NextLoginPage = ({
  headerAndFooterData,
  shopMeta,
  collectionDataArray,
  shopPageData,
}) => {
  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      <MainShop
        collectionDataArray={collectionDataArray}
        shopPageData={shopPageData}
        shopMeta={shopMeta}
      />
      ;
    </Layout>
  );
};

export default React.memo(NextLoginPage);
