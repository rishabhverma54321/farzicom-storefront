/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HorecaQuery
// ====================================================

export interface HorecaQuery_sections_edges_node_images_edges_node {
  __typename: "SectionImageType";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface HorecaQuery_sections_edges_node_images_edges {
  __typename: "SectionImageTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: HorecaQuery_sections_edges_node_images_edges_node | null;
}

export interface HorecaQuery_sections_edges_node_images {
  __typename: "SectionImageTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HorecaQuery_sections_edges_node_images_edges | null)[];
}

export interface HorecaQuery_sections_edges_node_metadata {
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

export interface HorecaQuery_sections_edges_node {
  __typename: "SectionType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  images: HorecaQuery_sections_edges_node_images;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (HorecaQuery_sections_edges_node_metadata | null)[];
}

export interface HorecaQuery_sections_edges {
  __typename: "SectionTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HorecaQuery_sections_edges_node;
}

export interface HorecaQuery_sections {
  __typename: "SectionTypeCountableConnection";
  edges: HorecaQuery_sections_edges[];
}

export interface HorecaQuery {
  /**
   * List of the shop's sections.
   */
  sections: HorecaQuery_sections | null;
}
