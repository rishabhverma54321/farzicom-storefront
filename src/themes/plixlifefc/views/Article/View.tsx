// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { MetaWrapper, NotFound } from "@temp/components";
import { STATIC_PAGES } from "Themes/config";
import { generatePageUrl, maybe } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";
import CollectionList from "@components/molecules/CollectionList";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import Head from "next/head";
import { getMetadataValue, parseJson } from "@utils/misc";
import { Article_shop } from "./gqlTypes/Article";
import Page from "./Page";
import { TypedArticleQuery } from "./query";
import { TypedSectionWithCollectionQuery } from "../Home/queries";

const canDisplay = page =>
  maybe(() => !!page && !!page.title && !!page.contentJson);
const getHeaderImage = (shop: Article_shop) =>
  maybe(() => shop.homepageCollection.backgroundImage.url);

const ExtractMetaSSR: React.FC<{
  pageData: any;
  shopMeta: any;
}> = ({ pageData, shopMeta }) => {
  const pageTitle = pageData?.seoTitle || pageData?.title;
  const pageDescription = pageData?.seoDescription;

  const customCanonicalUrl =
    pageData?.metadata &&
    getMetadataValue(pageData?.metadata, "custom_canonical_url") &&
    parseJson(getMetadataValue(pageData?.metadata, "custom_canonical_url"));

  const siteBaseUrl =
    getMetadataValue(
      shopMeta?.data.shopmeta.edges[0].node.metadata,
      "baseUrl"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data.shopmeta.edges[0].node.metadata,
        "baseUrl"
      )
    );
  const generatedPageUrl = pageData?.slug && `/page/${pageData?.slug}`;
  const fullPageUrl =
    typeof siteBaseUrl === "string" &&
    typeof generatedPageUrl === "string" &&
    siteBaseUrl + generatedPageUrl;

  const url =
    typeof window !== "undefined" ? window?.location?.href : fullPageUrl;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta property="og:title" content={pageTitle} />
      <meta name="description" content={pageDescription} />

      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />

      {/* <meta property="og:image" content={product?.thumbnail?.url || null} /> */}

      <link rel="canonical" href={customCanonicalUrl || url} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {/* <meta name="twitter:image" content={product?.thumbnail?.url || null} />
      <meta
        name="twitter:image:alt"
        content={product?.thumbnail?.alt || null}
      /> */}
    </Head>
  );
};

export const View: React.FC<{ data; shopMeta }> = ({ data, shopMeta }) => {
  const location = useCustomLocation();
  const slug = location?.state?.slug || location.pathname.split("/")[2];

  const {
    pageData: { page },
    shop,
  } = data;

  if (canDisplay(page)) {
    const breadcrumbs = [
      {
        link: generatePageUrl(slug),
        value: page.title,
      },
    ];
    return (
      <>
        <ExtractMetaSSR pageData={page} shopMeta={shopMeta} />
        <Page
          breadcrumbs={breadcrumbs}
          headerImage={getHeaderImage(shop)}
          page={page}
          data={data}
        />
      </>
    );
  }

  if (page === null) {
    return <ContinueShoppingNext />;
  }

  return <> page </>;
};
export default View;
