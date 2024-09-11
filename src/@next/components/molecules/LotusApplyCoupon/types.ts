// import { IFormError } from "@types";

import { setCouponPrepaidDiscountsType } from "@pages";

import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "@components/molecules/LotusApplyCoupon/gqlTypes/CouponPrepaidDiscount";
import { ApolloQueryResult } from "apollo-client";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  refetch: () => {};
}
