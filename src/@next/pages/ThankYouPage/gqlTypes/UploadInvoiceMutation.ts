/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadInvoiceMutation
// ====================================================

export interface UploadInvoiceMutation_invoiceUpload {
  __typename: "InvoiceUpload";
  /**
   * Public url of the uploaded file.
   */
  url: string | null;
}

export interface UploadInvoiceMutation {
  /**
   * Upload an invoice pdf.
   */
  invoiceUpload: UploadInvoiceMutation_invoiceUpload | null;
}

export interface UploadInvoiceMutationVariables {
  uri: string;
}
