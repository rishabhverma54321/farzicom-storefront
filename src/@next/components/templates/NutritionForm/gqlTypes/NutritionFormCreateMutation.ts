/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NutritionFormInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: NutritionFormCreateMutation
// ====================================================

export interface NutritionFormCreateMutation_nutitionFormCreate_nutritionForm {
  __typename: "NutritionFormType";
  /**
   * The ID of the object.
   */
  id: string;
  responseBody: any | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  createdAt: any;
}

export interface NutritionFormCreateMutation_nutitionFormCreate {
  __typename: "NutritionFormCreate";
  /**
   * A nutrition form instance.
   */
  nutritionForm: NutritionFormCreateMutation_nutitionFormCreate_nutritionForm | null;
}

export interface NutritionFormCreateMutation {
  /**
   * Create a new nutrition form entry.
   */
  nutitionFormCreate: NutritionFormCreateMutation_nutitionFormCreate | null;
}

export interface NutritionFormCreateMutationVariables {
  input: NutritionFormInput;
}
