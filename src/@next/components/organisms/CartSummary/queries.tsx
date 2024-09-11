import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { GetCashbackVariables, GetCashback } from "./gqlTypes/GetCashback";

const GetCashbackQuery = gql`
  query GetCashback($checkoutToken: UUID, $orderToken: UUID) {
    cashback(checkoutToken: $checkoutToken, orderToken: $orderToken) {
      amount
      willAddOn
    }
  }
`;

export const TypedGetCashback = TypedQuery<GetCashback, GetCashbackVariables>(
  GetCashbackQuery
);
