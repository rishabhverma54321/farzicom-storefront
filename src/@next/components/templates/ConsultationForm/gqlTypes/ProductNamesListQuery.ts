/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductNamesListQuery
// ====================================================

export interface ProductNamesListQuery_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductNamesListQuery_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductNamesListQuery_products_edges_node;
}

export interface ProductNamesListQuery_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductNamesListQuery_products_edges[];
}

export interface ProductNamesListQuery {
  /**
   * List of the shop's products.
   */
  products: ProductNamesListQuery_products | null;
}

export interface ProductNamesListQueryVariables {
  first?: number | null;
  ids?: (string | null)[] | null;
}
