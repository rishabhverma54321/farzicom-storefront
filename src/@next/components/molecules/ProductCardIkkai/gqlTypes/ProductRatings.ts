/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductRatings
// ====================================================

export interface ProductRatings_productReviews_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
}

export interface ProductRatings_productReviews_edges_node {
  __typename: "ProductReviewType";
  rating: number;
  userName: string | null;
  user: ProductRatings_productReviews_edges_node_user | null;
}

export interface ProductRatings_productReviews_edges {
  __typename: "ProductReviewTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductRatings_productReviews_edges_node | null;
}

export interface ProductRatings_productReviews {
  __typename: "ProductReviewTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductRatings_productReviews_edges | null)[];
}

export interface ProductRatings {
  productReviews: ProductRatings_productReviews | null;
}

export interface ProductRatingsVariables {
  product: string;
  first: number;
}
