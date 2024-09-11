import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";

const updateAddressMetadata = gql`
mutation UpdateMetadata($updateMetadataId: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $updateMetadataId, input: $input) {
      metadataErrors {
        field
        message
      }
      item {
        metadata {
          key
          value
        }
      }
    }
  }
  
`;

export const TypedupdateAddressMetadata = TypedMutation<
any,any>(updateAddressMetadata);