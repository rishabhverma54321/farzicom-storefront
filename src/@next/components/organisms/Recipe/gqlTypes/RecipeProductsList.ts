/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecipeProductsList
// ====================================================

export interface RecipeProductsList_collection_products_pageInfo {
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

export interface RecipeProductsList_collection_products_edges_node_metadata {
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

export interface RecipeProductsList_collection_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface RecipeProductsList_collection_products_edges_node_collections {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface RecipeProductsList_collection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  descriptionJson: any;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (RecipeProductsList_collection_products_edges_node_metadata | null)[];
  /**
   * List of images for the product.
   */
  images: (RecipeProductsList_collection_products_edges_node_images | null)[] | null;
  /**
   * List of collections for the product.
   */
  collections: (RecipeProductsList_collection_products_edges_node_collections | null)[] | null;
}

export interface RecipeProductsList_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: RecipeProductsList_collection_products_edges_node;
}

export interface RecipeProductsList_collection_products {
  __typename: "ProductCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: RecipeProductsList_collection_products_pageInfo;
  edges: RecipeProductsList_collection_products_edges[];
}

export interface RecipeProductsList_collection {
  __typename: "Collection";
  /**
   * List of products in this collection.
   */
  products: RecipeProductsList_collection_products | null;
}

export interface RecipeProductsList {
  /**
   * Look up a collection by ID.
   */
  collection: RecipeProductsList_collection | null;
}
