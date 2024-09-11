/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopSections
// ====================================================

export interface ShopSections_sections_edges_node_metadata {
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

export interface ShopSections_sections_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopSections_sections_edges_node_metadata | null)[];
  description: string;
}

export interface ShopSections_sections_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopSections_sections_edges_node;
}

export interface ShopSections_sections {
  __typename: "SectionTypeCountableConnection";
  edges: ShopSections_sections_edges[];
}

export interface ShopSections {
  /**
   * List of the shop's sections.
   */
  sections: ShopSections_sections | null;
}
