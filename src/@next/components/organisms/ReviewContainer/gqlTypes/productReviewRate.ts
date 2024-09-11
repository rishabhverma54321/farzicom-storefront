/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReviewRatingType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: productReviewRate
// ====================================================

export interface productReviewRate_RroductReviewRate_productReview {
  __typename: "ProductReviewType";
  /**
   * The ID of the object.
   */
  id: string;
  helpfulRatings: number;
}

export interface productReviewRate_RroductReviewRate {
  __typename: "RateProductReview";
  /**
   * A product review instance.
   */
  productReview: productReviewRate_RroductReviewRate_productReview | null;
}

export interface productReviewRate {
  /**
   * Rate existing product review as helpul or unhelpful
   */
  RroductReviewRate: productReviewRate_RroductReviewRate | null;
}

export interface productReviewRateVariables {
  rated: ReviewRatingType;
  reviewId: string;
}
