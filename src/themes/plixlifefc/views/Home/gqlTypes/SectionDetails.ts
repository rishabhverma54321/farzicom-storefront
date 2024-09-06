/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SectionDetails
// ====================================================

export interface SectionDetails_section_edges_node_metadata {
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

export interface SectionDetails_section_edges_node_images_edges_node {
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

export interface SectionDetails_section_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SectionDetails_section_edges_node_images_edges_node | null;
}

export interface SectionDetails_section_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SectionDetails_section_edges_node_images_edges | null)[];
}

export interface SectionDetails_section_edges_node_collections_edges_node_backgroundImage {
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

export interface SectionDetails_section_edges_node_collections_edges_node_metadata {
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

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_metadata {
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

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_images {
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

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing_price | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants {
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
  images: (SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_category | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetails_section_edges_node_collections_edges_node_products_edges_node_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (SectionDetails_section_edges_node_collections_edges_node_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SectionDetails_section_edges_node_collections_edges_node_products_edges_node_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SectionDetails_section_edges_node_collections_edges_node_products_edges_node_pricing | null;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetails_section_edges_node_collections_edges_node_products_edges_node;
}

export interface SectionDetails_section_edges_node_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: SectionDetails_section_edges_node_collections_edges_node_products_edges[];
}

export interface SectionDetails_section_edges_node_collections_edges_node {
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
  backgroundImage: SectionDetails_section_edges_node_collections_edges_node_backgroundImage | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetails_section_edges_node_collections_edges_node_metadata | null)[];
  /**
   * List of products in this collection.
   */
  products: SectionDetails_section_edges_node_collections_edges_node_products | null;
}

export interface SectionDetails_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetails_section_edges_node_collections_edges_node;
}

export interface SectionDetails_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SectionDetails_section_edges_node_collections_edges[];
}

export interface SectionDetails_section_edges_node {
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
  metadata: (SectionDetails_section_edges_node_metadata | null)[];
  images: SectionDetails_section_edges_node_images;
  collections: SectionDetails_section_edges_node_collections;
}

export interface SectionDetails_section_edges {
  __typename: "SectionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SectionDetails_section_edges_node | null;
}

export interface SectionDetails_section {
  __typename: "SectionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SectionDetails_section_edges | null)[];
}

export interface SectionDetails {
  section: SectionDetails_section | null;
}

export interface SectionDetailsVariables {
  firstPage: number;
  id?: string | null;
  name?: string | null;
}
