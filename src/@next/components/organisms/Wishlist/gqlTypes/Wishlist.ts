/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Wishlist
// ====================================================

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_metadata {
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

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_images {
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

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted_net;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price_net;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing_price | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants {
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
  images: (Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants_pricing | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start_gross;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop_gross;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start_net;
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start_gross;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop_net;
  /**
   * Amount of money including taxes.
   */
  gross: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop_gross;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange_stop | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing_priceRange | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_metadata | null)[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_thumbnail | null;
  /**
   * List of images for the product.
   */
  images: (Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_variants | null)[] | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product_pricing | null;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: Wishlist_wishlist_edges_node_wishlist_items_edges_node_product;
}

export interface Wishlist_wishlist_edges_node_wishlist_items_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_wishlist_edges_node_wishlist_items_edges_node;
}

export interface Wishlist_wishlist_edges_node_wishlist_items {
  __typename: "WishlistItemCountableConnection";
  edges: Wishlist_wishlist_edges_node_wishlist_items_edges[];
}

export interface Wishlist_wishlist_edges_node_wishlist {
  __typename: "Wishlist";
  /**
   * The ID of the object.
   */
  id: string;
  items: Wishlist_wishlist_edges_node_wishlist_items;
}

export interface Wishlist_wishlist_edges_node {
  __typename: "WishlistItem";
  wishlist: Wishlist_wishlist_edges_node_wishlist;
}

export interface Wishlist_wishlist_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_wishlist_edges_node;
}

export interface Wishlist_wishlist {
  __typename: "WishlistItemCountableConnection";
  edges: Wishlist_wishlist_edges[];
}

export interface Wishlist {
  /**
   * User's wishlist.
   */
  wishlist: Wishlist_wishlist | null;
}

export interface WishlistVariables {
  first: number;
}
