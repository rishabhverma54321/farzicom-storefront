import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { OffersList, OffersListVariables } from "./gqlTypes/OffersList";
import {
  CheckForDelivery,
  CheckForDeliveryVariables,
} from "./gqlTypes/CheckForDelivery";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import {
  ProductListQuery,
  ProductListQueryVariables,
} from "./gqlTypes/ProductListQuery";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";
import { sectionFragment } from "../../../themes/plixlifefc/views/Home/queries";
import {
  ProductDetailsWithSection,
  ProductDetailsWithSectionVariables,
} from "./gqlTypes/ProductDetailsWithSection";
import {
  ProductNameAndIdForPaths,
  ProductNameAndIdForPathsVariables,
} from "./gqlTypes/ProductNameAndIdForPaths";

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

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    slug
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
    isAvailableForPurchase
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
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

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  ${sectionFragment}
  query ProductDetails($id: ID!, $sectionId: ID, $sectionName: String) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      metadata {
        key
        value
      }
      weight {
        unit
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
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase

      defaultVariant {
        ...ProductVariantFields
      }
    }
    section(first: 1, id: $sectionId, name: $sectionName) {
      edges {
        node {
          ...Section
          children(first: 20) {
            edges {
              node {
                ...Section
                children(first: 20) {
                  edges {
                    node {
                      ...Section
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const productDetailsWithSectionQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  ${sectionFragment}
  query ProductDetailsWithSection(
    $id: ID!
    $sectionId: ID
    $sectionName: String
  ) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      metadata {
        key
        value
      }
      weight {
        unit
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
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        ...ProductVariantFields
      }
    }
    section(first: 1, id: $sectionId, name: $sectionName) {
      edges {
        node {
          ...Section
          children(first: 20) {
            edges {
              node {
                ...Section
                children(first: 20) {
                  edges {
                    node {
                      ...Section
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantFields
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const productOffersQuery = gql`
  query OffersList($productId: ID!) {
    productOffers(productId: $productId)
  }
`;

export const checkForDeliveryQuery = gql`
  query CheckForDelivery($pincode: String) {
    pincode(pin: $pincode) {
      pin
      city
      state
      serviceable
      created
      updated
      id
    }
  }
`;

export const productListQuery = gql`
  query ProductListQuery($first: Int, $ids: [ID]) {
    products(first: $first, filter: { ids: $ids }) {
      totalCount
      edges {
        node {
          id
          name
          slug
          category {
            id
            name
            slug
          }
          isAvailableForPurchase
          metadata {
            key
            value
          }
          thumbnail {
            url
          }
          images {
            id
            alt
            url
          }
          variants {
            id
            sku
            name

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

          pricing {
            priceRangeUndiscounted {
              start {
                net {
                  amount
                  currency
                }
                gross {
                  amount
                  currency
                }
              }
              stop {
                net {
                  amount
                  currency
                }
                gross {
                  amount
                  currency
                }
              }
            }
            priceRange {
              start {
                net {
                  amount
                  currency
                }
                gross {
                  amount
                  currency
                }
              }
              stop {
                net {
                  amount
                  currency
                }
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const productNameAndIdForPaths = gql`
  query ProductNameAndIdForPaths(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: ProductFilterInput
  ) {
    products(
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
          slug
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

export const productVariantNameAndIdsForPaths = gql`
  query productVariantNameAndIdsForPaths(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: ProductFilterInput
  ) {
    products(
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
          slug
          defaultVariant {
            id
            name
          }
          variants {
            id
            name
          }
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

export const productSlugForPaths = gql`
  query ProductSlugForPaths(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: ProductFilterInput
  ) {
    products(
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
          slug
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

export const TypedProductNameAndIdForPaths = TypedQuery<
  ProductNameAndIdForPaths,
  ProductNameAndIdForPathsVariables
>(productNameAndIdForPaths);

export const TypedProductDetailQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedProductDetailWithSectionQuery = TypedQuery<
  ProductDetailsWithSection,
  ProductDetailsWithSectionVariables
>(productDetailsWithSectionQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);

export const TypedProductOffersQuery = TypedQuery<
  OffersList,
  OffersListVariables
>(productOffersQuery);

export const TypedCheckForDelivery = TypedQuery<
  CheckForDelivery,
  CheckForDeliveryVariables
>(checkForDeliveryQuery);

export const TypedProductListQuery = TypedQuery<
  ProductListQuery,
  ProductListQueryVariables
>(productListQuery);
