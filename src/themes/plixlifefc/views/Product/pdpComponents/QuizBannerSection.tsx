import { CachedImage } from "@components/molecules/CachedImage";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useAuthState } from "@saleor/sdk";
import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";

const QuizBannerSection = ({ product, isPerfumeBanner }) => {
  const metaData = product?.metadata || [];
  const { user } = useAuthState();
  const isLoggedIn = user?.id && user?.phone;
  const pdpQuizBanner =
    getMetadataValue(metaData, "pdp_quiz_banner") &&
    parseJson(getMetadataValue(metaData, "pdp_quiz_banner"));

  if (isPerfumeBanner) {
    const pdpPerfumeBannerData =
      getMetadataValue(metaData, "perfumes_byob_banner") &&
      parseJson(getMetadataValue(metaData, "perfumes_byob_banner"));

    if (pdpPerfumeBannerData && pdpPerfumeBannerData?.enable)
      return (
        <div className="pdp_perfumes_banner">
          <MyCustomLink
            href={pdpPerfumeBannerData?.url || "/page/build-your-box-3"}
          >
            {pdpPerfumeBannerData?.desk_img ? (
              <div className="pdp_quiz_desk_img">
                <CachedImage
                  url={pdpPerfumeBannerData?.desk_img}
                  isNextImage
                  nextImageLayout="fill"
                />
              </div>
            ) : (
              <></>
            )}
            {pdpPerfumeBannerData?.mob_img ? (
              <div className="pdp_quiz_mob_img">
                <CachedImage
                  url={pdpPerfumeBannerData?.mob_img}
                  isNextImage
                  nextImageLayout="fill"
                />
              </div>
            ) : (
              <></>
            )}
          </MyCustomLink>
        </div>
      );
  }

  if (pdpQuizBanner && pdpQuizBanner?.enable) {
    return (
      <div className="pdp_quiz">
        <MyCustomLink
          href={
            !!isLoggedIn
              ? `${pdpQuizBanner?.url || "/page/quiz"}`
              : `/page/login/?redirect_to=${pdpQuizBanner?.url || "/page/quiz"}`
          }
        >
          {pdpQuizBanner?.desk_img ? (
            <div className="pdp_quiz_desk_img">
              <CachedImage
                url={pdpQuizBanner?.desk_img}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
          {pdpQuizBanner?.mob_img ? (
            <div className="pdp_quiz_mob_img">
              <CachedImage
                url={pdpQuizBanner?.mob_img}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
        </MyCustomLink>
      </div>
    );
  }
  return <></>;
};

export default QuizBannerSection;
