/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SurveyAnswerInput, SurveyErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SurveyFillMutation
// ====================================================

export interface SurveyFillMutation_surveyFill_surveyErrors {
  __typename: "SurveyError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: SurveyErrorCode;
}

export interface SurveyFillMutation_surveyFill_survey_questions_edges_node_answers_edges_node {
  __typename: "SurveyAnswerType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  created: any;
}

export interface SurveyFillMutation_surveyFill_survey_questions_edges_node_answers_edges {
  __typename: "SurveyAnswerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SurveyFillMutation_surveyFill_survey_questions_edges_node_answers_edges_node | null;
}

export interface SurveyFillMutation_surveyFill_survey_questions_edges_node_answers {
  __typename: "SurveyAnswerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SurveyFillMutation_surveyFill_survey_questions_edges_node_answers_edges | null)[];
}

export interface SurveyFillMutation_surveyFill_survey_questions_edges_node {
  __typename: "SurveyQuestionType";
  answers: SurveyFillMutation_surveyFill_survey_questions_edges_node_answers;
}

export interface SurveyFillMutation_surveyFill_survey_questions_edges {
  __typename: "SurveyQuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SurveyFillMutation_surveyFill_survey_questions_edges_node | null;
}

export interface SurveyFillMutation_surveyFill_survey_questions {
  __typename: "SurveyQuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SurveyFillMutation_surveyFill_survey_questions_edges | null)[];
}

export interface SurveyFillMutation_surveyFill_survey {
  __typename: "SurveyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  shown: boolean;
  attempted: boolean;
  questions: SurveyFillMutation_surveyFill_survey_questions;
}

export interface SurveyFillMutation_surveyFill {
  __typename: "SurveyFill";
  surveyErrors: SurveyFillMutation_surveyFill_surveyErrors[];
  /**
   * A Survey instance.
   */
  survey: SurveyFillMutation_surveyFill_survey | null;
}

export interface SurveyFillMutation {
  /**
   * Fill Survey.
   */
  surveyFill: SurveyFillMutation_surveyFill | null;
}

export interface SurveyFillMutationVariables {
  answers: (SurveyAnswerInput | null)[];
  orderId?: string | null;
  surveyHash: string;
  surveyId: string;
}
