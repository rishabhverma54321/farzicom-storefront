import "react-responsive-carousel/lib/styles/carousel.min.css";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import { useCart } from "@saleor/sdk";
import isEmpty from "lodash/isEmpty";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useRouter } from "next/router";

import { Loader } from "@components/atoms/Loader";
// import { MetaWrapper, NotFound, OfflinePlaceholder } from "@temp/components";
import NetworkStatus from "@temp/components/NetworkStatus";
import { getGraphqlIdFromDBId, maybe } from "@temp/core/utils";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import Page from "./Page";
import { TypedProductDetailQuery } from "./queries";
import { IProps } from "./types";
import MetaWrapper from "@temp/components/Meta/MetaWrapper";
// import makeClevertap from "Themes/lib/makeClevertap.js";
// import clevertapEvents from "Themes/lib/clevertapEvents.js";
// import gtmConfig from "Themes/lib/gtmConfig.js";
const canDisplay = (product: ProductDetails_product) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.pricing &&
      !!product.variants
  );
const extractMeta = (product: ProductDetails_product) => ({
  custom: [
    {
      content: product.pricing?.priceRange?.start?.gross.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.pricing?.priceRange?.start?.gross.currency,
      property: "product:price:currency",
    },
    {
      content: product.isAvailable ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
    {
      content: product.category?.name,
      property: "product:category",
    },
  ],
  description: product.seoDescription || product.descriptionJson,
  image: product?.thumbnail?.url || null,
  title: product.seoTitle || product.name,
  type: "product.item",
  // url: window.location.href,
});

const PageWithQueryAttributes: React.FC<IProps> = props => {
  const { product } = props;
  const router = useRouter();
  const searchQueryAttributes = router.query;
  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    router.replace(
      queryString.stringifyUrl(
        {
          query: { [slug]: value },
          url: `${router.asPath}`,
        },
        { skipEmptyString: true }
      )
    );
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  useEffect(() => {
    if (!isEmpty(searchQueryAttributes)) {
      const queryAttributes: Record<string, string> = {};
      product.variants.forEach(({ attributes }) => {
        attributes.forEach(({ attribute, values }) => {
          const selectedAttributeValue = searchQueryAttributes[attribute.slug];
          if (
            selectedAttributeValue &&
            values[0].value === selectedAttributeValue
          ) {
            if (
              isEmpty(queryAttributes) ||
              !attributes.filter(
                ({ attribute: { id }, values }) =>
                  queryAttributes[id] && queryAttributes[id] !== values[0].value
              ).length
            ) {
              queryAttributes[attribute.id] = selectedAttributeValue;
            }
          }
        });
      });
      setQueryAttributes(queryAttributes);
    }
  }, [product.variants.length]);

  useEffect(() => {
    router.replace(router.asPath);
  }, [queryAttributes]);

  // useEffect(() => {startPolling()}, []);

  return (
    <Page
      {...props}
      queryAttributes={queryAttributes}
      onAttributeChangeHandler={onAttributeChangeHandler}
    />
  );
};

interface IView extends RouteComponentProps {
  data: any;
}

const View: React.FC<IView> = ({ data }) => {
  // console.log("ViewRender Started", data);
  const { addItem, items } = useCart();
  const { product, section } = data;

  if (canDisplay(product)) {
    return (
      <MetaWrapper meta={extractMeta(product)}>
        <PageWithQueryAttributes
          product={product}
          section={section?.edges[0].node}
          productOffers={[]}
          add={addItem}
          items={items}
        />
      </MetaWrapper>
    );
  }

  return <> </>;
};

export default View;
