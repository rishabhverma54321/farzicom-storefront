/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PagesList
// ====================================================

export interface PagesList_pages_edges_node {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface PagesList_pages_edges {
  __typename: "PageCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PagesList_pages_edges_node;
}

export interface PagesList_pages_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface PagesList_pages {
  __typename: "PageCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: PagesList_pages_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PagesList_pages_pageInfo;
}

export interface PagesList {
  /**
   * List of the shop's pages.
   */
  pages: PagesList_pages | null;
}

export interface PagesListVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
}
