import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "@components/molecules/PlixLifeFcApplyCoupon/gqlTypes/CouponPrepaidDiscount";
import { ApolloQueryResult } from "apollo-client";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  refetch: () => {};
  modal?: boolean | null;
  hide?: () => void;
  selectedCoupon?: string;
  setSelectedCoupon?: React.Dispatch<React.SetStateAction<string>>;
  disableCouponApply?: boolean;
  disableCartOpenOnApply?: boolean;
  newui?: Boolean;
  cartUi?:Boolean;
  onCouponApplyOrRemove?:() => void;
  recalculate?: boolean;
  subHeadingText?: String;
}
