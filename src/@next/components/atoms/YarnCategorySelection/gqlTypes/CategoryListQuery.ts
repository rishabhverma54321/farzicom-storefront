/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CategoryFilterInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CategoryListQuery
// ====================================================

export interface CategoryListQuery_categories_edges_node_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CategoryListQuery_categories_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryListQuery_categories_edges_node_children_edges_node;
}

export interface CategoryListQuery_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryListQuery_categories_edges_node_children_edges[];
}

export interface CategoryListQuery_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of children of the category.
   */
  children: CategoryListQuery_categories_edges_node_children | null;
}

export interface CategoryListQuery_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryListQuery_categories_edges_node;
}

export interface CategoryListQuery_categories {
  __typename: "CategoryCountableConnection";
  edges: CategoryListQuery_categories_edges[];
}

export interface CategoryListQuery {
  /**
   * List of the shop's categories.
   */
  categories: CategoryListQuery_categories | null;
}

export interface CategoryListQueryVariables {
  filter?: CategoryFilterInput | null;
}
