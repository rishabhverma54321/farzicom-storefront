// import { getProductReviews } from "@components/organisms/ReviewContainer/queries";
import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  CreateProductReviewVariables,
  CreateProductReview,
} from "./gqlTypes/CreateProductReview";

// const update = (cache, data) => {
//   const { productReviews } = cache.readQuery({ query: getProductReviews });

//   cache.writeQuery({
//     query: getProductReviews,
//     data: { productReviews: productReviews.concat([data]) },
//   });
// };

const createProductReview = gql`
  mutation CreateProductReview($input: ProductReviewInput!) {
    CreateProductReview: productReviewCreate(input: $input) {
      productReview {
        user {
          firstName
        }
        userName
        product {
          name
          id
        }
        review
        rating
      }
    }
  }
`;

export const TypedCreateProductReview = TypedMutation<
  CreateProductReview,
  CreateProductReviewVariables
>(createProductReview);
