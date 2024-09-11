/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDispatchItemQuery
// ====================================================

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_metadata {
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

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges_node_country {
  __typename: "CountryDisplay";
  /**
   * Country name.
   */
  country: string;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges_node {
  __typename: "Address";
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  cityArea: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges_node_country;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges {
  __typename: "AddressCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges_node;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress {
  __typename: "AddressCountableConnection";
  edges: GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress_edges[];
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_items {
  __typename: "ShipmentItemType";
  /**
   * The ID of the object.
   */
  id: string;
  itemName: string;
  itemQuantity: number;
  createdAt: any;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_history {
  __typename: "HistoryType";
  /**
   * The ID of the object.
   */
  id: string;
  dispatchStatus: string | null;
  dispatchStatusDate: any | null;
  etaRemain: number | null;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_payment {
  __typename: "PaymentType";
  /**
   * The ID of the object.
   */
  id: string;
  accountName: string | null;
  branch: string | null;
  bank: string | null;
  accountNo: string | null;
  ifscCode: string | null;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node_document {
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
}

export interface GetDispatchItemQuery_shipmentsB2B_edges_node {
  __typename: "ShipmentType";
  /**
   * The ID of the object.
   */
  id: string;
  status: string | null;
  estimateDeliveryDate: any | null;
  createdAt: any;
  isCancelled: boolean;
  cancelledAt: any | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (GetDispatchItemQuery_shipmentsB2B_edges_node_metadata | null)[];
  shippingAddress: GetDispatchItemQuery_shipmentsB2B_edges_node_shippingAddress;
  /**
   * A list of shipment items, each containing information about an item in the shipment.
   */
  items: (GetDispatchItemQuery_shipmentsB2B_edges_node_items | null)[] | null;
  /**
   * list of history associated with shipments
   */
  history: (GetDispatchItemQuery_shipmentsB2B_edges_node_history | null)[] | null;
  /**
   * list of payment associated with shipments
   */
  payment: (GetDispatchItemQuery_shipmentsB2B_edges_node_payment | null)[] | null;
  /**
   * list of document associated with shipments
   */
  document: (GetDispatchItemQuery_shipmentsB2B_edges_node_document | null)[] | null;
}

export interface GetDispatchItemQuery_shipmentsB2B_edges {
  __typename: "ShipmentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDispatchItemQuery_shipmentsB2B_edges_node | null;
}

export interface GetDispatchItemQuery_shipmentsB2B {
  __typename: "ShipmentTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDispatchItemQuery_shipmentsB2B_edges | null)[];
}

export interface GetDispatchItemQuery {
  /**
   * List of the Shipments.
   */
  shipmentsB2B: GetDispatchItemQuery_shipmentsB2B | null;
}

export interface GetDispatchItemQueryVariables {
  id?: string | null;
}
