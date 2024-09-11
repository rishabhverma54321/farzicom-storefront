/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetailsWithSlug
// ====================================================

export interface ProductDetailsWithSlug_product_thumbnail {
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

export interface ProductDetailsWithSlug_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_pricing_priceRange_start_net;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_pricing_priceRange_stop_net;
}

export interface ProductDetailsWithSlug_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSlug_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSlug_product_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSlug_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSlug_product_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSlug_product_pricing_priceRange | null;
}

export interface ProductDetailsWithSlug_product_metadata {
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

export interface ProductDetailsWithSlug_product_weight {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_thumbnail {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSlug_product_category_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_images {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_weight {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing_price | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_attribute_metadata {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_attribute {
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
  metadata: (ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_values {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes_values | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants_metadata {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_variants {
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
  images: (ProductDetailsWithSlug_product_category_products_edges_node_variants_images | null)[] | null;
  weight: ProductDetailsWithSlug_product_category_products_edges_node_variants_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSlug_product_category_products_edges_node_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSlug_product_category_products_edges_node_variants_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_category_products_edges_node_variants_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_images {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_weight {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price_net;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing_price | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_attribute {
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
  metadata: (ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_values {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_metadata {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant {
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
  images: (ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_images | null)[] | null;
  weight: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_category_products_edges_node_metadata {
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

export interface ProductDetailsWithSlug_product_category_products_edges_node {
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
  thumbnail: ProductDetailsWithSlug_product_category_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetailsWithSlug_product_category_products_edges_node_thumbnail2x | null;
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
  pricing: ProductDetailsWithSlug_product_category_products_edges_node_pricing | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSlug_product_category_products_edges_node_variants | null)[] | null;
  defaultVariant: ProductDetailsWithSlug_product_category_products_edges_node_defaultVariant | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_category_products_edges_node_metadata | null)[];
  availableForPurchase: any | null;
}

export interface ProductDetailsWithSlug_product_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSlug_product_category_products_edges_node;
}

export interface ProductDetailsWithSlug_product_category_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetailsWithSlug_product_category_products_edges[];
}

export interface ProductDetailsWithSlug_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * List of products in the category.
   */
  products: ProductDetailsWithSlug_product_category_products | null;
}

export interface ProductDetailsWithSlug_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSlug_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface ProductDetailsWithSlug_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
}

export interface ProductDetailsWithSlug_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSlug_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSlug_product_attributes_values | null)[];
}

export interface ProductDetailsWithSlug_product_variants_images {
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

export interface ProductDetailsWithSlug_product_variants_weight {
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

export interface ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSlug_product_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_variants_pricing_price_net;
}

export interface ProductDetailsWithSlug_product_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSlug_product_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSlug_product_variants_pricing_price | null;
}

export interface ProductDetailsWithSlug_product_variants_attributes_attribute_metadata {
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

export interface ProductDetailsWithSlug_product_variants_attributes_attribute {
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
  metadata: (ProductDetailsWithSlug_product_variants_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_variants_attributes_values {
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

export interface ProductDetailsWithSlug_product_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSlug_product_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSlug_product_variants_attributes_values | null)[];
}

export interface ProductDetailsWithSlug_product_variants_metadata {
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

export interface ProductDetailsWithSlug_product_variants {
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
  images: (ProductDetailsWithSlug_product_variants_images | null)[] | null;
  weight: ProductDetailsWithSlug_product_variants_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSlug_product_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSlug_product_variants_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_variants_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_defaultVariant_images {
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

export interface ProductDetailsWithSlug_product_defaultVariant_weight {
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

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSlug_product_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSlug_product_defaultVariant_pricing_price_net;
}

export interface ProductDetailsWithSlug_product_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSlug_product_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSlug_product_defaultVariant_pricing_price | null;
}

export interface ProductDetailsWithSlug_product_defaultVariant_attributes_attribute_metadata {
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

export interface ProductDetailsWithSlug_product_defaultVariant_attributes_attribute {
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
  metadata: (ProductDetailsWithSlug_product_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSlug_product_defaultVariant_attributes_values {
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

export interface ProductDetailsWithSlug_product_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSlug_product_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSlug_product_defaultVariant_attributes_values | null)[];
}

export interface ProductDetailsWithSlug_product_defaultVariant_metadata {
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

export interface ProductDetailsWithSlug_product_defaultVariant {
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
  images: (ProductDetailsWithSlug_product_defaultVariant_images | null)[] | null;
  weight: ProductDetailsWithSlug_product_defaultVariant_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSlug_product_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSlug_product_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_defaultVariant_metadata | null)[];
}

export interface ProductDetailsWithSlug_product {
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
  thumbnail: ProductDetailsWithSlug_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetailsWithSlug_product_thumbnail2x | null;
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
  pricing: ProductDetailsWithSlug_product_pricing | null;
  descriptionJson: any;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSlug_product_metadata | null)[];
  weight: ProductDetailsWithSlug_product_weight | null;
  category: ProductDetailsWithSlug_product_category | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsWithSlug_product_images | null)[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetailsWithSlug_product_attributes[];
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSlug_product_variants | null)[] | null;
  defaultVariant: ProductDetailsWithSlug_product_defaultVariant | null;
  seoDescription: string | null;
  seoTitle: string | null;
  availableForPurchase: any | null;
}

export interface ProductDetailsWithSlug {
  /**
   * Look up a product by ID.
   */
  product: ProductDetailsWithSlug_product | null;
}

export interface ProductDetailsWithSlugVariables {
  slug?: string | null;
}
