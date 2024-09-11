import gql from "graphql-tag";
import { TypedQuery } from "../../../../core/queries";
import { TypedMutation } from "../../../../core/mutations";
import {
  ProductReviewsVariables,
  ProductReviews,
} from "./gqlTypes/ProductReviews";
import {
  ProductReviewsUpdated,
  ProductReviewsUpdatedVariables,
} from "./gqlTypes/ProductReviewsUpdated";

export const getProductReviews = gql`
  query ProductReviewsUpdated(
    $product: ID!
    $first: Int!
    $after: String!
    $picture: Boolean!
    $sort: ProductReviewSortOrders!
  ) {
    productReviews(
      product: $product
      first: $first
      after: $after
      isPublished: true
      pictures: $picture
      sort: $sort
    ) {
      edges {
        node {
          id
          review
          rating
          created
          adminReply
          title
          rated
          verified
          helpfulRatings
          isPublished
          unhelpfulRatings
          userName
          user {
            id
            firstName
            lastName
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                alt
              }
            }
          }
        }
      }
    }
  }
`;

const helpfulRatingMutation = gql`
  mutation productReviewRate($rated: ReviewRatingType!, $reviewId: ID!) {
    ProductReviewRate: productReviewRate(rated: $rated, reviewId: $reviewId) {
      productReview {
        id
        helpfulRatings
      }
    }
  }
`;

export const TypedHelpfulRatingMutation = TypedMutation<any, any>(
  helpfulRatingMutation
);

export const TypedGetProductReviews = TypedQuery<
  ProductReviewsUpdated,
  ProductReviewsUpdatedVariables
>(getProductReviews);
