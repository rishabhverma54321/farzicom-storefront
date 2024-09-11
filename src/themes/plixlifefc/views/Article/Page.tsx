import React, { useContext, useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import SalesPage, { Banner1 } from "@components/templates/SalesPage";
import { Button } from "@components/atoms/Button";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { RichTextContent } from "@components/atoms/RichTextContent";
import { Wishlist } from "@components/organisms/Wishlist";
import { StoreLocator } from "@components/organisms/StoreLocator";
import { ContactUs } from "@components/organisms/ContactUs";
import { Login } from "@components/organisms/Login";
import { Cashbacks } from "@components/organisms/Cashbacks";
import { Horeca } from "@components/organisms/Horeca";
import { PlixShop } from "@components/organisms/PlixShop";
import { FaqContainer } from "@components/molecules/FaqContainer";
import { CachedImage } from "@components/molecules/CachedImage";
import PolicyPages from "@components/molecules/PolicyPages";
import MyOrderPage from "@app/pages/MyOrderPage";
import { useAuth, useAuthState, useCheckout, useWallet } from "@saleor/sdk";

import IrishMoss from "images/iris-moss.jpg";
import MacedemiaNut from "images/macedemia-nut.jpg";
import ArgonOil from "images/argon-oil.jpg";
import Cranberry from "images/cranberry.jpg";
import Fragipani from "images/frangipani.jpg";
import Acai from "images/acai-berrys.jpg";
import FranchClay from "images/french-clay.jpg";
import SheaButter from "images/shea-butter.jpg";
import WhitePeony from "images/white-peony.jpg";
import OliverButter from "images/oliver-butter.jpg";
import { PrivacyPolicy } from "@components/molecules";
import Kamal from "images/kamal-passi.jpg";
import PurestCare from "images/the-purest-care-for-pure-beauty.jpg";
import OurRoots from "images/our-roots.jpg";
import StandingTrue from "images/standing-true-to-our-principles.jpg";
import OurStorBanner from "images/ourstorybanner.jpg";
import Bxgy from "@components/templates/Bxgy";

import InfluencerSignUp from "@app/pages/InfluencerSignUp";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import { Breadcrumb, Breadcrumbs } from "@temp/components";
import IngredientsJson from "@temp/static data/ingredients.json";
import { byobPages, pages } from "gqlTypes/customGlobalTypes";
import gtmConfig from "Themes/lib/gtmConfig.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import WhyPlix from "@components/templates/WhyPlix";
import { PlantATree } from "@components/templates/PlantATree";
import { CleanLabelCertified } from "@components/templates/CleanLabelCertified";
import { getMetadataValue, parseJson } from "@utils/misc";
import ConsultationForm from "@components/templates/ConsultationForm";
import NutritionForm from "@components/templates/NutritionForm";

import { pagesDetails } from "@temp/pages/page/gqlTypes/pagesDetails";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import BugReport from "@components/organisms/BugReport";
import OtpOutPage from "@components/organisms/OtpOutPage";
import OtpInPage from "@components/organisms/OtpInPage";
import {
  Membership,
  PlixQuizWidget,
  PlixMainQuiz,
  PlixQuizWeightLoss,
  PlixSkinQuiz,
  PlixHairQuiz,
  BuildYourBoxGallery,
} from "@components/templates";
import { PatchTest } from "@components/templates";
import BuildYourBox from "@components/templates/BuildYourBox";
import { SectionDetailsWithoutChildrenPlix } from "../Home/gqlTypes/SectionDetailsWithoutChildrenPlix";
import CollectionList from "../../../../@next/components/molecules/CollectionList/CollectionList";
import { TypedSectionWithCollectionQuery } from "../Home/queries";
import OurStory2 from "@components/templates/OurStory2";
import { CleanCertificate } from "@components/templates/CleanLabel";
import { PledgeATree } from "@components/templates/Pledge";
import Press from "@components/templates/Press";
import TrackOrder from "@components/templates/TrackYourOrder";
import { CollectionProducts } from "@components/templates/BuildYourBox/gqlTypes/CollectionProducts";
import PlixQuiz from "@components/templates/PlixQuiz";
import PlixGoogleForm from "@components/templates/PlixGoogleForm/PlixGoogleForm";
import Gifting from "@components/templates/Gifting/Gifting";
import DietPlanRedirection from "../../../../@next/components/templates/DietPlanRedirection/DietPlanRedirection";

const pcImages = [
  { image: IrishMoss, name: "Irish Moss" },
  { image: MacedemiaNut, name: "Macadamia Nut" },
  { image: Fragipani, name: "Frangi Pani" },
  { image: Acai, name: "Acai Berries" },
  { image: FranchClay, name: "French Clay" },
  { image: Cranberry, name: "Cranberry" },
  { image: SheaButter, name: "Shea Butter" },
  { image: OliverButter, name: "Oliver Butter" },
  { image: ArgonOil, name: "Argon Oil" },
  { image: WhitePeony, name: "White Peony" },
];

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface IData {
  pageData: pagesDetails;
  sectionData: SectionDetailsWithoutChildrenPlix;
  sectionData2: SectionDetailsWithoutChildrenPlix;
  bybCollectionData: { collectionId: string; data: CollectionProducts }[];
  giftBoxCollectionData: any;
}
interface PageProps extends Partial<RouteComponentProps> {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation?: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
    seoDescription: string;
    seoTitle: string;
    slug: string;
    __typename: "Page";
  };

  data: IData;
}

const OurIngredients = ({ breadcrumbs }) => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const handleShowMore = ({ image, name }: { image: any; name: string }) => {
    const ingredientDetailsContext: InnerOverlayContextInterface = {
      data: { ...IngredientsJson[name], src: image },
    };
    show(
      OverlayType.ingredientDetails,
      OverlayTheme.modal,
      ingredientDetailsContext
    );
    const clevertap = makeClevertap();
    if (clevertapEvents.ingredientReadMore.enable) {
      clevertap.event.push(clevertapEvents.ingredientReadMore.value, {
        Title: "", // Send title here once the page is loaded from backend
      });
    }
    if (gtmConfig.ingredientReadMore.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.ingredientReadMore.value,
        ecommerce: {
          "Ingredient read more": {
            Title: "", // handle accordingly
          },
        },
      });
    }
  };
  useEffect(() => {
    if (clevertapEvents.pageViews.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.pageViews.value, {
        URL: window.location.href,
        Title: "Our Ingredients-Lotus Organics+",
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);
  return (
    // <MetaWrapper
    //   meta={{
    //     title: "Our Ingredients-Lotus Organics+",
    //   }}
    // >
    <div>
      <div className="article-page__header">
        <img src={OurStorBanner} alt="Our Story Banner" />
      </div>
      <div className="container">
        <CollectionHeading Heading="Our Ingredients" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="article-page__container">
          <div className="article-page__content">
            <div className="row">
              <div className="column">
                {pcImages.map(img => (
                  <div className="grid-item" key={img.name}>
                    <img
                      src={img.image}
                      alt={img.name}
                      onClick={() => {
                        handleShowMore(img);
                      }}
                    />
                    <div className="bottom-content">
                      <p>{img.name}</p>
                      <button
                        onClick={() => {
                          handleShowMore(img);
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </MetaWrapper>
  );
};

const OurStory = ({ breadcrumbs }) => {
  useEffect(() => {
    const clevertap = makeClevertap();
    clevertap.event.push(clevertapEvents.pageViews.value, {
      URL: window.location.href,
      Title: "Our Story-Lotus Organics+",
    });
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);
  return (
    // <MetaWrapper
    //   meta={{
    //     title: "Our Story-Lotus Organics+",
    //   }}
    // >
    <div className="container">
      <CollectionHeading Heading="OUR STORY" />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="article-page__container">
        <div className="article-page__content">
          <div className="row">
            <div className="column-our-story rowOdd">
              <div className="os-img">
                <img src={Kamal} alt="Kamal Passi" />
              </div>
              <div className="os-text">
                <CollectionHeading Heading="MR. PASSI’S PHILOSPHY OF PURITY" />
                <p>
                  Mr. Kamal Passi, our founder has always endeavoured to provide
                  our consumers with the purest and the most potent beauty and
                  wellness solutions. His passion bore fruit with the creation
                  of Lotus Organics. The need to minimize exposure to toxic
                  chemicals, artificial fragrances and natural allergens became
                  our motivation to ensure safe and effective skincare for
                  consumers.
                  <div className="nameText">Mr. Kamal Passi, Founder</div>
                </p>
              </div>
            </div>
            <div className="column-our-story rowEven">
              <div className="os-img">
                <img src={PurestCare} alt="The Purest Care for Beauty" />
              </div>
              <div className="os-text">
                <CollectionHeading Heading="THE PUREST CARE FOR PURE BEAUTY" />
                <p>
                  Driven by our commitment towards our promises of Purity,
                  Potency and Passion; we resolve to never make any compromise
                  with quality of our products. Crafted at the Lotus Skin Labs,
                  with a minimum 95% natural formulations, of selectively chosen
                  botanical extracts, cold pressed oils, fresh and pure butters
                  and steam distilled pure essential oils, our products are just
                  what your skin needs to feel loved and pampered.
                </p>
              </div>
            </div>
            <div className="column-our-story rowOdd">
              <div className="os-img">
                <img src={OurRoots} alt="Our Roots" />
              </div>
              <div className="os-text">
                <CollectionHeading Heading="OUR ROOTS" />
                <p>
                  Sourced from across the globe, the organic bio-actives that go
                  into the making of our products are remarkably potent and they
                  ensure that your skin gets nourished and restored at a faster
                  pace. The additional antioxidants and fibres increase skin
                  cell formation that helps in maintaining the suppleness of the
                  skin, hence giving you healthy and beautiful skin for a longer
                  time.
                  <div className="toOurIngredientsButton">
                    <Button
                      fullWidth
                      color="secondary"
                      testingContext="getIngredients"
                    >
                      CLICK HERE TO DISCOVER OUR INGREDIENTS
                    </Button>
                  </div>
                </p>
              </div>
            </div>
            <div className="column-our-story rowEven">
              <div className="os-img">
                <img src={StandingTrue} alt="Standing True to Our Principles" />
              </div>
              <div className="os-text">
                <CollectionHeading Heading="STANDING TRUE TO OUR PRINCIPLES" />
                <p>
                  As a brand, Lotus Organics+ stands committed towards
                  sustainability. Our products aren’t just made from organic
                  ingredients, but they are also free from paraben,
                  preservatives and sulphates. We are aware of how artificial
                  fragrances and colours can induce allergies and other such
                  ailments, and hence we make sure that products belonging to
                  the Lotus Organics+ range are free from those. Our packaging
                  that comes from 100% recyclable material such as paper boxes,
                  glass bottles and jars, recyclable plastics and aluminium
                  tubes, speak of our commitment towards nature. We believe true
                  beauty comes from love for all, and hence our products are
                  100% vegetarian, moreover they are never tested on animals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </MetaWrapper>
  );
};

const renderSwitch = (breadcrumbs, headerImage, navi, page, history, data) => {
  const pageMetadata = page?.metadata;
  let content = <> </>;
  switch (page?.slug) {
    case pages.OUR_STORY:
      content = <OurStory2 breadcrumbs={breadcrumbs} content={page} />;
      break;

    case pages.PRESS:
      content = <Press content={page} />;
      break;

    case pages.TRACK_YOUR_ORDER:
      content = <TrackOrder />;
      break;

    case pages.OUR_INGREDIENTS:
      content = <OurIngredients breadcrumbs={breadcrumbs} />;
      break;

    case pages.LOGIN:
      content = <Login />;
      break;

    case pages.PATCH_TEST:
      content = <PatchTest content={page} />;
      break;

    case pages.STORE_LOCATOR:
      content = (
        <>
          <div className="article-page__header">
            <img src={OurStorBanner} alt="Our Story Banner" />
          </div>
          <StoreLocator />
        </>
      );
      break;

    case pages.BUG_REPORT:
      {
        const fields =
          pageMetadata &&
          getMetadataValue(pageMetadata, "fields") &&
          JSON.parse(getMetadataValue(pageMetadata, "fields"));

        content = (
          <div>
            <BugReport fields={fields} title={page?.title} />
          </div>
        );
      }
      break;
    case pages.OTP_OUT:
      {
        const fields =
          pageMetadata &&
          getMetadataValue(pageMetadata, "fields") &&
          JSON.parse(getMetadataValue(pageMetadata, "fields"));

        content = (
          <div>
            <OtpOutPage fields={fields} title={page?.title} />
          </div>
        );
      }
      break;
    case pages.OTP_IN:
      {
        const fields =
          pageMetadata &&
          getMetadataValue(pageMetadata, "fields") &&
          JSON.parse(getMetadataValue(pageMetadata, "fields"));

        content = (
          <div>
            <OtpInPage fields={fields} title={page?.title} />
          </div>
        );
      }
      break;
    case pages.CONTACT_US:
      content = <ContactUs content={page} />;

      break;

    case pages.FAQ:
      content = <FaqContainer />;
      break;

    case pages.BLOG:
      content = <> Redirect </>;
      break;

    case pages.CSR_Policy:
      content = <PolicyPages type={pages.CSR_Policy} />;
      break;

    case pages.PRIVACY_POLICY:
      {
        const htmlContent =
          pageMetadata &&
          getMetadataValue(pageMetadata, "html_content") &&
          parseJson(getMetadataValue(pageMetadata, "html_content"));

        content = (
          <div className="container">
            <div>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* <RichTextContent
              descriptionJson={page.contentJson}
              className="plixlife__rich__text"
            /> */}
            <PrivacyPolicy htmlContent={htmlContent} />
          </div>
        );
      }
      break;

    case pages.TERMS_AND_CONDITIONS:
      content = (
        <div className="container">
          <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <RichTextContent
            descriptionJson={page?.contentJson}
            className="plixlife__rich__text"
          />
        </div>
      );

      break;

    case pages.NUTRITION_FORM:
      content = (
        <div className="container">
          <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <NutritionForm content={pageMetadata} />
        </div>
      );
      break;

    case pages.REFUND_AND_CANCELLATION:
      content = (
        <div className="container">
          <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <RichTextContent
            descriptionJson={page.contentJson}
            className="plixlife__rich__text"
          />
        </div>
      );
      break;
    case pages.GUIDANCE: {
      const bannerData =
        pageMetadata &&
        getMetadataValue(pageMetadata, "bannerData") &&
        JSON.parse(getMetadataValue(pageMetadata, "bannerData"));
      content = (
        <>
          <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <CachedImage
            url={bannerData.banner.image}
            imgixSizes="100vw"
            alt={page?.title}
          />
          <div className="container plixlife_guidance_text_container">
            <RichTextContent
              descriptionJson={page.contentJson}
              className="plixlife__rich__text"
            />
          </div>
        </>
      );
      break;
    }
    case pages.APRIL_OFFERS_TERMS_AND_CONDITION:
    case pages.TERMS_AND_CONDITIONS_CASHBACK:
    case pages.MONEY_BACK_GUARANTEE:
      content = (
        <>
          <Banner1 metadata={pageMetadata} />
          <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <div className="container">
            <RichTextContent descriptionJson={page.contentJson} />
          </div>
        </>
      );
      break;

    case pages.INFLUENCER_SIGNUP:
      content = (
        <>
          <div className="article-page__header">
            <img src={OurStorBanner} alt="Our Story Banner" />
          </div>
          <InfluencerSignUp />
        </>
      );
      break;
    case pages.QUIZ:
      content = <PlixQuiz content={page} />;
      break;

    case pages.QUIZNEW:
    case pages.QUIZ_WEIGHT_LOSS_RESULT:
      content = <PlixMainQuiz content={page} />;
      break;

    case pages.QUIZSKIN:
    case pages.QUIZSKINRESULTS:
      content = <PlixSkinQuiz content={page} />;
      break;

    case pages.QUIZHAIR:
    case pages.QUIZ_HAIR_MALE_RESULTS:
    case pages.QUIZ_HAIR_FEMALE_RESULTS:
      content = <PlixHairQuiz content={page} />;
      break;

    case pages.QUIZ_WEIGHT_LOSS:
    case pages.QUIZ_SKIN_LANDING_PAGE:
    case pages.QUIZ_HAIR_MALE_LANDING_PAGE:
    case pages.QUIZ_HAIR_FEMALE_LANDING_PAGE:
      content = <PlixQuizWeightLoss content={page} />;
      break;

    case pages.QUIZ_WIDGET:
      content = <PlixQuizWidget content={page} />;
      break;
    case pages.HORECA:
      content = <Horeca content={page} />;
      break;
    case pages.SHOP:
      content = <PlixShop content={page} />;
      break;
    case pages.Membership:
      content = <Membership breadcrumbs={breadcrumbs} content={page} />;
      break;
    case pages.WHY_PLIX:
      content = <WhyPlix breadcrumbs={breadcrumbs} content={page} />;
      break;
    case pages.PLIX_CLEAN_LABEL_CERTIFIED:
      content = <CleanCertificate breadcrumbs={breadcrumbs} content={page} />;
      break;
    case pages.PLIX_PLANT_A_TREE:
      content = <PledgeATree content={page} />;
      break;
    case pages.PLIX_SALES_PAGE:
    case pages.PLIX_SALES_PAGE2:
      content = (
        <SalesPage
          breadcrumbs={breadcrumbs}
          content={page}
          sectionName2="Sales Page 2"
        />
      );
      break;
    case pages.PLIX_SALES_PAGE3:
      content = (
        <SalesPage
          breadcrumbs={breadcrumbs}
          content={page}
          sectionName="Valentines Sales Page"
        />
      );
      break;
    case pages.PLIX_SALES_PAGE4:
      content = (
        <SalesPage
          breadcrumbs={breadcrumbs}
          content={page}
          sectionName="Jeet Sales Page"
        />
      );
      break;
    case pages.BXGY_PAGE:
      content = <Bxgy content={page} sectionData={data.sectionData} />;
      break;
    case pages.DIET_PLAN_REDIRECTION:
      content = <DietPlanRedirection content={page} />;
      break;
    case pages.CONSULTATION_FORM:
      content = <ConsultationForm content={page} />;
      break;
    case pages.GOOGLE_FORM_PAGE:
      content = <PlixGoogleForm content={page} />;
      break;
    case pages.BUILD_YOUR_BOX:
      content = (
        <>
          <BuildYourBox content={page} breadcrumbs={breadcrumbs} />
        </>
      );
      break;
    case pages.BUILD_YOUR_BOX_GALLERY:
      content = (
        <>
          <BuildYourBoxGallery content={page} />
        </>
      );
      break;
    default:
      content = <ContinueShoppingNext />;
      break;
  }
  return content;
};

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page,
  history,
  data,
}) => {
  const { user } = useAuthState();
  const { getWalletAmount } = useCheckout();

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();
      getWalletAmount().then(walletAmount => {
        const ctp = {
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Phone: user?.defaultBillingAddress?.phone,
          Identity: user?.defaultBillingAddress?.phone?.replace("+", ""),
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      });
    }
  }, [page?.slug]);

  const { metadata } = data.pageData.page;
  const isSalePage = getMetadataValue(metadata, "isSalePage", "false");
  if (page?.slug === pages.GIFTING) {
    return (
      <Gifting
        sectionData={data?.sectionData}
        page={page}
        breadcrumbs={breadcrumbs}
      />
    );
  }

  if (isSalePage === "true" && page?.slug !== pages.BXGY_PAGE) {
    return (
      <SalesPage
        breadcrumbs={breadcrumbs}
        content={page}
        sectionData={data.sectionData}
        sectionData2={data.sectionData2}
        sectionName2="Sales Page 2"
      />
    );
  }
  const isBybPage: any = byobPages?.find(item => item === page?.slug);
  const isGiftBox =
    page?.slug === pages.GIFT_BOX || page?.slug === pages.GIFT_BOX_GALLERY;
  if (isBybPage) {
    return (
      <BuildYourBox
        content={page}
        breadcrumbs={breadcrumbs}
        collectionData={
          isGiftBox ? data?.giftBoxCollectionData : data?.bybCollectionData
        }
      />
    );
  }

  return (
    <div id="page-content" className="page-container">
      {renderSwitch(breadcrumbs, headerImage, navigation, page, history, data)}
    </div>
  );
};
export default Page;
