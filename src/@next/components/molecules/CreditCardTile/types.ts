import { CCProviders } from "@components/atoms/CreditCardIcon";

export interface ICreditCardData {
  nameOnCard: string;
  expirationDate: string;
  last4Digits: number;
  creditCardProvider: CCProviders;
}
export interface IProps extends ICreditCardData {
  onRemove?: () => void;
}
