import ArticlePage from "Themes/views/Article/View";
import React from "react";
import { clientSSR } from "@temp/client";
import parse from "html-react-parser";
import Layout from "@temp/components/Layout";
import { getDBIdFromGraphqlId, slugify } from "@utils/core";
import { getMetadataValue, getScriptMeta, parseJson } from "@utils/misc";
import {
  sectionWithoutChildrenNew,
  sectionWithoutChildrenOptimized,
} from "@temp/themes/plixlifefc/views/Home/queries";
import {
  SectionDetailsWithoutChildrenPlix,
  SectionDetailsWithoutChildrenPlixVariables,
} from "@temp/themes/plixlifefc/views/Home/gqlTypes/SectionDetailsWithoutChildrenPlix";
import winston from "winston";
import Head from "next/head";
import { pagesDetails, pagesDetailsVariables } from "./gqlTypes/pagesDetails";
import { PagesList, PagesListVariables } from "./gqlTypes/PagesList";
import { ProductNameAndIdForPaths_products_pageInfo } from "../product/[name]/gqlTypes/ProductNameAndIdForPaths";
import { pagesDetailsQuery, pagesListQuery } from "./queries";
import uniq from "lodash/uniq";
import { collectionProductsQuery } from "@components/templates/BuildYourBox/queries";
import {
  CollectionProducts,
  CollectionProductsVariables,
} from "@components/templates/BuildYourBox/gqlTypes/CollectionProducts";
import { CUSTOM_SHOPMETA_FIELDS } from "@temp/themes/plixlifefc/config";
import { byobPages, pages } from "gqlTypes/customGlobalTypes";
import headerAndFooterQuery, { CustomShopMetaQuery } from "@temp/gloablQueries/queries";

export default function Search({ headerAndFooterData, shopMeta, data }) {
  const page = data?.pageData?.page;

  const htmlContentHead =
    page &&
    getMetadataValue(page?.metadata, "html_content_head") &&
    parseJson(getMetadataValue(page?.metadata, "html_content_head"));
  return (
    <>
      <Head>
        {getScriptMeta(
          shopMeta?.data.shopmeta.edges[0].node.metadata,
          "staticpage"
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
          "name": "${page?.title}",
          "item": "https://www.plixlife.com/page/${page?.slug}"
          }]
        }
        </script>`)}
        {htmlContentHead &&
          Array.isArray(htmlContentHead) &&
          htmlContentHead?.map((content: any) => parse(`${content?.tag}`))}
      </Head>
      <Layout
        headerAndFooterData={headerAndFooterData}
        extraFooterData={data?.pageData?.page?.metadata}
        shopMeta={shopMeta}
      >
        <ArticlePage data={data} shopMeta={shopMeta} />
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
        PagesList,
        PagesListVariables
      >({
        query: pagesListQuery,
        variables: {
          first: 1,
          after: pageInfo?.endCursor || "",
        },
        fetchPolicy: "no-cache",
      });
      pageInfo = data.pages.pageInfo;
      currentPaths = data.pages.edges.map(page => {
        if (page.node.slug === "shop" || page.node.slug === "login") {
          return null;
        }
        return {
          params: {
            slug: page.node.slug,
          },
        };
      });

      currentPaths = currentPaths.filter(element => {
        return element !== null;
      });

      console.count("currentPaths getStaticPaths");

      paths = [...paths, ...currentPaths];
    } while (false);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    console.log("----------------------------------------error", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);

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

  try {
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

    const { data, errors } = await clientSSR.query<
      pagesDetails,
      pagesDetailsVariables
    >({
      query: pagesDetailsQuery,
      variables: { slug: params?.slug },
      fetchPolicy: "no-cache",
    });

    if (data?.page === null) {
      //throw 404 in case the api was called successfully without any errors but the Page doesn't exist.
      return {
        notFound: true,
      };
    }

    const { metadata, slug } = data.page;
    const isSalePage = getMetadataValue(metadata, "isSalePage", "false");

    let sectionData = null;
    let sectionData2 = null;

    if (isSalePage === "true" || slug === pages.GIFTING) {
      const sections =
        getMetadataValue(metadata, "sections") &&
        parseJson(getMetadataValue(metadata, "sections"));

      const sectionName =
        sections && sections?.sectionName
          ? sections?.sectionName
          : "Sales Page 1";

      const productMetafields: Array<string> =
        sections && sections?.product_metadata
          ? sections?.product_metadata
          : null;

      const totalProducts =
        sections && sections?.total_products
          ? sections && sections?.total_products
          : 40;

      const sectionName2 =
        sections && sections?.sectionName2 ? sections?.sectionName2 : "";
      const { data, errors } =
        productMetafields &&
        Array.isArray(productMetafields) &&
        productMetafields?.length
          ? await clientSSR.query<any, any>({
              query: sectionWithoutChildrenOptimized,
              variables: {
                firstPage: 1,
                name: sectionName,
                productMetafields: productMetafields,
                firstProducts: totalProducts,
              },
              fetchPolicy: "no-cache",
            })
          : await clientSSR.query<
              SectionDetailsWithoutChildrenPlix,
              SectionDetailsWithoutChildrenPlixVariables
            >({
              query: sectionWithoutChildrenNew,
              variables: { firstPage: 1, name: sectionName },
              fetchPolicy: "no-cache",
            });

      sectionData = data;

      if (sectionName2) {
        const { data, errors } = await clientSSR.query<
          SectionDetailsWithoutChildrenPlix,
          SectionDetailsWithoutChildrenPlixVariables
        >({
          query: sectionWithoutChildrenNew,
          variables: { firstPage: 1, name: sectionName2 },
          fetchPolicy: "no-cache",
        });

        sectionData2 = data;
      }
    }
    const isBybPage: any = byobPages?.find(item => item === params?.slug);

    let bybCollectionData: {
      collectionId: string;
      data: CollectionProducts;
    }[] = [];

    let giftBoxCollectionData: any = {};

    if (isBybPage) {
      const stepsData =
        metadata &&
        getMetadataValue(metadata, "steps") &&
        parseJson(getMetadataValue(metadata, "steps"));

      const isGiftBox =
        params?.slug === pages.GIFT_BOX ||
        params?.slug === pages.GIFT_BOX_GALLERY;
      const isGiftBoxGallery = params?.slug === pages.GIFT_BOX_GALLERY;

      if (!isGiftBox) {
        if (Array.isArray(stepsData) && stepsData?.length) {
          const collectionIds = uniq(stepsData.map(step => step?.collectionID));
          bybCollectionData = await Promise.all(
            collectionIds?.map(async c_id => {
              const { data, errors } = await clientSSR.query<
                CollectionProducts,
                CollectionProductsVariables
              >({
                query: collectionProductsQuery,
                variables: {
                  id: c_id,
                  pageSize: 100,
                  sortBy: {
                    direction: "ASC",
                    field: "COLLECTION",
                  },
                },
                fetchPolicy: "no-cache",
              });
              return {
                collectionId: c_id,
                data,
              };
            })
          );
        }
      } else {
        if (
          isGiftBoxGallery &&
          stepsData &&
          Array.isArray(stepsData) &&
          stepsData.length > 0
        ) {
          await Promise.all(
            stepsData?.map(async item => {
              const collectionIds =
                item?.collection && Array.isArray(item?.collection)
                  ? uniq(item?.collection?.map(step => step?.collectionID))
                  : [];

              giftBoxCollectionData[item?.name] = await Promise.all(
                collectionIds?.map(async (c_id: string) => {
                  const { data, errors } = await clientSSR.query<
                    CollectionProducts,
                    CollectionProductsVariables
                  >({
                    query: collectionProductsQuery,
                    variables: {
                      id: c_id,
                      pageSize: 100,
                      sortBy: {
                        direction: "ASC",
                        field: "COLLECTION",
                      },
                    },
                    fetchPolicy: "no-cache",
                  });
                  return {
                    collectionId: c_id,
                    data,
                  };
                })
              );
            })
          );
        } else if (
          stepsData &&
          typeof stepsData === "object" &&
          !Array.isArray(stepsData) &&
          Object.keys(stepsData)?.length > 0
        ) {
          await Promise.all(
            Object.keys(stepsData)?.map(async item => {
              const collectionIds =
                stepsData[item] && Array.isArray(stepsData[item])
                  ? uniq(stepsData[item]?.map(step => step?.collectionID))
                  : [];

              giftBoxCollectionData[item] = await Promise.all(
                collectionIds?.map(async (c_id: string) => {
                  const { data, errors } = await clientSSR.query<
                    CollectionProducts,
                    CollectionProductsVariables
                  >({
                    query: collectionProductsQuery,
                    variables: {
                      id: c_id,
                      pageSize: 100,
                      sortBy: {
                        direction: "ASC",
                        field: "COLLECTION",
                      },
                    },
                    fetchPolicy: "no-cache",
                  });
                  return {
                    collectionId: c_id,
                    data,
                  };
                })
              );
            })
          );
        }
      }
    }

    logger.log(
      "static page",
      JSON.stringify({
        headerAndFooterData,
        shopMeta,
        data: { pageData: data, sectionData, sectionData2 },
      })
    );

    return {
      props: {
        headerAndFooterData,
        shopMeta,
        data: {
          pageData: data,
          sectionData,
          sectionData2,
          bybCollectionData,
          giftBoxCollectionData,
        },
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);
    // return {
    //   props: {
    //     headerAndFooterData: null,
    //     shopMeta: null,
    //     data: {
    //       pageData: { page: null },
    //       sectionData: null,
    //       sectionData2: null,
    //     },
    //   },
    //   revalidate: 60,
    // };
  }
}
