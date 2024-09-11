// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import { OrderListQuery } from "./gqlTypes/OrderListQuery";

// export const orderListQuery = gql`
//   query OrderListQuery(
//     $userType: String
//     $companyId: ID
//     $after: String
//     $filter: OrderB2BSearchFilter
//   ) {
//     ordersb2b(
//       first: 6
//       userType: $userType
//       companyId: $companyId
//       after: $after
//       filter: $filter
//     ) {
//       id
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
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
// export const TypeOrderListQuery = TypedQuery<OrderListQuery, {}>(
//   orderListQuery
// );
