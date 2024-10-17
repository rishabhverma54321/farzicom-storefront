import React, { useCallback, useEffect, useState, memo } from "react";
import { useAuthState } from "@saleor/sdk";
import makeClevertap from "@temp/themes/plixlifefc/lib/makeClevertap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MemoRightArrow from "@components/atoms/SvgIcons/MemoRightArrow";
import {
  extractQuestionObjNew,
  handleQuestionEvents,
  InputSelect,
  InputSlider,
  ISkinQuestion,
  ISkinQuizQuestions,
  setQuizStateLocal,
  getQuizStateLocal,
  updateQuestionValuesNew,
  handleRemoveEmptyValues,
  InputRadioNew,
  InputCardsNew,
  InputMcQ,
  InputPicture,
  removeKeysAfter,
  HairMalePrimaryQuestion,
  HairFemalePrimaryQuestion,
  checkEnabledQuestions,
} from "@components/molecules";
import { useRouter } from "next/router";
import {
  getMetadataValue,
  getUrlWithParams,
  HAIR_QUIZ_STATE,
  isMember,
  parseJson,
  SKIN_QUIZ_STATE,
} from "@utils/misc";
import {
  emailRegExp,
  getDBIdFromGraphqlId,
  nameRegExp,
  phoneRegExp,
} from "@temp/core/utils";
import {
  TypedCreateSurveyMutation,
  TypedFillSurveyMutation,
  TypedHostingFileNoAuthMutation,
  TypedMutationSurveyDelete,
  TypedUpdateSurveyMutation,
} from "../queires";
import style from "../scss/index.module.scss";
import { pages } from "gqlTypes/customGlobalTypes";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import SkinQuizHeaderButton from "@components/molecules/QuizComponents/components/SkinQuizHeaderButton";
import { CachedImage } from "@components/molecules/CachedImage";
import { isNullableType } from "graphql";
import { NO_PHOTO_PLACEHOLDER } from "@temp/themes/plixlifefc/config";
import clevertapEvents from "@temp/themes/plixlifefc/lib/clevertapEvents";
import FormControl from "@mui/material/FormControl";

interface IHairQuizForm {
  metadata: Array<any>;
  handleHeader: (value: number, formikValues?: any) => void;
  handleProgressPrecent: (value: number) => void;
}

interface IQuizTrackState {
  filledQuestion: { [key: string]: any };
  questionValues: { [key: string]: string };
  productCollection: {
    [key: string]: {
      productId: Array<string>;
    };
  };
  rootCause: {
    [key: string]: {
      key: string;
      image: string;
      description: string;
    };
  };
  sliderValue: {
    [key: string]: number;
  };
  currentPage: number;
  primaryQuestion: string;
  metadata: {
    [key: string]: string;
  };
  surveyId: string;
  surveyHash: string;
  isSubmitted: boolean;
}
const showNextButton: string[] = [
  "name",
  "phone",
  "email",
  "select_height",
  "select_weight",
  "mcq",
  "slider"
];
export const QuizInputs = ({
  data,
  quizTrackState,
  formik,
  quizCurrentPage,
  setQuizTrackState,
  handleQuizQuestions,
  handlePreQuizState,
  isLastQuestion=false,
}: {
  data: any;
  formik: any;
  quizTrackState: IQuizTrackState;
  quizCurrentPage: number;
  setQuizTrackState: any;
  handleQuizQuestions: (ques: string, card: any, name: string) => void;
  handlePreQuizState: (values: any, errors: any) => void;
  isLastQuestion: boolean;
}) => {
  const questions = Array.isArray(data) && data.length > 0 ? data : [];
  const handleFormikSubmit = () => {
    if (!isLastQuestion) {
      setTimeout(() => {
        // Ensure the setQuizQuestion state update is completed
        formik.submitForm();
      }, 100);
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

  const handleSetSliderValue = (numericValue: number, name: string) => {
    if (numericValue && quizTrackState?.sliderValue !== numericValue) {
      setQuizTrackState({
        ...quizTrackState,
        sliderValue: {
          ...quizTrackState.sliderValue,
          [name]: numericValue,
        },
      });
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
              handleQuizQuestions(question, option, name);
              handleFormikSubmit()
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
      case "card": {
        const { cards } = question;
        const cardLength = cards.length;

        const cardClass = (className: any) => {
          if (cardLength > 2) {
            return className;
          }
          return `${className} ${style.quizpage_form_inputcard_flex}`;
        };

        return (
          <InputCardsNew
            name={name}
            className={
              question?.questionText.includes("primary skin concern")
                ? cardClass(style.quizpage_form_inputcard)
                : cardClass(style.quizpage_form_inputcard_primary)
            }
            question={question}
            handleQuestionEvents={(
              ques: string,
              card: { image: string; text: string; productId: string[] }
            ) => {
              handleQuestionEvents(ques, card?.text);
              handleFormikSubmit()
              handleQuizQuestions(question, card, name);
            }}
            formik={formik}
          />
        );
      }
      case "mcq":
        return (
          <InputMcQ
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
              handleQuizQuestions(question, option, name);
            }}
          />
        );
      case "name":
        return (
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
                handleFormikSubmit()
              }}
              className={style.inputContainer_svg}
            >
              <MemoRightArrow />
            </div>
          </div>

        );
      case "phone":
        return (
          <>
          <div className={style.inputContainer}>
            <Field
              className={`${style.input} ${style.input_margin}`}
              name="phone"
              type="number"
              onChange={e => {
                if (e.target.value.length <= 10) {
                  formik.setFieldValue("phone", e.target.value);
                }
              }}
              onBlur={e => {
                formik.handleBlur(e);
                handlePreQuizState(formik.values, formik.errors);
              }}
              placeholder="+91 xxxxx xxxxx"
            />
            <div
              onClick={() => {
                handleFormikSubmit()
              }}
              className={style.inputContainer_svg}
            >
              <MemoRightArrow />
            </div>
          </div>
          <span className={style.caution}>{question?.caution || ""}</span>
          </>
        );
      case "email":
        return (
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
                handleFormikSubmit()
              }}
              className={style.inputContainer_svg}
            >
              <MemoRightArrow />
            </div>
          </div>
            
            <span className={style.caution}>{question?.caution || ""}</span>
          </>
        );
      case "slider":
        return (
          <InputSlider
            name={name}
            question={question}
            formik={formik}
            value={quizTrackState?.sliderValue[name]}
            className={style.quizpage_form_inputslider}
            handleSetValue={value => {
              handleSetSliderValue(value, name);
            }}
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
        const name =
          question?.questionType &&
            ["name", "phone", "email"].indexOf(question.questionType) !== -1
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
                <div className={style.errormessage}>
                  {formik.errors[name] && formik.touched[name]
                    ? formik.errors[name]
                    : ""}
                </div>
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

const HairQuizForm: React.FC<IHairQuizForm> = ({
  metadata,
  handleHeader,
  handleProgressPrecent,
}) => {
  const router = useRouter();
  const { user } = useAuthState();
  const [firstLoad, setFirstLoad] = useState(false);
  const [pictureUploading, setPictureUploading] = useState<boolean>(false);
  const [quizCurrentPage, setQuizCurrentPage] = useState<number>(0);
  const [deleteQuestions, setDeleteQuestions] = useState<Array<string>>([]);
  const utmSource: string = router?.query?.utm_source ? "inorganic" : "organic";
  const utmCampaign: string = (router?.query?.utm_campaign as string) || "none";
  const quizQuestionMeta: ISkinQuestion[] =
    metadata &&
    getMetadataValue(metadata, "quiz") &&
    parseJson(getMetadataValue(metadata, "quiz"));
  const [quizQuestions, setQuizQuestion] = useState<ISkinQuestion[]>(
    checkEnabledQuestions(quizQuestionMeta)
  );
  const getQuizStateLocal =
    typeof window !== "undefined"
      ? parseJson(localStorage.getItem(HAIR_QUIZ_STATE))
      : null;

  const pictureSection =
    metadata &&
    getMetadataValue(metadata, "male_picture_section") &&
    parseJson(getMetadataValue(metadata, "male_picture_section"));

  const [quizTrackState, setQuizTrackState] = useState<IQuizTrackState>({
    filledQuestion: {}, // it includes both dyanamic questions and hard-coded questions
    currentPage: 0,
    surveyId: "",
    surveyHash: "",
    primaryQuestion: "",
    metadata: {},
    sliderValue: {},
    productCollection: {},
    rootCause: {},
    isSubmitted: false,
    questionValues: updateQuestionValuesNew(
      // This includes only dyanamic questions
      quizQuestions[quizCurrentPage],
      quizCurrentPage
    ),
  });
  // const caution: { contact: string; email: number } =
  //   metadata &&
  //   getMetadataValue(metadata, "caution") &&998
  //   parseJson(getMetadataValue(metadata, "caution"));

  useEffect(() => {
    if (getQuizStateLocal) {
      if (getQuizStateLocal.isSubmitted) {
        // checking whether quiz is for Female / male
        const quizType = getQuizStateLocal.questionValues?.question5;
        if (quizType === "Female") {
          router.push(
            getUrlWithParams(`/page/${pages?.QUIZ_HAIR_FEMALE_RESULTS}`)
          );
        } else {
          router.push(
            getUrlWithParams(`/page/${pages?.QUIZ_HAIR_MALE_RESULTS}`)
          );
        }
      }
      let updatedQuizQuestion = [...quizQuestionMeta];
      const value = getQuizStateLocal?.currentPage;
      if (
        getQuizStateLocal.metadata &&
        Object.keys(getQuizStateLocal?.metadata)?.length
      ) {
        Object.values(getQuizStateLocal?.metadata)?.forEach(
          (metakey: string) => {
            const extraQuizQuestions =
              (metakey &&
                getMetadataValue(metadata, metakey) &&
                parseJson(getMetadataValue(metadata, metakey))) ||
              [];
            updatedQuizQuestion = [
              ...updatedQuizQuestion,
              ...extraQuizQuestions,
            ];
          }
        );
        setQuizQuestion([...checkEnabledQuestions(updatedQuizQuestion)]);
      }
      // if (getQuizStateLocal?.primaryQuestion) {
      //   const metaKey =
      //     quizMetaKeys[
      //       `${
      //         getQuizStateLocal?.questionValues[
      //           `${getQuizStateLocal?.primaryQuestion}`
      //         ]
      //       }`
      //     ];
      //   const extraQuizQuestions =
      //     (metadata &&
      //       getMetadataValue(metadata, metaKey) &&
      //       parseJson(getMetadataValue(metadata, metaKey))) ||
      //     [];

      //   setQuizQuestion([...quizQuestionMeta, ...extraQuizQuestions]);
      // }
      setQuizTrackState({ ...getQuizStateLocal });
      setQuizCurrentPage(value);
      handleHeaderChange(updatedQuizQuestion[getQuizStateLocal?.currentPage]);

      handleProgressPrecent(updatedQuizQuestion[value]?.progressBar || 0);
    }
  }, []);

  const handleQuizPagination = (value: number) => {
    // if (value === 1 && quizQuestions.length <= 2) {
    //   const lastPage: any = quizQuestions[quizQuestions.length - 1];
    //   const lastQuestion: any =
    //     lastPage?.questions &&
    //     lastPage?.questions[lastPage?.questions.length - 1];
    //   const questionText: string =
    //     (lastQuestion?.cards?.length &&
    //       lastQuestion?.cards[lastQuestion?.cards.length - 1]?.text) ||
    //     "";
    //   const metaKey = quizMetaKeys[`${questionText}`];
    //   const extraQuizQuestions =
    //     (metadata &&
    //       getMetadataValue(metadata, metaKey) &&
    //       parseJson(getMetadataValue(metadata, metaKey))) ||
    //     [];
    //   setQuizQuestion([...quizQuestionMeta, ...extraQuizQuestions]);
    // }
    const progressPercentage: number = quizQuestions[value]?.progressBar || 0;
    setQuizCurrentPage(value);
    handleProgressPrecent(progressPercentage);
  };

  const handleSetTrackState = (value: any) => {
    setQuizTrackState({ ...value });
  };

  const handleHeaderChange = (questions: any, formikValues?: any) => {
    handleHeader(questions?.quizHeader, formikValues);
  };

  const handleQuizQuestions = (ques: any, data: any, name: string) => {
    let quizstate = {
      ...quizTrackState,
    };
    let questionMeta = [...quizQuestions];
    const isMetadata = data?.metadata || null;
    const isCombo = ques?.combo || null;
    const ismetakeyAlreadyExits = quizstate?.metadata[name] || null;
    const changeQuizFlow = isMetadata !== ismetakeyAlreadyExits;
    if (isMetadata && changeQuizFlow) {
      if (ismetakeyAlreadyExits) {
        const [newQuizStateMetaData, questionsWithMetaKeys] = removeKeysAfter(
          quizstate?.metadata,
          name
        );
        const questionIdsToDelete: string[] = [];
        let allPrevQuestionsData: any = [];
        if (questionsWithMetaKeys) {
          questionsWithMetaKeys.forEach((metakey: string) => {
            const prevQuestionData =
              (metadata &&
                getMetadataValue(metadata, quizstate?.metadata[metakey]) &&
                parseJson(
                  getMetadataValue(metadata, quizstate?.metadata[metakey])
                )) ||
              [];
            allPrevQuestionsData = [
              ...allPrevQuestionsData,
              ...checkEnabledQuestions(prevQuestionData),
            ];
          });
          quizstate = {
            ...quizstate,
            metadata: { ...newQuizStateMetaData },
          };
        }
        const newLength: number = // 5
          questionMeta?.length - allPrevQuestionsData.length;
        const currentPage: number = newLength - 1;
        const removedQuestionData = questionMeta.slice(
          newLength + 1,
          questionMeta.length
        );
        questionMeta = questionMeta.slice(0, newLength);
        removedQuestionData?.forEach((item, index) => {
          const question = `question${newLength + index + 1}`;
          if (quizstate?.filledQuestion[question]) {
            questionIdsToDelete.push(
              quizstate?.filledQuestion[question]?.question
            );
            delete quizstate?.filledQuestion[question];
          }
          if (quizstate?.questionValues[question]) {
            quizstate.questionValues[name] = data?.text; // handling the current question value bcz quizState will rerender the intial values of formik
            delete quizstate?.questionValues[question];
          }
          if (quizstate?.sliderValue[question]) {
            delete quizstate?.sliderValue[question];
          }
          if (quizstate?.rootCause[question]) {
            delete quizstate?.rootCause[question];
          }
          if (quizstate?.primaryQuestion === question) {
            quizstate.primaryQuestion = "";
          }
          if (quizstate?.productCollection[question]) {
            delete quizstate?.productCollection[question];
          }
        });
        quizstate = {
          ...quizstate,
          currentPage,
        };
        if (questionIdsToDelete && questionIdsToDelete.length) {
          setDeleteQuestions(questionIdsToDelete);
        }
      }
      const extraQuizQuestions =
        (metadata &&
          getMetadataValue(metadata, data?.metadata) &&
          parseJson(getMetadataValue(metadata, data?.metadata))) ||
        [];
      questionMeta = [...questionMeta, ...checkEnabledQuestions(extraQuizQuestions)];

      quizstate = {
        ...quizstate,
        metadata: { ...quizstate?.metadata, [name]: data?.metadata },
      };
    } else if (!isMetadata && ismetakeyAlreadyExits) {
      const prevQuestionData =
        metadata &&
        getMetadataValue(metadata, ismetakeyAlreadyExits) &&
        parseJson(getMetadataValue(metadata, ismetakeyAlreadyExits));
      const newLength: number = questionMeta?.length - prevQuestionData.length;
      questionMeta = questionMeta.splice(0, newLength);
      if (quizstate?.metadata[name]) {
        delete quizstate?.metadata[name];
      }
    }
    setQuizQuestion(checkEnabledQuestions(questionMeta));
    if (isCombo) {
      const firstQuestion = ques?.combo || "";
      const comboMetaKey = ques?.comboMetaKey || null;
      const firstQuestionAns = quizstate?.questionValues[firstQuestion] || null;
      const secondQuestionAns = data?.text || "";
      const comboData =
        metadata &&
        getMetadataValue(metadata, comboMetaKey) &&
        parseJson(getMetadataValue(metadata, comboMetaKey));
      const findProductId = comboData?.find(
        item => item?.combo === `${firstQuestionAns}|${secondQuestionAns}`
      );
      if (findProductId) {
        quizstate = {
          ...quizstate,
          productCollection: {
            ...quizstate?.productCollection,
            [name]: {
              productId: [...findProductId?.productId],
            },
          },
        };
      } else if (quizstate?.productCollection[name]) {
        delete quizstate?.productCollection[name];
      }
    }
    if (
      Array.isArray(data?.productId) &&
      data?.productId.length &&
      !isCombo &&
      data?.productId[0]
    ) {
      quizstate = {
        ...quizstate,
        productCollection: {
          ...quizstate?.productCollection,
          [name]: {
            productId: [...data?.productId],
          },
        },
      };
    } else if (quizstate?.productCollection[name] && !isCombo) {
      delete quizstate?.productCollection[name];
    }
    if (data?.rootCause && !isCombo) {
      quizstate = {
        ...quizstate,
        rootCause: {
          ...quizstate?.rootCause,
          [name]: {
            key: data?.rootCause || null,
            image: data?.image || null,
            description: data?.rootCauseDes || null,
          },
        },
      };
    } else if (quizstate?.rootCause[name] && !isCombo) {
      delete quizstate?.rootCause[name];
    }
    if (
      ques?.questionText === HairMalePrimaryQuestion ||
      ques?.questionText === HairFemalePrimaryQuestion
    ) {
      quizstate = {
        ...quizstate,
        primaryQuestion: name,
      };
    }
    setQuizTrackState({ ...quizstate });
  };

  const handleBackButton = () => {
    if (quizCurrentPage) {
      const questionValues = quizTrackState?.questionValues;
      const previousQuestionValues = handleRemoveEmptyValues(questionValues);
      handleQuizPagination(quizCurrentPage - 1);
      handleHeaderChange(quizQuestions[quizCurrentPage - 1]);
      setQuizTrackState({
        ...quizTrackState,
        questionValues: { ...previousQuestionValues },
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
        input: { name: "Plix Hair Survey Filled Data" },
        questions: [
          {
            text: "HAir Quiz Track State",
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
              updatedUrl = getUrlWithParams(url, { hair_id: surveyId });
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

  const handleClossButton = () => {
    router.back();
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
    deleteSurvey,
  }: {
    createSurvey: any;
    updateSurvey: any;
    fillSurvey: any;
    questionValues: any;
    value: any;
    formikAction: any;
    aftersubmit: any;
    nextQuestionValues?: any;
    deleteSurvey?: any;
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
      setQuizStateLocal(HAIR_QUIZ_STATE, { ...newQuizTrackState });
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
          .finally(() => { });
      }
    }

    if (deleteQuestions && deleteQuestions.length) {
      deleteSurvey({
        variables: {
          ...surveyInput,
          surveyHash: quizTrackState?.surveyHash,
          questionIds: deleteQuestions,
          // customerIds: [customerId],
        },
      }).finally(res => {
        setDeleteQuestions([]);
      });
    }
    if (
      quizTrackState?.currentPage <= quizCurrentPage &&
      !deleteQuestions?.length
    ) {
      surveyMutation({
        variables: {
          input: { name: "Plix Hair Quiz" },
          ...surveyInput,
          questions: [
            ...(Object.keys(questionValues) || []).map(
              (que: string, index: number) => ({
                text: extractQuestionObjNew(que, quizQuestions)?.questionText,
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

  const handleQuizSubmitEvents = (values: any, url: string) => {
    const clevertap = makeClevertap();

    if (gtmConfig?.plixQuizHair?.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig?.plixQuizHair?.value,
        ecommerce: {
          URL: window?.location?.href,
          name: "Hair Loss Quiz",
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        },
      });
    }
    if (clevertapEvents?.plixHairQuiz?.enable) {
      clevertap.event.push(clevertapEvents.plixHairQuiz.value, {
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
        hair_landing_page_url: url,
      },
    });
  };

  const handleQuizNextEvent = (questions: any, page: string): void => {
    const quizFillDetails = Object.keys(questions)?.reduce((acc, curr) => {
      return {
        ...acc,
        [extractQuestionObjNew(curr, quizQuestions)?.questionText]: questions[
          curr
        ],
      };
    }, {});

    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig?.plixQuizHairNext?.value,
      ecommerce: {
        URL: window?.location?.href,
        name: "Plix Hair Quiz",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        quizDetails: quizFillDetails,
        page,
      },
    });
  };

  const handlePicture = (
    file: any,
    mutation: any,
    formik: any,
    name: string
  ) => {
    const picture = file[0] || null;
    if (picture) {
      setPictureUploading(true);
      mutation({
        variables: {
          file: picture,
        },
      })
        .then(response => {
          const image =
            (response?.data?.createHostingFileNoAuth &&
              response?.data?.createHostingFileNoAuth?.hostingNoAuth
                ?.fileUrl) ||
            "";
          formik.setFieldValue(name, image);
          // setQuizTrackState({
          //   ...quizTrackState,
          //   questionValues: {
          //     ...quizTrackState?.questionValues,
          //     [`${name}`]: image,
          //   },
          // });
          setPictureUploading(false);
        })
        .catch(err => {
          setPictureUploading(false);
        });
    }
  };

  return (
    <div className={style.quizpage_form}>
      <SkinQuizHeaderButton
        handleBackButton={handleBackButton}
        handleCloseButton={handleClossButton}
        hideBackButton={quizCurrentPage === 0}
      />
      <TypedHostingFileNoAuthMutation>
        {hostingFile => {
          return (
            <TypedCreateSurveyMutation>
              {createSurvey => {
                return (
                  <TypedUpdateSurveyMutation>
                    {updateSurvey => {
                      return (
                        <TypedMutationSurveyDelete>
                          {deleteSurvey => {
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
                                        input: {
                                          name: "Plix Hair Quiz User Info",
                                        },
                                        questions: [
                                          {
                                            text: "name",
                                            required: true,
                                            order: 1,
                                          },
                                          {
                                            text: "phone",
                                            required: true,
                                            order: 2,
                                          },
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
                                      const question =
                                        survey?.questions?.edges || "";
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
                                                    Object.keys(userDetails)[
                                                    index
                                                    ]
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
                                    const phone = user?.phone?.replace(
                                      "+91",
                                      ""
                                    );
                                    handlepreQuizSubmit(user?.firstName, phone);
                                    setFirstLoad(true);
                                  }

                                  const validate = (values: any) => {
                                    const errors: any = {};
                                    const updatedValues = {
                                      ...values,
                                      ...quizTrackState?.questionValues,
                                    };

                                    const formikKeys = Object.keys(
                                      updatedValues
                                    );

                                    formikKeys.forEach(key => {
                                      switch (key) {
                                        case "name":
                                          if (!nameRegExp.test(values.name))
                                            errors.name =
                                              "Only alphabets are allowed for name";
                                          break;
                                        case "email":
                                          if (
                                            quizCurrentPage === 2 &&
                                            !emailRegExp.test(values.email)
                                          )
                                            errors.email = "Invalid email";
                                          break;
                                        case "phone":
                                          if (
                                            quizCurrentPage === 1 &&
                                            !phoneRegExp.test(values.phone)
                                          )
                                            errors.phone =
                                              "Invalid phone number";
                                          break;
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
                                            : updateQuestionValuesNew(
                                              quizQuestions[quizCurrentPage],
                                              quizCurrentPage
                                            );
                                        // Handle pixel tracking on each page
                                        if (
                                          quizCurrentPage >=
                                          quizTrackState?.currentPage
                                        ) {
                                          handleQuizNextEvent(
                                            value,
                                            `page-${quizCurrentPage + 1}`
                                          );
                                        }
                                        // Handle pixel tracking on each page

                                        if (
                                          quizCurrentPage <
                                          quizQuestions?.length - 1
                                        ) {
                                          const nextQuestionValues: any = {
                                            ...updateQuestionValuesNew(
                                              quizQuestions[
                                              quizCurrentPage + 1
                                              ],
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
                                          handleHeaderChange(
                                            quizQuestions[quizCurrentPage + 1],
                                            value
                                          );
                                          handleQuizPagination(
                                            quizCurrentPage + 1
                                          );
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
                                            deleteSurvey,
                                          });
                                        } else {
                                          // const customerId = user?.id;
                                          formikAction.setSubmitting(true);
                                          let url = "";
                                          const quizType: string =
                                            value?.question5;

                                          if (quizType === "Female") {
                                            url = `/page/${pages?.QUIZ_HAIR_FEMALE_RESULTS}`;
                                          } else {
                                            url = `/page/${pages?.QUIZ_HAIR_MALE_RESULTS}`;
                                          }
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
                                        const currentQuestion =
                                          quizQuestions[quizCurrentPage];
                                        const isPicture =
                                          currentQuestion?.questionType ===
                                          "picture";
                                        const name: string = `question${quizCurrentPage + 1
                                          }`;
                                        const isSubmitButton =
                                          Number(currentQuestion?.progressBar) >
                                          95;
                                        const value: any =
                                          formik.values[name] || "";
                                        const pictureStep = value
                                          ? "step2"
                                          : "step1";
                                        const currentQuestionData =quizQuestions[quizCurrentPage];
                                        const isLastQuestion = quizCurrentPage === quizQuestions?.length - 1 && isSubmitButton
                                        return (
                                          <Form>
                                            {quizQuestions &&
                                              !isPicture &&
                                              Array.isArray(quizQuestions) &&
                                              quizQuestions?.length ? (
                                              <QuizInputs
                                                data={[
                                                  quizQuestions[
                                                  quizCurrentPage
                                                  ],
                                                ]}
                                                setQuizTrackState={
                                                  setQuizTrackState
                                                }
                                                formik={formik}
                                                quizTrackState={quizTrackState}
                                                quizCurrentPage={
                                                  quizCurrentPage
                                                }
                                                handleQuizQuestions={
                                                  handleQuizQuestions
                                                }
                                                handlePreQuizState={
                                                  handlePreQuizState
                                                }
                                                isLastQuestion={isLastQuestion}
                                              />
                                            ) : (
                                              <></>
                                            )}
                                            {isPicture ? (
                                              <>
                                                <FormControl
                                                  className={
                                                    style.quizpage_form_input
                                                  }
                                                  variant="outlined"
                                                >
                                                  <label
                                                    className={`${style.label} ${style.picture_label}`}
                                                    htmlFor="phone"
                                                  >
                                                    {pictureSection[pictureStep]
                                                      ?.heading || ""}
                                                  </label>
                                                  <div
                                                    className={`
                                                    ${style.picture_container
                                                      } ${value
                                                        ? style.picture_container_new
                                                        : ""
                                                      }
                                                  `}
                                                  >
                                                    {pictureStep === "step1" ? (
                                                      <>
                                                        <p>
                                                          {
                                                            pictureSection[
                                                              pictureStep
                                                            ]?.text
                                                          }
                                                        </p>
                                                        <div
                                                          className={
                                                            style.picture_container_image
                                                          }
                                                        >
                                                          <CachedImage
                                                            url={
                                                              pictureSection[
                                                                pictureStep
                                                              ]?.image
                                                            }
                                                            isNextImage
                                                            nextImageLayout="fill"
                                                          />
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <div
                                                        className={
                                                          style.picture_container_bg
                                                        }
                                                      >
                                                        <CachedImage
                                                          url={value}
                                                          isNextImage
                                                          nextImageLayout="fill"
                                                          blurDataURL={value}
                                                          placeholder="blur"
                                                        />
                                                      </div>
                                                    )}
                                                  </div>
                                                </FormControl>
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            {isPicture ? (
                                              <InputPicture
                                                handleChange={file => {
                                                  handlePicture(
                                                    file,
                                                    hostingFile,
                                                    formik,
                                                    name
                                                  );
                                                }}
                                                placeholder={
                                                  pictureUploading
                                                    ? "UPLOADING...."
                                                    : pictureStep === "step1"
                                                      ? "UPLOAD IMAGE"
                                                      : "REUPLOAD"
                                                }
                                                className={`
                                                ${style.quizpage_form_submitButton} ${style.picture_button}
                                              `}
                                              />
                                            ) : (
                                              <></>
                                            )}
                                            {
                                              isPicture && !value ? (
                                                <></>
                                              ):(
                                                showNextButton.indexOf(
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
                                              )
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
                        </TypedMutationSurveyDelete>
                      );
                    }}
                  </TypedUpdateSurveyMutation>
                );
              }}
            </TypedCreateSurveyMutation>
          );
        }}
      </TypedHostingFileNoAuthMutation>
    </div>
  );
};

export default memo(HairQuizForm);
