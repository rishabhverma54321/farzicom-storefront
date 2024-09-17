/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pagesDetails
// ====================================================

export interface pagesDetails_page_metadata {
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

export interface pagesDetails_page {
  __typename: "Page";
  contentJson: any;
  /**
   * The ID of the object.
   */
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (pagesDetails_page_metadata | null)[];
}

export interface pagesDetails {
  /**
   * Look up a page by ID or slug.
   */
  page: pagesDetails_page | null;
}

export interface pagesDetailsVariables {
  slug: string;
}
