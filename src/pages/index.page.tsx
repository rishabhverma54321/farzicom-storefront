import {
  collectionWithProducts,
  homePageQueryNext,
} from "Themes/views/Home/queries";
import React, { useContext, useEffect } from "react";
import { clientSSR } from "@temp/client";
import Head from "next/head";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import {
  CUSTOM_PRODUCT_METADATA_FIELDS,
  CUSTOM_SHOPMETA_FIELDS,
  tvcBuild,
} from "Themes/config";
import winston from "winston";
import Homepage from "../themes/View";
import { CustomShopMetaQuery, headerAndFooterQuery } from "../gloablQueries/queries";
import AppHeader from "@components/templates/AppHeader";

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
    const { data, errors, networkStatus } = await clientSSR.query({
      query: homePageQueryNext,
      fetchPolicy: "no-cache",
    });
    const headerAndFooterData = await clientSSR.query({
      query: headerAndFooterQuery,
      fetchPolicy: "no-cache",
    });
    const shopMeta = await clientSSR.query({
      query: CustomShopMetaQuery,
      variables: {
        customMetaFields: CUSTOM_SHOPMETA_FIELDS,
      },
      fetchPolicy: "no-cache",
    });

    let bestSellerFirstCollectionProducts;
    if (data && data?.bestSellersNew?.edges?.length) {
      const bestSellerSection = data?.bestSellersNew?.edges[0];
      const tabSequenceWithSlug =
        getMetadataValue(
          bestSellerSection?.node.metadata,
          "tabSequenceWithSlug"
        ) &&
        parseJson(
          getMetadataValue(
            bestSellerSection?.node.metadata,
            "tabSequenceWithSlug"
          )
        );
      const fistcollectionSlug =
        tabSequenceWithSlug &&
        Array.isArray(tabSequenceWithSlug) &&
        tabSequenceWithSlug?.length
          ? tabSequenceWithSlug[0]
          : bestSellerSection.node.collections.edges[0]?.node?.slug;

      const collectionData = await clientSSR.query<any, any>({
        query: collectionWithProducts,
        variables: {
          slug: fistcollectionSlug,
          productMetafields: CUSTOM_PRODUCT_METADATA_FIELDS,
        },
        fetchPolicy: "no-cache",
      });

      bestSellerFirstCollectionProducts = collectionData?.data;
    }

    logger.log(
      "homepage",
      JSON.stringify({
        homePageData: data,
        headerAndFooterData,
      })
    );

    // const firstBanner = data?.banners?.edges?.find(
    //   edge => edge.node.position === 1
    // )?.node;
    // const cdnUrl = imageURLReplaceWithCDN(firstBanner?.imageMobileUrl);
    // const mobileBannerData = await getBase64ImageFromUrl(
    //   `${cdnUrl}?auto=format&fit=max&w=768`
    // );

    return {
      props: {
        homePageData: {
          ...data,
          bestSellerFirstCollectionProducts,
        },
        headerAndFooterData,
        shopMeta,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e.networkError?.result?.errors[0]);

    // return {
    //   props: {
    //     homePageData: {},
    //     headerAndFooterData: {},
    //     shopMeta: {},
    //   },
    // };
  }
}

export default function Home({
  homePageData,
  headerAndFooterData,
  shopMeta,
}: {
  homePageData: any;
  headerAndFooterData: any;
  shopMeta: any;
}) {
  const shopMetaData = shopMeta?.data.shopmeta.edges[0].node.metadata;
  return (
    <>
      <Head>
        {getScriptMeta(
          shopMeta?.data.shopmeta.edges[0].node.metadata,
          "homepage"
        )}
      </Head>
      <AppHeader headerData={headerAndFooterData} />
      <Homepage data={homePageData} shopMeta={shopMeta} />
      {/* <AppFooter footerData={headerAndFooterData} /> */}
    </>
  );
}
