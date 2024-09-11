/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionQuery
// ====================================================

export interface CollectionQuery_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  descriptionJson: any;
}

export interface CollectionQuery {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionQuery_collection | null;
}

export interface CollectionQueryVariables {
  id: string;
}
