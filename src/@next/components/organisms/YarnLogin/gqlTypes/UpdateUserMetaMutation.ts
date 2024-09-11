/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserMetaInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserMetaMutation
// ====================================================

export interface UpdateUserMetaMutation_updateUserMeta_userMeta_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserMetaMutation_updateUserMeta_userMeta {
  __typename: "UserMetaType";
  /**
   * The ID of the object.
   */
  id: string;
  user: UpdateUserMetaMutation_updateUserMeta_userMeta_user | null;
}

export interface UpdateUserMetaMutation_updateUserMeta {
  __typename: "UpdateUserMeta";
  /**
   * updating user_meta instance
   */
  userMeta: UpdateUserMetaMutation_updateUserMeta_userMeta | null;
}

export interface UpdateUserMetaMutation {
  /**
   * Updates user_meta
   */
  updateUserMeta: UpdateUserMetaMutation_updateUserMeta | null;
}

export interface UpdateUserMetaMutationVariables {
  userId: string;
  input?: UserMetaInput | null;
}
