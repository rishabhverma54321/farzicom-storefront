import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import { ProductsFilter } from "./gqlTypes/ProductsFilter";

export const ProductFilterQuery = gql`
  query ProductsFilter($collection: [ID], $categories: [ID]) {
    products(
      filter: { collections: $collection, categories: $categories }
      first: 100
    ) {
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

export const TypedProductFilterQuery = TypedQuery<ProductsFilter, {}>(
  ProductFilterQuery
);
