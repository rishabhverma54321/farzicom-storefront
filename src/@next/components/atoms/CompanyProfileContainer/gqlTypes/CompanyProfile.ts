/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CompanyStatus } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CompanyProfile
// ====================================================

export interface CompanyProfile_company_edges_node_metadata {
  __typename: "MetadataItemV2";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CompanyProfile_company_edges_node_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CompanyProfile_company_edges_node_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CompanyProfile_company_edges_node_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface CompanyProfile_company_edges_node_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CompanyProfile_company_edges_node_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CompanyProfile_company_edges_node_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface CompanyProfile_company_edges_node_shippingAddress_edges_node_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CompanyProfile_company_edges_node_shippingAddress_edges_node {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CompanyProfile_company_edges_node_shippingAddress_edges_node_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface CompanyProfile_company_edges_node_shippingAddress_edges {
  __typename: "AddressCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CompanyProfile_company_edges_node_shippingAddress_edges_node;
}

export interface CompanyProfile_company_edges_node_shippingAddress {
  __typename: "AddressCountableConnection";
  edges: CompanyProfile_company_edges_node_shippingAddress_edges[];
}

export interface CompanyProfile_company_edges_node_billingAddress_edges_node_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CompanyProfile_company_edges_node_billingAddress_edges_node {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CompanyProfile_company_edges_node_billingAddress_edges_node_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface CompanyProfile_company_edges_node_billingAddress_edges {
  __typename: "AddressCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CompanyProfile_company_edges_node_billingAddress_edges_node;
}

export interface CompanyProfile_company_edges_node_billingAddress {
  __typename: "AddressCountableConnection";
  edges: CompanyProfile_company_edges_node_billingAddress_edges[];
}

export interface CompanyProfile_company_edges_node_avatar {
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

export interface CompanyProfile_company_edges_node_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CompanyProfile_company_edges_node_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CompanyProfile_company_edges_node_categories_edges_node;
}

export interface CompanyProfile_company_edges_node_categories {
  __typename: "CategoryCountableConnection";
  edges: CompanyProfile_company_edges_node_categories_edges[];
}

export interface CompanyProfile_company_edges_node_companyType_edges_node {
  __typename: "CompanyVariantType";
  /**
   * The ID of the object.
   */
  id: string;
  companyType: string | null;
  created: any;
}

export interface CompanyProfile_company_edges_node_companyType_edges {
  __typename: "CompanyVariantTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CompanyProfile_company_edges_node_companyType_edges_node | null;
}

export interface CompanyProfile_company_edges_node_companyType {
  __typename: "CompanyVariantTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CompanyProfile_company_edges_node_companyType_edges | null)[];
}

export interface CompanyProfile_company_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CompanyProfile_company_edges_node_metadata | null)[];
  defaultBillingAddress: CompanyProfile_company_edges_node_defaultBillingAddress | null;
  defaultShippingAddress: CompanyProfile_company_edges_node_defaultShippingAddress | null;
  shippingAddress: CompanyProfile_company_edges_node_shippingAddress;
  billingAddress: CompanyProfile_company_edges_node_billingAddress;
  companyName: string | null;
  gstNumber: string | null;
  panNumber: string | null;
  noOfSpindles: number | null;
  status: CompanyStatus | null;
  avatar: CompanyProfile_company_edges_node_avatar | null;
  isVerified: boolean;
  created: any;
  categories: CompanyProfile_company_edges_node_categories;
  companyType: CompanyProfile_company_edges_node_companyType;
}

export interface CompanyProfile_company_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CompanyProfile_company_edges_node;
}

export interface CompanyProfile_company {
  __typename: "CompanyTypeCountableConnection";
  edges: CompanyProfile_company_edges[];
}

export interface CompanyProfile {
  company: CompanyProfile_company | null;
}

export interface CompanyProfileVariables {
  id?: string | null;
  userId?: string | null;
}
