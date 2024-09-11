import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  CashbackRecieveAmount,
  CashbackRecieveAmountVariables,
} from "./gqlTypes/CashbackRecieveAmount";
import {
  CouponDiscount,
  CouponDiscountVariables,
} from "./gqlTypes/CouponDiscount";
import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "./gqlTypes/CouponPrepaidDiscount";
import {
  DiscountsAndCashbackQuery,
  DiscountsAndCashbackQueryVariables,
} from "./gqlTypes/DiscountsAndCashbackQuery";

const GetCouponDiscount = gql`
  query CouponDiscount($token: UUID!) {
    couponDiscount(token: $token) {
      code
      discountAmount
      id
    }
  }
`;

const GetCouponPrepaidDiscount = gql`
  query CheckoutDiscount($token: UUID!) {
    checkoutDiscounts(token: $token) {
      prepaidDiscount
      couponDiscount
      cashbackDiscount
    }
  }
`;

const GetCashbackRecieveAmount = gql`
  query CashbackRecieveAmount($checkoutToken: UUID, $orderToken: UUID) {
    cashback(checkoutToken: $checkoutToken, orderToken: $orderToken) {
      amount
      willAddOn
    }
  }
`;

const GetDiscountsAndCashbackQuery = gql`
  query DiscountsAndCashbackQuery($token: UUID!) {
    checkoutDiscounts(token: $token) {
      prepaidDiscount
      couponDiscount
      cashbackDiscount
    }
    cashback(checkoutToken: $token) {
      amount
      willAddOn
    }
  }
`;

export const TypedGetDiscountsAndCashback = TypedQuery<
  DiscountsAndCashbackQuery,
  DiscountsAndCashbackQueryVariables
>(GetDiscountsAndCashbackQuery);

export const TypedCouponDiscount = TypedQuery<
  CouponDiscount,
  CouponDiscountVariables
>(GetCouponDiscount);

export const TypedCouponPrepaidDiscount = TypedQuery<
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables
>(GetCouponPrepaidDiscount);

export const TypedGetCashbackRecieveAmount = TypedQuery<
  CashbackRecieveAmount,
  CashbackRecieveAmountVariables
>(GetCashbackRecieveAmount);

/* 
{
    "operationName": "CouponPrepaidDiscount",
    "variables": {
        "token": "f4cc366b-18a4-4b3a-b8d5-cdccb956211b"
    },
    "query": "query CouponPrepaidDiscount($token: UUID!) {\n  checkoutDiscounts(token: $token) {\n    prepaidDiscount\n    couponDiscount\n    cashbackDiscount\n    __typename\n  }\n}\n"
}
*/

/*
cashback(checkoutToken: $token) {
      amount
      willAddOn
    }
*/
