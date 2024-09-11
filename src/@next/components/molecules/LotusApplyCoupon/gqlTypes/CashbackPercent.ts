/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CashbackPercent
// ====================================================

export interface CashbackPercent_voucherRule_edges_node {
  __typename: "VoucherRuleType";
  /**
   * The ID of the object.
   */
  id: string;
  action: any;
}

export interface CashbackPercent_voucherRule_edges {
  __typename: "VoucherRuleTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CashbackPercent_voucherRule_edges_node | null;
}

export interface CashbackPercent_voucherRule {
  __typename: "VoucherRuleTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CashbackPercent_voucherRule_edges | null)[];
}

export interface CashbackPercent {
  voucherRule: CashbackPercent_voucherRule | null;
}

export interface CashbackPercentVariables {
  id?: string | null;
}
