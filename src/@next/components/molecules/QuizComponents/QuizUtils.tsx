import makeClevertap from "Themes/lib/makeClevertap.js";
import { getMetadataValue, parseJson, SKIN_QUIZ_STATE } from "@utils/misc";
import { IQuestion, ISkinQuestion } from "./QuizComponents";
import { Base64 } from "js-base64";

export interface IQuizQuestions {
  questions: IQuestion[]; // make this array
}

export interface ISkinQuizQuestions {
  questions: ISkinQuestion[];
}

export const extractQuestionObj = (
  que: string,
  quizQuestions: IQuizQuestions[] | ISkinQuizQuestions[]
) => {
  const IndexOfQuestion: any[] = que.replace("question", "").split("");
  if (IndexOfQuestion.length === 2) {
    return (
      quizQuestions[IndexOfQuestion[0] - 1]?.questions[
      IndexOfQuestion[1] - 1
      ] || { questionText: que }
    );
  }
  return { questionText: que };
};

export const extractQuestionObjWeightLoss = (
  que: string,
  quizQuestions: IQuestion[]
) => {
  const IndexOfQuestion: any = parseInt(que.replace("question", ""), 10);
  return (
    quizQuestions[IndexOfQuestion - 1] || { questionText: que }
  );
}
export const extractQuestionObjNew = (que: string, quizQuestions: any) => {
  if (que?.includes("question")) {
    const IndexOfQuestion: number = Number(que.replace("question", ""));
    return { questionText: quizQuestions[IndexOfQuestion - 1]?.questionText };
  }
  return { questionText: que };
};

export const handleQuestionEvents = (ques: string, ans: string) => {
  const clevertap = makeClevertap();
  if (ques === "Gender") {
    clevertap.profile.push({
      Site: {
        [ques]: ans.toLowerCase() === "female" ? "F" : "M",
      },
    });
  } else {
    clevertap.profile.push({
      Site: {
        [ques]: ans,
      },
    });
  }
};

export const updateQuestionValues = (
  questionOnQuizPage: any,
  currentPage: number
) => {
  const updatedQuestion = {
    ...(questionOnQuizPage?.questions &&
      Array.isArray(questionOnQuizPage?.questions) &&
      questionOnQuizPage?.questions?.reduce(
        (acc: any, que: any, index: number) => {
          if (que?.enable) {
            if (que?.questionType == "select_height") {
              acc[
                `question${currentPage + 1}${index + 1}`
              ] = `${que?.range1?.default},${que?.range2?.default}`;
              return acc;
            } else if (que?.questionType == "select_weight") {
              acc[
                `question${currentPage + 1}${index + 1}`
              ] = `${que?.range1?.default}`;
              return acc;
            }
            acc[`question${currentPage + 1}${index + 1}`] = "";
          }
          return acc;
        },
        {}
      )),
  };
  if (!!Object.keys(updatedQuestion).length) {
    return updatedQuestion;
  }
  return {};
};

export const updateQuestionValuesNew = (
  questionOnQuizPage: any,
  currentPage: number
) => {
  const updatedQuestion: any = {};
  if (questionOnQuizPage) {
    if (questionOnQuizPage?.enable && questionOnQuizPage?.questionType) {
      if (
        ["name", "phone", "email"].indexOf(questionOnQuizPage.questionType) !==
        -1
      ) {
        updatedQuestion[`${questionOnQuizPage?.questionType}`] = "";
        return updatedQuestion;
      }
      if (questionOnQuizPage?.questionType === "select_height") {
        updatedQuestion[
          `question${currentPage + 1}`
        ] = `${questionOnQuizPage?.range1?.default},${questionOnQuizPage?.range2?.default}`;
      } else if (questionOnQuizPage?.questionType === "select_weight") {
        updatedQuestion[
          `question${currentPage + 1}`
        ] = `${questionOnQuizPage?.range1?.default}`;
      } else {
        updatedQuestion[`question${currentPage + 1}`] = "";
      }
    }
  }
  if (Object.keys(updatedQuestion).length > 0) {
    return updatedQuestion;
  }
  return {};
};

export const updateQuestionValuesWeightLoss = (
  questionOnQuizPage: any,
  currentPage: number
) => {
  const updatedQuestion: any = {};
  if (questionOnQuizPage) {
    if (questionOnQuizPage?.enable && (questionOnQuizPage?.questionType && ["name", "phone", "email"].indexOf(questionOnQuizPage.questionType) === -1)) {
      if (questionOnQuizPage?.questionType === "select_height") {
        updatedQuestion[`question${currentPage + 1}`] = `${questionOnQuizPage?.range1?.default},${questionOnQuizPage?.range2?.default}`;
      } else if (questionOnQuizPage?.questionType === "select_weight") {
        updatedQuestion[`question${currentPage + 1}`] = `${questionOnQuizPage?.range1?.default}`;
      } else {
        updatedQuestion[`question${currentPage + 1}`] = "";
      }
    }
  }
  if (Object.keys(updatedQuestion).length > 0) {
    return updatedQuestion;
  }
  return {};
};

export const setQuizStateLocal = (quiz:string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(quiz, JSON.stringify(data));
  }
};

export const clearQuizStateLocal = (quiz: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(quiz);
  }
};

export const getQuizStateLocal =
  typeof window !== "undefined"
    ? parseJson(localStorage.getItem(SKIN_QUIZ_STATE))
    : null;

export const handleRemoveEmptyValues = (Obj: { [key: string]: any }) => {
  return Object.keys(Obj)?.reduce((acc: any, curr: string) => {
    if (!!Obj[curr]) {
      return {
        ...acc,
        [curr]: Obj[curr],
      };
    }
    return acc;
  }, {});
};

export const getNutritionistData = (
  products: Array<any>,
  productIds: Array<string>
) => {
  const productCategory: any = [];

  const decodedIds = productIds.map((id: string) => Base64.decode(id));
 
  products.sort((a: any, b: any) => {
    const idA = Base64.decode(a?.node?.id);
    const idB = Base64.decode(b?.node?.id);
    const indexA = decodedIds.indexOf(idA);
    const indexB = decodedIds.indexOf(idB);
    return indexA - indexB;
  });

  if (Array.isArray(products) && products.length) {
    products.forEach(product => {
      const metadata = product?.node?.metadata || [];
      const productConfig =
        metadata &&
        getMetadataValue(metadata, "product_config") &&
        parseJson(getMetadataValue(metadata, "product_config"));
        if (productConfig && productConfig?.quiz_nutritionist_data) {
          productCategory.push(productConfig?.quiz_nutritionist_data);
        }
    });
  }
  return productCategory;
};

export const removeKeysAfter = (obj: any, keyToRemoveAfter: any) => {
  const keys = Object.keys(obj);
  const indexToRemoveAfter = keys.indexOf(keyToRemoveAfter);
  let newObj: any = {};
  let removedMetaData: Array<string> = [];

  if (indexToRemoveAfter !== -1) {
    removedMetaData = [...keys.slice(indexToRemoveAfter, keys.length)];
    const keysToKeep = keys.slice(0, indexToRemoveAfter);
    keysToKeep.forEach(key => {
      newObj[key] = obj[key];
    });
  } else {
    newObj = { ...obj };
    removedMetaData = null;
  }
  return [newObj, removedMetaData];
};

export const HairMalePrimaryQuestion =
  "Which stage of hair loss are you currently facing?";
export const HairFemalePrimaryQuestion = "What is your primary hair concern?";

export const findSkinQuizMonth = (recommendation: any) => {
  let month: string = "1 month";

  switch (recommendation) {
    case "Moderate":
      month = "2 months";
      break;
    case "Extreme":
      month = "3 months";
      break;

    default:
      month = "1 month";
  }

  return month;
};


export const freebiesSort = (a: any, b: any) => {
  const priceA = a?.node?.defaultVariant?.pricing?.price?.gross?.amount || 0;
  const priceB = b?.node?.defaultVariant?.pricing?.price?.gross?.amount || 0;

  if (priceA === priceB) return 0;
  else if (priceA === 0) return 1;
  else if (priceB === 0) return -1;
  else return 0;
}
export function extractNumbersFromString(str: string): number[] {
  const numberPattern = /\d+/g;
  const numbersArray = str.match(numberPattern);
  return numbersArray ? numbersArray.map(Number) : [];
}

export function checkEnabledQuestions(questions: any) {
  // checking if questions are enabled or not from admin
  const filteredQuestions = questions?.filter(question => question?.enable);
  return filteredQuestions;
}