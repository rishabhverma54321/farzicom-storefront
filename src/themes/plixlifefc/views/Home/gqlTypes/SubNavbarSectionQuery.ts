/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubNavbarSectionQuery
// ====================================================

export interface SubNavbarSectionQuery_section_edges_node_collections_edges_node_metadata {
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

export interface SubNavbarSectionQuery_section_edges_node_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether the collection is published.
   */
  isPublished: boolean;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SubNavbarSectionQuery_section_edges_node_collections_edges_node_metadata | null)[];
}

export interface SubNavbarSectionQuery_section_edges_node_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SubNavbarSectionQuery_section_edges_node_collections_edges_node;
}

export interface SubNavbarSectionQuery_section_edges_node_collections {
  __typename: "CollectionCountableConnection";
  edges: SubNavbarSectionQuery_section_edges_node_collections_edges[];
}

export interface SubNavbarSectionQuery_section_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isPublished: boolean;
  collections: SubNavbarSectionQuery_section_edges_node_collections;
}

export interface SubNavbarSectionQuery_section_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SubNavbarSectionQuery_section_edges_node;
}

export interface SubNavbarSectionQuery_section {
  __typename: "SectionTypeCountableConnection";
  edges: SubNavbarSectionQuery_section_edges[];
}

export interface SubNavbarSectionQuery {
  section: SubNavbarSectionQuery_section | null;
}
