/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SectionDetailsWithoutChildren
// ====================================================

export interface SectionDetailsWithoutChildren_section_edges_node_collections_edges_node_metadata {
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

export interface SectionDetailsWithoutChildren_section_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SectionDetailsWithoutChildren_section_edges_node_collections_edges_node_metadata | null)[];
}

export interface SectionDetailsWithoutChildren_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetailsWithoutChildren_section_edges_node_collections_edges_node;
}

export interface SectionDetailsWithoutChildren_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SectionDetailsWithoutChildren_section_edges_node_collections_edges[];
}

export interface SectionDetailsWithoutChildren_section_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  collections: SectionDetailsWithoutChildren_section_edges_node_collections;
}

export interface SectionDetailsWithoutChildren_section_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SectionDetailsWithoutChildren_section_edges_node;
}

export interface SectionDetailsWithoutChildren_section {
  __typename: "SectionTypeCountableConnection";
  edges: SectionDetailsWithoutChildren_section_edges[];
}

export interface SectionDetailsWithoutChildren {
  section: SectionDetailsWithoutChildren_section | null;
}

export interface SectionDetailsWithoutChildrenVariables {
  firstPage: number;
  id?: string | null;
  name?: string | null;
}
