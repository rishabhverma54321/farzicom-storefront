import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "@components/molecules/PlixLifeFcApplyCoupon/gqlTypes/CouponPrepaidDiscount";
import { ITaxedMoney } from "@types";
import { ApolloQueryResult } from "apollo-client";
import { OverlayContextInterface } from "../..";

export type setCouponPrepaidDiscountsType = React.Dispatch<
  React.SetStateAction<{
    couponAmount: number;
    prepaidAmount: number;
    cashbackAmount: number;
  }>
>;
export interface IProps {
  // setCheckoutDiscounts: setCouponPrepaidDiscountsType;
  emptyCart: any;
  overlay: OverlayContextInterface;
  breadcrumbs?: React.ReactNode;
  title?: React.ReactNode;
  cartHeader?: React.ReactNode;
  cartFooter?: React.ReactNode;
  cart?: React.ReactNode;
  button?: React.ReactNode;
  continueShopping?: React.ReactNode;
  sanitizeStrip?: React.ReactNode;
  totalDiscount?: number;
  cashbackRecieve?: string;
  totalPrice?: number;
  refetch?: () => {};
  prepaidPercent?: number;
  cashbackDiscountTaxedPrice?: ITaxedMoney | null;
  savingAmount?: number;
  checkoutLoading?: boolean;
}
