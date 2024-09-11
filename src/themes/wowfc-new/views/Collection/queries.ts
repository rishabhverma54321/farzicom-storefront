import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";
import {
  CollectionProducts,
  CollectionProductsVariables,
} from "./gqlTypes/CollectionProducts";

export const collectionProductsDataQuery = gql`
  query Collection($id: ID!) {
    collection(id: $id) {
      id
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
      filter: { inCollection: $id, filterableInStorefront: true }
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

export const TypedCollectionProductsDataQuery = TypedQuery<
  Collection,
  CollectionVariables
>(collectionProductsDataQuery);

export const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)
    images {
      id
      url
      alt
      sortOrder
    }
    weight {
      unit
      value
    }

    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
        slug
        metadata {
          key
          value
        }
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query CollectionProducts(
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
            variants {
              id
              sku
              name
              isAvailable
              quantityAvailable(countryCode: IN)
              images {
                id
                url
                alt
              }
              pricing {
                onSale
                priceUndiscounted {
                  gross {
                    amount
                    currency
                  }
                  net {
                    amount
                    currency
                  }
                }
                price {
                  gross {
                    amount
                    currency
                  }
                  net {
                    amount
                    currency
                  }
                }
              }
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

export const TypedCollectionProductsQuery = TypedQuery<
  CollectionProducts,
  CollectionProductsVariables
>(collectionProductsQuery);

export const collectionPageQueryNext = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query CollectionNext(
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
            variants {
              id
              sku
              name
              isAvailable
              quantityAvailable(countryCode: IN)
              images {
                id
                url
                alt
              }
              pricing {
                onSale
                priceUndiscounted {
                  gross {
                    amount
                    currency
                  }
                  net {
                    amount
                    currency
                  }
                }
                price {
                  gross {
                    amount
                    currency
                  }
                  net {
                    amount
                    currency
                  }
                }
              }
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
      filter: { inCollection: $id, filterableInStorefront: true }
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

export const collectionNameAndIdForPaths = gql`
  query CollectionNameAndIdForPaths(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: CollectionFilterInput
  ) {
    collections(
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
