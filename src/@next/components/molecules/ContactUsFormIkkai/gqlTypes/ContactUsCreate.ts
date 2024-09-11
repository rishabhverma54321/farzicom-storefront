/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ContactUsInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: ContactUsCreate
// ====================================================

export interface ContactUsCreate_contactUsCreate_contactUs {
  __typename: "ContactUsType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  phone: string | null;
  email: string;
  queryType: string;
  message: string | null;
}

export interface ContactUsCreate_contactUsCreate_contactUsErrors {
  __typename: "ContactUsError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ContactUsCreate_contactUsCreate {
  __typename: "ContactUsCreate";
  /**
   * A contactus instance.
   */
  contactUs: ContactUsCreate_contactUsCreate_contactUs | null;
  contactUsErrors: ContactUsCreate_contactUsCreate_contactUsErrors[];
}

export interface ContactUsCreate {
  /**
   * Create a new ContactUs entry.
   */
  contactUsCreate: ContactUsCreate_contactUsCreate | null;
}

export interface ContactUsCreateVariables {
  input: ContactUsInput;
}
