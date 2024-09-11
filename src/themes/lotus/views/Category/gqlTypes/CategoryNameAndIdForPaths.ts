/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollectionFilterInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CategoryNameAndIdForPaths
// ====================================================

export interface CategoryNameAndIdForPaths_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CategoryNameAndIdForPaths_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryNameAndIdForPaths_categories_edges_node;
}

export interface CategoryNameAndIdForPaths_categories_pageInfo {
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

export interface CategoryNameAndIdForPaths_categories {
  __typename: "CategoryCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: CategoryNameAndIdForPaths_categories_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryNameAndIdForPaths_categories_pageInfo;
}

export interface CategoryNameAndIdForPaths {
  /**
   * List of the shop's categories.
   */
  categories: CategoryNameAndIdForPaths_categories | null;
}

export interface CategoryNameAndIdForPathsVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  filter?: CollectionFilterInput | null;
}
