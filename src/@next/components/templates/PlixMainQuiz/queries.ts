import { TypedMutation } from "@temp/core/mutations";
import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";

export const MutationSurveyUpdate = gql`
  mutation SurveyUpdateMutation(
    $input: SurveyUpdateInput!
    $surveyId: ID!
    $questions: [SurveyQuestionInput]!
  ) {
    surveyUpdate(input: $input, surveyId: $surveyId, questions: $questions) {
      survey {
        name
        questions(first: 20) {
          edges {
            node {
              id
              text
              __typename
            }
            __typename
          }
          __typename
        }
      }
      updateErrors {
        field
      }
    }
  }
`;

export const MutationSurveyCreate = gql`
  mutation SurveyCreateMutation(
    $input: SurveyInput!
    $customerIds: [ID]
    $questions: [SurveyQuestionInput]!
  ) {
    surveyCreate(
      input: $input
      customerIds: $customerIds
      questions: $questions
    ) {
      SurveyErrors {
        message
        field
        code
      }
      surveys {
        id
        name
        linkData {
          surveyHash
          surveyId
          orderId
          userId
        }
        questions(first: 20) {
          edges {
            node {
              id
              text
            }
          }
        }
        shown
        attempted
      }
    }
  }
`;

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    slug
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
    isAvailableForPurchase
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

export const priceFragment = gql`
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

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)
    images {
      id
      url
      alt
      sortOrder
    }
    weight {
      unit
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
        slug
        metadata {
          key
          value
        }
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}

  query ProductDetailsPlixNewQuery($id: ID!, $metaFields: [String]) {
    product(id: $id, metaFields: $metaFields) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      weight {
        unit
        value
      }
      metadata {
        key
        value
      }
      category {
        id
        name
        slug
      }
      collections {
        id
        name
        products(first: 10, sortBy:{ direction: ASC, field: COLLECTION }) {
          edges {
            node {
              id
              name
              url
              thumbnail(size: 1) {
                url
                alt
              }
              category {
                id
                name
                slug
              }
              isAvailable
              variants {
                ...ProductVariantFields
                metadata: customMetaData {
                  key
                  value
                }
              }
              defaultVariant {
                ...ProductVariantFields
                metadata: customMetaData {
                  key
                  value
                }
              }
              images {
                id
                sortOrder
                alt
                url(size: 1)
              }
              isAvailableForPurchase
              isPublished
            }
          }
        }
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
        metadata: customMetaData {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        ...ProductVariantFields
        metadata: customMetaData {
          key
          value
        }
      }
    }

    productReviews(
      product: $id
      first: 20
      isPublished: true
      sort: MOST_HELPFUL
    ) {
      totalCount
      edges {
        node {
          id
          review
          rating
          created
          adminReply
          title
          rated
          verified
          helpfulRatings
          isPublished
          publishedDate
          unhelpfulRatings
          userName
          user {
            id
            firstName
            lastName
          }
          images(first: 2) {
            edges {
              node {
                id
                url
                alt
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

export const MutationSurveyFill = gql`
  mutation SurveyFillMutation(
    $answers: [SurveyAnswerInput]!
    $userId: ID
    $surveyHash: String!
    $surveyId: ID!
  ) {
    surveyFill(
      answers: $answers
      userId: $userId
      surveyHash: $surveyHash
      surveyId: $surveyId
    ) {
      surveyErrors {
        field
        message
        code
      }
      survey {
        id
        name
        shown
        attempted
        questions(first: 100) {
          edges {
            node {
              answers(first: 100) {
                edges {
                  node {
                    id
                    answer
                    created
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedProductDetailQuery = TypedQuery<any, any>(
  productDetailsQuery
);

export const TypedCreateSurveyMutation = TypedMutation<any, any>(
  MutationSurveyCreate
);

export const TypedUpdateSurveyMutation = TypedMutation<any, any>(
  MutationSurveyUpdate
);

export const TypedFillSurveyMutation = TypedMutation<any, any>(
  MutationSurveyFill
);
