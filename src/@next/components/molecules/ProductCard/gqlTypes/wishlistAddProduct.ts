/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: wishlistAddProduct
// ====================================================

export interface wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges_node_product;
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges_node;
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items {
  __typename: "WishlistItemCountableConnection";
  edges: wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items_edges[];
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist_wishlist {
  __typename: "Wishlist";
  createdAt: any;
  items: wishlistAddProduct_WishlistAddProduct_wishlist_wishlist_items;
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface wishlistAddProduct_WishlistAddProduct_wishlist {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  wishlist: wishlistAddProduct_WishlistAddProduct_wishlist_wishlist;
  product: wishlistAddProduct_WishlistAddProduct_wishlist_product;
}

export interface wishlistAddProduct_WishlistAddProduct {
  __typename: "WishlistAddProductMutation";
  /**
   * The wishlist of the current user.
   */
  wishlist: (wishlistAddProduct_WishlistAddProduct_wishlist | null)[] | null;
}

export interface wishlistAddProduct {
  /**
   * Add product to the current user's wishlist.
   */
  WishlistAddProduct: wishlistAddProduct_WishlistAddProduct | null;
}

export interface wishlistAddProductVariables {
  productId: string;
}
