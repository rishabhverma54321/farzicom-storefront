import React, { useEffect, useState } from "react";
import style from "./scss/index.module.scss";
import {
  TypedCreateSurveyMutation,
  TypedFillSurveyMutation,
  TypedUpdateSurveyMutation,
} from "./queries";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthState } from "@saleor/sdk";
import FormControl from "@mui/material/FormControl";
import {
  getMetadataValue,
  isMember,
  parseJson,
  WEIGHT_QUIZ_STATE,
} from "@utils/misc";
import {
  QuizProgressbar,
  InputSelect,
  InputRadio,
  InputCards,
  QuizCardHeader,
  extractQuestionObjWeightLoss,
  updateQuestionValuesNew,
  handleQuestionEvents,
  DoctorConsultationSection as DoctorConsultationSectionNew,
  QuizFreeTrial,
  handleRemoveEmptyValues,
  setQuizStateLocal,
  IQuestion,
} from "@components/molecules";
import { CachedImage } from "@components/molecules/CachedImage";
import QuizProductCard from "./QuizProductCard";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Testimonial from "./components/Testimonial";
import { getDBIdFromGraphqlId } from "@utils/core";
import gtmConfig from "Themes/lib/gtmConfig";
import clevertapEvents from "Themes/lib/clevertapEvents";
import makeClevertap from "Themes/lib/makeClevertap.js";
import WeightGoalSection from "./components/WeightGoalSection";
import DoctorConsultationSection from "./components/DoctorConsultationSection";
import WellnessJourney from "./components/WellnessJourney";
import TransformationPlan from "./components/TransformationPlan";
import QuizWeightLossSection from "./components/QuizWeightLossSection";
import MemoNutritionPlus from "@components/atoms/SvgIcons/MemoNutritionPlus";
import { phoneRegExp } from "@temp/core/utils";
import MemoNewplixlogo from "@components/atoms/SvgIcons/NewPlixLogoSVG";
import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";
import MemoBackArrow from "@components/atoms/SvgIcons/BackButtonArrow";
import { pages } from "gqlTypes/customGlobalTypes";
import MemoRightArrow from "@components/atoms/SvgIcons/MemoRightArrow";
export interface IPlixMainQuizProps {
  content?: {
    metadata?: Array<any>;
  };
}

export const PlixMainQuiz: React.FC<IPlixMainQuizProps> = ({ content }) => {
  const metadata = content?.metadata;
  const { user } = useAuthState();
  const route = useRouter();

  interface IQuizQuestions {
    questions: IQuestion[]; // make this array
  }

  const quizAnalysis: string = (route?.query?.quiz as string) || "";

  const utmSource: string = route?.query?.utm_source ? "inorganic" : "organic";
  const utmCampaign: string = (route?.query?.utm_campaign as string) || "none";
  const [firstLoad, setFirstLoad] = useState(false);
  const userName = route?.query?.name || "";
  const weight = route?.query?.weight || "";
  const weightGoal: string = route?.query?.weightGoal as string | "";
  const bodyType: string = route?.query?.bodyType as string | "";
  const defaultQuestionTypes: string[] = ["name", "phone", "email"];
  const showNextButton: string[] = [
    "name",
    "phone",
    "email",
    "select_height",
    "select_weight",
  ];

  const quizHeaderData =
    metadata &&
    getMetadataValue(metadata, "quiz_header") &&
    parseJson(getMetadataValue(metadata, "quiz_header"));

  const freeTrialData =
    metadata &&
    getMetadataValue(metadata, "free_trial_section") &&
    parseJson(getMetadataValue(metadata, "free_trial_section"));

  const quizWeightGoalData =
    metadata &&
    getMetadataValue(metadata, "weight_goal_section") &&
    parseJson(getMetadataValue(metadata, "weight_goal_section"));

  const quizWeightGoal = quizWeightGoalData[`${bodyType}`];

  const handleResetQuiz = () => {
    const routerObject = [
      "quiz",
      "weight",
      "weightGoal",
      "month",
      "name",
      "quiz",
      "bodyType",
      "isUserTired",
    ];
    delete route?.query?.slug;
    const updatedQuery = { ...route?.query };
    routerObject.forEach((item: string) => {
      delete updatedQuery[`${item}`];
    });
    route.push(
      {
        pathname: pages.QUIZNEW,
        query: {
          ...updatedQuery,
        },
      },
      undefined,
      { shallow: true }
    );
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  const QuizInputs = ({
    data,
    formik,
    quizCurrentPage,
    handlePreQuizState,
    isLastQuestion = false,
  }: {
    data: any;
    formik: any;
    quizCurrentPage: number;
    handlePreQuizState: any;
    isLastQuestion: boolean;
  }) => {
    const caution: { contact: string; email: number } =
      metadata &&
      getMetadataValue(metadata, "caution") &&
      parseJson(getMetadataValue(metadata, "caution"));
    const getQuizStateLocal =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(WEIGHT_QUIZ_STATE))
        : null;

    const questions = Array.isArray(data) && data?.length ? data : null;

    const handleFormikSubmit = () => {
      if (!isLastQuestion) {
        formik.submitForm();
      }
    };

    const handleChangeSelectInput = (
      e: any,
      name: string,
      label: string,
      ques: string
    ) => {
      const value = e.target.value;
      if (label == "Feet") {
        let getFormikValue = formik.values[`${name}`]?.split(",");
        getFormikValue[0] = value;
        formik.setFieldValue(name, getFormikValue.join());
        handleQuestionEvents(ques, getFormikValue.join());
      } else if (label == "Inches") {
        let getFormikValue = formik.values[`${name}`]?.split(",");
        getFormikValue[1] = value;
        formik.setFieldValue(name, getFormikValue.join());
        handleQuestionEvents(ques, getFormikValue.join());
      } else {
        formik.setFieldValue(name, value);
        handleQuestionEvents(ques, value);
      }
    };

    if (!questions) {
      return <></>;
    }
    return (
      <>
        {questions?.map((question: IQuestion, index: number) => {
          const name =
            question?.questionType &&
            defaultQuestionTypes.indexOf(question.questionType) !== -1
              ? question?.questionType
              : `question${quizCurrentPage + 1}`;
          return (
            <React.Fragment key={index}>
              {question?.enable ? (
                <FormControl
                  className={style.quizpage_form_input}
                  variant="outlined"
                >
                  <label className={style.label} htmlFor="phone">
                    {question?.questionText || ""}
                  </label>
                  {formik.errors[name] && formik.touched[name] ? (
                    <div className={style.errormessage}>
                      {formik.errors[name] || ""}
                    </div>
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "radio" ? (
                    <InputRadio
                      question={question}
                      name={name}
                      formik={formik}
                      handleQuestionEvents={(ques, text) => {
                        handleQuestionEvents(ques, text);
                        handleFormikSubmit();
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "select_height" ? (
                    <div className={style.inputSelect}>
                      {question?.range1?.enable ? (
                        <InputSelect
                          name={name}
                          question={question}
                          start={question?.range1?.start}
                          end={question?.range1?.end}
                          value={
                            (formik.values[name] &&
                              formik.values[name].length &&
                              formik.values[name].split(",")[0]) ||
                            null
                          }
                          label="Feet"
                          extraQuote="’"
                          handleChangeSelectInput={handleChangeSelectInput}
                          isWeightQuiz={true}
                        />
                      ) : (
                        <></>
                      )}
                      {question?.range2?.enable ? (
                        <InputSelect
                          name={name}
                          question={question}
                          start={question?.range2?.start}
                          end={question?.range2?.end}
                          value={
                            (formik.values[name] &&
                              formik.values[name].length &&
                              formik.values[name].split(",")[1]) ||
                            null
                          }
                          label="Inches"
                          extraQuote="”"
                          handleChangeSelectInput={handleChangeSelectInput}
                          isWeightQuiz={true}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "select_weight" ? (
                    <div className={style.inputSelect}>
                      {question?.range1?.enable ? (
                        <InputSelect
                          name={name}
                          question={question}
                          start={question?.range1?.start}
                          value={formik.values[name]}
                          end={question?.range1?.end}
                          label="kgs"
                          handleChangeSelectInput={handleChangeSelectInput}
                          isWeightQuiz={true}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "card" ? (
                    <InputCards
                      name={name}
                      question={question}
                      handleQuestionEvents={(ques, text) => {
                        handleQuestionEvents(ques, text);
                        handleFormikSubmit();
                      }}
                      formik={formik}
                    />
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "name" ? (
                    <div className={style.inputContainer}>
                      <Field
                        className={`${style.input} ${style.input_margin}`}
                        name="name"
                        type="text"
                        onBlur={e => {
                          formik.handleBlur(e);
                          handlePreQuizState(formik.values, formik.errors);
                        }}
                        placeholder="Type your name here"
                      />
                      <div
                        onClick={() => {
                          handleFormikSubmit();
                        }}
                        className={style.inputContainer_svg}
                      >
                        <MemoRightArrow />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "phone" ? (
                    <>
                      <div className={style.inputContainer}>
                        <Field
                          className={`${style.input} ${style.input_margin}`}
                          name="phone"
                          type="number"
                          onBlur={e => {
                            formik.handleBlur(e);
                            handlePreQuizState(formik.values, formik.errors);
                          }}
                          placeholder="+91 xxxxx xxxxx"
                        />
                        <div
                          onClick={() => {
                            handleFormikSubmit();
                          }}
                          className={style.inputContainer_svg}
                        >
                          <MemoRightArrow />
                        </div>
                      </div>
                      <span className={style.caution}>
                        {caution?.contact || ""}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  {question?.questionType == "email" ? (
                    <>
                      <div className={style.inputContainer}>
                        <Field
                          className={`${style.input} ${style.input_margin}`}
                          name="email"
                          type="text"
                          placeholder="john@gmail.com"
                        />
                        <div
                          onClick={() => {
                            handleFormikSubmit();
                          }}
                          className={style.inputContainer_svg}
                        >
                          <MemoRightArrow />
                        </div>
                      </div>
                      <span className={style.caution}>
                        {caution?.email || ""}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </FormControl>
              ) : (
                <></>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const QuizForm = React.memo(
    ({
      metadata,
      quizHeaderData,
    }: {
      metadata: Array<any>;
      quizHeaderData: any;
    }) => {
      const router = useRouter();

      const handleQuizSubmitEvents = (values: any, url: any) => {
        const clevertap = makeClevertap();
        if (gtmConfig?.plixQuizMain?.enable) {
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig?.plixQuizMain?.value,
            ecommerce: {
              URL: window?.location?.href,
              name: "Main Plix Quiz",
              user_ID: user?.id
                ? getDBIdFromGraphqlId(user?.id, "User")
                : undefined,
              membership_status: isMember(user)
                ? "plix_club_member"
                : "not_a_plix_club_member",
            },
          });
        }
        if (clevertapEvents?.plixMainQuiz?.enable) {
          clevertap.event.push(clevertapEvents.plixMainQuiz.value, {
            URL: window?.location?.href,
            user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : "null",
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            name: values?.name || "",
            phone: `+91${values?.phone || ""}`,
            email: values?.email || "",
          });
        }
        clevertap.profile.push({
          Site: {
            landing_page_url: url,
          },
        });
      };

      const quizQuestions: IQuestion[] =
        metadata &&
        getMetadataValue(metadata, "quiz_updated_questions") &&
        parseJson(getMetadataValue(metadata, "quiz_updated_questions"));

      const [quizCurrentPage, setQuizCurrentPage] = useState<number>(0);

      const [quizTrackState, setQuizTrackState] = useState<IQuizTrackState>({
        filledQuestion: {},
        currentPage: 0,
        surveyId: "",
        surveyHash: "",
        primaryQuestion: "",
        sliderValue: 0,
        productCollection: {},
        isSubmitted: false,
        questionValues: updateQuestionValuesNew(
          quizQuestions[quizCurrentPage],
          quizCurrentPage
        ),
      });

      const hadleQuizNext = ({
        createSurvey,
        updateSurvey,
        fillSurvey,
        questionValues,
        value,
        formikAction,
        aftersubmit,
        nextQuestionValues,
      }: {
        createSurvey: any;
        updateSurvey: any;
        fillSurvey: any;
        questionValues: any;
        value: any;
        formikAction: any;
        aftersubmit: any;
        nextQuestionValues?: any;
      }) => {
        formikAction && formikAction.setSubmitting(true);

        const surveyInput = quizTrackState?.surveyId
          ? { surveyId: quizTrackState?.surveyId }
          : {};

        const surveyMutation = quizTrackState?.surveyId
          ? updateSurvey
          : createSurvey;

        function handleSurveyFill(response?: any): void {
          const survey =
            response?.data?.surveyCreate?.surveys[0] ||
            response?.data?.surveyUpdate?.survey;
          const surveyHash =
            survey?.linkData?.surveyHash || quizTrackState?.surveyHash;
          const surveyId = survey?.id || quizTrackState?.surveyId;
          const question = survey?.questions?.edges || "";
          const quizTrackData: any = Object.keys(value)?.reduce(
            (acc, curr, index) => {
              const questionId = question[index]?.node?.id;
              const filledQuestion =
                quizTrackState?.filledQuestion[curr]?.question;

              // Check if either questionId or filledQuestion exists
              if (questionId || filledQuestion) {
                return {
                  ...acc,
                  [curr]: {
                    question: questionId || filledQuestion,
                    answer: value[curr],
                  },
                };
              } else {
                // If neither questionId nor filledQuestion exists, return the accumulator as is
                return acc;
              }
            },
            {}
          );
          const newQuizTrackState = {
            ...quizTrackState,
            filledQuestion: {
              ...quizTrackState?.filledQuestion,
              ...quizTrackData,
            },
            surveyId,
            surveyHash,
            currentPage:
              quizTrackState?.currentPage > quizCurrentPage ||
              quizCurrentPage === quizQuestions?.length - 1
                ? quizTrackState?.currentPage
                : quizCurrentPage + 1,
            questionValues: {
              ...quizTrackState?.questionValues,
              ...nextQuestionValues,
            },
            isSubmitted:
              aftersubmit && typeof aftersubmit === "function" ? true : false,
          };
          setQuizTrackState({ ...newQuizTrackState });
          setQuizStateLocal(WEIGHT_QUIZ_STATE, { ...newQuizTrackState });
          if (surveyId && quizTrackData) {
            fillSurvey({
              variables: {
                answers: [
                  ...Object.keys(quizTrackData)?.map(
                    (key: any, index: number) => {
                      if (quizTrackData[key]?.question) {
                        return {
                          question: quizTrackData[key]?.question,
                          answer: quizTrackData[key]?.answer,
                        };
                      }
                    }
                  ),
                ],
                surveyId,
                surveyHash,
              },
            })
              .then(() => {
                if (aftersubmit) {
                  aftersubmit();
                }
              })
              .finally(() => {});
          }
        }
        if (quizTrackState?.currentPage <= quizCurrentPage) {
          surveyMutation({
            variables: {
              input: { name: "Plix Quiz New" },
              ...surveyInput,
              questions: [
                ...(Object.keys(questionValues) || []).map(
                  (que: string, index: number) => ({
                    text: extractQuestionObjWeightLoss(que, quizQuestions)
                      ?.questionText,
                    required: true,
                    order: 1 + index,
                  })
                ),
              ],
              // customerIds: [customerId],
            },
          })
            .then(response => {
              handleSurveyFill(response);
            })
            .finally(() => {
              if (formikAction && formikAction?.setSubmitting) {
                formikAction?.setSubmitting(false);
              }
            });
        } else {
          handleSurveyFill();
        }
      };

      const handleQuizNextEvent = (questions: any, page: string): void => {
        const quizFillDetails = Object.keys(questions)?.reduce((acc, curr) => {
          return {
            ...acc,
            [extractQuestionObjWeightLoss(curr, quizQuestions)
              ?.questionText]: questions[curr],
          };
        }, {});

        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig?.plixQuizNext?.value,
          ecommerce: {
            URL: window?.location?.href,
            name: "Main Plix Quiz",
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            quizDetails: quizFillDetails,
            page,
          },
        });
      };

      const [progressPercent, setProgressPrecent] = useState({
        progress: 0,
        defaultWidth: 3,
      });

      const [surveyParameters, setSurveyParameters] = useState({
        surveyId: "",
        surveyHash: "",
      });

      const [selectedHeader, setSelectedHeader] = useState(0);

      const [questionValues, setQuestionValues] = useState(
        updateQuestionValuesNew(quizQuestions[quizCurrentPage], quizCurrentPage)
      );

      const handleClossButton = () => {
        router.push(`/page/${pages.QUIZ_WEIGHT_LOSS}`);
      };

      const handleBackButton = () => {
        if (quizCurrentPage) {
          setQuizCurrentPage(quizCurrentPage - 1);
          setSelectedHeader(quizQuestions[quizCurrentPage - 1]?.quizHeader);
          setQuestionValues(handleRemoveEmptyValues(questionValues));
        } else {
          handleClossButton();
        }
      };

      return (
        <>
          <div className={style.weightQuizHeader}>
            <div
              className={style.weightQuizHeader_back}
              onClick={handleBackButton}
            >
              <MemoBackArrow width={16} height={16} />
            </div>
            <div className={style.quizheader_logo}>
              <MemoNewplixlogo />
            </div>
            <div
              className={style.weightQuizHeader_close}
              onClick={handleClossButton}
            >
              <MemoNewCartcloseIcon width={16} height={16} />
            </div>
          </div>
          {quizHeaderData?.enable && quizHeaderData?.header && !quizAnalysis ? (
            <div className={style.quizpage_header}>
              {quizHeaderData?.header || ""}
            </div>
          ) : (
            <></>
          )}
          <div className={style.marginQuizHeader}>
            {quizHeaderData?.enable ? (
              <QuizCardHeader
                selectedHeader={selectedHeader}
                headerData={quizHeaderData}
              />
            ) : (
              <></>
            )}
          </div>
          {progressPercent ? (
            <div className={style.quizpage_progress}>
              <div className={style.quizpage_progressbar}>
                <QuizProgressbar
                  progress={progressPercent?.progress}
                  defaultWidth={progressPercent?.defaultWidth}
                  isWeightQuiz={true}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={style.quizpage_form}>
            <TypedCreateSurveyMutation>
              {createSurvey => {
                return (
                  <TypedUpdateSurveyMutation>
                    {updateSurvey => {
                      return (
                        <TypedFillSurveyMutation>
                          {fillSurvey => {
                            const handlepreQuizSubmit = (
                              name: string,
                              phone: string
                            ) => {
                              const userDetails = {
                                name,
                                phone: `+91${phone}`,
                              };

                              const clevertap = makeClevertap();

                              clevertap.onUserLogin.push({
                                Site: {
                                  Name: userDetails?.name,
                                  Phone: userDetails?.phone,
                                  Identity: userDetails?.phone?.replace(
                                    "+",
                                    ""
                                  ),
                                  "MSG-sms": true, // Sms notifications
                                  "MSG-whatsapp": true, // WhatsApp notifications
                                },
                              });
                              createSurvey({
                                variables: {
                                  input: { name: "Plix Quiz New User Info" },
                                  questions: [
                                    { text: "name", required: true, order: 1 },
                                    { text: "phone", required: true, order: 2 },
                                  ],
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
                                              userDetails[
                                                Object.keys(userDetails)[index]
                                              ],
                                          })
                                        ),
                                      ],
                                      surveyId,
                                      // userId: customerId,
                                      surveyHash,
                                    },
                                  });
                                }
                              });
                            };
                            const handlePreQuizState = (
                              values: any,
                              errors: any
                            ) => {
                              if (
                                !!values?.name &&
                                !errors?.name &&
                                !errors?.phone &&
                                !!values?.phone
                              ) {
                                handlepreQuizSubmit(
                                  values?.name,
                                  values?.phone
                                );
                              }
                            };

                            if (
                              user?.firstName &&
                              user?.phone?.length &&
                              !firstLoad
                            ) {
                              const phone = user?.phone?.replace("+91", "");
                              handlepreQuizSubmit(user?.firstName, phone);
                              setFirstLoad(true);
                            }
                            return (
                              <Formik
                                enableReinitialize
                                initialValues={{
                                  name: user?.firstName || "",
                                  source: utmSource,
                                  campaign: utmCampaign,
                                  ...questionValues,
                                }}
                                validationSchema={Yup.object().shape({
                                  name: Yup.string()
                                    .required("*Required")
                                    .matches(
                                      /^[aA-zZ\s]+$/,
                                      "Only alphabets are allowed for name"
                                    ),
                                  phone:
                                    quizCurrentPage === 1
                                      ? Yup.string()
                                          .required("Required")
                                          .matches(
                                            phoneRegExp,
                                            "*Invalid phone number"
                                          )
                                      : undefined,
                                  email:
                                    quizCurrentPage === 2
                                      ? Yup.string()
                                          .required("*Required")
                                          .email("*Invalid email*")
                                      : undefined,
                                  ...Object.keys(questionValues).reduce(
                                    (acc: any, key: any) => {
                                      if (
                                        defaultQuestionTypes.indexOf(key) === -1
                                      )
                                        acc[key] = Yup.string().required(
                                          "Required"
                                        );
                                      return acc;
                                    },
                                    {}
                                  ),
                                })}
                                onSubmit={(value, formikAction) => {
                                  formikAction.setSubmitting(false);
                                  if (
                                    quizCurrentPage <
                                    quizQuestions?.length - 1
                                  ) {
                                    const nextQuestionValues = {
                                      ...value,
                                      ...updateQuestionValuesNew(
                                        quizQuestions[quizCurrentPage + 1],
                                        quizCurrentPage + 1
                                      ),
                                    };
                                    setQuestionValues(nextQuestionValues);
                                    setProgressPrecent({
                                      defaultWidth: 0,
                                      progress:
                                        Math.floor(
                                          ((quizCurrentPage + 1) /
                                            quizQuestions?.length) *
                                            100
                                        ) < 3
                                          ? 3
                                          : Math.floor(
                                              ((quizCurrentPage + 1) /
                                                quizQuestions?.length) *
                                                100
                                            ),
                                    });
                                    if (
                                      quizCurrentPage <
                                      quizQuestions?.length - 1
                                    )
                                      setSelectedHeader(
                                        quizQuestions[quizCurrentPage + 1]
                                          ?.quizHeader
                                      );
                                    if (
                                      quizCurrentPage >=
                                      quizTrackState?.currentPage
                                    ) {
                                      handleQuizNextEvent(
                                        value,
                                        `page-${quizCurrentPage + 1}`
                                      );
                                    }
                                    const nextQuestion =
                                      quizQuestions[quizCurrentPage + 1];
                                    if (
                                      nextQuestion?.questionType ===
                                      "select_height"
                                    ) {
                                      handleQuestionEvents(
                                        nextQuestion?.questionText,
                                        `${nextQuestion?.range1?.default},${nextQuestion?.range2?.default}`
                                      );
                                    }

                                    if (
                                      nextQuestion?.questionType ===
                                      "select_weight"
                                    ) {
                                      handleQuestionEvents(
                                        nextQuestion?.questionText,
                                        `${nextQuestion?.range1?.default}`
                                      );
                                    }
                                    const questions =
                                      quizCurrentPage == 0
                                        ? { ...value }
                                        : updateQuestionValuesNew(
                                            quizQuestions[quizCurrentPage],
                                            quizCurrentPage
                                          );
                                    hadleQuizNext({
                                      createSurvey,
                                      updateSurvey,
                                      fillSurvey,
                                      questionValues: questions,
                                      value,
                                      nextQuestionValues,
                                    });
                                    setQuizCurrentPage(prev => prev + 1);
                                    window.scrollTo({
                                      top: 0,
                                      left: 0,
                                      behavior: "smooth",
                                    });
                                  } else {
                                    setProgressPrecent({
                                      defaultWidth: 0,
                                      progress: 100,
                                    });

                                    // const customerId = user?.id;
                                    const questions = updateQuestionValuesNew(
                                      quizQuestions[quizCurrentPage],
                                      quizCurrentPage
                                    );
                                    formikAction.setSubmitting(true);
                                    const handleAfterSubmit = () => {
                                      const routerObject: any = {
                                        name: value?.name,
                                        quiz: "",
                                        weight: "",
                                        weightGoal: "",
                                        month: "1month",
                                        bodyType: "",
                                        isUserTired: "No",
                                      };
                                      (
                                        Object.keys(questionValues) || []
                                      ).forEach((que: string) => {
                                        switch (true) {
                                          case extractQuestionObjWeightLoss(
                                            que,
                                            quizQuestions
                                          )?.questionText?.includes(
                                            "concerns do you face"
                                          ):
                                            routerObject.quiz = value[`${que}`];
                                            break;
                                          case extractQuestionObjWeightLoss(
                                            que,
                                            quizQuestions
                                          )?.questionText?.includes(
                                            "Do you feel tired when you wake up?"
                                          ):
                                            routerObject.isUserTired =
                                              value[`${que}`];
                                            break;
                                          case extractQuestionObjWeightLoss(
                                            que,
                                            quizQuestions
                                          )?.questionText?.includes(
                                            "weight loss goals"
                                          ):
                                            let selectedWeightIndex = extractQuestionObjWeightLoss(
                                              que,
                                              quizQuestions
                                            )?.options?.findIndex(
                                              item => item === value[`${que}`]
                                            );
                                            routerObject.weightGoal =
                                              value[`${que}`];
                                            if (selectedWeightIndex !== -1) {
                                              routerObject.month = `${
                                                selectedWeightIndex + 1
                                              }month`;
                                            }
                                            break;
                                          case extractQuestionObjWeightLoss(
                                            que,
                                            quizQuestions
                                          )?.questionText?.includes(
                                            "What is you weight"
                                          ):
                                            routerObject.weight =
                                              value[`${que}`];
                                            break;
                                          case extractQuestionObjWeightLoss(
                                            que,
                                            quizQuestions
                                          )?.questionText?.includes(
                                            "body type"
                                          ):
                                            routerObject.bodyType =
                                              value[`${que}`];
                                          default:
                                            break;
                                        }
                                      });
                                      delete route?.query?.slug;
                                      route.push(
                                        {
                                          pathname:
                                            pages.QUIZ_WEIGHT_LOSS_RESULT,
                                          query: {
                                            ...route.query,
                                            ...routerObject,
                                          },
                                        },
                                        undefined,
                                        { shallow: true }
                                      );

                                      const urlParams = Object.keys(
                                        routerObject
                                      )
                                        .map(
                                          key =>
                                            key +
                                            "=" +
                                            routerObject[key]
                                              .split(" ")
                                              .join("+")
                                        )
                                        .join("&");

                                      const url = `/page/${pages.QUIZ_WEIGHT_LOSS_RESULT}?${urlParams}`;

                                      handleQuizSubmitEvents(value, url);

                                      window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                      });
                                    };
                                    hadleQuizNext({
                                      createSurvey,
                                      updateSurvey,
                                      fillSurvey,
                                      questionValues: questions,
                                      value,
                                      formikAction,
                                      aftersubmit: handleAfterSubmit,
                                      nextQuestionValues: null,
                                    });
                                  }
                                }}
                              >
                                {formik => {
                                  const currentQuestionData =
                                    quizQuestions[quizCurrentPage];
                                  const isLastQuestion =
                                    quizCurrentPage ===
                                    quizQuestions?.length - 1;
                                  return (
                                    <Form>
                                      {quizQuestions &&
                                      Array.isArray(quizQuestions) &&
                                      quizQuestions?.length ? (
                                        <QuizInputs
                                          data={[currentQuestionData]}
                                          formik={formik}
                                          isLastQuestion={isLastQuestion}
                                          quizCurrentPage={quizCurrentPage}
                                          handlePreQuizState={
                                            handlePreQuizState
                                          }
                                        />
                                      ) : (
                                        <></>
                                      )}
                                      {showNextButton.indexOf(
                                        currentQuestionData.questionType
                                      ) !== -1 || isLastQuestion ? (
                                        <button
                                          className={
                                            style.quizpage_form_submitButton
                                          }
                                          type="submit"
                                        >
                                          {formik.isSubmitting ? (
                                            <>SUBMITTING...</>
                                          ) : (
                                            <>
                                              {isLastQuestion ? (
                                                <>Submit</>
                                              ) : (
                                                <>Next</>
                                              )}
                                            </>
                                          )}
                                        </button>
                                      ) : (
                                        <></>
                                      )}
                                    </Form>
                                  );
                                }}
                              </Formik>
                            );
                          }}
                        </TypedFillSurveyMutation>
                      );
                    }}
                  </TypedUpdateSurveyMutation>
                );
              }}
            </TypedCreateSurveyMutation>
          </div>
        </>
      );
    }
  );

  const BannerComponent = ({
    metadata,
    quizAnalysis,
    quizWeightGoal,
  }: {
    metadata: Array<any>;
    quizAnalysis: string | null;
    quizWeightGoal: any;
  }) => {
    const recommendationSection =
      metadata &&
      getMetadataValue(metadata, "recommendation_section_new") &&
      parseJson(getMetadataValue(metadata, "recommendation_section_new"));
    const month: string = (route?.query?.month as string) || "1month";

    return (
      <div
        className={`${style.quizpage_bannerContainer} ${
          quizAnalysis ? style.quizpage_bannerContainer_new : ""
        }`}
      >
        <div className={style.quizpage_bannerContainer_headings}>
          <h2>{recommendationSection?.heading_1 || ""}</h2>
          <h3>{recommendationSection?.text}</h3>
          {recommendationSection?.months ? (
            <div>{recommendationSection?.months[month] || ""}</div>
          ) : (
            <></>
          )}
          <p>{recommendationSection?.bottom_text}</p>
        </div>
        <div className={style.quizpage_recommended_box}>
          <div className={style.quizpage_recommended}>
            <div className={style.quizpage_recommended_container}>
              <div className={style.quizpage_recommended_container_percent}>
                {recommendationSection?.caution?.percentage || ""}
                <span>%</span>
              </div>
              <h3 className={style.quizpage_recommended_container_heading}>
                {(recommendationSection?.caution?.headings &&
                  recommendationSection?.caution?.headings[month]) ||
                  "of users who used these products for 3 months saw visible results"}
              </h3>
            </div>
          </div>
          <div className={style.quizpage_recommended_text}>
            <MemoNutritionPlus />{" "}
            {recommendationSection?.caution?.bottom_text || ""}
          </div>
        </div>
        {/* ** Hidding weightGoalSection according to new figma */}
        {/* <div className={style.quizpage_weightloss_desk}>
          <WeightGoalSection data={quizWeightGoal} />
        </div> */}
        {/* ** Hidding weightGoalSection according to new figma */}
      </div>
    );
  };

  const WellnessJourneySection = ({ metadata }: { metadata?: any }) => {
    const quizcomboConfig =
      metadata &&
      getMetadataValue(metadata, "quiz_combo_config_new") &&
      parseJson(getMetadataValue(metadata, "quiz_combo_config_new"));

    const doctorConsultation =
      metadata &&
      getMetadataValue(metadata, "doctor_consultation") &&
      parseJson(getMetadataValue(metadata, "doctor_consultation"));

    const quizVariation = sessionStorage.getItem("quiz_version")
      ? parseJson(sessionStorage.getItem("quiz_version"))?.version
      : quizcomboConfig?.quiz_version;

    if (quizVariation === "v1") {
      return (
        <>
          <div
            className={`${style.quizpage_width} ${style.quizpage_doctorconsultation}`}
          >
            <DoctorConsultationSectionNew data={doctorConsultation} />
          </div>
          <div className={style.quizpage_weightmanagement_color_false}>
            <div
              className={`${style.quizpage_width} ${style.quizpage_weightmanagement}`}
            >
              <WellnessJourney
                quizVersion={quizVariation}
                metadata={metadata}
              />
            </div>
          </div>
        </>
      );
    }
    return (
      <div className={style.quizpage_weightmanagement_color}>
        <div
          className={`${style.quizpage_width} ${style.quizpage_weightmanagementv2}`}
        >
          <WellnessJourney metadata={metadata} quizVersion={quizVariation} />
          <div className={style.quizpage_weightmanagement_mob}>
            <DoctorConsultationSection metadata={metadata} />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (route?.query?.slug === pages.QUIZ_WEIGHT_LOSS_RESULT && !quizAnalysis) {
      delete route.query.slug;
      const updatedQuery = { ...route?.query };
      route.push(
        {
          pathname: pages.QUIZNEW,
          query: updatedQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [route?.query?.slug]);

  return (
    <>
      <div
        className={`${style.quizpage} ${
          !!quizAnalysis ? style.quizpage_block : ""
        }`}
      >
        {!quizAnalysis ? (
          <>
            <QuizForm metadata={metadata} quizHeaderData={quizHeaderData} />
          </>
        ) : (
          <></>
        )}
        {quizAnalysis && quizWeightGoalData?.enable ? (
          <>
            <div
              className={`${style.quizpage_weightloss} ${style.quizpage_width}`}
            >
              <QuizWeightLossSection metadata={metadata} />
            </div>
            {/* hidding weightgoalsection according to new figma */}
            {/* <div
              className={`${style.quizpage_weightloss_mob} ${style.quizpage_width}`}
            >
              <WeightGoalSection data={quizWeightGoal} />
            </div> */}
            {/* hidding weightgoalsection according to new figma */}
          </>
        ) : (
          <></>
        )}
        {!!quizAnalysis &&
        route?.query?.slug === pages.QUIZ_WEIGHT_LOSS_RESULT ? (
          <>
            <div className={style.quizpage_bannermain}>
              <BannerComponent
                metadata={metadata}
                quizAnalysis={quizAnalysis}
                quizWeightGoal={quizWeightGoal}
              />
            </div>
            {/* <div
              className={`${style.quizpage_testimonial_mob} ${style.quizpage_width}`}
            >
              <Testimonial metadata={metadata} />
            </div> */}
            <WellnessJourneySection metadata={metadata} />
            <QuizFreeTrial data={freeTrialData} />
            <QuizProductCard metadata={metadata} />
            <div
              onClick={() => {
                handleResetQuiz();
              }}
              className={`${style.quizpage_retake} ${style.quizpage_width}`}
            >
              Retake Quiz
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
PlixMainQuiz.displayName = "PlixMainQuiz";
export default PlixMainQuiz;
