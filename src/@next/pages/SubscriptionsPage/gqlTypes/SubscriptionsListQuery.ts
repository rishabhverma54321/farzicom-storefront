/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubscriptionStatus } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SubscriptionsListQuery
// ====================================================

export interface SubscriptionsListQuery_subscriptions_edges_node_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface SubscriptionsListQuery_subscriptions_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SubscriptionsListQuery_subscriptions_edges_node_product_thumbnail | null;
}

export interface SubscriptionsListQuery_subscriptions_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface SubscriptionsListQuery_subscriptions_edges_node {
  __typename: "SubscriptionType";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number[];
  product: SubscriptionsListQuery_subscriptions_edges_node_product;
  user: SubscriptionsListQuery_subscriptions_edges_node_user | null;
  status: SubscriptionStatus;
  created: any;
}

export interface SubscriptionsListQuery_subscriptions_edges {
  __typename: "SubscriptionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SubscriptionsListQuery_subscriptions_edges_node | null;
}

export interface SubscriptionsListQuery_subscriptions {
  __typename: "SubscriptionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SubscriptionsListQuery_subscriptions_edges | null)[];
}

export interface SubscriptionsListQuery {
  subscriptions: SubscriptionsListQuery_subscriptions | null;
}

export interface SubscriptionsListQueryVariables {
  user?: string | null;
}
