// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import { DispatchListQuery } from "./gqlTypes/DispatchListQuery";
// import {
//   GetDispatchItemQuery,
//   GetDispatchItemQueryVariables,
// } from "./gqlTypes/GetDispatchItemQuery";

// // userType: "BUYER"
// // companyId: "Q29tcGFueVR5cGU6ODA="
// // after: $after
// export const dispatchListQuery = gql`
//   query DispatchListQuery(
//     $userType: String
//     $companyId: String
//     $after: String
//     $filter: ShipmentFilterInput
//   ) {
//     shipmentsB2B(
//       first: 6
//       after: $after
//       userType: $userType
//       companyId: $companyId
//       filter: $filter
//     ) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         node {
//           id
//           status
//           estimateDeliveryDate
//           deliveredAt
//           createdAt
//           isCancelled
//           cancelledAt
//           metadata {
//             key
//             value
//           }
//           shipmentDispute(first: 1) {
//             edges {
//               node {
//                 id
//                 status
//                 description
//                 status
//               }
//             }
//           }
//           order {
//             id
//             metadata {
//               key
//               value
//             }
//           }
//           shippingAddress(first: 1) {
//             edges {
//               node {
//                 firstName
//                 lastName
//                 companyName
//                 streetAddress1
//                 streetAddress2
//                 city
//                 cityArea
//                 postalCode
//                 country {
//                   country
//                 }
//               }
//             }
//           }
//           items {
//             id
//             itemName
//             itemQuantity
//             createdAt
//             productVariantId {
//               id
//               name
//               product {
//                 name
//               }
//             }
//           }
//           history {
//             id
//             dispatchStatus
//             dispatchStatusDate
//             etaRemain
//           }
//           payment {
//             id
//             paymentType
//             paymentTotal
//             paymentStatus
//             accountName
//             branch
//             bank
//             accountNo
//             ifscCode
//           }
//           paymentInvoice {
//             id
//             yarnPayment
//             shipping
//             convenienceFee
//           }
//           document {
//             id
//             pi
//             taxInvoice
//             eway
//             packingList
//             insurance
//             lRCopy
//             testReport
//             packingList
//           }
//           buyerCompany {
//             id
//             companyName
//             avatar {
//               url
//             }
//           }
//           supplierCompany {
//             id
//             companyName
//             avatar {
//               url
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const getDispatchItemQuery = gql`
//   query GetDispatchItemQuery($id: ID) {
//     shipmentsB2B(id: $id, first: 1) {
//       edges {
//         node {
//           id
//           status
//           estimateDeliveryDate
//           createdAt
//           isCancelled
//           cancelledAt
//           metadata {
//             key
//             value
//           }
//           shippingAddress(first: 1) {
//             edges {
//               node {
//                 firstName
//                 lastName
//                 streetAddress1
//                 streetAddress2
//                 city
//                 cityArea
//                 postalCode
//                 country {
//                   country
//                 }
//               }
//             }
//           }
//           items {
//             id
//             itemName
//             itemQuantity
//             createdAt
//           }
//           history {
//             id
//             dispatchStatus
//             dispatchStatusDate
//             etaRemain
//           }
//           payment {
//             id
//             accountName
//             branch
//             bank
//             accountNo
//             ifscCode
//           }
//           document {
//             id
//             pi
//             taxInvoice
//             eway
//             packingList
//             insurance
//             lRCopy
//             packingList
//           }
//         }
//       }
//     }
//   }
// `;
// export const TypeDispatchListQuery = TypedQuery<DispatchListQuery, {}>(
//   dispatchListQuery
// );
// export const TypeGetDispatchItemQuery = TypedQuery<
//   GetDispatchItemQuery,
//   GetDispatchItemQueryVariables
// >(getDispatchItemQuery);
