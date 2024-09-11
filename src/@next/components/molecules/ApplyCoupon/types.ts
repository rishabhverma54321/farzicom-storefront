// import { IFormError } from "@types";

import { setCouponPrepaidDiscountsType } from "@pages";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  setCouponPrepaidDiscounts: setCouponPrepaidDiscountsType;
}
