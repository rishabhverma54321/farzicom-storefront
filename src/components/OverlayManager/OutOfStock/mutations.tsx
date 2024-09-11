import gql from "graphql-tag";
import { TypedMutation } from "@temp/core/mutations";
import { NotifyMe, NotifyMeVariables } from "./gqlTypes/NotifyMe";

export const NotifyMeMutation = gql`
  mutation NotifyMe($input: NotificationInput!) {
    createNotification(input: $input) {
      notification {
        id
        name
        email
        phone
        created
        isNotified
      }
      errors {
        field
        message
      }
    }
  }
`;

export const TypedNotifyMeMutation = TypedMutation<NotifyMe, NotifyMeVariables>(
  NotifyMeMutation
);
