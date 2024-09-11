import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../themes/lotus/views/Product/queries";
import { FeaturedProducts } from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts {
    shop {
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              id
              name
              isAvailableForPurchase
              category {
                id
                name
                slug
              }
              metadata {
                key
                value
              }
              thumbnail {
                url
                alt
              }
              thumbnail2x: thumbnail(size: 510) {
                url
                alt
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
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<FeaturedProducts, {}>(
  featuredProducts
);
