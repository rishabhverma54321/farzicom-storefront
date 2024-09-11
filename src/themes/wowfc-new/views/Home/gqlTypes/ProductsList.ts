/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BannerType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductsList_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface ProductsList_shop {
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
  homepageCollection: ProductsList_shop_homepageCollection | null;
}

export interface ProductsList_section_edges_node_metadata {
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

export interface ProductsList_section_edges_node_collections_edges_node_backgroundImage {
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

export interface ProductsList_section_edges_node_collections_edges_node_metadata {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_thumbnail {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_thumbnail2x {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant {
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
  metadata: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_metadata {
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

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants {
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
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_metadata | null)[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: ProductsList_section_edges_node_collections_edges_node_products_edges_node_category | null;
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
  metadata: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductsList_section_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductsList_section_edges_node_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * List of images for the product.
   */
  images: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  defaultVariant: ProductsList_section_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductsList_section_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface ProductsList_section_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsList_section_edges_node_collections_edges_node_products_edges_node;
}

export interface ProductsList_section_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: ProductsList_section_edges_node_collections_edges_node_products_edges[];
}

export interface ProductsList_section_edges_node_collections_edges_node {
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
  backgroundImage: ProductsList_section_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductsList_section_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: ProductsList_section_edges_node_collections_edges_node_products | null;
}

export interface ProductsList_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsList_section_edges_node_collections_edges_node;
}

export interface ProductsList_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductsList_section_edges_node_collections_edges[];
}

export interface ProductsList_section_edges_node {
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
  metadata: (ProductsList_section_edges_node_metadata | null)[];
  collections: ProductsList_section_edges_node_collections;
}

export interface ProductsList_section_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsList_section_edges_node;
}

export interface ProductsList_section {
  __typename: "SectionTypeCountableConnection";
  edges: ProductsList_section_edges[];
}

export interface ProductsList_banners_edges_node {
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

export interface ProductsList_banners_edges {
  __typename: "CustomBannerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductsList_banners_edges_node | null;
}

export interface ProductsList_banners {
  __typename: "CustomBannerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductsList_banners_edges | null)[];
}

export interface ProductsList {
  /**
   * Return information about the shop.
   */
  shop: ProductsList_shop;
  section: ProductsList_section | null;
  banners: ProductsList_banners | null;
}

export interface ProductsListVariables {
  firstPage: number;
  id?: string | null;
  name?: string | null;
}
