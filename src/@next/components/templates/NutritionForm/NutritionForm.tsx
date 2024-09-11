import { getMetadataValue } from "@utils/misc";
import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import { Form, Formik, ErrorMessage } from "formik";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import * as S from "./style";
import { TypedNutritionFormCreateMutation } from "./queries";
import { NutritionFormValidationSchema } from "./FormSchema";

export interface INutritionFormProps {
  content: any;
}
export const NutritionForm: React.FC<INutritionFormProps> = ({ content }) => {
  const [step, setStep] = useState<Number>(1);
  const [questionSet, setQuestionSet] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [successMsg, setSuccessMsg] = useState<String>("");
  // Data
  const [gender, setGender] = useState("Male");
  const [mainQuestionAnswer, setMainQuestionAnswer] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const mainQuestion =
    content &&
    getMetadataValue(content, "mainQuestion") &&
    JSON.parse(getMetadataValue(content, "mainQuestion"));

  const questionsContent =
    questionSet &&
    getMetadataValue(content, questionSet) &&
    JSON.parse(getMetadataValue(content, questionSet));

  const handleOptionChange = (value: string, name: string) => {
    setFormData(formData => ({ ...formData, [name]: value }));
  };

  const onNextClick = (e: any) => {
    e.preventDefault();
    if (questionSet === null) {
      setErrorMsg("Please select an option to proceed");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleValueChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "gender": {
        setGender(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleformSubmit = (mutation: any) => {
    // Checks
    if (Object.keys(formData).length !== questionsContent?.length) {
      setErrorMsg("Please answer all the questions");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    mutation();
  };

  return (
    <>
      <div>
        {step === 1 ? (
          <>
            <S.SubContainer>
              <S.BasicText fontWeight="500" fontSize="24px" textAlign="center">
                {mainQuestion?.ques}
              </S.BasicText>
              <div>
                {mainQuestion?.options.map(
                  (option: { text: string; key: string }) => {
                    return (
                      <S.RadioButtonWithLabel
                        onClick={() => {
                          setQuestionSet(option?.key);
                          setMainQuestionAnswer(option.text);
                        }}
                      >
                        <S.RadioInput
                          type="radio"
                          className="custom-radio-button"
                          checked={questionSet === option.key}
                          value={option?.text}
                          name={mainQuestion?.ques}
                          // onChange={e => {
                          //   setQuestionSet(option?.key);
                          //   handleOptionChange(e);
                          // }}
                        />
                        <S.BasicText fontWeight="500" fontSize="14px">
                          {option?.text}
                        </S.BasicText>
                      </S.RadioButtonWithLabel>
                    );
                  }
                )}
              </div>
              <div className="button-wrapper">
                <S.CustomButton onClick={onNextClick}>NEXT</S.CustomButton>
              </div>
              {errorMsg ? (
                <div>
                  <S.ErrorMsg>{errorMsg}</S.ErrorMsg>
                </div>
              ) : (
                <></>
              )}
            </S.SubContainer>
          </>
        ) : step === 2 ? (
          <Formik
            initialValues={{
              name: "",
              age: "",
              phone: "",
              email: "",
              weight: "",
              height: "",
            }}
            validationSchema={NutritionFormValidationSchema}
            onSubmit={values => {}}
          >
            {({ handleChange, values, validateForm, isValid }) => {
              return (
                <Form>
                  <S.SubContainer>
                    <div className="question-wrapper">
                      <S.BasicText fontWeight="500" fontSize="16px">
                        Please share the following details with us so that we
                        can tailor our approach for you.
                      </S.BasicText>
                      <div className="input-wrapper name-input">
                        <S.InputLabel>Name</S.InputLabel>
                        <S.Input
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          component={S.StyledErrorMessage}
                          name="name"
                        />
                      </div>
                      <S.MultiInputContainer>
                        <div className="input-wrapper">
                          <S.InputLabel>Email</S.InputLabel>
                          <S.Input
                            name="email"
                            value={values.email}
                            type="email"
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component={S.StyledErrorMessage}
                            name="email"
                          />
                        </div>
                        <div className="input-wrapper">
                          <S.InputLabel>Phone Number</S.InputLabel>
                          <S.Input
                            name="phone"
                            value={values.phone}
                            type="phone"
                            maxLength={10}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component={S.StyledErrorMessage}
                            name="phone"
                          />
                        </div>
                      </S.MultiInputContainer>
                      <S.MultiInputContainer>
                        <div className="input-wrapper">
                          <S.InputLabel>Age</S.InputLabel>
                          <S.Input
                            name="age"
                            value={values.age}
                            type="text"
                            maxLength={3}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component={S.StyledErrorMessage}
                            name="age"
                          />
                        </div>
                        <div className="input-wrapper">
                          <S.InputLabel>Gender</S.InputLabel>
                          <S.SelectInput
                            name="gender"
                            value={gender}
                            onChange={handleValueChange}
                          >
                            {["Male", "Female", "Other"].map(option => (
                              <option value={option}>{option}</option>
                            ))}
                          </S.SelectInput>
                        </div>
                      </S.MultiInputContainer>
                      <S.MultiInputContainer>
                        <div className="input-wrapper">
                          <S.InputLabel>Height (in cm)</S.InputLabel>
                          <S.Input
                            name="height"
                            value={values.height}
                            type="text"
                            maxLength={5}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component={S.StyledErrorMessage}
                            name="height"
                          />
                        </div>
                        <div className="input-wrapper">
                          <S.InputLabel>Weight (in KGs)</S.InputLabel>
                          <S.Input
                            name="weight"
                            type="text"
                            maxLength={4}
                            value={values.weight}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component={S.StyledErrorMessage}
                            name="weight"
                          />
                        </div>
                      </S.MultiInputContainer>
                    </div>
                    <div>
                      {questionsContent?.map((content: any) => {
                        const { options, question } = content;
                        return (
                          <div className="question-wrapper">
                            <S.BasicText fontWeight="500" fontSize="18px">
                              {question}
                            </S.BasicText>
                            {options.map((optionContent: any) => {
                              return (
                                <S.RadioButtonWithLabel
                                  onClick={() => {
                                    handleOptionChange(
                                      optionContent?.text,
                                      question
                                    );
                                  }}
                                >
                                  <S.RadioInput
                                    type="radio"
                                    className="custom-radio-button"
                                    checked={
                                      formData[question] === optionContent.text
                                    }
                                    value={optionContent.text}
                                    name={question}
                                    // onChange={handleOptionChange}
                                  />
                                  <div>
                                    <S.BasicText
                                      fontWeight="500"
                                      fontSize="14px"
                                    >
                                      {optionContent.text}
                                    </S.BasicText>
                                    <S.BasicText
                                      fontWeight="400"
                                      fontSize="12px"
                                    >
                                      {optionContent.subText}
                                    </S.BasicText>
                                  </div>
                                </S.RadioButtonWithLabel>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <TypedNutritionFormCreateMutation
                      variables={{
                        input: {
                          email: values.email,
                          name: values.name,
                          phone: `+91${values.phone}`,
                          responseBody: JSON.stringify({
                            age: values.age,
                            gender,
                            weight: values.weight,
                            height: values.height,
                            form1: { [mainQuestion.ques]: mainQuestionAnswer },
                            form2: formData,
                          }),
                        },
                      }}
                      onCompleted={data => {
                        setLoading(false);
                        setSuccessMsg("Form has been successfully submitted.");
                        // Clevertap Event
                        const ctp = {
                          Email: values.email,
                          Name: values.name,
                          identity: `91${values.phone}`,
                          Phone: `+91${values.phone}`,
                          age: values.age,
                          gender,
                          weight: values.weight,
                          height: values.height,
                          ...formData,
                          [mainQuestion.ques]: mainQuestionAnswer,
                        };
                        if (clevertapEvents.nutritionFormSubmit.enable) {
                          const clevertap = makeClevertap();

                          clevertap.event.push(
                            clevertapEvents.nutritionFormSubmit.value,
                            ctp
                          );
                        }
                      }}
                      onError={error => {
                        setErrorMsg(
                          "Something went wrong, please try again later"
                        );
                        setTimeout(() => {
                          setErrorMsg("");
                        }, 5000);
                        setLoading(false);
                      }}
                    >
                      {mutation => (
                        <div className="button-set-wrapper">
                          <div className="button-wrapper">
                            <S.CustomButton
                              disabled={loading}
                              onClick={() => {
                                if (!loading) {
                                  setStep(1);
                                  setErrorMsg("");
                                  // setQuestionSet(null);
                                  setFormData({});
                                }
                              }}
                            >
                              Back
                            </S.CustomButton>
                          </div>
                          <div className="button-wrapper">
                            <S.CustomButton
                              disabled={loading}
                              type="submit"
                              onClick={() => {
                                if (!loading) {
                                  validateForm();
                                  if (isValid) {
                                    setErrorMsg("");
                                    handleformSubmit(mutation);
                                  } else {
                                    setErrorMsg(
                                      "Please fill up the form correctly."
                                    );
                                    if (typeof window !== "undefined") {
                                      window.scrollTo({
                                        top: 150,
                                        behavior: "smooth",
                                      });
                                    }
                                  }
                                }
                              }}
                            >
                              Submit
                            </S.CustomButton>
                          </div>
                        </div>
                      )}
                    </TypedNutritionFormCreateMutation>

                    {errorMsg ? (
                      <div>
                        <S.ErrorMsg>{errorMsg}</S.ErrorMsg>
                      </div>
                    ) : (
                      <></>
                    )}
                    {successMsg ? (
                      <div className="success-msg-wrapper">
                        <S.SuccessMsg>{successMsg}</S.SuccessMsg>
                      </div>
                    ) : (
                      <></>
                    )}
                    {loading ? (
                      <div className="form-submit-loader">
                        <CircularProgress />
                      </div>
                    ) : (
                      <></>
                    )}
                  </S.SubContainer>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
NutritionForm.displayName = "NutritionForm";
export default NutritionForm;
