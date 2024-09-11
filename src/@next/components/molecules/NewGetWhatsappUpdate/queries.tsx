import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";
import {
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables,
} from "./gqlTypes/updateCheckoutMetadatWhatsapp";

const UpdateCheckoutMetadataWhatsapp = gql`
  mutation updateCheckoutMetadataWhatsapp($id: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $id, input: $input) {
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

export const TypedUpdateCheckoutMetadataWhatsapp = TypedMutation<
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables
>(UpdateCheckoutMetadataWhatsapp);
