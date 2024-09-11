import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  extractQuestionObj,
  handleQuestionEvents,
  InputSelect,
  InputSlider,
  ISkinQuestion,
  ISkinQuizQuestions,
  setQuizStateLocal,
  getQuizStateLocal,
  updateQuestionValues,
  handleRemoveEmptyValues,
  InputRadioNew,
  InputCardsNew,
} from "@components/molecules";
import { useRouter } from "next/router";
import {
  getMetadataValue,
  getUrlWithParams,
  isMember,
  parseJson,
  SKIN_QUIZ_STATE,
} from "@utils/misc";
import FormControl from "@mui/material";
import {
  emailRegExp,
  getDBIdFromGraphqlId,
  nameRegExp,
  phoneRegExp,
} from "@temp/core/utils";
import {
  TypedCreateSurveyMutation,
  TypedFillSurveyMutation,
  TypedUpdateSurveyMutation,
} from "../queries";
import style from "../scss/index.module.scss";
import { pages } from "gqlTypes/customGlobalTypes";
import SkinQuizHeaderButton from "@components/molecules/QuizComponents/components/SkinQuizHeaderButton";
import gtmConfig from "Themes/lib/gtmConfig";
import clevertapEvents from "Themes/lib/clevertapEvents";

interface ISkinQuizForm {
  metadata: Array<any>;
  handleHeader: (value: number) => void;
  handleProgressPrecent: (value: number) => void;
}

interface IQuizTrackState {
  filledQuestion: { [key: string]: any };
  questionValues: { [key: string]: string };
  productCollection: {
    [key: string]: {
      key: string;
      productId: string[];
      image: string;
    };
  };
  sliderValue: number;
  currentPage: number;
  primaryQuestion: string;
  surveyId: string;
  surveyHash: string;
  isSubmitted: boolean;
}

const SkinQuizForm: React.FC<ISkinQuizForm> = ({
  metadata,
  handleHeader,
  handleProgressPrecent,
}) => {
  const router = useRouter();
  const { user } = useAuthState();
  const [firstLoad, setFirstLoad] = useState(false);
  const [quizCurrentPage, setQuizCurrentPage] = useState<number>(0);
  const utmSource: string = router?.query?.utm_source ? "inorganic" : "organic";
  const utmCampaign: string = (router?.query?.utm_campaign as string) || "none";
  const quizQuestionMeta: ISkinQuizQuestions[] =
    metadata &&
    getMetadataValue(metadata, "quiz") &&
    parseJson(getMetadataValue(metadata, "quiz"));
  const [quizQuestions, setQuizQuestion] = useState<ISkinQuizQuestions[]>(
    quizQuestionMeta
  );

  const getQuizStateLocal =
    typeof window !== "undefined"
      ? parseJson(localStorage.getItem(SKIN_QUIZ_STATE))
      : null;

  const quizMetaKeys: {
    [key: string]: string;
  } =
    metadata &&
    getMetadataValue(metadata, "quizMetaKeys") &&
    parseJson(getMetadataValue(metadata, "quizMetaKeys"));

  const [quizTrackState, setQuizTrackState] = useState<IQuizTrackState>({
    filledQuestion: {}, // it includes both dyanamic questions and hard-coded questions
    currentPage: 0,
    surveyId: "",
    surveyHash: "",
    primaryQuestion: "",
    sliderValue: 0,
    productCollection: {},
    isSubmitted: false,
    questionValues: updateQuestionValues(
      // This includes only dyanamic questions
      quizQuestions[quizCurrentPage],
      quizCurrentPage
    ),
  });
  const caution: { contact: string; email: number } =
    metadata &&
    getMetadataValue(metadata, "caution") &&
    parseJson(getMetadataValue(metadata, "caution"));

  useEffect(() => {
    if (getQuizStateLocal) {
      if (getQuizStateLocal.isSubmitted) {
        router.push(getUrlWithParams(`/page/${pages?.QUIZSKINRESULTS}`));
      }
      if (getQuizStateLocal?.primaryQuestion) {
        const metaKey =
          quizMetaKeys[
            `${
              getQuizStateLocal?.questionValues[
                `${getQuizStateLocal?.primaryQuestion}`
              ]
            }`
          ];
        const extraQuizQuestions =
          (metadata &&
            getMetadataValue(metadata, metaKey) &&
            parseJson(getMetadataValue(metadata, metaKey))) ||
          [];

        setQuizQuestion([...quizQuestionMeta, ...extraQuizQuestions]);
      }
      setQuizTrackState({ ...getQuizStateLocal });
      handleQuizPagination(getQuizStateLocal?.currentPage);
      handleHeaderChange(getQuizStateLocal?.currentPage - 1);
    }
  }, []);

  const handleQuizPagination = (value: number) => {
    if (value === 1 && quizQuestions.length <= 2) {
      const lastPage: any = quizQuestions[quizQuestions.length - 1];
      const lastQuestion: any =
        lastPage?.questions &&
        lastPage?.questions[lastPage?.questions.length - 1];
      const questionText: string =
        (lastQuestion?.cards?.length &&
          lastQuestion?.cards[lastQuestion?.cards.length - 1]?.text) ||
        "";
      const metaKey = quizMetaKeys[`${questionText}`];
      const extraQuizQuestions =
        (metadata &&
          getMetadataValue(metadata, metaKey) &&
          parseJson(getMetadataValue(metadata, metaKey))) ||
        [];
      setQuizQuestion([...quizQuestionMeta, ...extraQuizQuestions]);
    }
    const progressPercentage = (value / 5) * 100;
    setQuizCurrentPage(value);
    handleProgressPrecent(progressPercentage);
  };

  const handleHeaderChange = (page: number) => {
    if (page < 2) {
      handleHeader(page + 1);
    }
  };

  const handleQuizQuestions = (ques: string, card: any, name: string) => {
    let quizstate = {
      ...quizTrackState,
    };
    if (ques.includes("primary skin concern")) {
      const option = card?.text;
      const metaKey = quizMetaKeys[`${option}`];
      const extraQuizQuestions =
        metadata &&
        getMetadataValue(metadata, metaKey) &&
        parseJson(getMetadataValue(metadata, metaKey));
      setQuizQuestion([...quizQuestionMeta, ...extraQuizQuestions]);
      quizstate = { ...quizstate, primaryQuestion: name };
    }
    if (
      Array.isArray(card?.productId) &&
      card?.productId.length &&
      card?.productId[0]
    ) {
      quizstate = {
        ...quizstate,
        productCollection: {
          ...quizstate?.productCollection,
          [name]: {
            key: card?.text,
            productId: [...card?.productId],
            image: card?.image,
          },
        },
      };
    }
    setQuizTrackState({ ...quizstate });
  };

  const handleBackButton = () => {
    if (quizCurrentPage) {
      const questionValues = quizTrackState?.questionValues;
      const previousQuestionValues = handleRemoveEmptyValues(questionValues);
      handleQuizPagination(quizCurrentPage - 1);
      handleHeaderChange(quizCurrentPage - 2);
      setQuizTrackState({
        ...quizTrackState,
        questionValues: { ...previousQuestionValues },
      });
    }
  };

  const handleClossButton = () => {
    router.push(`/page/${pages.QUIZ_SKIN_LANDING_PAGE}`);
  };

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
    if (formikAction && formikAction?.setSubmitting) {
      formikAction?.setSubmitting(true);
    }

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
          return {
            ...acc,
            [curr]: {
              question:
                question[index]?.node?.id ||
                quizTrackState?.filledQuestion[curr]?.question,
              answer: value[curr],
            },
          };
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
      setQuizStateLocal(SKIN_QUIZ_STATE, { ...newQuizTrackState });
      if (surveyId && quizTrackData) {
        fillSurvey({
          variables: {
            answers: [
              ...Object.keys(quizTrackData)?.map((key: any, index: number) => ({
                question: quizTrackData[key]?.question,
                answer: quizTrackData[key]?.answer,
              })),
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
          input: { name: "Plix Skin Quiz" },
          ...surveyInput,
          questions: [
            ...(Object.keys(questionValues) || []).map(
              (que: string, index: number) => ({
                text: extractQuestionObj(que, quizQuestions)?.questionText,
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
        .catch(() => {
          if (formikAction && formikAction?.setSubmitting) {
            formikAction?.setSubmitting(false);
          }
        });
    } else {
      handleSurveyFill();
    }
  };

  const handleSetSliderValue = (numericValue: number) => {
    if (quizTrackState?.sliderValue !== numericValue) {
      setQuizTrackState({
        ...quizTrackState,
        sliderValue: numericValue,
      });
    }
  };

  const handleGenerateServeyKey = async (
    createSurvey: any,
    fillSurvey: any,
    formikAction: any,
    url: string,
    value: any
  ) => {
    let updatedUrl = getUrlWithParams(url);
    if (formikAction && formikAction?.setSubmitting) {
      formikAction?.setSubmitting(true);
    }

    const fallbackCondition = (url: string) => {
      formikAction?.setSubmitting(false);
      handleQuizSubmitEvents(value, url);
      router.push(url);
    };

    createSurvey({
      variables: {
        input: { name: "Plix Skin Survey Filled Data" },
        questions: [
          {
            text: "Skin Quiz Track State",
            required: true,
            order: 1,
          },
        ],
      },
    })
      .then(response => {
        const survey =
          response?.data?.surveyCreate?.surveys[0] ||
          response?.data?.surveyUpdate?.survey;
        const surveyHash =
          survey?.linkData?.surveyHash || quizTrackState?.surveyHash;
        const surveyId = survey?.id || quizTrackState?.surveyId;
        const question = survey?.questions?.edges || "";

        if (surveyId) {
          fillSurvey({
            variables: {
              answers: [
                ...(question || [])?.map((que: any, index: number) => ({
                  question: que?.node?.id,
                  answer: JSON.stringify(quizTrackState),
                })),
              ],
              surveyId,
              // userId: customerId,
              surveyHash,
            },
          })
            .then(response => {
              updatedUrl = getUrlWithParams(url, { skin_id: surveyId });
              fallbackCondition(updatedUrl);
            })
            .catch(err => {
              console.log("error", err);
              fallbackCondition(updatedUrl);
            });
        }
      })
      .catch(err => {
        console.log("error", err);
        fallbackCondition(updatedUrl);
      });
  };

  const handleQuizSubmitEvents = (values: any, url: string) => {
    const clevertap = makeClevertap();

    if (gtmConfig?.plixQuizSkin?.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig?.plixQuizSkin?.value,
        ecommerce: {
          URL: window?.location?.href,
          name: "Plix Skin Quiz",
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        },
      });
    }
    if (clevertapEvents?.plixSkinQuiz?.enable) {
      clevertap.event.push(clevertapEvents.plixSkinQuiz.value, {
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
        skin_landing_page_url: url,
      },
    });
  };

  const handleQuizNextEvent = (questions: any, page: string): void => {
    const quizFillDetails = Object.keys(questions)?.reduce((acc, curr) => {
      return {
        ...acc,
        [extractQuestionObj(curr, quizQuestions)?.questionText]: questions[
          curr
        ],
      };
    }, {});

    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig?.plixQuizSkinNext?.value,
      ecommerce: {
        URL: window?.location?.href,
        name: "Plix Skin Quiz",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        quizDetails: quizFillDetails,
        page,
      },
    });
  };

  const QuizInputs = ({
    data,
    formik,
    quizCurrentPage,
  }: {
    data: any;
    formik: any;
    quizCurrentPage: number;
  }) => {
    const questions =
      Array.isArray(data?.questions) && data?.questions?.length
        ? data?.questions
        : null;

    const handleChangeSelectInput = (
      e: any,
      name: string,
      label: string,
      ques: string
    ) => {
      const value = e.target.value;
      if (label == "Feet") {
        const getFormikValue = formik.values[`${name}`]?.split(",");
        getFormikValue[0] = value;
        formik.setFieldValue(name, getFormikValue.join());
        handleQuestionEvents(ques, getFormikValue.join());
      } else if (label == "Inches") {
        const getFormikValue = formik.values[`${name}`]?.split(",");
        getFormikValue[1] = value;
        formik.setFieldValue(name, getFormikValue.join());
        handleQuestionEvents(ques, getFormikValue.join());
      } else {
        formik.setFieldValue(name, value);
        handleQuestionEvents(ques, value);
      }
    };

    const renderQuestionComponent = (question: any, name: string) => {
      switch (question?.questionType) {
        case "radio":
          return (
            <InputRadioNew
              question={question}
              name={name}
              formik={formik}
              handleQuestionEvents={(
                ques: string,
                option: {
                  text: string;
                  productId: string[];
                  questionKey: string;
                  question_image: string;
                }
              ) => {
                handleQuestionEvents(ques, option?.text);
                let quizTrack: IQuizTrackState = { ...quizTrackState };
                if (
                  Array.isArray(option?.productId) &&
                  option?.productId.length &&
                  option?.productId[0]
                ) {
                  quizTrack = {
                    ...quizTrack,
                    productCollection: {
                      ...quizTrack?.productCollection,
                      [name]: {
                        key: option?.questionKey,
                        image: option?.question_image,
                        productId: [...option?.productId],
                      },
                    },
                  };
                } else if (quizTrack?.productCollection[name]) {
                  delete quizTrack?.productCollection[name];
                }
                setQuizTrackState({ ...quizTrack });
              }}
            />
          );
        case "select_height":
          return (
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
                />
              ) : (
                <></>
              )}
            </div>
          );
        case "select_weight":
          return (
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
                />
              ) : (
                <></>
              )}
            </div>
          );
        case "card":
          return (
            <InputCardsNew
              name={name}
              className={
                question?.questionText.includes("primary skin concern")
                  ? style.quizpage_form_inputcard
                  : style.quizpage_form_inputcard_primary
              }
              question={question}
              handleQuestionEvents={(
                ques: string,
                card: { image: string; text: string; productId: string[] }
              ) => {
                handleQuestionEvents(ques, card?.text);
                handleQuizQuestions(ques, card, name);
              }}
              formik={formik}
            />
          );

        case "slider":
          return (
            <InputSlider
              name={name}
              question={question}
              formik={formik}
              value={quizTrackState?.sliderValue}
              className={style.quizpage_form_inputslider}
              handleSetValue={handleSetSliderValue}
              handleQuestionEvents={(
                ques: string,
                slider: { text: string; description: string }
              ) => {
                handleQuestionEvents(ques, slider?.text);
              }}
            />
          );

        default:
          return <></>;
      }
    };
    if (!questions) {
      return <></>;
    }
    return (
      <>
        {questions?.map((question: ISkinQuestion, index: number) => {
          const name = `question${quizCurrentPage + 1}${index + 1}`;
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
                  <ErrorMessage
                    component="span"
                    className={style.errormessage}
                    name={name}
                  />
                  {renderQuestionComponent(question, name)}
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

  return (
    <div className={style.quizpage_form}>
      <SkinQuizHeaderButton
        hideBackButton={quizCurrentPage === 2}
        handleBackButton={handleBackButton}
        handleCloseButton={handleClossButton}
      />
      <TypedCreateSurveyMutation>
        {createSurvey => {
          return (
            <TypedUpdateSurveyMutation>
              {updateSurvey => {
                return (
                  <TypedFillSurveyMutation>
                    {fillSurvey => {
                      const filledQuestion: any =
                        quizTrackState?.filledQuestion;
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
                            Identity: userDetails?.phone?.replace("+", ""),
                            "MSG-sms": true, // Sms notifications
                            "MSG-whatsapp": true, // WhatsApp notifications
                          },
                        });
                        createSurvey({
                          variables: {
                            input: { name: "Plix Skin Quiz User Info" },
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
                          const survey = response.data.surveyCreate.surveys[0];
                          const surveyHash = survey?.linkData?.surveyHash || "";
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
                      const handlePreQuizState = (values: any, errors: any) => {
                        if (
                          !!values?.name &&
                          !errors?.name &&
                          !errors?.phone &&
                          !!values?.phone
                        ) {
                          handlepreQuizSubmit(values?.name, values?.phone);
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

                      const validate = (values: any) => {
                        const errors: any = {};
                        const updatedValues = {
                          ...values,
                          ...quizTrackState?.questionValues,
                        };
                        const formikKeys = Object.keys(updatedValues);

                        formikKeys.forEach(key => {
                          switch (key) {
                            case "name":
                              if (!nameRegExp.test(values.name))
                                errors.name =
                                  "Only alphabets are allowed for name";
                            // eslint-disable-next-line no-fallthrough
                            case "email":
                              if (!emailRegExp.test(values.email))
                                errors.email = "Invalid email";
                            // eslint-disable-next-line no-fallthrough
                            case "phone":
                              if (!phoneRegExp.test(values.phone))
                                errors.phone = "Invalid phone number";
                            // eslint-disable-next-line no-fallthrough
                            default:
                              if (!values[`${key}`]) {
                                errors[`${key}`] = "*Required";
                              }
                              break;
                          }
                        });

                        return errors;
                      };

                      return (
                        <Formik
                          enableReinitialize
                          initialValues={{
                            name:
                              user?.firstName ||
                              filledQuestion?.name?.answer ||
                              "",
                            phone:
                              user?.phone.length > 10
                                ? user?.phone?.replace("+91", "")
                                : user?.phone ||
                                  filledQuestion?.phone?.answer ||
                                  "",
                            email:
                              user?.email ||
                              filledQuestion?.email?.answer ||
                              "",
                            source: utmSource,
                            campaign: utmCampaign,
                            ...quizTrackState?.questionValues,
                          }}
                          validate={validate}
                          onSubmit={(value, formikAction) => {
                            formikAction.setSubmitting(false);
                            const questions =
                              quizCurrentPage < 1
                                ? { ...value }
                                : updateQuestionValues(
                                    quizQuestions[quizCurrentPage],
                                    quizCurrentPage
                                  );

                            // Handle pixel tracking on each page
                            if (
                              quizCurrentPage >= quizTrackState?.currentPage
                            ) {
                              handleQuizNextEvent(
                                value,
                                `page-${quizCurrentPage + 1}`
                              );
                            }
                            // Handle pixel tracking on each page

                            if (quizCurrentPage < quizQuestions?.length - 1) {
                              const nextQuestionValues: any = {
                                ...updateQuestionValues(
                                  quizQuestions[quizCurrentPage + 1],
                                  quizCurrentPage + 1
                                ),
                                ...value,
                              };
                              setQuizTrackState({
                                ...quizTrackState,
                                questionValues: {
                                  ...quizTrackState.questionValues,
                                  ...nextQuestionValues,
                                },
                              });
                              handleHeaderChange(quizCurrentPage);
                              handleQuizPagination(quizCurrentPage + 1);
                              window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                              hadleQuizNext({
                                createSurvey,
                                updateSurvey,
                                fillSurvey,
                                questionValues: questions,
                                value,
                                nextQuestionValues,
                                formikAction: null,
                                aftersubmit: null,
                              });
                            } else {
                              // const customerId = user?.id;
                              // const handleAfterSubmit = () => {
                              //   const routerObject: any = {
                              //     name: value?.name,
                              //     quiz: "",
                              //     weight: "",
                              //     weightGoal: "",
                              //     month: "1month",
                              //     bodyType: "",
                              //   };
                              //   (
                              //     Object.keys(quizTrackState?.questionValues) ||
                              //     []
                              //   ).forEach((que: string) => {
                              //     switch (true) {
                              //       case extractQuestionObj(
                              //         que,
                              //         quizQuestions
                              //       )?.questionText?.includes(
                              //         "concerns do you face"
                              //       ):
                              //         routerObject.quiz = value[`${que}`];
                              //         break;
                              //       case extractQuestionObj(
                              //         que,
                              //         quizQuestions
                              //       )?.questionText?.includes(
                              //         "weight loss goals"
                              //       ):
                              //         let selectedWeightIndex = extractQuestionObj(
                              //           que,
                              //           quizQuestions
                              //         )?.options?.findIndex(
                              //           item => item === value[`${que}`]
                              //         );
                              //         routerObject.weightGoal = value[`${que}`];
                              //         if (selectedWeightIndex !== -1) {
                              //           routerObject.month = `${
                              //             selectedWeightIndex + 1
                              //           }month`;
                              //         }
                              //         break;
                              //       case extractQuestionObj(
                              //         que,
                              //         quizQuestions
                              //       )?.questionText?.includes(
                              //         "What is you weight"
                              //       ):
                              //         routerObject.weight = value[`${que}`];
                              //         break;
                              //       case extractQuestionObj(
                              //         que,
                              //         quizQuestions
                              //       )?.questionText?.includes("body type"):
                              //         routerObject.bodyType = value[`${que}`];
                              //       default:
                              //         break;
                              //     }
                              //   });
                              //   router.push(
                              //     {
                              //       pathname: router.pathname,
                              //       query: {
                              //         ...router.query,
                              //         ...routerObject,
                              //       },
                              //     },
                              //     undefined,
                              //     { shallow: true }
                              //   );

                              //   const urlParams = Object.keys(routerObject)
                              //     .map(
                              //       key =>
                              //         key +
                              //         "=" +
                              //         routerObject[key].split(" ").join("+")
                              //     )
                              //     .join("&");
                              //   window.scrollTo({
                              //     top: 0,
                              //     left: 0,
                              //     behavior: "smooth",
                              //   });
                              // };
                              const url = `/page/${pages.QUIZSKINRESULTS}`;
                              const handleAfterSubmit = () => {
                                handleGenerateServeyKey(
                                  createSurvey,
                                  fillSurvey,
                                  formikAction,
                                  url,
                                  value
                                );
                              };
                              hadleQuizNext({
                                createSurvey,
                                updateSurvey,
                                fillSurvey,
                                questionValues: questions,
                                value,
                                nextQuestionValues: null,
                                formikAction,
                                aftersubmit: handleAfterSubmit,
                              });
                            }
                          }}
                        >
                          {formik => {
                            return (
                              <Form>
                                {quizCurrentPage == 0 ? (
                                  <>
                                    <FormControl
                                      className={style.quizpage_form_input}
                                      variant="outlined"
                                    >
                                      <label
                                        className={style.label}
                                        htmlFor="name"
                                      >
                                        Name
                                      </label>
                                      <ErrorMessage
                                        component="span"
                                        className={style.errormessage}
                                        name="name"
                                      />
                                      <Field
                                        className={style.input}
                                        name="name"
                                        type="text"
                                        onBlur={e => {
                                          formik.handleBlur(e);
                                          handlePreQuizState(
                                            formik.values,
                                            formik.errors
                                          );
                                        }}
                                        placeholder="Type your name here"
                                      />
                                    </FormControl>
                                    <FormControl
                                      className={style.quizpage_form_input}
                                      variant="outlined"
                                    >
                                      <label
                                        className={style.label}
                                        htmlFor="phone"
                                      >
                                        Contact Number*
                                      </label>
                                      <ErrorMessage
                                        component="div"
                                        className={style.errormessage}
                                        name="phone"
                                      />
                                      <Field
                                        className={`${style.input} ${style.input_margin}`}
                                        name="phone"
                                        type="number"
                                        onBlur={e => {
                                          formik.handleBlur(e);
                                          handlePreQuizState(
                                            formik.values,
                                            formik.errors
                                          );
                                        }}
                                        placeholder="+91 xxxxx xxxxx"
                                      />
                                      <span className={style.caution}>
                                        {caution?.contact || ""}
                                      </span>
                                    </FormControl>
                                    <FormControl
                                      className={style.quizpage_form_input}
                                      variant="outlined"
                                    >
                                      <label
                                        className={style.label}
                                        htmlFor="email"
                                      >
                                        Email*
                                      </label>
                                      <ErrorMessage
                                        component="div"
                                        className={style.errormessage}
                                        name="email"
                                      />
                                      <Field
                                        className={`${style.input} ${style.input_margin}`}
                                        name="email"
                                        type="text"
                                        placeholder="john@gmail.com"
                                      />
                                      <span className={style.caution}>
                                        {caution?.email || ""}
                                      </span>
                                    </FormControl>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {quizQuestions &&
                                Array.isArray(quizQuestions) &&
                                quizQuestions?.length ? (
                                  <QuizInputs
                                    data={quizQuestions[quizCurrentPage]}
                                    formik={formik}
                                    quizCurrentPage={quizCurrentPage}
                                  />
                                ) : (
                                  <></>
                                )}
                                <button
                                  className={style.quizpage_form_submitButton}
                                  type="submit"
                                >
                                  {formik.isSubmitting ? (
                                    <>SUBMITTING...</>
                                  ) : (
                                    <>
                                      {quizCurrentPage ===
                                      quizQuestions?.length - 1 ? (
                                        <>Submit</>
                                      ) : (
                                        <>Next</>
                                      )}
                                    </>
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
            </TypedUpdateSurveyMutation>
          );
        }}
      </TypedCreateSurveyMutation>
    </div>
  );
};

export default SkinQuizForm;
