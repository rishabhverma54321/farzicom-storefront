import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import { Article, ArticleVariables } from "./gqlTypes/Article";

const articleQuery = gql`
  query Article($slug: String!) {
    page(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
      metadata {
        key
        value
      }
    }
  }
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(
  articleQuery
);
export const getAllPagesQuery = gql`
  query GetAllPagesQuery {
    pages(first: 100) {
      edges {
        node {
          slug
        }
      }
      totalCount
    }
  }
`;
