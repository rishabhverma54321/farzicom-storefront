/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecipeCollectionsList
// ====================================================

export interface RecipeCollectionsList_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface RecipeCollectionsList_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: RecipeCollectionsList_collections_edges_node_backgroundImage | null;
}

export interface RecipeCollectionsList_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: RecipeCollectionsList_collections_edges_node;
}

export interface RecipeCollectionsList_collections {
  __typename: "CollectionCountableConnection";
  edges: RecipeCollectionsList_collections_edges[];
}

export interface RecipeCollectionsList {
  /**
   * List of the shop's collections.
   */
  collections: RecipeCollectionsList_collections | null;
}
