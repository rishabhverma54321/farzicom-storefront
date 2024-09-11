/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCashback
// ====================================================

export interface GetCashback_cashback {
  __typename: "CashbackType";
  amount: any | null;
  willAddOn: any | null;
}

export interface GetCashback {
  cashback: GetCashback_cashback | null;
}

export interface GetCashbackVariables {
  checkoutToken?: any | null;
  orderToken?: any | null;
}
