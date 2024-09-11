import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { ShopMetadataQuery } from "./gqlTypes/ShopMetadataQuery";

export const ShopMetaQuery = gql`
  query ShopMetadataQuery {
    shopmeta(first: 100) {
      edges {
        node {
          name
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;

export const TypedShopeMetadataQuery = TypedQuery<ShopMetadataQuery, {}>(
  ShopMetaQuery
);
