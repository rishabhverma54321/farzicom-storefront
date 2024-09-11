/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubscriptionInput, SubscriptionStatus, SubscriptionErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProductSubscriptionMutation
// ====================================================

export interface CreateProductSubscriptionMutation_subscriptionCreate_subscription_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateProductSubscriptionMutation_subscriptionCreate_subscription_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface CreateProductSubscriptionMutation_subscriptionCreate_subscription {
  __typename: "SubscriptionType";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number[];
  product: CreateProductSubscriptionMutation_subscriptionCreate_subscription_product;
  user: CreateProductSubscriptionMutation_subscriptionCreate_subscription_user | null;
  status: SubscriptionStatus;
  created: any;
}

export interface CreateProductSubscriptionMutation_subscriptionCreate_subscriptionErrors {
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

export interface CreateProductSubscriptionMutation_subscriptionCreate {
  __typename: "SubscriptionCreate";
  /**
   * A Subscription instance.
   */
  subscription: CreateProductSubscriptionMutation_subscriptionCreate_subscription | null;
  subscriptionErrors: CreateProductSubscriptionMutation_subscriptionCreate_subscriptionErrors[];
}

export interface CreateProductSubscriptionMutation {
  /**
   * Create Subscription.
   */
  subscriptionCreate: CreateProductSubscriptionMutation_subscriptionCreate | null;
}

export interface CreateProductSubscriptionMutationVariables {
  input: SubscriptionInput;
}
