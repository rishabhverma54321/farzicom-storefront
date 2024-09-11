/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductReviews
// ====================================================

export interface ProductReviews_productReviews_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface ProductReviews_productReviews_edges_node_images_edges_node {
  __typename: "ProductReviewImageType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface ProductReviews_productReviews_edges_node_images_edges {
  __typename: "ProductReviewImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductReviews_productReviews_edges_node_images_edges_node | null;
}

export interface ProductReviews_productReviews_edges_node_images {
  __typename: "ProductReviewImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductReviews_productReviews_edges_node_images_edges | null)[];
}

export interface ProductReviews_productReviews_edges_node {
  __typename: "ProductReviewType";
  /**
   * The ID of the object.
   */
  id: string;
  review: string;
  rating: number;
  created: any;
  userName: string | null;
  user: ProductReviews_productReviews_edges_node_user | null;
  images: ProductReviews_productReviews_edges_node_images;
}

export interface ProductReviews_productReviews_edges {
  __typename: "ProductReviewTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductReviews_productReviews_edges_node;
}

export interface ProductReviews_productReviews {
  __typename: "ProductReviewTypeCountableConnection";
  edges: ProductReviews_productReviews_edges[];
}

export interface ProductReviews {
  productReviews: ProductReviews_productReviews | null;
}

export interface ProductReviewsVariables {
  product: string;
  first: number;
}
