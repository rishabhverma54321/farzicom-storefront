import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  SubscriptionsDetailsQuery,
  SubscriptionsDetailsQueryVariables,
} from "./gqlTypes/SubscriptionsDetailsQuery";

import {
  SubscriptionsListQuery,
  SubscriptionsListQueryVariables,
} from "./gqlTypes/SubscriptionsListQuery";

const SubscriptionsList = gql`
  query SubscriptionsListQuery($user: ID) {
    subscriptions(first: 50, user: $user) {
      edges {
        node {
          id
          quantity
          product {
            id
            name
            thumbnail {
              url
              alt
            }
          }
          user {
            id
            firstName
            lastName
          }
          status
          created
        }
      }
    }
  }
`;

export const TypedSubscriptionsListQuery = TypedQuery<
  SubscriptionsListQuery,
  SubscriptionsListQueryVariables
>(SubscriptionsList);

const SubscriptionsDetails = gql`
  query SubscriptionsDetailsQuery($product: ID, $user: ID) {
    subscriptions(product: $product, user: $user, first: 1) {
      edges {
        node {
          id
          quantity
          product {
            id
            name
          }
          user {
            id
            firstName
            lastName
          }
          status
          created
        }
      }
    }
  }
`;

export const TypedSubscriptionsDetailsQuery = TypedQuery<
  SubscriptionsDetailsQuery,
  SubscriptionsDetailsQueryVariables
>(SubscriptionsDetails);
