// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import {
//   PersonalProfile,
//   PersonalProfileVariables,
// } from "./gqlTypes/PersonalProfile";

// export const personalProfileInfoQuery = gql`
//   query PersonalProfile($userId: ID) {
//     userMeta(userId: $userId, first: 1) {
//       edges {
//         node {
//           id
//           email
//           user {
//             id
//             email
//             firstName
//             lastName
//             avatar {
//               url
//             }
//           }
//           company {
//             id
//             companyName
//             avatar {
//               url
//               alt
//             }
//           }
//           phone
//           department
//           designation
//           companyMembers(first: 5) {
//             edges {
//               node {
//                 id
//               }
//             }
//           }
//           access
//           categories(first: 10) {
//             edges {
//               node {
//                 id
//                 name
//               }
//             }
//           }
//           isVerified
//         }
//       }
//     }
//   }
// `;

// export const TypedPersonalProfileInfoQuery = TypedQuery<
//   PersonalProfile,
//   PersonalProfileVariables
// >(personalProfileInfoQuery);
