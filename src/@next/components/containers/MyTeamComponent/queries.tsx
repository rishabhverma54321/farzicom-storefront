// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import {
//   MyTeamMembersQuery,
//   MyTeamMembersQueryVariables,
// } from "./gqlTypes/MyTeamMembersQuery";

// export const myTeamMembersQuery = gql`
//   query MyTeamMembersQuery($id: ID, $filter: CompanyMemberFilterInput) {
//     company(first: 1, id: $id) {
//       edges {
//         node {
//           id
//           companyName
//           avatar {
//             url
//             alt
//           }
//           user {
//             id
//             user {
//               firstName
//               lastName
//             }
//           }
//           companyTeamMembers(first: 100, filter: $filter) {
//             pageInfo {
//               hasNextPage
//               endCursor
//             }
//             edges {
//               node {
//                 id
//                 isApproved
//                 teamMember {
//                   id
//                   user {
//                     firstName
//                     lastName
//                     email
//                     isActive
//                     id
//                   }
//                   department
//                   designation
//                   phone
//                   access
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// export const TypedMyTeamMembersQuery = TypedQuery<
//   MyTeamMembersQuery,
//   MyTeamMembersQueryVariables
// >(myTeamMembersQuery);

// export default TypedMyTeamMembersQuery;
