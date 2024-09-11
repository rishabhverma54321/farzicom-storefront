/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NavBarInformation
// ====================================================

export interface NavBarInformation_section_edges_node_metadata {
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

export interface NavBarInformation_section_edges_node {
  __typename: "SectionType";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (NavBarInformation_section_edges_node_metadata | null)[];
}

export interface NavBarInformation_section_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: NavBarInformation_section_edges_node;
}

export interface NavBarInformation_section {
  __typename: "SectionTypeCountableConnection";
  edges: NavBarInformation_section_edges[];
}

export interface NavBarInformation {
  section: NavBarInformation_section | null;
}
