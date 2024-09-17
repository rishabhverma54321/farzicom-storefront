/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: ProductVariantFieldsShop
// ====================================================

export interface ProductVariantFieldsShop_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  sortOrder: number | null;
  alt: string;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductVariantFieldsShop_weight {
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

export interface ProductVariantFieldsShop_metadata {
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

export interface ProductVariantFieldsShop_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductVariantFieldsShop_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductVariantFieldsShop_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductVariantFieldsShop_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductVariantFieldsShop_pricing_priceUndiscounted_net;
}

export interface ProductVariantFieldsShop_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductVariantFieldsShop_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductVariantFieldsShop_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductVariantFieldsShop_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductVariantFieldsShop_pricing_price_net;
}

export interface ProductVariantFieldsShop_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductVariantFieldsShop_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductVariantFieldsShop_pricing_price | null;
}

export interface ProductVariantFieldsShop_attributes_attribute_metadata {
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

export interface ProductVariantFieldsShop_attributes_attribute {
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
  metadata: (ProductVariantFieldsShop_attributes_attribute_metadata | null)[];
}

export interface ProductVariantFieldsShop_attributes_values {
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

export interface ProductVariantFieldsShop_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariantFieldsShop_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariantFieldsShop_attributes_values | null)[];
}

export interface ProductVariantFieldsShop {
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
  images: (ProductVariantFieldsShop_images | null)[] | null;
  weight: ProductVariantFieldsShop_weight | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductVariantFieldsShop_metadata | null)[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductVariantFieldsShop_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductVariantFieldsShop_attributes[];
}
