/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RazorpayCreateOrderInput, RazorpayErrorCodeEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRazorpayOrder
// ====================================================

export interface CreateRazorpayOrder_razorpayOrderCreate_razorpayOrder {
  __typename: "RazorpayOrderType";
  /**
   * Razorpay Order ID.
   */
  id: string | null;
  /**
   * Total order amount.
   */
  amount: any | null;
  /**
   * Amount paid for the order.
   */
  amountPaid: any | null;
  /**
   * Amount due for the order.
   */
  amountDue: any | null;
  /**
   * Amount currency.
   */
  currency: string | null;
  /**
   * Order status.
   */
  status: string | null;
  /**
   * Order creation timestamp.
   */
  createdAt: number | null;
}

export interface CreateRazorpayOrder_razorpayOrderCreate_razorpayErrors {
  __typename: "RazorpayError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: RazorpayErrorCodeEnum | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CreateRazorpayOrder_razorpayOrderCreate {
  __typename: "CreateRazorpayOrder";
  /**
   * A Razorpay order object.
   */
  razorpayOrder: CreateRazorpayOrder_razorpayOrderCreate_razorpayOrder | null;
  razorpayErrors: CreateRazorpayOrder_razorpayOrderCreate_razorpayErrors[];
}

export interface CreateRazorpayOrder {
  /**
   * Creates an order on Razorpay.
   */
  razorpayOrderCreate: CreateRazorpayOrder_razorpayOrderCreate | null;
}

export interface CreateRazorpayOrderVariables {
  input: RazorpayCreateOrderInput;
}
