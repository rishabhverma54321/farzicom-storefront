import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";

const updateDOB = gql`
mutation UpdateMetadata($updateMetadataId: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $updateMetadataId, input: $input) {
      item {
        ... on User {
          id
          metadata {
            key
            value
          }
        }
      }
      metadataErrors {
        field
        message
      }
    }
  }
  
`;

export const UpdateUserMetadata = TypedMutation<
any,any>(updateDOB);