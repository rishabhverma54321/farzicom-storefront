import { TypedQuery } from "@src/core/queries";
import gql from "graphql-tag";
import { TypedMutation } from "@src/core/mutations";
import {
  ProductRatings,
  ProductRatingsVariables,
} from "./gqlTypes/ProductRatings";
import {
  wishlistAddProduct,
  wishlistAddProductVariables,
} from "./gqlTypes/wishlistAddProduct";

const WishlistAddProduct = gql`
  mutation wishlistAddProduct($productId: ID!) {
    WishlistAddProduct: wishlistAddProduct(productId: $productId) {
      wishlist {
        id
        wishlist {
          createdAt
          items(first: 20) {
            edges {
              node {
                id
                product {
                  id
                  name
                  name
                }
              }
            }
          }
        }
        product {
          id
          name
        }
      }
    }
  }
`;

export const getProductRatings = gql`
  query ProductRatings($product: ID!, $first: Int!) {
    productReviews(product: $product, first: $first, isPublished: true) {
      edges {
        node {
          id
          rating
          userName
          user {
            id
            firstName
          }
        }
      }
    }
  }
`;

export const TypedGetProductRatings = TypedQuery<
  ProductRatings,
  ProductRatingsVariables
>(getProductRatings);

export const TypedAddWishlistProduct = TypedMutation<
  wishlistAddProduct,
  wishlistAddProductVariables
>(WishlistAddProduct);
