import gql from "graphql-tag";
import { TypedMutation } from "../../../../core/mutations";
import {
  CreateRazorpayOrder,
  CreateRazorpayOrderVariables,
} from "./gqlTypes/CreateRazorpayOrder";

export const orderIdMutation = gql`
  mutation CreateRazorpayOrder($input: RazorpayCreateOrderInput!) {
    razorpayOrderCreate(input: $input) {
      razorpayOrder {
        id
        amount
        amountPaid
        amountDue
        currency
        status
        createdAt
      }
      razorpayErrors {
        field
        code
        message
      }
    }
  }
`;

export const TypedOrderIdMutation = TypedMutation<
  CreateRazorpayOrder,
  CreateRazorpayOrderVariables
>(orderIdMutation);
