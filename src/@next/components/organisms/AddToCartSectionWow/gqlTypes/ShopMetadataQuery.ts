/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopMetadataQuery
// ====================================================

export interface ShopMetadataQuery_shopmeta_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface ShopMetadataQuery_shopmeta_edges_node {
  __typename: "ShopMetaType";
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopMetadataQuery_shopmeta_edges_node_metadata | null)[];
}

export interface ShopMetadataQuery_shopmeta_edges {
  __typename: "ShopMetaTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ShopMetadataQuery_shopmeta_edges_node | null;
}

export interface ShopMetadataQuery_shopmeta {
  __typename: "ShopMetaTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ShopMetadataQuery_shopmeta_edges | null)[];
}

export interface ShopMetadataQuery {
  shopmeta: ShopMetadataQuery_shopmeta | null;
}
