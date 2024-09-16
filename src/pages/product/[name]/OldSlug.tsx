/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies

import { Base64 } from "js-base64";
import { productDetailsQuery } from "Themes/views/Product/queries";
import React from "react";
import { clientSSR } from "@temp/clients";
import { CustomShopMetaQuery, headerAndFooterQuery } from "@temp/pages/queries";
import Layout from "@temp/components/Layout";
import Head from "next/head";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import parse from "html-react-parser";
import { getDBIdFromGraphqlId, slugify } from "../../../core/utils";
import {
  ProductNameAndIdForPaths,
  ProductNameAndIdForPathsVariables,
  ProductNameAndIdForPaths_products_pageInfo,
} from "./gqlTypes/ProductNameAndIdForPaths";
import { productNameAndIdForPaths } from "./queries";
import ProductPage from "./View2";
import {
  CUSTOM_PDP_METADATA_FIELDS,
  CUSTOM_SHOPMETA_FIELDS,
} from "@temp/themes/plixlifefc/config";

export default function Product({
  productPageData,
  headerAndFooterData,
  shopMeta,
}) {
  const htmlContentHead =
    getMetadataValue(productPageData?.product?.metadata, "html_content_head") &&
    parseJson(
      getMetadataValue(productPageData?.product?.metadata, "html_content_head")
    );

  return (
    <>
      <Head>
        {getScriptMeta(
          shopMeta?.data.shopmeta.edges[0].node.metadata,
          "productpage"
        )}
        {htmlContentHead &&
          Array.isArray(htmlContentHead) &&
          htmlContentHead?.map((content: any) => parse(`${content?.tag}`))}
      </Head>
      <Layout
        headerAndFooterData={headerAndFooterData}
        extraFooterData={productPageData?.product?.metadata}
        shopMeta={shopMeta}
      >
        <ProductPage data={productPageData} shopMeta={shopMeta} />
      </Layout>
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
        ProductNameAndIdForPaths,
        ProductNameAndIdForPathsVariables
      >({
        query: productNameAndIdForPaths,
        variables: {
          first: 100,
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
          name: product.node.slug,
          slug: `${getDBIdFromGraphqlId(product.node.id, "Product")}`,
        },
      }));
      console.count("currentPaths getStaticPaths");

      paths = [...paths, ...currentPaths];
    } while (pageInfo?.hasNextPage);

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
  let count = 0;
  const { params } = context;
  const encodedProductId = Base64.encode(`Product:${params.slug}`);
  if (
    encodedProductId &&
    typeof encodedProductId === "string" &&
    !params?.slug.includes(".js")
  ) {
    try {
      const { data, errors } = await clientSSR.query({
        query: productDetailsQuery,
        variables: {
          id: encodedProductId,
          metaFields: CUSTOM_PDP_METADATA_FIELDS,
        },
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

      count++;

      return {
        props: {
          productPageData: data,
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
      //     productPageData: {},
      //     headerAndFooterData: {},
      //     shopMeta: {},
      //   },
      //   revalidate: 60,
      // };
    }
  } else {
    console.log("Error in encodededProductId");
  }
}
