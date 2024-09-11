import { useRouter } from "next/router";
import React from "react";
import { pages } from "gqlTypes/customGlobalTypes";
import WeightLossLandingPage from "./WeightLossLandingPage";
import SkinQuizLandingPage from "./SkinQuizLandingPage";
import HairQuizLandingPages from "./HairQuizLandingPages";

export interface IPlixQuizWeightLoss {
  content?: {
    metadata?: Array<any>;
  };
}

export const PlixQuizWeightLoss: React.FC<IPlixQuizWeightLoss> = ({
  content,
}) => {
  const route = useRouter();

  const maleHairConfig: {
    primaryColor: string;
    secondaryColor: string;
    quiz: string;
  } = {
    primaryColor: "#003E9F",
    secondaryColor: "#C3F3FF",
    quiz: "male",
  };

  const femaleHairConfig: {
    headingColor?: string;
    primaryColor: string;
    secondaryColor: string;
    quiz: string;
  } = {
    headingColor: "#A80097",
    primaryColor: "#036242",
    secondaryColor: "#D9FFF2",
    quiz: "female",
  };

  function render() {
    const slug = route?.query?.slug;
    switch (slug) {
      case pages.QUIZ_SKIN_LANDING_PAGE:
        return <SkinQuizLandingPage content={content} isSkin />;
      case pages.QUIZ_HAIR_FEMALE_LANDING_PAGE:
        return (
          <HairQuizLandingPages
            content={content}
            pageConfig={femaleHairConfig}
            isSkin
          />
        );
      case pages.QUIZ_HAIR_MALE_LANDING_PAGE:
        return (
          <HairQuizLandingPages
            content={content}
            pageConfig={maleHairConfig}
            isSkin
          />
        );

      default:
        return <WeightLossLandingPage content={content} />;
    }
  }

  return <>{render()}</>;
};

PlixQuizWeightLoss.displayName = "PlixQuizWeightLoss";
export default PlixQuizWeightLoss;
