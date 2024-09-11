/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopCollections
// ====================================================

export interface ShopCollections_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface ShopCollections_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopCollections_collections_edges_node_metadata | null)[];
}

export interface ShopCollections_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopCollections_collections_edges_node;
}

export interface ShopCollections_collections {
  __typename: "CollectionCountableConnection";
  edges: ShopCollections_collections_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ShopCollections {
  /**
   * List of the shop's collections.
   */
  collections: ShopCollections_collections | null;
}
