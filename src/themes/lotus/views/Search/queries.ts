import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragment,
} from "../Product/queries";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query SearchProducts(
    $query: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $sortBy: ProductOrder
    $after: String
  ) {
    products(
      filter: { search: $query, attributes: $attributes }
      first: $pageSize
      sortBy: $sortBy
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          descriptionJson
          metadata {
            key
            value
          }

          category {
            id
            name
            slug
            products(first: 3) {
              edges {
                node {
                  ...BasicProductFields
                  ...ProductPricingField
                  variants {
                    ...ProductVariantFields
                  }
                  metadata {
                    key
                    value
                  }
                  isAvailable
                  isAvailableForPurchase
                  availableForPurchase
                }
              }
            }
          }
          images {
            id
            alt
            url
          }
          variants {
            ...ProductVariantFields
          }
          seoDescription
          seoTitle
          isAvailable
          isAvailableForPurchase
          availableForPurchase
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    attributes(filter: { filterableInStorefront: true }, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);
