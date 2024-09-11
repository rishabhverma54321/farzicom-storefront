import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DoctorConsultationSection,
  getQuizStateLocal,
  IDoctorConsultation,
  IQuizConcern,
  QuizReviewContainer,
  TransformationPlan,
  NutritionistSection,
  getNutritionistData,
  TrustedSection,
  ITrustedSection,
  clearQuizStateLocal,
} from "@components/molecules";
import {
  getMetadataValue,
  HAIR_QUIZ_STATE,
  parseJson,
  SKIN_QUIZ_STATE,
} from "@utils/misc";
import style from "./scss/index.module.scss";
import { pages } from "gqlTypes/customGlobalTypes";
import { client } from "@temp/client";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import { IRecommendationSectionProps } from "./types/interface";
import { Gap } from "@components/atoms/Gap";
import { productListQuiz } from "./queires";
import QuizProductCard from "@components/molecules/QuizComponents/components/QuizProductCard";
import RecommendationSection from "../PlixSkinQuiz/components/RecommendationSection";
import HairQuizResultsConcern from "./components/HairQuizResultsConcern";
import QuizRootCause from "./components/QuizRootCause";
import { SurveyDetails } from "../PlixSkinQuiz/queries";

const HairLoadingState = ({
  isloading,
  children,
}: {
  isloading: boolean;
  children: React.ReactNode;
}) => {
  return <>{isloading ? <HairQuizResults.Skeleton /> : <>{children}</>}</>;
};

const HairQuizResults = ({ metadata }: { metadata: Array<any> }) => {
  const router = useRouter();
  const [productIds, setProductIds] = useState([]);
  const [quizResultLoading, setQuizResultLoading] = useState(false);
  const CUSTOMVARIANTMETADATA = ["listPrice", "variant_config"];
  const HAIRQUIZ = `/page/${pages.QUIZHAIR}`;
  const quizDataFromLocal =
    typeof window !== "undefined"
      ? parseJson(localStorage.getItem(HAIR_QUIZ_STATE))
      : null;
  const [loading, setLoading] = useState(false);
  const [quizDetails, setQuizDetails] = useState(quizDataFromLocal);
  const [productDetails, setProductDetails] = useState<{
    products: Array<any>;
    reviewData: any;
  }>({
    products: [],
    reviewData: {},
  });

  const primaryQuestion: string = quizDetails?.primaryQuestion || null;
  const QuestionValue: string = primaryQuestion
    ? quizDetails?.questionValues[primaryQuestion]
    : "";

  const quizReviews: any =
    metadata &&
    getMetadataValue(metadata, "quiz_config") &&
    parseJson(getMetadataValue(metadata, "quiz_config"));

  const reviewProductId = quizReviews[QuestionValue]?.productId || "";

  const productId = reviewProductId || "";

  const productName = "";

  useEffect(() => {
    if (typeof window !== "undefined" && router.isReady) {
      const quizToken: string = (router.query.hair_id as string) ?? "";
      if (quizToken) {
        getQuizState(quizToken);
      } else {
        secureQuiz(quizDetails);
      }
    }
  }, [router.isReady]);

  const secureQuiz = quizDetails => {
    if (!quizDetails) {
      router.push(HAIRQUIZ);
    } else {
      const QuizType = quizDetails.questionValues?.question5;
      if (
        QuizType === "Female" &&
        router?.query?.slug !== pages.QUIZ_HAIR_FEMALE_RESULTS
      ) {
        router.push(`/page/${pages.QUIZ_HAIR_FEMALE_RESULTS}`);
      } else if (
        QuizType === "Male" &&
        router?.query?.slug !== pages.QUIZ_HAIR_MALE_RESULTS
      ) {
        router.push(`/page/${pages.QUIZ_HAIR_MALE_RESULTS}`);
      } else {
        getProductsDetails(quizDetails);
      }
    }
  };

  const getQuizState = async (token: string) => {
    setQuizResultLoading(true);
    try {
      const { data, errors } = await client.query<any, any>({
        query: SurveyDetails,
        variables: {
          id: token,
        },
        fetchPolicy: "no-cache",
      });
      if (data) {
        const survey = data?.survey;
        const question = survey.questions?.edges;
        const answers = Array.isArray(question)
          ? question[0]?.node?.answers?.edges
          : null;
        const state =
          answers && Array.isArray(answers) ? answers[0]?.node?.answer : null;
        if (state) {
          const quizJson = state.replace(/\\\"/g, '"');
          const quizData = parseJson(quizJson);
          setQuizDetails(quizData);
          getProductsDetails(quizData);
        } else {
          secureQuiz(quizDetails);
        }
      } else {
        secureQuiz(quizDetails);
      }
    } catch (err) {
      secureQuiz(quizDetails);
    } finally {
      setQuizResultLoading(false);
    }
  };

  const getProductsDetails = async (quizDetails: any) => {
    const ids: any = Object.values(quizDetails?.productCollection)?.flatMap(
      (collection: any) => collection?.productId
    );

    if (ids.length) {
      try {
        setLoading(true);
        const { data, errors } = await client.query({
          query: productListQuiz,
          variables: {
            first: 15,
            ids,
            productId: reviewProductId,
            metaFields: CUSTOMVARIANTMETADATA,
          },
          fetchPolicy: "network-only",
        });
        if (data) {
          setProductIds(ids);
          setProductDetails({
            ...productDetails,
            products: data?.products?.edges,
            reviewData: data?.productReviews,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetQuiz = () => {
    clearQuizStateLocal(HAIR_QUIZ_STATE);
    router.push(`/page/${pages?.QUIZHAIR}`);
  };

  const doctorConsultation: IDoctorConsultation =
    metadata &&
    getMetadataValue(metadata, "doctor_consultation") &&
    parseJson(getMetadataValue(metadata, "doctor_consultation"));

  const quizConcernSection: IQuizConcern =
    metadata &&
    getMetadataValue(metadata, "concern_section") &&
    parseJson(getMetadataValue(metadata, "concern_section"));

  const nutritionistSection =
    metadata &&
    getMetadataValue(metadata, "nutritionist_section") &&
    parseJson(getMetadataValue(metadata, "nutritionist_section"));

  const trustedSectionData: ITrustedSection =
    metadata &&
    getMetadataValue(metadata, "trusted_section") &&
    parseJson(getMetadataValue(metadata, "trusted_section"));

  const recommendationSection: IRecommendationSectionProps =
    metadata &&
    getMetadataValue(metadata, "recommendation_section") &&
    parseJson(getMetadataValue(metadata, "recommendation_section"));

  const transformationData =
    metadata &&
    getMetadataValue(metadata, "transformation_section") &&
    parseJson(getMetadataValue(metadata, "transformation_section"));

  const nutritionistProductData =
    (productDetails?.products?.length &&
      getNutritionistData(productDetails?.products, productIds)) ||
    [];

  const nutritionistData = {
    ...nutritionistSection,
    productCategory: [...nutritionistProductData],
  };

  const month =
    recommendationSection?.button_text[QuestionValue] ||
    "3 months for visible results.";

  return (
    <div className={`${style.quizpage_results} quizskinResults`}>
      <div
        className={`${style.quizpage_padding} ${style.quizpage_hairconcern}`}
      >
        <HairLoadingState isloading={quizResultLoading}>
          <HairQuizResultsConcern
            quizConcernSection={quizConcernSection}
            quizDetails={quizDetails}
            quizPrimarySection={quizReviews[QuestionValue]}
          />
        </HairLoadingState>
      </div>
      <div className={style.quizpage_padding}>
        <QuizRootCause quizDetails={quizDetails} />
        <DoctorConsultationSection data={doctorConsultation} />
      </div>
      <RecommendationSection
        month={month}
        data={recommendationSection}
        quizDetails={quizDetails}
      />
      <div className={style.quizpage_padding}>
        <TrustedSection data={trustedSectionData} quizDetails={quizDetails} />
      </div>
      <HairLoadingState isloading={loading}>
        <QuizProductCard
          productIds={productIds}
          productDetails={productDetails}
          className="hair"
          heading="1 Month Haircare Regimen"
        />
      </HairLoadingState>
      <div className={style.quizpage_padding}>
        <HairLoadingState isloading={loading}>
          <NutritionistSection
            nutritionistData={nutritionistData}
            carouselProps={{
              slidesOnMobile: 2,
              slidesOnTab: 2,
              slidesOnDesktop: 3,
              slidesToScroll: 1,
            }}
            hideCaution={true}
            className="nutritionistsectionSkin"
          />
        </HairLoadingState>
        {transformationData && transformationData?.enable ? (
          <Gap size="1.8rem" />
        ) : (
          <></>
        )}
        <TransformationPlan metadata={metadata} className="" />
        <HairLoadingState isloading={loading}>
          <QuizReviewContainer
            reviewData={productDetails?.reviewData?.edges}
            productId={productId}
            productName={productName}
          />
        </HairLoadingState>
        <div
          onClick={handleResetQuiz}
          className={`${style.quizpage_retake} ${style.quizpage_width}`}
        >
          Retake Quiz
        </div>
      </div>
    </div>
  );
};

HairQuizResults.Skeleton = function HairQuizResults(
  containerSkeletonProps?: any
) {
  return (
    <div className="container">
      <ContainerSkeleton
        render={{
          image: true,
          title: false,
          description: true,
        }}
        headerSkeleton={false}
        cardCount={2}
        {...containerSkeletonProps}
      />
    </div>
  );
};
export default HairQuizResults;
