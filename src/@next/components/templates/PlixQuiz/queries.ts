import { TypedMutation } from "@temp/core/mutations";
import gql from "graphql-tag";


export const MutationSurveyCreate = gql`
  mutation SurveyCreateMutation(
    $input: SurveyInput!
    $customerIds: [ID]
    $questions: [SurveyQuestionInput]!
  ) {
    surveyCreate(input: $input, customerIds: $customerIds, questions: $questions) {
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


export const TypedCreateSurveyMutation = TypedMutation<any, any>(
  MutationSurveyCreate
);

export const TypedFillSurveyMutation = TypedMutation<any, any>(
  MutationSurveyFill
);
