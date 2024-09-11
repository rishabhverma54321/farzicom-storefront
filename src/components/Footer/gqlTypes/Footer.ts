/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Footer
// ====================================================

export interface Footer_menu_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Footer_menu_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Footer_menu_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface Footer_menu_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: Footer_menu_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: Footer_menu_items_children_collection | null;
  page: Footer_menu_items_children_page | null;
}

export interface Footer_menu_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Footer_menu_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Footer_menu_items_page {
  __typename: "Page";
  slug: string;
}

export interface Footer_menu_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  children: (Footer_menu_items_children | null)[] | null;
  category: Footer_menu_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: Footer_menu_items_collection | null;
  page: Footer_menu_items_page | null;
}

export interface Footer_menu {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  items: (Footer_menu_items | null)[] | null;
}

export interface Footer {
  /**
   * Look up a navigation menu by ID or name.
   */
  menu: Footer_menu | null;
}
