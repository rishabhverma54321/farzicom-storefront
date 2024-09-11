// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import {
//   DispatchItemQuery,
//   DispatchItemQueryVariables,
// } from "./gqlTypes/DispatchItemQuery";
// import {
//   OrderItemQuery,
//   OrderItemQueryVariables,
// } from "./gqlTypes/OrderItemQuery";

// export const dispatchItemQuery = gql`
//   query DispatchItemQuery($id: ID) {
//     shipmentsB2B(first: 1, id: $id) {
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
// export const TypeDispatchItemQuery = TypedQuery<
//   DispatchItemQuery,
//   DispatchItemQueryVariables
// >(dispatchItemQuery);

// export const orderItemQuery = gql`
//   query OrderItemQuery($id: ID) {
//     ordersb2b(first: 1, id: $id) {
//       pendingQuantity
//       order {
//         id
//         status
//         created
//         lines {
//           productName
//           quantity
//         }
//         metadata {
//           key
//           value
//         }
//       }

//       shipments {
//         id
//         shipmentId
//         status
//         pendingQuantity
//         dispatchItemQuantity
//         createdAt
//         isCancelled
//         cancelledAt
//         items {
//           id
//           itemName
//         }
//       }
//       buyerCompany {
//         id
//         companyName
//         avatar {
//           url
//         }
//       }
//       supplierCompany {
//         id
//         companyName
//         avatar {
//           url
//         }
//       }
//     }
//   }
// `;
// export const TypeOrderItemQuery = TypedQuery<
//   OrderItemQuery,
//   OrderItemQueryVariables
// >(orderItemQuery);
