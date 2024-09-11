/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NotificationInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: NotifyMe
// ====================================================

export interface NotifyMe_createNotification_notification {
  __typename: "NotificationType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  email: string;
  phone: string;
  created: any;
  isNotified: boolean;
}

export interface NotifyMe_createNotification_errors {
  __typename: "Error";
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

export interface NotifyMe_createNotification {
  __typename: "CreateNotification";
  /**
   * A Notification instance.
   */
  notification: NotifyMe_createNotification_notification | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: NotifyMe_createNotification_errors[];
}

export interface NotifyMe {
  /**
   * Create Notification.
   */
  createNotification: NotifyMe_createNotification | null;
}

export interface NotifyMeVariables {
  input: NotificationInput;
}
