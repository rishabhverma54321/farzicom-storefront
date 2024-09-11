// import { TypedMutation } from "@temp/core/mutations";
// import gql from "graphql-tag";
// import {
//   ContactUsCreateVariables,
//   ContactUsCreate,
// } from "./gqlTypes/ContactUsCreate";

// const ContactUsCreateMutation = gql`
//   mutation ContactUsCreate($input: ContactUsInput!) {
//     contactUsCreate(input: $input) {
//       contactUs {
//         id
//         name
//         phone
//         email
//         queryType
//         message
//       }
//       contactUsErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// export const TypedContactUsCreateMutation = TypedMutation<
//   ContactUsCreate,
//   ContactUsCreateVariables
// >(ContactUsCreateMutation);
