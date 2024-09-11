/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckoutDiscount
// ====================================================

export interface CheckoutDiscount_checkoutDiscounts {
  __typename: "DiscountsType";
  prepaidDiscount: any | null;
  couponDiscount: any | null;
  cashbackDiscount: any | null;
}

export interface CheckoutDiscount {
  checkoutDiscounts: CheckoutDiscount_checkoutDiscounts | null;
}

export interface CheckoutDiscountVariables {
  token: any;
}
