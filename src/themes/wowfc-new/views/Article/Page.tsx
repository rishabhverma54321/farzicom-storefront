import React, { useContext, useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import { getGclid, getUtmData } from "@temp/core/utils";
// import { Button, CollectionHeading, RichTextContent } from "@components/atoms";
// import {
//   Wishlist,
//   StoreLocator,
//   ContactUs,
//   Login,
//   Cashbacks,
// } from "@components/organisms";
import { FaqContainer } from "@components/molecules/FaqContainer";
import PolicyPages from "@components/molecules/PolicyPages";
import MyOrderPage from "@app/pages/MyOrderPage";
import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useWallet,
} from "@saleor/sdk";

import IrishMoss from "images/iris-moss.jpg";
import MacedemiaNut from "images/macedemia-nut.jpg";
import ArgonOil from "images/argon-oil.jpg";
import Cranberry from "images/cranberry.jpg";
import Fragipani from "images/frangipani.jpg";
import FranchClay from "images/french-clay.jpg";
import SheaButter from "images/shea-butter.jpg";
import WhitePeony from "images/white-peony.jpg";
import OliverButter from "images/oliver-butter.jpg";

import Kamal from "images/kamal-passi.jpg";
import PurestCare from "images/the-purest-care-for-pure-beauty.jpg";
import OurRoots from "images/our-roots.jpg";
import StandingTrue from "images/standing-true-to-our-principles.jpg";
import OurStorBanner from "images/ourstorybanner.jpg";

import InfluencerSignUp from "@app/pages/InfluencerSignUp";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import { Breadcrumb, Breadcrumbs, Button } from "@temp/components";
import IngredientsJson from "@temp/static data/ingredients.json";
import gtmConfig from "Themes/lib/gtmConfig.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import CollectionHeading from "@components/atoms/CollectionHeading";
import { RichTextContent } from "@components/atoms/RichTextContent";
import Wishlist from "@components/molecules/Wishlist";
import ContactUs from "@components/organisms/ContactUs";
import Login from "@components/organisms/Login";
import StoreLocator from "@components/organisms/StoreLocator";
import { useCustomLocation } from "@hooks/useCustomLocation";
import WowGreen from "../../components/WowGreen/WowGreen";

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

interface PageProps extends Partial<RouteComponentProps> {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
    seoDescription: string;
    seoTitle: string;
    slug: string;
    __typename: "Page";
  };
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
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  useEffect(() => {
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: "Our Ingredients-Lotus Organics+",
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: "Our Ingredients-Lotus Organics+",
          },
        },
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
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: "Our Story-Lotus Organics+",
          },
        },
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

export enum pages {
  MY_ORDER = "my-order",
  OUR_STORY = "our-story",
  OUR_INGREDIENTS = "our-ingredients",
  WISHLIST = "wishlist",
  STORE_LOCATOR = "store-locator",
  CONTACT_US = "contact-us",
  FAQ = "faqs",
  BLOG = "blog",
  CSR_Policy = "csr-policy",
  PRIVACY_POLICY = "privacy-policy",
  TERMS_AND_CONDITIONS = "terms-conditions",
  RETURN_POLICY = "return-policy",
  LOGIN = "login",
  CASHBACKS = "cashbacks",
  TERMS_AND_CONDITIONS_CASHBACK = "terms-and-conditions-cashaback",
  INFLUENCER_SIGNUP = "influencer-signup",
  WOWGREEN = "wowgreen",
}

const renderSwitch = (breadcrumbs, headerImage, navi, page, history) => {
  let content = <> </>;
  switch (page.slug) {
    case pages.MY_ORDER:
      content = <MyOrderPage {...{ history }} />;
      break;

    case pages.OUR_STORY:
      content = <OurStory breadcrumbs={breadcrumbs} />;
      break;

    case pages.OUR_INGREDIENTS:
      content = <OurIngredients breadcrumbs={breadcrumbs} />;
      break;

    case pages.WISHLIST:
      content = <Wishlist />;
      break;
    case pages.LOGIN:
      content = <Login />;
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

    case pages.CONTACT_US:
      content = <ContactUs />;
      break;

    case pages.WOWGREEN:
      content = (
        <div className="container wow-green">
          <WowGreen metadata={page.metadata} />
        </div>
      );
      break;
    default:
      content = (
        <div className="container">
          <RichTextContent descriptionJson={page.contentJson} />
        </div>
      );
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
}) => {
  const { user } = useAuthState();
  const { getWalletAmount } = useCheckout();

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();
      // getWalletAmount().then(walletAmount => {
      //   const ctp = {
      //     Name: `${user.firstName} ${user.lastName}`,
      //     Email: user.email,
      //     Phone: user?.defaultBillingAddress?.phone,
      //     Identity: user?.defaultBillingAddress?.phone,
      //     "Net Cashback": walletAmount.data,
      //   };
      //   //
      //   clevertap.onUserLogin.push({
      //     Site: ctp,
      //   });
      // });
    }
  }, [page.slug]);
  return renderSwitch(breadcrumbs, headerImage, navigation, page, history);
};
export default Page;
