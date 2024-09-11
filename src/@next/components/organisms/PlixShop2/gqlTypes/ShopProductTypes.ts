/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopProductTypes
// ====================================================

export interface ShopProductTypes_productTypes_edges_node {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ShopProductTypes_productTypes_edges {
  __typename: "ProductTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopProductTypes_productTypes_edges_node;
}

export interface ShopProductTypes_productTypes {
  __typename: "ProductTypeCountableConnection";
  edges: ShopProductTypes_productTypes_edges[];
}

export interface ShopProductTypes {
  /**
   * List of the shop's product types.
   */
  productTypes: ShopProductTypes_productTypes | null;
}
