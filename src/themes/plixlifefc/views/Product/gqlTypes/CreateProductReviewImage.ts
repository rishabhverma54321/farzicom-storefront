/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductReviewImageCreateInput, ProductErrorCode } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProductReviewImage
// ====================================================

export interface CreateProductReviewImage_CreateProductReviewImage_productReview {
  __typename: "ProductReviewType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateProductReviewImage_CreateProductReviewImage_image {
  __typename: "ProductReviewImageType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateProductReviewImage_CreateProductReviewImage_productErrors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
}

export interface CreateProductReviewImage_CreateProductReviewImage {
  __typename: "ProductReviewImageCreate";
  productReview: CreateProductReviewImage_CreateProductReviewImage_productReview | null;
  image: CreateProductReviewImage_CreateProductReviewImage_image | null;
  productErrors: CreateProductReviewImage_CreateProductReviewImage_productErrors[];
}

export interface CreateProductReviewImage {
  /**
   * Create a product_review image. This mutation must be sent as a `multipart`
   * request. More detailed specs of the upload format can be found here:
   * https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  CreateProductReviewImage: CreateProductReviewImage_CreateProductReviewImage | null;
}

export interface CreateProductReviewImageVariables {
  input: ProductReviewImageCreateInput;
}
