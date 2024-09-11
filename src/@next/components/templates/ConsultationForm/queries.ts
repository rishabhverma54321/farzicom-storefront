import { TypedMutation } from "@temp/core/mutations";
import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  GenericFormCreateMutation,
  GenericFormCreateMutationVariables,
} from "./gqlTypes/GenericFormCreateMutation";
import {
  ProductNamesListQuery,
  ProductNamesListQueryVariables,
} from "./gqlTypes/ProductNamesListQuery";

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

export const productNamesListQuery = gql`
  query ProductNamesListQuery($first: Int, $ids: [ID]) {
    products(first: $first, filter: { ids: $ids }) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const TypedProductNamesListQuery = TypedQuery<
  ProductNamesListQuery,
  ProductNamesListQueryVariables
>(productNamesListQuery);
