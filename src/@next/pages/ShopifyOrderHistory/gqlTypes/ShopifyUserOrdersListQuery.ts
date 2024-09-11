/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ShopifyUserOrdersListQuery
// ====================================================

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_order_metadata {
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

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_order_total_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_order_total_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_order_total {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersListQuery_shopifyUserOrders_order_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersListQuery_shopifyUserOrders_order_total_net;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_order {
  __typename: "Order";
  trackingClientId: string;
  status: OrderStatus;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string | null;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopifyUserOrdersListQuery_shopifyUserOrders_order_metadata | null)[];
  /**
   * Total amount of the order.
   */
  total: ShopifyUserOrdersListQuery_shopifyUserOrders_order_total | null;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_lines_variant_images {
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

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_lines_variant {
  __typename: "ProductVariant";
  /**
   * List of images for the product variant.
   */
  images: (ShopifyUserOrdersListQuery_shopifyUserOrders_lines_variant_images | null)[] | null;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders_lines {
  __typename: "OrderLine";
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: ShopifyUserOrdersListQuery_shopifyUserOrders_lines_variant | null;
}

export interface ShopifyUserOrdersListQuery_shopifyUserOrders {
  __typename: "ShopifyOrderType";
  /**
   * Order
   */
  order: ShopifyUserOrdersListQuery_shopifyUserOrders_order | null;
  /**
   * List of order lines.
   */
  lines: (ShopifyUserOrdersListQuery_shopifyUserOrders_lines | null)[] | null;
}

export interface ShopifyUserOrdersListQuery {
  shopifyUserOrders: (ShopifyUserOrdersListQuery_shopifyUserOrders | null)[] | null;
}

export interface ShopifyUserOrdersListQueryVariables {
  userId?: string | null;
}
