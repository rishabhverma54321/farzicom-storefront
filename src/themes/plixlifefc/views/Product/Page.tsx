import React, { useContext, useEffect, useState } from "react";

import AddToCartSection from "@components/organisms/AddToCartSectionPlixlife";
// import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Media from "react-media";
// import { useCustomLocation } from "@hooks/useCustomLocation";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { ImageComparisonSlider } from "@components/farzicom-ui-kit/ImageComparisonSlider";
import Grid from '@mui/material/Grid';
import CloseCrossIcon from "@components/atoms/SvgIcons/CloseCrossIcon";
import {
  ReviewContainer,
  SortOptions,
} from "@components/organisms/ReviewContainer";
// import { MemoizedProductList} from "@components/organisms/ProductList";
import MemoProductTagsTick from "@components/atoms/SvgIcons/MemoProductTagsTick";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import { NextParser } from "@components/molecules";

import StarNew from "@components/atoms/SvgIcons/Star_new";
import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import parse from "html-react-parser";

// import MemoStarRingsPlix from "@components/atoms/SvgIcons/StarRingsPlix";
import CardsContainer from "@components/organisms/CardsContainer";
import FaqAccordian from "@components/organisms/FaqAccordian";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Card } from "@components/molecules/Card";
import Tabs, { Tab } from "@components/molecules/ReactBestTabs";

import { useItemInCart } from "@hooks/useItemInCart";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { Gap } from "@components/atoms/Gap";
import { MyRating } from "@components/atoms/MyRating";
// import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";

import { structuredData } from "@temp/core/SEO/Product/structuredData";
// import VideoCard from "@components/molecules/VideoCard";
import {
  addToCartDataLayer,
  createFWProduct,
  customEventTrigger,
  getItemCategoriesFromAttribute,
  getMetadataValue,
  getPrices,
  getRoundedRating,
  getVariantAttributes,
  isBoxProduct,
  isMember as isUserMember,
  parseFwProduct,
  parseJson,
} from "@utils/misc";
import { largeScreen, mediumScreen } from "@styles/constants";
import MemoSeeResultsWave from "@components/atoms/SvgIcons/SeeResultsWave";
import MemoSeeResultsCircles from "@components/atoms/SvgIcons/SeeResultsCircles";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";

import LazyLoad from "react-lazyload";

import { CircularProgress } from '@mui/material';
// import CollectionList from "@components/molecules/CollectionList";
import { client } from "@temp/client";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import Script from "next/script";
import dynamic from "next/dynamic";
import { CachedImage } from "@components/molecules/CachedImage";
import { FireWorkReelSection } from "@components/organisms";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@temp/pages/_app";
import { useAuthState, useCart, useCartState } from "@saleor/sdk";
import { useRouter } from "next/router";
import MemoConsIcon from "@components/atoms/SvgIcons/consICon";
import MemoProsIcon from "@components/atoms/SvgIcons/ProsIcon";
import * as S from "./style";
import GalleryCarousel from "./GalleryCarousel";
import MemoVideoPlayIcon from "@components/atoms/SvgIcons/MemoVideoPlayIcon";

import { IProps } from "./types";

import {
  getProductReviewsNext,
  TypedProductListQuery,
  productListQuery,
  productVariantsQuery,
  getProductReviewById,
} from "./queries";
import { TypedSectionWithoutChildrenQuery } from "../Home/queries";

import {
  ProductDetailsPlix,
  ProductDetailsPlix_productReviews_edges,
} from "./gqlTypes/ProductDetailsPlix";

// import dynamic from "next/dynamic";
// import { ProductDetailsPlix_productReviews_edges } from "./gqlTypes/ProductDetailsPlix";
import { ENABLE_GA4, META_DEFAULTS } from "../../config";
// import FaqSection from "./pdpComponents/FaqSection";
// const MemoizedProductList = dynamic(() =>
//   import("@components/organisms/ProductList/ProductList")
// );
import MemoNewTransformationTick from "@components/atoms/SvgIcons/NewTranfomationTick";
import MemoNewTransformationClose from "@components/atoms/SvgIcons/NewTransformationClose";
import { useMessageStateUpdate } from "@temp/MessageContext";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
// import ProductDetailPopup from "@components/farzicom-ui-kit/ProductDetailPopup";
import ReactVisibilitySensor from "react-visibility-sensor";
import QuizBannerSection from "./pdpComponents/QuizBannerSection";

const ProductDetailPopup = dynamic(
  () => import("@components/farzicom-ui-kit/ProductDetailPopup"),
  {
    ssr: false,
    loading: () => (
      <div className="textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const Marquee = dynamic(() => import("react-fast-marquee"), {
  ssr: false,
});

const TestimonialSection = dynamic(
  () => import("./pdpComponents/TestimonialSection"),
  {
    ssr: false,
    loading: () => (
      <div className="textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const ReviewForm = dynamic(() => import("./ReviewForm"), {
  ssr: false,
});
// const FaqSection = dynamic(() => import("./pdpComponents/FaqSection"), {
//   ssr: false,
//   loading: () => (
//     <div className="container textstrip-loader">
//       <ContainerSkeleton
//         render={{ title: true, description: true }}
//         cardCount={4}
//       />
//     </div>
//   ),
// });
const TextStripSection = dynamic(
  () => import("./pdpComponents/TextStripSection"),
  {
    ssr: false,
    loading: () => <div className="textstrip-loader" />,
  }
);

const IngredientSection = dynamic(
  () => import("./pdpComponents/IngredientSection"),
  {
    ssr: false,
    loading: () => (
      <div className="container textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const BenefitsSection = dynamic(
  () => import("./pdpComponents/BenefitsSection"),
  {
    ssr: false,
    loading: () => (
      <div className="container textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const CustomerStudySection = dynamic(
  () => import("./pdpComponents/CustomerStudySection"),
  {
    ssr: false,
    loading: () => (
      <div className="container textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const RulesSection = dynamic(() => import("./pdpComponents/RulesSection"), {
  ssr: false,
  loading: () => (
    <div className="container textstrip-loader">
      <ContainerSkeleton
        render={{ title: true, description: true, image: true }}
        cardCount={2}
      />
    </div>
  ),
});

const CompareSection = dynamic(() => import("./pdpComponents/CompareSection"), {
  ssr: false,
  loading: () => (
    <div className="container textstrip-loader">
      <ContainerSkeleton
        render={{ title: true, description: true, image: true }}
        cardCount={2}
      />
    </div>
  ),
});

const AwardSection = dynamic(() => import("./pdpComponents/AwardSection"), {
  ssr: false,
  loading: () => (
    <div className="container textstrip-loader">
      <ContainerSkeleton
        render={{ title: true, description: true, image: true }}
        cardCount={2}
      />
    </div>
  ),
});

const PlantATreeSection = dynamic(() => import("./pdpComponents/PlantATree"), {
  ssr: false,
  loading: () => (
    <div className="container textstrip-loader">
      <ContainerSkeleton
        render={{ title: true, description: true, image: true }}
        cardCount={2}
      />
    </div>
  ),
});

const ProductClaimsSection = dynamic(
  () => import("./pdpComponents/ProductClaims"),
  {
    ssr: false,
    loading: () => (
      <div className="container textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const RelatedProducts = dynamic(
  () => import("./pdpComponents/RelatedProducts"),
  {
    ssr: false,
    loading: () => (
      <div className="container textstrip-loader">
        <ContainerSkeleton
          render={{ title: true, description: true, image: true }}
          cardCount={2}
        />
      </div>
    ),
  }
);

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (
      slug: string | null,
      value: string,
      variantInfo?: {
        variant_id: number | string;
        slug: string;
        product_id: number;
      }
    ) => void;
  }
> = ({
  add,
  product,
  productOffers,
  items,
  queryAttributes,
  onAttributeChangeHandler,
  refetch,
  section,
  data,
}) => {
  const initialVariant = data?.variantId
    ? product?.variants?.find(
        variant =>
          variant.id === getGraphqlIdFromDBId(data?.variantId, "ProductVariant")
      )
    : product?.defaultVariant;

  const [width] = useWindowWidth();
  const [variantId, setVariantId] = React.useState(initialVariant?.id || "");

  const [openReviewForm, setOpenReviewForm] = React.useState(false);
  const [viewItemTriggered, setViewItemTriggered] = useState(false);
  const [postdata, setpostdata] = React.useState([]);
  const [fastResultProducts, setFastResultProducts] = useState("");
  const [triggerFasterResultsCall, setTriggerFasterResultsCall] = useState(
    false
  );
  const [reviewFromQueryParam, setReviewFromQueryParam] = useState(null);
  const [productdata, setproductdata] = React.useState(null);
  const [popupstate, setpopupstate] = React.useState(false);
  const [serverside, setServerSide] = useState(true);

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const reviewCount = getMetadataValue(product.metadata, "total_rating");
  const getRatingPercentage = (rating_dist, rating) => {
    // const occurrences = countOccurrences(allRatings, rating);
    if (rating_dist && reviewCount) {
      const percentage = (rating_dist[rating] / parseInt(reviewCount)) * 100;
      if (isNaN(percentage)) {
        return 0;
      }
      return percentage;
    }
    return 0;
  };

  const toggleReviewForm = () => {
    setOpenReviewForm(prev => !prev);
  };

  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();
  const popupstateHandler = product => {
    setproductdata(product);
    setpopupstate(true);
  };

  const selectedVariantItem: any = product?.variants?.find(
    v => v.id === variantId
  );

  useEffect(() => {
    setViewItemTriggered(false);
    // Push product name to window object

    if (typeof window !== "undefined") {
      window.productName = product?.name;
    }
    if (triggerFasterResultsCall) {
      if (
        relatedProducts &&
        Array.isArray(relatedProducts) &&
        relatedProducts?.length > 0
      ) {
        fasterProductListQuery();
      }
    }
    return () => {
      setFastResultProducts("");
      if (typeof window !== "undefined") {
        window.productName = undefined;
      }
    };
  }, [product?.id, triggerFasterResultsCall]);

  useEffect(() => {
    if (
      gtmConfig.viewItem.enable &&
      product?.variants?.find(v => v.id === variantId && !viewItemTriggered)
    ) {
      const selectedVariant = product?.variants?.find(v => v.id === variantId);
      const { listprice, discountedPrice, discountAmount } = getPrices(product);
      const categories = getItemCategoriesFromAttribute(selectedVariant);
      const isMonthIncluded = categories?.sizeCategory2
        ?.toLowerCase()
        ?.includes("month");
      if (ENABLE_GA4) {
        setViewItemTriggered(true);
        if (window.dataLayer) {
          window.dataLayer.push({ ecommerce: null });
        }
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.viewItem.value,
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isUserMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
          ecommerce: {
            items: [
              {
                item_name: product?.name,
                item_id: getDBIdFromGraphqlId(product?.id),
                currency: "INR",
                price: discountedPrice,
                discount: discountAmount,
                item_brand: "plixlife",
                item_category: product?.category?.name,
                item_category2: isMonthIncluded
                  ? categories?.sizeCategory2
                  : "NA",
                item_category3: categories?.sizeCategory1 || "NA",
                item_category4: isMonthIncluded
                  ? "NA"
                  : categories?.sizeCategory2 || "NA",
                item_variant: categories?.flavourCategory,
                item_list_name: window?.navigated_from,
                item_list_id: window?.navigated_from_id,
                index:
                  typeof window !== "undefined" &&
                  typeof window.itemIndexFromList === "number"
                    ? window.itemIndexFromList + 1
                    : "NA",
              },
            ],
          },
        });
      }
    }
  }, [product?.id, variantId]);

  const fasterProductListQuery = async () => {
    try {
      const { data } = await client.query({
        query: productListQuery,
        variables: {
          ids: relatedProducts?.map(item => item?.id),
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

  const getImages = () => {
    if (product.variants && variantId) {
      const filterVariant = product.variants.filter(
        variant => variant.id === variantId
      );
      const variant = filterVariant.length
        ? filterVariant[0]
        : product.variants[0];
      if (variant.images.length > 0) {
        const sortImages = variant.images.sort((prev, next) =>
          prev?.sortOrder > next?.sortOrder ? 1 : -1
        );

        return sortImages;
      }
    }

    return product.images;
  };

  const sectionExists = (sectionName: string) => {
    if (section)
      return section.children.edges.filter(
        subSection => subSection.node.name === sectionName
      ).length
        ? section.children.edges.filter(
            subSection => subSection.node.name === sectionName
          )[0]
        : null;
    return null;
  };

  const [reviewData, setReviewData] = useState<
    ProductDetailsPlix_productReviews_edges[]
  >(data?.productReviews?.edges);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showBottomDrawer, setShowBottomDrawer] = useState(false);

  // Query for review pagination
  const getMoreReviews = async (
    endCursor: string,
    filter?: { onlyPicture: boolean; sort: String },
    ratingFilter?: number
  ) => {
    try {
      let sortOption = reviewSortOption;
      let pictureFilter = onlyPicture;
      if (filter) {
        sortOption = filter.sort;
        pictureFilter = filter.onlyPicture;
      }
      setReviewLoading(true);
      const { data: newData, errors } = await client.query({
        query: getProductReviewsNext,
        variables: {
          product: product?.id,
          first: 21,
          picture: pictureFilter,
          after: endCursor,
          sort: sortOption,
          rating: ratingFilter || 0,
        },
        fetchPolicy: "no-cache",
      });
      if (filter || ratingFilter) {
        setReviewData(newData.productReviews.edges);
        setReviewLoading(false);
        setReviewNextInfo(newData.productReviews.pageInfo);
        return;
      }
      const totalProductReviews = reviewData.concat(
        newData.productReviews.edges
      );
      setReviewData(totalProductReviews);
      setReviewLoading(false);
      setReviewNextInfo(newData.productReviews.pageInfo);
    } catch (err) {
      setReviewLoading(false);
      console.log(err);
    }
  };

  const getReviewDataFromId = async reviewId => {
    const encodedReviewId = getGraphqlIdFromDBId(reviewId, "ProductReviewType");
    const { data, errors } = await client.query({
      query: getProductReviewById,
      variables: {
        id: encodedReviewId,
      },
      fetchPolicy: "no-cache",
    });
    if (data?.productReview && typeof location !== "undefined") {
      setReviewFromQueryParam({
        ...data?.productReview,
        reviewToken: router?.query?.token,
      });
      setOpenReviewForm(true);
      location.hash = "#review-section";
    }
  };

  useEffect(() => {
    if (
      typeof location !== "undefined" &&
      location?.hash === "#review-section"
    ) {
      setOpenReviewForm(true);
    }
    setServerSide(false);
  }, []);
  // getMoreReviews();

  const { show } = useContext(OverlayContext);
  const { user } = useAuthState();
  const ShopMetaContextValue = useContext(ShopMetaContext);
  const authenticSection = sectionExists("Authentic");
  const authenticSectionData =
    getMetadataValue(authenticSection?.node?.metadata, "cardData") &&
    parseJson(getMetadataValue(authenticSection?.node?.metadata, "cardData"));

  const authenticSectionText =
    (getMetadataValue(authenticSection?.node?.metadata, "cardText") &&
      parseJson(
        getMetadataValue(authenticSection?.node?.metadata, "cardText")
      )) ||
    "100% Authentic";
  const authenticSectionImage =
    getMetadataValue(authenticSection?.node?.metadata, "cardImage") &&
    parseJson(getMetadataValue(authenticSection?.node?.metadata, "cardImage"));
  const returnSection = sectionExists("Return");
  const returnSectionData =
    getMetadataValue(returnSection?.node?.metadata, "cardData") &&
    parseJson(getMetadataValue(returnSection?.node?.metadata, "cardData"));
  const returnSectionText =
    (getMetadataValue(returnSection?.node?.metadata, "cardText") &&
      parseJson(getMetadataValue(returnSection?.node?.metadata, "cardText"))) ||
    "30 Days Return Policy";
  const returnSectionImage =
    getMetadataValue(returnSection?.node?.metadata, "cardImage") &&
    parseJson(getMetadataValue(returnSection?.node?.metadata, "cardImage"));
  const addToCartBottomText = [
    authenticSectionText?.title,
    returnSectionText?.title,
  ];
  const addToCartBottomImage = [
    authenticSectionImage?.image,
    returnSectionImage?.image,
  ];
  const authenticSectionContext: InnerOverlayContextInterface = {
    data: {
      cardContent: authenticSectionData,
      cardClass: "authenticCardClass",
    },
  };

  const returnSectionContext: InnerOverlayContextInterface = {
    data: {
      cardContent: returnSectionData,
      cardClass: "authenticCardClass",
    },
  };
  const { items: cartItems } = useCartState();
  const router = useRouter();
  const { updateItemWithLinesRest } = useCart();
  const { addToCartRest } = useCart();
  const [fwThumbnail, setFwTumbnail] = useState("");
  const [openFloatingButton, setFloatingButton] = useState(false);
  const FIREWORK_VIEWED = "firework";
  const BOTTOM_DRAWER = "bottomDrawer";

  useEffect(() => {
    // window.scrollTo(0, 0);
    const clevertap = makeClevertap();
    if (clevertapEvents.pageViews.enable) {
      clevertap.event.push(clevertapEvents.pageViews.value, {
        URL: window?.location?.href,
        Title: product.seoTitle || product.name,
      });
    }
    if (gtmConfig.pageViews.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }

    // Review Pagination info
    if (data?.productReviews?.pageInfo) {
      setReviewNextInfo(data?.productReviews?.pageInfo);
    }
  }, []);
  // const cartStatus =  : null;
  useEffect(() => {
    window.addEventListener("cart-opened", () => {
      if (typeof window !== "undefined" && localStorage.getItem("CartStatus")) {
        const videoThumbnail =
          typeof window !== "undefined"
            ? window?._fwn?.player?.video?.thumbnail_url
            : "";

        if (videoThumbnail) {
          const fwStoryBlock = document.getElementById("fw-story-block");
          if (fwStoryBlock) {
            document.body.removeChild(fwStoryBlock);
          }
          setFloatingButton(true);
          setFwTumbnail(videoThumbnail);
          if (typeof window !== "undefined") {
            window?._fwn?.player?.close();
          }
        }
      }
    });
  }, []);

  const { defaultVariant } = product;

  const queryVariant =
    queryAttributes &&
    Object.keys(queryAttributes).length !== 0 &&
    product.variants.find(variant =>
      variant.attributes
        .filter(att => queryAttributes.hasOwnProperty(att.attribute.id))
        .every((att, index) => {
          if (queryAttributes[att.attribute.id] === att.values[0]?.value)
            return true;
          return false;
        })
    );

  const openFloatingPlayer = () => {
    setFloatingButton(false);
    const fireworksHolder = document.createElement("div");
    fireworksHolder.id = "fw-story-block";
    fireworksHolder.className = "fw-story-block";
    fireworksHolder.innerHTML =
      width < 720
        ? `<fw-storyblock id="fw-component" channel=${fireworkConfig?.channel_name} playlist=${fw_video?.playlist_id} mode="pinned" player_margin="8px 8px 110px 8px"  autoplay="true" player_placement="bottom-right"></fw-storyblock>`
        : `<fw-storyblock id="fw-component" channel=${fireworkConfig?.channel_name} playlist=${fw_video?.playlist_id} mode="pinned" autoplay="true" player_placement="bottom-right"></fw-storyblock>`;
    document.body.append(fireworksHolder);
  };
  let enableFirework: boolean = true;
  let fwSessionData;
  let fwVideoThumbnail;
  useEffect(() => {
    // let enableFirework: boolean = true;
    // let fwSessionData;
    // let fwVideoThumbnail;
    if (typeof window !== "undefined") {
      fwSessionData = window?.sessionStorage.getItem(FIREWORK_VIEWED);
    }
    const checkFwVideo = e => {
      if (typeof window !== "undefined") {
        if (gtmConfig.closePopupClick.enable) {
          customEventTrigger(gtmConfig.closePopupClick.value, user, {
            heading_name: e?.detail?.video?.caption,
          });
        }
        const fwStoryBlock = document.getElementById("fw-story-block");
        if (fwStoryBlock) {
          document.body.removeChild(fwStoryBlock);
        }
        setFloatingButton(true);
        const fireworkData = fwSessionData ? parseJson(fwSessionData) : [];
        const fireWorkIndex =
          Array.isArray(fireworkData) &&
          fireworkData?.findIndex(
            element => element?.productID === product?.id
          );
        if (fireWorkIndex !== -1) {
          fireworkData[fireWorkIndex].enable = false;
        }

        if (fireworkData && !!fireworkData.length) {
          window?.sessionStorage.setItem(
            FIREWORK_VIEWED,
            JSON.stringify(fireworkData)
          );
        }
      }
    };

    const closeFwPlayer = () => {
      if (typeof window !== "undefined") {
        window?._fwn?.player?.close();
      }
    };

    const onFwVideClick = () => {
      customEventTrigger("pdp_video_popup_click", user, {
        product_name: product?.name,
      });
    };

    const onFwVideoStart = () => {
      if (typeof window !== "undefined") {
        const thumbnail = window?._fwn?.player?.video?.thumbnail_url;
        thumbnail && setFwTumbnail(thumbnail);
        let fwSessionData = window?.sessionStorage.getItem(FIREWORK_VIEWED);
        const fireworkData = fwSessionData ? parseJson(fwSessionData) : [];
        const fireWorkIndex =
          Array.isArray(fireworkData) &&
          fireworkData?.findIndex(
            element => element?.productID === product?.id
          );

        if (fireWorkIndex === -1) {
          fireworkData?.push({
            productID: product.id,
            enable: true,
            thumbnail: thumbnail,
          });
        } else {
          fireworkData[fireWorkIndex].enable = true;
        }

        window?.sessionStorage.setItem(
          FIREWORK_VIEWED,
          JSON.stringify(fireworkData)
        );
      }
    };

    if (
      typeof window !== "undefined" &&
      (fw_video?.floating || fw_video?.carousel)
    ) {
      document.addEventListener("fw:player:quit", checkFwVideo);
      document.addEventListener("fw:shopping:request-checkout", closeFwPlayer);
      document.addEventListener("fw:video:click-cta", onFwVideClick);
      document.addEventListener("fw:video:start", onFwVideoStart);

      const fireWork = fwSessionData ? parseJson(fwSessionData) : [];
      const isFireWorkAlreadyPresent =
        Array.isArray(fireWork) &&
        fireWork?.find(item => item?.productID === product?.id);

      if (isFireWorkAlreadyPresent) {
        enableFirework = isFireWorkAlreadyPresent?.enable;
        fwVideoThumbnail = isFireWorkAlreadyPresent?.thumbnail;
      }
    }

    if (!queryVariant && Object.keys(queryAttributes).length === 0) {
      if (gtmConfig.productView.enable) {
        if (window.dataLayer) {
          window.dataLayer.push({ ecommerce: null });
        }
        (window.dataLayer = window.dataLayer || [])?.push({
          event: gtmConfig.productView.value,
          ecommerce: {
            currencyCode: "INR",
            detail: {
              actionField: { list: META_DEFAULTS.name }, // 'detail' actions have an optional list property.
              products: [
                {
                  name: product.name,
                  id: defaultVariant?.sku,
                  price: defaultVariant?.pricing?.price?.gross.amount,
                  brand: META_DEFAULTS.name,
                  category: product.category.name,
                  variant: defaultVariant
                    ? atob(defaultVariant?.id).split(":").length > 1
                      ? atob(defaultVariant?.id).split(":")[1]
                      : atob(defaultVariant?.id)
                    : "",
                  inStock: defaultVariant?.quantityAvailable > 5,
                  isAvailableforPurchase: product.isAvailableForPurchase,
                },
              ],
            },
          },
        });
        window.dataLayer = window.dataLayer || [];
      }

      if (clevertapEvents.productView.enable) {
        const clevertap = makeClevertap();
        clevertap.event.push(clevertapEvents.productView.value, {
          name: product.name,
          id: defaultVariant?.sku,
          variantId:
            atob(defaultVariant.id).split(":").length > 1
              ? atob(defaultVariant.id).split(":")[1]
              : atob(defaultVariant.id),
          price: defaultVariant.pricing?.price?.gross.amount,
          category: product.category?.name,
          inStock: defaultVariant.quantityAvailable > 5,
          isAvailableforPurchase: product.isAvailableForPurchase,
        });
      }
    }
    // Hide Firework floating player on product page immediate reload.
    if (
      typeof localStorage !== "undefined" &&
      fw_video?.floating &&
      localStorage?.getItem("hideFloatingFw")
    ) {
      setTimeout(() => {
        localStorage.removeItem("hideFloatingFw");
      }, 5000);
    }
    if (!enableFirework && fwVideoThumbnail) {
      setFloatingButton(true);
      setFwTumbnail(fwVideoThumbnail);
    }
    setShowFloatingPlayer(
      !!(
        fw_video?.floating &&
        enableFirework &&
        typeof localStorage !== "undefined" &&
        !localStorage?.getItem("hideFloatingFw")
      )
    );

    // Close Firework video on product page unmount
    return () => {
      if (
        typeof window !== "undefined" &&
        typeof window._fwn?.player?.close === "function"
      ) {
        window._fwn?.player.close();
        window.removeEventListener("fw:player:quit", checkFwVideo);
        document.removeEventListener("fw:video:click-cta", onFwVideClick);
        document.removeEventListener("fw:video:start", onFwVideoStart);
        window.removeEventListener(
          "fw:shopping:request-checkout",
          closeFwPlayer
        );
      }
    };
  }, []);

  useEffect(() => {
    const onShopNowClick = e => {
      if (gtmConfig.fireworkShopNowCtaClick.enable) {
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.fireworkShopNowCtaClick.value,
          eventAction: "Carrousel_shop_now_click",
          eventCategory: "Carrousel",
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          user_type: user ? "logged_in" : "logged_out",
          membership_status: isUserMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        });
      }
    };
    document.addEventListener(
      "fw:shopping:product-card-clicked",
      onShopNowClick
    );
    return () => {
      document.removeEventListener(
        "fw:shopping:product-card-clicked",
        onShopNowClick
      );
    };
  }, [user]);

  const itemAdded = useItemInCart(variantId);

  const handleAuthenticReturn = (type: "authentic" | "return") => {
    switch (type) {
      case "authentic": {
        show(
          OverlayType.cardOverlay,
          OverlayTheme.modal,
          authenticSectionContext
        );
        break;
      }

      case "return": {
        show(OverlayType.cardOverlay, OverlayTheme.modal, returnSectionContext);
        break;
      }
      default: {
        show(OverlayType.cardOverlay, OverlayTheme.modal, returnSectionContext);
      }
    }
  };

  const AddToCartSectionMob = ({ className }) => {
    const productTags =
      getMetadataValue(product.metadata, "product_tags") &&
      parseJson(getMetadataValue(product.metadata, "product_tags"));

    const unitsSold =
      product.metadata &&
      getMetadataValue(product.metadata, "unitsSold") &&
      parseJson(getMetadataValue(product.metadata, "unitsSold"));

    const variantMetaData = selectedVariantItem?.metadata;

    const updatedVariantName =
      (variantMetaData &&
        getMetadataValue(variantMetaData, "product_name") &&
        parseJson(getMetadataValue(variantMetaData, "product_name"))) ||
      null;

    const reviewLength = data?.productReviews?.totalCount;
    return (
      <div>
        {" "}
        <S.ProductNameHeader
          data-test="productName"
          className={`${className}__productName`}
        >
          {updatedVariantName || product.name}
        </S.ProductNameHeader>
        {productTags && productTags?.isPublished ? (
          <S.ProductTags>
            {productTags?.tags &&
              Array.isArray(productTags?.tags) &&
              productTags?.tags?.map((prodcutTag: any) => (
                <S.ProductBox color={prodcutTag?.color || ""}>
                  <S.Emoji>
                    <MemoProductTagsTick />
                  </S.Emoji>
                  {prodcutTag?.text || ""}{" "}
                </S.ProductBox>
              ))}
          </S.ProductTags>
        ) : (
          <></>
        )}
        <S.RatingMob className={`${className}__rating`}>
          <a href="#review-section-wrapper">
            <MyRating
              fontSizeSm="16px"
              rating={parseFloat(averageRating) ? parseFloat(averageRating) : 5}
              isReadOnly
              color="#FFA227"
              precision={0.1}
            />
          </a>
          {reviewLength > 0 && (
            <a href="#review-section-wrapper" className="reviewCountMob">
              {reviewLength === 100 ? "100+" : reviewLength} Customer Stories
            </a>
          )}
          {unitsSold && (
            <>
              <div className="unitsSold">{unitsSold} Units Sold</div>
            </>
          )}
        </S.RatingMob>
      </div>
    );
  };

  const addToCartSection = (
    <AddToCartSection
      items={items}
      name={product.name}
      descriptionJson={product.descriptionJson}
      category={product.category}
      productVariants={product.variants}
      productPricing={product.pricing}
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAttributeChangeHandler={onAttributeChangeHandler}
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
      itemAdded={itemAdded}
      metaData={product.metadata}
      product={product}
      productOffers={productOffers}
      refetch={refetch}
      add={add}
      section={section}
      className="addToCartSectionPlixlife"
      handleAuthenticReturn={handleAuthenticReturn}
      addToCartBottomText={addToCartBottomText}
      addToCartBottomImage={addToCartBottomImage}
      setShowBottomDrawer={setShowBottomDrawer}
      showBottomDrawer={showBottomDrawer}
      data={data}
      initialVariant={initialVariant}
      // disableButton={disableButton}
    />
  );

  const metaDataArranged =
    product.metadata.length > 0
      ? product.metadata.filter(meta => meta.key !== "faq")
      : [];

  const varaintMetaData: any =
    Array.isArray(product.variants) && !!product.variants.length
      ? product?.variants?.filter(item => item.id === variantId)[0]
      : [];

  if (
    metaDataArranged.length > 0 &&
    product.metadata.filter(meta => meta.key === "faq").length
  )
    metaDataArranged.push(
      product.metadata.filter(meta => meta.key === "faq")[0]
    );

  const relatedProducts =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "related_products") &&
    parseJson(getMetadataValue(metaDataArranged, "related_products"));

  const isPerfumePdpData =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "is_perfume_pdp") &&
    parseJson(getMetadataValue(metaDataArranged, "is_perfume_pdp"));

  const showStickyVariantPicker =
    getMetadataValue(metaDataArranged, "sticky_variant_picker") &&
    parseJson(getMetadataValue(metaDataArranged, "sticky_variant_picker"));

  const benefitsSection =
    getMetadataValue(metaDataArranged, "benefits") &&
    parseJson(getMetadataValue(metaDataArranged, "benefits"));

  const videoSection =
    getMetadataValue(metaDataArranged, "video_section") &&
    parseJson(getMetadataValue(metaDataArranged, "video_section"));

  const benefitsdata =
    getMetadataValue(metaDataArranged, "benefitsData") &&
    parseJson(getMetadataValue(metaDataArranged, "benefitsData"));

  const productDetails =
    getMetadataValue(metaDataArranged, "product_details") &&
    parseJson(getMetadataValue(metaDataArranged, "product_details"));

  const perfumeProductDetails =
    getMetadataValue(metaDataArranged, "perfume_product_details") &&
    parseJson(getMetadataValue(metaDataArranged, "perfume_product_details"));

  const discountBannerMeta =
    getMetadataValue(ShopMetaContextValue, "discount_banner") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "discount_banner"));

  const discountBannerVariantMeta =
    getMetadataValue(varaintMetaData?.metadata, "discount_banner_variant") &&
    parseJson(
      getMetadataValue(varaintMetaData?.metadata, "discount_banner_variant")
    );

  const productCombos =
    varaintMetaData?.metadata &&
    getMetadataValue(varaintMetaData?.metadata, "pdp_product_combos") &&
    parseJson(
      getMetadataValue(varaintMetaData?.metadata, "pdp_product_combos")
    );

  const howToUseVideo =
    getMetadataValue(metaDataArranged, "product_details_video") &&
    parseJson(getMetadataValue(metaDataArranged, "product_details_video"));

  const faqData =
    getMetadataValue(metaDataArranged, "faq") &&
    parseJson(getMetadataValue(metaDataArranged, "faq"));

  const variantPageData =
    selectedVariantItem?.metadata &&
    getMetadataValue(selectedVariantItem.metadata, "variant_page_data") &&
    parseJson(
      getMetadataValue(selectedVariantItem?.metadata, "variant_page_data")
    );

  const variantWhenToUse =
    selectedVariantItem?.metadata &&
    getMetadataValue(selectedVariantItem.metadata, "whenTouse_new") &&
    parseJson(getMetadataValue(selectedVariantItem?.metadata, "whenTouse_new"));

  const [faqExpanded, setFaqExpanded] = useState(false);
  const [whatsGoodExpanded, setWhatsGoodExpanded] = useState(false);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [showDescription, setShowdescription] = useState(true);
  const seeResults =
    getMetadataValue(metaDataArranged, "see_results") &&
    parseJson(getMetadataValue(metaDataArranged, "see_results"));
  const imageComparisonSection =
    getMetadataValue(metaDataArranged, "image_comparison_slider") &&
    parseJson(getMetadataValue(metaDataArranged, "image_comparison_slider"));
  const seeResultsNew =
    getMetadataValue(metaDataArranged, "see_results_new") &&
    parseJson(getMetadataValue(metaDataArranged, "see_results_new"));
  const textStripSectionData =
    getMetadataValue(metaDataArranged, "testData") &&
    parseJson(getMetadataValue(metaDataArranged, "testData"));
  const testimonialSectionData =
    getMetadataValue(metaDataArranged, "testimonialData") &&
    parseJson(getMetadataValue(metaDataArranged, "testimonialData"));

  // New Sections
  const ingredientsData =
    getMetadataValue(metaDataArranged, "ingredients_section") &&
    parseJson(getMetadataValue(metaDataArranged, "ingredients_section"));

  const fullImageSection1 =
    getMetadataValue(metaDataArranged, "fullImage1") &&
    parseJson(getMetadataValue(metaDataArranged, "fullImage1"));

  const productClaimsData =
    getMetadataValue(metaDataArranged, "product_claims") &&
    parseJson(getMetadataValue(metaDataArranged, "product_claims"));

  const benefitsSectionData =
    getMetadataValue(metaDataArranged, "benefit_full_image") &&
    parseJson(getMetadataValue(metaDataArranged, "benefit_full_image"));
  const customerStudy =
    getMetadataValue(metaDataArranged, "customer_study") &&
    parseJson(getMetadataValue(metaDataArranged, "customer_study"));
  const rulesSectionData =
    getMetadataValue(metaDataArranged, "rules_section") &&
    parseJson(getMetadataValue(metaDataArranged, "rules_section"));
  const compareSectionData =
    getMetadataValue(metaDataArranged, "compare_section") &&
    parseJson(getMetadataValue(metaDataArranged, "compare_section"));
  const awardSectionData =
    getMetadataValue(metaDataArranged, "awards_section") &&
    parseJson(getMetadataValue(metaDataArranged, "awards_section"));
  const whenTouseNew =
    variantWhenToUse ||
    (getMetadataValue(metaDataArranged, "whenTouse_new") &&
      parseJson(getMetadataValue(metaDataArranged, "whenTouse_new")));
  const compareSection =
    getMetadataValue(metaDataArranged, "compare_section_new") &&
    parseJson(getMetadataValue(metaDataArranged, "compare_section_new"));

  const whereToUseSection =
    getMetadataValue(metaDataArranged, "where_to_use") &&
    parseJson(getMetadataValue(metaDataArranged, "where_to_use"));

  const DosandDontSection =
    getMetadataValue(metaDataArranged, "dos_and_dont") &&
    parseJson(getMetadataValue(metaDataArranged, "dos_and_dont"));

  const howToUse_video =
    getMetadataValue(metaDataArranged, "howToUse_video") &&
    parseJson(getMetadataValue(metaDataArranged, "howToUse_video"));

  const recommendSection =
    getMetadataValue(metaDataArranged, "recommend_section") &&
    parseJson(getMetadataValue(metaDataArranged, "recommend_section"));

  const short_title =
    getMetadataValue(metaDataArranged, "short_title") &&
    parseJson(getMetadataValue(metaDataArranged, "short_title"));

  const clinically_validate_title =
    getMetadataValue(metaDataArranged, "clinically_validate_title") &&
    parseJson(getMetadataValue(metaDataArranged, "clinically_validate_title"));

  const isPerfumePdp = isPerfumePdpData && !!isPerfumePdpData;

  let compareSectionDataUpdate = [];

  compareSection &&
    Array.isArray(compareSection?.plix_product_feature) &&
    Array.isArray(compareSection?.other_product_feature) &&
    compareSection?.plix_product_feature?.length ===
      compareSection?.other_product_feature?.length &&
    compareSection?.plix_product_feature?.forEach((item, index) => {
      compareSectionDataUpdate?.push(item);
      compareSectionDataUpdate?.push(
        compareSection?.other_product_feature[index]
      );
    });

  const benefitsContent = benefitsSection
    ? {
        title: benefitsSection.title,
        description: benefitsSection.description,
      }
    : {};

  const benefitsVideoContent = {
    video: benefitsSection?.youtubeUrl,
    thumbnail: benefitsSection?.thumbnail,
  };

  const showDiscountBanner =
    discountBannerMeta &&
    Array.isArray(discountBannerMeta) &&
    discountBannerMeta?.filter(items =>
      items?.product_ids
        ?.split(",")
        ?.includes(
          Array.isArray(router?.query?.slug)
            ? router?.query?.slug[0]
            : router?.query?.slug
        )
    );

  const discountBannerImage =
    discountBannerVariantMeta && !!discountBannerVariantMeta?.image
      ? discountBannerVariantMeta
      : showDiscountBanner &&
        Array.isArray(showDiscountBanner) &&
        showDiscountBanner?.length
      ? showDiscountBanner[0]
      : "";

  const whatsGood = variantPageData
    ? variantPageData?.whats_good
    : productDetails
    ? productDetails?.whats_good
    : [];

  const knowPerfume = perfumeProductDetails
    ? perfumeProductDetails?.knowPerfume
    : [];

  const fragranceFamily = perfumeProductDetails
    ? perfumeProductDetails?.fragranceFamily
    : [];

  const perfumeProductInformation = perfumeProductDetails
    ? perfumeProductDetails?.product_information
    : [];

  const ingredients = variantPageData
    ? variantPageData?.ingredients
    : productDetails
    ? productDetails?.ingredients
    : [];
  const howToUse = variantPageData
    ? variantPageData?.uses
    : productDetails
    ? productDetails?.uses
    : [];
  const productInformation = variantPageData
    ? variantPageData?.product_information
    : productDetails
    ? productDetails?.product_information
    : [];

  const hasWhatsGood = Boolean(whatsGood && whatsGood.length > 0);
  const hasIngredients = Boolean(ingredients && ingredients.length > 0);
  const hasHowToUse = Boolean(howToUse && howToUse.length > 0);
  const hasProductInformation = Boolean(
    productInformation && productInformation.length > 0
  );

  const allProductDetailsBooleans = [
    hasWhatsGood,
    hasIngredients,
    hasHowToUse,
    hasProductInformation,
  ];
  const activeProductDetailsTabNumber =
    allProductDetailsBooleans.findIndex(item => item === true) + 1;

  // const firstWeekResult = seeResults ? seeResults.first : {};
  // const secondWeekResult = seeResults ? seeResults.second : {};
  // const thirdWeekResult = seeResults ? seeResults.third : {};

  const firstWeekResult = seeResultsNew
    ? seeResultsNew.first
    : seeResults
    ? seeResults.first
    : {};
  const secondWeekResult = seeResultsNew
    ? seeResultsNew.second
    : seeResults
    ? seeResults.second
    : {};
  const thirdWeekResult = seeResultsNew
    ? seeResultsNew.third
    : seeResults
    ? seeResults.third
    : {};

  const resultImages = [
    { image: firstWeekResult.image },
    { image: secondWeekResult.image },
    { image: thirdWeekResult.image },
  ];

  const hasFirstWeekResult = Boolean(
    firstWeekResult && firstWeekResult.title && firstWeekResult.description
  );
  const hasSecondWeekResult = Boolean(
    secondWeekResult && secondWeekResult.title && secondWeekResult.description
  );
  const hasThirdWeekResult = Boolean(
    thirdWeekResult && thirdWeekResult.title && thirdWeekResult.description
  );

  const allResultsBooleans = [
    hasFirstWeekResult,
    hasSecondWeekResult,
    hasThirdWeekResult,
  ];
  const activeResultsTabNumber =
    allResultsBooleans.findIndex(item => item === true) + 1;
  const [activeResultsTab, setActiveResultsTab] = useState(
    activeResultsTabNumber
  );
  const descriptionParsed = parseJson(product.descriptionJson);
  const showReadMore = showDescription => {
    return (
      <S.ReadMore>
        {showDescription === false ? (
          <>
            Read less
            {/* <img
              src={ReadMore}
              alt="readless"
              style={{
                transform: "rotate(180deg)",
                marginLeft: "2px",
                height: "10px",
              }}
            /> */}
          </>
        ) : (
          <>
            ...Read more
            {/* <img
              src={ReadMore}
              alt="readmore"
              style={{ marginRight: "2px", height: "10px" }}
            /> */}
          </>
        )}
      </S.ReadMore>
    );
  };

  const [reviewSortOption, setReviewSortOption] = useState(
    SortOptions["Most Helpful"]
  );

  const [currentReviewRating, setCurrentReviewRating] = useState<number | null>(
    null
  );

  const [onlyPicture, setOnlyPicture] = useState<boolean>(false);
  const [reviewNextInfo, setReviewNextInfo] = useState<any>(null);
  const [reviewPage, setReviewPage] = useState<number>(1);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
  const [membershipKnowMore, setMembershipKnowMore] = useState(false);
  const [membershipLoading, setMembershipLoading] = useState(false);

  const bottomDrawerPdp =
    getMetadataValue(product?.metadata, "bottomDrawerPopup") &&
    parseJson(getMetadataValue(product?.metadata, "bottomDrawerPopup"));

  const newProductVariant =
    getMetadataValue(product?.metadata, "product_variants") &&
    parseJson(getMetadataValue(product?.metadata, "product_variants"));

  const averageRating =
    getMetadataValue(product.metadata, "average_rating") &&
    Number(getMetadataValue(product.metadata, "average_rating")).toFixed(1);

  const bottomDrawer =
    (typeof window !== "undefined" &&
      sessionStorage.getItem(BOTTOM_DRAWER) &&
      parseJson(sessionStorage.getItem(BOTTOM_DRAWER))) ||
    null;

  useEffect(() => {
    let rootComponent = document?.querySelector(".root-component-container");
    if (rootComponent && showBottomDrawer) {
      rootComponent.style.touchAction = "none";
      return () => {
        rootComponent.style.touchAction = "unset";
      };
    }
  }, [showBottomDrawer]);

  useEffect(() => {
    setViewItemTriggered(false);
    if (
      relatedProducts &&
      Array.isArray(relatedProducts) &&
      relatedProducts?.length > 0
    ) {
      fasterProductListQuery();
    }

    // Push product name to window object

    if (typeof window !== "undefined") {
      window.productName = product?.name;
    }

    return () => {
      setFastResultProducts("");
      if (typeof window !== "undefined") {
        window.productName = undefined;
      }
    };
  }, [product?.id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        bottomDrawer?.enable !== false &&
        width < 720 &&
        bottomDrawerPdp?.enable
      ) {
        let time = setTimeout(setBottomDrawer, bottomDrawerPdp?.timer || 15000);
        document.addEventListener("touchstart", resetTimer);
        document.addEventListener("scroll", resetTimer);

        function resetTimer() {
          clearTimeout(time);
          time = setTimeout(setBottomDrawer, bottomDrawerPdp?.timer || 15000);
        }

        function setBottomDrawer() {
          let DrawerSessionData = { enable: false };
          setShowBottomDrawer(true);
          document.removeEventListener("touchstart", resetTimer);
          document.removeEventListener("scroll", resetTimer);
          sessionStorage.setItem(
            BOTTOM_DRAWER,
            JSON.stringify(DrawerSessionData)
          );
        }

        return () => {
          clearTimeout(time);
          document.removeEventListener("touchstart", resetTimer);
          document.removeEventListener("scroll", resetTimer);
        };
      }
    }
  }, [product.id, bottomDrawer]);

  const BottomDrawerPopup = () => {
    if (bottomDrawerPdp && bottomDrawerPdp?.enable) {
      return (
        <>
          <div className="bottomDrawerpdp-shadow"></div>
          <div className="bottomDrawerpdp">
            {bottomDrawerPdp?.image ? (
              <CachedImage
                url={bottomDrawerPdp?.image}
                imageDimensions={{ width: 100, height: 100 }}
                imgixSizes="100vw"
                isNextImage
              />
            ) : (
              <></>
            )}
            <div className="bottomDrawerpdp__close">
              <CloseCrossIcon
                width={12}
                height={12}
                onClick={() => setShowBottomDrawer(false)}
              />
            </div>
            <div className="bottomDrawerpdp__rating">
              {averageRating ? averageRating : "5.0"}
              <img src="/plixlifefc/assets/rating_star.svg" alt="Rating Star" />
            </div>
          </div>
        </>
      );
    }
    return <></>;
  };

  const membershipEnable =
    getMetadataValue(product?.metadata, "membership") &&
    parseJson(getMetadataValue(product?.metadata, "membership"));

  const pdpTestimonial =
    getMetadataValue(product?.metadata, "product_testimonial") &&
    parseJson(getMetadataValue(product?.metadata, "product_testimonial"));

  const membershipSection =
    getMetadataValue(ShopMetaContextValue, "membership_v3") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "membership_v3"));

  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  const totalMembershipDiscount =
    membershipSection &&
    Math.ceil(
      ((membershipSection.listPrice?.substring(1) -
        membershipSection.mrp?.substring(1)) *
        100) /
        membershipSection.listPrice?.substring(1)
    );

  const membershipPopupData = membershipSection?.cartData?.popupData_new;

  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");
  const membershipVariantId = membershipSection?.variantID;
  const isItemInCart = useItemInCart(membershipVariantId);

  const messageUpdate = useMessageStateUpdate();

  const addMembershipProductToCart = async variant_id => {
    if (variant_id) {
      if (isItemInCart) {
        setMembershipKnowMore(false);
        setMembershipLoading(false);
        messageUpdate("Already added in cart", "success");
      } else {
        setMembershipLoading(true);
        try {
          await addToCartRest(
            variant_id,
            1,
            undefined,
            null,
            false,
            isRecalculate
          )
            .then(res => {
              const token = res?.data?.token || null;
              setMembershipKnowMore(false);
              messageUpdate("Added to cart successfully", "success");
              const membership = res?.data?.lines?.filter(
                line => line.variant.id === variant_id
              )[0];
              addToCartDataLayer(
                res,
                membership?.variant?.product,
                variant_id,
                membership
              );
              if (token) {
                const url = `/checkout/address?token=${token}`;
                const clevertap = makeClevertap();
                clevertap.profile.push({
                  Site: {
                    farzicom_checkout_url: url,
                  },
                });
              }
              try {
                addToCartTrack(ShopMetaContextValue, {
                  product_name: membership?.variant?.product?.name,
                  product_id: membership?.variant?.product?.id,
                  quantity: 1,
                  product_price:
                    membership?.variant?.pricing?.price?.gross?.amount,
                  currency:
                    membership?.variant?.pricing?.price?.gross?.currency,
                  variant: membership?.variant?.name,
                });
              } catch (err) {
                console.log("fc collect atc error", err);
              }
            })
            .catch(e => console.log(e, "error"))
            .finally(() => {
              setMembershipLoading(false);
              // if(items.length == 0) {
              //   localStorage.setItem('firstAtcTime', `${Date.now()}`)
              // }
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    if (
      reviewData &&
      reviewPage * 3 >= reviewData.length &&
      reviewNextInfo?.endCursor
    ) {
      getMoreReviews(reviewNextInfo.endCursor);
    }
  }, [reviewPage]);

  const handleReviewChange = (
    sortby: String | null,
    pageCount?: number,
    ratingFilter?: number
  ) => {
    if (ratingFilter) {
      getMoreReviews("", null, ratingFilter);
      setCurrentReviewRating(ratingFilter);
      setReviewPage(1);
      return;
    }
    if (pageCount) {
      setReviewPage(pageCount);
      return;
    }
    if (sortby) {
      if (sortby === SortOptions["Only Picture"]) {
        setOnlyPicture(true);
        setReviewSortOption(SortOptions["Most Helpful"]);
        getMoreReviews("", {
          onlyPicture: true,
          sort: SortOptions["Most Helpful"],
        });
        setReviewPage(1);
        return;
      }
      if (onlyPicture) {
        setOnlyPicture(false);
      }
      setReviewSortOption(sortby);
      setCurrentReviewRating(null);
      getMoreReviews("", { onlyPicture: false, sort: sortby });
      setReviewPage(1);
    }
  };

  const productReviews = data?.productReviews?.edges
    ? data?.productReviews.edges
    : [];

  const actualReviews = productReviews.filter(
    review => review?.node?.user || review?.node?.userName
  );

  const mappedRatingsArrayOfReviews = [];
  actualReviews.map(item => {
    mappedRatingsArrayOfReviews.push(item.node.rating);
  });

  const rating_distribution =
    getMetadataValue(product?.metadata, "ratings_distribution") &&
    parseJson(getMetadataValue(product?.metadata, "ratings_distribution"));

  const pdpHeader =
    getMetadataValue(product?.metadata, "pdp_header_top") &&
    parseJson(getMetadataValue(product?.metadata, "pdp_header_top"));

  // Firework Shopping Apis integration

  const fw_video =
    getMetadataValue(product?.metadata, "fw_video") &&
    parseJson(getMetadataValue(product?.metadata, "fw_video"));

  const fireworkConfig =
    getMetadataValue(ShopMetaContextValue, "firework_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "firework_config"));

  const crossSellConfig =
    getMetadataValue(ShopMetaContextValue, "cross_sell_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "cross_sell_config"));

  const whatsappWidget =
    getMetadataValue(product?.metadata, "whatsapp_widget") &&
    parseJson(getMetadataValue(product?.metadata, "whatsapp_widget"));

  if (
    typeof window !== "undefined" &&
    (fw_video?.floating || fw_video?.carousel)
  ) {
    window._fwn?.shopping?.configureCart({
      url: `${window.location.origin}/checkout/address`,
      currency: "INR",
    });

    // document.addEventListener("fw:player:quit", function (event) {
    //   let firework = window?.sessionStorage.getItem(FIREWORK_VIEWED);
    //   let fireworkData = firework
    //     ? parseJson(sessionStorage.getItem(FIREWORK_VIEWED))
    //     : [];

    //   let isFirework = fireworkData.findIndex(
    //     element => element?.productID === product?.id
    //   );

    //   if (isFirework === -1) {
    //     fireworkData?.push({ productID: product.id, enable: false });
    //   }

    //   window?.sessionStorage.setItem(
    //     FIREWORK_VIEWED,
    //     JSON.stringify(fireworkData)
    //   );
    // });

    // document.addEventListener("fw:shopping:request-checkout", () => {
    //   window?._fwn?.player?.close();
    // });
    // document.addEventListener("fw:player:quit", () => {
    //   if (fw_video?.floating) {
    //     localStorage.setItem("hideFloatingFw", "true");
    //   }
    //   window?.location?.reload();
    // });

    // Hydrate the products data when the video opens
    window._fwn?.shopping?.onProductsLoaded(
      async ({ products: fwProducts }) => {
        const variants_ext_ids =
          fwProducts &&
          Array.isArray(fwProducts) &&
          fwProducts
            .map(fp => fp?.product_ext_id)
            ?.map(dbId => getGraphqlIdFromDBId(dbId, "ProductVariant"));
        // 1. Make a request to get the latest products data from server.
        if (variants_ext_ids && variants_ext_ids?.length) {
          try {
            const isIdValid = variants_ext_ids?.every(
              id =>
                typeof getDBIdFromGraphqlId(id, "ProductVariant") === "number"
            );

            if (isIdValid) {
              const res = await client.query({
                query: productVariantsQuery,
                variables: {
                  ids: variants_ext_ids,
                  first: 100,
                },
                fetchPolicy: "no-cache",
              });
              const remoteVariants = res?.data?.productVariants?.edges?.map(
                edge => edge?.node
              );
              // 1. Return the latest products data to hydrate firework.
              return remoteVariants?.map(rv => createFWProduct(rv));
            } else {
              return [];
            }
          } catch (error) {
            return [];
          }
        }
        return [];
      }
    );
    window._fwn?.shopping?.onCartDisplayed(async () => {
      // Prefetch Checkout json.
      // router?.prefetch("/checkout/address");
      // 1. Filter out all the free, membership, upsell, personalised box products from cart.
      const filteredCartItems = cartItems?.filter(
        item =>
          item.variant?.product?.category?.name === "All Products" &&
          !item.variant?.product?.tags?.some(tag => tag.name === "member") &&
          !isBoxProduct(item)
      );
      const cartItem_ids = filteredCartItems.map(
        item => item.variant.product.id
      );
      if (cartItem_ids && cartItem_ids.length) {
        try {
          const res = await client.query({
            query: productListQuery,
            variables: {
              ids: cartItem_ids,
              first: 100,
            },
            fetchPolicy: "no-cache",
          });
          const remoteProducts = res?.data?.products?.edges?.map(
            edge => edge?.node
          );
          // 2. Return cart items.
          return filteredCartItems.map(cart_item => {
            const remoteCartProduct = remoteProducts.find(
              p => cart_item?.variant?.product?.id === p.id
            );
            const v_id = getDBIdFromGraphqlId(
              cart_item?.variant?.id,
              "ProductVariant"
            );
            return {
              product: parseFwProduct(
                remoteCartProduct,
                cart_item?.variant?.id
              ),
              unitId: v_id,
              quantity: cart_item?.quantity,
            };
          });
        } catch (error) {
          console.log(error);
          return [];
        }
      }
      return [];
    });

    window._fwn?.shopping?.onCartUpdated(
      async ({ product: fwProduct, productUnit, quantity }) => {
        // Make a request to update the remote cart.
        const linesToAppend: { variantId: string; quantity: number }[] = [];
        linesToAppend.push({
          variantId: productUnit?.unit_ext_id,
          quantity,
        });
        if (
          quantity !==
          cartItems?.find(cItem => cItem.variant?.id == variantId)?.quantity
        ) {
          try {
            const res = await updateItemWithLinesRest(linesToAppend);
            addToCartDataLayer(
              res,
              product,
              variantId,
              res?.data?.lines?.filter(
                line => line?.variant?.id === variantId
              )[0]
            );
            const updatedQuantity = res?.data?.lines?.find(
              line =>
                getDBIdFromGraphqlId(line?.variant?.id, "ProductVariant") ==
                productUnit?.unit_ext_id
            )?.quantity;
            return updatedQuantity;
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  }

  useEffect(() => {
    let script;
    if (
      typeof window !== "undefined" &&
      typeof whatsappWidget === "boolean" &&
      whatsappWidget
    ) {
      script = document.getElementById("limechat-whatsapp");
      if (!script) {
        var url =
          "https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/custom_scripts/plixlife.js";
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.id = "limechat-whatsapp";
        s.defer = true;
        s.src = url;
        s.onload = function () {
          var whatsAppBtn = new LimeChatWhatsapp({
            phone: "918928310251",
            prefill_text: "Hey, Let’s chat about Plix.",
            button_message_mobile: "Chat with us",
            button_message_desktop: "Chat with us",
            display_on: "both",
            widget_type_desktop: "icon",
            widget_type_mobile: "icon",
            display_size_desktop: 50,
            position_desktop: "left",
            bottom_margin_desktop: 48,
            left_margin_desktop: 48,
            right_margin_desktop: 48,
            display_size_mobile: 50,
            position_mobile: "left",
            bottom_margin_mobile: showStickyVariantPicker ? 178 : 108,
            left_margin_mobile: 24,
            right_margin_mobile: 24,
            show_pop_up: false,
            pop_up_message_position: "top",
            pop_up_message_text: "Hey, Let's chat!",
            pop_up_image:
              "https://cdn-icons-png.flaticon.com/512/6521/6521443.png",
            pop_up_delay: 3,
            pdp_prefill_text: "Hey! I would like to know about ",
            pages_to_display: ["products"],
            isShopify: false,
            includeVariant: false,
            isCustomScript: true,
          });
          whatsAppBtn.renderButton();
        };
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      }

      return () => {
        const limeChatScript = document.getElementById("limechat-whatsapp");
        const whatsAppButton = document.getElementsByClassName(
          "WhatsAppButton__root"
        );
        if (limeChatScript && whatsAppButton && typeof window !== "undefined") {
          try {
            document.head.removeChild(limeChatScript);
            document.body.removeChild(whatsAppButton[0]);
            document.body.querySelectorAll("link").forEach(link => {
              // you can use link.remove() too, but this solution is more supported and polyfilled:
              if (link?.href && link.href.includes("limechat"))
                link.parentNode.removeChild(link);
            });
          } catch (error) {
            console.log("Error in limechat -->", error);
          }
        }
      };
    }
    setReviewData(data?.productReviews?.edges);
  }, [product?.id]);

  useEffect(() => {
    if (router?.query?.token && router?.query?.review_id) {
      getReviewDataFromId(router?.query?.review_id);
    }
  }, [router?.query?.token, router?.query?.review_id]);

  return (
    <>
      <S.Hr />
      {fireworkConfig?.isEnabled && (
        <Script id="fw-script" src="https://asset.fwcdn3.com/js/fwn-async.js" />
      )}
      {popupstate && (
        <div className="productDetailPopup-pdp">
          <ProductDetailPopup
            productdata={productdata}
            setpopupstate={setpopupstate}
            popupFor="plixlife-faster-results"
          />
        </div>
      )}
      {showBottomDrawer ? <BottomDrawerPopup /> : <></>}
      <div className="product-page">
        {pdpHeader && pdpHeader?.enable ? (
          <div
            style={{ background: pdpHeader?.bg_color || "#FFF" }}
            className="product-page__topheading"
          >
            <h2 className="product-page__topheading_title">
              {pdpHeader?.heading || ""}
            </h2>
            <p>{pdpHeader?.sub_heading || ""}</p>
          </div>
        ) : (
          <></>
        )}
        <div
          className={`product-container ${
            pdpHeader?.enable
              ? "product-page__topheading_container"
              : "newContainer"
          }`}
        >
          <div className="product-page__product">
            <Script
              dangerouslySetInnerHTML={{
                __html: `${structuredData(
                  product,
                  data?.productReviews?.edges
                )}`,
              }}
              id="structured-data-list-script"
              className="structured-data-list"
              type="application/ld+json"
            />
            <div className="mobile_only_pdp">
              {width < 992 ? (
                <div className="container product-page__product__info__mob">
                  <AddToCartSectionMob className="addToCartSectionPlixlife" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className="product-page__product__gallerycontainer"
              ref={productGallery}
            >
              <GalleryCarousel
                images={getImages()}
                mobileCarouselProps={{ showIndicators: true }}
                desktopCarouselProps={{
                  showIndicators: true,
                  showThumbs: true,
                  showArrows: true,
                }}
                variantId={variantId}
                onChange={() => {
                  if (gtmConfig.carouselArrowClick.enable) {
                    customEventTrigger(
                      gtmConfig.carouselArrowClick.value,
                      user,
                      {
                        product_name: product?.name,
                      }
                    );
                  }
                }}
                discountBanner={discountBannerImage}
              />
              {/* <S.VariantPicker>
              <ProductVariantPicker
                productVariants={product.variants}
                onChange={onVariantPickerChange}
                selectSidebar
                queryAttributes={queryAttributes}
                onAttributeChangeHandler={onAttributeChangeHandler}
              />
            </S.VariantPicker> */}
              {/* membership section  */}
              {!isMember &&
              membershipSection &&
              membershipEnable !== false &&
              membershipSection?.pdpData?.enabled ? (
                <div className="product__membership product__membership__desk">
                  {membershipSection?.pdpData?.imgUrl ? (
                    <div className="product__membership__image">
                      <CachedImage
                        url={membershipSection?.pdpData?.imgUrl}
                        isNextImage
                        alt="Plix Club"
                        imageDimensions={{ height: 100, width: 100 }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="product__membership__text__section">
                    <div className="product__membership__text">
                      {membershipSection?.pdpData?.headerText || ""}
                    </div>
                    <div className="product__membership__details">
                      <div
                        className="product__membership__learn__more"
                        onClick={() => {
                          if (gtmConfig.learnMoreClick.enable) {
                            customEventTrigger(
                              gtmConfig.learnMoreClick.value,
                              user,
                              {
                                heading_name: "Membership Section - PDP",
                              }
                            );
                          }
                          setMembershipKnowMore(!membershipKnowMore);
                        }}
                      >
                        LEARN MORE
                      </div>
                      <div>
                        <div className="product__membership__price">
                          {totalMembershipDiscount > 0 ? (
                            <>
                              <span className="membership-price-discounted">
                                {membershipSection?.mrp}
                              </span>
                              <span className="memership-price-undiscounted">
                                MRP: <span>{membershipSection?.listPrice}</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="membership-price-discounted">
                                {membershipSection?.mrp}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="product__membership__taxed">
                          Inclusive of all taxes
                        </div>
                        <div
                          className="product__membership__button"
                          style={{
                            pointerEvents: membershipLoading ? "none" : "all",
                          }}
                          onClick={() => {
                            addMembershipProductToCart(
                              membershipSection?.variantID
                            );
                            if (gtmConfig.membershipJoinNowClick.enable) {
                              customEventTrigger(
                                gtmConfig.membershipJoinNowClick.value,
                                user,
                                {
                                  heading_name: "Membership Section - Pdp",
                                }
                              );
                            }
                          }}
                        >
                          {membershipLoading ? (
                            <div className="product__loader">
                              <CircularProgress color="inherit" />
                            </div>
                          ) : (
                            <>JOIN NOW</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {membershipKnowMore && membershipPopupData && (
                    <div className="product__membershipcard__popup">
                      <div className="product__membershipcard__popup__close-icon">
                        <MemoPopCloseIcon
                          onClick={() =>
                            setMembershipKnowMore(!membershipKnowMore)
                          }
                        />
                      </div>
                      {membershipPopupData?.heading && (
                        <div className="product__membershipcard__popup__header">
                          <div>
                            {membershipPopupData?.heading}
                            <span>{membershipPopupData?.heading_emoji}</span>
                          </div>
                        </div>
                      )}

                      {membershipPopupData?.right_icon ? (
                        <div className="product__membershipcard__popup__right-icon">
                          <CachedImage
                            url={membershipPopupData?.right_icon}
                            isNextImage
                            imageDimensions={{ width: 100, height: 100 }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      {Array.isArray(membershipPopupData?.membership_data) && (
                        <div className="product__membershipcard__popup__body">
                          {membershipPopupData?.membership_data?.map(item => (
                            <div className="product__membershipcard__popup__cards">
                              <div className="product__membershipcard__popup__cards__header">
                                {item?.level_background ? (
                                  <div className="product__membershipcard__popup__cards__header__background">
                                    <CachedImage
                                      url={item?.level_background}
                                      isNextImage
                                      imageDimensions={{
                                        width: 100,
                                        height: 100,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {item?.level_image ? (
                                  <div className="product__membershipcard__popup__cards__header__levelImg">
                                    <CachedImage
                                      url={item?.level_image}
                                      isNextImage
                                      imageDimensions={{
                                        width: 100,
                                        height: 100,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div className="product__membershipcard__popup__cards__header__title">
                                  {item?.level || ""}
                                </div>
                              </div>
                              <div className="product__membershipcard__popup__cards__body">
                                <div className="product__membershipcard__popup__cards__body__title">
                                  {item?.level_heading || ""}
                                </div>
                                {Array.isArray(item?.benefit_icons) &&
                                !!item?.benefit_icons.length ? (
                                  <div className="product__membershipcard__popup__cards__body__benefits">
                                    {item?.benefit_icons?.map(list => (
                                      <div className="product__membershipcard__popup__cards__body__benefits__card">
                                        {list?.icon ? (
                                          <div className="product__membershipcard__popup__cards__body__benefits__card__img">
                                            <CachedImage
                                              url={list?.icon}
                                              imageDimensions={{
                                                width: 100,
                                                height: 100,
                                              }}
                                              isNextImage
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div className="product__membershipcard__popup__cards__body__benefits__card__text">
                                          {list?.text || ""}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {membershipPopupData?.text && (
                        <div className="product__membershipcard__popup__bottomText">
                          {membershipPopupData?.text}
                        </div>
                      )}

                      <div className="membership_popup_button">
                        <button
                          disabled={membershipLoading}
                          onClick={() => {
                            addMembershipProductToCart(
                              membershipSection?.variantID
                            );
                          }}
                        >
                          {membershipLoading ? (
                            <div className="product__loader">
                              <CircularProgress color="inherit" />
                            </div>
                          ) : (
                            <>
                              <div>
                                <span className="product__membershipcard__popup__bottomText_listprice">
                                  {membershipSection?.listPrice}
                                </span>
                                /<span>{membershipSection?.mrp}</span>
                              </div>
                              <h4>
                                {membershipPopupData?.atc_text}{" "}
                                <MemoCaretRightIcon />
                              </h4>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              {/* membership section  */}
              <div className="pdp_perfumes_banner_deskWrapper">
                <QuizBannerSection isPerfumeBanner product={product} />
              </div>
            </div>

            <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <>
                  <S.Hr />
                </>
              )}
            />
            <div className="desktop_only_pdp">
              {width > 992 || serverside ? (
                <>
                  <div className="product-page__product__info">
                    <div>{addToCartSection}</div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mobile_only_pdp">
            {width < 992 ? (
              <div className="product-page__product__info container">
                <div>{addToCartSection}</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <LazyLoad height={10} offset={50}>
          {fireworkConfig?.isEnabled && fw_video && fw_video.carousel && (
            <div className="container product-page__reelCarousel">
              <FireWorkReelSection
                channel={fireworkConfig?.channel_name}
                componentType="embedFeed"
                autoplay
                // hashtag={`(and ${getDBIdFromGraphqlId(product?.id, "Product")})`}
                playlist={fw_video?.playlist_id}
                pip_navigate={false}
              />
            </div>
          )}
        </LazyLoad>
        <LazyLoad height={50} offset={50}>
          {textStripSectionData && (
            <div className="textStripSection">
              <Marquee speed={40}>
                {textStripSectionData.map((text, index) => (
                  <div className="textItem" key={index}>
                    <StarNew />
                    <span>{text}</span>
                  </div>
                ))}
                {textStripSectionData.map((text, index) => (
                  <div className="textItem" key={index}>
                    <StarNew />
                    <span>{text}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </LazyLoad>

        {/* quiz banner section  */}
        <div className="pdp_quiz_mob">
          <QuizBannerSection product={product} />
        </div>
        {/* quiz banner section  */}

        {/* % know your perfume  */}
        <LazyLoad height={200} offset={50}>
          {knowPerfume?.enable && (
            <div className="container perfumeDetails__knowPerfume_container">
              <div className="perfumeDetails__knowPerfume">
                <div className="perfumeDetails__knowPerfume_left">
                  <ProductHeader
                    headerClass="df"
                    heading={knowPerfume?.title || "Know your Plix Perfume"}
                  />
                  <p>{knowPerfume?.description || ""}</p>
                </div>
                <div className="perfumeDetails__knowPerfume_right">
                  {knowPerfume?.image ? (
                    <CachedImage
                      url={knowPerfume?.image}
                      isNextImage
                      imageDimensions={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="perfumeDetails__knowPerfume_right_tag">
                    {knowPerfume?.tag}
                  </div>
                </div>
                <div className="perfumeDetails__knowPerfume_bg_img">
                  {knowPerfume?.bg_image ? (
                    <CachedImage
                      url={knowPerfume?.bg_image}
                      isNextImage
                      imageDimensions={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </LazyLoad>
        {/* % know your perfume  */}
        {/* Fragrance Family section  */}
        <LazyLoad height={200} offset={50}>
          {fragranceFamily?.enable ? (
            <div className="container perfumeDetails__fragranceFamily">
              <div className="perfumeDetails__fragranceFamily_header">
                <div className="perfumeDetails__fragranceFamily_header_image container">
                  <ProductHeader
                    headerClass="df"
                    heading={fragranceFamily?.title || "Know your Plix Perfume"}
                  />
                  {fragranceFamily?.bg_image ? (
                    <div className="perfumeDetails__fragranceFamily_header_image_type perfumeDetails__fragranceFamily_header_image_desk">
                      <CachedImage
                        url={fragranceFamily?.bg_image}
                        isNextImage
                        nextImageLayout="fill"
                        imgixSizes="60vw"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {fragranceFamily?.bg_mob_image ? (
                    <div className="perfumeDetails__fragranceFamily_header_image_type perfumeDetails__fragranceFamily_header_image_mob">
                      <CachedImage
                        url={fragranceFamily?.bg_mob_image}
                        isNextImage
                        nextImageLayout="fill"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="perfumeDetails__fragranceFamily_variant">
                {fragranceFamily?.variant &&
                  Array.isArray(fragranceFamily?.variant) &&
                  fragranceFamily?.variant?.map((item, index) => (
                    <div className="perfumeDetails__fragranceFamily_variant_container">
                      {index % 2 === 0 ? (
                        <>
                          <div className="perfumeDetails__fragranceFamily_variant_container_details">
                            <div className="perfumeDetails__fragranceFamily_variant_container_details_title">
                              {item?.title || ""}
                            </div>
                            <div className="perfumeDetails__fragranceFamily_variant_container_details_description">
                              {item?.description || ""}
                            </div>
                          </div>
                          <div className="perfumeDetails__fragranceFamily_variant_container_image">
                            {item?.image ? (
                              <CachedImage
                                url={item?.image}
                                isNextImage
                                //  imageDimensions={{width:100, height:100}}
                                nextImageLayout="fill"
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="perfumeDetails__fragranceFamily_variant_container_imageMobile">
                            {item?.imageMobile ? (
                              <CachedImage
                                url={item?.imageMobile}
                                isNextImage
                                //  imageDimensions={{width:100, height:100}}
                                nextImageLayout="fill"
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="perfumeDetails__fragranceFamily_variant_container_image">
                            {item?.image ? (
                              <CachedImage
                                url={item?.image}
                                isNextImage
                                //  imageDimensions={{width:100, height:100}}
                                nextImageLayout="fill"
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="perfumeDetails__fragranceFamily_variant_container_imageMobile">
                            {item?.imageMobile ? (
                              <CachedImage
                                url={item?.imageMobile}
                                isNextImage
                                //  imageDimensions={{width:100, height:100}}
                                nextImageLayout="fill"
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="perfumeDetails__fragranceFamily_variant_container_details">
                            <div className="perfumeDetails__fragranceFamily_variant_container_details_title">
                              {item?.title || ""}
                            </div>
                            <div className="perfumeDetails__fragranceFamily_variant_container_details_description">
                              {item?.description || ""}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </LazyLoad>
        {/* Fragrance Family section  */}

        <>
          {/* <VideoSections data={videoSection}/> */}
          {videoSection &&
          videoSection?.enable &&
          fireworkConfig?.channel_name &&
          !!videoSection?.fw_playlist_id ? (
            <div className="container pdpVideo_container">
              <div className="pdpVideo_section">
                <h3 className="pdpVideo_section_heading">
                  {videoSection?.heading || "Why our customers love"}
                </h3>
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
            </div>
          ) : (
            <></>
          )}
        </>
        {/* Product benfits */}
        <LazyLoad height={200} offset={50}>
          <>
            {whatsGood && Array.isArray(whatsGood) && !!whatsGood?.length ? (
              <div id="productDetails_element" className="product__ingredients">
                <div className="plixContainer">
                  <div className="section--title">
                    <h2>{`Why Plix ${short_title || product?.name}`}</h2>
                  </div>
                  <div className="flex ingredientsWrapper">
                    {whatsGood &&
                      Array.isArray(whatsGood) &&
                      (whatsGoodExpanded
                        ? whatsGood.map((item, index) => (
                            <CardsContainer
                              data={item}
                              containerClass="cards-container"
                              cardClass="make-perfect-card"
                              key={index}
                            />
                          ))
                        : whatsGood &&
                          Array.isArray(whatsGood) &&
                          whatsGood
                            .slice(0, 4)
                            .map((item, index) => (
                              <CardsContainer
                                data={item}
                                containerClass="cards-container"
                                cardClass="make-perfect-card"
                                key={index}
                              />
                            )))}
                  </div>
                  {whatsGood?.length > 4 ? (
                    <button
                      style={{ display: "block", margin: "0px auto" }}
                      onClick={() => setWhatsGoodExpanded(prev => !prev)}
                      className="view-more-plix-pdp viewmore_button"
                    >
                      {whatsGoodExpanded ? "Know less" : "Know more"}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
          {/* Product benefits */}

          {fireworkConfig?.isEnabled && showFloatingPlayer && (
            <div className="container product-page__reelFloating">
              <FireWorkReelSection
                channel={fireworkConfig?.channel_name}
                componentType="storyblock"
                // hashtag={`(and ${getDBIdFromGraphqlId(product?.id, "Product")})`}
                playlist={fw_video?.playlist_id}
                mode="pinned"
                pip_navigate={false}
                playerProps={{
                  player_margin: width < 720 ? "8px 8px 110px 8px" : "",
                }}
              />
            </div>
          )}
          <></>
        </LazyLoad>
        <LazyLoad height={200} offset={50}>
          <ProductClaimsSection data={productClaimsData} /> :
        </LazyLoad>
        <LazyLoad height={200} offset={50}>
          {pdpTestimonial ? (
            <div className="newpdp_testimonial">
              <h3 className="newpdp_testimonial_heading">
                {pdpTestimonial?.heading || ""}
              </h3>
              <p className="newpdp_testimonial_heading_sub">
                {pdpTestimonial?.sub_heading || ""}
              </p>
              {pdpTestimonial?.mob_img ? (
                <div className="newpdp_testimonial_mob_img">
                  <CachedImage
                    url={pdpTestimonial?.mob_img || ""}
                    isNextImage
                    nextImageLayout="fill"
                  />
                </div>
              ) : (
                <></>
              )}
              {pdpTestimonial?.desk_img ? (
                <div className="newpdp_testimonial_desk_img">
                  <CachedImage
                    url={pdpTestimonial?.desk_img || ""}
                    isNextImage
                    imgixSizes="60vw"
                    nextImageLayout="fill"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </LazyLoad>
        {openFloatingButton ? (
          <button
            className={`${
              showStickyVariantPicker ? "open-fw-button-mob" : ""
            } open-fw-button`}
            onClick={openFloatingPlayer}
          >
            {fwThumbnail ? (
              <CachedImage
                url={fwThumbnail}
                imageDimensions={{ width: 100, height: 100 }}
                isNextImage
              />
            ) : (
              <></>
            )}
            <div className="open-fw-button-cover"></div>
            <div className="open-fw-button-icon">
              <MemoVideoPlayIcon />
            </div>
          </button>
        ) : (
          <></>
        )}
        <>
          {(ingredients && Array.isArray(ingredients) && ingredients.length) ||
          (productInformation &&
            Array.isArray(productInformation) &&
            productInformation?.length) ? (
            <div className="product_info">
              <div className="information container product_info_inner_container">
                <ProductHeader headerClass="df" heading="What's in it?" />
                {/* <S.Description className="short_description">
                  {typeof window !== "undefined" &&
                    window.innerWidth < 720
                        ? showDescription
                            ? descriptionParsed?.blocks && descriptionParsed?.blocks[0]?.text
                            : descriptionParsed?.blocks[0]?.text
                        : showDescription
                            ? descriptionParsed?.blocks && descriptionParsed?.blocks[0]?.text
                            : descriptionParsed?.blocks[0]?.text}
                    <span onClick={() => setShowdescription(!showDescription)}>
                        {typeof window !== "undefined" &&
                        window.innerWidth < 720 ? (
                            descriptionParsed?.blocks[0]?.text.length > 0 ? (
                                // showReadMore(showDescription)
                                <></>
                            ) : (
                                <span />
                            )
                        ) : descriptionParsed?.blocks && descriptionParsed?.blocks[0]?.text.length > 0 ? (
                            // showReadMore(showDescription)
                            <></>
                        ) : (
                            <span />
                        )
                        }
                    </span>
                </S.Description> */}
                <Tabs
                  activeTab={activeProductDetailsTabNumber}
                  className="plixProductPagetabs"
                  ulClassName="plixProductPagetabs__ul"
                  onClick={(e, key, tab, activeTab) => {
                    if (key !== activeTab) {
                      customEventTrigger("product_information_click", user, {
                        cta_name: tab?.props?.title,
                        product_name: product?.name,
                      });
                    }
                  }}
                >
                  <Tab
                    title="Main Ingredients"
                    isHidden={!hasIngredients}
                    className="plixProductPagetabs__ul__li"
                  >
                    <div className="containers-container">
                      {ingredients &&
                        (ingredientsExpanded
                          ? ingredients.map((item, index) => (
                              <CardsContainer
                                data={item}
                                containerClass="cards-container"
                                cardClass="make-perfect-card"
                                key={index}
                              />
                            ))
                          : ingredients
                              .slice(0, 4)
                              .map((item, index) => (
                                <CardsContainer
                                  data={item}
                                  containerClass="cards-container"
                                  cardClass="make-perfect-card"
                                  key={index}
                                />
                              )))}
                    </div>
                    {ingredients?.length > 6 ? (
                      <button
                        style={{ display: "block", margin: "0px auto" }}
                        onClick={() => setIngredientsExpanded(prev => !prev)}
                        className="view-more-plix-pdp"
                      >
                        {ingredientsExpanded ? "View less" : "View more"}
                      </button>
                    ) : (
                      <></>
                    )}
                  </Tab>
                  <Tab
                    title="Product Information"
                    isHidden={!hasProductInformation}
                    className="plixProductPagetabs__ul__li"
                  >
                    <>
                      <div className="containers-container-product-information">
                        {productInformation && (
                          <table className="containers-container-product-information__table">
                            {productInformation.map((info, index) => (
                              <tr
                                className="containers-container-product-information__table__row"
                                key={index}
                              >
                                <td className="containers-container-product-information__table__row__cell1">
                                  {info.key}
                                </td>
                                <td className="containers-container-product-information__table__row__cell2">
                                  {info.value}
                                </td>
                              </tr>
                            ))}
                          </table>
                        )}
                      </div>
                    </>
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
        {/* How and when to use */}
        {newProductVariant?.enable && productCombos ? (
          <div className="productCombo_howtouse">
            <h3 className="productCombo_howtouse_title">
              {productCombos?.heading || ""}
            </h3>
            <div className="productCombo_howtouse_card">
              {Array.isArray(productCombos?.items) &&
                productCombos?.items?.length &&
                productCombos?.items?.map((item, index) => (
                  <div
                    style={{
                      border: `2px soid ${item?.header_color}`,
                      backgroundColor: item?.how_to_use_color,
                    }}
                    className="productCombo_howtouse_card_container"
                  >
                    <div
                      style={{ backgroundColor: item?.status_color }}
                      className={`${
                        !index
                          ? "productCombo_howtouse_card_container_status_first"
                          : ""
                      } productCombo_howtouse_card_container_status`}
                    >
                      {item?.status}
                    </div>
                    <div
                      style={{ backgroundColor: item?.header_color }}
                      className="productCombo_howtouse_card_container_header"
                    >
                      {item?.img ? (
                        <div className="productCombo_howtouse_card_container_img">
                          <CachedImage
                            url={item?.img}
                            isNextImage
                            nextImageLayout="fill"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                      <div>
                        <div className="productCombo_howtouse_card_container_header_title">
                          {item?.title || ""}
                        </div>
                        <div className="productCombo_howtouse_card_container_header_quantity">
                          {parse(`${item?.quantity || ""}`)}
                        </div>
                        <div className="productCombo_howtouse_card_container_header_subtitle">
                          {item?.sub_title || ""}
                        </div>
                      </div>
                    </div>
                    <div className="productCombo_howtouse_card_container_body">
                      <div className="productCombo_howtouse_card_container_body_text">
                        {parse(`${item?.how_to_use || ""}`)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* How and when to use */}
        {/* How and when to use section start */}
        <LazyLoad height={200} offset={50}>
          <>
            {(howToUse &&
              Array.isArray(howToUse) &&
              howToUse.length &&
              !newProductVariant?.enable) ||
            (whenTouseNew && !newProductVariant?.enable) ? (
              <>
                <div className="bg_pattren">
                  <div className="plixContainer">
                    <S.Hr className="" />
                  </div>
                  <div className="product__howtoUse__whenToUse">
                    <div className="flex plixContainer flex-wrap">
                      <div className="howtoUse_whentoUse_wrapper">
                        <div className="flex-50 border-right">
                          <h3 className="section-title">How to use</h3>
                          <div className="containers-container-how-to-use">
                            {howToUse &&
                              Array.isArray(howToUse) &&
                              howToUse.map((item, index) => (
                                <CardsContainer
                                  data={item}
                                  containerClass="cards-container-how-to-use"
                                  cardClass="how-to-use-card"
                                  key={index}
                                />
                              ))}
                          </div>
                        </div>
                        {whenTouseNew && (
                          <div className="flex-50 pl-100 container-2x-days">
                            <h3 className="section-title">When to use</h3>
                            <div className="containers-container-how-to-use">
                              <div className="textBorder">
                                <span>{whenTouseNew?.times_unit}</span>{" "}
                                {whenTouseNew?.frequency
                                  ? whenTouseNew?.frequency
                                  : ""}
                              </div>
                              <h5>{whenTouseNew?.consume}</h5>
                              {/* <p>{whenTouseNew?.tip}</p> */}
                            </div>
                          </div>
                        )}
                      </div>
                      {howToUse_video &&
                      howToUse_video?.enable &&
                      howToUse_video?.fw_Playlist_Id &&
                      howToUse_video?.fw_Playlist_Id !== "" ? (
                        <div className="fireworkVideoReelPdp">
                          <FireWorkReelSection
                            channel={fireworkConfig?.channel_name}
                            componentType="storyblock"
                            mode="row"
                            autoplay
                            player_fullscreen="false"
                            playerProps={{
                              player_captions: "false",
                              player_more_menu: "false",
                            }}
                            // hashtag={`(and ${getDBIdFromGraphqlId(product?.id, "Product")})`}
                            playlist={howToUse_video?.fw_Playlist_Id}
                            pip_navigate={false}
                          />
                        </div>
                      ) : howToUse_video?.enable &&
                        howToUse_video?.url &&
                        howToUse_video?.url !== "" ? (
                        <div className="image_wrapper">
                          <video
                            src={howToUse_video?.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </LazyLoad>
        {/* How and when to use section end */}

        {/* Recommend section for mobile starts */}
        {recommendSection && (
          <div className="recommend_section_wrapper recommend_section_mobile">
            {recommendSection?.image ? (
              <div className="recommend_section_image">
                <CachedImage
                  url={recommendSection?.image}
                  isNextImage
                  imageDimensions={{ height: 100, width: 100 }}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="recommend_section_text">
              <NextParser
                data={recommendSection?.text}
                containerClass="recommend_section_att"
              />
            </div>
          </div>
        )}
        {/* Recommend section for mobile ends */}

        {/* Faster Result Section start  */}
        <ReactVisibilitySensor
          partialVisibility
          onChange={inViewport => {
            if (inViewport && !triggerFasterResultsCall) {
              setTriggerFasterResultsCall(true);
            }
          }}
        >
          {relatedProducts &&
          !isPerfumePdp &&
          Array.isArray(relatedProducts) &&
          relatedProducts?.length > 0 ? (
            <LazyLoad height={400} offset={200}>
              <RelatedProducts
                fastResultProducts={fastResultProducts}
                product={product}
                heading={crossSellConfig?.heading}
                relatedProducts={relatedProducts}
                popupstateHandler={popupstateHandler}
              />
            </LazyLoad>
          ) : (
            <></>
          )}
        </ReactVisibilitySensor>
        {/* Faster Result Section end  */}

        {/* Do's and Don't section start  */}
        {DosandDontSection && DosandDontSection?.enable ? (
          <div className="product__dosandDont">
            {DosandDontSection?.backgroundImage ? (
              <div className="product__dosandDont__background">
                <CachedImage
                  url={DosandDontSection?.backgroundImage}
                  isNextImage
                  imageDimensions={{
                    width: 360,
                    height: 520,
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            <h3 className="section-title">
              {DosandDontSection?.heading || "Do's & Dont's"}
            </h3>
            {DosandDontSection?.data &&
            Array.isArray(DosandDontSection?.data) ? (
              <div className="product__dosandDont__container">
                {DosandDontSection?.data?.map((items, index) => (
                  <div key={index}>
                    <div className="product__dosandDont__icon">
                      {items?.type === "do" ? (
                        <div className="product__dosandDont__icon__tick">
                          <MemoNewTransformationTick />
                        </div>
                      ) : items?.type === "dont" ? (
                        <div className="product__dosandDont__icon__close">
                          <MemoNewTransformationClose />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="product__dosandDont__text">
                      {items?.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* Do's and Don't section end  */}
        {/* Recommend section for desktop starts */}
        {recommendSection && (
          <div className="recommend_section_wrapper recommend_section_desktop">
            {recommendSection?.image ? (
              <div className="recommend_section_image">
                <CachedImage
                  url={recommendSection?.image}
                  isNextImage
                  imageDimensions={{ height: 100, width: 100 }}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="recommend_section_text">
              <NextParser
                data={recommendSection?.text}
                containerClass="recommend_section_att"
              />
            </div>
          </div>
        )}
        {/* Recommend section for desktop ends */}
        {compareSection && (
          <div className="comparision_wrapper">
            <div
              className={`inner_comparision_section ${
                isPerfumePdp ? "inner_comparision_section_perfume" : ""
              }`}
            >
              <span>us vs them</span>
              <p>{compareSection?.product_name}</p>
              <h3>
                {compareSection?.subtitle}
                {compareSection?.subtitle_emoji ? (
                  <div>
                    <CachedImage
                      url={compareSection?.subtitle_emoji}
                      isNextImage
                      nextImageLayout="fill"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </h3>
              <div className="product_image_wrapper">
                <div
                  className={`product_image ${
                    isPerfumePdp ? "product_image_perfume" : ""
                  }`}
                >
                  <CachedImage
                    url={compareSection?.plix_product_image}
                    isNextImage
                    nextImageLayout="fill"
                    alt="cola"
                    nextImageObjectFit="contain"
                  />
                </div>
                <div
                  className={`product_image ${
                    isPerfumePdp ? "product_image_perfume" : ""
                  }`}
                >
                  <CachedImage
                    url={compareSection?.other_product_image}
                    isNextImage
                    alt="Apple Cider Vinegar"
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </div>
                <div className="comparision_text">
                  <div className="text_wrapper">VS</div>
                </div>
              </div>
              <div className="pros_cons_wrapper">
                {/* <div className="cons_wrapper">
                  {compareSection?.plix_product_feature?.map((item, i) => (
                    <div className="cons" key={i}>
                      <div>
                        <MemoConsIcon />
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <div className="pros_wrapper">
                  {compareSection?.other_product_feature?.map((item, i) => (
                    <div className="cons" key={i}>
                      <div>
                        <MemoProsIcon />
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div> */}
                {compareSectionDataUpdate?.map((item, index) => (
                  <>
                    {index % 2 == 0 ? (
                      <div className="cons cons_wrapper" key={index}>
                        <div>
                          <MemoConsIcon />
                        </div>
                        <p>{item}</p>
                      </div>
                    ) : (
                      <div className="cons pros_wrapper" key={index}>
                        <div>
                          <MemoProsIcon />
                        </div>
                        <p>{item}</p>
                      </div>
                    )}
                  </>
                ))}
              </div>
              {isPerfumePdp ? (
                <div className="product_text">{compareSection?.subtext}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        {!compareSection && (
          <LazyLoad height={100} offset={350}>
            {compareSectionData && (
              <CompareSection compareSectionData={compareSectionData} />
            )}
          </LazyLoad>
        )}
        {/* where to use Section  */}
        {whereToUseSection ? (
          <div className="container perfumeDetails__wtuse">
            <ProductHeader
              headerClass="df"
              heading={whereToUseSection?.title || "Where to use"}
            />
            {whereToUseSection?.mob_image ? (
              <div className="perfumeDetails__wtuse_mob_image">
                <CachedImage
                  isNextImage
                  url={whereToUseSection?.mob_image}
                  nextImageLayout="fill"
                  imgixSizes="80vw"
                />
              </div>
            ) : (
              <></>
            )}
            {whereToUseSection?.desk_image ? (
              <div className="perfumeDetails__wtuse_desk_image">
                <CachedImage
                  isNextImage
                  url={whereToUseSection?.desk_image}
                  nextImageLayout="fill"
                  imgixSizes="60vw"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* where to use Section  */}
        {/* perfume product detail section  */}
        {perfumeProductInformation &&
        perfumeProductInformation?.enable &&
        Array.isArray(perfumeProductInformation?.information) &&
        !!perfumeProductInformation?.information.length ? (
          <>
            <div className="product_info">
              <div className="perfumeDetails_information container ">
                <ProductHeader
                  headerClass="perfumeDetails_information_df"
                  heading={
                    perfumeProductDetails?.heading || "Product Information"
                  }
                />
                <div className="rb-tabs-content-item">
                  <div className="containers-container-product-information">
                    {perfumeProductInformation?.information && (
                      <table className="containers-container-product-information__table">
                        {perfumeProductInformation?.information.map(
                          (info, index) => (
                            <tr
                              className="containers-container-product-information__table__row"
                              key={index}
                            >
                              <td className="containers-container-product-information__table__row__cell1">
                                {info.key}
                              </td>
                              <td className="containers-container-product-information__table__row__cell2">
                                {info.value}
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg_pattren">
              <div className="plixContainer">
                <S.Hr className="" />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {/* perfume product detail section  */}
        {/* Faster Result Section start  */}
        <ReactVisibilitySensor
          partialVisibility
          onChange={inViewport => {
            if (inViewport && !triggerFasterResultsCall) {
              setTriggerFasterResultsCall(true);
            }
          }}
        >
          {relatedProducts &&
          isPerfumePdp &&
          Array.isArray(relatedProducts) &&
          relatedProducts?.length > 0 ? (
            <LazyLoad height={400} offset={200}>
              <RelatedProducts
                fastResultProducts={fastResultProducts}
                product={product}
                heading={crossSellConfig?.perfume_heading}
                isPerfumePdp={isPerfumePdp}
                isPerfumeInformation={perfumeProductInformation?.enable}
                relatedProducts={relatedProducts}
                popupstateHandler={popupstateHandler}
              />
            </LazyLoad>
          ) : (
            <></>
          )}
        </ReactVisibilitySensor>
        {/* Faster Result Section end  */}
        {/* result section start */}
        <>
          {seeResultsNew || seeResults ? (
            <div className="see-results-section">
              <div className="flex plixContainer ">
                {imageComparisonSection && imageComparisonSection?.enable ? (
                  <div className="mobile-hide comparisonSlider_mobile-hide">
                    <ImageComparisonSlider
                      animationCycleDuration={5000}
                      sliderData={imageComparisonSection}
                      animation={true}
                    />
                    <p className="comparisonSlider_mobile-hide_text">
                      {imageComparisonSection?.text || ""}
                    </p>
                  </div>
                ) : (
                  <div className="mobile-hide">
                    <Card
                      content={resultImages[activeResultsTab - 1]}
                      cardClass="results-image"
                    />
                  </div>
                )}
                <div className="see-result-col1">
                  <div className="see-results-section__svg1 hide">
                    <MemoSeeResultsCircles fontSize="100px" />
                  </div>
                  <div className="see-results-section__svg2 hide">
                    <MemoSeeResultsWave fontSize="130px" />
                  </div>

                  <div className="information see-results-r">
                    <ProductHeader
                      headerClass="df"
                      heading="#PlixTransformation"
                    />
                    {imageComparisonSection &&
                    imageComparisonSection?.enable ? (
                      <div className="desktop-hide comparisonSlider_desktop-hide">
                        <ImageComparisonSlider
                          animationCycleDuration={5000}
                          sliderData={imageComparisonSection}
                          animation={true}
                        />
                        <p className="comparisonSlider_desktop-hide_text">
                          {imageComparisonSection?.text || ""}
                        </p>
                      </div>
                    ) : (
                      <div className="desktop-hide">
                        <Card
                          content={resultImages[activeResultsTab - 1]}
                          cardClass="tab-card"
                        />
                      </div>
                    )}
                    <div className="PlixTransformation_info">
                      <div className="PlixTransformation_li">
                        <h4 className="heading">1st Month</h4>
                        <Card
                          content={{ ...firstWeekResult, image: "" }}
                          cardClass="tab-card"
                          isContentArray
                        />
                      </div>
                      <div className="PlixTransformation_li">
                        <h4 className="heading">2nd Month</h4>
                        <Card
                          content={{ ...secondWeekResult, image: "" }}
                          cardClass="tab-card"
                          isContentArray
                        />
                      </div>
                      <div className="PlixTransformation_li">
                        <h4 className="heading">3rd Month</h4>
                        <Card
                          content={{ ...thirdWeekResult, image: "" }}
                          cardClass="tab-card"
                          isContentArray
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
        {/* result section end */}
        {/* review section start */}
        <div className="review_wrapper" id="review-section-wrapper">
          <>
            <>
              <div className="container">
                <ProductHeader
                  headerClass="cutomerReviewHeader"
                  heading="Customer Stories"
                />
              </div>

              <>
                <div className="container review_container">
                  <S.TotalRatingWrapper>
                    <S.TotalRatingContainer>
                      <S.AverageRatingContainer>
                        <S.AverageRating>{averageRating}</S.AverageRating>
                        {!serverside && (
                          <S.Rating>
                            <MyRating
                              showEmptyIconOutlined
                              rating={getRoundedRating(averageRating)}
                              fontSizeSm="16px"
                              color="#FFA227"
                              isReadOnly
                            />
                          </S.Rating>
                        )}
                        <S.ReviewCount>
                          Based on {reviewCount} reviews
                        </S.ReviewCount>
                      </S.AverageRatingContainer>
                      <S.RatingContainerWrapper>
                        {[5, 4, 3, 2, 1].map((item, index) => {
                          return (
                            <S.RatingContainer
                              key={index}
                              onClick={() => {
                                handleReviewChange(null, null, item);
                                // setCurrentReviewRating(item);
                                // setReviewPage(1);
                              }}
                            >
                              <S.Rating>
                                <MyRating
                                  showEmptyIconOutlined
                                  fontSizeSm="18px"
                                  color="#FFA227"
                                  rating={item}
                                  isReadOnly
                                />
                              </S.Rating>
                              <S.ProgressBar
                                isSelected={item === currentReviewRating}
                              >
                                <S.ProgressBarFill
                                  percent={getRatingPercentage(
                                    rating_distribution,
                                    item
                                  )}
                                />
                              </S.ProgressBar>
                              <S.RatingPercentage
                                style={{
                                  display: "flex",
                                  minWidth: "60px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                  {Number(
                                    getRatingPercentage(
                                      rating_distribution,
                                      item
                                    )
                                  ).toFixed(0)}
                                  %
                                </div>
                                <div
                                  style={{
                                    color: "rgba(0, 0, 0, 0.3)",
                                  }}
                                >
                                  {rating_distribution &&
                                  typeof rating_distribution[item] === "number"
                                    ? `(${rating_distribution[item]})`
                                    : ``}
                                </div>
                              </S.RatingPercentage>
                            </S.RatingContainer>
                          );
                        })}
                      </S.RatingContainerWrapper>
                    </S.TotalRatingContainer>

                    <ReviewContainer
                      reviewPage={reviewPage}
                      productId={product.id}
                      productName={product.name}
                      header={false}
                      writeReviewBtnOnly
                      handleReviewChange={handleReviewChange}
                      toggleReviewForm={toggleReviewForm}
                      productReviews={reviewData}
                      reviewFormOpen={openReviewForm}
                    />
                  </S.TotalRatingWrapper>
                </div>

                {openReviewForm ? (
                  <div className="container">
                    <ReviewForm
                      productId={product.id}
                      reviewDataFromQueryParam={reviewFromQueryParam}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {reviewLoading ? (
                  <div className="container review_loader">
                    <CircularProgress />
                  </div>
                ) : (
                  <ReviewContainer
                    reviewPage={reviewPage}
                    productId={product.id}
                    productName={product.name}
                    header={false}
                    toggleReviewForm={toggleReviewForm}
                    productReviews={reviewData}
                    handleReviewChange={handleReviewChange}
                    reviewFilterbyRating={currentReviewRating}
                  />
                )}
              </>
            </>
          </>
        </div>
        {/* review section end */}
        {/* customer stories section start */}
        <LazyLoad height={100} offset={350}>
          {customerStudy && (
            <CustomerStudySection customerStudy={customerStudy} />
          )}
        </LazyLoad>
        {/* customer stories section end */}
        {/* clinically validate section start */}
        <LazyLoad height={100} offset={350}>
          {ingredientsData && (
            <>
              {" "}
              <IngredientSection ingredientsData={ingredientsData} />
              <Gap size="0px" largeScreenSize="30px" />
            </>
          )}
        </LazyLoad>
        {/* clinically validate section end */}
        {/* ---------New Product Sections--------- */}
        <LazyLoad height={100} offset={350}>
          {fullImageSection1 && (
            <>
              <CachedImage
                url={fullImageSection1?.desktopImage}
                className="fullImage_hairfall"
                imgixSizes="50vw"
              />
              <CachedImage
                url={fullImageSection1?.mobileImage}
                className="fullImage_hairfall__mobile"
                imgixSizes="50vw"
              />
              <Gap size="0px" largeScreenSize="30px" />
            </>
          )}
        </LazyLoad>
        <LazyLoad height={100} offset={350}>
          {benefitsSectionData && (
            <>
              <BenefitsSection benefitsData={benefitsSectionData} />
              <Gap size="0px" largeScreenSize="30px" />
            </>
          )}
        </LazyLoad>
        <LazyLoad height={100} offset={350}>
          {rulesSectionData && (
            <RulesSection rulesSectionData={rulesSectionData} />
          )}
        </LazyLoad>
        <>
          {faqData && (
            <div className="faq-section container">
              <div className="flex items-center">
                <ProductHeader headerClass="df" heading="FAQs" />
                <MemoKnefPlix fontSize="100px" />
              </div>
              <FaqAccordian
                eventHeaderName="Faq section - pdp"
                data={faqExpanded ? faqData : faqData}
                accordianClass="accordian"
              />
            </div>
          )}
        </>
        {/* we plant a tree section start */}
        <LazyLoad height={400} offset={350}>
          <S.Hr className="" />
          <PlantATreeSection />
        </LazyLoad>
        {/* we plant a tree section start */}
        {/* {faqData && <FaqSection faqData={faqData} />}
          <LazyLoad height={100} offset={350}>
            {awardSectionData && <AwardSection awardsData={awardSectionData} />}
          </LazyLoad> */}
      </div>
    </>
  );
};

export default React.memo(Page);
