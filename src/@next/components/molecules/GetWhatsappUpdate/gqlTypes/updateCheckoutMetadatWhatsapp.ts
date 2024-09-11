/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MetadataInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutMetadatWhatsapp
// ====================================================

export interface updateCheckoutMetadatWhatsapp_updateMetadata_metadataErrors {
  __typename: "MetadataError";
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

export interface updateCheckoutMetadatWhatsapp_updateMetadata_item_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface updateCheckoutMetadatWhatsapp_updateMetadata_item {
  __typename: "ProductVariant" | "Product" | "ProductType" | "Attribute" | "Category" | "Collection" | "DigitalContent" | "User" | "Checkout" | "Order" | "Fulfillment" | "Invoice" | "ServiceAccount" | "App" | "Page";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (updateCheckoutMetadatWhatsapp_updateMetadata_item_metadata | null)[];
}

export interface updateCheckoutMetadatWhatsapp_updateMetadata {
  __typename: "UpdateMetadata";
  metadataErrors: updateCheckoutMetadatWhatsapp_updateMetadata_metadataErrors[];
  item: updateCheckoutMetadatWhatsapp_updateMetadata_item | null;
}

export interface updateCheckoutMetadatWhatsapp {
  /**
   * Updates metadata of an object.
   */
  updateMetadata: updateCheckoutMetadatWhatsapp_updateMetadata | null;
}

export interface updateCheckoutMetadatWhatsappVariables {
  id: string;
  input: MetadataInput[];
}
