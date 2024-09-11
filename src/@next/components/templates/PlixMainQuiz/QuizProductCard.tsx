import React, { useEffect, useState } from "react";
import style from "./scss/index.module.scss";
import { TypedProductDetailQuery } from "./queries";
import { getMetadataValue, parseJson } from "@utils/misc";
import { useRouter } from "next/router";
import ReviewContainer from "@components/organisms/ReviewContainer";
import QuizProductCardV1 from "./components/QuizProductCardV1";
import QuizProductCardV2 from "./components/QuizProductCardv2";
import {
  NutritionistSection,
  QuizFreeTrial,
  TransformationPlan,
  QuizReviewContainer,
} from "@components/molecules";

const QuizProductCard = ({ metadata }: { metadata: Array<any> }) => {
  const router = useRouter();
  const quizAnalysis: string = (router?.query?.quiz as string) || "";
  const quiz = router?.query?.quiz || "";
  const quizcomboConfig =
    metadata &&
    getMetadataValue(metadata, "quiz_combo_config_new") &&
    parseJson(getMetadataValue(metadata, "quiz_combo_config_new"));

  const productLinkedToQuestion =
    metadata &&
    getMetadataValue(metadata, "product_linked_to_question_config") &&
    parseJson(getMetadataValue(metadata, "product_linked_to_question_config"));

  const freeTrialData =
    metadata &&
    getMetadataValue(metadata, "free_trial_section") &&
    parseJson(getMetadataValue(metadata, "free_trial_section"));

  const route = useRouter();

  const quizVariation = sessionStorage.getItem("quiz_version")
    ? parseJson(sessionStorage.getItem("quiz_version"))?.version
    : quizcomboConfig?.quiz_version;

  const nutritionistMetadata =
    metadata &&
    getMetadataValue(metadata, "nutritionist_section") &&
    parseJson(getMetadataValue(metadata, "nutritionist_section"));

  const nutritionistDataProduct =
    nutritionistMetadata && nutritionistMetadata[`${quiz}`];

  const nenutritionistData = {
    ...nutritionistMetadata,
    productCategory: nutritionistDataProduct,
  };

  const CUSTOMVARIANTMETADATA = ["listPrice", "variant_config"];
  const isUserTired = route?.query?.isUserTired === "Yes" ? true : false;

  const productId =
    typeof quizcomboConfig?.pack === "object" &&
    quizcomboConfig?.pack &&
    quizcomboConfig?.pack[`${quizAnalysis}`];

  const productLinkedVariantId =
    typeof productLinkedToQuestion?.pack === "object" &&
    productLinkedToQuestion?.pack &&
    productLinkedToQuestion?.pack[`${quizAnalysis}`];

  if (!!productId) {
    return (
      <div className="quizProductCard">
        <TypedProductDetailQuery
          variables={{
            id: productId,
            metaFields: CUSTOMVARIANTMETADATA,
          }}
          fetchPolicy="no-cache"
        >
          {({ data, loading, refetch }) => {
            // check if products are enable show in product listings from dashboard
            if (data && !loading && !!data?.product) {
              const variantsData = isUserTired
                ? data?.product?.variants?.filter(
                  (variant: any) => variant?.id === productLinkedVariantId
                )
                : data?.product?.variants;
              const collectionProducts =
                data?.product?.collections[0]?.products?.edges || [];

              const reviewData = data?.productReviews?.edges;
              return (
                <>
                  <div
                    className={`quizProduct ${
                      quizVariation === "v2"
                        ? style.quizProductv2
                        : style.quizProductv1
                    } ${style.quizProduct} ${style.quizpage_width}`}
                  >
                    {variantsData
                      ?.slice(0, 1)
                      ?.map((variant: any, index: number) => (
                        <>
                          {quizVariation === "v1" ? (
                            <QuizProductCardV1
                              data={data}
                              variant={variant}
                              index={index}
                              collectionProducts={collectionProducts}
                              productLinkedToQuestion={
                                productLinkedToQuestion?.productId
                              }
                              isClientTired={isUserTired}
                              metadata={metadata}
                              productId={productId}
                            />
                          ) : (
                            <QuizProductCardV2
                              data={data}
                              variant={variant}
                              index={index}
                              collectionProducts={collectionProducts}
                              productLinkedToQuestion={
                                productLinkedToQuestion?.productId
                              }
                              isClientTired={isUserTired}
                              metadata={metadata}
                              productId={productId}
                            />
                          )}
                        </>
                      ))}
                  </div>
                  <NutritionistSection
                    nutritionistData={nenutritionistData}
                    carouselProps={{
                      slidesOnMobile: 2,
                      slidesOnTab: 2,
                      slidesOnDesktop: 3,
                      slidesToScroll: 1,
                    }}
                    hideCaution
                    className="nutritionistsectionSkin"
                  />
                  <TransformationPlan metadata={metadata} />
                  <QuizFreeTrial data={freeTrialData} />

                   {/* <div
                    className={`${style.quizpage_testimonial_desk} ${style.quizpage_width}`}
                  >
                    <Testimonial metadata={metadata} />
                  </div> */}
                  <QuizReviewContainer
                    reviewData={reviewData}
                    productId={data?.product?.id}
                    productName={data?.product?.name}
                  />
                </>
              );
            }
            return <></>;
          }}
        </TypedProductDetailQuery>
      </div>
    );
  }
  return <></>;
};
export default QuizProductCard;
