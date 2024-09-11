import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";
import {
  SurveyCreateMutation,
  SurveyCreateMutationVariables,
} from "./gqlTypes/SurveyCreateMutation";
import {
  SurveyFillMutation,
  SurveyFillMutationVariables,
} from "./gqlTypes/SurveyFillMutation";
import {
  UploadInvoiceVariables,
  UploadInvoice,
} from "./gqlTypes/UploadInvoice";

const UploadInvoiceMutation = gql`
  mutation UploadInvoiceMutation($uri: String!) {
    invoiceUpload(uri: $uri) {
      url
    }
  }
`;

export const MutationSurveyCreate = gql`
  mutation SurveyCreateMutation(
    $input: SurveyInput!
    $orderIds: [ID]
    $questions: [SurveyQuestionInput]!
  ) {
    surveyCreate(input: $input, orderIds: $orderIds, questions: $questions) {
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
        questions(first: 10) {
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

export const MutationSurveyFill = gql`
  mutation SurveyFillMutation(
    $answers: [SurveyAnswerInput]!
    $orderId: ID
    $surveyHash: String!
    $surveyId: ID!
  ) {
    surveyFill(
      answers: $answers
      orderId: $orderId
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

export const TypedUploadInvoiceMutation = TypedMutation<
  UploadInvoice,
  UploadInvoiceVariables
>(UploadInvoiceMutation);

export const TypedCreateSurveyMutation = TypedMutation<
  SurveyCreateMutation,
  SurveyCreateMutationVariables
>(MutationSurveyCreate);

export const TypedFillSurveyMutation = TypedMutation<
  SurveyFillMutation,
  SurveyFillMutationVariables
>(MutationSurveyFill);
