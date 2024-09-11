import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  AddressTypeQuery,
  AddressTypeQueryVariables,
} from "./gqlTypes/AddressTypeQuery";

export const addressTypeQuery = gql`
  query AddressTypeQuery($addressId: ID!) {
    addressType(addressId: $addressId) {
      id
      type
      address {
        id
        firstName
        phone
      }
    }
  }
`;

export const TypedAddressTypeQuery = TypedQuery<
  AddressTypeQuery,
  AddressTypeQueryVariables
>(addressTypeQuery);
