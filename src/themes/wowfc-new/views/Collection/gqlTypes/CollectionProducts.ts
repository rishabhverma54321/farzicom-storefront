/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder, WeightUnitsEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CollectionProducts
// ====================================================

export interface CollectionProducts_collection_products_edges_node_thumbnail {
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

export interface CollectionProducts_collection_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CollectionProducts_collection_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: CollectionProducts_collection_products_edges_node_pricing_priceRange | null;
}

export interface CollectionProducts_collection_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface CollectionProducts_collection_products_edges_node_collections {
  __typename: "Collection";
  name: string;
}

export interface CollectionProducts_collection_products_edges_node_metadata {
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

export interface CollectionProducts_collection_products_edges_node_variants_images {
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

export interface CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_variants_pricing_price_net;
}

export interface CollectionProducts_collection_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: CollectionProducts_collection_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: CollectionProducts_collection_products_edges_node_variants_pricing_price | null;
}

export interface CollectionProducts_collection_products_edges_node_variants {
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
  images: (CollectionProducts_collection_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CollectionProducts_collection_products_edges_node_variants_pricing | null;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_images {
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

export interface CollectionProducts_collection_products_edges_node_defaultVariant_weight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price_net;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: CollectionProducts_collection_products_edges_node_defaultVariant_pricing_price | null;
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface CollectionProducts_collection_products_edges_node_defaultVariant_attributes_attribute {
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
  metadata: (CollectionProducts_collection_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_attributes_values {
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

export interface CollectionProducts_collection_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CollectionProducts_collection_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CollectionProducts_collection_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface CollectionProducts_collection_products_edges_node_defaultVariant_metadata {
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

export interface CollectionProducts_collection_products_edges_node_defaultVariant {
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
  images: (CollectionProducts_collection_products_edges_node_defaultVariant_images | null)[] | null;
  weight: CollectionProducts_collection_products_edges_node_defaultVariant_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CollectionProducts_collection_products_edges_node_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CollectionProducts_collection_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CollectionProducts_collection_products_edges_node_defaultVariant_metadata | null)[];
}

export interface CollectionProducts_collection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CollectionProducts_collection_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CollectionProducts_collection_products_edges_node_thumbnail2x | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CollectionProducts_collection_products_edges_node_pricing | null;
  category: CollectionProducts_collection_products_edges_node_category | null;
  /**
   * List of collections for the product.
   */
  collections: (CollectionProducts_collection_products_edges_node_collections | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CollectionProducts_collection_products_edges_node_metadata | null)[];
  /**
   * List of variants for the product.
   */
  variants: (CollectionProducts_collection_products_edges_node_variants | null)[] | null;
  defaultVariant: CollectionProducts_collection_products_edges_node_defaultVariant | null;
}

export interface CollectionProducts_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionProducts_collection_products_edges_node;
}

export interface CollectionProducts_collection_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface CollectionProducts_collection_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: CollectionProducts_collection_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionProducts_collection_products_pageInfo;
}

export interface CollectionProducts_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  products: CollectionProducts_collection_products | null;
}

export interface CollectionProducts {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionProducts_collection | null;
}

export interface CollectionProductsVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
