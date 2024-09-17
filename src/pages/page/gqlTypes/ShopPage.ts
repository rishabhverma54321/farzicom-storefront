/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopPage
// ====================================================

export interface ShopPage_page_metadata {
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

export interface ShopPage_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  contentJson: any;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopPage_page_metadata | null)[];
}

export interface ShopPage_collectionList_edges_node_collections_edges_node_metadata {
  __typename: "MetadataItem";
  /**
   * Value of a metadata item.
   */
  value: string;
  /**
   * Key of a metadata item.
   */
  key: string;
}

export interface ShopPage_collectionList_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopPage_collectionList_edges_node_collections_edges_node_metadata | null)[];
}

export interface ShopPage_collectionList_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopPage_collectionList_edges_node_collections_edges_node;
}

export interface ShopPage_collectionList_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ShopPage_collectionList_edges_node_collections_edges[];
}

export interface ShopPage_collectionList_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  collections: ShopPage_collectionList_edges_node_collections;
}

export interface ShopPage_collectionList_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopPage_collectionList_edges_node;
}

export interface ShopPage_collectionList {
  __typename: "SectionTypeCountableConnection";
  edges: ShopPage_collectionList_edges[];
}

export interface ShopPage {
  /**
   * Look up a page by ID or slug.
   */
  page: ShopPage_page | null;
  collectionList: ShopPage_collectionList | null;
}
