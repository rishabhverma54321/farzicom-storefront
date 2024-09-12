import React, { useContext, useState, useEffect } from "react";
import style from "./scss/index.module.scss";
import {
  getMetadataValue,
  isMember,
  parseJson,
} from "@utils/misc";
import FireWorkReelSection from "@components/organisms/FireWorkReelSection";
import { ShopMetaContext } from "@temp/pages/_app.page";
import Script from "next/script";
import { useAuthState } from "@saleor/sdk";
import PlantATree from "Themes/views/Product/pdpComponents/PlantATree";
import { client } from "@temp/client";
import { productListQuery } from "Themes/views/Product/queries";
import ProductDetailPopup from "@components/farzicom-ui-kit/ProductDetailPopup";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { getDBIdFromGraphqlId } from "@utils/core";
import ExpireTimers from "./ExpireTimers";
import BannerSection, { IBannerSectionInfo } from "./components/BannerSection";
import PageRatings, { IGoogleRating } from "./components/PageRatings";
import BrandLogos, { IBrandLogosInfo } from "./components/BrandLogos";
import QuizCauseSection, { IWeightGainInfo } from "./components/QuizCauseSection";
import WeightLossSection, { IWeightLossInfo } from "./components/WeightLossSection";
import BeautyBanner, { IBeautyBanner } from "./components/BeautyBanner";
import CollageBanner, { ICollageBanner } from "./components/CollageBanner";
import GoalSection, { IGoalSectionInfo } from "./components/GoalSection";
import ResultSection from "./components/ResultSection";
import ReviewSection, { IReviewSection } from "./components/ReviewSection";
import IngredientSection, { IngredientSectionInfo } from "./components/IngredientSection";
import FaqSection, { faqDataInfo } from "./components/FaqSection";
import StickyBottom from "./components/StickyBottom";
import RelatedProductSection, { IRelatedProductsInfo } from "./components/RelatedProductSection";

export interface ISkinQuizLandingPage {
  content?: {
    metadata?: Array<any>;
  };
  isSkin: boolean;
}

export const SkinQuizLandingPage: React.FC<ISkinQuizLandingPage> = ({
  content,
  isSkin
}) => {
  interface IVideoSectionInfo {
    enable: boolean;
    autoplay: boolean;
    fw_playlist_id: string;
  }

  const metadata = content?.metadata || [];
  const ShopMetaContextValue = useContext(ShopMetaContext);
  const [fastResultProducts, setFastResultProducts] = useState("");
  const [productdata, setproductdata] = React.useState(null);
  const [popupstate, setpopupstate] = React.useState(false);
  const { user } = useAuthState();

  useEffect(() => {
    if (
      relatedProducts &&
      Array.isArray(relatedProducts?.products) &&
      relatedProducts?.products?.length > 0
    ) {
      fasterProductListQuery();
    }
    return () => {
      setFastResultProducts("");
    };
  }, []);

  const bannerSection: IBannerSectionInfo =
    metadata &&
    getMetadataValue(metadata, "banner_section") &&
    parseJson(getMetadataValue(metadata, "banner_section"));

  const brandLogos: IBrandLogosInfo =
    metadata &&
    getMetadataValue(metadata, "brand_logos") &&
    parseJson(getMetadataValue(metadata, "brand_logos"));

  const googleRating: IGoogleRating =
    metadata &&
    getMetadataValue(metadata, "google_rating") &&
    parseJson(getMetadataValue(metadata, "google_rating"));

  const videoSection: IVideoSectionInfo =
    metadata &&
    getMetadataValue(metadata, "video_section") &&
    parseJson(getMetadataValue(metadata, "video_section"));

  const weightCause: IWeightGainInfo =
    metadata &&
    getMetadataValue(metadata, "weight_gain_cause") &&
    parseJson(getMetadataValue(metadata, "weight_gain_cause"));

  const weightLoss: IWeightLossInfo =
    metadata &&
    getMetadataValue(metadata, "weight_loss_plan") &&
    parseJson(getMetadataValue(metadata, "weight_loss_plan"));

  const beautyBannerInfo: IBeautyBanner =
    metadata &&
    getMetadataValue(metadata, "beauty_banner") &&
    parseJson(getMetadataValue(metadata, "beauty_banner"));

  const collageBannerInfo: ICollageBanner =
    metadata &&
    getMetadataValue(metadata, "collage_banner") &&
    parseJson(getMetadataValue(metadata, "collage_banner"));

  const faqData: faqDataInfo[] =
    metadata &&
    getMetadataValue(metadata, "faq") &&
    parseJson(getMetadataValue(metadata, "faq"));

  const relatedProducts: IRelatedProductsInfo =
    metadata &&
    getMetadataValue(metadata, "related_products") &&
    parseJson(getMetadataValue(metadata, "related_products"));

  const goalSection: IGoalSectionInfo =
    metadata &&
    getMetadataValue(metadata, "goals_section") &&
    parseJson(getMetadataValue(metadata, "goals_section"));

  const reviewSection: IReviewSection =
    metadata &&
    getMetadataValue(metadata, "reviews_section") &&
    parseJson(getMetadataValue(metadata, "reviews_section"));

  const ingredientSection: IngredientSectionInfo =
    metadata &&
    getMetadataValue(metadata, "ingredients_section") &&
    parseJson(getMetadataValue(metadata, "ingredients_section"));

  const resultSection =
    getMetadataValue(metadata, "result_section") &&
    parseJson(getMetadataValue(metadata, "result_section"));

  const stickyBottom =
    getMetadataValue(metadata, "sticky_bottom") &&
    parseJson(getMetadataValue(metadata, "sticky_bottom"));

  const fireworkConfig =
    getMetadataValue(ShopMetaContextValue, "firework_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "firework_config"));

  const fasterProductListQuery = async () => {
    try {
      const { data } = await client.query({
        query: productListQuery,
        variables: {
          ids: relatedProducts?.products?.map(item => item?.id),
          first: 12,
        },
      });
      const fasterProductlistData =
        data &&
        data?.products?.edges?.length &&
        data?.products?.edges?.map(edge => edge?.node);

      setFastResultProducts(fasterProductlistData);
    } catch (err) {
      console.log("productListQueryError", err);
    }
  };

  const popupstateHandler = product => {
    setproductdata(product);
    setpopupstate(true);
  };

  const handleQuizEvents = (redirect: string) => {
    if (gtmConfig?.plixQuizSkinLandingPage?.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig?.plixQuizSkinLandingPage?.value,
        ecommerce: {
          URL: window?.location?.href,
          name: "Skin Care Quiz",
          button: redirect,
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        },
      });
    }
  };

  return (
    <div className={style.container}>
      {popupstate && (
        <div className="productDetailPopup-pdp">
          <ProductDetailPopup
            productdata={productdata}
            setpopupstate={setpopupstate}
            popupFor="plixlife-faster-results"
          />
        </div>
      )}
      <ExpireTimers metadata={metadata} />
      {fireworkConfig?.isEnabled && (
        <Script id="fw-script" src="https://asset.fwcdn3.com/js/fwn-async.js" />
      )}
      {bannerSection?.enable ? (
        <BannerSection bannerSection={bannerSection} handleQuizEvents={handleQuizEvents} />
      ) : (
        <></>
      )}
      <div className={style.newContainer}>
        {googleRating?.enable ? (
          <PageRatings googleRating={googleRating} />
        ) : (
          <></>
        )}
      </div>
      {brandLogos?.enable ? <BrandLogos BrandLogo={brandLogos} /> : <></>}
      <div className={style.gap} />
      {videoSection?.enable ? (
        <div className={`${style.newContainer} ${style.videosection}`}>
          <FireWorkReelSection
            channel={fireworkConfig?.channel_name}
            componentType="embedFeed"
            mode="row"
            autoplay={videoSection?.autoplay || false}
            playerProps={{
              open_in: "default",
              // max_videos='0',
              placement: "middle",
              player_placement: "bottom-right",
            }}
            playlist={videoSection?.fw_playlist_id}
            pip_navigate={false}
          />
        </div>
      ) : (
        <></>
      )}
      {weightCause?.enable ? <QuizCauseSection data={weightCause} handleQuizEvents={handleQuizEvents} isSkin={isSkin} /> : <></>}
      {beautyBannerInfo?.enable ? <BeautyBanner data={beautyBannerInfo} /> : <></>}
      {collageBannerInfo?.enable ? <CollageBanner data={collageBannerInfo} /> : <></>}
      {goalSection?.enable ? <GoalSection data={goalSection} /> : <></>}
      {resultSection?.enable ? <ResultSection data={resultSection} handleQuizEvents={handleQuizEvents} isSkin={isSkin} /> : <></>}
      {reviewSection?.enable ? <ReviewSection data={reviewSection} googleRating={googleRating} /> : <></>}
      {
        relatedProducts?.enable ? (
          <RelatedProductSection data={relatedProducts} fastResultProducts={fastResultProducts} popupstateHandler={popupstateHandler} isSkin={isSkin} />
        ) : (
          <></>
        )
      }
      <FaqSection data={faqData} />
      <PlantATree />
      {stickyBottom?.enable ? <StickyBottom data={stickyBottom} handleQuizEvents={handleQuizEvents} isSkin={isSkin} /> : <></>}
    </div >
  );
};
SkinQuizLandingPage.displayName = "SkinQuizLandingPage";
export default SkinQuizLandingPage;
