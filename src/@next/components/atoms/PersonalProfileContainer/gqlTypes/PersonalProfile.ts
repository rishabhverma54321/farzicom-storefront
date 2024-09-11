/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserMetaAccess } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: PersonalProfile
// ====================================================

export interface PersonalProfile_userMeta_edges_node_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PersonalProfile_userMeta_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: PersonalProfile_userMeta_edges_node_user_avatar | null;
}

export interface PersonalProfile_userMeta_edges_node_company_avatar {
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

export interface PersonalProfile_userMeta_edges_node_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  companyName: string | null;
  avatar: PersonalProfile_userMeta_edges_node_company_avatar | null;
}

export interface PersonalProfile_userMeta_edges_node_companyMembers_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PersonalProfile_userMeta_edges_node_companyMembers_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PersonalProfile_userMeta_edges_node_companyMembers_edges_node;
}

export interface PersonalProfile_userMeta_edges_node_companyMembers {
  __typename: "CompanyTypeCountableConnection";
  edges: PersonalProfile_userMeta_edges_node_companyMembers_edges[];
}

export interface PersonalProfile_userMeta_edges_node_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface PersonalProfile_userMeta_edges_node_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PersonalProfile_userMeta_edges_node_categories_edges_node;
}

export interface PersonalProfile_userMeta_edges_node_categories {
  __typename: "CategoryCountableConnection";
  edges: PersonalProfile_userMeta_edges_node_categories_edges[];
}

export interface PersonalProfile_userMeta_edges_node {
  __typename: "UserMetaType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * email of the user
   */
  email: string | null;
  user: PersonalProfile_userMeta_edges_node_user | null;
  company: PersonalProfile_userMeta_edges_node_company | null;
  /**
   * Phone Number of the user
   */
  phone: string | null;
  department: string | null;
  designation: string | null;
  companyMembers: PersonalProfile_userMeta_edges_node_companyMembers;
  access: UserMetaAccess | null;
  categories: PersonalProfile_userMeta_edges_node_categories;
  isVerified: boolean | null;
}

export interface PersonalProfile_userMeta_edges {
  __typename: "UserMetaTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: PersonalProfile_userMeta_edges_node | null;
}

export interface PersonalProfile_userMeta {
  __typename: "UserMetaTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (PersonalProfile_userMeta_edges | null)[];
}

export interface PersonalProfile {
  userMeta: PersonalProfile_userMeta | null;
}

export interface PersonalProfileVariables {
  userId?: string | null;
}
