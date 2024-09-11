/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SurveyInput, SurveyQuestionInput, SurveyErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SurveyCreateMutation
// ====================================================

export interface SurveyCreateMutation_surveyCreate_SurveyErrors {
  __typename: "SurveyError";
  /**
   * The error message.
   */
  message: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: SurveyErrorCode;
}

export interface SurveyCreateMutation_surveyCreate_surveys_linkData {
  __typename: "SurveyLinkData";
  surveyHash: string | null;
  surveyId: string | null;
  orderId: string | null;
  userId: string | null;
}

export interface SurveyCreateMutation_surveyCreate_surveys_questions_edges_node {
  __typename: "SurveyQuestionType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
}

export interface SurveyCreateMutation_surveyCreate_surveys_questions_edges {
  __typename: "SurveyQuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SurveyCreateMutation_surveyCreate_surveys_questions_edges_node | null;
}

export interface SurveyCreateMutation_surveyCreate_surveys_questions {
  __typename: "SurveyQuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SurveyCreateMutation_surveyCreate_surveys_questions_edges | null)[];
}

export interface SurveyCreateMutation_surveyCreate_surveys {
  __typename: "SurveyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  linkData: SurveyCreateMutation_surveyCreate_surveys_linkData | null;
  questions: SurveyCreateMutation_surveyCreate_surveys_questions;
  shown: boolean;
  attempted: boolean;
}

export interface SurveyCreateMutation_surveyCreate {
  __typename: "SurveyCreate";
  SurveyErrors: SurveyCreateMutation_surveyCreate_SurveyErrors[];
  /**
   * List of Survey instances.
   */
  surveys: (SurveyCreateMutation_surveyCreate_surveys | null)[] | null;
}

export interface SurveyCreateMutation {
  /**
   * Create Survey.
   */
  surveyCreate: SurveyCreateMutation_surveyCreate | null;
}

export interface SurveyCreateMutationVariables {
  input: SurveyInput;
  orderIds?: (string | null)[] | null;
  questions: (SurveyQuestionInput | null)[];
}
