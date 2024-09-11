/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GenericFormInput, GenericFormErrorCode } from "../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: GenericFormCreateMutation
// ====================================================

export interface GenericFormCreateMutation_genericFormCreate_genericForm {
  __typename: "GenericFormType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  responseId: string;
  responseBody: string | null;
  createdAt: any;
}

export interface GenericFormCreateMutation_genericFormCreate_genericFormErrors {
  __typename: "GenericFormError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: GenericFormErrorCode;
}

export interface GenericFormCreateMutation_genericFormCreate {
  __typename: "GenericFormCreate";
  /**
   * A generic form instance.
   */
  genericForm: GenericFormCreateMutation_genericFormCreate_genericForm | null;
  genericFormErrors: GenericFormCreateMutation_genericFormCreate_genericFormErrors[];
}

export interface GenericFormCreateMutation {
  /**
   * Create a new generic form entry.
   */
  genericFormCreate: GenericFormCreateMutation_genericFormCreate | null;
}

export interface GenericFormCreateMutationVariables {
  input: GenericFormInput;
}
