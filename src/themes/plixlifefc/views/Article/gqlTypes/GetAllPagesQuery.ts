/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPagesQuery
// ====================================================

export interface GetAllPagesQuery_pages_edges_node {
  __typename: "Page";
  slug: string;
}

export interface GetAllPagesQuery_pages_edges {
  __typename: "PageCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetAllPagesQuery_pages_edges_node;
}

export interface GetAllPagesQuery_pages {
  __typename: "PageCountableConnection";
  edges: GetAllPagesQuery_pages_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetAllPagesQuery {
  /**
   * List of the shop's pages.
   */
  pages: GetAllPagesQuery_pages | null;
}
