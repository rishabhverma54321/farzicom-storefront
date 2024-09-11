/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubscriptionInput, SubscriptionStatus, SubscriptionErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: updateProductSubscriptionMutation
// ====================================================

export interface updateProductSubscriptionMutation_subscriptionUpdate_subscription_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface updateProductSubscriptionMutation_subscriptionUpdate_subscription_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface updateProductSubscriptionMutation_subscriptionUpdate_subscription {
  __typename: "SubscriptionType";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number[];
  product: updateProductSubscriptionMutation_subscriptionUpdate_subscription_product;
  user: updateProductSubscriptionMutation_subscriptionUpdate_subscription_user | null;
  status: SubscriptionStatus;
  created: any;
}

export interface updateProductSubscriptionMutation_subscriptionUpdate_subscriptionError {
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

export interface updateProductSubscriptionMutation_subscriptionUpdate {
  __typename: "UpdateSubscription";
  /**
   * A subscription instance
   */
  subscription: updateProductSubscriptionMutation_subscriptionUpdate_subscription | null;
  subscriptionError: updateProductSubscriptionMutation_subscriptionUpdate_subscriptionError[];
}

export interface updateProductSubscriptionMutation {
  /**
   * Update a subscription.
   */
  subscriptionUpdate: updateProductSubscriptionMutation_subscriptionUpdate | null;
}

export interface updateProductSubscriptionMutationVariables {
  id: string;
  input: SubscriptionInput;
}
