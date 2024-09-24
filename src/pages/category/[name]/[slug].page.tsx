/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Base64 } from "js-base64";

import {
  categoryNameAndIdForPaths,
  categoryPageQueryNext,
} from "Themes/views/Category/queries";
import React from "react";
import {
  CategoryNameAndIdForPaths,
  CategoryNameAndIdForPathsVariables,
  CategoryNameAndIdForPaths_categories_pageInfo,
} from "Themes/views/Category/gqlTypes/CategoryNameAndIdForPaths";
import { clientSSR } from "@temp/client";
import Layout from "@temp/components/Layout";
import winston from "winston";
import { getDBIdFromGraphqlId, slugify } from "../../../core/utils";
import CategoryPage from "./View";
import headerAndFooterQuery, { ShopMetaQuery } from "@temp/gloablQueries/queries";

export default function Category({
  categoryPageData,
  headerAndFooterData,
  shopMeta,
}) {
  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      <CategoryPage
        data={categoryPageData?.content}
        id={categoryPageData?.id}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    let pageInfo: CategoryNameAndIdForPaths_categories_pageInfo;
    let currentPaths = [];
    let paths = [];

    do {
      const { data, errors } = await clientSSR.query<
        CategoryNameAndIdForPaths,
        CategoryNameAndIdForPathsVariables
      >({
        query: categoryNameAndIdForPaths,
        variables: {
          first: 1,
          after: pageInfo?.endCursor || "",
        },
        fetchPolicy: "no-cache",
      });
      pageInfo = data.categories.pageInfo;
      currentPaths = data.categories.edges.map(category => ({
        params: {
          name: slugify(category.node.name),
          slug: `${getDBIdFromGraphqlId(category.node.id, "Category")}`,
        },
      }));

      paths = [...paths, ...currentPaths];
    } while (false);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    console.log(
      "----------------------------------------error",
      e.networkError?.result?.errors[0]
    );
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const encodedCategoryId = Base64.encode(`Category:${params.slug}`);

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
    const { data, errors } = await clientSSR.query({
      query: categoryPageQueryNext,
      variables: {
        id: encodedCategoryId,
        pageSize: 100,
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
      "category page",
      JSON.stringify({
        categoryPageData: { content: data, id: encodedCategoryId },
        headerAndFooterData,
        shopMeta,
      })
    );

    return {
      props: {
        categoryPageData: { content: data, id: encodedCategoryId },
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
    //     categoryPageData: {},
    //   },
    //   revalidate: 60,
    // };
  }
}

//       e.networkError.result.errors[0]
