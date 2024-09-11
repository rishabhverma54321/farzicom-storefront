/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductForFilterQuery
// ====================================================

export interface ProductForFilterQuery_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductForFilterQuery_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductForFilterQuery_products_edges_node;
}

export interface ProductForFilterQuery_products {
  __typename: "ProductCountableConnection";
  edges: ProductForFilterQuery_products_edges[];
}

export interface ProductForFilterQuery {
  /**
   * List of the shop's products.
   */
  products: ProductForFilterQuery_products | null;
}
