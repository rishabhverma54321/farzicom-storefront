/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BannerType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: HomePageQueryNextPlixlife
// ====================================================

export interface HomePageQueryNextPlixlife_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: HomePageQueryNextPlixlife_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface HomePageQueryNextPlixlife_shop {
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
  homepageCollection: HomePageQueryNextPlixlife_shop_homepageCollection | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_subnavbarNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_subnavbarNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_subnavbarNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_subnavbarNew_edges_node;
}

export interface HomePageQueryNextPlixlife_subnavbarNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_subnavbarNew_edges[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_brandLogosNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_brandLogosNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_brandLogosNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_brandLogosNew_edges_node;
}

export interface HomePageQueryNextPlixlife_brandLogosNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_brandLogosNew_edges[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_bestSellersNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_bestSellersNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_bestSellersNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_bestSellersNew_edges_node;
}

export interface HomePageQueryNextPlixlife_bestSellersNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_bestSellersNew_edges[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges_node;
}

export interface HomePageQueryNextPlixlife_plantBasedSupplimentsNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_plantBasedSupplimentsNew_edges[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_collection1New_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_collection1New_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_collection1New_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_collection1New_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_collection1New_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection1New_edges_node;
}

export interface HomePageQueryNextPlixlife_collection1New {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_collection1New_edges[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_moneyBackGuarantee_edges_node;
}

export interface HomePageQueryNextPlixlife_moneyBackGuarantee {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_moneyBackGuarantee_edges[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_nutritionistNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_nutritionistNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_nutritionistNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_nutritionistNew_edges_node;
}

export interface HomePageQueryNextPlixlife_nutritionistNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_nutritionistNew_edges[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_collection2New_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_collection2New_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_collection2New_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_collection2New_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_collection2New_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection2New_edges_node;
}

export interface HomePageQueryNextPlixlife_collection2New {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_collection2New_edges[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_collection3_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_collection3_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_collection3_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_collection3_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_collection3_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_collection3_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection3_edges_node;
}

export interface HomePageQueryNextPlixlife_collection3 {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_collection3_edges[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_collection4_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_collection4_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_collection4_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_collection4_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_collection4_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_collection4_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collection4_edges_node;
}

export interface HomePageQueryNextPlixlife_collection4 {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_collection4_edges[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_testimonialsNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_testimonialsNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_testimonialsNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_testimonialsNew_edges_node;
}

export interface HomePageQueryNextPlixlife_testimonialsNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_testimonialsNew_edges[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_campaignSection_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_campaignSection_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_campaignSection_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_campaignSection_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_campaignSection_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_campaignSection_edges_node;
}

export interface HomePageQueryNextPlixlife_campaignSection {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_campaignSection_edges[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_backgroundImage {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_attributes[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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
  sortOrder: number | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  defaultVariant: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges_node;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products_edges[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node {
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
  backgroundImage: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node_products | null;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_textStripNew_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_textStripNew_edges_node {
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
  metadata: (HomePageQueryNextPlixlife_textStripNew_edges_node_metadata | null)[];
  collections: HomePageQueryNextPlixlife_textStripNew_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_textStripNew_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_textStripNew_edges_node;
}

export interface HomePageQueryNextPlixlife_textStripNew {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_textStripNew_edges[];
}

export interface HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges_node_metadata {
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

export interface HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges_node_metadata | null)[];
}

export interface HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges_node;
}

export interface HomePageQueryNextPlixlife_collectionList_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePageQueryNextPlixlife_collectionList_edges_node_collections_edges[];
}

export interface HomePageQueryNextPlixlife_collectionList_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  collections: HomePageQueryNextPlixlife_collectionList_edges_node_collections;
}

export interface HomePageQueryNextPlixlife_collectionList_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageQueryNextPlixlife_collectionList_edges_node;
}

export interface HomePageQueryNextPlixlife_collectionList {
  __typename: "SectionTypeCountableConnection";
  edges: HomePageQueryNextPlixlife_collectionList_edges[];
}

export interface HomePageQueryNextPlixlife_banners_edges_node {
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

export interface HomePageQueryNextPlixlife_banners_edges {
  __typename: "CustomBannerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HomePageQueryNextPlixlife_banners_edges_node | null;
}

export interface HomePageQueryNextPlixlife_banners {
  __typename: "CustomBannerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HomePageQueryNextPlixlife_banners_edges | null)[];
}

export interface HomePageQueryNextPlixlife {
  /**
   * Return information about the shop.
   */
  shop: HomePageQueryNextPlixlife_shop;
  subnavbarNew: HomePageQueryNextPlixlife_subnavbarNew | null;
  brandLogosNew: HomePageQueryNextPlixlife_brandLogosNew | null;
  bestSellersNew: HomePageQueryNextPlixlife_bestSellersNew | null;
  plantBasedSupplimentsNew: HomePageQueryNextPlixlife_plantBasedSupplimentsNew | null;
  collection1New: HomePageQueryNextPlixlife_collection1New | null;
  moneyBackGuarantee: HomePageQueryNextPlixlife_moneyBackGuarantee | null;
  nutritionistNew: HomePageQueryNextPlixlife_nutritionistNew | null;
  collection2New: HomePageQueryNextPlixlife_collection2New | null;
  collection3: HomePageQueryNextPlixlife_collection3 | null;
  collection4: HomePageQueryNextPlixlife_collection4 | null;
  testimonialsNew: HomePageQueryNextPlixlife_testimonialsNew | null;
  campaignSection: HomePageQueryNextPlixlife_campaignSection | null;
  textStripNew: HomePageQueryNextPlixlife_textStripNew | null;
  collectionList: HomePageQueryNextPlixlife_collectionList | null;
  banners: HomePageQueryNextPlixlife_banners | null;
  quizSection: any;
}
