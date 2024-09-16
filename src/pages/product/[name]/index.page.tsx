/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies
import ProductPage from "./View2";
import { productSlugForPaths } from "./queries";
import { ProductNameAndIdForPaths_products_pageInfo } from "./gqlTypes/ProductNameAndIdForPaths";
import { slugify } from "../../../core/utils";
import { productDetailsQueryWithSlug } from "Themes/views/Product/queries";
import React from "react";
import { clientSSR } from "@temp/client";
import {
  ProductSlugForPaths,
  ProductSlugForPathsVariables,
} from "./gqlTypes/ProductSlugForPaths";
import winston from "winston";
import headerAndFooterQuery, { ShopMetaQuery } from "@temp/gloablQueries/queries";

export default function Product({ productPageData }) {
  return (
    <>
      <ProductPage data={productPageData} />
    </>
  );
}

export async function getStaticPaths() {
  try {
    let pageInfo: ProductNameAndIdForPaths_products_pageInfo;
    let currentPaths = [];
    let paths = [];

    do {
      const { data, errors } = await clientSSR.query<
        ProductSlugForPaths,
        ProductSlugForPathsVariables
      >({
        query: productSlugForPaths,
        variables: {
          first: 1,
          after: pageInfo?.endCursor || "",
          filter: {
            isPublished: true,
          },
        },
        fetchPolicy: "no-cache",
      });
      pageInfo = data.products.pageInfo;
      currentPaths = data.products.edges.map(product => ({
        params: {
          name: slugify(product.node.slug),
        },
      }));
      console.count("currentPaths getStaticPaths");

      paths = [...paths, ...currentPaths];
    } while (false);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    console.log("----------------------------------------error", e);
    return {
      paths: [],
      fallback: false,
    };
  }
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

  const { params } = context;
  // const encodedProductId = Base64.encode(`Product:${params.slug}`);

  try {
    const { data, errors } = await clientSSR.query({
      query: productDetailsQueryWithSlug,
      variables: {
        slug: params.name,
      },
      fetchPolicy: "no-cache",
    });

    const headerAndFooterData = await clientSSR.query({
      query: headerAndFooterQuery,
      fetchPolicy: "no-cache",
    });
    const shopMeta = await clientSSR.query({
      query: ShopMetaQuery,
      fetchPolicy: "no-cache",
    });

    logger.log(
      "product page",
      JSON.stringify({
        productPageData: data,
        headerAndFooterData: headerAndFooterData,
        shopMeta: shopMeta,
      })
    );

    return {
      props: {
        productPageData: data,
        headerAndFooterData: headerAndFooterData,
        shopMeta: shopMeta,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log(
      "----------------------------------------error",
      e.networkError?.result.errors[0]
    );
    return {
      props: {
        productPageData: {},
        headerAndFooterData: {},
        shopMeta: {},
      },
      revalidate: 60,
    };
  }
}
