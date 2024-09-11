/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollectionFilterInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CollectionNameAndIdForPaths
// ====================================================

export interface CollectionNameAndIdForPaths_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionNameAndIdForPaths_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionNameAndIdForPaths_collections_edges_node;
}

export interface CollectionNameAndIdForPaths_collections_pageInfo {
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

export interface CollectionNameAndIdForPaths_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: CollectionNameAndIdForPaths_collections_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionNameAndIdForPaths_collections_pageInfo;
}

export interface CollectionNameAndIdForPaths {
  /**
   * List of the shop's collections.
   */
  collections: CollectionNameAndIdForPaths_collections | null;
}

export interface CollectionNameAndIdForPathsVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  filter?: CollectionFilterInput | null;
}
