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
        questions(first: 30) {
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

export const MutationSurveyDelete = gql`
  mutation SurveyDeleteMutation(
    $surveyId: ID!
    $surveyHash: String!
    $questionIds: [ID]!
  ) {
    surveyQuestionsDelete(
      surveyId: $surveyId
      surveyHash: $surveyHash
      questionIds: $questionIds
    ) {
      survey {
        name
        questions(first: 100) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

export const MutationHostingFileNoAuth = gql`
  mutation($file: Upload) {
    createHostingFileNoAuth(input: { name: "image", file: $file }) {
      hostingNoAuth {
        id
        name
        file
        fileUrl
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
        questions(first: 30) {
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

export const productListQuiz = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query productListQuiz(
    $first: Int
    $ids: [ID]
    $productId: ID
    $metaFields: [String]
  ) {
    products(first: $first, filter: { ids: $ids }, metaFields: $metaFields) {
      totalCount
      edges {
        node {
          category {
            id
            name
            slug
          }
          ...BasicProductFields
          ...ProductPricingField
          descriptionJson
          metadata {
            key
            value
          }
          images {
            id
            alt
            url
          }
          attributes {
            ...SelectedAttributeFields
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
      }
    }

    productReviews(
      product: $productId
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const TypedCreateSurveyMutation = TypedMutation<any, any>(
  MutationSurveyCreate
);

export const TypedUpdateSurveyMutation = TypedMutation<any, any>(
  MutationSurveyUpdate
);

export const TypedFillSurveyMutation = TypedMutation<any, any>(
  MutationSurveyFill
);

export const TypedHostingFileNoAuthMutation = TypedMutation<any, any>(
  MutationHostingFileNoAuth
);

export const TypedMutationSurveyDelete = TypedMutation<any, any>(
  MutationSurveyDelete
);
