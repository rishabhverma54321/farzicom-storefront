/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyNameListingQuery
// ====================================================

export interface CompanyNameListingQuery_companies_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
}

export interface CompanyNameListingQuery_companies_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CompanyNameListingQuery_companies_edges_node;
}

export interface CompanyNameListingQuery_companies {
  __typename: "CompanyTypeCountableConnection";
  edges: CompanyNameListingQuery_companies_edges[];
}

export interface CompanyNameListingQuery {
  /**
   * List of the shop's companies.
   */
  companies: CompanyNameListingQuery_companies | null;
}
