import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import {
  RecipeDetails,
  RecipeDetailsVariables,
} from "./gqlTypes/RecipeDetails";

export const RecipeDetailsQuery = gql`
  query RecipeDetails($id: ID!) {
    product(id: $id) {
      name
      descriptionJson
      metadata {
        key
        value
      }
      images {
        id
        url
        alt
      }
      collections {
        id
        name
      }
    }
  }
`;

export const TypedRecipeDetailsQuery = TypedQuery<
  RecipeDetails,
  RecipeDetailsVariables
>(RecipeDetailsQuery);
