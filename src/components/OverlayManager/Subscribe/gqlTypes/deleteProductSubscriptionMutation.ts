/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubscriptionStatus, SubscriptionErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteProductSubscriptionMutation
// ====================================================

export interface deleteProductSubscriptionMutation_subscriptionDelete_subscription_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface deleteProductSubscriptionMutation_subscriptionDelete_subscription_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface deleteProductSubscriptionMutation_subscriptionDelete_subscription {
  __typename: "SubscriptionType";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number[];
  product: deleteProductSubscriptionMutation_subscriptionDelete_subscription_product;
  user: deleteProductSubscriptionMutation_subscriptionDelete_subscription_user | null;
  status: SubscriptionStatus;
  created: any;
}

export interface deleteProductSubscriptionMutation_subscriptionDelete_subscriptionError {
  __typename: "SubscriptionError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: SubscriptionErrorCode;
}

export interface deleteProductSubscriptionMutation_subscriptionDelete {
  __typename: "DeleteSubscription";
  /**
   * A subscription instance
   */
  subscription: deleteProductSubscriptionMutation_subscriptionDelete_subscription | null;
  subscriptionError: deleteProductSubscriptionMutation_subscriptionDelete_subscriptionError[];
}

export interface deleteProductSubscriptionMutation {
  /**
   * Delete a subscription.
   */
  subscriptionDelete: deleteProductSubscriptionMutation_subscriptionDelete | null;
}

export interface deleteProductSubscriptionMutationVariables {
  id: string;
}
