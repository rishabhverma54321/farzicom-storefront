import { TypedQuery } from "@temp/core/queries";

import gql from "graphql-tag";
import { Products } from "./gqlTypes/Products";
import { Collections } from "./gqlTypes/Collections";
import {
  basicProductFragment,
  productPricingFragment,
} from "@temp/themes/wowfc-new/views/Product/queries";

const ProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Products {
    products(first: 100) {
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
        }
      }
    }
  }
`;

const CollectionsQuery = gql`
  query Collections {
    collections(first: 0, last: 50) {
      edges {
        node {
          id
          name
          slug
        }
      }
      totalCount
    }
  }
`;

export const TypedProductsQuery = TypedQuery<Products, undefined>(
  ProductsQuery
);

export const TypedCollectionsQuery = TypedQuery<Collections, undefined>(
  CollectionsQuery
);
