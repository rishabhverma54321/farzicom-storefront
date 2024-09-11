import { QuizHeader } from "@components/molecules";
import React from "react";
import HairQuiz from "./HairQuiz";
import { useRouter } from "next/router";
import { pages } from "gqlTypes/customGlobalTypes";
import HairQuizResults from "./HairQuizResults";

export interface IPlixHairQuizProps {
  content: {
    metadata: Array<any>;
  };
}

export const PlixHairQuiz: React.FC<IPlixHairQuizProps> = ({ content }) => {
  const metadata = content?.metadata || [];
  const router = useRouter();
  const quizMaleResultPage =
    router?.query?.slug === pages.QUIZ_HAIR_MALE_RESULTS;
  const quizFemaleResultPage =
    router?.query?.slug === pages.QUIZ_HAIR_FEMALE_RESULTS;
  if (quizMaleResultPage || quizFemaleResultPage) {
    return <HairQuizResults metadata={metadata} />;
  }
  return (
    <>
      <QuizHeader />
      <HairQuiz metadata={metadata} />
    </>
  );
};
PlixHairQuiz.displayName = "PlixHairQuiz";
export default PlixHairQuiz;
