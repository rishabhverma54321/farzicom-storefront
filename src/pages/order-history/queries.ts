import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { OrdersByUser, OrdersByUserVariables } from "./gqlTypes/OrdersByUser";
import {
  UserOrderByToken,
  UserOrderByTokenVariables,
} from "./gqlTypes/UserOrderByToken";
import { TypedMutation } from "@temp/core/mutations";

export const USER_ORDER_DETAILS = gql`
  query OrdersByUser($perPage: Int!, $after: String, $source: String) {
    me(source: $source) {
      id
      orders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            shippingAddress {
              id
              postalCode
            }
            invoices {
              createdAt
              id
              message
              externalUrl
              number
              status
              updatedAt
              url
              metadata {
                key
                value
              }
            }
            metadata {
              key
              value
            }
            token
            awbNo
            number
            statusDisplay
            paymentStatus
            paymentStatusDisplay
            created
            total {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            lines {
              id

              productName
              quantity
              variant {
                id
                images {
                  id
                  sortOrder
                  alt
                  url
                }
                weight {
                  unit
                  value
                }
                sku
                name
              }
              thumbnail {
                alt
                url
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
            }
          }
        }
      }
    }
  }
`;


export const ordersCancel = gql`
mutation orderCancel($id: ID!, $reason: String!) {
  orderCancelByCustomer(id: $id, reason: $reason) {
    order {
      id
      status
      created
    }
    message
    orderErrors {
      field
      message
      code
    }
  }
}
`;
export const OrderCancelByCustomer = TypedMutation<any,any>(ordersCancel)

export const TypedOrdersByUser = TypedQuery<
  OrdersByUser,
  OrdersByUserVariables
>(USER_ORDER_DETAILS);

export const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const checkoutAddressFragment = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
  }
`;

export const checkoutPriceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const checkoutProductVariantFragment = gql`
  ${checkoutPriceFragment}
  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    quantityAvailable
    isAvailable
    images {
      id
      sortOrder
      alt
      url
    }
    metadata {
      key
      value
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
      }
      values {
        id
        name
        value: name
      }
    }
    product {
      id
      name
      isAvailableForPurchase
      weight {
        unit
        value
      }
      category {
        id
        name
        slug
      }
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
      productType {
        id
        isShippingRequired
      }
      metadata {
        key
        value
      }
    }
  }
`;

export const orderDetailFragment = gql`
  ${orderPriceFragment}
  ${checkoutAddressFragment}
  ${checkoutProductVariantFragment}
  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    status
    statusDisplay
    id
    token
    number
    created
    # invoices {
    #   createdAt
    #   id
    #   message
    #   externalUrl
    #   number
    #   status
    #   updatedAt
    #   url
    #   metadata {
    #     key
    #     value
    #   }
    # }

    metadata {
      key
      value
    }
    shippingAddress {
      ...Address
    }
    billingAddress {
      ...Address
    }
    lines {
      id
      productName
      quantity

      variant {
        ...ProductVariant
      }
      unitPrice {
        currency
        ...OrderPrice
      }
      totalPrice {
        currency
        ...OrderPrice
      }
    }
    subtotal {
      ...OrderPrice
    }
    total {
      ...OrderPrice
    }
    shippingPrice {
      ...OrderPrice
    }
  }
`;

export const invoiceFragment = gql`
  fragment InvoiceFragment on Invoice {
    id
    number
    createdAt
    url
    status
  }
`;

export const userOrderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  ${invoiceFragment}
  query UserOrderByToken($token: UUID!, $source: String) {
    orderByToken(token: $token, source: $source) {
      ...OrderDetail
      invoices {
        ...InvoiceFragment
      }
    }
  }
`;

export const TypedUsersOrderByToken = TypedQuery<
  UserOrderByToken,
  UserOrderByTokenVariables
>(userOrderDetailsByTokenQuery);
