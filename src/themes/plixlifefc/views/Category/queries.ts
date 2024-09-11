import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragment,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";
import {
  CategoryProducts,
  CategoryProductsVariables,
} from "./gqlTypes/CategoryProducts";

export const categoryProductsDataQuery = gql`
  query Category($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      descriptionJson
      id
      name
      backgroundImage {
        url
      }
      metadata {
        key
        value
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    attributes(
      filter: { inCategory: $id, filterableInStorefront: true }
      first: 100
    ) {
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

export const TypedCategoryProductsDataQuery = TypedQuery<
  Category,
  CategoryVariables
>(categoryProductsDataQuery);

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}

  query CategoryProducts(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
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
          variants {
            ...ProductVariantFields
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
`;

export const TypedCategoryProductsQuery = TypedQuery<
  CategoryProducts,
  CategoryProductsVariables
>(categoryProductsQuery);

export const categoryPageQueryNext = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query CategoryNext($id: ID!, $after: String, $pageSize: Int) {
    category(id: $id) {
      id

      products(after: $after, first: $pageSize) {
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

            variants {
              ...ProductVariantFields
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

      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }

      slug
      name
      descriptionJson
      seoDescription
      seoTitle
      backgroundImage {
        url
      }
      metadata {
        key
        value
      }
    }
    attributes(
      filter: { inCategory: $id, filterableInStorefront: true }
      first: 100
    ) {
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

export const categoryNameAndIdForPaths = gql`
  query CategoryNameAndIdForPaths(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: CategoryFilterInput
  ) {
    categories(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: $filter
    ) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
