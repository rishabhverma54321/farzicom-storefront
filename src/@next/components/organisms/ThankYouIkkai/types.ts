import {
  UploadInvoice,
  UploadInvoiceVariables,
} from "@app/pages/ThankYouPage/gqlTypes/UploadInvoice";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import { ICheckoutModelPriceValue } from "@saleor/sdk/lib/helpers";
import { MutationFn } from "react-apollo";

export interface IProps {
  orderNumber: string;
  continueShopping: () => void;
  viewOrder: () => void;
  mutation?: MutationFn<UploadInvoice, UploadInvoiceVariables>;
  lines: IItems;
  user: User;
  order: any;
  mrp: ICheckoutModelPriceValue;
  itemDiscount: ICheckoutModelPriceValue;
  offerDiscount: ICheckoutModelPriceValue;
}
