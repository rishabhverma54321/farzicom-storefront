/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckForDelivery
// ====================================================

export interface CheckForDelivery_pincode {
  __typename: "PincodeType";
  pin: string;
  city: string;
  state: string;
  serviceable: boolean;
  created: any;
  updated: any;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CheckForDelivery {
  pincode: CheckForDelivery_pincode | null;
}

export interface CheckForDeliveryVariables {
  pincode?: string | null;
}
