import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  ShopifyUserOrdersDetailsQuery,
  ShopifyUserOrdersDetailsQueryVariables,
} from "./gqlTypes/ShopifyUserOrdersDetailsQuery";

export const shopifyUserOrdersDetailsQuery = gql`
  query ShopifyUserOrdersDetailsQuery($userId: ID, $orderId: ID) {
    shopifyUserOrders(userId: $userId, orderId: $orderId) {
      id
      order {
        id
        number
        status
        trackingClientId
        paymentStatusDisplay
        isPaid
        discountName
        discount {
          amount
        }
        metadata {
          key
          value
        }
        subtotal {
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
        shippingPrice {
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
        id
        quantity
        variantName
        productName
        unitPrice {
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
        totalPrice {
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
        }
        variant {
          id
          name
          sku

          images {
            id
            sortOrder
            alt
            url
          }
        }
      }

      shippingAddress {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        countryArea
        postalCode
        phone
        country {
          code
          country
        }
      }

      billingAddress {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        countryArea
        postalCode
        phone
        country {
          code
          country
        }
      }
    }
  }
`;

export const TypedShopifyUserOrdersDetailsQuery = TypedQuery<
  ShopifyUserOrdersDetailsQuery,
  ShopifyUserOrdersDetailsQueryVariables
>(shopifyUserOrdersDetailsQuery);
