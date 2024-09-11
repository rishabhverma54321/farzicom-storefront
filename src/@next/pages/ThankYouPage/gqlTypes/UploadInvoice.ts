/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadInvoice
// ====================================================

export interface UploadInvoice_invoiceUpload {
  __typename: "InvoiceUpload";
  /**
   * Public url of the uploaded file.
   */
  url: string | null;
}

export interface UploadInvoice {
  /**
   * Upload an invoice pdf.
   */
  invoiceUpload: UploadInvoice_invoiceUpload | null;
}

export interface UploadInvoiceVariables {
  uri: string;
}
