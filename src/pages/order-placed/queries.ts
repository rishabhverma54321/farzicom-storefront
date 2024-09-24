import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";

const SurveyCreate = gql`
  mutation SurveyCreateMutation(
    $input: SurveyInput!
    $questions: [SurveyQuestionInput]!
    $customerIds: [ID]
    $orderIds: [ID]
  ) {
    surveyCreate(
      input: $input
      questions: $questions
      customerIds: $customerIds
      orderIds: $orderIds
    ) {
      SurveyErrors {
        field
        message
        code
      }
      surveys {
        id
        surveyHash
        questions(first: 5) {
          edges {
            node {
              id
              text
            }
          }
        }
      }
    }
  }
`;

const SurveyFill = gql`
  mutation SurveyFill(
    $answers: [SurveyAnswerInput]!
    $surveyHash: String!
    $surveyId: ID!
    $orderId: ID
    $userId: ID
  ) {
    surveyFill(
      answers: $answers
      surveyHash: $surveyHash
      surveyId: $surveyId
      orderId: $orderId
      userId: $userId
    ) {
      survey {
        id
        surveyHash
        name
      }
      surveyErrors {
        field
        message
        code
      }
    }
  }
`;

export const OrderDetailsByTokenQuery = gql`
  query UserOrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      id
      token
      number
      created
      tags {
        name
      }
      extraData {
        key
        value
      }
      metadata {
        key
        value
      }
    }
  }
`;

const taxedMoneyFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
      __typename
    }
    net {
      amount
      currency
      __typename
    }
    __typename
  }
`;

const addressFragment = gql`
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
      __typename
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
    __typename
  }
`;

const productVariantFragment = gql`
  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    quantityAvailable
    images {
      id
      sortOrder
      alt
      url
      __typename
    }
    metadata {
      key
      value
      __typename
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
        __typename
      }
      price {
        ...Price
        __typename
      }
      __typename
    }
    attributes {
      attribute {
        id
        name
        __typename
      }
      values {
        id
        name
        value: name
        __typename
      }
      __typename
    }
    product {
      id
      name
      slug
      isAvailableForPurchase
      weight {
        unit
        value
        __typename
      }
      category {
        id
        name
        slug
        __typename
      }
      thumbnail {
        url
        alt
        __typename
      }
      productType {
        id
        isShippingRequired
        __typename
      }
      metadata {
        key
        value
        __typename
      }
      tags {
        name
        __typename
      }
      __typename
    }
    __typename
  }
`;

const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
      __typename
    }
    net {
      amount
      currency
      __typename
    }
    tax {
      amount
      currency
      __typename
    }
    __typename
  }
`;

export const OrderByToken = gql`
  ${productVariantFragment}
  ${taxedMoneyFragment}
  ${addressFragment}
  ${orderPriceFragment}
  query orderByToken($token: UUID!) {
    orderByToken(token: $token) {
      userEmail
      paymentStatus
      paymentStatusDisplay
      status
      statusDisplay
      id
      token
      number
      voucher {
        code
        __typename
      }
      metadata {
        key
        value
        __typename
      }
      shippingAddress {
        ...Address
        __typename
      }
      lines {
        id
        productName
        quantity
        variant {
          ...ProductVariant
          __typename
        }
        unitPrice {
          currency
          ...OrderPrice
          __typename
        }
        totalPrice {
          currency
          ...OrderPrice
          __typename
        }
        __typename
      }
      subtotal {
        ...OrderPrice
        __typename
      }
      total {
        ...OrderPrice
        __typename
      }
      shippingPrice {
        ...OrderPrice
        __typename
      }
      __typename
    }
  }
`;

export const ORDER_COUNT_BY_PHONE = gql`
  query OrderCountByPhone($phone: String) {
    userOrders(phone: $phone) {
      totalCount
    }
  }
`;

export const TypedSurveyCreate = TypedMutation<any, any>(SurveyCreate);

export const TypedSurveyFill = TypedMutation<any, any>(SurveyFill);
