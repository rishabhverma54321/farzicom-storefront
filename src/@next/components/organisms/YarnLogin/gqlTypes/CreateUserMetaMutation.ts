/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserMetaInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserMetaMutation
// ====================================================

export interface CreateUserMetaMutation_createUserMeta_userMeta_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserMetaMutation_createUserMeta_userMeta {
  __typename: "UserMetaType";
  /**
   * The ID of the object.
   */
  id: string;
  user: CreateUserMetaMutation_createUserMeta_userMeta_user | null;
}

export interface CreateUserMetaMutation_createUserMeta {
  __typename: "CreateUserMeta";
  /**
   * create user_meta
   */
  userMeta: CreateUserMetaMutation_createUserMeta_userMeta | null;
}

export interface CreateUserMetaMutation {
  /**
   * creates a new user_meta
   */
  createUserMeta: CreateUserMetaMutation_createUserMeta | null;
}

export interface CreateUserMetaMutationVariables {
  userId: string;
  input?: UserMetaInput | null;
}
