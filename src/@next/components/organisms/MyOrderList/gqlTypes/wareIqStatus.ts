/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wareIqStatus
// ====================================================

export interface wareIqStatus_orderStatus {
  __typename: "CustomOrderStatus";
  status: string | null;
}

export interface wareIqStatus {
  orderStatus: wareIqStatus_orderStatus | null;
}

export interface wareIqStatusVariables {
  token?: any | null;
}
