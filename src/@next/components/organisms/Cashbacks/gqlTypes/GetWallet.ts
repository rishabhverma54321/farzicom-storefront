/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WalletLogType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetWallet
// ====================================================

export interface GetWallet_wallet_logs_edges_node {
  __typename: "CustomWalletLogType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  created: any;
  reason: string;
  type: WalletLogType;
}

export interface GetWallet_wallet_logs_edges {
  __typename: "CustomWalletLogTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetWallet_wallet_logs_edges_node | null;
}

export interface GetWallet_wallet_logs {
  __typename: "CustomWalletLogTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetWallet_wallet_logs_edges | null)[];
}

export interface GetWallet_wallet {
  __typename: "WalletType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  logs: GetWallet_wallet_logs;
}

export interface GetWallet {
  wallet: GetWallet_wallet | null;
}
