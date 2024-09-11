import { ProductReviewInput,ProductErrorCode } from "./../../../../../../gqlTypes/globalTypes";

export interface CreateProductReviewImage_CreateProductReviewImage_productReview {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateProductReviewImage_CreateProductReviewImage_productErrors {
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


export interface CreateUpdatedProductReview_CreateUpdatedProductReview{
  productReview: CreateProductReviewImage_CreateProductReviewImage_productReview | null;
  productReviewErrors: CreateProductReviewImage_CreateProductReviewImage_productErrors[];
}

export interface CreateUpdatedProductReview{
  CreateUpdatedProductReview: CreateUpdatedProductReview_CreateUpdatedProductReview | null;
}

export interface CreateUpdatedProductReviewVariables {
    input: ProductReviewInput;
    id: string;
}