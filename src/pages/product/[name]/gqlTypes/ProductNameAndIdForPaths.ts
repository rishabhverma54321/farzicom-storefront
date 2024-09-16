/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductNameAndIdForPaths
// ====================================================

export interface ProductNameAndIdForPaths_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug?: string;
}

export interface ProductNameAndIdForPaths_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductNameAndIdForPaths_products_edges_node;
}

export interface ProductNameAndIdForPaths_products_pageInfo {
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

export interface ProductNameAndIdForPaths_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductNameAndIdForPaths_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductNameAndIdForPaths_products_pageInfo;
}

export interface ProductNameAndIdForPaths {
  /**
   * List of the shop's products.
   */
  products: ProductNameAndIdForPaths_products | null;
}

export interface ProductNameAndIdForPathsVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  filter?: ProductFilterInput | null;
}
