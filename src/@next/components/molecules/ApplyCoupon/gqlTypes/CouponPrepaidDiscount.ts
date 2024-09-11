/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CouponPrepaidDiscount
// ====================================================

export interface CouponPrepaidDiscount_checkoutDiscounts {
  __typename: "DiscountsType";
  prepaidDiscount: any | null;
  couponDiscount: any | null;
  cashbackDiscount: any | null;
}

export interface CouponPrepaidDiscount_cashback {
  __typename: "CashbackType";
  amount: any | null;
  willAddOn: any | null;
}

export interface CouponPrepaidDiscount {
  checkoutDiscounts: CouponPrepaidDiscount_checkoutDiscounts | null;
  cashback: CouponPrepaidDiscount_cashback | null;
}

export interface CouponPrepaidDiscountVariables {
  token: any;
}
