/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductFilterInput, WeightUnitsEnum } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ShopNextProducts
// ====================================================

export interface ShopNextProducts_products_edges_node_thumbnail {
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

export interface ShopNextProducts_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ShopNextProducts_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopNextProducts_products_edges_node_metadata {
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

export interface ShopNextProducts_products_edges_node_weight {
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

export interface ShopNextProducts_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopNextProducts_products_edges_node_attributes_attribute {
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

export interface ShopNextProducts_products_edges_node_attributes_values {
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

export interface ShopNextProducts_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ShopNextProducts_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ShopNextProducts_products_edges_node_attributes_values | null)[];
}

export interface ShopNextProducts_products_edges_node_defaultVariant_images {
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

export interface ShopNextProducts_products_edges_node_defaultVariant_weight {
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

export interface ShopNextProducts_products_edges_node_defaultVariant_metadata {
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

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShopNextProducts_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopNextProducts_products_edges_node_defaultVariant_pricing_price_net;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ShopNextProducts_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ShopNextProducts_products_edges_node_defaultVariant_pricing_price | null;
}

export interface ShopNextProducts_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface ShopNextProducts_products_edges_node_defaultVariant_attributes_attribute {
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
  metadata: (ShopNextProducts_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface ShopNextProducts_products_edges_node_defaultVariant_attributes_values {
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

export interface ShopNextProducts_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ShopNextProducts_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ShopNextProducts_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface ShopNextProducts_products_edges_node_defaultVariant {
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
  images: (ShopNextProducts_products_edges_node_defaultVariant_images | null)[] | null;
  weight: ShopNextProducts_products_edges_node_defaultVariant_weight | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopNextProducts_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ShopNextProducts_products_edges_node_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ShopNextProducts_products_edges_node_defaultVariant_attributes[];
}

export interface ShopNextProducts_products_edges_node {
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
  thumbnail: ShopNextProducts_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ShopNextProducts_products_edges_node_thumbnail2x | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  descriptionJson: any;
  productType: ShopNextProducts_products_edges_node_productType;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopNextProducts_products_edges_node_metadata | null)[];
  weight: ShopNextProducts_products_edges_node_weight | null;
  category: ShopNextProducts_products_edges_node_category | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ShopNextProducts_products_edges_node_attributes[];
  availableForPurchase: any | null;
  defaultVariant: ShopNextProducts_products_edges_node_defaultVariant | null;
}

export interface ShopNextProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopNextProducts_products_edges_node;
}

export interface ShopNextProducts_products {
  __typename: "ProductCountableConnection";
  edges: ShopNextProducts_products_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ShopNextProducts {
  /**
   * List of the shop's products.
   */
  products: ShopNextProducts_products | null;
}

export interface ShopNextProductsVariables {
  filter?: ProductFilterInput | null;
  first?: number | null;
}
