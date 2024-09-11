/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { InfluencerInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInfluencerMutation
// ====================================================

export interface CreateInfluencerMutation_createInfluencer_influencer {
  __typename: "InfluencerType";
  /**
   * The ID of the object.
   */
  id: string;
  metadata: any | null;
  name: string;
  phone: string;
  email: string;
  couponCode: string;
}

export interface CreateInfluencerMutation_createInfluencer {
  __typename: "CreateInfluencer";
  /**
   * An Influencer instance.
   */
  influencer: CreateInfluencerMutation_createInfluencer_influencer | null;
}

export interface CreateInfluencerMutation {
  /**
   * Create Influencer.
   */
  createInfluencer: CreateInfluencerMutation_createInfluencer | null;
}

export interface CreateInfluencerMutationVariables {
  input: InfluencerInput;
}
