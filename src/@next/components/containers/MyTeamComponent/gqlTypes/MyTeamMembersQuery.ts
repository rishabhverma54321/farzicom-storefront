/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CompanyMemberFilterInput, UserMetaAccess } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: MyTeamMembersQuery
// ====================================================

export interface MyTeamMembersQuery_company_edges_node_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface MyTeamMembersQuery_company_edges_node_user_user {
  __typename: "User";
  firstName: string;
  lastName: string;
}

export interface MyTeamMembersQuery_company_edges_node_user {
  __typename: "UserMetaType";
  /**
   * The ID of the object.
   */
  id: string;
  user: MyTeamMembersQuery_company_edges_node_user_user | null;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node_teamMember_user {
  __typename: "User";
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node_teamMember {
  __typename: "UserMetaType";
  /**
   * The ID of the object.
   */
  id: string;
  user: MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node_teamMember_user | null;
  department: string | null;
  designation: string | null;
  /**
   * Phone Number of the user
   */
  phone: string | null;
  access: UserMetaAccess | null;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node {
  __typename: "CompanyMembersType";
  /**
   * The ID of the object.
   */
  id: string;
  isApproved: boolean | null;
  teamMember: MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node_teamMember;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges {
  __typename: "CompanyMembersTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges_node | null;
}

export interface MyTeamMembersQuery_company_edges_node_companyTeamMembers {
  __typename: "CompanyMembersTypeConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: MyTeamMembersQuery_company_edges_node_companyTeamMembers_pageInfo;
  /**
   * Contains the nodes in this connection.
   */
  edges: (MyTeamMembersQuery_company_edges_node_companyTeamMembers_edges | null)[];
}

export interface MyTeamMembersQuery_company_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: MyTeamMembersQuery_company_edges_node_avatar | null;
  user: MyTeamMembersQuery_company_edges_node_user | null;
  companyTeamMembers: MyTeamMembersQuery_company_edges_node_companyTeamMembers | null;
}

export interface MyTeamMembersQuery_company_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MyTeamMembersQuery_company_edges_node;
}

export interface MyTeamMembersQuery_company {
  __typename: "CompanyTypeCountableConnection";
  edges: MyTeamMembersQuery_company_edges[];
}

export interface MyTeamMembersQuery {
  company: MyTeamMembersQuery_company | null;
}

export interface MyTeamMembersQueryVariables {
  id?: string | null;
  filter?: CompanyMemberFilterInput | null;
}
