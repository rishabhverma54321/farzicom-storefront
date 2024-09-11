// // import { TypedMutation } from "@temp/core/mutations";
// import gql from "graphql-tag";
// import { TypedMutation } from "../../../../core/mutations";
// import {
//   CreateUserMetaMutation,
//   CreateUserMetaMutationVariables,
// } from "./gqlTypes/CreateUserMetaMutation";
// import {
//   UpdateUserMetaMutation,
//   UpdateUserMetaMutationVariables,
// } from "./gqlTypes/UpdateUserMetaMutation";

// const createUserMetaMutation = gql`
//   mutation CreateUserMetaMutation($userId: ID!, $input: UserMetaInput) {
//     createUserMeta(userId: $userId, input: $input) {
//       userMeta {
//         id
//         user {
//           id
//           firstName
//           lastName
//         }
//       }
//     }
//   }
// `;

// export const TypedCreateUserMetaMutation = TypedMutation<
//   CreateUserMetaMutation,
//   CreateUserMetaMutationVariables
// >(createUserMetaMutation);

// const updateUserMetaMutation = gql`
//   mutation UpdateUserMetaMutation($userId: ID!, $input: UserMetaInput) {
//     updateUserMeta(userId: $userId, input: $input) {
//       userMeta {
//         id
//         user {
//           id
//           firstName
//           lastName
//         }
//       }
//     }
//   }
// `;

// export const TypedUpdateUserMetaMutation = TypedMutation<
//   UpdateUserMetaMutation,
//   UpdateUserMetaMutationVariables
// >(updateUserMetaMutation);
