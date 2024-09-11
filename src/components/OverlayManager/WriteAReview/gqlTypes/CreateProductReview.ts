/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductReviewInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProductReview
// ====================================================

export interface CreateProductReview_CreateProductReview_productReview_user {
  __typename: "User";
  firstName: string;
}

export interface CreateProductReview_CreateProductReview_productReview_product {
  __typename: "Product";
  name: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateProductReview_CreateProductReview_productReview {
  __typename: "ProductReviewType";
  user: CreateProductReview_CreateProductReview_productReview_user | null;
  userName: string | null;
  product: CreateProductReview_CreateProductReview_productReview_product;
  review: string;
  rating: number;
}

export interface CreateProductReview_CreateProductReview {
  __typename: "CreateProductReview";
  /**
   * A product review instance.
   */
  productReview: CreateProductReview_CreateProductReview_productReview | null;
}

export interface CreateProductReview {
  /**
   * Create a new product review.
   */
  CreateProductReview: CreateProductReview_CreateProductReview | null;
}

export interface CreateProductReviewVariables {
  input: ProductReviewInput;
}
