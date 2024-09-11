/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiscountsAndCashbackQuery
// ====================================================

export interface DiscountsAndCashbackQuery_checkoutDiscounts {
  __typename: "DiscountsType";
  prepaidDiscount: any | null;
  couponDiscount: any | null;
  cashbackDiscount: any | null;
}

export interface DiscountsAndCashbackQuery_cashback {
  __typename: "CashbackType";
  amount: any | null;
  willAddOn: any | null;
}

export interface DiscountsAndCashbackQuery {
  checkoutDiscounts: DiscountsAndCashbackQuery_checkoutDiscounts | null;
  cashback: DiscountsAndCashbackQuery_cashback | null;
}

export interface DiscountsAndCashbackQueryVariables {
  token: any;
}
