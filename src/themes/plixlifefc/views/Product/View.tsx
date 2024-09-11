import "react-responsive-carousel/lib/styles/carousel.min.css";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import { useCart } from "@saleor/sdk";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useCustomHistory } from "@hooks/useCustomHistory";

import { Loader } from "@components/atoms/Loader";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "@temp/components";
import NetworkStatus from "@temp/components/NetworkStatus";
import { getGraphqlIdFromDBId, maybe } from "@temp/core/utils";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import Page from "./Page";
import { TypedProductDetailQuery } from "./queries";
import { IProps } from "./types";
import { useCustomLocation } from "@hooks/useCustomLocation"; // import makeClevertap from "Themes/lib/makeClevertap.js";
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
  url: window.location.href,
});

const isObjectEmpty = obj => {
  if (Object.keys(obj).length) return false;

  return true;
};

const PageWithQueryAttributes: React.FC<IProps> = props => {
  const { product } = props;
  const history = useCustomHistory();
  const { search } = location;
  const searchQueryAttributes = queryString.parse(search);
  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    history.replace(
      queryString.stringifyUrl(
        {
          query: { [slug]: value },
          url: `${location.pathname}${location.search}`,
        },
        { skipEmptyString: true }
      )
    );
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  useEffect(() => {
    if (!isObjectEmpty(searchQueryAttributes)) {
      const queryAttributes: Record<string, string> = {};
      product.variants.forEach(({ attributes }) => {
        attributes.forEach(({ attribute, values }) => {
          const selectedAttributeValue = searchQueryAttributes[attribute.slug];
          if (
            selectedAttributeValue &&
            values.length &&
            values[0].value === selectedAttributeValue
          ) {
            if (
              isObjectEmpty(queryAttributes) ||
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
    history.replace(location.pathname + location.search);
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

const View: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { addItem, items } = useCart();

  return (
    <TypedProductDetailQuery
      variables={{
        id: getGraphqlIdFromDBId(match.params.id, "Product"),
        sectionName: "ProductPage",
      }}
      displayLoader={false}
      key={match.params.id}
    >
      {({ data, loading, error, refetch, startPolling, stopPolling }) => (
        <NetworkStatus>
          {isOnline => {
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
                    refetch={refetch}
                    startPolling={startPolling}
                    stopPolling={stopPolling}
                  />
                </MetaWrapper>
              );
            }

            if (loading) {
              return <Loader />;
            }

            if (product === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </NetworkStatus>
      )}
    </TypedProductDetailQuery>
  );
};

export default View;
