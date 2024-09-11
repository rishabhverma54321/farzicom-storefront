/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecipeDetails
// ====================================================

export interface RecipeDetails_product_metadata {
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

export interface RecipeDetails_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface RecipeDetails_product_collections {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface RecipeDetails_product {
  __typename: "Product";
  name: string;
  descriptionJson: any;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (RecipeDetails_product_metadata | null)[];
  /**
   * List of images for the product.
   */
  images: (RecipeDetails_product_images | null)[] | null;
  /**
   * List of collections for the product.
   */
  collections: (RecipeDetails_product_collections | null)[] | null;
}

export interface RecipeDetails {
  /**
   * Look up a product by ID.
   */
  product: RecipeDetails_product | null;
}

export interface RecipeDetailsVariables {
  id: string;
}
