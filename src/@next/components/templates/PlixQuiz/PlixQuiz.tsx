import React, { useState, useEffect } from "react";
import style from "./scss/index.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getMetadataValue, isMember, parseJson } from "@utils/misc";
import MemoChevronDownNew from "@components/atoms/SvgIcons/ChevronDownNew";
import FormControl from "@mui/material/FormControl";
import { CachedImage } from "@components/molecules/CachedImage";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAuthState } from "@saleor/sdk";
import { TypedCreateSurveyMutation, TypedFillSurveyMutation } from "./queries";
import MyCustomLink from "@components/next-react/MyCustomLink";
import clevertapEvents from "@temp/themes/plixlifefc/lib/clevertapEvents";
import makeClevertap from "@temp/themes/plixlifefc/lib/makeClevertap";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { getDBIdFromGraphqlId } from "@temp/core/utils";

export interface IPlixQuizProps {
  content?: {
    metadata?: {};
  };
}

export const PlixQuiz: React.FC<IPlixQuizProps> = ({ content }) => {
  interface IQuizQuestions {
    [x: string]: any;
    question: string;
    options: {
      children: {
        child: string[];
        enable_child: boolean;
      }[];
    }[];
  }
  const metadata = content?.metadata;
  const [chevron, setChevron] = useState<any>({});
  const [questions, setQuestions] = useState<any>({});
  const [successPopup, setSuccessPopup] = useState(false);
  const route = useRouter();
  const { user, authenticated, authenticating} = useAuthState();
  const isLoggedIn = user?.id && user?.phone;

  const banner =
    metadata &&
    getMetadataValue(metadata, "banner") &&
    parseJson(getMetadataValue(metadata, "banner"));

  const quizQuestions: IQuizQuestions =
    metadata &&
    getMetadataValue(metadata, "quiz_questions") &&
    parseJson(getMetadataValue(metadata, "quiz_questions"));

  const successPopupData =
    metadata &&
    getMetadataValue(metadata, "success_popup") &&
    parseJson(getMetadataValue(metadata, "success_popup"));

  const handleChevronChange = (
    questionIndex: number,
    parent: string,
    unfold: boolean = false
  ) => {
    const chevronUpdate: any = {
      ...chevron,
    };
    if (unfold) {
      chevronUpdate[`question${questionIndex + 1}${parent}`] = false;
    } else {
      chevronUpdate[`question${questionIndex + 1}${parent}`] = !chevronUpdate[
        `question${questionIndex + 1}${parent}`
      ];
    }
    setChevron(chevronUpdate);
  };

  const handleRadioChange = (index: number) => {
    let key = `question${index + 1}`;
    let updatedQuestions: any = { ...questions };
    (updatedQuestions[key] = true), setQuestions(updatedQuestions);
  };

  const handlePreventScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  
  const clevertap = makeClevertap();

  const userEmail = () =>{
    const userAltEmail =
    user?.metadata &&
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));

   const validUserMail =
    typeof user?.email === "string" && user?.email.includes("@example.com")
      ? userAltEmail || ""
      : user?.email || "";

    return validUserMail
  }
  
  const handleQuizSubmitEvents = (value: object = {}) =>{
    if(clevertapEvents.plixQuiz.enable){
      clevertap.event.push(clevertapEvents.plixQuiz.value, {
        URL: window?.location?.href,
        name: "Plix Quiz",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
        ...value
      });
    }
     
    if(gtmConfig?.plixQuiz?.enable){
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig?.plixQuiz?.value,
        URL: window?.location?.href,
        name: "Plix Quiz",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
        ...value
      })
    }

  }

  useEffect(() => {
    let rootComponent = document?.querySelector(".root-component-container");
    if (!!successPopup) {
      rootComponent.style.touchAction = "none";
      rootComponent.addEventListener("wheel", handlePreventScroll);
    } else {
      rootComponent.style.touchAction = "unset";
      rootComponent.removeEventListener("wheel", handlePreventScroll);
    }
    return () => {
      rootComponent.style.touchAction = "unset";
      rootComponent.removeEventListener("wheel", handlePreventScroll);
    };
  }, [successPopup]);

  useEffect(() => {
    if (!authenticated && !authenticating) {
      route.push("/page/login/?redirect_to=/page/quiz");
    }
  }, [authenticated]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const chevronnew: any = {};
      const newQuestions: any = {};
      Array.isArray(quizQuestions) &&
        !!quizQuestions.length &&
        quizQuestions?.forEach((item, index) => {
          newQuestions[`question${index + 1}`] = false;
          item?.options?.forEach(obj => {
            if (
              obj?.children?.enable_child &&
              Array.isArray(obj?.children?.child) &&
              !!obj?.children?.child?.length
            ) {
              chevronnew[`question${index + 1}${obj?.parent}`] = true;
            }
          });
        });
      setChevron(chevronnew);
      setQuestions(newQuestions);
    }
  }, [quizQuestions?.length]);

  return (
    <div className={style.containermain}>
      <div className={style.container}>
        {successPopup ? (
          <div className={style.quizPopup_container}>
            <div className={style.quizPopup}>
              <div className={style.quizPopup__image}>
                <CachedImage
                  isNextImage
                  url={successPopupData?.img}
                  imageDimensions={{ width: 100, height: 100 }}
                />
              </div>
              <div className={style.quizPopup__heading}>
                Thank you for sharing your details!
              </div>
              <div className={style.quizPopup__text}>
                {successPopupData?.text || ""}
              </div>
              <MyCustomLink href={successPopupData?.link || "/"}>
                <div className={style.quizPopup__button}>CONTINUE SHOPPING</div>
              </MyCustomLink>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={style.form}>
          <TypedCreateSurveyMutation>
            {createSurvey => {
              return (
                <TypedFillSurveyMutation>
                  {fillSurvey => {
                    return (
                      <Formik
                        enableReinitialize
                        initialValues={{
                          name: user?.firstName || "",
                          email: userEmail(),
                          gender: "",
                          ...Object.keys(questions).reduce(
                            (acc: any, que: any, index: number) => {
                              acc[`question${index + 1}`] = "";
                              return acc;
                            },
                            {}
                          ),
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().email("Invalid Email"),
                          name: Yup.string().required("Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name"),
                          gender: Yup.string().required("Required"),
                        })}
                        onSubmit={(value, formikAction) => {
                          const customerId = user.id;
                          // setCurrentRating(rating);
                          formikAction.setSubmitting(true);
                          handleQuizSubmitEvents(value);
                          createSurvey({
                            variables: {
                              input: { name: "Plix Quiz" },
                              questions: [
                                {
                                  text: "User Name",
                                  required: true,
                                  order: 1,
                                },
                                {
                                  text: "Email",
                                  order: 2,
                                },
                                {
                                  text: "Gender",
                                  required: true,
                                  order: 3,
                                },
                                ...(quizQuestions || []).map((que, index) => ({
                                  text: que?.question,
                                  required: true,
                                  order: 4 + index,
                                })),
                              ],
                              customerIds: [customerId],
                            },
                          }).then(response => {
                            if (
                              !response ||
                              !response.data ||
                              !response.data.surveyCreate ||
                              !response.data.surveyCreate.surveys
                            ) {
                              return null;
                            }
                            const survey =
                              response.data.surveyCreate.surveys[0];
                            const surveyHash =
                              survey?.linkData?.surveyHash || "";
                            const surveyId = survey?.id || "";
                            const question = survey?.questions?.edges || "";
                            if (
                              surveyId &&
                              surveyHash &&
                              Array.isArray(question) &&
                              !!question?.length
                            ) {
                              fillSurvey({
                                variables: {
                                  answers: [
                                    ...(question || [])?.map(
                                      (que: any, index: number) => ({
                                        question: que?.node?.id,
                                        answer:
                                          value[Object.keys(value)[index]],
                                      })
                                    ),
                                  ],
                                  surveyId,
                                  userId: customerId,
                                  surveyHash,
                                },
                              })
                                .then(response => {
                                  if (
                                    !!response?.data?.surveyFill?.survey?.id
                                  ) {
                                    formikAction.setSubmitting(false);
                                    setSuccessPopup(true);
                                  }
                                })
                                .finally(() => {
                                  formikAction?.setSubmitting(false);
                                });
                            }
                          });
                        }}
                      >
                        {formik => {
                          const isSubmitDisabled = Object.keys(questions).some(
                            (item: any) => !questions[item]
                          );
                          return (
                            <Form>
                              <FormControl
                                className={style.form_name}
                                variant="outlined"
                              >
                                <label className={style.label} htmlFor="name">
                                  What is your name? <span>*</span>
                                </label>
                                <Field
                                  className={style.input}
                                  name="name"
                                  type="text"
                                  placeholder="For ex. John"
                                />
                                <ErrorMessage
                                  component="div"
                                  className={style.errormessage}
                                  name="name"
                                />
                              </FormControl>
                              <FormControl
                                className={style.form_email}
                                variant="outlined"
                              >
                                <label className={style.label} htmlFor="email">
                                  Your Email Id
                                </label>
                                <Field
                                  className={style.input}
                                  name="email"
                                  type="email"
                                  placeholder="For ex. John.sena@gmail.com"
                                />
                                <ErrorMessage
                                  component="div"
                                  className={style.errormessage}
                                  name="email"
                                />
                              </FormControl>
                              <FormControl
                                className={style.form_gender}
                                variant="outlined"
                              >
                                <label className={style.label} htmlFor="gender">
                                  Gender? <span>*</span>
                                </label>
                                <Field
                                  className={style.input}
                                  name="gender"
                                  component="select"
                                >
                                  <option value="">Select your gender </option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="others">Others</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className={style.errormessage}
                                  name="gender"
                                />
                              </FormControl>
                              <div className={style.quizQuestion}>
                                {quizQuestions &&
                                Array.isArray(quizQuestions) &&
                                !!quizQuestions.length ? (
                                  <>
                                    {quizQuestions?.map((item, index) => (
                                      <FormControl
                                        className={style.quizQuestion_container}
                                        variant="outlined"
                                      >
                                        <label className={style.label}>
                                          {item?.question || ""}
                                        </label>
                                        <div
                                          className={
                                            style.quizQuestion_answeres
                                          }
                                        >
                                          {item?.options &&
                                            Array.isArray(item?.options) &&
                                            !!item?.options?.length &&
                                            item?.options?.map(option => (
                                              <>
                                                {option?.children
                                                  ?.enable_child &&
                                                Array.isArray(
                                                  option?.children?.child
                                                ) &&
                                                !!option?.children?.child
                                                  ?.length ? (
                                                  <div
                                                    className={
                                                      style.quizQuestion_parent
                                                    }
                                                  >
                                                    <div
                                                      className={`${
                                                        style.quizQuestion_radio_custom
                                                      } ${
                                                        formik.values[
                                                          `question${index + 1}`
                                                        ]?.split(",")[0] ===
                                                        option?.parent
                                                          ? style.quizQuestion_radio_custom_select
                                                          : ""
                                                      }`}
                                                    >
                                                      <div>
                                                        <span
                                                          onClick={() => {
                                                            handleChevronChange(
                                                              index,
                                                              option?.parent,
                                                              true
                                                            );
                                                          }}
                                                        ></span>
                                                        <label
                                                          className={
                                                            style.label
                                                          }
                                                        >
                                                          {option?.parent}
                                                        </label>
                                                      </div>
                                                      <div
                                                        className={
                                                          style.quizQuestion_radio_custom_chevron
                                                        }
                                                        onClick={() => {
                                                          handleChevronChange(
                                                            index,
                                                            option?.parent,
                                                            false
                                                          );
                                                        }}
                                                      >
                                                        <MemoChevronDownNew />
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={`
                                                ${style.quizQuestion_option}
                                                ${
                                                  chevron[
                                                    `question${index + 1}${
                                                      option?.parent
                                                    }`
                                                  ]
                                                    ? style.quizQuestion_option_hide
                                                    : ""
                                                }`}
                                                    >
                                                      {option?.children?.child?.map(
                                                        child => (
                                                          <>
                                                            <div
                                                              className={`${style.quizQuestion_radio} ${style.quizQuestion_radio_child}`}
                                                            >
                                                              <Field
                                                                className={
                                                                  style.radio
                                                                }
                                                                name={`question${
                                                                  index + 1
                                                                }`}
                                                                as="input"
                                                                type="radio"
                                                                onChange={e => {
                                                                  handleRadioChange(
                                                                    index
                                                                  );
                                                                  formik.handleChange(
                                                                    e
                                                                  );
                                                                }}
                                                                value={`${option?.parent},${child}`}
                                                              />
                                                              <label
                                                                className={
                                                                  style.label
                                                                }
                                                              >
                                                                {child || ""}
                                                              </label>
                                                            </div>
                                                          </>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div
                                                    className={`${style.quizQuestion_radio} ${style.quizQuestion_parent}`}
                                                  >
                                                    <Field
                                                      className={style.radio}
                                                      name={`question${
                                                        index + 1
                                                      }`}
                                                      as="input"
                                                      onChange={e => {
                                                        handleRadioChange(
                                                          index
                                                        );
                                                        formik.handleChange(e);
                                                      }}
                                                      type="radio"
                                                      value={option?.parent}
                                                    />
                                                    <label
                                                      className={style.label}
                                                    >
                                                      {option?.parent || ""}
                                                    </label>
                                                  </div>
                                                )}
                                              </>
                                            ))}
                                        </div>
                                      </FormControl>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <button
                                className={`${style.submitButton} ${
                                  formik.isSubmitting ||
                                  !!isSubmitDisabled
                                    ? style.submitButton_disable
                                    : ""
                                }`}
                                type="submit"
                              >
                                {formik.isSubmitting ? (
                                  <>SUBMITTING...</>
                                ) : (
                                  <>SUBMIT</>
                                )}
                              </button>
                            </Form>
                          );
                        }}
                      </Formik>
                    );
                  }}
                </TypedFillSurveyMutation>
              );
            }}
          </TypedCreateSurveyMutation>
        </div>
        <div className={`${style.banner} ${style.banner_desk}`}>
          {banner?.image_desk ? (
            <CachedImage url={banner?.image_desk} />
          ) : (
            <></>
          )}
        </div>
        <div className={`${style.banner} ${style.banner_mob}`}>
          {banner?.image_mob ? (
            <CachedImage url={banner?.image_mob} imgixSizes="100vw" />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
PlixQuiz.displayName = "PlixQuiz";
export default PlixQuiz;
