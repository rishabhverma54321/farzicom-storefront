
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { TaxedMoney } from "@components/molecules/TaxedMoney";
import { PlixLifeFcApplyCoupon } from "@components/molecules/PlixLifeFcApplyCoupon";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { CircularProgress } from "@mui/material";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
// import { ProductDetailPopup } from "@components/farzicom-ui-kit/ProductDetailPopup";
// import MyCustomLink from "@components/next-react/MyCustomLink";
import { getUrlWithParams, isComboProduct } from "@utils/misc";
import { commonMessages } from "@src/utils/intl";
import parse from "html-react-parser";
import {
  useAuth,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import {
  parseJson,
  getMetadataValue,
  isBoxProduct,
  addToCartDataLayer,
  customEventTrigger,
  isMember as isUserMember,
  getItemJourneyInfo,
  getVariantAttributes,
  getItemCategoriesFromAttribute,
  getPrices,
} from "@utils/misc";
import { TypedSectionWithoutChildrenQuery } from "Themes/views/Home/queries";
import { TypedProductListQuery } from "Themes/views/Product/queries";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import MemoUPI from "@components/atoms/SvgIcons/UPI";
import MemoCreditCard from "@components/atoms/SvgIcons/CreditCard";
import RecentlyDeletedProducts from "./RecentlyDeletedProducts";
import { ENABLE_GA4, META_DEFAULTS, showCashback } from "Themes/config";
import { TypedGetWalletAmountWithLogs } from "@components/organisms/Cashbacks/queries";
import MemoSavingAddToCart from "@components/atoms/SvgIcons/SavingAddToCart";
import { ShopMetaContext } from "@src/pages/_app";
import MemoTruckIcon from "@components/atoms/SvgIcons/TruckIcon";
import MemoGiftIcon from "@components/atoms/SvgIcons/GiftIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/material";
import { useRouter } from "next/router";
import { Markup } from "interweave";
// import { PaymentMethods } from "@temp/pages/checkout/formUtils";
import { Offline, OfflinePlaceholder, Online, Overlay, OverlayContext } from "@components/templates";
import Empty from "./Empty";
import Header from "./Header";
import { IProps } from "./types";
import * as S from "./s";
// import Page from "Themes/views/Product/Page";
// import AddToCartSection from "@components/organisms/AddToCartSectionPlixlife";
import queryString from "query-string";
// import { ProductDetails_product_category } from "@temp/pages/product/[name]/gqlTypes/ProductDetails";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import MemoNewTruckIcon from "@components/atoms/SvgIcons/NewTruckIcon";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import MemoCouponPlusIcon from "@components/atoms/SvgIcons/CouponApplyPlusIcon";
// import ProductDetailPopup from "./ProductDetailPopup";
import MemoInfocircle from "@components/atoms/SvgIcons/Infocircle";
import MemoPlusPlix from "@components/atoms/SvgIcons/PlusPlix";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import uniqBy from "lodash/uniqBy";
import gtmConfig from "Themes/lib/gtmConfig";
import { getDBIdFromGraphqlId } from "@utils/core";
import MemoCompletedCouponIcon from "@components/atoms/SvgIcons/CompletedCouponIcon";
import MemoInCompleteCouponIcon from "@components/atoms/SvgIcons/IncompleteCouponIcon";
import MemoArtboard from "@components/atoms/SvgIcons/MemoArtboard";

const Cart: React.FC<IProps> = ({
  breadcrumbs,
  title,
  cartHeader,
  cartFooter,
  cart,
  button,
  continueShopping,
  sanitizeStrip,
  totalDiscount,
  cashbackRecieve,
  emptyCart,
  // setCheckoutDiscounts,
  // overlay,
  refetch,
  prepaidPercent,
  cashbackDiscountTaxedPrice,
  savingAmount,
  checkoutLoading = false,
}: IProps) => {
  const { authenticated } = useAuthState();
  // const { checkout } = useCheckout();
  const { items, totalPrice } = useCartState();
  const {
    useCashback,
    promoCodeDiscount,
    availablePaymentGateways,
    checkout,
  } = useCheckoutState();
  const { removeItemRest } = useCart();
  const [popupstate, setpopupstate] = React.useState(false);
  const overlay = React.useContext(OverlayContext);

  // const { authenticated } = useAuth();
  const history = useCustomHistory();
  const { user } = useAuthState();

  const paymentSummary = useCartState();

  // const shippingTaxedPrice =
  //   checkout?.shippingMethod?.id && shippingPrice
  //     ? {
  //         gross: shippingPrice,
  //         net: shippingPrice,
  //       }
  //     : null;
  // const promoTaxedPrice = discount && {
  //   gross: discount,
  //   net: discount,
  // };
  const {
    checkoutPaymentMethodUpdate,
    addPromoCode,
    removePromoCode,
    checkoutRecalculation,
  } = useCheckout();

  // const intialCashbackState =
  //   !!(
  //     availablePaymentGateways &&
  //     availablePaymentGateways.length &&
  //     availablePaymentGateways[0].id === "mirumee.payments.wallet"
  //   ) ||
  //   !!(cashbackDiscountTaxedPrice && cashbackDiscountTaxedPrice?.gross?.amount);
  const [walletLoading, setWalletLoading] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState(false);

  // const [cartTimer, setCartTimer] = React.useState<number>(0);
  const [crossSell, setCrossSell] = React.useState<any>("first-load");
  const [crossSellHeading, setCrossSellHeading] = React.useState<string>("");
  // assigning it "first-load" rather then pass the initial condition as an empty array [] it prevents to false the below two statement cross-sell and upsell

  const [cartError, setCartError] = React.useState("");
  // const [couponAppliedFromCart, setCouponAppliedFromCart] = React.useState("");
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const [isQuizProductInCart, setIsQuizProductInCart] = React.useState<boolean>(false);
  const [
    isMemberShipProductInCart,
    setIsMembershipProductInCart,
  ] = React.useState<boolean>(false);
  const [membershipLoading, setMembershipLoading] = React.useState(false);
  const [membershipKnowMore, setMembershipKnowMore] = React.useState(false);
  const { addToCartRest, updateItemWithLinesRest } = useCart();
  const [isBoxInCart, setIsBoxInCart] = React.useState<boolean>(
    items && items.some(item => isBoxProduct(item))
  );
  const gokwikConfig =
    getMetadataValue(ShopMetaContextValue, "gokwik_config") &&
    JSON.parse(getMetadataValue(ShopMetaContextValue, "gokwik_config"));

  // const [useCashback, setUseCashback] = React.useState(intialCashbackState);
  const [productdata, setproductdata] = React.useState(null);

  // const onAttributeChangeHandler = (slug: string | null, value: string) => {
  //   history.replace(
  //     queryString.stringifyUrl(
  //       {
  //         query: { [slug]: value },
  //         url: `${location.pathname}${location.search}`,
  //       },
  //       { skipEmptyString: true }
  //     )
  //   );
  // };

  const handleCashbackClick = async () => {
    // setUseCashback(!useCashback);
    await checkoutPaymentMethodUpdate(
      {
        gateway: "mirumee.payments.razorpay",
        useCashback: !useCashback,
      },
      false
    );
  };

  const router = useRouter();

  // React.useEffect(() => {
  //   if (typeof window !== undefined) {
  //     window.proceedToGokwikCheckout = proceedToGokwikCheckout;
  //     window.isGokwik = false;
  //     const event = new Event("cartRendered");
  //     document.dispatchEvent(event);
  //   }
  //   return () => {
  //     const elements = document.querySelectorAll(".cart-plix__footer__button");
  //     elements.forEach(element => {
  //       element.removeEventListener("click", () => {
  //         window.proceedToGokwikCheckout();
  //       });
  //     });
  //   };
  // }, [items, checkout]);

  // Prefetch checkout page json
  React.useEffect(() => {
    router.prefetch("/checkout/address");
    // router.prefetch("/page/login");
    router.prefetch("/order-placed");
  }, []);

  const beginCheckoutChecker = beginCheckoutType => {
    return {
      event: beginCheckoutType?.value,
      user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
      user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
      membership_status: isUserMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
      ecommerce: {
        currency: "INR",
        coupon: checkout?.voucherCode || "NA",
        value: totalPrice?.gross?.amount,
        items: items?.map(item => {
          const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
          const productVariantName = getVariantAttributes(
            "Flavors",
            item?.variant
          );
          const { discountAmount } = getPrices(
            item?.variant?.product,
            false,
            item?.variant
          );
          const categories = getItemCategoriesFromAttribute(item?.variant);
          const isMonthIncluded = categories?.sizeCategory2
            ?.toLowerCase()
            ?.includes("month");
          return {
            item_id: item.variant?.product?.id
              ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product")
              : null,
            item_name: item?.variant?.product?.name,
            item_brand: "plixlife",
            currency: "INR",
            discount: discountAmount,
            coupon: checkout?.voucherCode || "NA",
            quantity: item?.quantity,
            item_category: item?.variant?.product?.category?.name,
            item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
            item_category3: categories?.sizeCategory1 || "NA",
            item_category4: isMonthIncluded
              ? "NA"
              : categories?.sizeCategory2 || "NA",
            price: item?.variant?.pricing?.price?.gross?.amount,
            item_variant: productVariantName,
            item_list_name: itemJourneyInfo?.addedFrom || "NA",
            item_list_id: itemJourneyInfo?.productListId || "NA",
            index: "NA",
          };
        }),
      },
    };
  };

  const findQuizProducts = React.useCallback((items: any) => {
      let totalQuizProducts: number = 0;

      items.some(item => {
        const metadata = item?.variant?.metadata || [];
        const variantConfig =
          metadata &&
          getMetadataValue(metadata, "variant_config") &&
          parseJson(getMetadataValue(metadata, "variant_config"));

        if (variantConfig && (variantConfig?.is_skin_quiz || variantConfig?.is_hair_quiz)) {
          totalQuizProducts += Number(item?.quantity);
          return false; // Continue to the next item
        } 
        if (
          item?.variant?.product?.category?.slug === "freebies-with-product"
        ) {
          return false;
        }
        totalQuizProducts = 0;
        return true; // Break the loop
      });
      if (totalQuizProducts && totalQuizProducts < 2) {
        return false;
      }
      return true;
    },
    [items]
  );

  const isPresentMinSkinQuizProducts = findQuizProducts(items);

  function proceedToGokwikCheckout() {
    if (
      items &&
      items.length &&
      items.some(
        item =>
          item?.variant?.product?.category?.name == "All Products" ||
          item?.variant?.product?.category?.name == "Byob Products" ||
          item?.variant?.product?.category?.name == "Membership"
      )
    ) {
      const isPresentMinSkinQuizProducts = findQuizProducts(items);
      if (isPresentMinSkinQuizProducts) {
        overlay.hide();
        // Begin Checkout on Proceed click
        try {
          if (ENABLE_GA4) {
            if (
              typeof window !== "undefined" &&
              window.dataLayer &&
              gtmConfig.beginCheckout.enable
            ) {
              window.dataLayer.push({ ecommerce: null });
              (window.dataLayer = window.dataLayer || []).push(
                beginCheckoutChecker(gtmConfig.beginCheckout)
              );
            }
          }
        } catch (error) {
          console.log("Error in begin_checkout event -->", error);
        }
        // router.push("/checkout/address?redirect_from=proceed-to-pay");
        if (gokwikConfig && gokwikConfig?.enable) {
          (window.dataLayer = window.dataLayer || []).push(
            beginCheckoutChecker(gtmConfig.gkBeginCheckout)
          );
          gokwikSdk.initCheckout({
            environment: gokwikConfig?.environment || "sandbox",
            type: gokwikConfig?.type || "merchantInfo",
            mid: gokwikConfig?.mid || "",
            merchantParams: {
              merchantCheckoutId: checkout?.token || "",
            },
          });
          overlay.hide();
        }
      } else {
        setCartError(`You can't checkout with less than 2 quiz products.`);
      }
    } else {
      setCartError("Please add any product along with this");
    }
  }

  // Function to check cart items before proceeding to checkout
  const proceedToCheckout = () => {
    // Cart should contain atleast one product from All Products Category.

    if (
      items &&
      items.length &&
      items.some(
        item =>
          item?.variant?.product?.category?.name == "All Products" ||
          item?.variant?.product?.category?.name == "Byob Products" ||
          item?.variant?.product?.category?.name == "Membership"
      )
    ) {
        overlay.hide();
        // Begin Checkout on Proceed click
        try {
          if (ENABLE_GA4) {
            if (
              typeof window !== "undefined" &&
              window.dataLayer &&
              gtmConfig.beginCheckout.enable
            ) {
              window.dataLayer.push({ ecommerce: null });
              (window.dataLayer = window.dataLayer || []).push(
                beginCheckoutChecker(gtmConfig.beginCheckout)
              );

              try {
                const products = paymentSummary?.items?.map(item => {
                  return {
                    brand: META_DEFAULTS.name,
                    id: item?.variant.sku,
                    name: item?.variant.product.name,
                    price: item?.variant.pricing.price.gross.amount,
                    quantity: item.quantity,
                  };
                });
                const quantity = paymentSummary?.items?.reduce(
                  (partialSum, a) => partialSum + a?.quantity,
                  0
                );
  
                (window.dataLayer = window.dataLayer || []).push({
                  event: "Checkout",
                  ecommerce: {
                    checkout: {
                      actionField: {
                        step: 1,
                        option: "Proceed To Pay",
                      },
                      products,
                      totalQuantity: quantity,
                      couponCode: promoCodeDiscount?.voucherCode,
                      "coupon discount": paymentSummary.couponDiscount?.gross?.amount,
                      "offer discount": paymentSummary.offerDiscount?.gross?.amount,
                      "order total": paymentSummary.totalPrice?.gross?.amount,
                      "delivery charges": paymentSummary.shippingPrice?.gross?.amount,
                      "prepaid discount": paymentSummary.prepaidDiscount?.gross?.amount,
                      "total discount": paymentSummary.discount?.amount,
                      "total cart value": paymentSummary.totalPrice?.gross?.amount,
                    },
                  },
                });
              } catch (error) {
                console.log("error in 'Checkout' event -->", error)
              }
            }
          }
        } catch (error) {
          console.log("Error in begin_checkout event -->", error);
        }
        if (gokwikConfig && gokwikConfig?.enable) {
          // (window.dataLayer = window.dataLayer || []).push(
          //   beginCheckoutChecker(gtmConfig.gkBeginCheckout)
          // );
          gokwikSdk.initCheckout({
            environment: gokwikConfig?.environment || "sandbox",
            type: gokwikConfig?.type || "merchantInfo",
            mid: gokwikConfig?.mid || "",
            merchantParams: {
              merchantCheckoutId: checkout?.token || "",
            },
          });
          overlay.hide();
        } else {
          router.push(
            getUrlWithParams("/checkout/address", {
              redirect_from: "proceed-to-pay",
            })
          );
        }
        // }
      // } else {
      //   setCartError(`You can't checkout with less than 2 quiz products.`);
      // }
    } else {
      setCartError("Please add any product along with this");
    }
  };

  // React.useEffect(() => {
  //   localStorage.setItem("useCashback", `${useCashback}`);
  // }, [useCashback]);

  // React.useEffect(() => {
  //   if (
  //     cashbackDiscountTaxedPrice &&
  //     cashbackDiscountTaxedPrice?.gross?.amount
  //   ) {
  //     setUseCashback(true);
  //   } else {
  //     setUseCashback(false);
  //   }
  // }, [cashbackDiscountTaxedPrice, cashbackDiscountTaxedPrice?.gross?.amount]);

  const roundedSavingAmount =
    savingAmount && parseFloat(savingAmount)?.toFixed(1);

  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  const membershipdata =
    getMetadataValue(ShopMetaContextValue, "membership_v3") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "membership_v3"));

  const membershipPopupData = membershipdata?.cartData?.popupData_new;

  const codChargeProduct =
    getMetadataValue(ShopMetaContextValue, "cod_charge_product") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "cod_charge_product"));

  let codChargeProductDBVariantId;
  if (codChargeProduct?.variantID && codChargeProduct?.enabled) {
    try {
      codChargeProductDBVariantId = getDBIdFromGraphqlId(
        codChargeProduct.variantID,
        "ProductVariant"
      );
    } catch (error) {
      console.log("Error --> ", error);
    }
  }

  React.useEffect(() => {
    if (
      (items &&
        items.length &&
        items.every(
          (item: any) =>
            item?.variant?.product?.category?.name ===
            "Others also Liked Products"
        )) ||
      items.every(
        (item: any) =>
          item?.variant?.product?.category?.name === "Upsell Products"
      )
    ) {
      items.map(item => {
        removeItemRest(item?.variant?.id, true, isRecalculate).then(() => {});
      });
    }
    if (items?.length) {
      const code = sessionStorage.getItem("coupon-from-params");
      items?.find(item => {
        const metadata = item?.variant?.product?.metadata || [];
        const productConfig =
          metadata &&
          getMetadataValue(metadata, "product_config") &&
          parseJson(getMetadataValue(metadata, "product_config"));
        if (productConfig && productConfig?.is_bxgy_product && code) {
          handlePromoCodeApply(code);
          return true;
        }
        return false;
    });

    // check if quiz product is available in cart
      const checkIsQuizProductInCartPresent: boolean = items?.some(item => {
        const variantMetadata = item?.variant?.metadata || [];
        const variantConfig =
          variantMetadata &&
          getMetadataValue(variantMetadata, "variant_config") &&
          parseJson(getMetadataValue(variantMetadata, "variant_config"));
        if (
          variantConfig &&
          (variantConfig?.is_skin_quiz ||
            variantConfig?.is_hair_quiz ||
            variantConfig?.is_weight_bundle_quiz ||
            variantConfig?.is_weight_quiz)
        ) {
          return true;
        }
        return false;
      });
      setIsQuizProductInCart(checkIsQuizProductInCartPresent);
    }
    if (items.length == 0) {
      localStorage.removeItem("firstAtcTime");
    }
    if (membershipdata?.variantID) {
      setIsMembershipProductInCart(
        items.some(item => item.variant?.id === membershipdata?.variantID)
      );
    }
    setIsBoxInCart(
      items && items.some(item => isBoxProduct(item) && !isComboProduct(item))
    );
    if (
      codChargeProduct?.enabled &&
      codChargeProduct?.variantId &&
      items &&
      items?.length === 1 &&
      items?.every(item => item.variant.id === codChargeProduct?.variantId)
    ) {
      setCartLoading(true);
      removeItemRest(
        codChargeProduct?.variantId,
        true,
        isRecalculate
      ).finally(() => setCartLoading(false));
    }
    if (
      codChargeProduct?.enabled &&
      codChargeProductDBVariantId &&
      items?.length &&
      availablePaymentGateways &&
      // availablePaymentGateways[0]?.id === PaymentMethods.COD &&
      !items?.find(item => item?.variant?.id === codChargeProduct?.variantId)
    ) {
      setCartLoading(true);
      updateItemWithLinesRest([
        { variantId: codChargeProductDBVariantId, quantity: 1 },
      ]).finally(() => setCartLoading(false));
    }
  }, [items]);

  const completelyLoaded = items?.filter(item => item.variant.sku);

  const cartUpsellSection =
    getMetadataValue(ShopMetaContextValue, "upsellSection") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "upsellSection"));

  const cartHeaderSectionData =
    getMetadataValue(ShopMetaContextValue, "card_header_text") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "card_header_text"));

  const cartShowCashbackData =
    getMetadataValue(ShopMetaContextValue, "show_cashback_text") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "show_cashback_text"));

  const cartShowCrossSell =
    getMetadataValue(ShopMetaContextValue, "cross_sell_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "cross_sell_config"));

  const offerPolicies =
    getMetadataValue(ShopMetaContextValue, "offer_policies") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "offer_policies"));

  const cartBanner =
    getMetadataValue(ShopMetaContextValue, "cart_banner") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "cart_banner"));

  const recalculation_toggle =
    getMetadataValue(ShopMetaContextValue, "recalculation_toggle") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "recalculation_toggle"));

  const offersDataList =
    getMetadataValue(ShopMetaContextValue, "available_offers_new") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "available_offers_new"));

  const cashbackRecieveRounded =
    cashbackRecieve &&
    typeof cashbackRecieve === "string" &&
    parseInt(cashbackRecieve);

  // let interval_id = null;
  // const timeValue = localStorage.getItem(`firstAtcTime`);
  // React.useEffect(() => {
  //   if (timeValue) {
  //     clearInterval(interval_id);
  //     interval_id = setInterval(() => {
  //       const timeValueNew = localStorage.getItem(`firstAtcTime`);
  //       const diffInSecs = Math.round(
  //         (parseInt(timeValue) + 10 * 60 * 1000 - new Date().getTime()) / 1000
  //       );
  //       if (diffInSecs > 0) {
  //         setCartTimer(diffInSecs);
  //       } else {
  //         setCartTimer(0);
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

  React.useEffect(() => {
    if (cartShowCrossSell && cartShowCrossSell?.enable) {
      if (!!items.length) {
        handleCrossSell();
      }
    } else {
      setCrossSell([]);
    }
  }, [checkout?.lines]);

  const handleCrossSell = () => {
    let crossProductData = [];
    let isFirstPerfumePdp: boolean = false;
    // store cross sell product ids

    Array.isArray(items) &&
      !!items?.length &&
      items?.forEach(items => {
        if (items?.variant?.product?.metadata) {
          let isCrossSell =
            getMetadataValue(
              items?.variant?.product?.metadata,
              "related_products"
            ) &&
            parseJson(
              getMetadataValue(
                items?.variant?.product?.metadata,
                "related_products"
              )
            );
          let perfumeProductData =
            getMetadataValue(
              items?.variant?.product?.metadata,
              "is_perfume_pdp"
            ) &&
            parseJson(
              getMetadataValue(
                items?.variant?.product?.metadata,
                "is_perfume_pdp"
              )
            );
          if (Array.isArray(isCrossSell) && !!isCrossSell?.length) {
            if (!crossProductData?.length && perfumeProductData) {
              isFirstPerfumePdp = true;
            }
            if (isFirstPerfumePdp) {
              crossProductData = !!perfumeProductData
                ? [...crossProductData, ...isCrossSell]
                : [...crossProductData];
            } else {
              crossProductData = !!perfumeProductData
                ? [...crossProductData]
                : [...crossProductData, ...isCrossSell];
            }
          }
        }
      });

    // removing duplicate elements from array
    const FilterCrossProductIds = uniqBy(crossProductData, "id")?.slice(0, 6);
    // removing duplicate elements from array
    if (isFirstPerfumePdp) {
      setCrossSellHeading(cartShowCrossSell?.perfume_heading);
    } else {
      setCrossSellHeading(cartShowCrossSell?.heading);
    }

    setCrossSell([...FilterCrossProductIds]);
  };

  const popupstateHandler = product => {
    setproductdata(product);
    setpopupstate(true);
  };

  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");



  React.useEffect(() => {
    if (isMember && membershipdata?.variantID) {
      const includeMemberProduct = items.findIndex(
        item => item?.variant?.id === membershipdata?.variantID
      );
      if (includeMemberProduct !== -1) {
        setCartLoading(true);
        removeItemRest(
          membershipdata?.variantID,
          true,
          isRecalculate
        ).finally(() => setCartLoading(false));
      }
      
    }
  }, [isMember]);
  // For benifit icons
  const memberBenefitData = membershipdata?.cartData?.benefitPoints
  const totalMembershipDiscount =
    membershipdata &&
    Math.ceil(
      ((membershipdata.listPrice?.substring(1) -
        membershipdata.mrp?.substring(1)) *
        100) /
        membershipdata.listPrice?.substring(1)
    );

  const addMembershipProductToCart = async variant_id => {
    if (variant_id) {
      setMembershipLoading(true);
      try {
        await addToCartRest(
          variant_id,
          1,
          undefined,
          undefined,
          false,
          isRecalculate
        )
          .then(res => {
            const membership = res?.data?.lines?.filter(
              line => line.variant.id === variant_id
            )[0];
            addToCartDataLayer(
              res,
              membership?.variant?.product,
              variant_id,
              membership
            );
            customEventTrigger("membership_add_to_cart", user);
            try {
              addToCartTrack(ShopMetaContextValue, {
                product_name: membership?.variant?.product?.name,
                product_id: membership?.variant?.product?.id,
                quantity: 1,
                product_price:
                  membership?.variant?.pricing?.price?.gross?.amount,
                currency: membership?.variant?.pricing?.price?.gross?.currency,
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
  };

  const offer_progressbar_data =
    getMetadataValue(ShopMetaContextValue, "offer_progress_bar_new") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "offer_progress_bar_new"));

  const {
    nextOffer,
    progressPercent,
    unlockedOffer,
    nextOfferPendingAmount,
    allOfferWithRelativePercentages,
  } = useOfferProgressBar(offer_progressbar_data?.offers);

  const handlePromoCodeApply = async promoCode => {
    const { data, errors } = await addPromoCode(
      promoCode,
      false,
      isRecalculate
    );
    const voucherCode = data?.checkoutAddPromoCode.checkout?.voucherCode;
    if (errors) {
      setCartError("Failed to apply coupon code.");
    } else if (!voucherCode) {
      setCartError("Invalid Coupon Code");
    } else {
      // setCouponAppliedFromCart("Applied");
    }
  };

  return (
    <>
      {/* {popupstate && (
        <ProductDetailPopup
          productdata={productdata}
          setpopupstate={setpopupstate}
          popupFor="cart"
        />
      )} */}
      {membershipKnowMore ? (
        <div className="cart-plix__membershipcard__popup__shadow"></div>
      ) : (
        <></>
      )}
      <Online>
        <div className="cart-plix">
          {/* <Header overlayHide={overlay.hide} /> */}
          {items?.length || checkoutLoading ? (
            <>
              {(completelyLoaded?.length === items.length ||
                items.length > 1) && (
                <>
                  <div>
                    {cartHeaderSectionData &&
                    cartHeaderSectionData?.text &&
                    cartHeaderSectionData?.enable === "true" ? (
                      <div className="cart-plix__offerHeader">
                        {cartHeaderSectionData?.text}
                      </div>
                    ) : (
                      <> </>
                    )}
                  </div>
                </>
              )}
              <div
                style={{
                  overflowY: "scroll",
                  gridArea: "list",
                }}
                className="cart-plix__info__container"
                id="cart-plix-scrollable-area"
              >
                <>
                  {(unlockedOffer || nextOffer) &&
                    offer_progressbar_data?.enabled && (
                      <div
                        className="cart-plix__progressBar"
                        style={{
                          paddingBottom: !unlockedOffer ? "24px" : "0px",
                        }}
                      >
                        {/* {unlockedOffer &&
                          promoCodeDiscount?.voucherCode !==
                            unlockedOffer?.code && (
                            <div className="cart-plix__progressBar__unlockedOffer">
                              <span>
                                <Markup
                                  content={unlockedOffer?.unlockText}
                                  className="markuptext"
                                />
                              </span>
                              <button
                              disabled={checkoutLoading}
                              style={{
                                backgroundColor: checkoutLoading
                                  ? "lightgray"
                                  : "",
                              }}
                              onClick={() =>
                                handlePromoCodeApply(unlockedOffer?.code)
                              }
                            >
                              Apply Code
                            </button>
                            </div>
                          )} */}
                          {progressPercent &&
                          typeof progressPercent === "number" &&
                          !(
                            promoCodeDiscount?.voucherCode ===
                              unlockedOffer?.code && !nextOffer
                          ) ? (
                            <div className="cart-plix__progressBar__bar">
                              <S.ProgressBar percent={progressPercent}>
                                <S.ProgressBarFill percent={progressPercent} />
                                {/* <span className="greentick">
                                    <MemoProgressTick />
                                  </span> */}
                                {allOfferWithRelativePercentages?.map((offer,index) => {
                                  const isUnlocked =
                                    offer?.relativePercentage <= progressPercent;
                                  if (isUnlocked) {
                                    return (
                                      <S.CouponUnlockIcon
                                        leftPosition={
                                          offer?.relativePercentage - 8
                                        }
                                        key={`${offer?.relativePercentage} + ${index}`}
                                        isUnlocked={isUnlocked}
                                      >
                                        
                                        <span className="complete-icon"><MemoCompletedCouponIcon /></span>
                                        {/* <span>{offer?.subText}</span> */}
                                      </S.CouponUnlockIcon>
                                    );
                                  } else {
                                    return (
                                      <S.CouponUnlockIcon
                                        key={`${offer?.relativePercentage} + ${index}`}
                                        leftPosition={
                                          offer?.relativePercentage - 8
                                        }
                                      >
                                        <span className="incomplete-icon"><MemoInCompleteCouponIcon /></span>
                                        {/* <span>{offer?.subText}</span> */}
                                      </S.CouponUnlockIcon>
                                    );
                                  }
                                })}
                              </S.ProgressBar>
                            </div>
                          ) : (
                            <></>
                          )}
                        {(unlockedOffer || nextOffer) &&
                        offer_progressbar_data?.enabled ? (
                          <div className="cart-plix__progressBar__nextOffer">
                            {unlockedOffer?.unlockText &&
                            promoCodeDiscount?.voucherCode !==
                              unlockedOffer?.code ? (
                              <div>
                                <MemoArtboard />
                                <span>
                                <Markup
                                    content={unlockedOffer?.unlockText}
                                    className="markuptext"
                                  />
                              </span>
                            </div>
                            ) : (<></>)}
                            
                            {/* <div>
                              <MemoArtboard />
                              <span>
                                <Markup
                                  content={nextOffer?.prefix_text}
                                  className="markuptext"
                                />
                              </span>
                              <span className="cart-plix__progressBar__nextOffer__amount">
                                &#8377;{nextOfferPendingAmount}
                              </span>
                            </div> */}
                            {nextOffer && nextOfferPendingAmount ? (
                              <div>
                                <MemoArtboard />
                                <div style={{ width: "95%" }}>
                                <Markup
                                    content={nextOffer?.prefix_text}
                                    className="markuptext"
                                />
                                  <span className="progress-amount">
                                    &#8377;{nextOfferPendingAmount}
                                  </span>{" "}
                                  <Markup
                                    content={nextOffer?.suffix_text}
                                  className="markuptext"
                                />
                                </div>
                              </div>
                            ) : (
                            <></>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                        {unlockedOffer ? (
                          <div className="coupon_code_button_wrapper">
                            <div className="coupon">{unlockedOffer?.code}</div>
                            <button
                              disabled={
                                checkoutLoading ||
                                isBoxInCart ||
                                checkout?.voucherCode === unlockedOffer?.code
                              }
                              style={{
                                color:
                                  checkoutLoading ||
                                  isBoxInCart ||
                                  checkout?.voucherCode?.toLowerCase() ===
                                    unlockedOffer?.code?.toLowerCase()
                                    ? "white"
                                    : "",
                                pointerEvents:
                                  checkoutLoading ||
                                  isBoxInCart ||
                                  checkout?.voucherCode?.toLowerCase() ===
                                    unlockedOffer?.code?.toLowerCase()
                                    ? "none"
                                    : "all",
                                backgroundColor:
                                  checkoutLoading ||
                                  isBoxInCart ||
                                  checkout?.voucherCode?.toLowerCase() ===
                                    unlockedOffer?.code?.toLowerCase()
                                    ? "gray"
                                    : "",
                              }}
                              onClick={() => {
                                customEventTrigger("apply_code_click", user, {
                                  coupon_name: unlockedOffer?.code,
                                });
                                handlePromoCodeApply(unlockedOffer?.code);
                              }}
                            >
                              {checkout?.voucherCode?.toLowerCase() ===
                              unlockedOffer?.code?.toLowerCase()
                                ? "Applied"
                                : "Apply"}
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* <div className="coupon-applied-popup">
                        <Snackbar
                          open={couponAppliedFromCart !== ""}
                          autoHideDuration={3000}
                          onClose={() => setCouponAppliedFromCart("")}
                        >
                          <Alert severity="success">
                            {couponAppliedFromCart}
                          </Alert>
                        </Snackbar>
                      </div> */}
                      </div>
                    )}
                </>
                {/* Cart Banner Code  */}
                {cartBanner && cartBanner?.enable ? (
                  <div className="cart-plix__banner">
                    <CachedImage
                      url={cartBanner?.image}
                      isNextImage
                      imgixSizes="100vw"
                      nextImageLayout="fill"
                    />
                  </div>
                ) : (
                  <></>
                )}
                {/* NEW MEMBERSHIP CARD */}
                {
                  !isMember &&
                  membershipdata &&
                  membershipdata?.cartData?.enabled &&
                  !isMemberShipProductInCart && (
                    <div className="new-membership-card-wrapper">
                      <div className="new-membership-card-inner">
                        <div className="new-membership-card-content">
                          <div className="new-membership-card-img">
                            <CachedImage
                              imgixSizes="100vw"
                              url={membershipdata?.cartData?.imgUrl}
                            />
                          </div>
                          <div className="new-membership-card-text">
                            <div>
                              <span className="membership-title">{membershipdata?.cartData?.headerText}</span>
                              {totalMembershipDiscount > 0 && (
                                <S.Discounted>
                                  <button>
                                    {totalMembershipDiscount}% OFF
                                  </button>
                                </S.Discounted>
                              )}
                            </div>
                            <div>
                              <span>{membershipdata?.cartData?.duration}</span>
                            {totalMembershipDiscount > 0 ? (
                                  <S.PriceContainer>
                                  <span className="price-undiscounted">
                                    {membershipdata?.listPrice}
                                  </span>
                                    <span className="price-discounted">
                                      {membershipdata?.mrp}
                                    </span>
                                  </S.PriceContainer>
                                ) : (
                                  <S.PriceContainer>
                                    <span className="price-discounted">
                                      {membershipdata?.mrp}
                                    </span>
                                  </S.PriceContainer>
                                )}
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="new-membership-card-footer">
                          <div className="benefit-content">
                            {Array.isArray(memberBenefitData) ? (memberBenefitData.map((item,i)=>{
                              return(
                                <div className="benefit-item" key={`benefit_${i}`}>
                                  <div className="benefit-icon">
                                    <CachedImage 
                                      url={item?.iconURL}
                                      alt="BenefitIcon"
                                      isNextImage
                                      imageDimensions={{ width: 100, height: 100 }}
                                    />
                                  </div>
                                  <p>{item.text ? parse(item.text) : ""}</p>
                                </div>
                              )
                            })) : (<></>)}
                          </div>
                          <button
                            disabled={membershipLoading}
                            className="cart-plix__membershipcard__body_buttongroup_joinNow"
                            onClick={e => {
                              if (!e.detail || e.detail == 1) {
                                addMembershipProductToCart(
                                  membershipdata?.variantID
                                );
                                if (gtmConfig.membershipJoinNowClick.enable) {
                                  customEventTrigger(
                                    gtmConfig.membershipJoinNowClick.value,
                                    user,
                                    {
                                      heading_name: "Membership Section - Cart",
                                    }
                                  );
                                }
                              }
                            }}
                          >
                            {membershipLoading ? (
                              <div className="cart__loader">
                                <CircularProgress color="inherit" />
                              </div>
                            ) : (
                              <></>
                            )}
                            + Join Now
                          </button>
                          <div 
                          className="benefit-learn" 
                          onClick={() => {
                              customEventTrigger(
                                gtmConfig.learnMoreClick.value,
                                user,
                                {
                                  heading_name: "Membership Section - Cart",
                                }
                              );
                              setMembershipKnowMore(!membershipKnowMore);
                            }}><MemoInfocircle /> <span>Learn</span></div>
                        </div>
                      </div>
                      {membershipKnowMore && membershipPopupData && (
                          <div className="cart-plix__membershipcard__popup">
                            <div className="cart-plix__membershipcard__popup__close-icon">
                              <MemoPopCloseIcon
                                onClick={() =>
                                  setMembershipKnowMore(!membershipKnowMore)
                                }
                              />
                            </div>
                            {membershipPopupData?.heading && (
                              <div className="cart-plix__membershipcard__popup__header">
                                <div>
                                  {membershipPopupData?.heading}
                                  <span>
                                    {membershipPopupData?.heading_emoji}
                                  </span>
                                </div>
                              </div>
                            )}

                            {membershipPopupData?.right_icon ? (
                              <div className="cart-plix__membershipcard__popup__right-icon">
                                <CachedImage
                                  url={membershipPopupData?.right_icon}
                                  isNextImage
                                  imageDimensions={{ width: 100, height: 100 }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}

                            {Array.isArray(
                              membershipPopupData?.membership_data
                            ) && (
                              <div className="cart-plix__membershipcard__popup__body">
                                {/* <div className="benifitsList"> */}
                                {membershipPopupData?.membership_data?.map(
                                  (item, index) => (
                                    <div key={`${item?.level}+${index}`} className="cart-plix__membershipcard__popup__cards">
                                      <div className="cart-plix__membershipcard__popup__cards__header">
                                        {item?.level_background ? (
                                          <div className="cart-plix__membershipcard__popup__cards__header__background">
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
                                          <div className="cart-plix__membershipcard__popup__cards__header__levelImg">
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
                                        <div className="cart-plix__membershipcard__popup__cards__header__title">
                                          {item?.level || ""}
                                        </div>
                                      </div>
                                      <div className="cart-plix__membershipcard__popup__cards__body">
                                        <div className="cart-plix__membershipcard__popup__cards__body__title">
                                          {item?.level_heading || ""}
                                        </div>
                                        {Array.isArray(item?.benefit_icons) &&
                                        !!item?.benefit_icons.length ? (
                                          <div className="cart-plix__membershipcard__popup__cards__body__benefits">
                                            {item?.benefit_icons?.map((list, index) => (
                                              <div key={`${list?.text}+${index}`} className="cart-plix__membershipcard__popup__cards__body__benefits__card">
                                                {list?.icon ? (
                                                  <div className="cart-plix__membershipcard__popup__cards__body__benefits__card__img">
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
                                                <div className="cart-plix__membershipcard__popup__cards__body__benefits__card__text">
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
                                  )
                                )}
                              </div>
                            )}
                            {membershipPopupData?.text && (
                              <div className="cart-plix__membershipcard__popup__bottomText">
                                {membershipPopupData?.text}
                              </div>
                            )}

                            <div className="membership_popup_button">
                              <button
                                disabled={membershipLoading}
                                onClick={() => {
                                  addMembershipProductToCart(
                                    membershipdata?.variantID
                                  );
                                  setMembershipKnowMore(false);
                                }}
                              >
                                <div>
                                  <span className="cart-plix__membershipcard__popup__bottomText_listPrice">
                                    {membershipdata?.listPrice}
                                  </span>
                                  /<span>{membershipdata?.mrp}</span>
                                </div>
                                <h4>
                                  {membershipPopupData?.atc_text}{" "}
                                  <MemoCaretRightIcon />
                                </h4>
                              </button>
                            </div>
                          </div>
                      )}
                    </div>
                  )
                }
                  
                {/* NEW MEMBERSHIP CARD */}
                 {/* Cart Banner Code  */}
                


                <div className="cart-plix__sectionHeader">Products Added:</div>
                <div className="cart-plix__info">{cart}</div>
                {/* recently deleted products from cart (Add back to the cart ) */}
                <RecentlyDeletedProducts />
                {/* recently deleted products from cart (Add back to the cart ) */}
                <S.Hr
                  border={{
                    width: "4px",
                    type: "solid",
                    color: "#F5F5F5",
                  }}
                  marginTop="1rem"
                  hrFullWidth
                />
                {!isQuizProductInCart ? ( // Hide cross-sell in case of quiz product
                  <>
                    {/* cross sell products  */}
                    {Array.isArray(crossSell) && !!crossSell?.length ? (
                      <TypedProductListQuery
                        variables={{
                        ids: crossSell?.map(item => item?.id),
                        first: 10,
                        }}
                        fetchPolicy="cache-first"
                      >
                        {({ data, loading, refetch }) => {
                        // check if products are enable show in product listings from dashboard
                        if (data && !loading && !!data?.products?.edges?.length) {
                          const fasterProductlistData = data?.products?.edges?.map(
                            edge => edge?.node
                          );
                          return (
                            <div className="cart-plix-cross-sell">
                              <ProductHeader
                                headerClass=""
                                heading={crossSellHeading}
                              />
                              <div className="upsell_product_slider">
                                <MemoizedProductList
                                  products={
                                    crossSell
                                      ?.map(element => {
                                        const arrangedProducts = fasterProductlistData?.find(
                                          obj => obj?.id === element?.id
                                        );
                                        return arrangedProducts;
                                      })
                                      .filter(element => element !== undefined)
                                    // arrange the products acc to products ids in metadata
                                  }
                                  isCarousel
                                  refetch={refetch}
                                  slidesOnDesktop={2}
                                  carouselProps={{
                                    arrows: true,
                                    dots: true,
                                    infinite: true,
                                  }}
                                  ctTitle="plixlife-faster-results-cart"
                                  parentProducts={
                                    Array.isArray(items)
                                      ? items[0]?.variant?.product?.id
                                      : ""
                                  }
                                  // cardTag={{
                                  //   name: collection2SectionData?.title || "",
                                  //   tagColor: collection2SectionData?.tagColor,
                                  // }}
                                  productCardClassname="cart-others-add-btn"
                                  preventClickToPdp
                                  popupstate={p => popupstateHandler(p)}
                                  productHeaderRatingStatus={false}
                                  showRatingNtype={true}
                                />
                              </div>
                            </div>
                          );
                        }
                      return <></>;
                    }}
                      </TypedProductListQuery>
                    ) : (
                      <>
                        {/* upsell product */}
                        {crossSell !== "first-load" &&
                          (completelyLoaded?.length === items?.length ||
                            items?.length > 1) && (
                            <TypedSectionWithoutChildrenQuery
                              variables={{
                                name: "Others also Liked Products Section",
                                firstPage: 1,
                              }}
                              fetchPolicy="cache-first"
                            >
                              {({ data, loading, refetch }) => {
                                const collection2Section =
                                  data?.section?.edges.length &&
                                  data?.section?.edges[0];
                                const collection2SectionData =
                                  collection2Section &&
                                  getMetadataValue(
                                    collection2Section?.node?.collections?.edges[0]
                                      ?.node.metadata,
                                    "subNavbarCard"
                                  ) &&
                                  parseJson(
                                    getMetadataValue(
                                      collection2Section?.node?.collections
                                        ?.edges[0]?.node.metadata,
                                      "subNavbarCard"
                                    )
                                  );
                                if (data && !loading) {
                                  return (
                                    <div className="cart-plix__other-customers">
                                      <S.GiftBox>
                                        <CachedImage
                                          // url="https://plixlifefc-media.farziengineer.co/hosted/gift_2_1-b58bdaa00791.png"
                                          url="/plixlifefc/assets/congratulate_icon.svg"
                                          isStaticImage
                                        />
                                        <div>
                                          {cartUpsellSection &&
                                            cartUpsellSection?.is_published && (
                                              <>
                                                <h4>
                                                  {cartUpsellSection?.Title || ""}
                                                </h4>
                                                <p>
                                                  {parse(
                                                    cartUpsellSection?.Text || ""
                                                  )}
                                                </p>
                                              </>
                                            )}
                                        </div>
                                      </S.GiftBox>
                                      {}
                                      <div className="upsell_product_slider">
                                        <MemoizedProductList
                                          products={data?.section?.edges[0]?.node?.collections?.edges[0]?.node?.products?.edges?.map(
                                            edge => edge.node
                                          )}
                                          isCarousel
                                          refetch={refetch}
                                          slidesOnDesktop={2}
                                          carouselProps={{
                                            arrows: false,
                                            dots: true,
                                            infinite: true,
                                          }}
                                          cardTag={{
                                            name:
                                              collection2SectionData?.title || "",
                                            tagColor:
                                              collection2SectionData?.tagColor,
                                          }}
                                          parentProducts={
                                            Array.isArray(items)
                                              ? items[0]?.variant?.product?.id
                                              : ""
                                          }
                                          ctTitle="plixlife-faster-results-cart"
                                          productCardClassname="cart-others-add-btn"
                                          preventClickToPdp
                                          popupstate={p => popupstateHandler(p)}
                                          productHeaderRatingStatus={false}
                                          showRatingNtype={true}
                                          productListId={
                                            data?.section?.edges[0]?.node
                                              ?.collections?.edges[0]?.node?.id
                                          }
                                        />
                                      </div>
                                    </div>
                                  );
                                }
                                return <> </>;
                              }}
                            </TypedSectionWithoutChildrenQuery>
                          )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <div className="newapplycoupon">
                  <PlixLifeFcApplyCoupon
                    refetch={refetch}
                    disableCouponApply={isBoxInCart}
                    newui
                    cartUi
                    recalculate={isRecalculate}
                    subHeadingText={
                      isBoxInCart
                        ? "*Coupon codes are not applicable with build-your-own-box products*"
                        : ""
                    }
                  />
                </div>
                <div className="cash_strip_login_wrapper">
                  {offerPolicies && Array.isArray(offerPolicies?.cart) && (
                    <div className="cash_strip">
                      <S.CashbackStrip>
                        {offerPolicies?.cart?.map(policy => (
                          <li>{policy}</li>
                        ))}
                      </S.CashbackStrip>
                    </div>
                  )}

                  {authenticated &&
                  showCashback &&
                  !isBoxInCart &&
                  !recalculation_toggle ? (
                    <TypedGetWalletAmountWithLogs displayLoader={false}>
                      {({ data }) => {
                        let remainingWalletBalance =
                          data?.wallet?.amount -
                          cashbackDiscountTaxedPrice?.gross?.amount;
                        if (
                          remainingWalletBalance &&
                          typeof remainingWalletBalance === "number"
                        ) {
                          remainingWalletBalance = parseInt(
                            remainingWalletBalance.toFixed(2)
                          );
                        }
                        return (
                          <>
                            {data?.wallet?.id ? (
                              <div className="cart-plix__cashback-login-wrapper">
                                <div className="cart-plix__cashback-login">
                                  <div
                                    onClick={async () => {
                                      if (data?.wallet?.amount) {
                                        setWalletLoading(true);
                                        await handleCashbackClick();
                                        await refetch();
                                        setWalletLoading(false);
                                      }
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={useCashback}
                                    />
                                    <span>Use Wallet Credit</span>
                                  </div>
                                  <div>
                                    Avl Bal{" "}
                                    <S.WalletBalance>
                                      &#8377; {data?.wallet?.amount}
                                    </S.WalletBalance>
                                  </div>
                                </div>
                                {walletLoading && (
                                  <div className="cart__loader">
                                    <CircularProgress color="inherit" />
                                  </div>
                                )}
                                {useCashback &&
                                  cashbackDiscountTaxedPrice &&
                                  remainingWalletBalance !== NaN && (
                                    <S.RemainingWalletBalanceText>
                                      Remaining Wallet Balance :{" "}
                                      <S.WalletBalance>
                                        &#8377;
                                        {remainingWalletBalance}
                                      </S.WalletBalance>
                                    </S.RemainingWalletBalanceText>
                                  )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      }}
                    </TypedGetWalletAmountWithLogs>
                  ) : showCashback && !isBoxInCart && !recalculation_toggle ? (
                    <div
                      className={`cart-plix__cashback-no-login cashbackNoLogin cart_login_wrapper`}
                    >
                      <div className={`svgAndTextWrapper`}>
                        <div className="cart-plix__cashback-no-login__svg">
                          <img
                            src="https://plixlifefc-media.farziengineer.co/hosted/wallet-f7713882deaa.png"
                            width="70"
                          />
                        </div>
                        <div
                          className={`cart-plix__cashback-no-login__text  loginText`}
                        >
                          {cartShowCashbackData &&
                          cartShowCashbackData?.text &&
                          cartShowCashbackData?.enable === "true" ? (
                            <div>{cartShowCashbackData?.text}</div>
                          ) : (
                            <> </>
                          )}
                        </div>
                      </div>
                      <div
                        className={`cart-plix__cashback-no-login__login cashbackNoLogin logintextbold`}
                        onClick={() => {
                          if (gtmConfig.loginClick.enable) {
                            customEventTrigger(
                              gtmConfig.loginClick.value,
                              user,
                              {
                                cta_position: "top",
                              }
                            );
                          }
                          // router.push(`/page/login?redirect_from=checkout`);
                          router.push(`/page/login?fromCart=true`);
                          overlay.hide();
                        }}
                      >
                        Login
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="cart_footer">{cartFooter}</div>
                {cashbackRecieveRounded &&
                showCashback &&
                !recalculation_toggle ? (
                  <div className="cashStrip">
                    <S.CashbackStrip>
                      <h4>Get &#x20B9; {cashbackRecieveRounded} cashback</h4>
                      <p>(Applied: Extra 5% cashback on prepaid).</p>
                    </S.CashbackStrip>
                  </div>
                ) : (
                  <></>
                )}
                {/* <div className="cart-plix__payment-strip">
                  {prepaidPercent ? (
                    <div
                      className="cart-plix__payment-strip__row"
                      style={{ gap: "6px" }}
                    >
                      {" "}
                      Use prepaid methods to get upto{" "}
                      <span className="cart-plix__payment-strip__row__bold-text">
                        5% Off (Max Rs.50){" "}
                      </span>{" "}
                    </div>
                  ) : (
                    <></>
                  )}
                  <S.Hr
                    border={{
                      width: "1px",
                      type: "solid",
                      color: "#DDDDDD",
                    }}
                  />
                  <div className="cart-plix__payment-strip__row">
                    <div>
                      {" "}
                      <MemoUPI /> <span> UPI </span>{" "}
                    </div>
                    <div>
                      {" "}
                      <MemoCreditCard /> <span>Credit / Debit</span>{" "}
                    </div>
                  </div>
                </div> */}
                {roundedSavingAmount &&
                !recalculation_toggle &&
                roundedSavingAmount > 0 ? (
                  <S.CashbackStrip>
                    <span>
                      <MemoSavingAddToCart width={16} height={16} />{" "}
                    </span>
                    You are saving&nbsp;
                    <S.WalletBalance>
                      &#8377; {roundedSavingAmount}
                    </S.WalletBalance>
                    &nbsp; with this order.
                  </S.CashbackStrip>
                ) : (
                  <></>
                )}
              </div>

              <div className="cart-plix__footer__wrapper">
                {offer_progressbar_data?.enabled &&
                  nextOffer &&
                  nextOfferPendingAmount && (
                    <div className="cart-plix__progressBar__nextOffer bottomOfferStrip">
                      <span>
                        <Markup
                          content={nextOffer?.prefix_text}
                          className="markuptext"
                        />
                      </span>
                      <span className="cart-plix__progressBar__nextOffer__amount">
                        &#8377;{nextOfferPendingAmount}
                      </span>
                      <span>
                        <Markup
                          content={nextOffer?.suffix_text}
                          className="markuptext"
                        />
                      </span>
                    </div>
                  )}
                <div className="cart-plix__footer">
                  <div className="cart-plix__footer__totalPrice">
                    <div>
                      <span className="cart-plix__footer__totalPrice__key">
                        {/* <FormattedMessage {...commonMessages.total} /> */}
                      </span>
                      <span className="cart-plix__footer__totalPrice__value">
                        {checkoutLoading ? (
                          <>
                            <span
                              className="single-line-loader"
                              style={{
                                width: "75px",
                                height: "14px",
                              }}
                            />
                          </>
                        ) : (
                          <TaxedMoney
                            data-test="totalPrice"
                            taxedMoney={totalPrice}
                          />
                        )}
                      </span>
                    </div>

                    {/* <div className="diet-plan-sticker">
                      <div className="Sticker">30 Day Money Back</div>
                    </div> */}

                    {/* ht free shipping */}

                    <div className="free-shipping">
                      <div className="Sticker truckicon_andtext">
                        <MemoNewTruckIcon />
                        Free Shipping
                      </div>
                      {showCashback &&
                      !recalculation_toggle &&
                      roundedSavingAmount > 0 ? (
                        <div className="saved_money">
                          Saving ₹{roundedSavingAmount}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    {/* <div className="cart-plix__footer__button">
                    <button
                      data-test="gotoCheckoutButton"
                      onClick={() => {
                        if (!checkoutLoading) {
                          proceedToCheckout();
                        }

                        // if (!checkoutLoading) {
                        //   overlay.hide();
                        // }
                      }}
                    >
                      {checkoutLoading ? (
                        <div className="checkout_button_loader">
                          <CircularProgress color="inherit" />
                        </div>
                      ) : (
                        <span>Proceed to Pay</span>
                      )}
                    </button>
                  </div> */}
                  </div>
                  <div
                    className={`cart-plix__footer__button ${
                      !isPresentMinSkinQuizProducts
                        ? "cart-plix__footer__button_disabled"
                        : ""
                    }`}
                  >
                    <button
                      data-test="gotoCheckoutButton"
                      onClick={() => {
                        if (!checkoutLoading && isPresentMinSkinQuizProducts) {
                          proceedToCheckout();
                          // proceedToGokwikCheckout();
                        }

                        // if (!checkoutLoading) {
                        //   overlay.hide();
                        // }
                      }}
                    >
                      {checkoutLoading ? (
                        <div className="checkout_button_loader">
                          <CircularProgress color="inherit" />
                        </div>
                      ) : (
                        <>
                        <span>Proceed to Pay</span>
                        {!isPresentMinSkinQuizProducts ?
                         <div>(Add 1 more product to your cart to checkout)</div>:<></>}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Empty offersDataList={offersDataList} overlay={overlay} />
          )}
          <div className="cart-alert">
            <Snackbar
              open={cartError !== ""}
              autoHideDuration={3000}
              onClose={() => setCartError("")}
            >
              <Alert severity="error">{cartError}</Alert>
            </Snackbar>
          </div>
        </div>
      </Online>
      <Offline>
        <div className="cart-plix">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </>
  );
};

function useOfferProgressBar(offers: any[]) {
  const { subtotalPrice } = useCartState();
  const [unlockedOffer, setUnlockedOffer] = React.useState(null);
  const [nextOffer, setNextOffer] = React.useState(null);
  const [progressPercent, setProgressPercent] = React.useState(null);
  const [nextOfferPendingAmount, setNextOfferPendinAmount] = React.useState(
    null
  );
  const sortedOffers = offers?.sort(offer => offer?.amount);

  const allOfferWithRelativePercentages = sortedOffers?.map(offer => {
    const highestOfferAmount = sortedOffers.at(-1)?.amount;
    return {
      ...offer,
      relativePercentage: Math.round(
        (offer?.amount / highestOfferAmount) * 100
      ),
    };
  });

  React.useEffect(() => {
    if (subtotalPrice?.gross?.amount) {
      let temp_unlocked_offer;
      let temp_next_offer;
      sortedOffers?.forEach(offer => {
        // Pick latest unlocked offer.
        if (offer?.amount <= subtotalPrice?.gross?.amount) {
          temp_unlocked_offer = offer;
        }
        // Pick Next Offer that can be unlocked.
        if (offer?.amount > subtotalPrice?.gross?.amount && !temp_next_offer) {
          temp_next_offer = offer;
        }
      });
      setNextOffer(temp_next_offer);
      setUnlockedOffer(temp_unlocked_offer);
      if (temp_next_offer) {
        setNextOfferPendinAmount(
          Math.ceil(temp_next_offer?.amount - subtotalPrice?.gross?.amount)
        );
      }
      if (offers?.length) {
        let completetedPercent =
          (subtotalPrice?.gross?.amount / offers[offers.length - 1]?.amount) *
          100;
        completetedPercent =
          completetedPercent > 100 ? 100 : completetedPercent;
        setProgressPercent(Math.round(completetedPercent));
      }
    }
  }, [subtotalPrice?.gross?.amount]);
  return {
    unlockedOffer,
    nextOffer,
    progressPercent,
    nextOfferPendingAmount,
    allOfferWithRelativePercentages,
  };
}

Cart.displayName = "Cart";
export default React.memo(Cart);
