/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BannerType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: HomePageQueryNext
// ====================================================

export interface HomePageQueryNext_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: HomePageQueryNext_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface HomePageQueryNext_shop {
  __typename: "Shop";
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: HomePageQueryNext_shop_homepageCollection | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_subnavbar_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_subnavbar_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_subnavbar_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_subnavbar_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_subnavbar_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_subnavbar_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_subnavbar_edges_node_collections_edges[];
}

export interface HomePageQueryNext_subnavbar_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_subnavbar_edges_node_metadata | null)[];
  images: HomePageQueryNext_subnavbar_edges_node_images;
  collections: HomePageQueryNext_subnavbar_edges_node_collections;
}

export interface HomePageQueryNext_subnavbar_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_subnavbar_edges_node;
}

export interface HomePageQueryNext_subnavbar {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_subnavbar_edges[];
}

export interface HomePageQueryNext_homePageIcons_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_homePageIcons_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_homePageIcons_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_homePageIcons_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_homePageIcons_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_homePageIcons_edges_node_collections_edges[];
}

export interface HomePageQueryNext_homePageIcons_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_homePageIcons_edges_node_metadata | null)[];
  images: HomePageQueryNext_homePageIcons_edges_node_images;
  collections: HomePageQueryNext_homePageIcons_edges_node_collections;
}

export interface HomePageQueryNext_homePageIcons_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_homePageIcons_edges_node;
}

export interface HomePageQueryNext_homePageIcons {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_homePageIcons_edges[];
}

export interface HomePageQueryNext_featuredCollections_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_featuredCollections_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_featuredCollections_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_featuredCollections_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_featuredCollections_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_featuredCollections_edges_node_collections_edges[];
}

export interface HomePageQueryNext_featuredCollections_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_featuredCollections_edges_node_metadata | null)[];
  images: HomePageQueryNext_featuredCollections_edges_node_images;
  collections: HomePageQueryNext_featuredCollections_edges_node_collections;
}

export interface HomePageQueryNext_featuredCollections_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_featuredCollections_edges_node;
}

export interface HomePageQueryNext_featuredCollections {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_featuredCollections_edges[];
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_ourOrganicRanges_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_ourOrganicRanges_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_ourOrganicRanges_edges_node_collections_edges[];
}

export interface HomePageQueryNext_ourOrganicRanges_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_ourOrganicRanges_edges_node_metadata | null)[];
  images: HomePageQueryNext_ourOrganicRanges_edges_node_images;
  collections: HomePageQueryNext_ourOrganicRanges_edges_node_collections;
}

export interface HomePageQueryNext_ourOrganicRanges_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_ourOrganicRanges_edges_node;
}

export interface HomePageQueryNext_ourOrganicRanges {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_ourOrganicRanges_edges[];
}

export interface HomePageQueryNext_whatsNew_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_whatsNew_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_whatsNew_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_whatsNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_whatsNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_whatsNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_whatsNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_whatsNew_edges_node_collections_edges[];
}

export interface HomePageQueryNext_whatsNew_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_whatsNew_edges_node_metadata | null)[];
  images: HomePageQueryNext_whatsNew_edges_node_images;
  collections: HomePageQueryNext_whatsNew_edges_node_collections;
}

export interface HomePageQueryNext_whatsNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_whatsNew_edges_node;
}

export interface HomePageQueryNext_whatsNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_whatsNew_edges[];
}

export interface HomePageQueryNext_purestCare_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_purestCare_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_purestCare_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_purestCare_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_purestCare_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_purestCare_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_purestCare_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_purestCare_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_purestCare_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_purestCare_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_purestCare_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_purestCare_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_purestCare_edges_node_collections_edges[];
}

export interface HomePageQueryNext_purestCare_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_purestCare_edges_node_metadata | null)[];
  images: HomePageQueryNext_purestCare_edges_node_images;
  collections: HomePageQueryNext_purestCare_edges_node_collections;
}

export interface HomePageQueryNext_purestCare_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_purestCare_edges_node;
}

export interface HomePageQueryNext_purestCare {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_purestCare_edges[];
}

export interface HomePageQueryNext_byConcern_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_byConcern_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_byConcern_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_byConcern_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_byConcern_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_byConcern_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_byConcern_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_byConcern_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_byConcern_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_byConcern_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_byConcern_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_byConcern_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_byConcern_edges_node_collections_edges[];
}

export interface HomePageQueryNext_byConcern_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_byConcern_edges_node_metadata | null)[];
  images: HomePageQueryNext_byConcern_edges_node_images;
  collections: HomePageQueryNext_byConcern_edges_node_collections;
}

export interface HomePageQueryNext_byConcern_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_byConcern_edges_node;
}

export interface HomePageQueryNext_byConcern {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_byConcern_edges[];
}

export interface HomePageQueryNext_customersSay_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_customersSay_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_customersSay_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_customersSay_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_customersSay_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_customersSay_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_customersSay_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_customersSay_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_customersSay_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_customersSay_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_customersSay_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_customersSay_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_customersSay_edges_node_collections_edges[];
}

export interface HomePageQueryNext_customersSay_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_customersSay_edges_node_metadata | null)[];
  images: HomePageQueryNext_customersSay_edges_node_images;
  collections: HomePageQueryNext_customersSay_edges_node_collections;
}

export interface HomePageQueryNext_customersSay_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_customersSay_edges_node;
}

export interface HomePageQueryNext_customersSay {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_customersSay_edges[];
}

export interface HomePageQueryNext_instagramShots_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_instagramShots_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_instagramShots_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_instagramShots_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_instagramShots_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_instagramShots_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_instagramShots_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_instagramShots_edges_node_collections_edges[];
}

export interface HomePageQueryNext_instagramShots_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_instagramShots_edges_node_metadata | null)[];
  images: HomePageQueryNext_instagramShots_edges_node_images;
  collections: HomePageQueryNext_instagramShots_edges_node_collections;
}

export interface HomePageQueryNext_instagramShots_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_instagramShots_edges_node;
}

export interface HomePageQueryNext_instagramShots {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_instagramShots_edges[];
}

export interface HomePageQueryNext_reasonsToLove_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_reasonsToLove_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_reasonsToLove_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_reasonsToLove_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_reasonsToLove_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_reasonsToLove_edges_node_collections_edges[];
}

export interface HomePageQueryNext_reasonsToLove_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_reasonsToLove_edges_node_metadata | null)[];
  images: HomePageQueryNext_reasonsToLove_edges_node_images;
  collections: HomePageQueryNext_reasonsToLove_edges_node_collections;
}

export interface HomePageQueryNext_reasonsToLove_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_reasonsToLove_edges_node;
}

export interface HomePageQueryNext_reasonsToLove {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_reasonsToLove_edges[];
}

export interface HomePageQueryNext_blogsSection_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_blogsSection_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_blogsSection_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_blogsSection_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_blogsSection_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_blogsSection_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_blogsSection_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_blogsSection_edges_node_collections_edges[];
}

export interface HomePageQueryNext_blogsSection_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_blogsSection_edges_node_metadata | null)[];
  images: HomePageQueryNext_blogsSection_edges_node_images;
  collections: HomePageQueryNext_blogsSection_edges_node_collections;
}

export interface HomePageQueryNext_blogsSection_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_blogsSection_edges_node;
}

export interface HomePageQueryNext_blogsSection {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_blogsSection_edges[];
}

export interface HomePageQueryNext_seedSection_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_seedSection_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface HomePageQueryNext_seedSection_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_seedSection_edges_node_images_edges_node | null;
}

export interface HomePageQueryNext_seedSection_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_seedSection_edges_node_images_edges | null)[];
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  backgroundImage: HomePageQueryNext_seedSection_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_seedSection_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNext_seedSection_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNext_seedSection_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_seedSection_edges_node_collections_edges_node;
}

export interface HomePageQueryNext_seedSection_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNext_seedSection_edges_node_collections_edges[];
}

export interface HomePageQueryNext_seedSection_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNext_seedSection_edges_node_metadata | null)[];
  images: HomePageQueryNext_seedSection_edges_node_images;
  collections: HomePageQueryNext_seedSection_edges_node_collections;
}

export interface HomePageQueryNext_seedSection_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNext_seedSection_edges_node;
}

export interface HomePageQueryNext_seedSection {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNext_seedSection_edges[];
}

export interface HomePageQueryNext_banners_edges_node {
  __typename: "CustomBannerType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  type: BannerType;
  relatedId: string | null;
  link: string;
  name: string;
  created: any;
  /**
   * The URL of the image.
   */
  imageUrl: string | null;
  /**
   * The URL of the image for mobile screens.
   */
  imageMobileUrl: string | null;
  position: number;
  isEnabled: boolean;
}

export interface HomePageQueryNext_banners_edges {
  __typename: "CustomBannerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNext_banners_edges_node | null;
}

export interface HomePageQueryNext_banners {
  __typename: "CustomBannerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNext_banners_edges | null)[];
}

export interface HomePageQueryNext {
  /**
   * Return information about the shop.
   */
  shop: HomePageQueryNext_shop;
  subnavbar: HomePageQueryNext_subnavbar | null;
  homePageIcons: HomePageQueryNext_homePageIcons | null;
  featuredCollections: HomePageQueryNext_featuredCollections | null;
  ourOrganicRanges: HomePageQueryNext_ourOrganicRanges | null;
  whatsNew: HomePageQueryNext_whatsNew | null;
  purestCare: HomePageQueryNext_purestCare | null;
  byConcern: HomePageQueryNext_byConcern | null;
  customersSay: HomePageQueryNext_customersSay | null;
  instagramShots: HomePageQueryNext_instagramShots | null;
  reasonsToLove: HomePageQueryNext_reasonsToLove | null;
  blogsSection: HomePageQueryNext_blogsSection | null;
  seedSection: HomePageQueryNext_seedSection | null;
  banners: HomePageQueryNext_banners | null;
}
