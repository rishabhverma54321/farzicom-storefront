/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SectionDetailsWithoutChildrenPlix
// ====================================================

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_backgroundImage {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_images_edges_node {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SectionDetailsWithoutChildrenPlix_section_edges_node_images_edges_node | null;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SectionDetailsWithoutChildrenPlix_section_edges_node_images_edges | null)[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_metadata {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_backgroundImage {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_metadata {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_images {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_weight {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted_net;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price_net;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing_price | null;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute {
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
  metadata: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values {
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

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes_values | null)[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant {
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
  images: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_images | null)[] | null;
  weight: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_weight | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_metadata | null)[];
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant_attributes[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  category: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  defaultVariant: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node_defaultVariant | null;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges_node;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products_edges[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node {
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
  backgroundImage: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node_products | null;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges_node;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SectionDetailsWithoutChildrenPlix_section_edges_node_collections_edges[];
}

export interface SectionDetailsWithoutChildrenPlix_section_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  backgroundImage: SectionDetailsWithoutChildrenPlix_section_edges_node_backgroundImage | null;
  images: SectionDetailsWithoutChildrenPlix_section_edges_node_images;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetailsWithoutChildrenPlix_section_edges_node_metadata | null)[];
  collections: SectionDetailsWithoutChildrenPlix_section_edges_node_collections;
}

export interface SectionDetailsWithoutChildrenPlix_section_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetailsWithoutChildrenPlix_section_edges_node;
}

export interface SectionDetailsWithoutChildrenPlix_section {
  __typename: "SectionTypeCountableConnection";
  edges: SectionDetailsWithoutChildrenPlix_section_edges[];
}

export interface SectionDetailsWithoutChildrenPlix {
  section: SectionDetailsWithoutChildrenPlix_section | null;
}

export interface SectionDetailsWithoutChildrenPlixVariables {
  firstPage: number;
  id?: string | null;
  name?: string | null;
}
