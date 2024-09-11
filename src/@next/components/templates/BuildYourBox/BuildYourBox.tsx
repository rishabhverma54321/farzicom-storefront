import ProductHeader from "@components/molecules/ProductHeader";
import {
  getMetadataValue,
  isBoxProduct,
  parseJson,
  filterOnKey,
  datalayerEventForByb,
  addToCartDataLayer,
  productAddedToCartForByob,
  convertStepsData,
} from "@utils/misc";
import React, { useContext, useEffect, useState, memo } from "react";
import FaqAccordian from "@components/organisms/FaqAccordian";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { CachedImage } from "@components/molecules/CachedImage";
import { useWindowWidth } from "@hooks/useWindowWidth";
import MemoCloseIcon from "@components/atoms/SvgIcons/CloseIcon";
import {
  CheckoutFragment,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import {
  Breadcrumbs,
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { ShopMetaContext } from "@temp/pages/_app";
import { CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MemoBigRightArrow from "@components/atoms/SvgIcons/BigRightArrow";
import { RichTextContent } from "@components/atoms/RichTextContent";
import {
  generateProductUrl,
  getDBIdFromGraphqlId,
  isSameArray,
} from "@temp/core/utils";
import Alert from '@mui/material/Alert';
import { client } from "@temp/client";
import { mediumScreen } from "@styles/constants";
import Card from "@components/molecules/Card";
import Media from "react-media";
import gtmConfig from "Themes/lib/gtmConfig";
import { META_DEFAULTS } from "@temp/themes/plixlifefc/config";
import styles from "./scss/index.module.scss";
import CollectionStepAccordion from "./subComponents/CollectionStepAccordion";
import * as S from "./style";
import {
  TypedCollectionProductsQuery,
  updateMetadataMutation,
} from "./queries";
import { CollectionProducts_collection_products_edges_node } from "./gqlTypes/CollectionProducts";
import ProductDetailPopup from "@components/farzicom-ui-kit/ProductDetailPopup";
import { CollectionProducts } from "./gqlTypes/CollectionProducts";
import { pages } from "gqlTypes/customGlobalTypes";
import { useMessageStateUpdate } from "@temp/MessageContext";
import { canAddToCartPlix } from "@components/organisms/AddToCartSectionPlixlife";
import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import GiftBoxCardDesktop from "./components/GiftBoxCardDesktop";
import GiftBoxCardMob from "./components/GiftBoxCardMob";
import Carousel from "@temp/components/ProductCarousel";
import makeClevertap from "Themes/lib/makeClevertap.js";

export interface IBuildYourBoxProps {
  content: {
    contentJson: any;
    title: string;
    seoDescription: string;
    seoTitle: string;
    slug: string;
    __typename: "Page";
    metadata: { key: string; value: string }[];
  };
  breadcrumbs: any;
  collectionData?: { collectionId: string; data: CollectionProducts }[];
}

interface IStepItem {
  collectionID: string;
  collectionHeader?: string | undefined;
  isFilled: boolean;
  stepNumber: number;
  variant_id: string | null;
  sku: any;
  price: any;
  image?: any;
  name?: any;
  product: CollectionProducts_collection_products_edges_node | null;
}

interface IStepList extends Array<IStepItem> { }

const getInitialSteps = (steps: IStepList, preFilledData?: any) => {
  if (preFilledData && Array.isArray(preFilledData) && !!preFilledData?.length) {
    return (preFilledData?.map((step: any) => {
      return {
        isFilled: true,
        product: null,
        collectionID: step.collectionID,
        stepNumber: step?.stepNumber,
        name: step?.name,
        variant_id: step?.variant_id,
        sku: step?.sku,
        price: step?.price,
        image: step?.image
      }
    }))
  } else {
    return (
      steps &&
      Array.isArray(steps) &&
      steps.map((step, index) => {
        return {
          isFilled: false,
          product: null,
          collectionID: step.collectionID,
          stepNumber: index + 1,
          name: null,
          variant_id: null,
          sku: null,
          price: null,
          image: null
        };
      })
    );
  }
};

export const FaqSection = ({ faqData }: { faqData: any }) => {
  const [faqExpanded, setFaqExpanded] = useState(false);
  return (
    <>
      {faqData && (
        <div className={`${styles.faqSection} faq-section`}>
          <ProductHeader headerClass="df" heading="FAQs" />
          <FaqAccordian
            eventHeaderName="Faq section - byob"
            data={faqExpanded ? faqData : faqData.slice(0, 5)}
            accordianClass="accordian"
          />
          {faqData.length > 5 ? (
            <button
              style={{ margin: "12px auto" }}
              onClick={() => setFaqExpanded(prev => !prev)}
              className="view-more-plix-pdp"
            >
              {faqExpanded ? "View less" : "View more"}
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export const FaqSectionNew = ({ faqData }: { faqData: any }) => {
  const [faqExpanded, setFaqExpanded] = useState(false);
  return (
    <>
      {faqData && (
        <div className={`${styles.faqSection} ${styles.faqSectionNew} faq-section`}>
          <div className="flex items-center">
            <h2 className={styles.faqSection_heading}>FAQs</h2>
            <MemoKnefPlix fontSize="100px" />
          </div>
          <FaqAccordian
            eventHeaderName="Faq section - byob"
            data={faqExpanded ? faqData : faqData.slice(0, 5)}
            accordianClass="accordian"
          />
          {faqData.length > 5 ? (
            <button
              style={{ margin: "12px auto" }}
              onClick={() => setFaqExpanded(prev => !prev)}
              className="view-more-plix-pdp"
            >
              {faqExpanded ? "View less" : "View more"}
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export const TermsAndCondition: React.FC<any> = ({ content, isGiftBox }) => {
  if (content && content?.contentJson) {
    return (
      <div className={`terms-conditions container ${isGiftBox ? styles.termsCondition : ''}`}>
        <RichTextContent
          descriptionJson={content?.contentJson}
          className="plixlife__rich__text"
        />
      </div>
    );
  }

  return <></>;
};

export const Banner1: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Card content={{ image: bannerData?.banner1?.image }} cardClass="" />
          )}
        />

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <Card
              content={{ image: bannerData?.banner1?.imageMobile }}
              cardClass=""
            />
          )}
        />
      </div>
    </>
  );
};
export const Banner2: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Card content={{ image: bannerData?.banner2?.image }} cardClass="" />
          )}
        />

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <Card
              content={{ image: bannerData?.banner2?.imageMobile }}
              cardClass=""
            />
          )}
        />
      </div>
    </>
  );
};
export const Banner3: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Card content={{ image: bannerData?.banner3?.image }} cardClass="" />
          )}
        />

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <Card
              content={{ image: bannerData?.banner3?.imageMobile }}
              cardClass=""
            />
          )}
        />
      </div>
    </>
  );
};
export const BuildYourBox: React.FC<IBuildYourBoxProps> = ({
  content,
  breadcrumbs,
  collectionData,
}) => {
  const { metadata: pageMeta, slug } = content;
  
  const isGiftBox = slug === pages.GIFT_BOX || slug === pages.GIFT_BOX_GALLERY;

  const isGiftBoxGallery = slug === pages.GIFT_BOX_GALLERY;
  const pageHeader =
    pageMeta &&
    getMetadataValue(pageMeta, "pageHeader") &&
    parseJson(getMetadataValue(pageMeta, "pageHeader"));

  const carouselHeader =
    pageMeta &&
    getMetadataValue(pageMeta, "carouselHeader") &&
    parseJson(getMetadataValue(pageMeta, "carouselHeader"));

  const stepsData =
    pageMeta &&
    getMetadataValue(pageMeta, "steps") &&
    parseJson(getMetadataValue(pageMeta, "steps")) && (isGiftBoxGallery ? convertStepsData(parseJson(getMetadataValue(pageMeta, "steps"))) : parseJson(getMetadataValue(pageMeta, "steps")));
  const faqData =
    pageMeta &&
    getMetadataValue(pageMeta, "faqData") &&
    parseJson(getMetadataValue(pageMeta, "faqData"));

  const couponCode =
    pageMeta &&
    getMetadataValue(pageMeta, "couponCode") &&
    parseJson(getMetadataValue(pageMeta, "couponCode"));

  const defaultBoxData =
    pageMeta &&
    getMetadataValue(pageMeta, "default_box") &&
    parseJson(getMetadataValue(pageMeta, "default_box"));

  const giftBoxes =
    pageMeta &&
    getMetadataValue(pageMeta, "gift_boxes") &&
    parseJson(getMetadataValue(pageMeta, "gift_boxes"));

  const productListHeading =
    pageMeta &&
    getMetadataValue(pageMeta, "product_list_heading") &&
    parseJson(getMetadataValue(pageMeta, "product_list_heading"));

  const ShopMetaContextValue = useContext(ShopMetaContext);
  const [width] = useWindowWidth();

  const personalisedBoxConfigNew =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "personalised_box_config_new") &&
    parseJson(
      getMetadataValue(ShopMetaContextValue, "personalised_box_config_new")
    );

  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  const giftBoxConfig =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "gift_box_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "gift_box_config"));

  const [defaultBox, setDefaultBox] = useState(defaultBoxData?.default || "");

  const [updatedCollectionData, setUpdatedCollectionData] = useState(
    isGiftBox
      ? collectionData[defaultBox || "giftBox_4"]
      : collectionData
  );

  const personalisedBoxConfig = isGiftBox
    ? giftBoxConfig &&
    typeof giftBoxConfig === "object" &&
    giftBoxConfig[defaultBox]
    : personalisedBoxConfigNew &&
    typeof personalisedBoxConfigNew === "object" &&
    personalisedBoxConfigNew[content?.slug];

  const variantId = personalisedBoxConfig?.variant_id;

  const initialCollectionData =
    updatedCollectionData &&
    Array.isArray(updatedCollectionData) &&
    updatedCollectionData[0]?.data;

  const { items } = useCartState();
  const { user } = useAuthState();
  const { checkout, promoCodeDiscount, useCashback } = useCheckoutState();

  const messageUpdate = useMessageStateUpdate();
  const getIntialGiftBoxData = () => {
    const isBoxAlreadyAdded = items?.findIndex((item) => item?.variant?.id === variantId)
    const boxItem = checkout?.metadata &&
      (getMetadataValue(checkout?.metadata, "byobItems") &&
        parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
      [];
    const findBox: any = Array.isArray(boxItem) &&
      boxItem?.findIndex(item => item?.boxType === defaultBox)

    if (isBoxAlreadyAdded !== -1 && findBox !== -1) {
      return getInitialSteps(stepsData[defaultBox || "giftBox_4"], boxItem[findBox]?.items)
    }
    return getInitialSteps(stepsData[defaultBox || "giftBox_4"])
  }

  const initialStepsData = isGiftBox
    ? getIntialGiftBoxData()
    : getInitialSteps(stepsData);
  const [currentCollectionData, setCurrentCollectionData] = useState<any>(
    initialCollectionData
  );
  const [steps, setSteps] = useState<IStepList>(initialStepsData || []);
  const [currentStep, setCurrentStep] = useState<IStepItem>(
    initialStepsData && initialStepsData[0]
  );
  const [atcDisabled, setAtcDisabled] = useState<boolean>(true);

  const [alreadyInCart, setAlreadyInCart] = useState<boolean>(
    items.some(item => isBoxProduct(item))
  );

  const [updateBox, setUpdateBox] = useState<boolean>(false);
  const [addingToCart, setAddingToCart] = React.useState<string>("");
  const [boxLimitAlert, setBoxLimitAlert] = React.useState<string>("");
  const [productdata, setproductdata] = React.useState(null);
  const [popupstate, setpopupstate] = React.useState(false);
  let removeItemClicked = false;

  const { updateItemWithLinesRest, addToCartNext, addToCartRest } = useCart();
  const {
    createCheckout,
    removePromoCode,
    addPromoCode,
    checkoutPaymentMethodUpdate,
    updateCheckoutMeta,
  } = useCheckout();

  const popupstateHandler = product => {
    setproductdata(product);
    setpopupstate(true);
  };

  useEffect(() => {
    if (currentStep?.collectionID && Array.isArray(updatedCollectionData)) {
      const newCollection = updatedCollectionData?.find(
        item => item?.data?.collection?.id === currentStep?.collectionID
      );
      if (newCollection) {
        setCurrentCollectionData(newCollection?.data);
      }
    }
  }, [currentStep?.collectionID]);

  useEffect(() => {
    if (giftBoxes) {
      setCurrentStep(initialStepsData && initialStepsData[0]);
      setSteps(initialStepsData);
    }
  }, [defaultBox]);

  const { show } = useContext(OverlayContext);
  useEffect(() => {
    if (checkout?.metadata && items) {
      // Check if the current box combo is already in cart
      const metaData = checkout?.metadata;
      const boxItem =
        (getMetadataValue(metaData, "byobItems") &&
          parseJson(getMetadataValue(metaData, "byobItems"))) ||
        [];
      const findBox = isGiftBox
        ? boxItem.filter(list => list?.boxType === defaultBox)
        : boxItem.filter(list => list?.boxType === slug);
      let boxItemVariantIds: string[] = [];
      if (items.filter(item => item?.variant?.id === variantId).length) {
        !!findBox.length &&
          findBox[0]?.items &&
          findBox[0]?.items?.forEach(item => {
            boxItemVariantIds = [...boxItemVariantIds, item?.variant_id];
          });
      }
      const isAlreadyInCart = isSameArray(
        boxItemVariantIds,
        steps.map(step => step.variant_id)
      );

      setAlreadyInCart(isAlreadyInCart);
      const isMainProductInCart = items?.filter(
        item => item?.variant?.id === variantId
      ).length;
      setUpdateBox(
        !!findBox?.length &&
        findBox[0]?.items &&
        !!findBox[0]?.items?.length &&
        !isAlreadyInCart &&
        !!isMainProductInCart
      );
    }
  }, [checkout?.metadata, steps, items]);

  useEffect(() => {
    // Disable atc button until every step is filled.
    if (steps.every(step => step.isFilled && step.variant_id)) {
      setAtcDisabled(false);
      const totalPriceByb = steps.map(step => step?.product?.defaultVariant?.pricing?.price.net.amount)
        .reduce((price, currValue) => price + currValue, 0);
      sessionStorage.setItem("bybTotalPrice", totalPriceByb)
    } else {
      sessionStorage.removeItem("bybTotalPrice");
      setAtcDisabled(true);
    }
  }, [steps]);

  useEffect(() => {
    isGiftBox && setDefaultBox(defaultBoxData?.default)
    const updatedCollection = isGiftBox
      ? collectionData[defaultBoxData?.default || "giftBox_4"]
      : collectionData
    setSteps(initialStepsData);
    setUpdatedCollectionData(updatedCollection)
    setCurrentCollectionData(updatedCollection &&
      Array.isArray(updatedCollection) &&
      updatedCollection[0]?.data || []);


    return () => {
      setSteps([]);
      setCurrentStep(initialStepsData && initialStepsData[0]);
      setCurrentCollectionData({});
      setUpdatedCollectionData([])
    };
  }, [slug]);

  const onStepClick = (step: IStepItem) => {
    if (removeItemClicked) {
      removeItemClicked = false;
      return;
    }
    setCurrentStep(step);
  };

  const onAddtoBox = (
    variant_id: string,
    product: CollectionProducts_collection_products_edges_node,
    limitInBox: number | string
  ) => {
    const canAddToBox =
      typeof limitInBox === "undefined" ||
      limitInBox >
      steps?.filter(step => step?.variant_id === variant_id)?.length;

    if (canAddToBox) {
      setSteps(prevSteps => {
        const updatedSteps = prevSteps.map(prev_step => {
          if (prev_step.stepNumber == currentStep?.stepNumber) {
            return {
              ...prev_step,
              isFilled: true,
              product,
              variant_id,
              price: product?.defaultVariant?.pricing?.priceUndiscounted?.net
                ?.amount,
              name: product?.name,
              sku: findUniCommerceSku(product?.defaultVariant),
              image: product?.thumbnail?.url || ""
            };
          }
          return prev_step;
        });

        const filledSteps = updatedSteps.filter(step => step.isFilled);
        const blankSteps = updatedSteps.filter(step => !step.isFilled);

        const newSteps = filledSteps.concat(blankSteps).map((step, index) => ({
          ...step,
          stepNumber: index + 1
        }));

        const nextInCompleteStep = newSteps?.find(
          step => !step.isFilled
        );

        if (nextInCompleteStep) {
          removeItemClicked = true;
          setCurrentStep(nextInCompleteStep);
        }

        return newSteps;
      });
    } else if (limitInBox && product?.name) {
      setBoxLimitAlert(
        `You can add atmost ${limitInBox} ${product?.name} on this box.`
      );
    }
  };

  const onRemoveFromBox = (step_number: number) => {
    setSteps(prevSteps => {
      const updatedSteps = prevSteps.map(prev_step => {
        if (prev_step.stepNumber === step_number) {
          return {
            ...prev_step,
            isFilled: false,
            product: null,
            variant_id: null,
            sku: null,
            price: null,
            name: null,
            image: null
          };
        }
        return prev_step;
      });

      const filledSteps = updatedSteps.filter(step => step.isFilled);
      const blankSteps = updatedSteps.filter(step => !step.isFilled);

      const newSteps = filledSteps.concat(blankSteps).map((step, index) => ({
        ...step,
        stepNumber: index + 1
      }));

      const nextInCompleteStep = newSteps?.find(
        step => !step.isFilled
      );

      if (nextInCompleteStep) {
        removeItemClicked = true;
        setCurrentStep(nextInCompleteStep);
      }

      return newSteps;
    });
  };

  // To Add Coupon code
  const handleAddCoupon = async () => {
    if (
      content?.slug !== pages?.BUILD_YOUR_BOX &&
      typeof couponCode === "string"
    ) {
      try {
        const { data, errors } = await addPromoCode(couponCode, false, true);
      } catch (err) {
        console.log("Error in adding coupon", err);
      }
    }
  };

  // Remove cashback and coupon.
  const handleCouponAndCashbackRemove = async () => {
    if (promoCodeDiscount && promoCodeDiscount?.voucherCode) {
      try {
        const res = await removePromoCode(promoCodeDiscount?.voucherCode);
      } catch (error) {
        console.log("Error in removing coupon", error);
      }
    }
    await checkoutPaymentMethodUpdate(
      {
        gateway: "mirumee.payments.razorpay",
        useCashback: false,
      },
      false,
      isRecalculate
    );
  };

  const findUniCommerceSku = (defaultVaraint: any) => {
    const metadata = defaultVaraint.metadata;
    const unicommercerSku =
      metadata &&
      getMetadataValue(metadata, "unicommerce_sku") &&
      parseJson(getMetadataValue(metadata, "unicommerce_sku"));
    return unicommercerSku || defaultVaraint?.sku;
  };

  // Function to save the box combination (variant_id and step number) in checkout meta.
  const addBoxItemsInCheckoutMeta = async (
    updated_checkout?: CheckoutFragment,
    ctType?: string
  ) => {
    const c_id = updated_checkout?.id || checkout?.id;
    const metaData = checkout?.metadata;
    const mainProductlines = updated_checkout?.lines?.filter(
      line => line.variant.id === variantId
    )[0]?.variant;
    const boxItem =
      (getMetadataValue(metaData, "byobItems") &&
        parseJson(getMetadataValue(metaData, "byobItems"))) ||
      [];
    const findBox = isGiftBox
      ? Array.isArray(boxItem) &&
      boxItem?.findIndex(item => item?.boxType === defaultBox)
      : Array.isArray(boxItem) &&
      boxItem?.findIndex(item => item?.boxType === slug);

    let newBoxItem = [...boxItem];
    if (findBox !== -1) {
      newBoxItem[findBox] = {
        boxType: isGiftBox ? defaultBox : slug,
        boxItemSKU: personalisedBoxConfig?.sku || "",
        items: steps.map(step => ({
          variant_id: step.variant_id,
          stepNumber: step.stepNumber,
          sku: step?.product ? findUniCommerceSku(step?.product?.defaultVariant) : step?.sku,
          price:
            step?.product?.defaultVariant?.pricing?.priceUndiscounted?.net
              ?.amount || step?.price,
          name: step?.product?.name || step?.name,
          image: step?.image,
          collectionID: step?.collectionID
        })),
      };
    } else {
      newBoxItem.push({
        boxType: isGiftBox ? defaultBox : slug,
        boxItemSKU: personalisedBoxConfig?.sku || "",
        items: steps.map(step => ({
          variant_id: step.variant_id,
          stepNumber: step.stepNumber,
          sku: step?.product ? findUniCommerceSku(step?.product?.defaultVariant) : step?.sku,
          price:
            step?.product?.defaultVariant?.pricing?.priceUndiscounted?.net
              ?.amount || step?.price,
          name: step?.product?.name || step?.name,
          image: step?.image,
          collectionID: step?.collectionID
        })),
      });
    }

    if (c_id) {
      try {
        const response = await updateCheckoutMeta([
          {
            key: "byobItems",
            value: JSON.stringify(newBoxItem),
          },
        ]);

        if (response?.data?.updateMetadata?.item) {
          const boxItemLines = isGiftBox
            ? newBoxItem?.filter(item => item?.boxType === defaultBox)[0]
            : newBoxItem?.filter(item => item?.boxType === slug)[0];
          productAddedToCartForByob(mainProductlines, boxItemLines);
          datalayerEventForByb(
            "add",
            mainProductlines,
            user,
            boxItemLines,
            ctType
          );
        }
      } catch (err) {
        console.log("updatemetadataerror", err);
      }
      // const updatedCheckoutMeta =
      //   response?.data?.updateMetadata?.item?.metadata;
      // if (updatedCheckoutMeta) {
      //   if (updated_checkout) {
      //     setCheckout({ ...updated_checkout, metadata: updatedCheckoutMeta });
      //   } else if (checkout) {
      //     setCheckout({ ...checkout, metadata: updatedCheckoutMeta });
      //   }
      // }
    }
  };

  const addtoFarziTracker = variant => {
    const product = variant?.product;
    const currentVariant = variant;
    addToCartTrack(ShopMetaContextValue, {
      product_name: product?.name,
      product_id: product?.id,
      quantity: 1,
      product_price: currentVariant?.pricing?.price?.gross?.amount,
      currency: currentVariant?.pricing?.price?.gross?.currency,
      variant: currentVariant?.name,
    });
  };

  const addToDatalayer = checkout => {
    const trackingId = getMetadataValue(checkout?.metadata, "tracking_id");
    const lines = checkout?.lines;
    const productUrls = lines
      ?.map(line => {
        const product = line?.variant?.product;
        const product_url = generateProductUrl(
          product?.id,
          product?.name,
          product?.slug
        );
        return product_url;
      })
      ?.join(",");

    const manufacturers = lines
      ?.map(line => {
        const productDetails =
          getMetadataValue(
            line?.variant?.product?.metadata,
            "product_details"
          ) &&
          parseJson(
            getMetadataValue(
              line?.variant?.product?.metadata,
              "product_details"
            )
          );
        const manufacturedBy = filterOnKey(
          productDetails?.product_information,
          "Manufactured By"
        );
        return manufacturedBy;
      })
      ?.join(",");

    const all_attributes = lines
      ?.map(line => {
        const attributes = line?.variant?.attributes?.map((item: any) => {
          return `${item?.attribute?.name} - ${item?.values[0]?.name}`;
        });
        return attributes;
      })
      ?.join(",");

    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
    }
    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig.addedToCart.value,
      ecommerce: {
        currencyCode: "INR",
        add: {
          products: [
            {
              name: lines?.map(line => line?.variant?.product?.name)?.join(","),
              id: lines
                ?.map(line =>
                  getDBIdFromGraphqlId(line?.variant?.product?.id, "Product")
                )
                ?.join(","),
              price: personalisedBoxConfig?.price,
              mrp: lines
                ?.map(line => line?.variant?.pricing?.price?.gross?.amount)
                ?.join(","),
              quantity: lines?.map(line => line?.quantity)?.join(","),
              brand: META_DEFAULTS.name,
              manufacturedBy: manufacturers,
              countryOfOrigin: "INDIA",
              sku: lines?.map(line => line?.variant?.sku)?.join(","),
              attributes: all_attributes,
              category: lines
                ?.map(line => line?.variant?.product?.category?.name)
                ?.join(","),
              image_url: lines
                ?.map(line => line?.variant?.product?.thumbnail?.url)
                ?.join(","),
              product_url: productUrls,
            },
          ],
          trackingId,
        },
      },
    });
  };

  const onAddtoCart = async () => {
    setAddingToCart("Adding to cart...");

    // If personalised box is already in cart, update its items.
    if (updateBox) {
      // Update the box in cart
      let linesToAppend: { variantId: string; quantity: number }[] = [];

      // Remove box products which are not present in new box
      items
        .filter(
          item =>
            isBoxProduct(item) &&
            steps.every(step => step.variant_id !== item.variant.id)
        )
        .map(item => {
          linesToAppend.push({
            variantId: item.variant?.id,
            quantity: 0,
          });
        });
      // Add new products .
      steps.map(step => {
        if (linesToAppend.find(line => line.variantId === step.variant_id)) {
          linesToAppend = linesToAppend.map(line => ({
            ...line,
            quantity:
              line?.variantId === step.variant_id
                ? line.quantity + 1
                : line.quantity,
          }));
        } else {
          linesToAppend.push({
            variantId: step.variant_id,
            quantity: 1,
          });
        }
      });
      try {
        const res: any = { data: checkout, error: [] };
        await addBoxItemsInCheckoutMeta(checkout, "update_box");
        const mainProductlines = checkout?.lines?.filter(
          line => line.variant.id === variantId
        )[0]?.variant;
        // Freebie product with byob
        const variantMetaData = mainProductlines?.metadata || [];

        const freebieData =
          getMetadataValue(variantMetaData, "freebie_includes") &&
          parseJson(getMetadataValue(variantMetaData, "freebie_includes"));

        const freebieAlreadyPresent =
        (checkout?.lines &&
          checkout?.lines?.length &&
          freebieData?.enable &&
          checkout?.lines?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
        false;

        if (
          freebieData?.enable &&
          freebieData?.variant_id &&
          !freebieAlreadyPresent
        ) {
          const freebieRes = await addToCartRest(
            freebieData?.variant_id,
            1,
            undefined,
            null,
            false,
            isRecalculate
          );
          if (!freebieRes?.errors?.length) {
            const freebieLines = freebieRes?.data?.lines?.filter(
              line => line.variant.id === freebieData?.variant_id
            )[0];
            addtoFarziTracker(freebieLines?.variant);
            addToCartDataLayer(
              res,
              freebieLines?.variant?.product,
              freebieData?.variant_id,
              freebieLines
            );
          }
        } 
        // Freebie product with byob
        addtoFarziTracker(mainProductlines);
        handleCouponAndCashbackRemove();
        // await handleAddCoupon()
        show(OverlayType.plixlifefcCart, OverlayTheme.right);
        setAddingToCart("");
      } catch (error) {
        console.error(error);
        setAddingToCart("");
      }
      return;
    }
    const linesToAdd: any[] = [];
    steps.map(step => {
      const lineIndex = linesToAdd.findIndex(
        line => line.variantId == step.variant_id
      );
      if (lineIndex !== -1) {
        linesToAdd[lineIndex].quantity++;
      } else {
        linesToAdd.push({
          variantId: step.variant_id,
          quantity: 1,
        });
      }
    });

    const metaData = checkout?.metadata;
    const boxItem =
      (getMetadataValue(metaData, "byobItems") &&
        parseJson(getMetadataValue(metaData, "byobItems"))) ||
      [];
    const findBox = isGiftBox
      ? Array.isArray(boxItem) &&
      boxItem?.findIndex(item => item?.boxType === defaultBox)
      : Array.isArray(boxItem) &&
      boxItem?.findIndex(item => item?.boxType === slug);

    let newBoxItemUpdate = [...boxItem];
    if (findBox !== -1) {
      newBoxItemUpdate[findBox] = {
        boxType: isGiftBox ? defaultBox : slug,
        boxItemSKU: personalisedBoxConfig?.sku || "",
        items: steps.map(step => ({
          variant_id: step.variant_id,
          stepNumber: step.stepNumber,
          sku: step?.product ? findUniCommerceSku(step?.product?.defaultVariant) : step?.sku,
          price:
            step?.product?.defaultVariant?.pricing?.priceUndiscounted?.net
              ?.amount || step?.price,
          name: step?.product?.name || step?.name,
          image: step?.image || step?.image,
          collectionID: step?.collectionID
        })),
      };
    } else {
      newBoxItemUpdate.push({
        boxType: isGiftBox ? defaultBox : slug,
        boxItemSKU: personalisedBoxConfig?.sku || "",
        items: steps.map(step => ({
          variant_id: step.variant_id,
          stepNumber: step.stepNumber,
          sku: step?.product ? findUniCommerceSku(step?.product?.defaultVariant) : step?.sku,
          price:
            step?.product?.defaultVariant?.pricing?.priceUndiscounted?.net
              ?.amount || step?.price,
          name: step?.product?.name || step?.name,
          image: step?.image || step?.image,
          collectionID: step?.collectionID
        })),
      });
    }

    const updatedCheckoutMeta = [
      {
        key: "byobItems",
        value: JSON.stringify(newBoxItemUpdate),
      },
    ];

    try {
      const res = await addToCartRest(
        variantId,
        1,
        undefined,
        null,
        false,
        isRecalculate,
        updatedCheckoutMeta
      );
      // if (!(checkout && checkout.token)) {
      //    res = await addToCartNext(variantId, 1, undefined, null, false);
      //   if (res?.data) {
      //     addBoxItemsInCheckoutMeta(
      //       res?.data,
      //       "add_to_cart"
      //     );
      //   }
      // } else {
      //   addBoxItemsInCheckoutMeta(checkout, "add_to_cart");
      //   res = await addToCartNext(variantId, 1, undefined, null, false);
      // }
      if (res?.errors?.length && res?.errors[0]?.code) {
        messageUpdate(res?.errors[0]?.code, "error");
        setAddingToCart("");
      } else {
        const token = res?.data?.token || null
        const boxItemLines = isGiftBox
          ? newBoxItemUpdate?.filter(item => item?.boxType === defaultBox)[0]
          : newBoxItemUpdate?.filter(item => item?.boxType === slug)[0];

        const resLines = res?.data?.lines || [];

        const mainProductlines = res?.data?.lines?.filter(
          line => line.variant.id === variantId
        )[0]?.variant;
        const variantMetaData = mainProductlines?.metadata || []; 

        // Freebie product with byob
        const freebieData =
        getMetadataValue(variantMetaData, "freebie_includes") &&
        parseJson(getMetadataValue(variantMetaData, "freebie_includes"));

        const freebieAlreadyPresent =
        (resLines &&
          resLines?.length &&
          freebieData?.enable &&
          resLines?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
        false;

        if (
          freebieData?.enable &&
          freebieData?.variant_id &&
          !freebieAlreadyPresent
        ) {
          const freebieRes = await addToCartRest(
            freebieData?.variant_id,
            1,
            undefined,
            null,
            false,
            isRecalculate
          );
          if (!freebieRes?.errors?.length) {
            const freebieLines = freebieRes?.data?.lines?.filter(
              line => line.variant.id === freebieData?.variant_id
            )[0];
            addtoFarziTracker(freebieLines?.variant);
            addToCartDataLayer(
              res,
              freebieLines?.variant?.product,
              freebieData?.variant_id,
              freebieLines
            );
          }
        }
        // Freebie product with byob
        addtoFarziTracker(mainProductlines);
        productAddedToCartForByob(mainProductlines, boxItemLines);
        datalayerEventForByb(
          "add",
          mainProductlines,
          user,
          boxItemLines,
          "add_to_cart"
        );
        if (token) {
          const url = `/checkout/address?token=${token}`;
          const clevertap = makeClevertap();
          clevertap.profile.push({
              Site: {
                farzicom_checkout_url: url,
              },
            });
            console.log("responseToken",url)
          }
        handleCouponAndCashbackRemove();
        // await handleAddCoupon();
        show(OverlayType?.plixlifefcCart, OverlayTheme?.right);
        setAddingToCart("");
      }
    } catch (error) {
      console.error("buildyourboxx", error);
      setAddingToCart("");
    }
  };

  const StepList = memo(() => {
    const isByobForFive =
      content?.slug === pages?.BUILD_YOUR_BOX_5 || defaultBox === "giftBox_5";
    return (
      <div className={`${styles.steplistContainer} container`}>
        <div className={styles.stepList}>
          {steps.map((stepItem, index) => {
            const isSelected = currentStep?.stepNumber == stepItem?.stepNumber;
            return (
              <div
                className={`${styles.stepWrapper} ${isSelected ? styles.selectedStep : ""
                  }`}
                onClick={() => {
                  onStepClick(stepItem);
                }}
              >
                {stepItem?.isFilled && (stepItem?.product?.thumbnail?.url || stepItem?.image) ? (
                  <div className={styles.completedStep}>
                    <span onClick={() => onRemoveFromBox(stepItem?.stepNumber)}>
                      {isByobForFive ? (
                        <MemoCloseIcon width="20" height="20" />
                      ) : (
                        <MemoCloseIcon width="24" height="24" />
                      )}
                    </span>
                    <CachedImage
                      url={stepItem?.product?.thumbnail?.url || stepItem?.image}
                      className={`${isByobForFive
                        ? styles.in_box_imagePreview_forFive
                        : styles.in_box_imagePreview
                        }`}
                        imageDimensions={{ height: 100, width: 100 }}
                    />
                  </div>
                ) : (
                  <div
                    className={`${isByobForFive ? styles.incompleteStep_forFive : ""
                      } ${styles.incompleteStep}`}
                  >
                    <span className={styles.incompleteStep_item_mob}>
                      Item {index + 1}
                    </span>
                    <span className={styles.incompleteStep_item_desk}>
                      {index + 1}
                    </span>
                  </div>
                )}
                <span className={styles.stepText}>
                  Select your
                  <S.StepText selected={isSelected}>
                    Item {index + 1}
                  </S.StepText>
                </span>
              </div>
            );
          })}
          <div className={styles.stepLine} />
        </div>
        <div className={styles.atcOnSteplist}>
          <span className={styles.arrow}>
            <MemoBigRightArrow />
          </span>
          <S.AddtoCartButton
            padding="12px 0 13px 0"
            disabled={addingToCart || alreadyInCart || atcDisabled}
            onClick={() => onAddtoCart()}
          >
            {atcButtonText}
          </S.AddtoCartButton>
        </div>
      </div>
    );
  });

  const atcButtonText = updateBox
    ? "Update box"
    : alreadyInCart
      ? "Added in Cart"
      : "Add To Cart";

  const totalUndiscountedPrice = typeof window !== "undefined" && sessionStorage.getItem("bybTotalPrice");
  const savingAmount = totalUndiscountedPrice && personalisedBoxConfig?.price ?
    totalUndiscountedPrice - personalisedBoxConfig?.price : 0

    return (
    <>
      <Banner1 metadata={pageMeta} />
      <Banner2 metadata={pageMeta} />
      {popupstate && (
        <div className="productDetailPopup-pdp">
          <ProductDetailPopup
            productdata={productdata}
            setpopupstate={setpopupstate}
            popupFor="byob"
            buildYourBoxButtonProps={{
              addtoBoxButtonText: "Add To Box",
              addtoBoxOnClickHandler: (v_id, product) => {
                const limitInBox =
                  product?.defaultVariant?.metadata &&
                  getMetadataValue(
                    product?.defaultVariant?.metadata,
                    "limit_in_box"
                  ) &&
                  parseJson(
                    getMetadataValue(
                      product?.defaultVariant?.metadata,
                      "limit_in_box"
                    )
                  );
                const canAddtoCart = canAddToCartPlix(
                  items,
                  !!product.isAvailableForPurchase,
                  v_id,
                  product?.defaultVariant?.quantityAvailable,
                  1
                )
                if (canAddtoCart === false) {
                  const notifyMeContext: InnerOverlayContextInterface = {
                    data: product?.id,
                  };
                  show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
                } else {
                  onAddtoBox(v_id, product, limitInBox);
                }
              },
              canAddtoCart: canAddToCartPlix(
                items,
                !!productdata?.isAvailableForPurchase,
                productdata?.defaultVariant && productdata?.defaultVariant?.id,
                productdata?.defaultVariant?.quantityAvailable,
                1
              ),
              removeFromBoxButtonText: "Remove From Box",
              removeFromBoxClickHandler: (v_id, product) => {
                onRemoveFromBox(currentStep?.stepNumber);
              },
              steps: steps ? steps.map(step => ({
                v_id: step.variant_id,
                step_no: step.stepNumber,
              })) : [],
              current_step_no: currentStep?.stepNumber,
            }}
          />
        </div>
      )}
      {
        !isGiftBoxGallery && <div className={`${styles.breadcrumbs} container`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      }
      <div className={styles.pageHeaderWrapper}>
        <ProductHeader heading={pageHeader} headerClass={styles.pageHeader} />
      </div>
      {isGiftBox &&
        giftBoxes &&
        Array.isArray(giftBoxes) &&
        !!giftBoxes?.length ?
        isGiftBoxGallery ?
          (
            <>
              <div className={styles.giftBoxHeader}>
                <div className={`${styles.byobProductList} container`}>
                  <div className={styles.byobGalleryHeading}>
                    {carouselHeader?.head || "Build your own box with Plix"}
                  </div>
                  <div className={styles.byobGalleryText}>
                    {carouselHeader?.subHead || "Choose any Build Your Own Box below and unlock huge savings on your favorite Plix products! 😍"}
                  </div>

                  <Carousel
                    slidesOnMobile={2}
                    slidesOnTab={2}
                    slidesOnDesktop={2}
                    desktopCarouselProps={{
                      arrows: false,
                      dots: true,
                      infinite: false,
                    }}
                    mobileCarouselProps={{
                      arrows: false,
                      dots: true,
                      infinite: false,
                    }}
                    tabCarouselProps={{
                      arrows: false,
                      dots: true,
                      infinite: false,
                    }}
                  >
                    {giftBoxes?.map(item => (
                      <div>
                        <div className={styles.giftBoxHeader_card_desk}>
                          <GiftBoxCardDesktop
                            item={item}
                            defaultBox={defaultBox}
                            setDefaultBox={setDefaultBox}
                            collectionData={collectionData}
                            setUpdatedCollectionData={setUpdatedCollectionData} />
                        </div>
                        <div className={styles.giftBoxHeader_card_mobile}>
                          <div style={{ marginTop: "0rem" }} className={`${styles.boxes} ${giftBoxes?.length > 2 ? styles.boxes3 : ""}`}>
                            <GiftBoxCardMob
                              item={item}
                              defaultBox={defaultBox}
                              setDefaultBox={setDefaultBox}
                              collectionData={collectionData}
                              setUpdatedCollectionData={setUpdatedCollectionData}
                              giftBoxes={giftBoxes} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className={styles.steps} style={{ marginTop: "1.5rem" }}>
                  <div className={`${styles.boxes_step} ${styles.boxes_step_two} ${styles.giftBoxHeader_card_desk}`}>
                    {productListHeading?.desk || "Step 2: Select your products"}
                  </div>
                  <div className={`${styles.boxes_step} ${styles.boxes_step_two} ${styles.giftBoxHeader_card_mobile}`}>
                    {productListHeading?.mobile || "Step 2: Select your products"}
                  </div>
                </div>
              </div>
              <StepList />
            </>
          )
          : (
            <>
              <div className={styles.giftBoxHeader}>
                <div>
                  <div className={styles.boxes_step}>Step 1: Select your box</div>
                  <div className={`${styles.boxes} ${giftBoxes?.length > 2 ? styles.boxes3 : ""}`}>
                    {giftBoxes?.map(item => (
                      <div
                        className={`${styles.box} ${item?.box === defaultBox ? styles.box_active : ""
                          } ${giftBoxes?.length > 2 ? styles.box3 : ""}`}
                        onClick={() => {
                          setDefaultBox(item?.box);
                          setUpdatedCollectionData(collectionData[item?.box]);
                        }}
                      >
                        <div className={styles.box_image_desk}>
                          <CachedImage
                            isNextImage
                            url={item?.img_desk}
                            imageDimensions={{ width: 100, height: 100 }}
                          />
                        </div>
                        <div className={styles.box_image_mob}>
                          <CachedImage
                            isNextImage
                            url={item?.img_mob}
                            imageDimensions={{ width: 100, height: 100 }}
                          />
                        </div>
                        <div className={styles.box_type}>
                          <p>{item?.type || ""}</p>
                          <p>{item?.price || ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.steps}>
                  <div className={`${styles.boxes_step} ${styles.boxes_step_two}`}>
                    Step 2: Select your products
                  </div>
                </div>
              </div>
              <StepList />
            </>
          ) : (
          <StepList />
        )}
      <div className={styles.addingToCartWrapper}>
        <Snackbar open={!!addingToCart}>
          <Alert severity="success">{addingToCart}</Alert>
        </Snackbar>
      </div>
      <div className={`${styles.byobProductList} container`}>
        {/* <TypedCollectionProductsQuery
          variables={{
            id: currentStep?.collectionID,
            pageSize: 100,
            sortBy: {
              direction: "ASC",
              field: "COLLECTION",
            },
          }}
          fetchPolicy="cache-first"
        >
          {({ data, loading }) => {
            if (loading) {
              return (
                <div className={styles.loaderWrapper}>
                  <CircularProgress />
                </div>
              );
            }
            return (
             
            );
          }}
        </TypedCollectionProductsQuery> */}
        {currentCollectionData &&
          currentCollectionData?.collection?.products?.edges?.length ? (
          <div className="byob-product-list">
            <MemoizedProductList
              products={currentCollectionData?.collection?.products?.edges
                .map(edge => edge.node)
                .filter(item => item?.defaultVariant?.id !== variantId)}
              isCarousel={false}
              slidesOnDesktop={4}
              carouselProps={{
                arrows: true,
                dots: true,
                infinite: true,
              }}
              productCardClassname="productCardByb"
              productCardContainerClass={styles.productCardContainerByb}
              from="Byob"
              preventClickToPdp
              buildYourBoxButtonProps={{
                addtoBoxButtonText: "Add To Box",
                addtoBoxOnClickHandler: (v_id, product) => {
                  const limitInBox =
                    product?.defaultVariant?.metadata &&
                    getMetadataValue(
                      product?.defaultVariant?.metadata,
                      "limit_in_box"
                    ) &&
                    parseJson(
                      getMetadataValue(
                        product?.defaultVariant?.metadata,
                        "limit_in_box"
                      )
                    );
                  const canAddtoCart = canAddToCartPlix(
                    items,
                    !!product.isAvailableForPurchase,
                    v_id,
                    product?.defaultVariant?.quantityAvailable,
                    1
                  )
                  if (canAddtoCart === false) {
                    const notifyMeContext: InnerOverlayContextInterface = {
                      data: product?.id,
                    };
                    show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
                  } else {
                    onAddtoBox(v_id, product, limitInBox);
                  }
                },
                removeFromBoxButtonText: "Remove From Box",
                removeFromBoxClickHandler: (v_id, product, sku) => {
                  onRemoveFromBox(currentStep?.stepNumber);
                },
                steps: steps ? steps.map(step => ({
                  v_id: step.variant_id,
                  step_no: step.stepNumber,
                })) : [],
                current_step_no: currentStep?.stepNumber,
              }}
              productDetailPopup={
                width < 720 ? e => popupstateHandler(e) : null
              }
              productDetailPopupOnImage={
                width < 720 ? e => popupstateHandler(e) : true
              }
              showProductInfoPopup={width > 720 ? true : false}
            />
          </div>
        ) : (
          <></> 
        )}
        {!isGiftBoxGallery && faqData && <FaqSection faqData={faqData} />}
      </div>
      {isGiftBoxGallery && <Banner3 metadata={pageMeta} />}
      <div className={`${styles.byobProductList} container`}>
        {isGiftBoxGallery && faqData && <FaqSectionNew faqData={faqData} />}
      </div>
      <TermsAndCondition content={content} isGiftBox={isGiftBox} />
      <div className={styles.atcStickyButton}>
        <div className={styles.atcStickyDesktop}>
          <div className={isGiftBox ? styles.atcStickyDesktop__gift : styles.atcStickyDesktop__byob}>
            <CachedImage
              url={personalisedBoxConfig?.thumbnail}
              className={styles.bottomImagePreview}
            />
            <h3 style={{ marginTop: "5px" }}>{personalisedBoxConfig?.title}</h3>
          </div>
          <div>
            <div className={styles.desktopPricingBox}>
              <div>
                <span>Total &#x20B9; {personalisedBoxConfig?.price}/-</span>
                {totalUndiscountedPrice && savingAmount ? <span className="bybMrpPrices">MRP: &#x20B9;{totalUndiscountedPrice}</span> : <></>}
              </div>

              {savingAmount ? <span className={styles.savingAmountStrip}>Save &#x20B9;{savingAmount}</span> : <></>}
            </div>
            <S.AddtoCartButton
              disabled={addingToCart || alreadyInCart || atcDisabled}
              onClick={() => onAddtoCart()}
            >
              {atcButtonText}
            </S.AddtoCartButton>
          </div>
        </div>
        <div className={styles.atcStickyMobile}>
          <div className={styles.bybAtcBottomPricing}>
            <div>
              <div>Total: <span>&#x20B9;{personalisedBoxConfig?.price}</span></div>{" "}
              {totalUndiscountedPrice && savingAmount ? <span className="bybMrpPrices">MRP: &#x20B9;{totalUndiscountedPrice}</span> : <></>}
            </div>
            {savingAmount ? <span className={styles.savingAmountStrip}>Save &#x20B9;{savingAmount}</span> : <></>}
          </div>
          <S.AddtoCartButton
            disabled={addingToCart || alreadyInCart || atcDisabled}
            onClick={() => onAddtoCart()}
            toCapitalize={false}
          >
            {atcButtonText}
          </S.AddtoCartButton>
        </div>
      </div>
      <Snackbar
        autoHideDuration={3000}
        open={!!boxLimitAlert}
        onClose={() => setBoxLimitAlert("")}
      >
        <Alert severity="error">{boxLimitAlert}</Alert>
      </Snackbar>
    </>
  );
};
BuildYourBox.displayName = "BuildYourBox";
export default React.memo(BuildYourBox);
