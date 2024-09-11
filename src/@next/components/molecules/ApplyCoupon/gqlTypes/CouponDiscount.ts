/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CouponDiscount
// ====================================================

export interface CouponDiscount_couponDiscount {
  __typename: "CouponDiscountType";
  code: string | null;
  discountAmount: number | null;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CouponDiscount {
  couponDiscount: CouponDiscount_couponDiscount | null;
}

export interface CouponDiscountVariables {
  token: any;
}
