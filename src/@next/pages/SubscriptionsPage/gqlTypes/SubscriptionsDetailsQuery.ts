/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubscriptionStatus } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SubscriptionsDetailsQuery
// ====================================================

export interface SubscriptionsDetailsQuery_subscriptions_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SubscriptionsDetailsQuery_subscriptions_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface SubscriptionsDetailsQuery_subscriptions_edges_node {
  __typename: "SubscriptionType";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number[];
  product: SubscriptionsDetailsQuery_subscriptions_edges_node_product;
  user: SubscriptionsDetailsQuery_subscriptions_edges_node_user | null;
  status: SubscriptionStatus;
  created: any;
}

export interface SubscriptionsDetailsQuery_subscriptions_edges {
  __typename: "SubscriptionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SubscriptionsDetailsQuery_subscriptions_edges_node | null;
}

export interface SubscriptionsDetailsQuery_subscriptions {
  __typename: "SubscriptionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SubscriptionsDetailsQuery_subscriptions_edges | null)[];
}

export interface SubscriptionsDetailsQuery {
  subscriptions: SubscriptionsDetailsQuery_subscriptions | null;
}

export interface SubscriptionsDetailsQueryVariables {
  product?: string | null;
  user?: string | null;
}
