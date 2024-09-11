import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { GetWallet } from "./gqlTypes/GetWallet";

const GetWalletAmountWithLogs = gql`
  query GetWallet {
    wallet {
      id
      amount
      logs(first: 100) {
        edges {
          node {
            id
            amount
            created
            reason
            type
          }
        }
      }
    }
  }
`;

export const TypedGetWalletAmountWithLogs = TypedQuery<GetWallet, undefined>(
  GetWalletAmountWithLogs
);
