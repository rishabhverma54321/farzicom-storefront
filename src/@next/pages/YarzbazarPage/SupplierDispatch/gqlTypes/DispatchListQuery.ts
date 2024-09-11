/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ShipmentFilterInput, ShipmentDisputeStatus, PaymentPaymentType, PaymentPaymentStatus } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: DispatchListQuery
// ====================================================

export interface DispatchListQuery_shipmentsB2B_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_metadata {
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

export interface DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute_edges_node {
  __typename: "ShipmentDisputeType";
  /**
   * The ID of the object.
   */
  id: string;
  status: ShipmentDisputeStatus | null;
  description: string | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute_edges {
  __typename: "ShipmentDisputeTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute_edges_node | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute {
  __typename: "ShipmentDisputeTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute_edges | null)[];
}

export interface DispatchListQuery_shipmentsB2B_edges_node_order_metadata {
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

export interface DispatchListQuery_shipmentsB2B_edges_node_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (DispatchListQuery_shipmentsB2B_edges_node_order_metadata | null)[];
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges_node_country {
  __typename: "CountryDisplay";
  /**
   * Country name.
   */
  country: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges_node {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  cityArea: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges_node_country;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges {
  __typename: "AddressCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges_node;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_shippingAddress {
  __typename: "AddressCountableConnection";
  edges: DispatchListQuery_shipmentsB2B_edges_node_shippingAddress_edges[];
}

export interface DispatchListQuery_shipmentsB2B_edges_node_items_productVariantId_product {
  __typename: "Product";
  name: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_items_productVariantId {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  product: DispatchListQuery_shipmentsB2B_edges_node_items_productVariantId_product;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_items {
  __typename: "ShipmentItemType";
  /**
   * The ID of the object.
   */
  id: string;
  itemName: string;
  itemQuantity: number;
  createdAt: any;
  productVariantId: DispatchListQuery_shipmentsB2B_edges_node_items_productVariantId | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_history {
  __typename: "HistoryType";
  /**
   * The ID of the object.
   */
  id: string;
  dispatchStatus: string | null;
  dispatchStatusDate: any | null;
  etaRemain: number | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_payment {
  __typename: "PaymentType";
  /**
   * The ID of the object.
   */
  id: string;
  paymentType: PaymentPaymentType | null;
  paymentTotal: number | null;
  paymentStatus: PaymentPaymentStatus | null;
  accountName: string | null;
  branch: string | null;
  bank: string | null;
  accountNo: string | null;
  ifscCode: string | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_paymentInvoice {
  __typename: "ShipmentPaymentInvoiceType";
  /**
   * The ID of the object.
   */
  id: string;
  yarnPayment: string;
  shipping: string;
  convenienceFee: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_document {
  __typename: "DocumentType";
  /**
   * The ID of the object.
   */
  id: string;
  pi: string;
  taxInvoice: string;
  eway: string;
  packingList: string;
  insurance: string;
  lRCopy: string;
  testReport: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_buyerCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_buyerCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: DispatchListQuery_shipmentsB2B_edges_node_buyerCompany_avatar | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_supplierCompany_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface DispatchListQuery_shipmentsB2B_edges_node_supplierCompany {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: DispatchListQuery_shipmentsB2B_edges_node_supplierCompany_avatar | null;
}

export interface DispatchListQuery_shipmentsB2B_edges_node {
  __typename: "ShipmentType";
  /**
   * The ID of the object.
   */
  id: string;
  status: string | null;
  estimateDeliveryDate: any | null;
  deliveredAt: any | null;
  createdAt: any;
  isCancelled: boolean;
  cancelledAt: any | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (DispatchListQuery_shipmentsB2B_edges_node_metadata | null)[];
  shipmentDispute: DispatchListQuery_shipmentsB2B_edges_node_shipmentDispute;
  order: DispatchListQuery_shipmentsB2B_edges_node_order | null;
  shippingAddress: DispatchListQuery_shipmentsB2B_edges_node_shippingAddress;
  /**
   * A list of shipment items, each containing information about an item in the shipment.
   */
  items: (DispatchListQuery_shipmentsB2B_edges_node_items | null)[] | null;
  /**
   * list of history associated with shipments
   */
  history: (DispatchListQuery_shipmentsB2B_edges_node_history | null)[] | null;
  /**
   * list of payment associated with shipments
   */
  payment: (DispatchListQuery_shipmentsB2B_edges_node_payment | null)[] | null;
  /**
   * list of payment invoices
   */
  paymentInvoice: (DispatchListQuery_shipmentsB2B_edges_node_paymentInvoice | null)[] | null;
  /**
   * list of document associated with shipments
   */
  document: (DispatchListQuery_shipmentsB2B_edges_node_document | null)[] | null;
  /**
   * Buyer company
   */
  buyerCompany: DispatchListQuery_shipmentsB2B_edges_node_buyerCompany | null;
  /**
   * seller company
   */
  supplierCompany: DispatchListQuery_shipmentsB2B_edges_node_supplierCompany | null;
}

export interface DispatchListQuery_shipmentsB2B_edges {
  __typename: "ShipmentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: DispatchListQuery_shipmentsB2B_edges_node | null;
}

export interface DispatchListQuery_shipmentsB2B {
  __typename: "ShipmentTypeConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: DispatchListQuery_shipmentsB2B_pageInfo;
  /**
   * Contains the nodes in this connection.
   */
  edges: (DispatchListQuery_shipmentsB2B_edges | null)[];
}

export interface DispatchListQuery {
  /**
   * List of the Shipments.
   */
  shipmentsB2B: DispatchListQuery_shipmentsB2B | null;
}

export interface DispatchListQueryVariables {
  userType?: string | null;
  companyId?: string | null;
  after?: string | null;
  filter?: ShipmentFilterInput | null;
}
