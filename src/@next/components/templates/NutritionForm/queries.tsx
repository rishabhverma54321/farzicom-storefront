import { TypedMutation } from "@temp/core/mutations";
import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";

const NutritionFormCreate = gql`
  mutation NutritionFormCreateMutation($input: NutritionFormInput!) {
    nutritionFormCreate(input: $input) {
      nutritionForm {
        id
        responseBody
        name
        phone
        email
        createdAt
      }
    }
  }
`;

export const TypedNutritionFormCreateMutation = TypedMutation<any, any>(
  NutritionFormCreate
);
