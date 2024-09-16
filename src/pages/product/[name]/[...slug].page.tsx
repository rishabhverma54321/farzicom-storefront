/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies

import { Base64 } from "js-base64";
import { productDetailsQuery, productDetailsQueryNew } from "Themes/views/Product/queries";
import React from "react";
import { clientSSR } from "@temp/client";
import headerAndFooterQuery, { CustomShopMetaQuery} from "@temp/gloablQueries/queries";
import Layout from "@temp/components/Layout";
import Head from "next/head";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import {
    CUSTOM_PDP_METADATA_FIELDS,
    CUSTOM_SHOPMETA_FIELDS,
} from "@temp/themes/plixlifefc/config";
import parse from "html-react-parser";
import {
  ProductNameAndIdForPaths,
  ProductNameAndIdForPathsVariables,
  ProductNameAndIdForPaths_products_pageInfo,
} from "./gqlTypes/ProductNameAndIdForPaths";
import { productNameAndIdForPaths, productVariantNameAndIdsForPaths } from "./queries";
import ProductPage from "./View2";
import { getDBIdFromGraphqlId } from "@utils/core";

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
        query: productVariantNameAndIdsForPaths,
        variables: {
          first: 10,
          after: pageInfo?.endCursor || "",
          filter: {
            isPublished: true,
          },
        },
        fetchPolicy: "no-cache",
      });
      pageInfo = data.products.pageInfo;
      let productVariants = [];
      data?.products.edges.forEach(product => {
        const variantInfo = product?.node?.variants?.map(variant => {
            return {
                ...variant,
                product,
            }
        });
        productVariants = [...productVariants, ...variantInfo]
      })
      
      currentPaths = productVariants.map(variant => {
        const slug = variant.id === variant.product.node.defaultVariant.id ? 
        [`${getDBIdFromGraphqlId(variant.product.node.id, "Product")}`] :
        [`${getDBIdFromGraphqlId(variant.product.node.id, "Product")}`, `${getDBIdFromGraphqlId(variant.id, "ProductVariant")}`];
        return  {
          params: {
            name: variant.product.node.slug,
            slug,
          },
        };
      });

      paths = [...paths, ...currentPaths];
    } while (pageInfo.hasNextPage);

    console.log("pathss, getStaticPaths", paths, paths.length);

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
  console.log('params in productPages', params)
  const productId = params.slug && Array.isArray(params.slug) && params.slug[0];
  const variantId = params.slug && Array.isArray(params.slug) && params.slug[1] || "";
  const encodedProductId = Base64.encode(`Product:${productId}`);
  if (
    encodedProductId &&
    typeof encodedProductId === "string" &&
    !params?.slug.includes(".js")
  ) {
    try {
      console.time()
      const { data, errors } = await clientSSR.query({
        query: productDetailsQueryNew,
        variables: {
          id: encodedProductId,
          metaFields: CUSTOM_PDP_METADATA_FIELDS,
        },
        fetchPolicy: variantId ? "cache-first" : "network-only",
      });
      const headerAndFooterData = await clientSSR.query({
        query: headerAndFooterQuery,
        fetchPolicy: variantId ? "cache-first" : "network-only",
      });
      const shopMeta = await clientSSR.query({
        query: CustomShopMetaQuery,
        variables: {
          customMetaFields: CUSTOM_SHOPMETA_FIELDS,
        },
        fetchPolicy: variantId ? "cache-first" : "network-only",
      });

      count++;

      console.log(`${variantId ? "Variant Page Timing" : "Product Page (Default Variant) Timing"}`);
      console.timeEnd()
      console.log("productDetailsQuery",data)

      return {
        props: {
          productPageData: {
            ...data,
            variantId,
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
