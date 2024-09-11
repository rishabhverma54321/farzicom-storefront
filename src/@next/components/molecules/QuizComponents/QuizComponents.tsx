import React from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import { Field } from "formik";
import ProductVariantSlider from "@components/organisms/ProductVariantPicker/components/ProductVariantSlider";
import style from "./scss/index.module.scss";

export interface IQuizComponentsProps {}

export interface IQuestion {
  enable: boolean;
  cards: {
    image: string;
    text: string;
  }[];
  options: string[];
  questionText: string;
  questionType: string;
  range1: {
    enable: boolean;
    start: string;
    end: string;
    default: string;
  };
  range2: {
    enable: boolean;
    start: string;
    end: string;
    default: string;
  };
  quizHeader: number;
}
[];

interface ISkinOption {
  text: string;
  productId: string[];
  questionKey: string;
  question_image: string;
}

export interface ISkinQuestion {
  enable: boolean;
  cards: {
    image: string;
    text: string;
    productId: string;
    heading: string;
  }[];
  options: ISkinOption[];
  questionText: string;
  questionType: string;
  slider: { text: string; productId: string }[];
  caution?: string;
  progressBar?: number;
  quizHeader?: number;
  range1: {
    enable: boolean;
    start: string;
    end: string;
    default: string;
  };
  range2: {
    enable: boolean;
    start: string;
    end: string;
    default: string;
  };
}
[];

export const InputSlider = React.memo(
  ({
    name,
    question,
    formik,
    value,
    handleQuestionEvents,
    className,
    handleSetValue,
  }: {
    name: string;
    question: ISkinQuestion;
    formik: any;
    className?: string;
    value?: number;
    handleSetValue?: (value: number) => void;
    handleQuestionEvents: (
      question: string,
      slider: { text: string; description: string }
    ) => void;
  }) => {
    const options: Array<{
      text: string;
      description: string;
    }> = question?.slider.reduce((acc, curr) => {
      return [
        ...acc,
        {
          text: curr?.text,
          description: "",
        },
      ];
    }, []);
    return (
      <ProductVariantSlider
        options={options}
        handleSetValue={handleSetValue}
        defaultValue={value}
        onVariantChange={value => {
          handleQuestionEvents(question.questionText, value);
          formik.setFieldValue(name, value?.text);
        }}
        className={className}
      />
    );
  }
);

export const InputCardsNew = ({
  name,
  className,
  question,
  formik,
  handleQuestionEvents,
}: {
  name: string;
  question: ISkinQuestion;
  formik: any;
  className?: string;
  handleQuestionEvents: (
    question: string,
    card: { image: string; text: string; productId: string[] }
  ) => void;
}) => {
  const cardData: {
    image: string;
    text: string;
    productId: string;
    heading: string;
  }[] = question?.cards;
  const handleCardClick = (
    card: { image: string; text: string; productId: string[] },
    name: string
  ) => {
    formik.setFieldValue(name, card?.text);
    setTimeout(() => {
      // Ensure the formik state update is completed
    handleQuestionEvents(question?.questionText, card);
    }, 200);
  };
  if (Array.isArray(cardData) && !!cardData?.length) {
    return (
      <div className={`${style.inputcard} ${className}`}>
        {cardData?.map(list => (
          <div
            onClick={() => {
              handleCardClick(list, name);
            }}
            className={`${style.inputcard_card} ${
              formik.values[`${name}`] == list?.text
                ? style.inputcard_card_select
                : ""
            }`}
          >
            {list?.image ? (
              <div className={style.inputcard_card_img}>
                <CachedImage
                  isNextImage
                  url={list?.image}
                  nextImageLayout="fill"
                />
              </div>
            ) : (
              <></>
            )}
            {list?.heading ? (
              <h3 className={style.inputcard_card_heading}>{list?.heading}</h3>
            ) : (
              <></>
            )}
            <p
              className={`${style.inputcard_card_text} ${
                list?.heading ? style.inputcard_card_text_new : ""
              }`}
            >
              {list?.text}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};

export const InputCards = ({
  name,
  className,
  question,
  formik,
  handleQuestionEvents,
}: {
  name: string;
  question: IQuestion;
  formik: any;
  className?: string;
  handleQuestionEvents: (question: string, text: string) => void;
}) => {
  const cardData: { image: string; text: string }[] = question?.cards;
  const handleCardClick = (text: string, name: string) => {
    formik.setFieldValue(name, text);
    setTimeout(() => {
      // Ensure the formik state update is completed
      handleQuestionEvents(question?.questionText, text);
    }, 200);
  };
  if (Array.isArray(cardData) && !!cardData?.length) {
    return (
      <div className={`${style.inputcard} ${className}`}>
        {cardData?.map(list => (
          <div
            className={`${style.inputcard_card} ${
              formik.values[`${name}`] == list?.text
                ? style.inputcard_card_select
                : ""
            }`}
          >
            {list?.image ? (
              <div
                onClick={() => {
                  handleCardClick(list?.text, name);
                }}
                className={style.inputcard_card_img}
              >
                <CachedImage
                  isNextImage
                  url={list?.image}
                  nextImageLayout="fill"
                />
              </div>
            ) : (
              <></>
            )}
            <p className={style.inputcard_card_text}>{list?.text}</p>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};

export const InputRadioNew = ({
  name,
  question,
  formik,
  handleQuestionEvents,
}: {
  name: string;
  question: any;
  formik: any;
  handleQuestionEvents: (question: string, option: ISkinOption) => void;
}) => {
  const inputRefs = React.useRef([]);
  const options: ISkinOption[] = question?.options;

  const handleDivClick = (option: ISkinOption, index: number) => {
    formik.setFieldValue(name, option?.text);
    inputRefs?.current[index]?.click();
    setTimeout(() => {
      // Ensure the formik state update is completed
      handleQuestionEvents(question.questionText, option);
    }, 200);
  };

  return (
    <div className={style.radio_container}>
      {Array.isArray(options) &&
        options &&
        options?.map((option: ISkinOption, index: number) => (
          <div
            key={option?.text}
            className={`${style.radio_tab} ${
              formik?.values[`${name}`] == option?.text
                ? style.radio_tab_selected
                : ""
            }`}
            onClick={() => {
              handleDivClick(option, index);
            }}
          >
            <Field
              className={style.radio}
              id={option?.text}
              name={name}
              as="input"
              type="radio"
              checked={formik?.values[`${name}`] === option?.text}
              onChange={e => {
                formik.handleChange(e);
              }}
              value={option?.text}
              ref={element => {
                inputRefs.current[index] = element;
              }}
            />
            <label
              htmlFor={option?.text}
              className={`${style.radio_label} ${style.radio_label_new}`}
            >
              {option?.text}
            </label>
          </div>
        ))}
    </div>
  );
};

export const InputRadio = ({
  name,
  question,
  formik,
  handleQuestionEvents,
}: {
  name: string;
  question: any;
  formik: any;
  handleQuestionEvents: (question: string, text: string) => void;
}) => {
  const inputRefs = React.useRef([]);
  const options: string[] = question?.options;

  const handleDivClick = (option: string, index: number) => {
    formik.setFieldValue(name, option);
    inputRefs?.current[index]?.click();
    setTimeout(() => {
      // Ensure the formik state update is completed
      handleQuestionEvents(question.questionText, option);
    }, 200);
  };

  return (
    <div className={style.radio_container}>
      {Array.isArray(options) &&
        options &&
        options?.map((option: string, index: number) => (
          <div
            key={option}
            className={`${style.radio_tab} ${
              formik?.values[`${name}`] == option
                ? style.radio_tab_selected
                : ""
            }`}
            onClick={() => {
              handleDivClick(option, index);
            }}
          >
            <Field
              className={style.radio}
              id={option}
              name={name}
              as="input"
              type="radio"
              checked={formik?.values[`${name}`] == option}
              onChange={e => {
                formik.handleChange(e);
              }}
              value={option}
              ref={element => {
                inputRefs.current[index] = element;
              }}
            />
            <label
              htmlFor={option}
              className={`${style.radio_label} ${style.radio_label_new}`}
            >
              {option}
            </label>
          </div>
        ))}
    </div>
  );
};

export const InputMcQ = ({
  name,
  question,
  formik,
  handleQuestionEvents,
}: {
  name: string;
  question: any;
  formik: any;
  handleQuestionEvents: (question: string, option: ISkinOption) => void;
}) => {
  const inputRefs = React.useRef([]);
  const mcq: ISkinOption[] = question?.mcq;
  let mcqValues: Array<string> =
    (formik?.values &&
      formik?.values[name] &&
      formik?.values[name]?.split("|")) ||
    [];

  const findValue = (option: ISkinOption) => {
    const findCurrentText =
      mcqValues?.length &&
      mcqValues.findIndex((text: string) => text === option?.text);
    if (mcqValues[0] && findCurrentText !== -1) {
      mcqValues.splice(findCurrentText, 1);
    } else if (
      (mcqValues[0] && mcqValues[0].toLowerCase() === "none") ||
      option?.text.toLowerCase() === "none"
    ) {
      mcqValues = [option?.text];
    } else {
      mcqValues = [...mcqValues, option?.text];
    }
    const finalvalue = mcqValues.join("|");
    return finalvalue;
  };
  const handleDivClick = (option: ISkinOption, index: number) => () => {
    const finalvalue = findValue(option);
    formik.setFieldValue(name, finalvalue);
    inputRefs?.current[index]?.click();
    handleQuestionEvents(question.questionText, option);
  };

  return (
    <div className={style.radio_container}>
      {Array.isArray(mcq) &&
        mcq &&
        mcq?.map((option: ISkinOption, index: number) => (
          <div
            key={option?.text}
            className={`${style.radio_tab} ${style.checkbox_tab} ${
              mcqValues?.includes(option?.text) ? style.radio_tab_selected : ""
            }`}
            onClick={handleDivClick(option, index)}
          >
            <Field
              className={style.checkbox}
              id={option?.text}
              name={name}
              as="input"
              type="checkbox"
              checked={mcqValues?.includes(option?.text)}
              onChange={(e: any) => {
                formik.handleChange({
                  ...e,
                  target: { ...e.target, value: findValue(option) },
                });
              }}
              ref={element => {
                inputRefs.current[index] = element;
              }}
              value={option?.text}
            />
            <label
              style={{ pointerEvents: "none" }}
              htmlFor={option?.text}
              className={style.radio_label}
            >
              {option?.text}
            </label>
          </div>
        ))}
    </div>
  );
};

export const InputPicture = ({ ...props }) => {
  return (
    <>
      <input
        style={{ display: "none" }}
        id="files"
        type="file"
        accept="image/png,image/jpeg"
        onChange={e => {
          props.handleChange(e.target.files);
        }}
      />
      <label style={{ textAlign: "center" }} {...props} htmlFor="files">
        {props?.placeholder || "UPLOAD IMAGE"}
      </label>
    </>
  );
};

export const InputSelect = ({
  name,
  start,
  end,
  label,
  value,
  question,
  handleChangeSelectInput,
  extraQuote,
  isWeightQuiz = false,
}: {
  start: string;
  end: string;
  extraQuote: string;
  label: string;
  question: IQuestion;
  handleChangeSelectInput?: any;
  name: string;
  value: string;
  isWeightQuiz: boolean;
}) => {
  const listArray = Array.from(
    { length: parseInt(end) - parseInt(start) + 1 },
    (_, index) => parseInt(start) + index
  );
  const defaultOption = value ? Number(value) : 0;
  return (
    <div
      className={`${
        isWeightQuiz
          ? style.inputSelect_weightContainer
          : style.inputSelect_container
      }`}
    >
      <select
        onChange={e => {
          handleChangeSelectInput(e, name, label, question?.questionText);
        }}
        className={style.select}
        value={defaultOption}
      >
        {listArray?.map(item => (
          <option value={item}>
            {item}
            {extraQuote}
          </option>
        ))}
      </select>
      <label htmlFor={label} className={style.label}>
        {label}
      </label>
    </div>
  );
};

export const QuizCardHeader = ({
  headerData,
  selectedHeader,
}: {
  headerData: any;
  selectedHeader: number;
}) => {
  if (Array.isArray(headerData?.steps) && headerData?.steps?.length) {
    return (
      <div className={style.quizpage_headerCard}>
        {headerData?.steps?.map((item, index) => (
          <div
            className={`${style.quizpage_headerCard_button} ${
              selectedHeader === index
                ? style.quizpage_headerCard_button_selected
                : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};

export const QuizComponents: React.FC<IQuizComponentsProps> = () => {
  return <></>;
};
QuizComponents.displayName = "QuizComponents";
export default QuizComponents;
