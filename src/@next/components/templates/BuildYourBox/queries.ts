import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragment,
} from "Themes/views/Product/queries";
import {
  CollectionProducts,
  CollectionProductsVariables,
} from "./gqlTypes/CollectionProducts";

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query CollectionProductsByb(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    collection(id: $id) {
      id
      products(
        after: $after
        first: $pageSize
        sortBy: $sortBy
        filter: {
          attributes: $attributes
          minimalPrice: { gte: $priceGte, lte: $priceLte }
        }
      ) {
        totalCount
        edges {
          node {
            ...BasicProductFields
            ...ProductPricingField
            category {
              id
              name
              slug
            }
            collections {
              name
            }
            metadata {
              key
              value
            }
            defaultVariant {
              ...ProductVariantFields
              metadata {
                key
                value
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const updateMetadataMutation = gql`
  mutation updateMetadata($id: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $id, input: $input) {
      item {
        metadata {
          key
          value
        }
      }
    }
  }
`;

export const TypedCollectionProductsQuery = TypedQuery<
  CollectionProducts,
  CollectionProductsVariables
>(collectionProductsQuery);
