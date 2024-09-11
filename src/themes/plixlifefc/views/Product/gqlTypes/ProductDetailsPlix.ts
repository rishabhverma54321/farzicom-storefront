/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetailsPlix
// ====================================================

export interface ProductDetailsPlix_product_thumbnail {
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

export interface ProductDetailsPlix_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetailsPlix_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsPlix_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetailsPlix_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_pricing_priceRange_start_net;
}

export interface ProductDetailsPlix_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_pricing_priceRange_stop_net;
}

export interface ProductDetailsPlix_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetailsPlix_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetailsPlix_product_pricing_priceRange_stop | null;
}

export interface ProductDetailsPlix_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: ProductDetailsPlix_product_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetailsPlix_product_pricing_priceRange | null;
}

export interface ProductDetailsPlix_product_metadata {
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

export interface ProductDetailsPlix_product_weight {
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

export interface ProductDetailsPlix_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ProductDetailsPlix_product_images {
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

export interface ProductDetailsPlix_product_attributes_attribute {
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

export interface ProductDetailsPlix_product_attributes_values {
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

export interface ProductDetailsPlix_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsPlix_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsPlix_product_attributes_values | null)[];
}

export interface ProductDetailsPlix_product_variants_images {
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

export interface ProductDetailsPlix_product_variants_weight {
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

export interface ProductDetailsPlix_product_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetailsPlix_product_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_variants_pricing_price_net;
}

export interface ProductDetailsPlix_product_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsPlix_product_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsPlix_product_variants_pricing_price | null;
}

export interface ProductDetailsPlix_product_variants_attributes_attribute_metadata {
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

export interface ProductDetailsPlix_product_variants_attributes_attribute {
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
  metadata: (ProductDetailsPlix_product_variants_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsPlix_product_variants_attributes_values {
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

export interface ProductDetailsPlix_product_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsPlix_product_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsPlix_product_variants_attributes_values | null)[];
}

export interface ProductDetailsPlix_product_variants_metadata {
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

export interface ProductDetailsPlix_product_variants {
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
  images: (ProductDetailsPlix_product_variants_images | null)[] | null;
  weight: ProductDetailsPlix_product_variants_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsPlix_product_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsPlix_product_variants_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsPlix_product_variants_metadata | null)[];
}

export interface ProductDetailsPlix_product_defaultVariant_images {
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

export interface ProductDetailsPlix_product_defaultVariant_weight {
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

export interface ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted_net;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductDetailsPlix_product_defaultVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductDetailsPlix_product_defaultVariant_pricing_price_net;
}

export interface ProductDetailsPlix_product_defaultVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductDetailsPlix_product_defaultVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductDetailsPlix_product_defaultVariant_pricing_price | null;
}

export interface ProductDetailsPlix_product_defaultVariant_attributes_attribute_metadata {
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

export interface ProductDetailsPlix_product_defaultVariant_attributes_attribute {
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
  metadata: (ProductDetailsPlix_product_defaultVariant_attributes_attribute_metadata | null)[];
}

export interface ProductDetailsPlix_product_defaultVariant_attributes_values {
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

export interface ProductDetailsPlix_product_defaultVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetailsPlix_product_defaultVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetailsPlix_product_defaultVariant_attributes_values | null)[];
}

export interface ProductDetailsPlix_product_defaultVariant_metadata {
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

export interface ProductDetailsPlix_product_defaultVariant {
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
  images: (ProductDetailsPlix_product_defaultVariant_images | null)[] | null;
  weight: ProductDetailsPlix_product_defaultVariant_weight | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetailsPlix_product_defaultVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetailsPlix_product_defaultVariant_attributes[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsPlix_product_defaultVariant_metadata | null)[];
}

export interface ProductDetailsPlix_product {
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
  thumbnail: ProductDetailsPlix_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetailsPlix_product_thumbnail2x | null;
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
  pricing: ProductDetailsPlix_product_pricing | null;
  descriptionJson: any;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsPlix_product_metadata | null)[];
  weight: ProductDetailsPlix_product_weight | null;
  category: ProductDetailsPlix_product_category | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetailsPlix_product_images | null)[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetailsPlix_product_attributes[];
  /**
   * List of variants for the product.
   */
  variants: (ProductDetailsPlix_product_variants | null)[] | null;
  seoDescription: string | null;
  seoTitle: string | null;
  availableForPurchase: any | null;
  defaultVariant: ProductDetailsPlix_product_defaultVariant | null;
}

export interface ProductDetailsPlix_pledgeATree_edges_node_metadata {
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

export interface ProductDetailsPlix_pledgeATree_edges_node {
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
  metadata: (ProductDetailsPlix_pledgeATree_edges_node_metadata | null)[];
}

export interface ProductDetailsPlix_pledgeATree_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsPlix_pledgeATree_edges_node;
}

export interface ProductDetailsPlix_pledgeATree {
  __typename: "SectionTypeCountableConnection";
  edges: ProductDetailsPlix_pledgeATree_edges[];
}

export interface ProductDetailsPlix_moneyBackGuarantee_edges_node_metadata {
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

export interface ProductDetailsPlix_moneyBackGuarantee_edges_node {
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
  metadata: (ProductDetailsPlix_moneyBackGuarantee_edges_node_metadata | null)[];
}

export interface ProductDetailsPlix_moneyBackGuarantee_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsPlix_moneyBackGuarantee_edges_node;
}

export interface ProductDetailsPlix_moneyBackGuarantee {
  __typename: "SectionTypeCountableConnection";
  edges: ProductDetailsPlix_moneyBackGuarantee_edges[];
}

export interface ProductDetailsPlix_collectionList_edges_node_collections_edges_node_metadata {
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

export interface ProductDetailsPlix_collectionList_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetailsPlix_collectionList_edges_node_collections_edges_node_metadata | null)[];
}

export interface ProductDetailsPlix_collectionList_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsPlix_collectionList_edges_node_collections_edges_node;
}

export interface ProductDetailsPlix_collectionList_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductDetailsPlix_collectionList_edges_node_collections_edges[];
}

export interface ProductDetailsPlix_collectionList_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  collections: ProductDetailsPlix_collectionList_edges_node_collections;
}

export interface ProductDetailsPlix_collectionList_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsPlix_collectionList_edges_node;
}

export interface ProductDetailsPlix_collectionList {
  __typename: "SectionTypeCountableConnection";
  edges: ProductDetailsPlix_collectionList_edges[];
}

export interface ProductDetailsPlix_productReviews_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface ProductDetailsPlix_productReviews_edges_node_images_edges_node {
  __typename: "ProductReviewImageType";
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

export interface ProductDetailsPlix_productReviews_edges_node_images_edges {
  __typename: "ProductReviewImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetailsPlix_productReviews_edges_node_images_edges_node | null;
}

export interface ProductDetailsPlix_productReviews_edges_node_images {
  __typename: "ProductReviewImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetailsPlix_productReviews_edges_node_images_edges | null)[];
}

export interface ProductDetailsPlix_productReviews_edges_node {
  __typename: "ProductReviewType";
  /**
   * The ID of the object.
   */
  id: string;
  review: string;
  rating: number;
  created: any;
  adminReply: string;
  title: string | null;
  rated: string | null;
  verified: boolean;
  helpfulRatings: number;
  isPublished: boolean;
  unhelpfulRatings: number;
  userName: string | null;
  user: ProductDetailsPlix_productReviews_edges_node_user | null;
  images: ProductDetailsPlix_productReviews_edges_node_images;
}

export interface ProductDetailsPlix_productReviews_edges {
  __typename: "ProductReviewTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetailsPlix_productReviews_edges_node;
}

export interface ProductDetailsPlix_productReviews {
  __typename: "ProductReviewTypeCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductDetailsPlix_productReviews_edges[];
}

export interface ProductDetailsPlix {
  /**
   * Look up a product by ID.
   */
  product: ProductDetailsPlix_product | null;
  pledgeATree: ProductDetailsPlix_pledgeATree | null;
  moneyBackGuarantee: ProductDetailsPlix_moneyBackGuarantee | null;
  collectionList: ProductDetailsPlix_collectionList | null;
  productReviews: ProductDetailsPlix_productReviews | null;
}

export interface ProductDetailsPlixVariables {
  id: string;
}
