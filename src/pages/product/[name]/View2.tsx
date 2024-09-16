import "react-responsive-carousel/lib/styles/carousel.min.css";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import { useCart } from "@saleor/sdk";

import isEmpty from "lodash/isEmpty";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getGraphqlIdFromDBId, maybe } from "@temp/core/utils";
import Page from "Themes/views/Product/Page";
import MetaWrapper from "@temp/components/Meta/MetaWrapper";
import { getMetadataValue, parseJson } from "@utils/misc";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import Head from "next/head";
import { getDBIdFromGraphqlId } from "@utils/core";
import { IProps } from "./types";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";

const canDisplay = (product: ProductDetails_product) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.pricing &&
      !!product.variants
  );
const extractMeta = (product: ProductDetails_product, asPath: string) => {
  // console.log("extractMeta", product);
  const metdata = product?.metadata;

  const keywords =
    metdata &&
    metdata.length &&
    getMetadataValue(metdata, "keywords") &&
    JSON.parse(getMetadataValue(metdata, "keywords"));

  const keywordsData = keywords || product?.name;

  return {
    custom: [
      {
        content: product?.pricing?.priceRange?.start?.gross.amount.toString(),
        property: "product:price:amount",
      },
      {
        content: product?.pricing?.priceRange?.start?.gross.currency,
        property: "product:price:currency",
      },
      {
        content: product?.isAvailable ? "in stock" : "out off stock",
        property: "product:isAvailable",
      },
      {
        content: product?.category?.name,
        property: "product:category",
      },
      {
        content: keywordsData,
        name: "keywords",
        id: "meta-description",
      },
    ],
    description: product?.seoDescription || product?.descriptionJson,
    image: product?.thumbnail?.url || null,
    title: product?.seoTitle || product?.name,
    type: "product.item",
    url: asPath,
  };
};

const ExtractMetaSSR: React.FC<{
  product: ProductDetails_product;
  shopMeta: any;
}> = ({ product, shopMeta }) => {
  const metadata = product?.metadata;
  const router = useRouter()

  const keywords =
    metadata &&
    metadata.length &&
    getMetadataValue(metadata, "keywords") &&
    parseJson(getMetadataValue(metadata, "keywords"));

  const variantID = Array.isArray(router?.query?.slug) && 
      router?.query?.slug?.length > 1 && router?.query?.slug[1] || null

  const variantIDFromDB = variantID && getGraphqlIdFromDBId(variantID, "ProductVariant") || null;
  
   const selectedVariant:any = variantIDFromDB ? product?.variants?.find(
    variant => variant.id === variantIDFromDB
    ) : product?.defaultVariant;

  const variantMetaData = selectedVariant?.metadata;

  const updatedVariantName = 
    variantMetaData && getMetadataValue(variantMetaData,"product_name") &&
    parseJson(getMetadataValue(variantMetaData, "product_name")) || null

  const customCanonicalUrl =
    metadata &&
    getMetadataValue(metadata, "custom_canonical_url") &&
    parseJson(getMetadataValue(metadata, "custom_canonical_url"));

  const keywordsData = keywords || product?.name;

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

  const generatedProductUrl =
    product?.id &&
    product?.slug &&
    `/product/${product?.slug}/${getDBIdFromGraphqlId(product?.id, "Product")}`;

  const fullProductUrl =
    typeof siteBaseUrl === "string" &&
    typeof generatedProductUrl === "string" &&
    siteBaseUrl + generatedProductUrl;

  const url =
    typeof window !== "undefined" ? window?.location?.href : fullProductUrl;

  const productDescriptionParsed = parseJson(product?.descriptionJson);
  // console.log("productDescriptionParsed", productDescriptionParsed);

  const productDescriptionText =
    typeof productDescriptionParsed === "object"
      ? productDescriptionParsed?.blocks?.reduce((total, curr) => {
          total.concat(" ");
          return total.concat(curr?.text);
        }, "")
      : productDescriptionParsed;

  // console.log("productDescriptionText", productDescriptionText);
  return (
    <Head>
      <meta
        property="product:price:amount"
        content={product?.pricing?.priceRange?.start?.gross.amount.toString()}
      />

      <meta
        property="product:price:currency"
        content={product?.pricing?.priceRange?.start?.gross.currency}
      />

      <meta
        property="product:isAvailable"
        content={product?.isAvailable ? "in stock" : "out off stock"}
      />

      <meta property="product:category" content={product?.category?.name} />

      <meta name="keywords" content={keywordsData} id="meta-description" />

      <meta
        name="description"
        content={product?.seoDescription || productDescriptionText}
      />

      <meta
        property="og:description"
        content={product?.seoDescription || productDescriptionText}
      />

      <meta property="og:image" content={product?.thumbnail?.url || null} />

      <title>{updatedVariantName || product?.seoTitle || product?.name}</title>

      <meta property="og:title" content={updatedVariantName || product?.seoTitle || product?.name} />

      <meta property="og:type" content="product.item" />

      <link rel="canonical" href={customCanonicalUrl || url} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={updatedVariantName || product?.seoTitle || product?.name} />
      <meta
        name="twitter:description"
        content={product?.seoDescription || productDescriptionText}
      />
      <meta name="twitter:image" content={product?.thumbnail?.url || null} />
      <meta
        name="twitter:image:alt"
        content={product?.thumbnail?.alt || null}
      />
    </Head>
  );
};

const PageWithQueryAttributes: React.FC<IProps> = props => {
  const { product } = props;
  const router = useRouter();
  const searchQueryAttributes = router.query;
  const onAttributeChangeHandler = (slug: string | null, value: string, variantInfo?:{
    variant_id: number,
    slug: string,
    product_id: number
  }) => {
    const currentSlug = router?.query?.name;
    if(variantInfo?.product_id) {
      const {slug,name, ...extraQueryParams} = router?.query;
      const urlParamsString = new URLSearchParams(extraQueryParams).toString()
      let url = variantInfo.variant_id ? `/product/${currentSlug}/${variantInfo?.product_id}/${variantInfo?.variant_id}` : 
      `/product/${currentSlug}/${variantInfo?.product_id}`
      
      if(urlParamsString){
        url = `${url}?${urlParamsString}`
      }
      router.replace(url,
        null,
      { scroll: false, shallow: true });
    }

    // if(Array.isArray(router?.query?.slug) && router)
    // router.push({

    // })
    // router.replace(
    //   queryString.stringifyUrl(
    //     {
    //       query: { [slug]: value },
    //       url: `${router.asPath}`,
    //     },
    //     { skipEmptyString: true }
    //   ),
    //   null,
    //   {
    //     scroll: false,
    //   }
    // );
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  // console.log("setQueryAttributes 1", queryAttributes, searchQueryAttributes);
  useEffect(() => {
    // console.log("setQueryAttributes 2", queryAttributes, searchQueryAttributes?.slug);

    if (!isEmpty(searchQueryAttributes)) {
      const queryAttributeValues: Record<string, string> = {};
      if (Array.isArray(searchQueryAttributes?.slug) && searchQueryAttributes?.slug?.length) {
        const currentVariantId = searchQueryAttributes?.slug?.length === 2 ? 
        getGraphqlIdFromDBId(searchQueryAttributes?.slug[1], "ProductVariant") : 
        product?.defaultVariant?.id
        const selectedVariantAttributes = product.variants.find(
          variant =>
            variant.id ===
            currentVariantId
        )?.attributes;
       if(selectedVariantAttributes && Array.isArray(selectedVariantAttributes)){
        selectedVariantAttributes.forEach(item => {
          queryAttributeValues[item?.attribute?.id] = item?.values[0]?.value;
        });
       }
      };
      setQueryAttributes(queryAttributeValues);
    }
  }, [product.variants.length, JSON.stringify(router.query)]);


  const productIdFromRoute = router?.query?.slug && Array.isArray(router?.query?.slug) && router?.query?.slug[0];
  useEffect(() => {
    if(productIdFromRoute){
      router.replace(router.asPath, null, { scroll: false });
    }
  }, [productIdFromRoute]);

  return (
    <>
      <Page
        {...props}
        queryAttributes={queryAttributes}
        onAttributeChangeHandler={onAttributeChangeHandler}
      />
    </>
  );
};

interface IView {
  data: any;
  shopMeta: any;
}

const View: React.FC<IView> = ({ data, shopMeta }) => {
  const { addItem, items } = useCart();
  const { asPath } = useRouter();
  // const { product, section } = data;
  const baseUrl = typeof window !== "undefined" ? window?.location?.origin : "";
  console.log("productdata", data)
  if (canDisplay(data?.product)) {
    return (
      <>
        <ExtractMetaSSR product={data?.product} shopMeta={shopMeta} />
        <PageWithQueryAttributes
          data={data}
          product={data?.product}
          section={data?.section?.edges[0].node}
          productOffers={[]}
          add={addItem}
          items={items}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <link rel="canonical" href={baseUrl} />
      </Head>
      <ContinueShoppingNext />
    </>
  );
};

export default React.memo(View);
