/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetailsWithSection
// ====================================================

export interface ProductDetailsWithSection_product_thumbnail {
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

export interface ProductDetailsWithSection_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetailsWithSection_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_pricing_priceRange_start_net;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_pricing_priceRange_stop_net;
}

export interface ProductDetailsWithSection_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_product_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSection_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSection_product_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSection_product_pricing_priceRange | null;
}

export interface ProductDetailsWithSection_product_metadata {
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

export interface ProductDetailsWithSection_product_weight {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_thumbnail {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSection_product_category_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_images {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_weight {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price_net;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing_price | null;
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_attribute_metadata {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_attribute {
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
  metadata: (ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_values {
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

export interface ProductDetailsWithSection_product_category_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSection_product_category_products_edges_node_variants_attributes_values | null)[];
}

export interface ProductDetailsWithSection_product_category_products_edges_node_variants {
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
  images: (ProductDetailsWithSection_product_category_products_edges_node_variants_images | null)[] | null;
  weight: ProductDetailsWithSection_product_category_products_edges_node_variants_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_product_category_products_edges_node_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSection_product_category_products_edges_node_variants_attributes[];
}

export interface ProductDetailsWithSection_product_category_products_edges_node_metadata {
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

export interface ProductDetailsWithSection_product_category_products_edges_node {
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
  thumbnail: ProductDetailsWithSection_product_category_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetailsWithSection_product_category_products_edges_node_thumbnail2x | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_product_category_products_edges_node_pricing | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSection_product_category_products_edges_node_variants | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_product_category_products_edges_node_metadata | null)[];
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  availableForPurchase: any | null;
}

export interface ProductDetailsWithSection_product_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_product_category_products_edges_node;
}

export interface ProductDetailsWithSection_product_category_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetailsWithSection_product_category_products_edges[];
}

export interface ProductDetailsWithSection_product_category {
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
  products: ProductDetailsWithSection_product_category_products | null;
}

export interface ProductDetailsWithSection_product_images {
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

export interface ProductDetailsWithSection_product_attributes_attribute {
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

export interface ProductDetailsWithSection_product_attributes_values {
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

export interface ProductDetailsWithSection_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSection_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSection_product_attributes_values | null)[];
}

export interface ProductDetailsWithSection_product_variants_images {
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

export interface ProductDetailsWithSection_product_variants_weight {
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

export interface ProductDetailsWithSection_product_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_product_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_variants_pricing_price_net;
}

export interface ProductDetailsWithSection_product_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_product_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_product_variants_pricing_price | null;
}

export interface ProductDetailsWithSection_product_variants_attributes_attribute_metadata {
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

export interface ProductDetailsWithSection_product_variants_attributes_attribute {
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
  metadata: (ProductDetailsWithSection_product_variants_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSection_product_variants_attributes_values {
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

export interface ProductDetailsWithSection_product_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSection_product_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSection_product_variants_attributes_values | null)[];
}

export interface ProductDetailsWithSection_product_variants {
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
  images: (ProductDetailsWithSection_product_variants_images | null)[] | null;
  weight: ProductDetailsWithSection_product_variants_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_product_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSection_product_variants_attributes[];
}

export interface ProductDetailsWithSection_product_defaultVariant_images {
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

export interface ProductDetailsWithSection_product_defaultVariant_weight {
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

export interface ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_product_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_product_defaultVariant_pricing_price_net;
}

export interface ProductDetailsWithSection_product_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_product_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_product_defaultVariant_pricing_price | null;
}

export interface ProductDetailsWithSection_product_defaultVariant_attributes_attribute_metadata {
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

export interface ProductDetailsWithSection_product_defaultVariant_attributes_attribute {
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
  metadata: (ProductDetailsWithSection_product_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsWithSection_product_defaultVariant_attributes_values {
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

export interface ProductDetailsWithSection_product_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsWithSection_product_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsWithSection_product_defaultVariant_attributes_values | null)[];
}

export interface ProductDetailsWithSection_product_defaultVariant {
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
  images: (ProductDetailsWithSection_product_defaultVariant_images | null)[] | null;
  weight: ProductDetailsWithSection_product_defaultVariant_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_product_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsWithSection_product_defaultVariant_attributes[];
}

export interface ProductDetailsWithSection_product {
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
  thumbnail: ProductDetailsWithSection_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetailsWithSection_product_thumbnail2x | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_product_pricing | null;
  descriptionJson: any;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_product_metadata | null)[];
  weight: ProductDetailsWithSection_product_weight | null;
  category: ProductDetailsWithSection_product_category | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsWithSection_product_images | null)[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetailsWithSection_product_attributes[];
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSection_product_variants | null)[] | null;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  availableForPurchase: any | null;
  defaultVariant: ProductDetailsWithSection_product_defaultVariant | null;
}

export interface ProductDetailsWithSection_section_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_images_edges_node {
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

export interface ProductDetailsWithSection_section_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node_images_edges_node | null;
}

export interface ProductDetailsWithSection_section_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges_node_images_edges | null)[];
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_backgroundImage {
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

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants {
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
  images: (ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetailsWithSection_section_edges_node_collections_edges_node_products_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges_node {
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
  backgroundImage: ProductDetailsWithSection_section_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: ProductDetailsWithSection_section_edges_node_collections_edges_node_products | null;
}

export interface ProductDetailsWithSection_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_collections_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductDetailsWithSection_section_edges_node_collections_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_images_edges_node {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_images_edges_node | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges_node_children_edges_node_images_edges | null)[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_backgroundImage {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants {
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
  images: (ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node {
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
  backgroundImage: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node_products | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductDetailsWithSection_section_edges_node_children_edges_node_collections_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images_edges_node {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images_edges_node | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images_edges | null)[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_backgroundImage {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants {
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
  images: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node {
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
  backgroundImage: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node_products | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges_node;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections_edges[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node {
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
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_metadata | null)[];
  images: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_images;
  collections: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node_collections;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges {
  __typename: "SectionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges_node | null;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node_children {
  __typename: "SectionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges_node_children_edges_node_children_edges | null)[];
}

export interface ProductDetailsWithSection_section_edges_node_children_edges_node {
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
  metadata: (ProductDetailsWithSection_section_edges_node_children_edges_node_metadata | null)[];
  images: ProductDetailsWithSection_section_edges_node_children_edges_node_images;
  collections: ProductDetailsWithSection_section_edges_node_children_edges_node_collections;
  children: ProductDetailsWithSection_section_edges_node_children_edges_node_children;
}

export interface ProductDetailsWithSection_section_edges_node_children_edges {
  __typename: "SectionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node_children_edges_node | null;
}

export interface ProductDetailsWithSection_section_edges_node_children {
  __typename: "SectionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges_node_children_edges | null)[];
}

export interface ProductDetailsWithSection_section_edges_node {
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
  metadata: (ProductDetailsWithSection_section_edges_node_metadata | null)[];
  images: ProductDetailsWithSection_section_edges_node_images;
  collections: ProductDetailsWithSection_section_edges_node_collections;
  children: ProductDetailsWithSection_section_edges_node_children;
}

export interface ProductDetailsWithSection_section_edges {
  __typename: "SectionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsWithSection_section_edges_node | null;
}

export interface ProductDetailsWithSection_section {
  __typename: "SectionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsWithSection_section_edges | null)[];
}

export interface ProductDetailsWithSection {
  /**
   * Look up a product by ID.
   */
  product: ProductDetailsWithSection_product | null;
  section: ProductDetailsWithSection_section | null;
}

export interface ProductDetailsWithSectionVariables {
  id: string;
  sectionId?: string | null;
  sectionName?: string | null;
}
