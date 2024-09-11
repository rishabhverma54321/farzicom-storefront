import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIntl } from "react-intl";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import { CircularProgress } from "@mui/material";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import Grid from '@mui/material/Grid';
import { ApolloQueryResult } from "apollo-client";
import CloseCrossIcon from "@components/atoms/SvgIcons/CloseCrossIcon";
import Media from "react-media";
import ProductVariantDetails from "./ProductVariantDetails";
import FreebieContainer from "./FreebieContainer";
import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_product_category,
  ProductDetails_section_edges_node,
} from "Themes/views/Product/gqlTypes/ProductDetails";
import DeliveryTimer from "./DeliveryTimer";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { RichTextContent } from "@components/atoms/RichTextContent";
import { MyRating } from "@components/atoms/MyRating";
import { useStockHelpers } from "@hooks/useStockHelpers";
// import { PdpAccordian } from "@components/organisms";
// import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import { TypedGetProductRatings } from "@components/molecules/ProductCard/queries";
// import { TypedCheckForDelivery } from "@temp/themes/lotus/views/Product/queries";
// import Tag from "images/tag.svg";
// import ReactSVG from "react-svg";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import {
  useAuth,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { StyledAddToCartButton } from "@temp/themes/plixlifefc/views/Product/style";
// import ReadMore from "images/lotus/readmore.svg";
import {
  getMetadataValue,
  parseJson,
  addToCartDataLayer,
  customEventTrigger,
  isMember as isUserMember,
  preserveTimestamp,
  getRoundedRating,
  getCheckoutMetaForVariantAttributeWeight,
} from "@utils/misc";
import { CardsContainer } from "@components/organisms/CardsContainer";
import { clients } from "gqlTypes/customGlobalTypes";
import { CLIENT, ENABLE_GA4, META_DEFAULTS } from "Themes/config";
import MemoPdpAddToCartPlix from "@components/atoms/SvgIcons/PdpAddToCartPlix";
import MemoCheckCircle from "@components/atoms/SvgIcons/CheckCircle";
import MemoTruckPlix from "@components/atoms/SvgIcons/TruckPlix";
import { mediumScreen } from "@styles/constants";
import {
  // OverlayType,
  // OverlayTheme,
  OverlayContext,
  InnerOverlayContextInterface,
  OverlayType,
  OverlayTheme,
} from "@temp/components";
import MemoRightArrowPlixCartMobile from "@components/atoms/SvgIcons/RightArrowPlixCartMobile";
import gtmConfig from "Themes/lib/gtmConfig.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import MemoSavingAddToCart from "@components/atoms/SvgIcons/SavingAddToCart";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { generateCollectionUrl, getDBIdFromGraphqlId } from "@utils/core";
import { ProductDetailsPlix } from "@temp/themes/plixlifefc/views/Product/gqlTypes/ProductDetailsPlix";
import { ShopMetaContext } from "@temp/pages/_app";
import MemoEasyReturn from "@components/atoms/SvgIcons/EasyReturn";
import MemoTruckIconPdp from "@components/atoms/SvgIcons/TruckIconPdp";
import MemoCodIcon from "@components/atoms/SvgIcons/CodIcon";
import Image from "next/image";
import { CachedImage } from "@components/molecules/CachedImage";
import { TypedSectionWithoutChildrenQuery } from "../../../../themes/plixlifefc/views/Home/queries";
import {
  canAddToCartPlix,
  getThisVariantDiscount,
  getThisVariantPrice,
  discountExists,
} from "./stockHelpers";
import * as S from "./styles";
import ProductVariantPicker from "../ProductVariantPicker";
import EasyReturnicon from "@components/atoms/SvgIcons/EasyReturnicon";
import CodNewIcon from "@components/atoms/SvgIcons/CodNewIcon";
import DeliveryIcon from "@components/atoms/SvgIcons/DeliveryIcon";
import { useRouter } from "next/router";
// import gtmConfig from "src/lib/gtmConfig";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MemoOfferCount from "@components/atoms/SvgIcons/OfferCount";
import NewMemoOfferShowmore from "@components/atoms/SvgIcons/OfferShowmore";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import { useMessageStateUpdate } from "@temp/MessageContext";
import { useItemInCart, useWindowWidth } from "@hooks";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import QuizBannerSection from "@temp/themes/plixlifefc/views/Product/pdpComponents/QuizBannerSection";
import debounce from "lodash/debounce";
import { ProductSubscriptionPopup } from "../ProductSubscriptionPopup";
import LazyLoad from "react-lazyload";
import ProductCombos from "./components/ProductCombos";

const LOW_STOCK_QUANTITY: number = 5;

const VARIANT_BOX_POSITION = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
};

export interface IAddToCartSectionPlixlife {
  itemAdded: boolean;
  productVariants: ProductDetails_product_variants[];
  name: string;
  category: ProductDetails_product_category;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  setShowBottomDrawer: any;
  descriptionJson: any;
  showBottomDrawer: any;
  setVariantId(variantId: string): void;
  onAttributeChangeHandler(
    slug: string | null,
    value: string,
    variantInfo: {
      variant_id: number | string;
      slug: string;
      product_id: number;
    }
  ): void;
  metaData: Array<any>;
  product: any;
  productOffers: (string | null)[] | null;
  refetch: (
    variables?: ProductDetailsVariables
  ) => Promise<ApolloQueryResult<ProductDetails>>;
  add: (
    variantId: string,
    quantity: number
  ) => Promise<
    | {
        error: any;
        data?: undefined;
        pending?: undefined;
      }
    | {
        data: any;
        pending: boolean;
        error?: undefined;
      }
    | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
      }
  >;
  section?: ProductDetails_section_edges_node;
  className?: string;
  handleAuthenticReturn: (type: "authentic" | "return") => void;
  addToCartBottomText?: string[];
  addToCartBottomImage?: string[];
  data: ProductDetailsPlix;
  initialVariant?: any;
  // disableButton?: boolean;
}

const AddToCartSectionPlixlife: React.FC<IAddToCartSectionPlixlife> = ({
  availableForPurchase,
  isAvailableForPurchase,
  // items,
  name,
  descriptionJson,
  category,
  productPricing,
  productVariants,
  queryAttributes,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  itemAdded,
  metaData,
  product,
  productOffers,
  refetch,
  add,
  section,
  className,
  showBottomDrawer,
  setShowBottomDrawer,
  handleAuthenticReturn,
  addToCartBottomText,
  addToCartBottomImage,
  data,
  initialVariant,
  // disableButton,
}) => {
  const selectedVariant = productVariants.find(
    variant => variant.id === variantId
  );
  const { checkout } = useCheckoutState();
  const { items } = useCartState();
  const falvorsAtt =
    productVariants?.length &&
    selectedVariant &&
    selectedVariant.attributes.find(att => att.attribute.slug === "flavors");
  const currFlavor =
    falvorsAtt && falvorsAtt.values.length && falvorsAtt?.values[0]?.value;
  const [width] = useWindowWidth();
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const sizeAtt =
    productVariants?.length &&
    selectedVariant &&
    selectedVariant.attributes.find(att => att.attribute.slug === "size");
  const currSize =
    sizeAtt && sizeAtt.values.length && sizeAtt?.values[0]?.value;

  const [showMoreoffer, setshowMoreoffer] = useState(false);
  const [membershipKnowMore, setMembershipKnowMore] = useState(false);
  const [membershipLoading, setMembershipLoading] = useState(false);
  const [subscriptionPopup, setSubscriptionPopup] = useState({
    isOpen: false,
    showVariantOption: false,
  });
  const [serverside, setServerSide] = useState(true);
  const BOTTOM_DRAWER = "bottomDrawer";
  const BottomDrawerObj =
    (typeof window !== "undefined" &&
      parseJson(sessionStorage.getItem(BOTTOM_DRAWER))) ||
    null;
  //
  const { show } = useContext(OverlayContext);
  const [showSmallVariant, setShowSmallVaraint] = useState({
    open: false,
    redirect: false,
    redirectFromLastVariant: false,
  });

  const sectionExists = (sectionName: string) => {
    if (section)
      return section.children.edges.filter(
        subSection => subSection?.node?.name === sectionName
      ).length
        ? section.children.edges.filter(
            subSection => subSection?.node?.name === sectionName
          )[0]
        : null;
    return null;
  };

  const [copiedMessage, setcopiedMessage] = useState(false);
  const [selectedCoupon, setselectedCoupon] = useState("");

  const iconsSection = sectionExists("Product Page Icons");
  const iconsSectionData =
    iconsSection &&
    getMetadataValue(iconsSection?.node?.metadata, "cardContainerData") &&
    parseJson(
      getMetadataValue(iconsSection?.node?.metadata, "cardContainerData")
    );

  const variantMetaData = selectedVariant?.metadata;
  const updatedVariantName =
    (variantMetaData &&
      getMetadataValue(variantMetaData, "product_name") &&
      parseJson(getMetadataValue(variantMetaData, "product_name"))) ||
    null;

  const newProductVariant =
    getMetadataValue(metaData, "product_variants") &&
    parseJson(getMetadataValue(metaData, "product_variants"));

  const productConfig =
    getMetadataValue(metaData, "product_config") &&
    parseJson(getMetadataValue(metaData, "product_config"));

  const productTags =
    getMetadataValue(metaData, "product_tags") &&
    parseJson(getMetadataValue(metaData, "product_tags"));

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
  const { getWalletAmount } = useCheckout();

  const { user } = useAuthState();

  const router = useRouter();
  // const { search } = useCustomLocation();
  const intl = useIntl();

  const { addToCartRest, updateItemWithLinesRest } = useCart();

  const metaDataArranged =
    metaData.length > 0 ? metaData.filter(meta => meta.key !== "faq") : [];

  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");

  if (metaDataArranged.length > 0)
    metaDataArranged.push(metaData.filter(meta => meta.key === "faq")[0]);

  const description_icons =
    getMetadataValue(metaData, "description_icons") &&
    parseJson(getMetadataValue(metaData, "description_icons"));

  const membershipEnable =
    getMetadataValue(metaData, "membership") &&
    parseJson(getMetadataValue(metaData, "membership"));

  const membershipSection =
    getMetadataValue(ShopMetaContextValue, "membership_v3") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "membership_v3"));

  const productListPrice =
    getMetadataValue(variantMetaData, "listPrice") &&
    parseJson(getMetadataValue(variantMetaData, "listPrice"));

  const ProductCombosData =
    getMetadataValue(variantMetaData, "product_combos") &&
    parseJson(getMetadataValue(variantMetaData, "product_combos"));

  const productTestimonial =
    getMetadataValue(variantMetaData, "product_testimonial") &&
    parseJson(getMetadataValue(variantMetaData, "product_testimonial"));

  const membershipPopupData = membershipSection?.cartData?.popupData_new;

  const totalMembershipDiscount =
    membershipSection &&
    Math.ceil(
      ((membershipSection.listPrice?.substring(1) -
        membershipSection.mrp?.substring(1)) *
        100) /
        membershipSection.listPrice?.substring(1)
    );

  const productText =
    getMetadataValue(metaDataArranged, "productDesc") &&
    parseJson(getMetadataValue(metaDataArranged, "productDesc"));
  const [variantStock, setVariantStock] = useState<number>(
    product?.defaultVariant?.quantityAvailable || 0
  );

  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(
    initialVariant?.pricing || null
  );

  // const [loading, setLoading] = useState(false);

  const [abTestQuery, setAbTestQuery] = useState(false);

  const { availableQuantity } = useStockHelpers(product);

  const disableButton = variantId
    ? !canAddToCartPlix(
        items,
        !!isAvailableForPurchase,
        variantId,
        variantStock,
        1
      )
    : false;

  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;

  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const lowStockCustomText =
    getMetadataValue(metaData, "low_stock_text") &&
    parseJson(getMetadataValue(metaData, "low_stock_text"));

  // const unit = metaData.filter(meta => meta.key === "weight_unit").length
  //   ? metaData.filter(meta => meta.key === "weight_unit")[0].value
  //   : "GM";

  // const weightWithUnit = ` ${product.weight.value}  ${unit.replace(
  //   /['"]+/g,
  //   ""
  // )}`;
  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage
      data-test="stockErrorMessage"
      data-testId={testingContextId}
    >
      {message}
    </S.ErrorMessage>
  );

  const onVariantPickerChange = React.useRef(
    debounce(
      (
        _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
        selectedVariant?: ProductDetails_product_variants
      ): undefined => {
        if (!selectedVariant) {
          setVariantId("");
          setVariantPricing(null);
          setVariantStock(0);
          return;
        }
        setVariantId(selectedVariant.id);
        setVariantPricing(selectedVariant?.pricing);
        setVariantStock(selectedVariant?.quantityAvailable);
      },
      200
    )
  ).current;

  useEffect(() => {
    let rootComponent = document?.querySelector(".root-component-container");
    if (rootComponent && membershipKnowMore) {
      rootComponent.style.touchAction = "none";
      return () => {
        rootComponent.style.touchAction = "unset";
      };
    }
  }, [membershipKnowMore]);

  useEffect(() => {
    if (
      category.slug !== "free-gift-products" &&
      category.slug !== "freebies-with-product"
    ) {
      const RECENTLY_VIEWED = "recently-viewed";
      const recentlyViewedStr = localStorage.getItem(RECENTLY_VIEWED);
      const recentlyViewed = recentlyViewedStr
        ? parseJson(recentlyViewedStr)
        : [];
      const isAlreadyPresent =
        recentlyViewed &&
        Array.isArray(recentlyViewed) &&
        recentlyViewed?.length &&
        recentlyViewed
          ?.map((item: any) => {
            //
            return item?.variants[0]?.id;
          })
          .findIndex((element: string) => element === product.variants[0].id);
      setServerSide(false);
      //
      if (isAlreadyPresent === -1) recentlyViewed.push(product);
      localStorage.setItem(RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
    }
  }, []);

  useEffect(() => {
    // if (router.isReady) {
    //   router?.prefetch("/checkout/address");
    // }
    if (router?.query?.ab_test && router?.query?.ab_test === "true") {
      setAbTestQuery(true);
    }
  }, [router?.isReady]);

  const dummyAddress = {
    id: "1",
    firstName: "dummy",
    lastName: "dummy",
    companyName: "",
    streetAddress1: "dummy",
    streetAddress2: "dummy",
    city: "dummy",
    postalCode: "302001",
    countryArea: "Rajasthan",
    phone: "9999999999",
    country: {
      code: "IN",
      country: "India",
    },
  };

  const averageRating =
    metaData && getMetadataValue(metaData, "average_rating");
  const weightAttributeValue =
    Array.isArray(newProductVariant?.weight_options) &&
    newProductVariant?.weight_options?.length
      ? newProductVariant?.weight_option[0]
      : "";
  const unitsSold = metaData && getMetadataValue(metaData, "unitsSold");
  const membershipVariantId = membershipSection?.variantID;
  const isItemInCart = useItemInCart(membershipVariantId);
  const [atcLoading, setAtcLoading] = useState(false);
  const [selectVariantWeight, setSelectedVariantWeight] = useState(
    weightAttributeValue
  );

  const messageUpdate = useMessageStateUpdate();

  const onVariantWeightAttributeChange = (value: string) => {
    setSelectedVariantWeight(value);
  };

  const handleAfterAtc = (
    res: any,
    variant_id: any,
    isMembership: any,
    currentVariant: any,
    freebieData: any,
    isIncludeFreebie: boolean = false
  ) => {
    const token = res?.data?.token || null;
    addToCartDataLayer(
      res,
      res?.data?.lines?.filter(line => line.variant.id === variant_id)[0]
        ?.variant?.product,
      variant_id,
      res?.data?.lines?.filter(line => line.variant.id === variant_id)[0]
    );
    if (isIncludeFreebie && freebieData?.variant_id) {
      const line = res?.data?.lines?.filter(
        line => line.variant.id === freebieData?.variant_id
      )[0];
      addToCartDataLayer(
        res,
        line?.variant?.product,
        freebieData?.variant_id,
        line
      );
    }
    if(token){
      const url = `/checkout/address?token=${token}`;
      const clevertap = makeClevertap();
      clevertap.profile.push({
          Site: {
            farzicom_checkout_url: url,
          },
        });
      }
    try {
      if (isMembership) {
        const membership = res?.data?.lines?.filter(
          line => line.variant.id === membershipSection?.variantID
        )[0];
        addToCartTrack(shopmetadata, {
          product_name: membership?.variant?.product?.name,
          product_id: membership?.variant?.product?.id,
          quantity: 1,
          product_price: membership?.variant?.pricing?.price?.gross?.amount,
          currency: membership?.variant?.pricing?.price?.gross?.currency,
          variant: membership?.variant?.name,
        });
      } else {
        addToCartTrack(ShopMetaContextValue, {
          product_name: product?.name,
          product_id: product?.id,
          quantity: 1,
          product_price: currentVariant?.pricing?.price?.gross?.amount,
          currency: currentVariant?.pricing?.price?.gross?.currency,
          variant: currentVariant?.name,
        });
      }
    } catch (err) {
      console.log("fc collect atc error", err);
    }
  };

  const addProductToCart = async (variant_id: any) => {
    const isMembership = variant_id === membershipSection?.variantID;
    const updatedSelectedVariant = productVariants.find(
      variant => variant.id === variant_id
    );
    const freebieData =
      getMetadataValue(updatedSelectedVariant?.metadata, "freebie_includes") &&
      parseJson(
        getMetadataValue(updatedSelectedVariant?.metadata, "freebie_includes")
      );

    const freebieAlreadyPresent =
      (items &&
        items?.length &&
        freebieData?.enable &&
        items?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
      false;

    const checkoutMetaData =
      newProductVariant?.enable && !isMembership
        ? [
            getCheckoutMetaForVariantAttributeWeight(
              variant_id,
              checkout?.metadata,
              "ADD",
              selectVariantWeight?.text
            ),
          ]
        : null;

    if (variant_id) {
      if (isMembership && isItemInCart) {
        setMembershipKnowMore(false);
        setMembershipLoading(false);
        messageUpdate("Already added in cart", "success");
      } else {
        if (CLIENT === clients.PLIXLIFEFC) {
          //Timer for upsell
          preserveTimestamp(product, variant_id);
        }
        if (!isMembership) {
          show(OverlayType.plixlifefcCart, OverlayTheme.right);
          setAtcLoading(true);
          setShowSmallVaraint({
            ...showSmallVariant,
            open: false,
            redirect: showSmallVariant?.redirectFromLastVariant,
          });
        } else {
          setMembershipLoading(true);
        }
        try {
          const currentVariant =
            product?.variants?.find((v: any) => v?.id === variant_id) ||
            product?.defaultVariant;
          const line_item =
            !isMembership && currentVariant
              ? {
                  id: currentVariant?.id, //ideally this should be checkoutLineId
                  quantity: 1,
                  totalPrice: currentVariant?.pricing?.price,
                  variant: {
                    attributes: currentVariant?.attributes || [],
                    id: currentVariant?.id,
                    images:
                      currentVariant?.images[0]?.sortOrder &&
                      currentVariant?.images[0]?.alt
                        ? currentVariant?.images
                        : [],
                    metadata: currentVariant?.metadata || [],
                    name: currentVariant?.name,
                    pricing: currentVariant?.pricing,
                    quantityAvailable: currentVariant?.quantityAvailable || 5,
                    sku: currentVariant?.sku || "",
                    product: {
                      category:
                        product?.category?.name &&
                        product?.category?.slug &&
                        product?.category?.id
                          ? product.category
                          : {
                              id: "",
                              name: "",
                              slug: "",
                              __typename: "Category",
                            },
                      id: product?.id || "",
                      isAvailableForPurchase:
                        product?.isAvailableForPurchase || true,
                      metadata: product?.metadata || [],
                      name: product?.name || "",
                      productType:
                        product?.productType?.id &&
                        product?.productType?.isShippingRequired
                          ? product.productType
                          : {
                              id: "",
                              isShippingRequired: true,
                              __typename: "ProductType",
                            },
                      slug: product?.slug || "",
                      tags: product?.tags || [],
                      thumbnail:
                        product?.thumbnail?.url &&
                        product?.thumbnail?.alt !== undefined
                          ? product?.thumbnail
                          : {
                              url:
                                currentVariant?.images[0]?.url ||
                                product?.thumbnail2x?.url ||
                                "",
                              alt: "",
                              __typename: "Image",
                            },
                      weight: product?.weight || null,
                      __typename: "Product",
                    },
                    __typename: "ProductVariant",
                  },
                  __typename: "CheckoutLine",
                }
              : null;

          if (
            freebieData?.enable &&
            freebieData?.variant_id &&
            !freebieAlreadyPresent
          ) {
            const linesToAdd: any = [
              {
                variantId: getDBIdFromGraphqlId(variant_id, "ProductVariant"),
                quantity: 1,
              },
              {
                variantId: getDBIdFromGraphqlId(
                  freebieData?.variant_id,
                  "ProductVariant"
                ),
                quantity: 1,
              },
            ];

            await updateItemWithLinesRest(
              linesToAdd,
              false,
              true,
              isRecalculate,
              checkoutMetaData
            )
              .then(res => {
                setAtcLoading(false);
                handleAfterAtc(
                  res,
                  variant_id,
                  isMembership,
                  currentVariant,
                  freebieData,
                  true
                );
                if (res?.errors[0]?.code) {
                  messageUpdate(res?.errors[0]?.code, "error");
                  console.log("error", res?.errors[0]?.code);
                } else {
                  messageUpdate("Added to cart successfully", "success");
                }
              })
              .catch(e => console.log(e, "error"))
              .finally(() => {
                setAtcLoading(false);
                // if(items.length == 0) {
                //   localStorage.setItem('firstAtcTime', `${Date.now()}`)
                // }
              });
          } else {
            await addToCartRest(
              variant_id,
              1,
              undefined,
              line_item,
              false,
              isRecalculate,
              checkoutMetaData
            )
              .then(res => {
                handleAfterAtc(
                  res,
                  variant_id,
                  isMembership,
                  currentVariant,
                  freebieData
                );
                if (!isMembership) {
                  setAtcLoading(false);
                } else if (res?.errors[0]?.code) {
                  setMembershipKnowMore(false);
                  messageUpdate(res?.errors[0]?.code, "error");
                  console.log("error", res?.errors[0]?.code);
                } else {
                  setMembershipKnowMore(false);
                  messageUpdate("Added to cart successfully", "success");
                }
              })
              .catch(e => console.log(e, "error"))
              .finally(() => {
                setMembershipLoading(false);
                setAtcLoading(false);
                // if(items.length == 0) {
                //   localStorage.setItem('firstAtcTime', `${Date.now()}`)
                // }
              });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const productAddedToCart = (
    name: string,
    variantId: string,
    variantPrice: number | undefined,
    category: ProductDetails_product_category,
    qty: number
  ) => {
    const ctp = {
      "Product name": name,
      "Product Price": variantPrice,
      Quantity: qty,
      "Added from": "PDP",
      "Image URL": product?.images?.[0]?.url,
      URL: window.location.href,
      Title: product.seoTitle || product.name,
      Duration: currSize,
      Flavor: currFlavor,
      sku: selectedVariant?.sku,
    };

    const clevertap = makeClevertap();

    clevertap.event.push(clevertapEvents.addedToCart.value, ctp);
  };

  const { defaultVariant } = product;

  const queryVariant =
    queryAttributes &&
    Object.keys(queryAttributes).length !== 0 &&
    productVariants.find(variant =>
      variant.attributes
        .filter(att => queryAttributes.hasOwnProperty(att.attribute.id))
        .every((att, index) => {
          if (queryAttributes[att.attribute.id] === att.values[0]?.value)
            return true;
          return false;
        })
    );

  useEffect(() => {
    if (queryVariant && queryVariant?.id) {
      if (clevertapEvents.productView.enable) {
        const clevertap = makeClevertap();
        clevertap.event.push(clevertapEvents.productView.value, {
          name: product.name,
          id: defaultVariant?.sku,
          variantId:
            atob(defaultVariant.id).split(":").length > 1
              ? atob(defaultVariant.id).split(":")[1]
              : atob(defaultVariant.id),
          price: defaultVariant?.pricing?.price?.gross.amount,
          category: product.category?.name,
          inStock: defaultVariant.quantityAvailable > 5,
          isAvailableforPurchase: product.isAvailableForPurchase,
        });
      }
    }
  }, [queryVariant]);

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
  }, []);

  useEffect(() => {
    if (typeof window != "undefined" && window.document) {
      if (showSmallVariant?.open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSmallVariant?.open]);

  // const moneyBackSection =
  //   data?.moneyBackGuarantee?.edges?.length &&
  //   data?.moneyBackGuarantee.edges[0];
  // const moneyBackSectionData =
  //   moneyBackSection &&
  //   getMetadataValue(moneyBackSection.node.metadata, "money_back") &&
  //   parseJson(getMetadataValue(moneyBackSection.node.metadata, "money_back"));

  // const pledgeatree =
  //   data?.pledgeATree?.edges?.length && data?.pledgeATree.edges[0];
  // const pledgeatreeData =
  //   pledgeatree &&
  //   getMetadataValue(pledgeatree.node.metadata, "pledgeATree") &&
  //   parseJson(getMetadataValue(pledgeatree.node.metadata, "pledgeATree"));

  const cart_config =
    getMetadataValue(ShopMetaContextValue, "cart_config_v2") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "cart_config_v2"));

  const moneyBackSectionData =
    getMetadataValue(ShopMetaContextValue, "money_back") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "money_back"));

  const availableOffer =
    getMetadataValue(ShopMetaContextValue, "available_offers_new") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "available_offers_new"));

  const pledgeatreeData =
    getMetadataValue(ShopMetaContextValue, "pledge_a_tree") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "pledge_a_tree"));

  const subscriptionData =
    product &&
    getMetadataValue(product?.metadata, "subscription_data") &&
    parseJson(getMetadataValue(product?.metadata, "subscription_data"));

  const reviewLength = data?.productReviews?.totalCount;

  const [showVp, setShowVp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (subscriptionPopup?.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [subscriptionPopup?.isOpen]);

  const handleScroll = () => {
    const getProductDetailsScrollHeight = document.getElementById(
      "productDetails_element"
    );
    // const getProductMobileATCHeight = document.getElementById(
    //   "product-mobile-static-atc"
    // );

    // if (window.scrollY > getProductMobileATCHeight?.offsetTop) {
    //   setShowVpNew(true);
    // }
    // if (window.scrollY < getProductMobileATCHeight?.offsetTop) {
    //   setShowVpNew(false);
    // }
    if (window.scrollY > getProductDetailsScrollHeight?.offsetTop) {
      setShowVp(true);
    }
    if (window.scrollY < getProductDetailsScrollHeight?.offsetTop) {
      setShowVp(false);
    }
  };

  const showStickyVariantPicker =
    getMetadataValue(metaData, "sticky_variant_picker") &&
    parseJson(getMetadataValue(metaData, "sticky_variant_picker"));

  const showStickyVariantPicker2 =
    getMetadataValue(metaData, "sticky_variant_picker_new") &&
    parseJson(getMetadataValue(metaData, "sticky_variant_picker_new"));

  // const TimerLength = 5 * 60 * 60 * 1000 - 60 * 1000;

  // useEffect(() => {
  //   const timeStampValue = localStorage.getItem(`pdpTimer`);
  //   if (
  //     !timeStampValue ||
  //     Math.round(
  //       (parseInt(timeStampValue) + TimerLength - new Date().getTime()) / 1000
  //     ) <= 0
  //   ) {
  //     localStorage.setItem("pdpTimer", `${Date.now()}`);
  //     setPdpTimer(
  //       Math.round((Date.now() + TimerLength - new Date().getTime()) / 1000)
  //     );
  //   } else {
  //     setPdpTimer(
  //       Math.round(
  //         (parseInt(localStorage.getItem(`pdpTimer`)) +
  //           TimerLength -
  //           new Date().getTime()) /
  //           1000
  //       )
  //     );
  //   }
  // }, []);

  // const [pdpTimer, setPdpTimer] = React.useState<number>(0);

  // let interval_id: any = null;
  // let timeValue: null | string = null;
  // if (typeof window !== "undefined") {
  //   timeValue = localStorage.getItem(`pdpTimer`);
  // }
  // useEffect(() => {
  //   if (timeValue && typeof window !== "undefined") {
  //     clearInterval(interval_id);
  //     interval_id = setInterval(() => {
  //       const timeValueNew = localStorage.getItem(`pdpTimer`);
  //       const diffInSec = Math.round(
  //         (parseInt(timeValueNew) + TimerLength - new Date().getTime()) / 1000
  //       );
  //       if (diffInSec > 0 && diffInSec < 60 * 60) {
  //         localStorage.setItem("pdpTimer", `${Date.now()}`);
  //         return;
  //       }
  //       if (diffInSec > 0) {
  //         setPdpTimer(diffInSec);
  //       } else {
  //         setPdpTimer(0);
  //         clearInterval(interval_id);
  //       }
  //     }, 1000);
  //   }
  //   return () => {
  //     if (interval_id) {
  //       clearInterval(interval_id);
  //     }
  //   };
  // }, [timeValue]);

  // const hour = Math.floor(pdpTimer / 3600);
  // const minutes = Math.floor((pdpTimer / 60) % 60);
  // const seconds = Math.floor(pdpTimer % 60);

  const copiedHandler = (c: string) => {
    setcopiedMessage(true);
    setselectedCoupon(c);
    setTimeout(function () {
      setcopiedMessage(false);
      setselectedCoupon("");
    }, 2000);
  };
  // Datalayer event for variant box click
  const variantBoxClickEvent = (card_position: number, currentVariant: any) => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.otpVariantCardCLick.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.otpVariantCardCLick.value,
        eventCategory: "card_click",
        eventAction:
          typeof card_position === "number"
            ? VARIANT_BOX_POSITION[card_position + 1]
            : null, // card_position = first, second, third
        eventLabel: product?.name, // Name of the selected product.
        product_id: product?.id
          ? getDBIdFromGraphqlId(product?.id, "Product")
          : null,
        user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out", //  logged_in,logged_out
        product_price: currentVariant?.pricing?.price?.gross.amount,
        membership_status: isUserMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        card_position:
          typeof card_position === "number"
            ? VARIANT_BOX_POSITION[card_position + 1]
            : null,
      });
    }
  };

  const shopmetadata = useContext(ShopMetaContext);
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const MembersClub =
    getMetadataValue(shopmetadata, "membership_v3") &&
    parseJson(getMetadataValue(shopmetadata, "membership_v3"));

  const memberVariantId = MembersClub?.variantID;

  const getVariantDiscount = () => {
    const discountedPrice = selectedVariant?.pricing?.price;

    const variantMetadata = selectedVariant?.metadata;

    const discountedListPrice =
      variantMetadata &&
      variantMetadata.length &&
      getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

    const undiscountedPrice = discountedListPrice
      ? {
          gross: {
            amount: parseFloat(discountedListPrice),
            currency: "INR",
          },
          net: { amount: parseFloat(discountedListPrice), currency: "INR" },
        }
      : selectedVariant?.pricing?.priceUndiscounted;
    const totalDiscountInAmount =
      undiscountedPrice?.gross?.amount - discountedPrice?.gross?.amount;
    const totalDiscount = Math.ceil(
      (totalDiscountInAmount * 100) / undiscountedPrice?.gross?.amount
    );

    if (totalDiscount > 0) {
      return totalDiscount;
    }

    return "";
  };

  const firstVariantSize = product?.variants[0]?.attributes?.find(attr => {
    if (attr.attribute?.name === "Size") {
      return true;
    }
  })?.values[0]?.value;

  const isLowestVariant =
    selectedVariant?.attributes?.find(attr => {
      if (attr.attribute?.name === "Size") {
        return true;
      }
    })?.values[0]?.value === firstVariantSize;

  const isDesktopScrolling =
    newProductVariant?.enable ||
    productConfig?.desktopVariantScroll ||
    (ProductCombosData && !!ProductCombosData?.items?.length);

  return (
    <S.Container className={className}>
      <span className="product-price" style={{ display: "none" }}>
        {selectedVariant?.pricing?.price?.gross.amount}
      </span>
      <span className="product-sku" style={{ display: "none" }}>
        {selectedVariant?.sku}
      </span>
      {serverside ? (
        <S.ProductNameHeaderSsr
          data-test="productName"
          className={`${className}__productName`}
        >
          {updatedVariantName || name}
          {/* {weightWithUnit} */}
        </S.ProductNameHeaderSsr>
      ) : (
        <></>
      )}
      {width > 992 ? (
        <S.ProductNameHeader
          data-test="productName"
          className={`${className}__productName`}
        >
          {updatedVariantName || name}
          {/* {weightWithUnit} */}
        </S.ProductNameHeader>
      ) : (
        <></>
      )}
      {productTags && productTags?.isPublished ? (
        <S.ProductTags>
          {productTags?.tags &&
            Array.isArray(productTags?.tags) &&
            productTags?.tags?.map((prodcutTag: any) => (
              <S.ProductBox color={prodcutTag?.color || ""}>
                {prodcutTag?.text || ""}{" "}
                <S.Emoji>{prodcutTag?.emoji || ""}</S.Emoji>
              </S.ProductBox>
            ))}
        </S.ProductTags>
      ) : (
        <></>
      )}
      {/* <S.WeightWithUnit>{weightWithUnit}</S.WeightWithUnit> */}
      {(description_icons || iconsSectionData) && (
        <S.DescriptionIcons className={`${className}__descriptionIcons`}>
          <CardsContainer
            data={description_icons || iconsSectionData}
            containerClass="descriptionIconsCardsContainer"
            cardClass="descriptionIconsCard"
          />
        </S.DescriptionIcons>
      )}
      {/* <S.Description className={`${className}__description`}>
        <S.DescriptionHeading>Product Description</S.DescriptionHeading>
        <RichTextContent descriptionJson={descriptionJson} />
        <S.DescriptionContent show={showDescription}>
          <RichTextContent
            descriptionJson={descriptionJson}
            className={`${className}__description__richTextContent`}
          />
        </S.DescriptionContent>
        {CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST ? (
          <> </>
        ) : (
          <S.ReadMore onClick={() => setShowdescription(!showDescription)}>
            {showDescription === true ? <>READ LESS</> : <>READ MORE </>}
          </S.ReadMore>
        )}
      </S.Description> */}
      <S.Rating className={`${className}__rating`}>
        {!serverside && (
          <a href="#review-section-wrapper">
            <MyRating
              fontSizeSm="16px"
              rating={
                parseFloat(averageRating) ? getRoundedRating(averageRating) : 5
              }
              isReadOnly
              color="#FFA227"
              precision={0.1}
            />
          </a>
        )}
        {reviewLength > 0 && (
          <a
            href="#review-section-wrapper"
            className="reviewCount"
            onClick={() => {
              customEventTrigger("customer_stories_click", user, {
                product_name: product?.name,
              });
            }}
          >
            {reviewLength === 100 ? "100+" : reviewLength} Customer Stories
          </a>
        )}
        {unitsSold && (
          <>
            <div className="unitsSold">{unitsSold} Units Sold</div>
          </>
        )}

        {lowStockCustomText &&
          renderErrorMessage(lowStockCustomText, "lowStockCustomWarning")}
      </S.Rating>
      <S.LowStock>
        {lowStockCustomText &&
          renderErrorMessage(lowStockCustomText, "lowStockCustomWarning")}
      </S.LowStock>
      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
        <>
          {/* <S.Price>
            <PriceShow
              price={getProductPricePlix(productPricing, variantPricing)}
              discount="(10% Off)"
              alignMent="start"
            />
            <span style={{ color: "#686B78" }}>
              MRP inclusive of all taxes.
            </span>
          </S.Price> */}
        </>
      )}
      {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable),
          "notAvailable"
        )}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )}
      {isLowStock &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.lowStock),
          "lowStockWarning"
        )}
      {isNoItemsAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noItemsAvailable),
          "noItemsAvailable"
        )}
      {productText && (
        <div className="productTextSection">
          <S.CustomText>{productText.description}</S.CustomText>
        </div>
      )}
      {!newProductVariant?.enable ? (
        <>
        {/* <S.VaraintPrice>
          ₹ {variantPricing?.priceUndiscounted?.gross?.amount || ""}
          <span>Incl. of all taxes</span>
        </S.VaraintPrice> */}
        <S.VaraintPriceContainer>
            <S.VaraintPriceNew>
            {productListPrice ? <><span>MRP : </span><span>₹{productListPrice} </span></> : <></>}
              ₹{variantPricing?.priceUndiscounted?.gross?.amount || ""}
              {getVariantDiscount() ? (
                <S.VariantDiscount>
                  {getVariantDiscount()}% OFF 
                </S.VariantDiscount>
              ) : (
                <></>
              )}
            </S.VaraintPriceNew>
            <S.VariantLabel>
              <span>Inclusive of all taxes</span>
            </S.VariantLabel>
          </S.VaraintPriceContainer>
        </>
      ) : (
        <></>
      )}
      <S.Scroller newproductvariant={isDesktopScrolling}>
        <S.VariantPicker
          marginTop={lowStockCustomText ? "14px" : 0}
          className={`${className}__variantPicker`}
        >
          <ProductVariantPicker
            onProductVariantCardClick={variantBoxClickEvent}
            onVariantWeightAttributeChange={onVariantWeightAttributeChange}
            selectVariantWeight={selectVariantWeight}
            productVariants={productVariants}
            imgVariant
            defaultVarinat={product.defaultVariant}
            onChange={onVariantPickerChange}
            selectSidebar
            selectedVariant={selectedVariant}
            metaData={metaData}
            queryAttributes={queryAttributes}
            onAttributeChangeHandler={onAttributeChangeHandler}
            product={product}
          />
        </S.VariantPicker>
        <LazyLoad height={50} offset={50}>
          <FreebieContainer
            metaData={metaData}
            selectedVariant={selectedVariant}
          />
        </LazyLoad>
        {!newProductVariant?.enable ? (
          <S.MobileStaticATCButton id="product-mobile-static-atc">
            <StyledAddToCartButton
              onSubmit={disabled => {
                if (disabled) {
                  if (typeof refetch === "function") {
                    refetch().then(res =>
                      onVariantPickerChange(
                        undefined,
                        res.data.product.variants[0]
                      )
                    );
                  }
                } else {
                  // handleAddToCart(variantId, 1);
                  BottomDrawerObj?.enable !== false &&
                    width < 720 &&
                    sessionStorage.setItem(
                      BOTTOM_DRAWER,
                      JSON.stringify({ enable: false })
                    );
                  productAddedToCart(
                    product.name,
                    variantId,
                    selectedVariant?.pricing?.price?.gross.amount,
                    product.category,
                    1
                  );
                }
              }}
              disabled={disableButton}
              customOnclickHandler={
                subscriptionData?.enabled && isLowestVariant
                  ? (v_id, product) => {
                      setSubscriptionPopup({
                        isOpen: true,
                        showVariantOption: true,
                      });
                    }
                  : null
              }
              itemAdded={itemAdded}
              index={
                typeof window !== "undefined" &&
                typeof window.itemIndexFromList === "number"
                  ? window.itemIndexFromList
                  : "NA"
              }
              showVp={true}
              setShowSmallVaraint={setShowSmallVaraint}
              showSmallVariant={showSmallVariant}
              showStickyVariantPicker2={
                !showStickyVariantPicker ? showStickyVariantPicker2 : null
              }
              size="md"
              page="pdp"
              ctTitle={
                typeof window !== "undefined" ? window?.navigated_from : ""
              }
              productListId={
                typeof window !== "undefined" ? window?.navigated_from_id : ""
              }
              openCart={cart_config?.open_cart_pdp_mob_static_button}
              // loading={loading}
              productId={product?.id}
              showGoToCart={false}
              mainText="Add To Cart"
              buttonClassName="mobileAddToCartPdp"
              variantId={variantId}
              product={product}
              cta_position="top"
            />
          </S.MobileStaticATCButton>
        ) : (
          <></>
        )}
        {subscriptionData?.enabled && (
          <S.MobileStaticSubscribeButton id="product-mobile-static-atc">
            <StyledAddToCartButton
              // onSubmit={disabled => {
              //   if (disabled) {
              //     if (typeof refetch === "function") {
              //       refetch().then(res =>
              //         onVariantPickerChange(undefined, res.data.product.variants[0])
              //       );
              //     }
              //   } else {
              //     // handleAddToCart(variantId, 1);
              //     width < 720 &&
              //       sessionStorage.setItem(
              //         BOTTOM_DRAWER,
              //         JSON.stringify({ enable: false })
              //       );
              //     productAddedToCart(
              //       product.name,
              //       variantId,
              //       selectedVariant?.pricing?.price?.gross.amount,
              //       product.category,
              //       1
              //     );
              //   }
              // }}
              customOnclickHandler={() => {
                setSubscriptionPopup({
                  isOpen: true,
                  showVariantOption: false,
                });
              }}
              disabled={disableButton}
              itemAdded={itemAdded}
              index={
                typeof window !== "undefined" &&
                typeof window.itemIndexFromList === "number"
                  ? window.itemIndexFromList
                  : "NA"
              }
              showVp={true}
              setShowSmallVaraint={setShowSmallVaraint}
              showSmallVariant={showSmallVariant}
              showStickyVariantPicker2={
                !showStickyVariantPicker ? showStickyVariantPicker2 : null
              }
              size="md"
              page="pdp"
              ctTitle={
                typeof window !== "undefined" ? window?.navigated_from : ""
              }
              productListId={
                typeof window !== "undefined" ? window?.navigated_from_id : ""
              }
              openCart={cart_config?.open_cart_pdp_mob_static_button}
              // loading={loading}
              productId={product?.id}
              showGoToCart={false}
              mainText={
                subscriptionData?.subscribeButtonText || "Subscribe Now"
              }
              buttonClassName="mobileAddToCartPdp"
              variantId={variantId}
              product={product}
              cta_position="top"
            />
          </S.MobileStaticSubscribeButton>
        )}
        {/* {newProductVariant?.enable ? (
          <S.VaraintPriceContainer>
            <S.VaraintPriceNew>
              ₹ {variantPricing?.priceUndiscounted?.gross?.amount || ""}
              {productListPrice ? <span>₹{productListPrice}</span> : <></>}
              {getVariantDiscount() ? (
                <S.VariantDiscount>
                  {getVariantDiscount()}% OFF 
                </S.VariantDiscount>
              ) : (
                <></>
              )}
            </S.VaraintPriceNew>
            <S.VariantLabel>
              <span>Incl. of all taxes</span>
            </S.VariantLabel>
          </S.VaraintPriceContainer>
        ) : (
          <></>
        )} */}
        {isDesktopScrolling ?
        <ProductVariantDetails
          metaData={metaData}
          selectedVariant={selectedVariant}
        />:
        <></>
        }
        {/* {newProductVariant?.enable ? (
        ) : (
          <></>
        )}
        {!newProductVariant?.enable ? (
          <>
            {ProductCombosData && !!ProductCombosData?.items?.length ? (
              <S.ProductCombo>
                <ProductCombos
                  data={ProductCombosData}
                  selectedVariant={selectedVariant}
                />
              </S.ProductCombo>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )} */}
      </S.Scroller>
      <DeliveryTimer />
      {subscriptionPopup?.isOpen && subscriptionData?.enabled && (
        <ProductSubscriptionPopup
          product={product}
          selectedVariant={selectedVariant}
          setSubscriptionPopup={setSubscriptionPopup}
          subscriptionPopup={subscriptionPopup}
          itemAdded={itemAdded}
          disableButton={disableButton}
          subscriptionData={subscriptionData}
          showOneTimePurchase={subscriptionPopup?.showVariantOption}
          addToCartFunction={addProductToCart}
          // loading={loading}
        />
      )}
      {showSmallVariant?.open && <S.ShowVariantPickerBackground />}
      <S.StickyButtonsStyle zindex={showBottomDrawer}>
        {/* {pdpTimer && pdpTimer > 0 ? (
          <S.DeliveryTimerNew>
            For Fastest delivery, order within{" "}
            <span>
              {hour}:{minutes ? `${minutes}:` : ""}
              {seconds ? `${seconds}` : ""}
            </span>
          </S.DeliveryTimerNew>
        ) : (
          <></>
        )} */}
        <DeliveryTimer positionBottom />
        <S.StickyButtons
          border={showStickyVariantPicker2}
          className={`${className}__productButton`}
        >
          {product.category.slug !== "free-gift-products" &&
            product.category.slug !== "freebies-with-product" && (
              <>
                <S.ATCDesktop>
                  <StyledAddToCartButton
                    onSubmit={disabled => {
                      if (disabled) {
                        if (typeof refetch === "function") {
                          refetch().then(res =>
                            onVariantPickerChange(
                              undefined,
                              res.data.product.variants[0]
                            )
                          );
                        }
                      } else {
                        // handleAddToCart(variantId, 1);
                        // return null;
                        productAddedToCart(
                          product.name,
                          variantId,
                          selectedVariant?.pricing?.price?.gross.amount,
                          product.category,
                          1
                        );
                      }
                    }}
                    ctTitle={
                      typeof window !== "undefined"
                        ? window?.navigated_from
                        : ""
                    }
                    productListId={
                      typeof window !== "undefined"
                        ? window?.navigated_from_id
                        : ""
                    }
                    index={
                      typeof window !== "undefined" &&
                      typeof window.itemIndexFromList === "number"
                        ? window.itemIndexFromList
                        : "NA"
                    }
                    customOnclickHandler={
                      subscriptionData?.enabled && isLowestVariant
                        ? (v_id, product) => {
                            setSubscriptionPopup({
                              isOpen: true,
                              showVariantOption: true,
                            });
                          }
                        : null
                    }
                    disabled={disableButton}
                    itemAdded={itemAdded}
                    size="md"
                    page="pdp"
                    // loading={loading}
                    productId={product?.id}
                    showGoToCart={false}
                    selectVariantWeight={selectVariantWeight}
                    rightIcon={<MemoPdpAddToCartPlix fontSize="24px" />}
                    withIcons
                    buttonClassName="desktopAddToCartPdp"
                    variantId={variantId}
                    forcedDisable={
                      product?.category?.name === "Upsell Products"
                    }
                    product={product}
                  />
                </S.ATCDesktop>

                <S.ATCMobileSticky>
                  <S.SavingButtonContainer>
                    {/* <S.SavingStripDietContainer>
                  {variantId &&
                  product.variants.length &&
                  discountExists(
                    product.variants.find(variant => variant.id === variantId)
                  ) ? (
                    <S.SavingStrip>
                      <MemoSavingAddToCart />
                      <S.SavingText>
                        {" "}
                        You are saving{" "}
                        {variantId &&
                          product.variants.length &&
                          getThisVariantDiscount(
                            product.variants.find(
                              variant => variant.id === variantId
                            ),
                            "12px"
                          )}
                      </S.SavingText>
                    </S.SavingStrip>
                  ) : (
                    <></>
                  )}

                  <div className="product-page__product__gallery__dietPlan">
                    {" "}
                    Free Diet Plan{" "}
                  </div>
                </S.SavingStripDietContainer> */}
                    {(showStickyVariantPicker2 ||
                      (showStickyVariantPicker && showVp)) && (
                      <S.VariantPicker
                        marginBottom={showStickyVariantPicker ? "8px" : "0"}
                        className={`${className}__variantPicker mobileStickyVariantPicker`}
                      >
                        <ProductVariantPicker
                          onProductVariantCardClick={variantBoxClickEvent}
                          onVariantWeightAttributeChange={
                            onVariantWeightAttributeChange
                          }
                          selectVariantWeight={selectVariantWeight}
                          smallVariantPicker={showStickyVariantPicker}
                          smallVariantPicker2={
                            !showStickyVariantPicker
                              ? showStickyVariantPicker2
                              : null
                          }
                          showSmallVariant={showSmallVariant}
                          addProductToCart={addProductToCart}
                          setShowSmallVaraint={setShowSmallVaraint}
                          productVariants={productVariants}
                          imgVariant
                          defaultVarinat={product.defaultVariant}
                          metaData={metaData}
                          onChange={onVariantPickerChange}
                          selectSidebar
                          selectedVariant={selectedVariant}
                          queryAttributes={queryAttributes}
                          onAttributeChangeHandler={onAttributeChangeHandler}
                          product={product}
                        />
                      </S.VariantPicker>
                    )}
                    {/* <S.Hr /> */}
                    <S.PdpStickyButtons>
                      <StyledAddToCartButton
                        onSubmit={disabled => {
                          if (disabled) {
                            if (typeof refetch === "function") {
                              refetch().then(res =>
                                onVariantPickerChange(
                                  undefined,
                                  res.data.product.variants[0]
                                )
                              );
                            }
                          } else {
                            // handleAddToCart(variantId, 1);
                            BottomDrawerObj?.enable !== false &&
                              width < 720 &&
                              sessionStorage.setItem(
                                BOTTOM_DRAWER,
                                JSON.stringify({ enable: false })
                              );
                            productAddedToCart(
                              product.name,
                              variantId,
                              selectedVariant?.pricing?.price?.gross.amount,
                              product.category,
                              1
                            );
                          }
                        }}
                        showVp={true}
                        setShowSmallVaraint={setShowSmallVaraint}
                        showSmallVariant={showSmallVariant}
                        setShowBottomDrawer={setShowBottomDrawer}
                        index={
                          typeof window !== "undefined" &&
                          typeof window.itemIndexFromList === "number"
                            ? window.itemIndexFromList
                            : "NA"
                        }
                        showStickyVariantPicker2={
                          !showStickyVariantPicker
                            ? showStickyVariantPicker2
                            : null
                        }
                        disabled={disableButton}
                        customOnclickHandler={
                          subscriptionData?.enabled && isLowestVariant
                            ? (v_id, product) => {
                                setSubscriptionPopup({
                                  isOpen: true,
                                  showVariantOption: true,
                                });
                              }
                            : null
                        }
                        atcLoading={atcLoading}
                        itemAdded={itemAdded}
                        size="md"
                        page="pdp"
                        ctTitle={
                          typeof window !== "undefined"
                            ? window?.navigated_from
                            : ""
                        }
                        productListId={
                          typeof window !== "undefined"
                            ? window?.navigated_from_id
                            : ""
                        }
                        // loading={loading}
                        productId={product?.id}
                        showGoToCart={false}
                        openCart={cart_config?.open_cart_pdp_mob_buynow_button}
                        mainText={
                          <S.MainText>
                            {/* <S.MainTextLeft>
                        {variantId &&
                          product.variants.length &&
                          getThisVariantPrice(
                            product.variants.find(
                              variant => variant.id === variantId
                            )
                          )}
                      </S.MainTextLeft> */}
                            <S.MainTextRight>
                              {showSmallVariant?.open
                                ? "Add selected pack to cart"
                                : cart_config?.pdp_mob_buynow_button_text ||
                                  "Add To Cart"}
                              <MemoRightArrowPlixCartMobile />
                            </S.MainTextRight>
                          </S.MainText>
                        }
                        // buttonClassName="mobileAddToCartPdp-sticky"
                        buttonClassName="buynowpdp-sticky"
                        variantId={variantId}
                        selectVariantWeight={selectVariantWeight}
                        product={product}
                        cta_position="bottom"
                      />
                      {/* <StyledAddToCartButton
                    onSubmit={disabled => {
                      if (disabled) {
                        if (typeof refetch === "function") {
                          refetch().then(res =>
                            onVariantPickerChange(
                              undefined,
                              res.data.product.variants[0]
                            )
                          );
                        }
                      } else {
                        // handleAddToCart(variantId, 1);
                        productAddedToCart(
                          product.name,
                          variantId,
                          selectedVariant?.pricing?.price?.gross.amount,
                          product.category,
                          1
                        );
                      }
                    }}
                    showVp={showVp}
                    showSmallVariant={showSmallVariant}
                    setShowSmallVaraint={setShowSmallVaraint}
                    showStickyVariantPicker2={
                      !showStickyVariantPicker ? showStickyVariantPicker2 : null
                    }
                    disabled={disableButton}
                    itemAdded={itemAdded}
                    size="md"
                    page="pdp"
                    // loading={loading}
                    productId={product?.id}
                    showGoToCart={false}
                    isBuyNowButton
                    mainText={
                      <S.MainText>
                        <S.MainTextRight>
                          Buy Now
                          <MemoRightArrowPlixCartMobile />
                        </S.MainTextRight>
                      </S.MainText>
                    }
                    buttonClassName="buynowpdp-sticky"
                    variantId={variantId}
                    product={product}
                  /> */}
                    </S.PdpStickyButtons>
                  </S.SavingButtonContainer>
                </S.ATCMobileSticky>
              </>
            )}
        </S.StickyButtons>
      </S.StickyButtonsStyle>
      {subscriptionData?.enabled && (
        <S.ATCDesktop margintop="1rem">
          <StyledAddToCartButton
            // onSubmit={disabled => {
            //   if (disabled) {
            //     if (typeof refetch === "function") {
            //       refetch().then(res =>
            //         onVariantPickerChange(undefined, res.data.product.variants[0])
            //       );
            //     }
            //   } else {
            //     // handleAddToCart(variantId, 1);
            //     // return null;
            //     productAddedToCart(
            //       product.name,
            //       variantId,
            //       selectedVariant?.pricing?.price?.gross.amount,
            //       product.category,
            //       1
            //     );
            //   }
            // }}
            ctTitle={
              typeof window !== "undefined" ? window?.navigated_from : ""
            }
            productListId={
              typeof window !== "undefined" ? window?.navigated_from_id : ""
            }
            index={
              typeof window !== "undefined" &&
              typeof window.itemIndexFromList === "number"
                ? window.itemIndexFromList
                : "NA"
            }
            customOnclickHandler={() => {
              setSubscriptionPopup({
                isOpen: true,
                showVariantOption: false,
              });
            }}
            disabled={disableButton}
            itemAdded={itemAdded}
            size="md"
            page="pdp"
            // loading={loading}
            productId={product?.id}
            showGoToCart={false}
            rightIcon={<MemoPdpAddToCartPlix fontSize="24px" />}
            withIcons
            buttonClassName="desktopAddToCartPdp"
            variantId={variantId}
            forcedDisable={product?.category?.name === "Upsell Products"}
            product={product}
            mainText={subscriptionData?.subscribeButtonText || "Subscribe Now"}
          />
        </S.ATCDesktop>
      )}
      <div className="pdp_perfumes_banner_mobWrapper">
        <QuizBannerSection isPerfumeBanner product={product} />
      </div>

      <>
        <div className="service-support">
          <div className="service-support__card">
            <EasyReturnicon />
            <h3 className="service-support__card__title">Easy Returns</h3>
          </div>
          <div className="service-support__card">
            <CodNewIcon />
            <h3 className="service-support__card__title">COD Available</h3>
          </div>
          <div className="service-support__card">
            <DeliveryIcon />
            <h3 className="service-support__card__title">Delivery in 3 Days</h3>
          </div>
        </div>
      </>

      {/* membership section  */}
      {!isMember &&
      membershipSection &&
      membershipEnable !== false &&
      membershipSection?.pdpData?.enabled ? (
        <div className="product__membership product__membership__mob">
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
                    customEventTrigger(gtmConfig.learnMoreClick.value, user, {
                      heading_name: "Membership Section - PDP",
                    });
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
                      <span className="memership-price-undiscounted">
                        MRP: <span>{membershipSection?.listPrice}</span>
                      </span>
                      <span className="membership-price-discounted">
                        {membershipSection?.mrp}
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
                  Incl. of all taxes
                </div>
                <div
                  className="product__membership__button"
                  style={{
                    pointerEvents: membershipLoading ? "none" : "all",
                  }}
                  onClick={() => {
                    if (gtmConfig.membershipJoinNowClick.enable) {
                      customEventTrigger(
                        gtmConfig.membershipJoinNowClick.value,
                        user,
                        {
                          heading_name: "Membership Section - Pdp",
                        }
                      );
                    }
                    addProductToCart(membershipSection?.variantID);
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
            <div className="product__membershipcard__overlay">
              <div className="product__membershipcard__popup">
                <div className="product__membershipcard__popup__close-icon">
                  <MemoPopCloseIcon
                    onClick={() => setMembershipKnowMore(!membershipKnowMore)}
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
                      addProductToCart(membershipSection?.variantID);
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
                          {membershipPopupData?.atc_text} <MemoCaretRightIcon />
                        </h4>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* membership section  */}

      {/* coupons */}
      {availableOffer && Array.isArray(availableOffer) && (
        <>
          <div className="offerSection">
            <S.OfferHeaderWrapper
              showunderline={showMoreoffer}
              onClick={() => {
                if (gtmConfig.openAvailableOffers.enable && !showMoreoffer) {
                  customEventTrigger(
                    gtmConfig.openAvailableOffers.value,
                    user,
                    {
                      product_name: product?.name,
                    }
                  );
                }
                setshowMoreoffer(!showMoreoffer);
              }}
            >
              <div className="heading flex justify-between items-center">
                <h3>Available Offers</h3>
                <S.OfferCountWrapper>
                  <div className="offerCount">
                    <MemoOfferCount />
                    <span>{availableOffer.length} Offers</span>
                  </div>
                  <S.OfferToggle rotateicon={showMoreoffer}>
                    <div className="">
                      <NewMemoOfferShowmore />
                    </div>
                  </S.OfferToggle>
                </S.OfferCountWrapper>
              </div>
            </S.OfferHeaderWrapper>
            {showMoreoffer && (
              <div className="offerContent">
                <ul>
                  {availableOffer.map(offer => {
                    return (
                      <CopyToClipboard
                        text={offer.code}
                        onCopy={() => {
                          if (gtmConfig.couponCodeCopy.enable) {
                            customEventTrigger(
                              gtmConfig.couponCodeCopy.value,
                              user,
                              {
                                coupon_name: offer.code,
                                product_name: product?.name,
                              }
                            );
                          }
                          copiedHandler(offer.code);
                        }}
                      >
                        <li className="discountCodeContent">
                          <div className="flex justify-between items-center">
                            <h5>
                              <span>{offer.title}</span>
                              <div className="cpnCode">{offer.code}</div>
                            </h5>
                            <span
                              className="cpnBtn"
                              //  onClick={evt => {
                              //     evt.preventDefault();
                              //     navigator.clipboard.writeText(offer.code);
                              //     // notify();
                              //     // copiedHandler(offer.code);
                              // }}
                            >
                              Copy
                            </span>
                          </div>
                          <p>{offer.text}</p>
                          {copiedMessage && selectedCoupon === offer?.code ? (
                            <div id={offer.code} className="copied_overlay">
                              Copied
                            </div>
                          ) : null}
                        </li>
                      </CopyToClipboard>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
      <div className="pdp_quiz_desk">
        <QuizBannerSection product={product} />
      </div>
      {/* Coupons */}
      <>
        {moneyBackSectionData && moneyBackSectionData?.enable === "true" ? (
          <div className="moneybackCart_container">
            <div className="moneybackCart">
              <div className="moneyCart_image">
                <CachedImage
                  url={moneyBackSectionData?.image}
                  isNextImage={true}
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                />
              </div>
              <div className="moneybackCart_content">
                <div className="title ">{moneyBackSectionData?.title}</div>
                <div className="content">
                  {moneyBackSectionData?.text}
                  <a href="/page/money-back-guarantee/" className="contentLink">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </>
      {/* moneyback end */}
      <>
        {pledgeatreeData && pledgeatreeData?.enable === "true" ? (
          <div className="pledgeatree_container">
            <div className="pledgeatree">
              <div className="pledgeatree_image">
                <CachedImage
                  url={pledgeatreeData?.image}
                  key="pledgeatreeData-image"
                  imageDimensions={{
                    height: 80,
                    width: 80,
                  }}
                  imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                  isNextImage
                  alt="Plant A Tree Logo"
                />
              </div>
              <div className="pledgeatree_content">
                <div className="title ">{pledgeatreeData?.title}</div>
                <div className="content">
                  {pledgeatreeData?.text}{" "}
                  <a href="/page/pledge-a-tree/" className="contentLink">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </>
    </S.Container>
  );
};

AddToCartSectionPlixlife.displayName = "AddToCartSectionPlixlife";
export default React.memo(AddToCartSectionPlixlife);
