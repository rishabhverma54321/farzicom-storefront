import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import {
  CategoryListQuery,
  CategoryListQueryVariables,
} from "./gqlTypes/CategoryListQuery";

export const categoryListQuery = gql`
  query CategoryListQuery($filter: CategoryFilterInput) {
    categories(first: 100, filter: $filter) {
      edges {
        node {
          id
          name
          children(first: 100) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedCategoryListQuery = TypedQuery<
  CategoryListQuery,
  CategoryListQueryVariables
>(categoryListQuery);
