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
  /**
   * The ID of the object.
   */
  id: string;
  rating: number;
  userName: string | null;
  user: ProductRatings_productReviews_edges_node_user | null;
}

export interface ProductRatings_productReviews_edges {
  __typename: "ProductReviewTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductRatings_productReviews_edges_node;
}

export interface ProductRatings_productReviews {
  __typename: "ProductReviewTypeCountableConnection";
  edges: ProductRatings_productReviews_edges[];
}

export interface ProductRatings {
  productReviews: ProductRatings_productReviews | null;
}

export interface ProductRatingsVariables {
  product: string;
  first: number;
}
