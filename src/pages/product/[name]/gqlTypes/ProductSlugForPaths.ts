/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductSlugForPaths
// ====================================================

export interface ProductSlugForPaths_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface ProductSlugForPaths_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductSlugForPaths_products_edges_node;
}

export interface ProductSlugForPaths_products_pageInfo {
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

export interface ProductSlugForPaths_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductSlugForPaths_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductSlugForPaths_products_pageInfo;
}

export interface ProductSlugForPaths {
  /**
   * List of the shop's products.
   */
  products: ProductSlugForPaths_products | null;
}

export interface ProductSlugForPathsVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  filter?: ProductFilterInput | null;
}
