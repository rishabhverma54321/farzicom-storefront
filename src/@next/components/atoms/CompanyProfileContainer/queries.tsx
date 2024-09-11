// import gql from "graphql-tag";
// import { TypedQuery } from "../../../../core/queries";
// import {
//   CompanyProfile,
//   CompanyProfileVariables,
// } from "./gqlTypes/CompanyProfile";

// export const checkoutAddressFragment = gql`
//   fragment Address on Address {
//     id
//     firstName
//     lastName
//     companyName
//     streetAddress1
//     streetAddress2
//     city
//     postalCode
//     country {
//       code
//       country
//     }
//     countryArea
//     phone
//     isDefaultBillingAddress
//     isDefaultShippingAddress
//   }
// `;

// export const companyProfileInfoQuery = gql`
//   ${checkoutAddressFragment}
//   query CompanyProfile($id: ID, $userId: ID) {
//     company(id: $id, userId: $userId, first: 1) {
//       edges {
//         node {
//           id
//           metadata {
//             key
//             value
//           }
//           defaultBillingAddress {
//             ...Address
//           }
//           defaultShippingAddress {
//             ...Address
//           }

//           shippingAddress(first: 10) {
//             edges {
//               node {
//                 ...Address
//               }
//             }
//           }
//           billingAddress(first: 10) {
//             edges {
//               node {
//                 ...Address
//               }
//             }
//           }
//           companyName
//           gstNumber
//           panNumber
//           noOfSpindles
//           status
//           avatar {
//             url
//             alt
//           }
//           isVerified
//           created
//           categories(first: 100) {
//             edges {
//               node {
//                 id
//                 name
//               }
//             }
//           }
//           companyType(first: 10) {
//             edges {
//               node {
//                 id
//                 companyType
//                 created
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// export const TypedcompanyProfileInfoQuery = TypedQuery<
//   CompanyProfile,
//   CompanyProfileVariables
// >(companyProfileInfoQuery);
