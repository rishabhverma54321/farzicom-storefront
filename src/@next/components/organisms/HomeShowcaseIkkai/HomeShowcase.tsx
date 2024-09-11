import React from "react";

import { CollectionSection } from "@components/molecules/CollectionSection";

// import { generateProductUrl } from "@temp/core/utils";
import { ApolloQueryResult } from "apollo-client";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import {
  ProductsList,
  ProductsList_collections_edges_node_products,
  ProductsList_collections_edges_node_products_edges_node,
} from "../../../../themes/ikkai/views/Home/gqlTypes/ProductsList";

export interface IHomeShowcaseProps {
  url: string;
  name: string;
  products: ProductsList_collections_edges_node_products;
  ctTitle: string;
  isCombo?: boolean;
  refetch: (variables?: {}) => Promise<ApolloQueryResult<ProductsList>>;
}

export const HomeShowcase: React.FC<IHomeShowcaseProps> = ({
  url,
  name,
  products,
  ctTitle,
  isCombo,
  refetch,
}) => {
  const handleViewAllclick = () => {
    const clevertap = makeClevertap();
    if (clevertapEvents.viewAllClicked.enable) {
      clevertap.event.push(clevertapEvents.viewAllClicked.value, {
        "Landing URL": url,
        "Page title": ctTitle,
        "Header Section": name,
      });
    }
    if (gtmConfig.viewAllClicked.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.viewAllClicked.value,
        ecommerce: {
          "View All Clicked": {
            "Landing URL": url,
            "Page title": ctTitle,
            "Header Section": name,
          },
        },
      });
    }
  };

  const filterOOS = (
    products: Array<ProductsList_collections_edges_node_products_edges_node>
  ) =>
    products.filter(
      product =>
        product?.variants?.[0] &&
        product.variants[0]?.quantityAvailable > 0 &&
        product?.isAvailableForPurchase
    );

  const mapNodes = (products: ProductsList_collections_edges_node_products) =>
    products.edges?.map(edge => edge.node);

  const finalProducts: Array<ProductsList_collections_edges_node_products_edges_node> = filterOOS(
    mapNodes(products)
  );

  return (
    <>
      <CollectionSection
        name={name}
        products={finalProducts}
        showAllConfig={{
          canShowAll: true,
          showAllUrl: url,
          showAllClickHandler: handleViewAllclick,
        }}
        other={{
          ctTitle,
          shouldPartition: true,
          bgColor: !isCombo ? "#FFF5F3" : undefined,
          withATC: !isCombo,
        }}
        refetch={refetch}
      />
    </>
  );
};
HomeShowcase.displayName = "HomeShowcase";
export default React.memo(HomeShowcase);
