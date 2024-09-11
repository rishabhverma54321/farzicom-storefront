/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CashbackRecieveAmount
// ====================================================

export interface CashbackRecieveAmount_cashback {
  __typename: "CashbackType";
  amount: any | null;
  willAddOn: any | null;
}

export interface CashbackRecieveAmount {
  cashback: CashbackRecieveAmount_cashback | null;
}

export interface CashbackRecieveAmountVariables {
  checkoutToken?: any | null;
  orderToken?: any | null;
}
