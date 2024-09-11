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
  findSkinQuizMonth,
} from "@components/molecules";
import { getMetadataValue, parseJson, SKIN_QUIZ_STATE } from "@utils/misc";
import style from "./scss/index.module.scss";
import SkinQuizResultsConcern from "./components/SkinQuizResultsConcern";
import { pages } from "gqlTypes/customGlobalTypes";
import { client, clientSSR } from "@temp/client";
import { productListQuiz, SurveyDetails } from "./queries";
import SkinProductCard from "./components/SkinProductCard";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import { IRecommendationSectionProps } from "./types/interface";
import RecommendationSection from "./components/RecommendationSection";
import { Gap } from "@components/atoms/Gap";

const SkinLoadingState = ({
  isloading,
  children,

}: {
  isloading: boolean;
  children: React.ReactNode;
}) => {
  return <>{isloading ? <SkinQuizResults.Skeleton /> : <>{children}</>}</>;
};

const SkinQuizResults = ({ metadata }: { metadata: Array<any> }) => {
  const router = useRouter();
  const CUSTOMVARIANTMETADATA = ["listPrice", "variant_config"];
  const SKINQUIZ = `/page/${pages.QUIZSKIN}`;
  const quizData =
    typeof window !== "undefined"
      ? parseJson(localStorage.getItem(SKIN_QUIZ_STATE))
      : null;
  const [quizDetails, setQuizDetails] = useState(quizData || null);
  const [loading, setLoading] = useState(false);
  const [quizResultLoading, setQuizResultLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<{
    products: Array<any>;
    reviewData: any;
  }>({
    products: [],
    reviewData: {},
  });
  const [productIds, setProductIds] = useState([]);

  const productId =
    (productDetails?.products?.length &&
      productDetails?.products[0] &&
      productDetails?.products[0]?.node?.id) ||
    "";

  const productName =
    (productDetails?.products?.length &&
      productDetails?.products[0] &&
      productDetails?.products[0]?.node?.name) ||
    "";

  useEffect(() => {
    if (typeof window !== "undefined" && router.isReady) {
      const quizToken: string = (router.query.skin_id as string) ?? "";
      if (quizToken) {
        getQuizState(quizToken);
      } else {
        secureQuiz(quizDetails);
      }
    }
  }, [router.isReady]);

  const secureQuiz = quizDetails => {
    if (!quizDetails) {
      router.push(SKINQUIZ);
    } else {
      getProductsDetails(quizDetails);
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
          const quizData = JSON.parse(quizJson);
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

  const getProductsDetails = async quizDetails => {
    // const primaryQuestion = quizDetails?.primaryQuestion || null;
    // const ProductId = primaryQuestion
    //   ? quizDetails?.productCollection[`${primaryQuestion}`]?.productId &&
    //     quizDetails?.productCollection[`${primaryQuestion}`]?.productId[0]
    //   : null;
    const ids: any = Object.values(quizDetails?.productCollection)?.flatMap(
      (collection: any) => collection?.productId
    );
    if (ids.length > 1) {
      try {
        setLoading(true);
        const { data, errors } = await client.query({
          query: productListQuiz,
          variables: {
            first: 15,
            ids,
            productId: ids[0],
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
    clearQuizStateLocal(SKIN_QUIZ_STATE);
    router.push(`/page/${pages?.QUIZSKIN}`);
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

  const isIncludePrimaryProduct: boolean =
    metadata &&
    getMetadataValue(metadata, "is_include_primary_product") &&
    parseJson(getMetadataValue(metadata, "is_include_primary_product"));

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

  const recommendation = quizDetails?.questionValues?.question32 || "";
  const month = `${findSkinQuizMonth(recommendation)} for visible results`;

  return (
    <div className={`${style.quizpage_results} quizskinResults`}>
      <div className={style.quizpage_padding}>
        <SkinLoadingState isloading={quizResultLoading}>
          <SkinQuizResultsConcern
            quizConcernSection={quizConcernSection}
            quizDetails={quizDetails}
          />
        </SkinLoadingState>
        <DoctorConsultationSection data={doctorConsultation} />
      </div>
      <RecommendationSection
        data={recommendationSection}
        quizDetails={quizDetails}
        month={month}
      />
      <div className={style.quizpage_padding}>
        <TrustedSection data={trustedSectionData} quizDetails={quizDetails} />
      </div>
      <SkinLoadingState isloading={loading}>
        <SkinProductCard
          productDetails={productDetails}
          productIds={productIds}
        />
      </SkinLoadingState>
      <div className={style.quizpage_padding}>
        <SkinLoadingState isloading={loading}>
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
        </SkinLoadingState>
        {transformationData && transformationData?.enable ? (
          <Gap size="1.8rem" />
        ) : (
          <></>
        )}
        <TransformationPlan metadata={metadata} className="" />
        <SkinLoadingState isloading={loading}>
          <QuizReviewContainer
            reviewData={productDetails?.reviewData?.edges}
            productId={productId}
            productName={productName}
          />
        </SkinLoadingState>
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

SkinQuizResults.Skeleton = function SkinQuizSkeleton(
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

export default SkinQuizResults;
