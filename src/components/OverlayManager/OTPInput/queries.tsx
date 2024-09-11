import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";

import {
  OTPAuthentication,
  OTPAuthenticationVariables,
} from "./gqlTypes/OTPAuthentication";

const createOTPTokeMutation = gql`
  mutation OTPAuthentication($phone: String!, $otp: String!) {
    CreateTokenOTP: otpTokenCreate(otp: $otp, phone: $phone) {
      token
      refreshToken
      csrfToken
      user {
        id
        email
        firstName
        lastName
      }
      otpErrors {
        code
        field
        message
      }
    }
  }
`;

export const TypedCreateOTPTokeMutation = TypedMutation<
  OTPAuthentication,
  OTPAuthenticationVariables
>(createOTPTokeMutation);
