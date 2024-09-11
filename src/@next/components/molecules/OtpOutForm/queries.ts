import { TypedMutation } from "@temp/core/mutations";
import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  GenericFormCreateMutation,
  GenericFormCreateMutationVariables,
} from "./gqlTypes/GenericFormCreateMutation";


const GenericFormCreate = gql`
  mutation GenericFormCreateMutation($input: GenericFormInput!) {
    genericFormCreate(input: $input) {
      genericForm {
        id
        name
        phone
        email
        responseId
        responseBody
        createdAt
      }
      genericFormErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedGenericFormCreateMutation = TypedMutation<
  GenericFormCreateMutation,
  GenericFormCreateMutationVariables
>(GenericFormCreate);


