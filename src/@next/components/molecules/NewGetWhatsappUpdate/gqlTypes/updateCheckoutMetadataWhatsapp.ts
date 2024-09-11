/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MetadataInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutMetadataWhatsapp
// ====================================================

export interface updateCheckoutMetadataWhatsapp_updateMetadata_metadataErrors {
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

export interface updateCheckoutMetadataWhatsapp_updateMetadata_item_metadata {
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

export interface updateCheckoutMetadataWhatsapp_updateMetadata_item {
  __typename: "User" | "Checkout" | "ProductVariant" | "Product" | "ProductType" | "Attribute" | "Category" | "Collection" | "DigitalContent" | "Order" | "Fulfillment" | "Invoice" | "CheckoutType" | "Page" | "ShipmentType" | "ShipmentItemType" | "ServiceAccount" | "App";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (updateCheckoutMetadataWhatsapp_updateMetadata_item_metadata | null)[];
}

export interface updateCheckoutMetadataWhatsapp_updateMetadata {
  __typename: "UpdateMetadata";
  metadataErrors: updateCheckoutMetadataWhatsapp_updateMetadata_metadataErrors[];
  item: updateCheckoutMetadataWhatsapp_updateMetadata_item | null;
}

export interface updateCheckoutMetadataWhatsapp {
  /**
   * Updates metadata of an object.
   */
  updateMetadata: updateCheckoutMetadataWhatsapp_updateMetadata | null;
}

export interface updateCheckoutMetadataWhatsappVariables {
  id: string;
  input: MetadataInput[];
}
