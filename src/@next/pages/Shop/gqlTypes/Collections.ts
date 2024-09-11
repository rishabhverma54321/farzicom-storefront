/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collections
// ====================================================

export interface Collections_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Collections_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Collections_collections_edges_node;
}

export interface Collections_collections {
  __typename: "CollectionCountableConnection";
  edges: Collections_collections_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface Collections {
  /**
   * List of the shop's collections.
   */
  collections: Collections_collections | null;
}
