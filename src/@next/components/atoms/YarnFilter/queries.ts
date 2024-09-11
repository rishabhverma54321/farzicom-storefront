import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { ProductForFilterQuery } from "./gqlTypes/ProductForFilterQuery";

export const productForFilterQuery = gql`
  query ProductForFilterQuery {
    products(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const TypedProductForFilterQuery = TypedQuery<ProductForFilterQuery, {}>(
  productForFilterQuery
);
