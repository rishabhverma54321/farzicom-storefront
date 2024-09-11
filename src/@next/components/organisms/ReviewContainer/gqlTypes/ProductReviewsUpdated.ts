/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductReviewSortOrders } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductReviewsUpdated
// ====================================================

export interface ProductReviewsUpdated_productReviews_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface ProductReviewsUpdated_productReviews_edges_node_images_edges_node {
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

export interface ProductReviewsUpdated_productReviews_edges_node_images_edges {
  __typename: "ProductReviewImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductReviewsUpdated_productReviews_edges_node_images_edges_node | null;
}

export interface ProductReviewsUpdated_productReviews_edges_node_images {
  __typename: "ProductReviewImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductReviewsUpdated_productReviews_edges_node_images_edges | null)[];
}

export interface ProductReviewsUpdated_productReviews_edges_node {
  __typename: "ProductReviewType";
  /**
   * The ID of the object.
   */
  id: string;
  review: string;
  rating: number;
  created: any;
  adminReply: string;
  title: string | null;
  rated: string | null;
  verified: boolean;
  helpfulRatings: number;
  isPublished: boolean;
  unhelpfulRatings: number;
  userName: string | null;
  user: ProductReviewsUpdated_productReviews_edges_node_user | null;
  images: ProductReviewsUpdated_productReviews_edges_node_images;
}

export interface ProductReviewsUpdated_productReviews_edges {
  __typename: "ProductReviewTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductReviewsUpdated_productReviews_edges_node;
}

export interface ProductReviewsUpdated_productReviews {
  __typename: "ProductReviewTypeCountableConnection";
  edges: ProductReviewsUpdated_productReviews_edges[];
}

export interface ProductReviewsUpdated {
  productReviews: ProductReviewsUpdated_productReviews | null;
}

export interface ProductReviewsUpdatedVariables {
  product: string;
  first: number;
  picture: boolean;
  sort: ProductReviewSortOrders;
}
