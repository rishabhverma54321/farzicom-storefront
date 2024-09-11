// import { CCProviders } from "@components/atoms/CCProviders";

import { CCProviders } from "@components/atoms/CreditCardIcon";

declare type ccData = {
  nameOnCard: string;
  expirationDate: string;
  last4Digits: number;
  creditCardProvider: CCProviders;
};

export interface IProps {
  creditCards: ccData[];
}
