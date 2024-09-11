/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderB2BSearchFilter, OrderStatus } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: OrderListQuery
// ====================================================

export interface OrderListQuery_ordersb2b_pageInfo {
  __typename: "pageInfoType";
  hasNextPage: boolean | null;
  endCursor: string | null;
}

export interface OrderListQuery_ordersb2b_order_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
}

export interface OrderListQuery_ordersb2b_order_metadata {
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

export interface OrderListQuery_ordersb2b_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  status: OrderStatus;
  created: any;
  /**
   * List of order lines.
   */
  lines: (OrderListQuery_ordersb2b_order_lines | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrderListQuery_ordersb2b_order_metadata | null)[];
}

export interface OrderListQuery_ordersb2b_shipments_items {
  __typename: "ShipmentItemType";
  /**
   * The ID of the object.
   */
  id: string;
  itemName: string;
}

export interface OrderListQuery_ordersb2b_shipments {
  __typename: "ShipmentType";
  /**
   * The ID of the object.
   */
  id: string;
  shipmentId: string | null;
  status: string | null;
  pendingQuantity: number | null;
  dispatchItemQuantity: number | null;
  createdAt: any;
  isCancelled: boolean;
  cancelledAt: any | null;
  /**
   * A list of shipment items, each containing information about an item in the shipment.
   */
  items: (OrderListQuery_ordersb2b_shipments_items | null)[] | null;
}

export interface OrderListQuery_ordersb2b_buyerCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderListQuery_ordersb2b_buyerCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: OrderListQuery_ordersb2b_buyerCompany_avatar | null;
}

export interface OrderListQuery_ordersb2b_supplierCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderListQuery_ordersb2b_supplierCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: OrderListQuery_ordersb2b_supplierCompany_avatar | null;
}

export interface OrderListQuery_ordersb2b {
  __typename: "OrderB2BType";
  id: string;
  /**
   * page info
   */
  pageInfo: OrderListQuery_ordersb2b_pageInfo | null;
  /**
   * pending quantity of shipment of particular order
   */
  pendingQuantity: number | null;
  /**
   * type of order
   */
  order: OrderListQuery_ordersb2b_order | null;
  /**
   * List of shipments associated with orders
   */
  shipments: (OrderListQuery_ordersb2b_shipments | null)[] | null;
  /**
   * Buyer company
   */
  buyerCompany: OrderListQuery_ordersb2b_buyerCompany | null;
  /**
   * seller company
   */
  supplierCompany: OrderListQuery_ordersb2b_supplierCompany | null;
}

export interface OrderListQuery {
  /**
   * List of the orderb2b.
   */
  ordersb2b: (OrderListQuery_ordersb2b | null)[] | null;
}

export interface OrderListQueryVariables {
  userType?: string | null;
  companyId?: string | null;
  after?: string | null;
  filter?: OrderB2BSearchFilter | null;
}
