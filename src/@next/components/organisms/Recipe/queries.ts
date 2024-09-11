import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { RecipeProductsList } from "./gqlTypes/RecipeProductsList";
import { RecipeCollectionsList } from "./gqlTypes/RecipeCollectionsList";

export const RecipeProductsListQuery = gql`
  query RecipeProductsList {
    collection(slug: "recipes") {
      products(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
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
      }
    }
  }
`;

export const RecipeCollectionsListQuery = gql`
  query RecipeCollectionsList {
    collections(first: 100) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
          }
        }
      }
    }
  }
`;

export const TypedRecipeProductsListQuery = TypedQuery<RecipeProductsList, {}>(
  RecipeProductsListQuery
);

export const TypedRecipeCollectionsListQuery = TypedQuery<
  RecipeCollectionsList,
  {}
>(RecipeCollectionsListQuery);
