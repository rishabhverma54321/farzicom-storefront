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
    metadata {
      key
      value
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!) {
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
              defaultVariant {
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
      defaultVariant {
        ...ProductVariantFields
        metadata {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
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

export const TypedProductDetailQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

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
