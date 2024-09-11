import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import { OTPRequest, OTPRequestVariables } from "./gqlTypes/OTPRequest";

const requestOTPMutation = gql`
  mutation OTPRequestNew($phone: String!) {
    RequestOTP: requestOtp(phone: $phone) {
      message
      otpErrors {
        code
        field
        message
      }
    }
  }
`;

export const TypedRequestOTPMutation = TypedMutation<
  OTPRequest,
  OTPRequestVariables
>(requestOTPMutation);
