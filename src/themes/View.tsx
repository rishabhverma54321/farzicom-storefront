import * as React from "react";
import Page from "Themes/views/Home/Page";
import { META_DEFAULTS } from "Themes/config";
import Head from "next/head";
import { getMetadataValue, parseJson } from "@utils/misc";

interface IView {
  data: any;
  shopMeta: any;
}

interface IHomePageMetaSSR {
  shopMeta: any;
}

const ExtractMetaSSR: React.FC<IHomePageMetaSSR> = ({ shopMeta }) => {
  const { title, description } = META_DEFAULTS;

  const siteTitle =
    getMetadataValue(
      shopMeta?.data.shopmeta.edges[0].node.metadata,
      "siteTitle"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data.shopmeta.edges[0].node.metadata,
        "siteTitle"
      )
    );

  const siteDescription =
    getMetadataValue(
      shopMeta?.data.shopmeta.edges[0].node.metadata,
      "siteDescription"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data.shopmeta.edges[0].node.metadata,
        "siteDescription"
      )
    );

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

  const titleValue = siteTitle || title;

  const descriptionValue = siteDescription || description;

  const url =
    typeof window !== "undefined" ? window?.location?.href : siteBaseUrl;

  return (
    <Head>
      <meta name="keywords" content={descriptionValue} id="meta-description" />

      <meta name="description" content={descriptionValue} />

      <meta property="og:description" content={descriptionValue} />

      <title>{titleValue}</title>

      <meta property="og:title" content={titleValue} />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleValue} />
      <meta name="twitter:description" content={descriptionValue} />
      <meta name="twitter:image" content={process.env.NEXT_PUBLIC_LOGO} />
    </Head>
  );
};

const View: React.FC<IView> = ({ data, shopMeta }) => {
  return (
    <>
      <ExtractMetaSSR shopMeta={shopMeta} />
      <Page data={data} />
    </>
  );
};

export default View;
