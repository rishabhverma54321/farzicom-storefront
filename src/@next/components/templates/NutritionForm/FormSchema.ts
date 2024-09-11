import * as Yup from "yup";

const phoneRegEx = /(^(\+91)?([0-9]{10}))$/;
const nameWithSpacesRegEx = /^[a-zA-Z ]*$/;
export const NutritionFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter your name.")
    .matches(nameWithSpacesRegEx, "Please enter a valid name."),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Please enter your age.")
    .positive("Invalid age value")
    .integer("Invalid age value"),
  email: Yup.string()
    .email("Please enter a valid email id.")
    .required("Please enter your email."),
  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(phoneRegEx, "Invalid Phone Number"),
  weight: Yup.number()
    .required("Please enter your weight in kg.")
    .typeError("Weight must be a number"),
  height: Yup.number()
    .required("Please enter your height in cm")
    .typeError("Height must be a number"),
});
