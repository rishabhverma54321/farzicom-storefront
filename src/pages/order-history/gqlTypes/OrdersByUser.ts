/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { JobStatusEnum, PaymentChargeStatusEnum, WeightUnitsEnum } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: OrdersByUser
// ====================================================

export interface OrdersByUser_me_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface OrdersByUser_me_orders_edges_node_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  postalCode: string;
}

export interface OrdersByUser_me_orders_edges_node_invoices_metadata {
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

export interface OrdersByUser_me_orders_edges_node_invoices {
  __typename: "Invoice";
  /**
   * Created date time of job in ISO 8601 format.
   */
  createdAt: any;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Job message.
   */
  message: string | null;
  externalUrl: string | null;
  number: string | null;
  /**
   * Job status.
   */
  status: JobStatusEnum;
  /**
   * Date time of job last update in ISO 8601 format.
   */
  updatedAt: any;
  /**
   * URL to download an invoice.
   */
  url: string | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrdersByUser_me_orders_edges_node_invoices_metadata | null)[];
}

export interface OrdersByUser_me_orders_edges_node_metadata {
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

export interface OrdersByUser_me_orders_edges_node_total_gross {
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

export interface OrdersByUser_me_orders_edges_node_total_net {
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

export interface OrdersByUser_me_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrdersByUser_me_orders_edges_node_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrdersByUser_me_orders_edges_node_total_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_images {
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

export interface OrdersByUser_me_orders_edges_node_lines_variant_weight {
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

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_weight {
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

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_metadata {
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

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_discount_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_discount {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_discount_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange_start_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange_start | null;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted_start_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted_start | null;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discount amount if in sale (null otherwise).
   */
  discount: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_discount | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRange | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing_priceRangeUndiscounted | null;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  weight: OrdersByUser_me_orders_edges_node_lines_variant_product_weight | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrdersByUser_me_orders_edges_node_lines_variant_product_metadata | null)[];
  category: OrdersByUser_me_orders_edges_node_lines_variant_product_category | null;
  name: string;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: OrdersByUser_me_orders_edges_node_lines_variant_product_pricing | null;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product variant.
   */
  images: (OrdersByUser_me_orders_edges_node_lines_variant_images | null)[] | null;
  weight: OrdersByUser_me_orders_edges_node_lines_variant_weight | null;
  sku: string;
  name: string;
  product: OrdersByUser_me_orders_edges_node_lines_variant_product;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  quantity: number;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrdersByUser_me_orders_edges_node_lines_variant | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrdersByUser_me_orders_edges_node_lines_thumbnail | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail2x: OrdersByUser_me_orders_edges_node_lines_thumbnail2x | null;
}

export interface OrdersByUser_me_orders_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  shippingAddress: OrdersByUser_me_orders_edges_node_shippingAddress | null;
  /**
   * List of order invoices.
   */
  invoices: (OrdersByUser_me_orders_edges_node_invoices | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrdersByUser_me_orders_edges_node_metadata | null)[];
  privateMetadata: (OrdersByUser_me_orders_edges_node_metadata | null)[];
  token: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string | null;
  created: any;
  /**
   * Total amount of the order.
   */
  total: OrdersByUser_me_orders_edges_node_total | null;
  /**
   * List of order lines.
   */
  lines: (OrdersByUser_me_orders_edges_node_lines | null)[];
}

export interface OrdersByUser_me_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: OrdersByUser_me_orders_edges_node;
}

export interface OrdersByUser_me_orders {
  __typename: "OrderCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: OrdersByUser_me_orders_pageInfo;
  edges: OrdersByUser_me_orders_edges[];
}

export interface OrdersByUser_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of user's orders.
   */
  orders: OrdersByUser_me_orders | null;
}

export interface OrdersByUser {
  /**
   * Return the currently authenticated user.
   */
  me: OrdersByUser_me | null;
}

export interface OrdersByUserVariables {
  perPage: number;
  after?: string | null;
}
