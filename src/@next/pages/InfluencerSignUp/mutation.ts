import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";
import {
  CreateInfluencerMutation,
  CreateInfluencerMutationVariables,
} from "./gqlTypes/CreateInfluencerMutation";

const createInfluencer = gql`
  mutation CreateInfluencerMutation($input: InfluencerInput!) {
    createInfluencer(input: $input) {
      influencer {
        id
        metadata
        name
        phone
        email
        couponCode
      }
    }
  }
`;

export const TypedCreateInfluencerMutation = TypedMutation<
  CreateInfluencerMutation,
  CreateInfluencerMutationVariables
>(createInfluencer);
