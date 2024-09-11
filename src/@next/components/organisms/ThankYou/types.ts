import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import { ICheckoutModelPriceValue } from "@saleor/sdk/lib/helpers";

export interface IProps {
  orderNumber: string;
  continueShopping: () => void;
  lines: IItems;
  user: User;
  order: any;
  mrp: ICheckoutModelPriceValue;
  itemDiscount: ICheckoutModelPriceValue;
  offerDiscount: ICheckoutModelPriceValue;
}
