import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  ShopifyUserOrdersListQuery,
  ShopifyUserOrdersListQueryVariables,
} from "./gqlTypes/ShopifyUserOrdersListQuery";

export const shopifyUserOrdersListQuery = gql`
  query ShopifyUserOrdersListQuery($userId: ID) {
    shopifyUserOrders(userId: $userId) {
      order {
        trackingClientId
        status
        paymentStatusDisplay
        isPaid
        metadata {
          key
          value
        }
        total {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
      }
      lines {
        variant {
          images {
            id
            sortOrder
            alt
            url
          }
        }
      }
    }
  }
`;

export const TypedShopifyUserOrdersListQuery = TypedQuery<
  ShopifyUserOrdersListQuery,
  ShopifyUserOrdersListQueryVariables
>(shopifyUserOrdersListQuery);
