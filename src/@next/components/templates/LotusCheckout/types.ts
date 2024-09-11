import { ITotalPrice } from "@saleor/sdk/lib/api/Cart/types";

export interface IProps {
  showPrepaidOffer?: boolean;
  loading?: boolean;
  navigation?: React.ReactNode;
  checkout?: React.ReactNode;
  paymentGateways?: React.ReactNode;
  hidePaymentGateways?: boolean;
  cartSummary?: React.ReactNode;
  totalPrice?: ITotalPrice;
  button?: React.ReactNode;
}
