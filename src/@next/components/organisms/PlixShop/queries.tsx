import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import { ShopProductTypes } from "./gqlTypes/ShopProductTypes";
import { ShopProducts, ShopProductsVariables } from "./gqlTypes/ShopProducts";
import { ShopCollections } from "./gqlTypes/ShopCollections";
import { ShopSimilarProducts } from "./gqlTypes/ShopSimilarProducts";
import { ShopSections } from "./gqlTypes/ShopSections";

const priceFragment = gql`
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

const basicProductFragment = gql`
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

const selectedAttributeFragment = gql`
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

const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFieldsShop on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)

    images {
      id
      sortOrder
      alt
      url
    }

    weight {
      unit
      value
    }
    metadata {
      key
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

const productPricingFragment = gql`
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

const ShopProductsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  query ShopProducts($filter: ProductFilterInput, $first: Int) {
    products(
      first: $first
      filter: $filter
      sortBy: { direction: ASC, field: COLLECTION }
    ) {
      edges {
        node {
          ...BasicProductFields
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
          }

          attributes {
            ...SelectedAttributeFields
          }

          isAvailable
          isAvailableForPurchase
          availableForPurchase

          defaultVariant {
            ...ProductVariantFieldsShop
          }
        }
      }
      totalCount
    }
  }
`;

const ShopSimilarProductsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ShopSimilarProducts {
    products(first: 10, sortBy: { direction: ASC, field: COLLECTION }) {
      edges {
        node {
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
          }
          images {
            id
            alt
            url
          }
          attributes {
            ...SelectedAttributeFields
          }

          seoDescription
          seoTitle
          isAvailable
          isAvailableForPurchase
          availableForPurchase

          defaultVariant {
            ...ProductVariantFieldsShop
          }
        }
      }
    }
  }
`;

const ShopProductTypesQuery = gql`
  query ShopProductTypes {
    productTypes(first: 50) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const ShopCollectionsQuery = gql`
  query ShopCollections {
    collections(first: 30) {
      edges {
        node {
          id
          name
          metadata {
            key
            value
          }
        }
      }
      totalCount
    }
  }
`;
const SectionsQuery = gql`
  query ShopSections {
    sections(first: 25) {
      edges {
        node {
          id
          name
          metadata {
            key
            value
          }
          description
        }
      }
    }
  }
`;

const CollectionQuery = gql`
  query CollectionQuery($id: ID!) {
    collection(id: $id) {
      id
      name
      descriptionJson
    }
  }
`;
export const TypedCollectionQuery = TypedQuery<any, any>(CollectionQuery);
export const TypedShopSectionsQuery = TypedQuery<ShopSections, undefined>(
  SectionsQuery
);

export const TypedShopProductsQuery = TypedQuery<
  ShopProducts,
  ShopProductsVariables
>(ShopProductsQuery);
export const TypedShopProductTypeQuery = TypedQuery<
  ShopProductTypes,
  undefined
>(ShopProductTypesQuery);
export const TypedCollectionsQuery = TypedQuery<ShopCollections, undefined>(
  ShopCollectionsQuery
);
export const TypedShopSimilarProductsQuery = TypedQuery<
  ShopSimilarProducts,
  undefined
>(ShopSimilarProductsQuery);
