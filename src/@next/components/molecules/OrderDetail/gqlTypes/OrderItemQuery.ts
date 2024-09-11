/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: OrderItemQuery
// ====================================================

export interface OrderItemQuery_ordersb2b_order_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
}

export interface OrderItemQuery_ordersb2b_order_metadata {
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

export interface OrderItemQuery_ordersb2b_order {
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
  lines: (OrderItemQuery_ordersb2b_order_lines | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrderItemQuery_ordersb2b_order_metadata | null)[];
}

export interface OrderItemQuery_ordersb2b_shipments_items {
  __typename: "ShipmentItemType";
  /**
   * The ID of the object.
   */
  id: string;
  itemName: string;
}

export interface OrderItemQuery_ordersb2b_shipments {
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
  items: (OrderItemQuery_ordersb2b_shipments_items | null)[] | null;
}

export interface OrderItemQuery_ordersb2b_buyerCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderItemQuery_ordersb2b_buyerCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: OrderItemQuery_ordersb2b_buyerCompany_avatar | null;
}

export interface OrderItemQuery_ordersb2b_supplierCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderItemQuery_ordersb2b_supplierCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: OrderItemQuery_ordersb2b_supplierCompany_avatar | null;
}

export interface OrderItemQuery_ordersb2b {
  __typename: "OrderB2BType";
  /**
   * pending quantity of shipment of particular order
   */
  pendingQuantity: number | null;
  /**
   * type of order
   */
  order: OrderItemQuery_ordersb2b_order | null;
  /**
   * List of shipments associated with orders
   */
  shipments: (OrderItemQuery_ordersb2b_shipments | null)[] | null;
  /**
   * Buyer company
   */
  buyerCompany: OrderItemQuery_ordersb2b_buyerCompany | null;
  /**
   * seller company
   */
  supplierCompany: OrderItemQuery_ordersb2b_supplierCompany | null;
}

export interface OrderItemQuery {
  /**
   * List of the orderb2b.
   */
  ordersb2b: (OrderItemQuery_ordersb2b | null)[] | null;
}

export interface OrderItemQueryVariables {
  id?: string | null;
}
