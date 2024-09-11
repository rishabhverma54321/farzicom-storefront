/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressTypeType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: AddressTypeQuery
// ====================================================

export interface AddressTypeQuery_addressType_address {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  phone: string | null;
}

export interface AddressTypeQuery_addressType {
  __typename: "AddressLinkType";
  /**
   * The ID of the object.
   */
  id: string;
  type: AddressTypeType;
  address: AddressTypeQuery_addressType_address;
}

export interface AddressTypeQuery {
  addressType: AddressTypeQuery_addressType | null;
}

export interface AddressTypeQueryVariables {
  addressId: string;
}
