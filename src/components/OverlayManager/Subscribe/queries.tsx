import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  CreateProductSubscriptionMutation,
  CreateProductSubscriptionMutationVariables,
} from "./gqlTypes/CreateProductSubscriptionMutation";
import {
  deleteProductSubscriptionMutation,
  deleteProductSubscriptionMutationVariables,
} from "./gqlTypes/deleteProductSubscriptionMutation";
import {
  updateProductSubscriptionMutation,
  updateProductSubscriptionMutationVariables,
} from "./gqlTypes/updateProductSubscriptionMutation";

const createProductSubscription = gql`
  mutation CreateProductSubscriptionMutation($input: SubscriptionInput!) {
    subscriptionCreate(input: $input) {
      subscription {
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
      subscriptionErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedCreateProductSubscription = TypedMutation<
  CreateProductSubscriptionMutation,
  CreateProductSubscriptionMutationVariables
>(createProductSubscription);

const updateProductSubscription = gql`
  mutation updateProductSubscriptionMutation(
    $id: ID!
    $input: SubscriptionInput!
  ) {
    subscriptionUpdate(id: $id, input: $input) {
      subscription {
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
      subscriptionError {
        field
        message
        code
      }
    }
  }
`;

export const TypedUpdateProductSubscription = TypedMutation<
  updateProductSubscriptionMutation,
  updateProductSubscriptionMutationVariables
>(updateProductSubscription);

const deleteProductSubscription = gql`
  mutation deleteProductSubscriptionMutation($id: ID!) {
    subscriptionDelete(id: $id) {
      subscription {
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
      subscriptionError {
        field
        message
        code
      }
    }
  }
`;

export const TypedDeleteProductSubscription = TypedMutation<
  deleteProductSubscriptionMutation,
  deleteProductSubscriptionMutationVariables
>(deleteProductSubscription);
