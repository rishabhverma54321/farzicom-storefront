/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Base64 } from "js-base64";
import parse from "html-react-parser";

import {
  collectionNameAndIdForPaths,
  collectionPageQueryNext,
} from "Themes/views/Collection/queries";
import React from "react";
import {
  CollectionNameAndIdForPaths,
  CollectionNameAndIdForPathsVariables,
  CollectionNameAndIdForPaths_collections_pageInfo,
} from "Themes/views/Collection/gqlTypes/CollectionNameAndIdForPaths";
import { OrderDirection, ProductOrderField } from "@globalTypes";
import { clientSSR } from "@temp/client";
import Layout from "@temp/components/Layout";
import { shopPageQuery } from "@temp/pages/page/queries";
import { ShopPage } from "@temp/pages/page/gqlTypes/ShopPage";
import {
  CollectionNext,
  CollectionNextVariables,
} from "@temp/themes/plixlifefc/views/Collection/gqlTypes/CollectionNext";
import Head from "next/head";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import { getDBIdFromGraphqlId, slugify } from "../../../core/utils";
import CollectionPage from "./View";
import { CUSTOM_SHOPMETA_FIELDS } from "@temp/themes/plixlifefc/config";
import headerAndFooterQuery, { CustomShopMetaQuery } from "@temp/gloablQueries/queries";

export default function Collection({
  collectionPageData,
  headerAndFooterData,
  shopMeta,
  shopPageData,
}) {
  const collectionName = collectionPageData?.content?.collection?.name;
  const collectionSlugandId = `${
    collectionPageData?.content?.collection?.slug
  }/${getDBIdFromGraphqlId(collectionPageData?.id, "Collection")}`;

  // Get Header tags from collection metadata;
  const htmlContentHead =
    getMetadataValue(
      collectionPageData?.content?.collection.metadata,
      "html_content_head"
    ) &&
    parseJson(
      getMetadataValue(
        collectionPageData?.content?.collection.metadata,
        "html_content_head"
      )
    );
  return (
    <Layout
      headerAndFooterData={headerAndFooterData}
      extraFooterData={collectionPageData?.content?.collection?.metadata}
      shopMeta={shopMeta}
    >
      <Head>
        {getScriptMeta(
          shopMeta?.data.shopmeta.edges[0].node.metadata,
          "collectionpage"
        )}
        {parse(`<script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.plixlife.com/"
          },{
          "@type": "ListItem",
          "position": 2,
          "name": "${collectionName}",
          "item": "https://www.plixlife.com/collection/${collectionSlugandId}"
          }]
        }
        </script>`)}
        {htmlContentHead &&
          Array.isArray(htmlContentHead) &&
          htmlContentHead?.map((content: any) => parse(`${content?.tag}`))}
      </Head>
      <CollectionPage
        data={collectionPageData?.content}
        id={collectionPageData?.id}
        shopPageData={shopPageData}
        collectionQuery={collectionPageData?.collectionQuery}
        shopMeta={shopMeta}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    let pageInfo: CollectionNameAndIdForPaths_collections_pageInfo;
    let currentPaths = [];
    let paths = [];

    do {
      const { data, errors } = await clientSSR.query<
        CollectionNameAndIdForPaths,
        CollectionNameAndIdForPathsVariables
      >({
        query: collectionNameAndIdForPaths,
        variables: {
          first: 100,
          after: pageInfo?.endCursor || "",
        },
        fetchPolicy: "no-cache",
      });
      pageInfo = data.collections.pageInfo;
      currentPaths = data.collections.edges.map(collection => ({
        params: {
          name: slugify(collection.node.name),
          slug: `${getDBIdFromGraphqlId(collection.node.id, "Collection")}`,
        },
      }));

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
  const { params } = context;
  const encodedCollectionId = Base64.encode(`Collection:${params.slug}`);

  if (
    encodedCollectionId &&
    typeof encodedCollectionId === "string" &&
    !params?.slug.includes(".js")
  ) {
    try {
      const shopPageData = await clientSSR.query<ShopPage, {}>({
        query: shopPageQuery,
        fetchPolicy: "no-cache",
      });

      const { data, errors } = await clientSSR.query<
        CollectionNext,
        CollectionNextVariables
      >({
        query: collectionPageQueryNext,
        variables: {
          id: encodedCollectionId,
          pageSize: 100,
          sortBy: {
            direction: OrderDirection.ASC,
            field: ProductOrderField.COLLECTION,
          },
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

      const collectionQuery = [
        {
          id: data.collection.id,
          name: data.collection.name,
          descriptionJson: data.collection.descriptionJson,
          metadata: data.collection.metadata,
        },
      ];

      return {
        props: {
          collectionPageData: {
            content: data,
            id: encodedCollectionId,
            collectionQuery,
          },
          headerAndFooterData,
          shopMeta,
          shopPageData,
        },
        revalidate: 60,
      };
    } catch (e) {
      console.log("error ----------", e);
      console.log("error>>>>>>>>>>>>>>>>", e.networkError?.result?.errors[0]);
      // return {
      //   props: {
      //     collectionPageData: {},
      //   },
      //   revalidate: 60,
      // };
    }
  } else {
    console.log("Error in encodededCollectionId");
  }
}
