// import gql from "graphql-tag";
// import { TypedQuery } from "../../../../core/queries";
// import { Wishlist, WishlistVariables } from "./gqlTypes/Wishlist";

// export const getWishlist = gql`
//   query Wishlist($first: Int!) {
//     wishlist(first: 1) {
//       edges {
//         node {
//           wishlist {
//             id
//             items(first: $first) {
//               edges {
//                 node {
//                   id
//                   product {
//                     id
//                     name
//                     isAvailableForPurchase
//                     metadata {
//                       key
//                       value
//                     }
//                     thumbnail {
//                       url
//                     }
//                     images {
//                       url
//                     }
//                     variants {
//                       id
//                       sku
//                       name

//                       quantityAvailable(countryCode: IN)
//                       images {
//                         id
//                         url
//                         alt
//                       }
//                       pricing {
//                         onSale
//                         priceUndiscounted {
//                           gross {
//                             amount
//                             currency
//                           }
//                           net {
//                             amount
//                             currency
//                           }
//                         }
//                         price {
//                           gross {
//                             amount
//                             currency
//                           }
//                           net {
//                             amount
//                             currency
//                           }
//                         }
//                       }
//                     }

//                     pricing {
//                       priceRangeUndiscounted {
//                         start {
//                           net {
//                             amount
//                             currency
//                           }
//                           gross {
//                             amount
//                             currency
//                           }
//                         }
//                         stop {
//                           net {
//                             amount
//                             currency
//                           }
//                           gross {
//                             amount
//                             currency
//                           }
//                         }
//                       }
//                       priceRange {
//                         start {
//                           net {
//                             amount
//                             currency
//                           }
//                           gross {
//                             amount
//                             currency
//                           }
//                         }
//                         stop {
//                           net {
//                             amount
//                             currency
//                           }
//                           gross {
//                             amount
//                             currency
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const TypedGetWishlist = TypedQuery<Wishlist, WishlistVariables>(
//   getWishlist
// );
