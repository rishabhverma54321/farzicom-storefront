import React from "react";
import { useRouter } from "next/router";
import { QuizHeader } from "@components/molecules";
import { pages } from "gqlTypes/customGlobalTypes";
import SkinQuizResults from "./SkinQuizResults";
import SkinQuiz from "./SkinQuiz";

export interface IPlixSkinQuizProps {
  content?: {
    metadata?: Array<any>;
  };
}

export const PlixSkinQuiz: React.FC<IPlixSkinQuizProps> = ({ content }) => {
  const metadata = content?.metadata || [];
  const router = useRouter();
  const quizResultPage = router?.query?.slug === pages.QUIZSKINRESULTS;

  if (quizResultPage) {
    return <SkinQuizResults metadata={metadata}/>
  }
  return (
    <>
      <QuizHeader />
      <SkinQuiz metadata={metadata} />
    </>
  );
};
PlixSkinQuiz.displayName = "PlixSkinQuiz";
export default PlixSkinQuiz;
