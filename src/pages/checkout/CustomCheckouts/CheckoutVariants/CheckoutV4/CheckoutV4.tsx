import Input from "@components/farzicom-ui-kit/Input";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Select from "@components/farzicom-ui-kit/Select";
import { client, clientSSR } from "@temp/client";
import {
  CheckoutFragment,
  CheckoutLineFragment,
  JuspayPaymentInput,
  useAuth,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
  UserFragment,
  useUser,
} from "@saleor/sdk";
import debounce from "lodash/debounce";
import { CreatePaymentInput } from "@saleor/sdk/dist/apollo/types/checkout";
import {
  ENABLE_GA4,
  IMAGE_CDN,
  IMAGE_CDN_PROVIDERS,
  JUSPAY_CARD_ENCODING_KEY,
  JUSPAY_CARD_ENCODING_VERSION,
  JUSPAY_MERCHANT_ID,
  META_DEFAULTS,
  PREV_CHECKOUT_TOTAL,
  showCashback,
} from "Themes/config";
import { theme } from "Themes/globalStyles/constants";
import { CircularProgress } from '@mui/material';
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoPaySVG from "@components/atoms/SvgIcons/PaySVG";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoDownArrow from "@components/atoms/SvgIcons/DownArrow";
import MemoUpArrow from "@components/atoms/SvgIcons/UpArrow";
import Image from "next/image";
import {
  getGclid,
  getThisVariantPrices,
  getUtmData,
  generateProductUrl,
} from "@temp/core/utils";
import {
  createTaxedPriceFromAmount,
  getItemCategoriesFromAttribute,
  getItemJourneyInfo,
  getMetadataValue,
  getPhoneNoWithoutPrefix,
  getPrices,
  getVariantAttributes,
  isBoxProduct,
  isGiftBoxProduct,
  isItemInCart,
  membershipDiscountData,
  isMember,
  parseJson,
  truncateString,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { TypedUpdateCheckoutMetadataWhatsapp } from "@components/molecules/GetWhatsappUpdate/queries";
import MemoWhatsapp from "@components/atoms/SvgIcons/Whatsapp";
import {
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables,
} from "@components/molecules/GetWhatsappUpdate/gqlTypes/updateCheckoutMetadatWhatsapp";
import { MutationFn } from "react-apollo";
import {
  OverlayContext,
  OverlayContext2,
  OverlayTheme,
  OverlayTheme2,
  OverlayType,
  OverlayType2,
} from "@temp/components";
import MemoUserIconSVG from "@components/atoms/SvgIcons/UserIconSVG";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { ShopMetaContext } from "@temp/pages/_app.page";
import AppHeader from "@components/templates/AppHeader";
import MemoBackButtonSVG from "@components/atoms/SvgIcons/BackButtonSVG";
import ImageCard from "@components/atoms/ImageCard";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Link from "next/link";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { useRouter } from "next/router";
import { checkoutDetails } from "@components/templates/AppHeader/queries";
import MemoPaymentIconsList from "@components/atoms/SvgIcons/PaymentIconsList";
import ReactSVG from "react-svg";
import { CachedImage } from "@components/molecules/CachedImage";
import Media from "react-media";
import { largeScreen, smallScreen } from "@styles/constants";
import MyRating from "@components/atoms/MyRating";
import Card from "@components/molecules/Card";
import MemoGreenTickSvg from "@components/atoms/SvgIcons/GreenTickSvg";
import MemoEditPenIcon from "@components/atoms/SvgIcons/EditPenIcon";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { getDBIdFromGraphqlId } from "@utils/core";
import PlixLifeFcApplyCoupon from "@components/molecules/PlixLifeFcApplyCoupon";
import MemoSingleStarIcon from "@components/atoms/SvgIcons/SingleStarIcon";
import {
  ICheckoutStepNumber,
  NEW_CHECKOUT_STEPS,
} from "@temp/pages/checkout/formUiUtils";
import DiscountAndOffersDropDown from "@components/farzicom-ui-kit/DiscountAndOffersDropDown";
import MemoDownArrowDropdown from "@components/atoms/SvgIcons/DownArrowDropDown";
import NewMemoCartIcon from "@components/atoms/SvgIcons/NewMemoCartIcon";
import UserLogin from "@components/farzicom-ui-kit/UserLogin";
import { updateMetadataMutation } from "@components/templates/BuildYourBox/queries";
import MemoMoneyBillIcon from "@components/atoms/SvgIcons/MoneyBillIcon";
import MemoShinnyStar from "@components/atoms/SvgIcons/ShinnyStarIcon";
import MemoLocationMarker from "@components/atoms/SvgIcons/LocationMarker";
import MemoBackArrow from "@components/atoms/SvgIcons/BackArrow";
import { useWindowWidth } from "@hooks";
import MemoVerifiedGreenTick from "@components/atoms/SvgIcons/VerifiedGreenTick";
import MemoVerifiedGreyTick from "@components/atoms/SvgIcons/VerifiedGreyTIck";
import MemoSideArrowIcon from "@components/atoms/SvgIcons/SideArrowIcon";
import MemoWhiteTick from "@components/atoms/SvgIcons/WhiteTickIcon";
import ApplyCouponCode from "../../../ApplyCouponCode";
import * as S from "../../../styles";
import * as S2 from "./styles";
import PaymentIconsList from "../../../../../images/plixlifefc/PaymentIconsList.png";
import {
  addressFileds2,
  CheckoutFormActionTypes,
  onInputChange,
  onFocusOut,
  validateInput,
  formsReducer,
  IIAddressFieldNames,
  paymentRadioFields2,
  IAddressField,
  PaymentRadioFields,
  PaymentMethods,
  checkboxFields,
  initFunc,
  convertAddressString,
  whatsappCheckboxFields,
  notificationCheckboxFields,
  DISALLOWED_KEYWORDS,
  juspayPaymentRadioOptions,
  PaymentModes,
  PaymentModeType,
  DEFAULT_BANKS,
  NETBANKING_OPTIONS,
  DEFAULT_WALLETS,
  getJuspayIframeElements,
  JUSPAY_STYLE_OBJECT,
  getCardErrorText,
  IIOnlyAddressFieldNames,
} from "../../../formUtilsNew";
import styles from "./index.module.scss";
import styles2 from "./index-2.module.scss";
import { PaymentOptions } from "./checkout-components/PaymentOptions";
import { UserAddresses } from "./checkout-components/UserAddresses";
import {
  initiateGokwikCheckout,
  loadGokwikScript,
} from "@components/organisms/GokwikGateway/GokwikGateway";
import { GET_POSTAL_PIN } from "@temp/pages/checkout/queries";
import { deleteMetadata, removeTags } from "@components/organisms/ProductSubscriptionPopup/queries";

const CheckoutV4 = ({ headerAndFooterData, shopMeta }) => {
  const { checkout, checkoutLoading } = useCheckoutState();
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(
    !checkout?.lines?.length
  );

  const { user, authenticated, authenticating } = useAuthState();
  const { checkoutCustomerAttach } = useAuth();

  const getInitialCheckoutStep = (): number => {
    if (user && authenticated) {
      return user?.addresses?.length ? 3 : 2;
    }
    return null;
  };

  const [currentCheckoutStep, setCurrentCheckoutStep] = useState<number | null>(
    getInitialCheckoutStep()
  );

  const [paymentStep, setPaymentStep] = useState<number>(1);

  useEffect(() => {
    scrollToTop("auto");
    loadGokwikScript();
  }, []);

  useEffect(() => {
    if (checkout && checkout?.id && checkout?.lines?.length && initialLoading) {
      setInitialLoading(false);
    }
    if (checkout && checkout?.id && checkout?.lines?.length == 0) {
      setInitialLoading(false);
    }
    if (
      !(checkout && checkout?.id && checkout?.lines?.length) &&
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search)?.get("token")
    ) {
      setInitialLoading(false);
    }
  }, [checkout?.id]);

  const handleCheckoutBack = () => {
    if (paymentStep === 2) {
      setPaymentStep(1);
    } else if (currentCheckoutStep === 4) {
      setCurrentCheckoutStep(3);
    } else {
      history.back();
    }
  };

  if (
    !(checkout && checkout?.id && checkout?.lines?.length) &&
    user &&
    authenticated &&
    !authenticating
  ) {
    return (
      <ShopMetaContext.Provider
        value={shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <AppHeader
          headerData={headerAndFooterData}
          checkoutHeaderProps={{
            handleCheckoutBack,
          }}
        />
        <span
          key="no-checkout"
          style={{ textAlign: "center", display: "block" }}
        >
          {initialLoading ? (
            <CircularProgress
              color="inherit"
              style={{
                margin: "auto",
                marginTop: "8px",
                width: `44px`,
              }}
            />
          ) : (
            <ContinueShoppingNext>
              <Input
                variant={2}
                type="button"
                value="Continue Shopping"
                customStyles={styles}
                customStylesName="continueShopping"
              />
            </ContinueShoppingNext>
          )}
        </span>
      </ShopMetaContext.Provider>
    );
  }

  if (!checkout?.id && !checkout?.lines?.length && !authenticated && !user) {
    return (
      <ShopMetaContext.Provider
        value={shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <AppHeader
          headerData={headerAndFooterData}
          checkoutHeaderProps={{
            handleCheckoutBack,
          }}
        />
        <span className={styles.noCheckoutLoginWrapper}>
          {initialLoading || checkoutLoading ? (
            <CircularProgress
              color="inherit"
              style={{
                margin: "auto",
                marginTop: "8px",
                width: `44px`,
              }}
            />
          ) : (
            <UserLogin
              onlyLoginScreen
              onSignUp={user => {
                // Attach guest checkout with new user on signup
                if (
                  router?.query?.token &&
                  typeof router.query.token === "string" &&
                  user?.id
                ) {
                  checkoutCustomerAttach(router.query.token, user.id);
                }
              }}
            />
          )}
        </span>
      </ShopMetaContext.Provider>
    );
  }
  return (
    <ShopMetaContext.Provider
      value={shopMeta?.data.shopmeta.edges[0].node.metadata}
    >
      <AppHeader
        headerData={headerAndFooterData}
        checkoutHeaderProps={{
          handleCheckoutBack,
        }}
      />
      <div key="checkout-form">
        <CheckoutForm
          currentCheckoutStep={currentCheckoutStep}
          setCurrentCheckoutStep={setCurrentCheckoutStep}
          paymentStep={paymentStep}
          setPaymentStep={setPaymentStep}
        />
      </div>
    </ShopMetaContext.Provider>
  );
};

const scrollToTop = (behavior: any) => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: behavior || "smooth",
    });
  }
};

const ShowHR = ({ name }) => {
  switch (name) {
    case "show":
    case "Net Price":
    case "Sub Total":
    // case "Wallet Credit":
      return <hr className={styles.hr} />;

    default:
      return <> </>;
  }
};

export const PaymentSummary: React.FC<{
  paymentSummary: any;
  toggle?: boolean;
  defaultShowPaceOrderButton?: boolean;
  loading?: boolean;
}> = ({
  paymentSummary,
  toggle = false,
  defaultShowPaceOrderButton = false,
  loading = false,
}) => {
  const {
    mrp,
    itemDiscount,
    netPrice,
    couponDiscount,
    prepaidDiscount,
    cashbackDiscount,
    subtotalPrice,
    totalPrice,
    cashbackRecieve,
    items,
  } = paymentSummary;

  const cashbackRecievePercentage = Math.round(
    (cashbackRecieve?.amount / totalPrice?.gross?.amount) * 100
  );

  // Byb discount logic
  const { recentOrder, checkout } = useCheckoutState();
    const metaData = checkout?.metadata
  const ShopMetaContextValue = useContext(ShopMetaContext);
  // const personalisedBoxConfig =
  //   ShopMetaContextValue &&
  //   getMetadataValue(ShopMetaContextValue, "personalised_box_config") &&
  //   parseJson(
  //     getMetadataValue(ShopMetaContextValue, "personalised_box_config")
  //   );
  
  const discountFromCheckoutMeta = metaData &&
    getMetadataValue(metaData, 'discount') &&
    typeof parseJson(getMetadataValue(metaData, 'discount')) === "string" ?
    parseJson(getMetadataValue(metaData, 'discount')?.replace(/'/g, '"')) :
    parseJson(getMetadataValue(metaData, 'discount'))

  const membershipDiscountArray = membershipDiscountData(discountFromCheckoutMeta, 'membership-new')
  
  const membershipEnrollmentDiscountArray = membershipDiscountData(discountFromCheckoutMeta,'member enrollment')
   
  const membershipDiscount = !!membershipDiscountArray.length && !!membershipDiscountArray[0]?.discount_amount ?
    parseFloat(membershipDiscountArray[0]?.discount_amount).toFixed(2) : 0
  
  const membershipEnrollmentDiscount = !!membershipEnrollmentDiscountArray.length && !!membershipEnrollmentDiscountArray[0]?.discount_amount ?
  parseFloat(membershipEnrollmentDiscountArray[0]?.discount_amount).toFixed(2) : 0

  // const updatedItems =
  //   typeof window !== "undefined" &&
  //   window.location.pathname === "/order-placed"
  //     ? recentOrder?.lines
  //     : items;
  // const isBybForAutomaticDiscount = boxItems?.boxType === pages.BUILD_YOUR_BOX;
  // const bybItemsTotal = updatedItems?.length && isBybForAutomaticDiscount
  //   ? updatedItems?.reduce((total, curr) => {
  //       if (isBoxProduct(curr)) {
  //         total += curr?.totalPrice?.gross?.amount;
  //       }
  //       return total;
  //     }, 0)
  //   : 0;
  // let bybDiscount;
  // if (bybItemsTotal && typeof personalisedBoxConfig?.price === "number") {
  //   bybDiscount = bybItemsTotal - personalisedBoxConfig?.price;
  // }

  // const updatedCouponDiscount =
  //   bybDiscount && typeof bybDiscount === "number"
  //     ? createTaxedPriceFromAmount(couponDiscount?.gross?.amount + bybDiscount)
  //     : couponDiscount;
  const isBoxItemInCart = items.filter(item => isBoxProduct(item)) || [];
  const boxItems: any =
  (getMetadataValue(checkout?.metadata, "byobItems") &&
    parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
  [];
  
    let totalbyobMrpInItems: number = 0;
    let totalbyobItemAmount: number = 0;

    if (isBoxItemInCart.length) {
      isBoxItemInCart.forEach(item => {
        const findBox = boxItems.find(box => box?.boxItemSKU === item?.variant?.sku);
        if (findBox && findBox.items) {
          const boxItemstotalPrice = findBox.items.reduce((total, item) => total + Number(item?.price), 0);
          totalbyobMrpInItems += boxItemstotalPrice * (item?.quantity || 0);
        }
        const itemPrice = item?.variant?.pricing?.price?.gross?.amount || 0;
        totalbyobItemAmount += itemPrice * (item?.quantity || 0);
      });
    }


  const summaryPrices = {
    MRP: !!isBoxItemInCart.length ? createTaxedPriceFromAmount(Number(mrp?.gross?.amount) + totalbyobMrpInItems - totalbyobItemAmount) :mrp,
    "Item Discount": !!isBoxItemInCart.length ? createTaxedPriceFromAmount(Number(itemDiscount?.gross?.amount) + totalbyobMrpInItems - totalbyobItemAmount) : itemDiscount,
    // "Net Price": netPrice,
    "Sub Total": subtotalPrice,
    "Coupon Discount": couponDiscount,
    "Wallet Credit": cashbackDiscount,
    "Net Total": (Number(membershipDiscount) || Number(membershipEnrollmentDiscount)) ? !!membershipDiscountArray?.length ? 
    createTaxedPriceFromAmount(Number(totalPrice?.gross?.amount + Number(membershipDiscount))) :
    createTaxedPriceFromAmount(Number(totalPrice?.gross?.amount + Number(membershipEnrollmentDiscount))):
    totalPrice,
    "Membership Discount (10%)": !!membershipDiscountArray?.length ? createTaxedPriceFromAmount(membershipDiscount) :
      createTaxedPriceFromAmount(membershipEnrollmentDiscount)
  };

  if (prepaidDiscount && prepaidDiscount?.gross.amount < 0) {
    summaryPrices["COD Charges"] = {
      ...prepaidDiscount,
      gross: {
        ...prepaidDiscount?.gross,
        amount: Math.abs(prepaidDiscount?.gross?.amount),
      },
    };
  } else {
    summaryPrices["Prepaid Discount"] = prepaidDiscount;
  }

  const discountKeys = [
    "Item Discount",
    "Coupon Discount",
    "Wallet Credit",
    "Prepaid Discount",
    "Membership Discount (10%)"
  ];

  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  if (toggle) {
    return (
      <div className={styles.paymentSummaryContainer}>
        <div
          className={styles.paymentSummaryHeader}
          onClick={() => setShowPaymentSummary(prev => !prev)}
        >
          <div className={styles.paymentSummaryHeaderText}>Price Summary </div>

          <div>
            {showPaymentSummary ? (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show Less</span>
                <MemoUpArrow />
              </div>
            ) : (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show More</span>
                <MemoDownArrow />
              </div>
            )}
          </div>
        </div>
        {showPaymentSummary ? (
          <div className={styles.paymentSummaryContainer}>
            {Object.keys(summaryPrices).map((price, index) => {
              if (summaryPrices[price] && summaryPrices[price].gross.amount) {
                return (
                  <div key={index}>
                    <div className={styles.paymentSummaryRow}>
                      {price}
                      <span>
                        {discountKeys.includes(price) ? " - " : ""}
                        <TaxedMoney taxedMoney={summaryPrices[price]} />
                      </span>
                    </div>
                    <ShowHR name={price} />
                  </div>
                );
              }
              return <> </>;
            })}

            <div>
              <div className={styles.paymentSummaryRowBold}>
                Grand Total <TaxedMoney taxedMoney={totalPrice} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className={styles.paymentSummaryRowBold}>
                Grand Total <TaxedMoney taxedMoney={totalPrice} />
              </div>
            </div>
          </>
        )}
        {cashbackRecieve?.amount && parseFloat(cashbackRecieve?.amount) > 0 ? (
          <div className={styles.cashBackStripContainer}>
            <MemoMoneyBillIcon />
            <div className={styles.cashBackStrip}>
              Get cashback worth &#8377;{parseInt(cashbackRecieve?.amount)} on
              purchase.
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* <Media
          query={{ maxWidth: largeScreen }}
          render={() => (
            <S.CashbackStripNew>
              Place Prepaid order to get extra 5% Cashback
            </S.CashbackStripNew>
          )}
        /> */}
      </div>
    );
  }

  return (
    <div className={styles.paymentSummaryContainer}>
      {Object.keys(summaryPrices).map((price, index) => {
        if (summaryPrices[price] && (price == "Coupon Discount" && !summaryPrices["Wallet Credit"].gross.amount || summaryPrices[price].gross.amount)) {
          return (
            <div key={index}>
              <div className={styles.paymentSummaryRow}>
                {price} <TaxedMoney taxedMoney={summaryPrices[price]} />
              </div>
              <ShowHR name={price} />
            </div>
          );
        }
        return <> </>;
      })}

      <div>
        <ShowHR name="show" />
        <div className={styles.paymentSummaryRowBold}>
          Grand Total <TaxedMoney taxedMoney={totalPrice} />
        </div>
      </div>
      {/* {cashbackRecieve?.amount && parseFloat(cashbackRecieve?.amount) > 0 ? (
        <div className={styles.cashBackStripContainer}>
          <div className={styles.cashBackStrip}>
            <MemoMoneyBillIcon />
            Get cashback worth &#8377;{parseInt(cashbackRecieve?.amount)} on
            purchase.
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export const OrderSummary = ({
  defaultShowSummary = false,
  formRef,
  externalItems,
  externalPaymentSummary,
  paymentSummaryValue,
  loading,
}: any) => {
  const [showSummary, setShowSummary] = useState(false);
  const { items: cartItems } = useCartState();
  const paymentSummary = useCartState();

  const items = externalItems || cartItems;

  let totalQuantity = items?.length
    ? items.reduce((total, curr) => {
        if (!isBoxProduct(curr)) {
          total += curr.quantity;
        }
        return total;
      }, 0)
    : 0;

  if (items?.some(item => isBoxProduct(item))) {
    totalQuantity++;
  }

  // const itemsToShow = showSummary ? items : items.slice(0, 2);
  return (
    <div className={styles.orderSummaryContainer}>
      <div>
        <div
          className={styles.orderSummaryHeader}
          onClick={() => setShowSummary(prev => !prev)}
        >
          <div>
            <NewMemoCartIcon height={18} width={18} />
            <span>Order Summary </span>
            {!defaultShowSummary && (
              <div>
                <span
                  style={{
                    transform: showSummary ? "rotate(180deg)" : "",
                  }}
                >
                  <MemoDownArrowDropdown />
                </span>
              </div>
            )}
          </div>
          <span>&#8377; {paymentSummary?.totalPrice?.gross?.amount}</span>
        </div>
        {showSummary && (
          <div className={styles.summaryContentWrapper}>
            <div>
              <OrderSummaryProductList externalItems={items} allItems={items} />
            </div>
            <div className={styles.paymentSummaryContainerWrapper}>
              <PaymentSummary
                paymentSummary={paymentSummaryValue || paymentSummary}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const OrderSummaryProductList = ({
  externalItems,
  allItems,
}: {
  externalItems?: any;
  allItems?: any;
}) => {
  const { items: cartItems } = useCartState();
  const { checkout } = useCheckoutState();
  const items = externalItems || cartItems;
  const itemsToshow = items.filter(item => !isBoxProduct(item));

  const allItemsUpdated = allItems || cartItems;
  // const ShopMetaContextValue = useContext(ShopMetaContext);

  // const boxItems: any =
  //   getMetadataValue(checkout?.metadata, "boxItems") &&
  //   parseJson(getMetadataValue(checkout?.metadata, "boxItems"));

  // const personalisedBoxConfigNew =
  //   ShopMetaContextValue &&
  //   getMetadataValue(ShopMetaContextValue, "personalised_box_config_new") &&
  //   parseJson(
  //     getMetadataValue(ShopMetaContextValue, "personalised_box_config_new")
  //   );
  
  // const personalisedBoxConfig =
  //   personalisedBoxConfigNew &&
  //   typeof personalisedBoxConfigNew === "object" &&
  //   personalisedBoxConfigNew[boxItems?.boxType];
  
 const isBoxItemInCart:any[] = Array.isArray(allItemsUpdated) ? allItemsUpdated.filter(item => isBoxProduct(item)) : [];
  return (
    <div className={styles.orderSummaryProductList}>
      {isBoxItemInCart && !!isBoxItemInCart?.length ? (
        <>
          {isBoxItemInCart?.map((lines,index) => (
            <>
            <OrderSummaryProduct boxItem={lines} />
            {items.length - 1 !== index ? <ShowHR name="show" /> : <> </>}
            </>
          ))}
        </>
      ) : (
        <> </>
      )}
      {itemsToshow.map((line, index) => {
        return (
          <>
            <OrderSummaryProduct line={line} />
            {itemsToshow.length - 1 !== index ? <ShowHR name="show" /> : <> </>}
          </>
        );
      })}
    </div>
  );
};

export const OrderSummaryProduct: React.FC<{
  line?: CheckoutLineFragment;
  boxItem?: any;
}> = ({ line, boxItem }) => {
  const { checkout, recentOrder } = useCheckoutState();
  if (boxItem) {
    let specificboxItem: any = {};
    const isOrderPlacedPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/order-placed";
    const updatedBoxItem = boxItem;
    const giftBoxItemsProducts = isGiftBoxProduct(boxItem?.variant?.sku);

    const boxItemsFromMeta = isOrderPlacedPage
      ? recentOrder &&
        getMetadataValue(recentOrder?.metadata, "byobItems") &&
        parseJson(getMetadataValue(recentOrder?.metadata, "byobItems"))
      : getMetadataValue(checkout?.metadata, "byobItems") &&
        parseJson(getMetadataValue(checkout?.metadata, "byobItems"));
        
    // const personalisedBoxConfigNew =
    //   getMetadataValue(ShopMetaContextValue, "personalised_box_config_new") &&
    //   parseJson(
    //     getMetadataValue(ShopMetaContextValue, "personalised_box_config_new")
    //   );
    
    // let personalisedBoxConfigKey = Object.keys(personalisedBoxConfigNew)?.filter(
    //     item => personalisedBoxConfigNew[item]?.variant_id === updatedBoxItem?.variant?.id
    //   );
    
    let specificItem =
        boxItemsFromMeta.length &&
        boxItemsFromMeta?.filter(
          item => item?.boxItemSKU === updatedBoxItem?.variant?.sku
        ) ||
      [];
    
    specificboxItem = !!specificItem.length && specificItem[0];
    
    const sortImages =
      boxItem.variant?.images && boxItem.variant?.images.length
        ? boxItem.variant?.images
            .slice()
            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
        : [boxItem.variant.product.thumbnail];
    
    const boxThumbnailWithImgix =
      sortImages.length &&
      imageURLReplaceWithCDN(sortImages[0]?.url);
    
    const boxItemUndiscountedPriceValue = 
      specificboxItem?.items &&
      specificboxItem?.items?.reduce((total, item) => {
        return total + Number(item?.price);
      }, 0);
    
    const undiscountedPrice = {
      gross: { amount: boxItemUndiscountedPriceValue, currency: "INR" },
      net: { amount: boxItemUndiscountedPriceValue, currency: "INR" },
    };

    const discountedPrice = updatedBoxItem?.variant?.pricing?.price

    return (
      <div className={styles.orderSummaryProduct}>
        <div className={styles.orderSummaryProductImage}>
          {boxThumbnailWithImgix && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
            <Image
              src={boxThumbnailWithImgix}
              alt="Personalised Box Image"
              width={150}
              height={150}
            />
          ) : (
            <>
              {boxThumbnailWithImgix && (
                <img
                  width="100%"
                  src={boxThumbnailWithImgix}
                  alt="Personalised Box Image"
                />
              )}
            </>
          )}
        </div>
        <div className={styles.orderSummaryProductContent}>
          <div className={styles.orderSummaryProductContentName}>
            {updatedBoxItem?.variant?.product?.name}
          </div>
          <div>
            {specificboxItem?.items && Array.isArray(specificboxItem?.items) && (
              <>
                {specificboxItem?.items?.map((box, index) => {
                  return (
                    <div key={box.stepNumber} className={styles.boxItem}>
                      <span>Item {box.stepNumber}:</span>
                      <span>
                        {box?.name?.slice(0, 30)}
                        ...
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className={styles.orderSummaryProductContentPriceContainer}>
            {undiscountedPrice.gross.amount && discountedPrice.gross.amount ? (
              <div className={styles.undiscounted}>
                <TaxedMoney taxedMoney={undiscountedPrice} />
              </div>
            ) : (
              <> </>
            )}
            <div className={styles.discounted}>
              <TaxedMoney taxedMoney={discountedPrice} />
            </div>
            {discountedPrice.gross.amount ? (
              <div className={styles.discount}>
                {Math.round(
                  ((undiscountedPrice.gross.amount -
                    discountedPrice.gross.amount) /
                    undiscountedPrice.gross.amount) *
                    100
                )}
                % Off.
              </div>
            ) : (
              <> </>
            )}
          </div>
          <div className={styles.quantity}> Quantity: {giftBoxItemsProducts ? boxItem?.quantity : 1} </div>
        </div>
      </div>
    );
  }

  const sortImages =
    line.variant?.images && line.variant?.images.length
      ? line.variant?.images
          .slice()
          .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
      : [line.variant.product.thumbnail];

  const imageUrlImgixScr =
    sortImages.length && imageURLReplaceWithCDN(sortImages[0].url);
  const altText = line.variant.images.length && line.variant.images[0].alt;
  const [mrp, netPrice, discount] = getThisVariantPrices(line.variant);

  const codChargeProductDescriptionText =
    (line?.variant?.product?.metadata &&
    getMetadataValue(
      line?.variant?.product?.metadata,
      "cod_charge_description"
    ) &&
    parseJson(
      getMetadataValue(
        line?.variant?.product?.metadata,
        "cod_charge_description"
      )
    )) || (line?.variant?.metadata &&
    getMetadataValue(
      line?.variant?.metadata,
      "cod_charge_description"
    ) &&
    parseJson(
      getMetadataValue(
        line?.variant?.metadata,
        "cod_charge_description"
      )
    ));

    const subscription_product_skus =
      checkout?.metadata &&
      getMetadataValue(checkout?.metadata, "subscription_skus") &&
      parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"))
        ?.variantId;

    const isSubscriptionProduct = Array.isArray(subscription_product_skus) && subscription_product_skus.includes(line?.variant?.sku);

    const subscriptionProductData =
    line?.variant?.product?.metadata &&
      getMetadataValue(line?.variant?.product?.metadata, "subscription_data") &&
      parseJson(getMetadataValue(line?.variant?.product?.metadata, "subscription_data"));

  return (
    <div className={styles.orderSummaryProduct}>
      {
        subscriptionProductData?.productCardData?.upperText && 
        isSubscriptionProduct && 
        <div className={styles.subscriptionProductUpperText}>
          {subscriptionProductData?.productCardData?.upperText}
        </div>
      }
       {
        subscriptionProductData?.productCardData?.lowerText && 
        isSubscriptionProduct &&      
        <div className={styles.subscriptionProductLowerText}>
            {subscriptionProductData?.productCardData?.lowerText}
        </div>
       }
      <div className={styles.orderSummaryProductImage}>
        {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
          <Image
            src={imageUrlImgixScr}
            alt={altText || "Product Image"}
            width={150}
            height={150}
          />
        ) : (
          <>
            {imageUrlImgixScr && (
              <img width="100%" src={imageUrlImgixScr} alt={altText} />
            )}
          </>
        )}
      </div>
      <div className={styles.orderSummaryProductContent}>
        <div className={styles.orderSummaryProductContentName}>
          {truncateString(line.variant.product.name)}
        </div>
        <div className={styles.orderSummaryProductContentPriceContainer}>
          {mrp.gross.amount && discount.gross.amount ? (
            <div className={styles.undiscounted}>
              <TaxedMoney taxedMoney={mrp} />
            </div>
          ) : (
            <> </>
          )}
          <div className={styles.discounted}>
            <TaxedMoney taxedMoney={netPrice} />
          </div>
          {discount.gross.amount ? (
            <div className={styles.discount}>
              {Math.round((discount.gross.amount / mrp.gross.amount) * 100)}%
              Off.
            </div>
          ) : (
            <> </>
          )}
        </div>
        <div className={styles.quantity}> Quantity: {line.quantity} </div>
        {codChargeProductDescriptionText ? (
          <div className={styles.codChargeProductDescriptionText}>
            {codChargeProductDescriptionText}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export const CheckoutBottomSection = () => {
  return (
    <div className={styles.checkoutBottomSection}>
      <div className={styles.checkoutBottomContactSection} />
    </div>
  );
};
const CheckoutForm = ({
  currentCheckoutStep,
  setCurrentCheckoutStep,
  paymentStep,
  setPaymentStep,
}) => {
  const clevertap = makeClevertap();
  const { user } = useAuthState();

  const userAltEmail =
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));
  const validUserMail =
    typeof user?.email === "string" && user?.email.includes("@example.com")
      ? userAltEmail
      : user?.email;
  

  const initialState = {
    firstName: { value: "", touched: false, hasError: true, error: "" },
    lastName: { value: "", touched: false, hasError: true, error: "" },
    phone: {
      value: user?.phone || "",
      touched: false,
      hasError: !user?.phone,
      error: "",
    },
    email: {
      value: validUserMail || "",
      touched: false,
      hasError: !validUserMail,
      error: "",
    },
    streetAddress1: { value: "", touched: false, hasError: true, error: "" },
    streetAddress2: { value: "", touched: false, hasError: false, error: "" },
    postalCode: { value: "", touched: false, hasError: true, error: "" },
    city: { value: "", touched: false, hasError: true, error: "" },
    countryArea: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  };

  const useCheckoutRes = useCheckout();
  const { createGokwikOrder } = useCheckout();
  const {
    availableShippingMethods,
    availablePaymentGateways,
    checkout,
    useCashback,
    userWalletBalance,
    promoCodeDiscount,
    checkoutLoading,
  } = useCheckoutState();

  const {
    items,
    mrp,
    itemDiscount,
    netPrice,
    couponDiscount,
    prepaidDiscount,
    cashbackDiscount,
    subtotalPrice,
    totalPrice,
    cashbackRecieve,
    offerDiscount,
    shippingPrice,
    discount,
  } = useCartState();
  const paymentSummary = useCartState();

  const totalQuantity = items?.length
    ? items.reduce((total, curr) => {
        total += curr.quantity;
        return total;
      }, 0)
    : 0;

  const { pathname } = useRouter();
  const Router = useRouter();
  const [callAfterUserData, setCallAfterUserData] = useState(false);
  const { show, hide } = useContext(OverlayContext2);
  const [walletDisabled, setwalletDisabled] = useState(false)

  const ShopMetaContextValueCheckout = useContext(ShopMetaContext);

  const cartOfferPolicies =
    getMetadataValue(ShopMetaContextValueCheckout, "cart_offer_policies") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "cart_offer_policies")
    );

  const exitPopupData =
    getMetadataValue(ShopMetaContextValueCheckout, "checkout_exit_popup") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "checkout_exit_popup")
    );

  const codChargeProduct =
    getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product")
    );

  const newCashbackStripData =
    getMetadataValue(
      ShopMetaContextValueCheckout,
      "checkout_cashback_strips"
    ) &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "checkout_cashback_strips")
    );

    // Mrp and Item price calcaulation for byob products
    let totalbyobMrpInItems:number = 0;
    let totalbyobItemAmount:number = 0;
  
    const boxItems: any =
    (getMetadataValue(checkout?.metadata, "byobItems") &&
      parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
    [];
  
    const isBoxItemInCart = items.filter(item => isBoxProduct(item)) || [];
  
    !!isBoxItemInCart.length &&
    isBoxItemInCart.forEach(item => {
      const findBox = boxItems.find(box => box?.boxItemSKU === item?.variant?.sku);
      if (findBox && findBox.items) {
        const boxItemstotalPrice = findBox.items.reduce((total, item) => total + Number(item?.price), 0);
        totalbyobMrpInItems += boxItemstotalPrice * (item?.quantity || 0);
      }
      const itemPrice = item?.variant?.pricing?.price?.gross?.amount || 0;
      totalbyobItemAmount += itemPrice * (item?.quantity || 0);
    });

    // Mrp and Item price calcaulation for byob products

    const savingAmount =prepaidDiscount?.gross.amount +
    cashbackDiscount?.gross.amount+
    couponDiscount?.gross.amount +
    (!!isBoxItemInCart.length ? Number(itemDiscount?.gross?.amount) + 
    totalbyobMrpInItems - totalbyobItemAmount : itemDiscount?.gross.amount);

    const walletDisableProducts =
      getMetadataValue(ShopMetaContextValueCheckout, "wallet_disabled") &&
      parseJson(getMetadataValue(ShopMetaContextValueCheckout, "wallet_disabled"));

  // Show Popup when user tries to exit checkout
  useEffect(() => {
    if (typeof window !== "undefined" && exitPopupData?.enabled) {
      window.onpopstate = function () {
        window.history.go(1);
        show(OverlayType2.pageExitWarning, OverlayTheme2.modal, {
          data: {
            infoText: exitPopupData?.infoText,
            // questionText: exitPopupData?.questionText,
            savingAmount:savingAmount,
            cashbackRecieve:cashbackRecieve ,
            onAccept: () => {
              if (typeof window !== "undefined") {
                hide();
                window.onpopstate = null;
                Router.push("/");
              }
            },
            onDecline: () => {
              hide();
            },
          },
        });
      };
    }
    return () => {
      if (typeof window !== "undefined" && exitPopupData?.enabled) {
        window.onpopstate = null;
      }
    };
  }, [cashbackRecieve?.amount, savingAmount]);

  useEffect(()=> {
    if (items.length) {
      const subscription_product_skus =
        checkout?.metadata &&
        getMetadataValue(checkout?.metadata, "subscription_skus") &&
        parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

      let updated_product_skus = subscription_product_skus;
      if (Array.isArray(subscription_product_skus)) {
        subscription_product_skus.forEach((v_sku:string)=> {
          if (!items.some(item => item.variant.sku === v_sku)) {
            updated_product_skus = subscription_product_skus.filter(i => i !== v_sku);
          }
        });
        if (!updated_product_skus.length) {
          client.query({
            query: removeTags,
            variables: {
              id: checkout?.id,
              input: ["subscription_product"],
            },
            fetchPolicy: "no-cache",
          });
        }
        if (subscription_product_skus.length !== updated_product_skus.length) {
          const checkoutMetaUpdateValue = [{
            key: "subscription_skus",
            value: JSON.stringify(updated_product_skus)
          }];
          
          updateCheckoutMeta(checkoutMetaUpdateValue);
        }
      }

    const walletDisablecheck = walletDisableProducts && walletDisableProducts?.enable &&
      Array.isArray(walletDisableProducts?.productIds) && !!walletDisableProducts?.productIds?.length ?             
      items && items?.some((item)=> walletDisableProducts?.productIds?.includes(getDBIdFromGraphqlId(item?.variant?.product?.id, "Product").toString())) : null
      setwalletDisabled(walletDisablecheck)
    }

  },[items,checkout])

  const [formState, dispatch] = useReducer(
    formsReducer,
    initialState,
    initFunc
  );

  const autoFillForm = () => {
    const userData = checkout?.shippingAddress;
    if (checkout) {
      if (
        ((checkout?.shippingAddress?.firstName === "dummy" ||
          checkout?.shippingAddress?.firstName === "there") &&
          (checkout?.shippingAddress?.lastName === "dummy" ||
            checkout?.shippingAddress?.lastName === "Plixfam") &&
          (checkout?.shippingAddress?.streetAddress1 === "dummy" ||
            checkout?.shippingAddress?.streetAddress1 === "abandoned")) ||
        checkout?.email === "dummy@dummy.com" ||
        !checkout?.shippingAddress
      ) {
        setCallAfterUserData(true);
      } else {
        const autofillemail =
          checkout?.email &&
          (checkout?.email?.includes("@example.com") ||
            DISALLOWED_KEYWORDS.includes(checkout?.email))
            ? validUserMail || ""
            : checkout?.email;
        const selectedAddressInFormState = Object.values(
          IIAddressFieldNames
        ).reduce((total, curr) => {
          const newObject = {};
          if (curr === "email") {
            newObject[curr] = {
              value: autofillemail,
              touched: false,
              hasError: true,
              error: "",
            };
          } else if (curr === IIAddressFieldNames.PHONE) {
            newObject[curr] = {
              value: user?.phone || "",
              touched: false,
              hasError: true,
              error: "",
            };
          } else {
            newObject[curr] = {
              value:
                (userData &&
                  !DISALLOWED_KEYWORDS.includes(userData[curr]) &&
                  userData[curr]) ||
                "",
              touched: false,
              hasError: true,
              error: "",
            };
          }

          return { ...total, ...newObject };
        }, {});

        selectedAddressInFormState.isFormValid;
        if (Object.keys(selectedAddressInFormState).length !== 0) {
          let isFormValid = false;

          for (const name in selectedAddressInFormState) {
            const item = selectedAddressInFormState[name];
            const { value } = item;
            const { hasError, error } = validateInput(
              name as IIAddressFieldNames,
              value,
              dispatch,
              selectedAddressInFormState,
              useCheckoutRes
            );
            if (hasError) {
              isFormValid = false;
            }
            if (name) {
              dispatch({
                type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
                data: {
                  name,
                  value,
                  hasError,
                  error,
                  touched: true,
                  isFormValid,
                },
              });
            }
          }
        }
      }
    } else {
      setCallAfterUserData(true);
    }
    // setAutofillFromCheckout(true);
  };

  const debouncedAddShippingInfoDataLayer = React.useRef(debounce(() => {
    if (ENABLE_GA4) {
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        gtmConfig.addShippingInfo.enable
      ) {
        window.dataLayer.push({ ecommerce: null });
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.addShippingInfo.value,
          user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
          user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
          ecommerce: {
            currency: "INR",
            coupon: checkout?.voucherCode || "NA",
            value: paymentSummary?.totalPrice?.gross?.amount,
            items: items?.map(item => {
              const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
              const productVariantName = getVariantAttributes("Flavors", item?.variant)
              const {discountAmount} = getPrices(item?.variant?.product, false, item?.variant);
              const categories = getItemCategoriesFromAttribute(item?.variant);
              const isMonthIncluded = categories?.sizeCategory2?.toLowerCase()?.includes("month");
              return {
                item_id: item.variant?.product?.id ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product") : null,
                item_name: item?.variant?.product?.name,
                item_brand: "plixlife",
                currency: "INR",
                quantity: item?.quantity,
                discount: discountAmount,
                coupon: checkout?.voucherCode || "NA",
                item_category: item?.variant?.product?.category?.name,
                item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
                item_category3: categories?.sizeCategory1 || "NA",
                item_category4: isMonthIncluded ? "NA" : (categories?.sizeCategory2 || "NA"),
                price: item?.variant?.pricing?.price?.gross?.amount,
                item_variant: productVariantName,
                item_list_name: itemJourneyInfo?.addedFrom || "NA",
                item_list_id: itemJourneyInfo?.productListId || "NA",
                index: "NA"
              };
            })
          },
        });
      }
    }
  }, 2000)).current;

  const getInitialRadioState = () => {
    if (availablePaymentGateways && availablePaymentGateways.length) {
      if (
        availablePaymentGateways[0].id === PaymentMethods.JUSPAY ||
        availablePaymentGateways[0].id === PaymentMethods.WALLET
      ) {
        return PaymentMethods.JUSPAY;
      }
      if (availablePaymentGateways[0].id === PaymentMethods.RAZORPAY) {
        return PaymentMethods.RAZORPAY;
      }
      return PaymentMethods.COD;
    }

    return PaymentMethods.JUSPAY;
  };

  const initialRadioState = getInitialRadioState();

  availablePaymentGateways && availablePaymentGateways.length
    ? availablePaymentGateways[0].id
    : PaymentMethods.RAZORPAY;

  const [radioState, setradioState] = useState<PaymentRadioFields>(
    initialRadioState
  );

  // Juspay Fields
  const initialPaymentMode =
    initialRadioState === "mirumee.payments.juspay"
      ? PaymentModes.UPI
      : initialRadioState === "mirumee.payments.razorpay"
      ? PaymentModes.RAZORPAY
      : PaymentModes.COD;

  const [paymentMode, setPaymentMode] = useState<PaymentModeType>(
    initialPaymentMode
  );

  const [upiValue, setUpiValue] = useState("");

  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [selectedNB, setSelectedNB] = useState<string>("NB_HDFC");

  const [upiValueError, setUpiValueError] = useState<{
    upiAddress: string;
    hasError: boolean;
  }>({
    upiAddress: "",
    hasError: true,
  });

  const [loading, setLoading] = useState(false);
  const [isTotalZero, setIsTotalZero] = useState(false);
  const [paymentMethodChangeLoading, setPaymentMethodChangeLoading] = useState<
    boolean | "initial"
  >("initial");
  const [placeOrderClicked, setPlaceOrderClicked] = useState<boolean>(false);
  const [pincodeFetched, setPincodeFetched] = useState(false);
  const isBoxInCart = items && items.some(item => isBoxProduct(item));


  const [checkoutTotals, setCheckoutTotals] = useState<{
    cod: number;
    prepaid: number;
    prepaidCashback: number;
  }>({
    cod: 0,
    prepaid: 0,
    prepaidCashback: 0,
  });

  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const cartShowCashbackData =
    getMetadataValue(ShopMetaContextValue, "show_cashback_text") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "show_cashback_text"));
  
  const isRecalculate =
    getMetadataValue(ShopMetaContextValueCheckout, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValueCheckout, "atc_recalculation"));

    const membershipdata =
    getMetadataValue(ShopMetaContextValue, "membership_v3") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "membership_v3"));
  

  let remainingWalletBalance =
    userWalletBalance - cashbackDiscount?.gross?.amount;
  if (remainingWalletBalance && typeof remainingWalletBalance === "number") {
    remainingWalletBalance = parseInt(remainingWalletBalance.toFixed(2));
  }

  const handleCashbackClick = async () => {
    // setUseCashback(!useCashback);
    const res = await checkoutPaymentMethodUpdate({
      gateway: availablePaymentGateways[0]?.id,
      useCashback: !useCashback,
    });
    // await handleCheckoutRecalculation();
    getCheckoutTotalAmounts(
      res?.data?.checkoutPaymentMethodUpdate?.checkout
        ?.availablePaymentGateways[0]?.id,
      isItemInCart(
        res?.data?.checkoutPaymentMethodUpdate?.checkout?.lines,
        codChargeProduct?.variantId
      )
    );
  };

  const isCodProductInCart = items.find(
    item => item.variant.id === codChargeProduct?.variantId
  );

  const getCheckoutTotalAmounts = useCallback(
    async (currentGateway?: PaymentMethods, isCodProductInCart?: boolean) => {
      const res = await getCheckoutTotals(false);
      if (
        res?.data?.checkoutTotals?.codTotal?.gross?.amount &&
        res?.data?.checkoutTotals?.prepaidTotal?.gross?.amount
      ) {
        if (
          currentGateway === PaymentMethods.COD &&
          typeof codChargeProduct?.price === "number" &&
          isCodProductInCart
        ) {
          setCheckoutTotals({
            cod: res?.data?.checkoutTotals?.codTotal?.gross?.amount || 0,
            prepaid:
              res?.data?.checkoutTotals?.prepaidTotal?.gross?.amount -
                codChargeProduct?.price || 0,
            prepaidCashback:
              res?.data?.checkoutTotals?.prepaidCashback?.gross?.amount || 0,
          });
        } else {
          setCheckoutTotals({
            cod:
              res?.data?.checkoutTotals?.codTotal?.gross?.amount +
                codChargeProduct?.price || 0,
            prepaid:
              res?.data?.checkoutTotals?.prepaidTotal?.gross?.amount || 0,
            prepaidCashback:
              res?.data?.checkoutTotals?.prepaidCashback?.gross?.amount || 0,
          });
        }
      }
    },
    [checkout, radioState, isCodProductInCart]
  );

  useEffect(() => {
    if (
      availablePaymentGateways?.length &&
      availablePaymentGateways[0].id === "mirumee.payments.wallet"
    ) {
      setIsTotalZero(true);
    } else {
      setIsTotalZero(false);
    }
  }, [availablePaymentGateways]);

  useEffect(() => {
    if (!paymentMethodChangeLoading && placeOrderClicked) {
      formSubmitHandler();
    }
  }, [paymentMethodChangeLoading, placeOrderClicked]);

  // useEffect(() => {
  //   // Show Error and Remove error message from url param if error is encountered in payment
  //   if (Router?.isReady && Router?.query?.errorMessage) {
  //     setCheckoutError(Router?.query?.errorMessage);
  //     Router.push(
  //       {
  //         query: {},
  //       },
  //       undefined,
  //       {
  //         shallow: true,
  //         scroll: false,
  //       }
  //     );
  //   }
  // }, [Router?.isReady]);

  useEffect(() => {
  if(typeof window !== 'undefined'){
    const routerQuery = Router?.query?.redirect_from;
    const products = paymentSummary.items.map(item => {
      return {
        brand: META_DEFAULTS.name,
        id: item?.variant.sku,
        name: item?.variant.product.name,
        price: item?.variant.pricing.price.gross.amount,
        quantity: item.quantity,
      };
    });
    const quantity = paymentSummary.items.reduce(
      (partialSum, a) => partialSum + a?.quantity,
      0
    );
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
      window.history.pushState(null, null, window.location.href);
    }
    (window.dataLayer = window.dataLayer || []).push({
      event: "Checkout",
      ecommerce: {
        checkout: {
          actionField: {
            step: 1,
            option:
              routerQuery === "proceed-to-pay"
                ? "Proceed To Pay"
                : routerQuery === "buy-now"
                ? "Buy Now"
                : "checkout",
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

    const checkoutDataLayerItems = paymentSummary?.items?.map(item => {
      return {
        item_name: item?.variant?.product?.name,
        item_id: item?.variant?.sku,
        price: item?.variant?.pricing?.price?.gross?.amount,
        item_brand: META_DEFAULTS?.name,
        quantity: item?.quantity,
      };
    });

    window.dataLayer = window.dataLayer || [];
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
    }
    window.dataLayer?.push({
      event: "checkoutBegin",
      UserID: user?.id,
      user_type: user ? "logged_in" : "logged_out",
      ecommerce: {
        checkout_option: {
          actionField: { step: 1, option: "Checkout Begin" },

          products: items?.map(item => ({
            name: item?.variant?.product?.name,
            id: item?.variant?.product?.id,
            price: item?.variant?.pricing?.price?.gross?.amount,
            brand: "Plixlife",
            category: item?.variant?.product?.category,
            quantity: item?.quantity,
            variant: item?.variant?.name,
          })),
        },
      },
    });
  }
  }, []);

  const validateItems = (items: CheckoutLineFragment[]) => {
    return items?.every(item => item?.variant?.product?.name);
  };

  useEffect(() => {
    const utm_data = getUtmData(pathname);
    if (items?.length && validateItems(items)) {
      let totalQuantity = 0;
      items?.forEach(item => {
        totalQuantity += item.quantity;
      });

      if (clevertapEvents.checkoutPage.enable) {
        const extractp = {};
        const nonFreeProducts = items?.filter(
          item =>
          item?.variant?.product?.category?.slug !== "free-gift-products" &&
          item?.variant?.product?.category?.slug !== "freebies-with-product"
        );
        for (let i = 0; i < nonFreeProducts?.length! && i < 3; i++) {
          // @ts-ignore
          extractp[`product ${i + 1} name`] =
            nonFreeProducts?.[i]?.variant?.product?.name;
          // @ts-ignore
          extractp[`product ${i + 1} price`] =
            nonFreeProducts?.[i]?.variant?.pricing?.price?.net?.amount;
          // @ts-ignore
          extractp[`product ${i + 1} url`] = generateProductUrl(
            nonFreeProducts?.[i]?.variant?.product?.id!,
            nonFreeProducts?.[i]?.variant?.product?.slug!
          );
          // @ts-ignore
          extractp[`product ${i + 1} image url`] =
            nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
          // @ts-ignore
          extractp[`product ${i + 1} quantity`] =
            nonFreeProducts?.[i]?.quantity;
          // @ts-ignore
          extractp[`product ${i + 1} total price`] =
            nonFreeProducts?.[i]?.totalPrice?.gross?.amount;
        }

        extractp["Products count"] = nonFreeProducts?.length;
        const ctp = {
          platform: window.screen.width > 520 ? "website" : "msite",
          timeStamp: Date.now(),
          gaUserId: getGclid(),
          customerEmail: validUserMail || checkout?.email,
          customerPhone:
            user?.phone ||
            user?.defaultShippingAddress?.phone ||
            checkout?.shippingAddress?.phone,
          quantity: totalQuantity,
          cartAmount: totalPrice?.gross?.amount,
          clickSource: utm_data,
          clickLabel: "Checkout",
          productName: items
            ?.map(item => {
              return item?.variant?.product?.name;
            })
            .toString(),
          "Product Price": items
            ?.map(item => {
              return item.variant.pricing?.price?.net?.amount;
            })
            .toString(),
          "Product Quantity": items
            ?.map(item => {
              return item.quantity;
            })
            .toString(),
          "Coupon code": promoCodeDiscount?.voucherCode
            ? promoCodeDiscount?.voucherCode
            : "",
          "Cart MRP": !!isBoxItemInCart.length ?Number(mrp?.gross?.amount) + totalbyobMrpInItems - totalbyobItemAmount :mrp?.gross.amount,
          "Checkout Url": `https://www.plixlife.com/checkout/address?token=${checkout?.token}`,
          "Item Discount": !!isBoxItemInCart.length ? Number(itemDiscount?.gross?.amount) + totalbyobMrpInItems - totalbyobItemAmount : itemDiscount?.gross.amount,
          "Net Price": netPrice?.gross.amount,
          "Coupon discount": couponDiscount.gross.amount,
          "Offer discount": offerDiscount?.gross.amount,
          "Order total": totalPrice?.gross?.amount,
          "Delivery Charges": shippingPrice?.gross.amount,
          "Prepaid discount": prepaidDiscount.gross.amount,
          "Total discount": discount?.amount,
          "Total Cart Value": totalPrice?.gross?.amount,
        };

        clevertap.event.push(clevertapEvents.checkoutPage.value, {
          ...ctp,
          ...extractp,
        });
      }
    }
  }, [totalPrice.gross.amount]);

  const { isFormValid, email, ...formStateWithoutEmail } = formState;

  const formRef = useRef(null);

  const formStateWithoutEmailWithValues = Object.keys(
    formStateWithoutEmail
  ).reduce((total, curr) => {
    const newObject = {};
    newObject[curr] = formStateWithoutEmail[curr].value;
    //

    return { ...total, ...newObject };
  }, {});

  const [showError, setShowError] = useState(false);
  const [userNotification, setUserNotification] = useState(true);
  const [juspayFormElement, setJuspayFormElement] = useState(null);
  const [paymentCardInfo, setPaymentCardInfo] = useState(null);
  const [showJuspaySubmitError, setShowJuspaySubmitError] = useState("");
  const [juspayOrderId, setJuspayOrderId] = useState<{
    orderId: string;
    id: string;
  }>({
    orderId: "",
    id: "",
  });

  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (checkoutError) {
      scrollToTop("smooth");
    }
  }, [checkoutError]);

  const {
    setShippingAndBillingAddress,
    setShippingMethod,
    checkoutPaymentMethodUpdate,
    createRazorpayOrder,
    createPayment,
    completeCheckout,
    getWalletAmount,
    juspayOrderAndCustomerCreate,
    juspayVpaVerify,
    getCheckoutTotals,
    juspayPaymentCreate,
    setShippingAddress,
    setShippingAddressAndEmail,
    checkoutRecalculation,
    updateCheckoutMeta
  } = useCheckoutRes;

  const history = useCustomHistory();

  const { updateItemWithLinesRest,removeItemRest } = useCart();

  const { authenticated, authenticating } = useAuthState();

  function loadScript(src: string) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // Function to submit user notification data
  const submitUserNotificationData = () => {
    const firstName =
      user?.firstName ||
      checkout?.shippingAddress?.firstName ||
      checkout?.billingAddress?.firstName;
    const lastName =
      user?.lastName ||
      checkout?.shippingAddress?.lastName ||
      checkout?.billingAddress?.lastName;

    const userPhone =
      user?.phone ||
      user?.defaultBillingAddress?.phone ||
      checkout?.shippingAddress?.phone ||
      checkout?.billingAddress?.phone;
    const notificationData = {
      Name: `${firstName} ${lastName}`,
      Email: validUserMail || checkout?.email,
      Phone: userPhone,
      Identity: userPhone && Number(userPhone.replace("+", "")),
      // optional fields. controls whether the user will be sent email, push etc.
      "MSG-email": userNotification, // Email notifications
      "MSG-sms": userNotification, // Sms notifications
      "MSG-whatsapp": userNotification, // WhatsApp notifications
    };

    clevertap.onUserLogin.push({
      Site: notificationData,
    });
  };

  const syncRadioStateWithSelectedPaymentGateway = (
    gateway: PaymentRadioFields
  ) => {
    switch (gateway) {
      case "mirumee.payments.dummy":
        if (radioState !== "mirumee.payments.dummy") {
          setradioState("mirumee.payments.dummy");
        }
        break;
      case "mirumee.payments.razorpay":
        if (radioState !== "mirumee.payments.razorpay") {
          setradioState("mirumee.payments.razorpay");
        }
        break;
      case "mirumee.payments.juspay":
        if (radioState !== "mirumee.payments.juspay") {
          setradioState("mirumee.payments.juspay");
        }
        break;
      default:
        break;
    }
  };

  const addCodChargeProductInCart = async (actionType: "ADD" | "REMOVE") => {
    let dbVariantId;
    if (codChargeProduct?.variantId) {
      dbVariantId = getDBIdFromGraphqlId(
        codChargeProduct?.variantId,
        "ProductVariant"
      );
    }
    if (actionType === "ADD") {
      if (
        codChargeProduct?.variantId &&
        (!items.find(item => item.variant.id === codChargeProduct?.variantId) ||
          paymentMethodChangeLoading === true)
      ) {
        const updateItemWithLinesRes = await updateItemWithLinesRest(
          [{ variantId: dbVariantId, quantity: 1 }],
          false,
          false,
          true
        );
        getCheckoutTotalAmounts(
          checkout?.availablePaymentGateways[0]?.id,
          isItemInCart(
            updateItemWithLinesRes?.data?.lines,
            codChargeProduct?.variantId
          )
        );
      }
    } else if (
      actionType === "REMOVE" &&
      (items.find(item => item.variant.id === codChargeProduct?.variantId) ||
        paymentMethodChangeLoading === true)
    ) {
      const updateItemWithLinesRes = await updateItemWithLinesRest(
        [{ variantId: dbVariantId, quantity: 0 }],
        false,
        false,
        true
      );
      getCheckoutTotalAmounts(
        checkout?.availablePaymentGateways[0]?.id,
        isItemInCart(
          updateItemWithLinesRes?.data?.lines,
          codChargeProduct?.variantId
        )
      );
    }
    setPaymentMethodChangeLoading(false);
    // setPaymentMethodChangeLoading(false);
  };

  useEffect(() => {
    if (availablePaymentGateways[0]?.id) {
      if (codChargeProduct?.enabled) {
        if (availablePaymentGateways[0]?.id === PaymentMethods.COD) {
          addCodChargeProductInCart("ADD");
        } else {
          addCodChargeProductInCart("REMOVE");
        }
      }
      syncRadioStateWithSelectedPaymentGateway(availablePaymentGateways[0]?.id);
    }
  }, [availablePaymentGateways[0]?.id]);

  const recalculation_toggle =
    getMetadataValue(ShopMetaContextValue, "recalculation_toggle") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "recalculation_toggle"));


  const handleCheckoutRecalculation = async (refresh_checkout?: boolean) => {
    if (recalculation_toggle) {
      if (refresh_checkout) {
        await checkoutRecalculation(refresh_checkout);
      } else {
        await checkoutRecalculation();
      }
    }
  };

  const createJuspayOrderAndPaymentParams = async () => {
    const prevCheckoutTotal =
      typeof window !== "undefined" &&
      localStorage.getItem(PREV_CHECKOUT_TOTAL);

    const createNewJuspayOrder = !(
      parseFloat(prevCheckoutTotal) == checkout?.totalPrice?.gross?.amount
    );

    if (createNewJuspayOrder) {
      setJuspayOrderId({
        orderId: "",
        id: "",
      });
    }

    const juspayResult = await juspayOrderAndCustomerCreate(
      createNewJuspayOrder,
      validUserMail
    );

    const juspayErrorMessage =
      (juspayResult?.errors && juspayResult?.errors[0]?.message) ||
      (juspayResult?.data?.juspayOrderAndCustomerCreate?.errors &&
        juspayResult?.data?.juspayOrderAndCustomerCreate?.errors[0]?.message) ||
      (juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayErrors &&
        juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayErrors[0]
          ?.message);
    if (
      juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
        ?.orderId &&
      juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
        ?.customerId &&
      juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse?.id
    ) {
      if (
        juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
          ?.amount &&
        typeof window !== "undefined"
      ) {
        localStorage.setItem(
          PREV_CHECKOUT_TOTAL,
          juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
            ?.amount
        );
      }
      let hasError;
      const createPaymentInput: CreatePaymentInput = {
        gateway: availablePaymentGateways[0]?.id,
        token:
          juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse?.id,
      };
      createPayment(createPaymentInput).then(createPaymentRes => {
        const createPaymentResErrorMessage =
          (createPaymentRes?.errors && createPaymentRes?.errors[0]?.message) ||
          (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message);
        if (createPaymentResErrorMessage) {
          setCheckoutError(createPaymentResErrorMessage);
          hasError = createPaymentResErrorMessage;
        }
      });

      // Call the juspayPaymentCreateApi
      const variablesForPayment: JuspayPaymentInput = {
        paymentMethod: "UPI",
        paymentMethodType: "UPI",
        customerId:
          juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
            ?.customerId,
        txnType: "UPI_PAY",
        sdkParams: true,
      };
      const res = await juspayPaymentCreate(variablesForPayment);
      setLoading(false);
      if (
        res?.data?.juspayPayment?.juspayResponse?.paymentTxnId &&
        res?.data?.juspayPayment?.juspayResponse?.sdkParams
      ) {
        const sdkParams = res?.data?.juspayPayment?.juspayResponse?.sdkParams;
        // Return the parameters required to construct the payment uri
        return {
          ...sdkParams,
          orderId:
            juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
              ?.orderId,
          id:
            juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
              ?.id,
          hasError,
        };
      }
      setCheckoutError("Failed to create payment link, please try again");
    }

    if (juspayErrorMessage) {
      setCheckoutError(juspayErrorMessage);
    }
  };

  const formSubmitHandler = async (e?: any) => {
    // console.log("clicked", clicked);
    setCheckoutError("");
    setLoading(true);
    setPlaceOrderClicked(false);
    if (e) {
      e.preventDefault();
    }
    // e.preventDefault(); // prevents the form from submitting

    if (
      !(
        items &&
        items.length &&
        items.some(
          item => item?.variant?.product?.category?.name == "All Products" ||
          item?.variant?.product?.category?.name == "Byob Products" ||
          item?.variant?.product?.category?.name == "Membership"
        )
      )
    ) {
      setLoading(false);
      setCheckoutError("Please add any product along with this.");
      return;
    }

    if (items.length) {
      const subscription_product_skus =
        checkout?.metadata &&
        getMetadataValue(checkout?.metadata, "subscription_skus") &&
        parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

      let updated_product_skus = subscription_product_skus;
      if (Array.isArray(subscription_product_skus)) {
        subscription_product_skus.forEach((v_sku:string)=> {
          if (!items.some(item => item.variant.sku === v_sku)) {
            updated_product_skus = subscription_product_skus.filter(i => i !== v_sku);
          }
        });
        if (!updated_product_skus.length) {
          client.query({
            query: removeTags,
            variables: {
              id: checkout?.id,
              input: ["subscription_product"],
            },
            fetchPolicy: "no-cache",
          });
        }
        if (subscription_product_skus.length !== updated_product_skus.length) {
          const checkoutMetaUpdateValue = [{
            key: "subscription_skus",
            value: JSON.stringify(updated_product_skus)
          }];
          updateCheckoutMeta(checkoutMetaUpdateValue);
        }
      }
    }

    const cod_applicable =
      getMetadataValue(checkout?.metadata, "cod_applicable") &&
      parseJson(getMetadataValue(checkout?.metadata, "cod_applicable"));
    if (
      (cod_applicable === "false" || cod_applicable === false) &&
      radioState === "mirumee.payments.dummy"
    ) {
      setCheckoutError("COD not applicable");
      return;
    }

    // Make address field empty if checkout address contains abandoned.
    if (checkout?.shippingAddress?.streetAddress1 === "abandoned") {
      setCheckoutError("Invalid Address");
      dispatch({
        type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
        data: {
          name: "streetAddress1",
          value: "",
          hasError: true,
          error: "Invalid Address",
          touched: false,
          isFormValid: false,
        },
      });
      setLoading(false);
      scrollToTop("smooth");
      return;
    }

    if (false) {
      setShowError(true);
      scrollToTop("smooth");
    } else {
      // Logic to submit the form to backend

      const utm_data = getUtmData(pathname);

      // Whether user has opted to recieve notification.
      submitUserNotificationData();

      if (ENABLE_GA4) {
        if (
          typeof window !== "undefined" &&
          window.dataLayer &&
          gtmConfig.addPaymentInfo.enable
        ) {
          window.dataLayer.push({ ecommerce: null });
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.addPaymentInfo.value,
            user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
            user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce: {
              currency: "INR",
              value: paymentSummary?.totalPrice?.gross?.amount,
              coupon: checkout?.voucherCode || "NA",
              payment_type: radioState === "mirumee.payments.dummy" ? "Cash On Delivery" : "Card|UPI|Netbanking|Wallet",
              items: items?.map(item => {

                const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id)
                const productVariantName = getVariantAttributes("Flavors", item?.variant);
                const {discountAmount} = getPrices(item?.variant?.product, false, item?.variant);
                const categories = getItemCategoriesFromAttribute(item?.variant);
                const isMonthIncluded = categories?.sizeCategory2?.toLowerCase()?.includes("month");
                return {
                  item_id: item.variant?.product?.id ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product") : "NA",
                  item_name: item?.variant?.product?.name,
                  item_brand: "plixlife",
                  currency: "INR",
                  quantity: item?.quantity,
                  discount: discountAmount,
                  coupon: checkout?.voucherCode || "NA",
                  item_category: item?.variant?.product?.category?.name,
                  item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
                  item_category3: categories?.sizeCategory1 || "NA",
                  item_category4: isMonthIncluded ? "NA" : (categories?.sizeCategory2 || "NA"),
                  price: item?.variant?.pricing?.price?.gross?.amount,
                  item_variant: productVariantName,
                  item_list_name: itemJourneyInfo?.addedFrom || "NA",
                  item_list_id: itemJourneyInfo?.productListId || "NA",
                  index: "NA"
                };
              })
            },
          });
        }
      }

      if (authenticated) {
        getWalletAmount().then(walletAmount => {
          let totalQuantity = 0;
          items?.forEach(item => {
            totalQuantity += item.quantity;
          });

          const utm_data = getUtmData(pathname);

          if (clevertapEvents.deliveryDetails.enable) {
            clevertap.event.push(clevertapEvents.deliveryDetails.value, {
              platform: window.screen.width < 520 ? "msite" : "website",
              clickTarget: document.location.href,
              clickSource: utm_data,
              gaUserId: getGclid(),
              customerEmail: validUserMail || checkout?.email,
              customerPhone:
                user?.phone ||
                user?.defaultShippingAddress?.phone ||
                checkout?.shippingAddress?.phone,
              quantity: totalQuantity,
              cartAmount: totalPrice?.gross?.amount,
              productName: items
                ?.map(item => {
                  return item?.variant?.product?.name;
                })
                .toString(),
              paymentMode:
                radioState === "mirumee.payments.razorpay" ? "Online" : "COD",
              paymentAmount: totalPrice?.gross?.amount,
              orderAddressPin:
                checkout?.shippingAddress?.postalCode ||
                checkout?.billingAddress?.postalCode,
              orderAddressCity:
                checkout?.shippingAddress?.city ||
                checkout?.billingAddress?.city,
              state:
                checkout?.shippingAddress?.countryArea ||
                checkout?.billingAddress?.countryArea,
              couponAmount: couponDiscount.gross.amount,
              walletAmount: walletAmount.data.wallet.amount,
              couponName: promoCodeDiscount?.voucherCode,
            });
          }
        });
      } else {
        // console.log("if 2 authenticated", authenticated);

        let totalQuantity = 0;
        items?.forEach(item => {
          totalQuantity += item.quantity;
        });

        if (clevertapEvents.deliveryDetails.enable) {
          // console.log("if 3 authenticated", authenticated);

          clevertap.event.push(clevertapEvents.deliveryDetails.value, {
            platform: window.screen.width < 520 ? "msite" : "website",
            clickTarget: document.location.href,
            clickSource: utm_data,
            gaUserId: getGclid(),
            customerEmail: validUserMail || checkout?.email,
            customerPhone:
              user?.phone ||
              user?.defaultShippingAddress?.phone ||
              checkout?.shippingAddress?.phone,
            quantity: totalQuantity,
            cartAmount: totalPrice?.gross?.amount,
            productName: items
              ?.map(item => {
                return item?.variant?.product?.name;
              })
              .toString(),
            paymentMode:
              radioState === "mirumee.payments.razorpay" ? "Online" : "COD",
            paymentAmount: totalPrice?.gross?.amount,
            orderAddressPin:
              checkout?.shippingAddress?.postalCode ||
              checkout?.billingAddress?.postalCode,
            orderAddressCity:
              checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
            state:
              checkout?.shippingAddress?.countryArea ||
              checkout?.billingAddress?.countryArea,
            couponAmount: couponDiscount.gross.amount,
            walletAmount: 0,
            couponName: promoCodeDiscount?.voucherCode,
          });
        }
      }

      if (clevertapEvents.paymentInitiated.enable) {
        clevertap.event.push(clevertapEvents.paymentInitiated.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          timeStamp: Date.now(),
          clickTarget: document.location.href,
          clickSource: utm_data,
          gaUserId: getGclid(),
          customerEmail: validUserMail || checkout?.email,
          customerPhone:
            user?.phone ||
            user?.defaultShippingAddress?.phone ||
            checkout?.shippingAddress?.phone,
          quantity: totalQuantity,
          cartAmount: totalPrice?.gross?.amount,
          productName: items
            ?.map(item => {
              return item?.variant?.product?.name;
            })
            .toString(),
          paymentMode:
            radioState === "mirumee.payments.razorpay" ? "Online" : "COD",
          paymentAmount: totalPrice?.gross?.amount,
          orderAddressPin:
            checkout?.shippingAddress?.postalCode ||
            checkout?.billingAddress?.postalCode,
          orderAddressCity:
            checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
          couponAmount: couponDiscount.gross.amount,
        });
      }

      // Place order datalayer event
      (window.dataLayer || []).push({ ecommerce: null });
      window.dataLayer.push({
        event: "checkoutPlaceOrder",
        UserID: user ? getDBIdFromGraphqlId(user?.id, "User") : null,
        user_type: user ? "logged_in" : "logged_out",
        ecommerce: {
          checkout_option: {
            actionField: { step: 3, option: "Place Order" },

            products: items?.map(item => ({
              name: item?.variant?.product?.name,
              id: item?.variant?.product?.id,
              price: item?.variant?.pricing?.price?.gross?.amount,
              brand: "Plixlife",
              category: item?.variant?.product?.category?.name,
              quantity: item?.quantity,
              variant: item?.variant?.name,
            })),
          },
        },
      });
      if (isTotalZero) {
        const createPaymentInput: CreatePaymentInput = {
          gateway: availablePaymentGateways[0]?.id,
          token: "not-charged",
        };
        // const resRecalculatedCheckout = await handleCheckoutRecalculation();

        const createPaymentRes = await createPayment(createPaymentInput);

        if (
          (createPaymentRes?.errors && createPaymentRes?.errors[0]?.message) ||
          (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message)
        ) {
          setCheckoutError(
            (createPaymentRes?.errors &&
              createPaymentRes?.errors[0]?.message) ||
              (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
                createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                  ?.message)
          );

          // Set Payment method to razorpay if cod not applicable error is encountered
          if (
            createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0].code ===
              "INVALID" &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
              ?.message === "COD Not available."
          ) {
            const paymentMethodRes = await checkoutPaymentMethodUpdate(
              {
                gateway: PaymentMethods.RAZORPAY,
                useCashback,
              },
              false
            );
            if (
              paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                ?.availablePaymentGateways &&
              paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                ?.availablePaymentGateways.length
            ) {
              setradioState(
                paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                  ?.availablePaymentGateways[0]?.id
              );
            }
            // await handleCheckoutRecalculation();
          }

          clevertapPaymentFailure();
          paymentFailureDatalayer();
          setLoading(false);
          return;
        }

        const completeCheckoutRes = await completeCheckout();

        if (
          (completeCheckoutRes?.errors &&
            completeCheckoutRes?.errors[0]?.message) ||
          (completeCheckoutRes?.data?.checkoutComplete?.errors &&
            completeCheckoutRes?.data?.checkoutComplete?.errors[0]?.message)
        ) {
          setCheckoutError(
            (completeCheckoutRes?.errors &&
              completeCheckoutRes?.errors[0]?.message) ||
              (completeCheckoutRes?.data?.checkoutComplete?.errors &&
                completeCheckoutRes?.data?.checkoutComplete?.errors[0]?.message)
          );

          clevertapPaymentFailure();
          setLoading(false);
          return;
        }

        if (
          !(completeCheckoutRes.errors && completeCheckoutRes.errors.length) &&
          completeCheckoutRes.data.checkoutComplete.order?.id
        ) {
          history.push("/order-placed");
        }
      } else {
        if (radioState === "mirumee.payments.juspay") {
          if (paymentMode === "UPI") {
            const upiVerifyRes = await verifyUpiAddress();
            if (upiVerifyRes !== "VALID") {
              setLoading(false);
              return;
            }
          }

          if (paymentMode === "WALLET") {
            if (!selectedWallet) {
              setCheckoutError("No wallet Selected");
              setLoading(false);
              return;
            }
          }

          if (paymentMode === "NB") {
            if (!selectedNB) {
              setCheckoutError("No Bank Selected");
              setLoading(false);
              return;
            }
          }

          if (paymentMode === "card") {
            const res_validate_form = juspayFormElement?.validate_form();
            if (!res_validate_form?.valid && res_validate_form.target_element) {
              const cardErrorText = getCardErrorText(
                res_validate_form.target_element
              );
              if (cardErrorText) {
                setCheckoutError(cardErrorText);
              }
              setLoading(false);
              return;
            }

            juspayFormElement?.tokenize({
              async success_handler(response) {
                const prevCheckoutTotal =
                  typeof window !== "undefined" &&
                  localStorage.getItem(PREV_CHECKOUT_TOTAL);

                const createNewJuspayOrder = !(
                  parseFloat(prevCheckoutTotal) ==
                  checkout?.totalPrice?.gross?.amount
                );
                if (createNewJuspayOrder) {
                  setJuspayOrderId({
                    orderId: "",
                    id: "",
                  });
                }

                const juspayResult = await juspayOrderAndCustomerCreate(
                  createNewJuspayOrder,
                  validUserMail
                );

                const juspayErrorMessage =
                  (juspayResult?.errors && juspayResult?.errors[0]?.message) ||
                  (juspayResult?.data?.juspayOrderAndCustomerCreate?.errors &&
                    juspayResult?.data?.juspayOrderAndCustomerCreate?.errors[0]
                      ?.message) ||
                  (juspayResult?.data?.juspayOrderAndCustomerCreate
                    ?.juspayErrors &&
                    juspayResult?.data?.juspayOrderAndCustomerCreate
                      ?.juspayErrors[0]?.message);
                if (
                  juspayResult?.data?.juspayOrderAndCustomerCreate
                    ?.juspayResponse?.orderId
                ) {
                  setJuspayOrderId({
                    orderId:
                      juspayResult?.data?.juspayOrderAndCustomerCreate
                        ?.juspayResponse?.orderId,
                    id:
                      juspayResult?.data?.juspayOrderAndCustomerCreate
                        ?.juspayResponse?.id,
                  });
                  if (
                    juspayResult?.data?.juspayOrderAndCustomerCreate
                      ?.juspayResponse?.amount &&
                    typeof window !== "undefined"
                  ) {
                    localStorage.setItem(
                      PREV_CHECKOUT_TOTAL,
                      juspayResult?.data?.juspayOrderAndCustomerCreate
                        ?.juspayResponse?.amount
                    );
                  }
                }

                if (juspayErrorMessage) {
                  setCheckoutError(juspayErrorMessage);
                  setLoading(false);
                }
                // if (
                //   juspayFormElement &&
                //   juspayResult?.data?.juspayOrderAndCustomerCreate
                //     ?.juspayResponse?.id &&
                //   juspayOrderId
                // ) {
                //   juspayFormElement?.submit_form();
                // }
              },
              error_handler(response) {
                console.log("error tokenize", response);
                if (response?.error_message && response?.error_code) {
                  setCheckoutError(
                    res_validate_form?.valid
                      ? "Invalid card details - please check your cvv"
                      : response.error_message
                  );
                }
                setLoading(false);
              },
            });
            return;
          }

          const prevCheckoutTotal =
            typeof window !== "undefined" &&
            localStorage.getItem(PREV_CHECKOUT_TOTAL);

          const createNewJuspayOrder = !(
            parseFloat(prevCheckoutTotal) == checkout?.totalPrice?.gross?.amount
          );

          if (createNewJuspayOrder) {
            setJuspayOrderId({
              orderId: "",
              id: "",
            });
          }

          const juspayResult = await juspayOrderAndCustomerCreate(
            createNewJuspayOrder,
            validUserMail
          );

          const juspayErrorMessage =
            (juspayResult?.errors && juspayResult?.errors[0]?.message) ||
            (juspayResult?.data?.juspayOrderAndCustomerCreate?.errors &&
              juspayResult?.data?.juspayOrderAndCustomerCreate?.errors[0]
                ?.message) ||
            (juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayErrors &&
              juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayErrors[0]
                ?.message);

          if (
            juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
              ?.orderId
          ) {
            setJuspayOrderId({
              orderId:
                juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
                  ?.orderId,
              id:
                juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
                  ?.id,
            });
            if (
              juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
                ?.amount &&
              typeof window !== "undefined"
            ) {
              localStorage.setItem(
                PREV_CHECKOUT_TOTAL,
                juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
                  ?.amount
              );
            }
          }

          if (juspayErrorMessage) {
            setCheckoutError(juspayErrorMessage);
            setLoading(false);
            return;
          }

          // if (
          //   juspayFormElement &&
          //   juspayResult?.data?.juspayOrderAndCustomerCreate?.juspayResponse
          //     ?.id &&
          //   juspayOrderId
          // ) {
          //   juspayFormElement?.submit_form();
          // } else {
          //   setLoading(false);
          //   setCheckoutError("Something went wrong, please try again");
          // }
        }
        if (radioState === "mirumee.payments.razorpay") {
          const createRazorpayOrderRes = await createRazorpayOrder();
          if (
            (createRazorpayOrderRes?.errors &&
              createRazorpayOrderRes?.errors[0]?.message) ||
            (createRazorpayOrderRes?.data?.razorpayOrderCreate
              ?.razorpayErrors &&
              createRazorpayOrderRes?.data?.razorpayOrderCreate
                ?.razorpayErrors[0]?.message)
          ) {
            setCheckoutError(
              (createRazorpayOrderRes?.errors &&
                createRazorpayOrderRes?.errors[0]?.message) ||
                (createRazorpayOrderRes?.data?.razorpayOrderCreate
                  ?.razorpayErrors &&
                  createRazorpayOrderRes?.data?.razorpayOrderCreate
                    ?.razorpayErrors[0]?.message)
            );
            setLoading(false);
            return;
          }

          const data =
            createRazorpayOrderRes.data.razorpayOrderCreate.razorpayOrder;
          const createPaymentInput: CreatePaymentInput = {
            gateway: availablePaymentGateways[0]?.id,
            token: data.id,
          };
          // const resRecalculatedCheckout = await handleCheckoutRecalculation();

          const createPaymentRes = await createPayment(createPaymentInput);
          razorpayPopupDatalayer();

          if (
            (createPaymentRes?.errors &&
              createPaymentRes?.errors[0]?.message) ||
            (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message)
          ) {
            setCheckoutError(
              (createPaymentRes?.errors &&
                createPaymentRes?.errors[0]?.message) ||
                (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
                  createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                    ?.message)
            );
            clevertapPaymentFailure();
            paymentFailureDatalayer();
            setLoading(false);
            return;
          }

          const options = {
            key: availablePaymentGateways[0]?.config[0].value,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: META_DEFAULTS.name,
            description: META_DEFAULTS.title,
            prefill: {
              email: email.value,
              contact: formState.phone.value,
            },
            theme: {
              color: theme.razorpayColor,
            },
            async handler(response: any) {
              setLoading(true);

              const paymentData = {
                token: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                razorpayOrderId: response.razorpay_order_id,
              };

              const completeCheckoutRes = await completeCheckout({
                paymentData,
              });

              if (
                (completeCheckoutRes?.errors &&
                  completeCheckoutRes?.errors[0]?.message) ||
                (completeCheckoutRes?.data?.checkoutComplete?.errors &&
                  completeCheckoutRes?.data?.checkoutComplete?.errors[0]
                    ?.message)
              ) {
                setCheckoutError(
                  (completeCheckoutRes?.errors &&
                    completeCheckoutRes?.errors[0]?.message) ||
                    (completeCheckoutRes?.data?.checkoutComplete?.errors &&
                      completeCheckoutRes?.data?.checkoutComplete?.errors[0]
                        ?.message)
                );
                clevertapPaymentFailure();
                setLoading(false);
                return;
              }

              if (
                !(
                  completeCheckoutRes.errors &&
                  completeCheckoutRes.errors.length
                ) &&
                completeCheckoutRes.data.checkoutComplete.order.id
              ) {
                history.push("/order-placed");
              }

              setLoading(false);
            },
          };

          if (!(createPaymentRes.errors && createPaymentRes.errors.length)) {
            const _window = window as any;
            const paymentObject = new _window.Razorpay(options);
            paymentObject.on("payment.failed", function failed(
              response: any
            ) {});
            paymentObject.open();
          }
        }

        if (radioState === "mirumee.payments.dummy") {
          const createPaymentInput: CreatePaymentInput = {
            gateway: availablePaymentGateways[0]?.id,
            token: "not-charged",
          };
          // const resRecalculatedCheckout = await handleCheckoutRecalculation();

          const createPaymentRes = await createPayment(createPaymentInput);

          if (
            (createPaymentRes?.errors &&
              createPaymentRes?.errors[0]?.message) ||
            (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message)
          ) {
            setCheckoutError(
              (createPaymentRes?.errors &&
                createPaymentRes?.errors[0]?.message) ||
                (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
                  createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                    ?.message)
            );

            // Set Payment method to razorpay if cod not applicable error is encountered
            if (
              createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0].code ===
                "INVALID" &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                ?.message === "COD Not available."
            ) {
              const paymentMethodRes = await checkoutPaymentMethodUpdate(
                {
                  gateway: PaymentMethods.RAZORPAY,
                  useCashback,
                },
                false
              );
              if (
                paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                  ?.availablePaymentGateways &&
                paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                  ?.availablePaymentGateways.length
              ) {
                setradioState(
                  paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                    ?.availablePaymentGateways[0]?.id
                );
              }

              // await handleCheckoutRecalculation();
            }

            clevertapPaymentFailure();
            paymentFailureDatalayer();
            setLoading(false);
            return;
          }

          const completeCheckoutRes = await completeCheckout();

          if (
            (completeCheckoutRes?.errors &&
              completeCheckoutRes?.errors[0]?.message) ||
            (completeCheckoutRes?.data?.checkoutComplete?.errors &&
              completeCheckoutRes?.data?.checkoutComplete?.errors[0]?.message)
          ) {
            setCheckoutError(
              (completeCheckoutRes?.errors &&
                completeCheckoutRes?.errors[0]?.message) ||
                (completeCheckoutRes?.data?.checkoutComplete?.errors &&
                  completeCheckoutRes?.data?.checkoutComplete?.errors[0]
                    ?.message)
            );
            clevertapPaymentFailure();
            setLoading(false);
            return;
          }

          if (
            !(
              completeCheckoutRes.errors && completeCheckoutRes.errors.length
            ) &&
            completeCheckoutRes.data.checkoutComplete.order.id
          ) {
            history.push("/order-placed");
          }
        }
      }
    }

    setLoading(false);

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  const handleRadioClick = async (value: string) => {
    // if (
    //   (value === PaymentModes.COD && paymentMode !== PaymentModes.COD) ||
    //   (value !== PaymentModes.COD && paymentMode === PaymentModes.COD)
    // ) {
    //   getCheckoutTotalAmounts();
    // }
    switch (value) {
      case "razorpay": {
        if (value && codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
        setradioState("mirumee.payments.razorpay");
        setPaymentMode(value);
        setLoading(true);
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.razorpay",
            useCashback,
          },
          false
        );
        if (res?.errors && res?.errors[0]?.message) {
          setCheckoutError(res?.errors[0]?.message);
        } else {
          setPaymentStep(2);
        }

        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }
      case "WALLET":
      case "card":
      case "UPI":
      case "NB": {
        setPaymentMode(value);
        if (
          availablePaymentGateways[0].id === PaymentMethods.JUSPAY &&
          radioState === "mirumee.payments.juspay"
        ) {
          setPaymentStep(2);
          break;
        } else {
          if (value && codChargeProduct?.enabled) {
            setPaymentMethodChangeLoading(true);
          }
          setradioState("mirumee.payments.juspay");
          setLoading(true);
          const res = await checkoutPaymentMethodUpdate(
            {
              gateway: "mirumee.payments.juspay",
              useCashback,
            },
            false
          );
          if (res?.errors && res?.errors[0]?.message) {
            setCheckoutError(res?.errors[0]?.message);
          } else {
            setPaymentStep(2);
          }
          // await handleCheckoutRecalculation();
          setLoading(false);
          break;
        }
      }
      case "UPI-gokwik": {
        if (value && codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.gokwik",
            useCashback,
          },
          false
        );
        // const newRes  = await handleCheckoutRecalculation();

        const currentPaymentMethod =
          res?.data?.checkoutPaymentMethodUpdate?.checkout
            ?.availablePaymentGateways[0]?.id;

        if (res?.errors && res?.errors[0]?.message) {
          setCheckoutError(res?.errors[0]?.message);
          return;
        }

        const createGokwikOrderRes = await createGokwikOrder();

        if (
          (createGokwikOrderRes?.errors &&
            createGokwikOrderRes?.errors[0]?.message) ||
          (createGokwikOrderRes.data?.createGokwikOrder?.gokwikErrors &&
            createGokwikOrderRes.data?.createGokwikOrder?.gokwikErrors?.[0]
              ?.message)
        ) {
          setCheckoutError(
            createGokwikOrderRes?.errors[0]?.message ||
              createGokwikOrderRes.data?.createGokwikOrder?.gokwikErrors?.[0]
                ?.message
          );
          return;
        }

        const {
          orderId,
          requestId,
          id,
          mid,
        } = createGokwikOrderRes?.data?.createGokwikOrder?.gokwickOrder;

        if (currentPaymentMethod) {
          const createPaymentInput: CreatePaymentInput = {
            gateway: currentPaymentMethod,
            token: id,
          };

          const createPaymentRes = await createPayment(createPaymentInput);
          if (
            (createPaymentRes?.errors &&
              createPaymentRes?.errors[0]?.message) ||
            (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message)
          ) {
            setCheckoutError(
              (createPaymentRes?.errors &&
                createPaymentRes?.errors[0]?.message) ||
                (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
                  createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                    ?.message)
            );
            return;
          }
        } else {
          setCheckoutError("Failed to initiate payment");
          return;
        }
        initiateGokwikCheckout(orderId, requestId, id, mid);

        // success callback
        //@ts-ignore
        gokwikSdk.on("success", async (data: any) => {
          const completeCheckoutRes = await completeCheckout();
          //@ts-ignore
          gokwikSdk.close();

          if (
            (completeCheckoutRes?.errors &&
              completeCheckoutRes?.errors[0]?.message) ||
            (completeCheckoutRes?.data?.checkoutComplete?.errors &&
              completeCheckoutRes?.data?.checkoutComplete?.errors[0]?.message)
          ) {
            setCheckoutError(
              (completeCheckoutRes?.errors &&
                completeCheckoutRes?.errors[0]?.message) ||
                (completeCheckoutRes?.data?.checkoutComplete?.errors &&
                  completeCheckoutRes?.data?.checkoutComplete?.errors[0]
                    ?.message)
            );

            clevertapPaymentFailure();
            setLoading(false);
            return;
          }

          if (
            !(
              completeCheckoutRes.errors && completeCheckoutRes.errors.length
            ) &&
            completeCheckoutRes.data.checkoutComplete.order?.id
          ) {
            history.push("/order-placed");
          }
        });

        // failure callback

        //@ts-ignore
        gokwikSdk.on("failure", (data: any) => {
          gokwikSdk.close();
          setCheckoutError(
            "Failed to capture payment, please try other payment methods"
          );
          // insert error message
        });

        setLoading(false);
        break;
      }
      case "cod": {
        if (value && codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
        setradioState("mirumee.payments.dummy");
        setPaymentMode(value);
        setLoading(true);
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.dummy",
            useCashback,
          },
          false
        );
        if (
          (res?.errors && res?.errors[0]?.message) ||
          (res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.message)
        ) {
          setradioState("mirumee.payments.juspay");
          setPaymentMode("UPI");
          checkoutPaymentMethodUpdate({
            gateway: "mirumee.payments.juspay",
            useCashback,
          });
          setCheckoutError(
            (res?.errors && res?.errors[0]?.message) ||
              (res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
                res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]
                  ?.message)
          );
          if (
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.code ===
              "NOT_FOUND" &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.field ===
              "checkoutId" &&
            typeof window !== "undefined"
          ) {
            window.localStorage.clear();
            window.location.reload();
          }
        } else {
          setPaymentStep(2);
        }
        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }

      default: {
        setradioState("mirumee.payments.juspay");
        setPaymentMode("UPI");
        setLoading(true);
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.juspay",
            useCashback,
          },
          false
        );
        if (
          (res?.errors && res?.errors[0]?.message) ||
          (res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.message)
        ) {
          setCheckoutError(
            (res?.errors && res?.errors[0]?.message) ||
              (res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
                res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]
                  ?.message)
          );
          if (
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.code ===
              "NOT_FOUND" &&
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.field ===
              "checkoutId" &&
            typeof window !== "undefined"
          ) {
            window.localStorage.clear();
            window.location.reload();
          }
        } else {
          setPaymentStep(2);
        }
        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }
    }
  };

  // Verify Upi Address
  const verifyUpiAddress = async () => {
    if (upiValue) {
      const res = await juspayVpaVerify(upiValue);
      if (res?.data?.juspayVerifyVpa?.juspayResponse?.status === "VALID") {
        setUpiValueError({
          upiAddress: upiValue,
          hasError: false,
        });
        return "VALID";
      }
      setCheckoutError("Invalid Upi id given");
      setUpiValueError({
        upiAddress: upiValue,
        hasError: true,
      });
    } else {
      setCheckoutError("Upi id not provided");
      setUpiValueError({
        upiAddress: upiValue,
        hasError: true,
      });
    }
  };

  const debouncedSetAddress = React.useRef(
    debounce(
      async (formStateWithoutEmailWithValues, email, user, userCheckout) => {
        setLoading(true);

        if (email === "dummy@dummy.com") {
          setCheckoutError("Invalid email");
          // dispatch({
          //   type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          //   data: {
          //     name: "email",
          //     value: "",
          //     hasError: true,
          //     error: "Invalid email",
          //     touched: false,
          //     isFormValid: false,
          //   },
          // });
          setLoading(false);
          return;
        }

        const formStateValuesWithPhone = {
          ...formStateWithoutEmailWithValues,
          phone: user?.phone,
        };
        const resAddress = await setShippingAddressAndEmail(
          { ...formStateValuesWithPhone, country: { code: "IN" } },
          email,
          !userCheckout?.shippingMethod
        );

        // await handleCheckoutRecalculation();

        if (resAddress?.errors && resAddress?.errors[0]?.message) {
          setCheckoutError(
            resAddress?.errors && resAddress?.errors[0]?.message
          );

          // dispatch({
          //   type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
          //   data: {
          //     ...initialState,
          //     phone: {
          //       value: user?.phone || "",
          //       touched: true,
          //       hasError: !user?.phone,
          //       error: "",
          //     },
          //   },
          // });
          setCheckoutError("Error is updating address, please try again");
          setLoading(false);
          return;
        }
        if (
          resAddress?.data?.checkoutShippingAddressUpdate?.errors &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.code ===
            "INVALID" &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.field ===
            "phone"
        ) {
          setCheckoutError(
            resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.message
          );
          setCurrentCheckoutStep(1);
          // dispatch({
          //   type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          //   data: {
          //     name: "phone",
          //     value: "",
          //     hasError: true,
          //     error:
          //       resAddress?.resShipping?.data?.checkoutShippingAddressUpdate
          //         ?.errors[0]?.message,
          //     touched: false,
          //     isFormValid: false,
          //   },
          // });
          setLoading(false);
          return;
        }

        if (
          resAddress?.data?.checkoutShippingAddressUpdate?.errors &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.code ===
            "NOT_FOUND" &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.field ===
            "checkoutId" &&
          typeof window !== "undefined"
        ) {
          window.localStorage.clear();
          window.location.reload();
        }

        if (
          resAddress?.data?.checkoutShippingAddressUpdate?.errors &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.message
        ) {
          setCheckoutError(
            resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.message
          );
          // dispatch({
          //   type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
          //   data: {
          //     ...initialState,
          //     phone: {
          //       value: user?.phone || "",
          //       touched: true,
          //       hasError: !user?.phone,
          //       error: "",
          //     },
          //   },
          // });
          setCheckoutError("Error is updating address, please try again");
          setLoading(false);
          return;
        }
        if (
          resAddress?.data?.checkoutEmailUpdate?.errors &&
          resAddress?.data?.checkoutEmailUpdate?.errors[0]?.code
        ) {
          setCheckoutError(
            resAddress?.data?.checkoutEmailUpdate?.errors[0]?.message
          );
          // dispatch({
          //   type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          //   data: {
          //     name: "email",
          //     value: "",
          //     hasError: true,
          //     error:
          //       resAddress?.resShipping?.data?.checkoutEmailUpdate?.errors[0]
          //         ?.message,
          //     touched: false,
          //     isFormValid: false,
          //   },
          // });
          setLoading(false);
          return;
        }

        // if (
        //   !checkout?.shippingMethod &&
        //   resAddress?.resShipping.data.checkoutShippingAddressUpdate.checkout
        //     .availableShippingMethods
        // ) {
        //   const setShippingMethodRes = await setShippingMethod(
        //     resAddress?.resShipping.data.checkoutShippingAddressUpdate.checkout
        //       .availableShippingMethods[0]?.id
        //   );
        //   if (
        //     setShippingMethodRes?.errors &&
        //     setShippingMethodRes?.errors[0]?.message
        //   ) {
        //     setCheckoutError(setShippingMethodRes?.errors[0]?.message);
        //     setLoading(false);
        //     return;
        //   }
        // }
        if(typeof window !== 'undefined'){
          (window.dataLayer || []).push({ ecommerce: null });
          window.dataLayer.push({
            event: "checkoutFormComplete",
            UserID: user?.id,
            user_type: user ? "logged_in" : "logged_out",
            ecommerce: {
              checkout_option: {
                actionField: { step: 2, option: "Checkout Form Completed" },
  
                products: items?.map(item => ({
                  name: item?.variant?.product?.name,
                  id: item?.variant?.product?.id
                    ? getDBIdFromGraphqlId(item?.variant?.product?.id, "Product")
                    : null,
                  price: item?.variant?.pricing?.price?.gross?.amount,
                  brand: "Plixlife",
                  category: item?.variant?.product?.category?.name,
                  quantity: item?.quantity,
                  variant: item?.variant?.name,
                })),
              },
            },
          });
        }

        setLoading(false);
      },
      500
    )
  ).current;

  useEffect(()=> {
    if(formState[IIAddressFieldNames.STREET_ADDRESS_1].value && !validateInput(
      IIAddressFieldNames.STREET_ADDRESS_1,
      formState[IIAddressFieldNames.STREET_ADDRESS_1].value,
      dispatch,
      formState,
      useCheckoutRes
    )?.hasError && user?.addresses?.length === 0) {
      debouncedAddShippingInfoDataLayer();
    }
  },[formState[IIAddressFieldNames.STREET_ADDRESS_1].value,user])

  const updateCheckoutAmountsBeforeResponse = () => {
    if (
      paymentMethodChangeLoading === true &&
      !checkoutLoading &&
      codChargeProduct?.enabled &&
      codChargeProduct?.price
    ) {
      try {
        const isCodChargeProductInCart =
          codChargeProduct?.variantId &&
          items.find(item => item.variant.id === codChargeProduct?.variantId);

        let updatedSubtotal = paymentSummary?.subtotalPrice?.gross?.amount;
        let updatedMrp = paymentSummary?.mrp?.gross?.amount;
        let updatedNetPrice = paymentSummary?.netPrice?.gross?.amount;
        let updatedTotal = paymentSummary?.totalPrice?.gross?.amount;
        if (
          availablePaymentGateways[0]?.id === PaymentMethods.COD &&
          !isCodChargeProductInCart
        ) {
          updatedSubtotal += codChargeProduct.price;
          updatedMrp += codChargeProduct.price;
          updatedTotal += codChargeProduct.price;
          updatedNetPrice += codChargeProduct.price;
        } else if (
          availablePaymentGateways[0]?.id !== PaymentMethods.COD &&
          isCodChargeProductInCart
        ) {
          updatedSubtotal -= codChargeProduct.price;
          updatedMrp -= codChargeProduct.price;
          updatedTotal -= codChargeProduct.price;
          updatedNetPrice -= codChargeProduct.price;
        }
        const updatedPaymentSummary = {
          ...paymentSummary,
          totalPrice: {
            gross: {
              ...paymentSummary.totalPrice?.gross,
              amount: updatedTotal,
            },
            net: { ...paymentSummary.totalPrice?.net, amount: updatedTotal },
          },
          mrp: {
            gross: { ...paymentSummary.mrp?.gross, amount: updatedMrp },
            net: { ...paymentSummary.mrp?.net, amount: updatedMrp },
          },
          subtotalPrice: {
            gross: {
              ...paymentSummary.subtotalPrice?.gross,
              amount: updatedSubtotal,
            },
            net: {
              ...paymentSummary.subtotalPrice?.net,
              amount: updatedSubtotal,
            },
          },
          netPrice: {
            gross: {
              ...paymentSummary.netPrice?.gross,
              amount: updatedNetPrice,
            },
            net: { ...paymentSummary.netPrice?.net, amount: updatedNetPrice },
          },
        };
        return updatedPaymentSummary;
      } catch (err) {
        console.log("Error in payment summary update", err);
        return paymentSummary;
      }
    }
    return paymentSummary;
  };

  // const putPhoneVerifiedOnCheckoutMeta = async (checkout: CheckoutFragment) => {
  //   const verifiedCheckout =
  //     checkout?.id &&
  //     getMetadataValue(checkout?.metadata, "phone_verified") &&
  //     parseJson(getMetadataValue(checkout?.metadata, "phone_verified"));
  //   if (checkout?.id && !verifiedCheckout) {
  //     try {
  //       const response = await client.query({
  //         query: updateMetadataMutation,
  //         variables: {
  //           id: checkout?.id,
  //           input: [
  //             {
  //               key: "phone_verified",
  //               value: "true",
  //             },
  //           ],
  //         },
  //         fetchPolicy: "no-cache",
  //       });
  //     } catch (error) {
  //       console.log(
  //         "Failed to update checkout meta with phone verified",
  //         error
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    const initialShippingAndPaymenMethod = async () => {
      // if (
      //   availableShippingMethods &&
      //   availableShippingMethods.length &&
      //   availableShippingMethods[0]?.id
      // ) {
      //   setShippingMethod(availableShippingMethods[0]?.id);
      // }
      if (
        availablePaymentGateways &&
        availablePaymentGateways.length &&
        availablePaymentGateways[0]?.id
      ) {
        let checkoutRes;
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway:
              availablePaymentGateways[0]?.id === PaymentMethods.RAZORPAY
                ? PaymentMethods.JUSPAY
                : availablePaymentGateways[0]?.id,
            useCashback,
          },
          false
        );
        checkoutRes = res;
        if (
          res?.data?.checkoutPaymentMethodUpdate?.checkout
            ?.availablePaymentGateways[0]?.id
        ) {
          setradioState(
            res?.data?.checkoutPaymentMethodUpdate?.checkout
              ?.availablePaymentGateways[0]?.id
          );
        }
        if (
          !res?.data?.checkoutPaymentMethodUpdate?.checkout?.id &&
          res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.code ===
            "COD_NOT_APPLICABLE_FOR_PRODUCT_IN_CART"
        ) {
          const paymentMethodRes = await checkoutPaymentMethodUpdate(
            {
              gateway: PaymentMethods.RAZORPAY,
              useCashback,
            },
            false
          );
          if (
            paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
              ?.availablePaymentGateways &&
            paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
              ?.availablePaymentGateways.length
          ) {
            setradioState(
              paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout
                ?.availablePaymentGateways[0]?.id
            );
          }

          checkoutRes = paymentMethodRes;
          paymentMethodRes?.data?.checkoutPaymentMethodUpdate?.checkout?.lines;
        }
        // await handleCheckoutRecalculation();
        getCheckoutTotalAmounts(
          checkoutRes?.data?.checkoutPaymentMethodUpdate?.checkout
            ?.availablePaymentGateways[0]?.id,
          isItemInCart(
            checkoutRes?.data?.checkoutPaymentMethodUpdate?.checkout?.lines,
            codChargeProduct?.variantId
          )
        );
      }
    };
    initialShippingAndPaymenMethod();
    autoFillForm();
    loadScript("https://api.juspay.in/pay-v3.js");

    // if (ENABLE_GA4) {
    //   if (
    //     typeof window !== "undefined" &&
    //     window.dataLayer &&
    //     gtmConfig.beginCheckout.enable
    //   ) {
    //     window.dataLayer.push({ ecommerce: null });
    //     (window.dataLayer = window.dataLayer || []).push({
    //       event: gtmConfig.beginCheckout.value,
    //       user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
    //       user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
    //       membership_status: isMember(user)
    //         ? "plix_club_member"
    //         : "not_a_plix_club_member",
    //       ecommerce: {
    //         currency: "INR",
    //         coupon: checkout?.voucherCode || "NA",
    //         value: paymentSummary?.totalPrice?.gross?.amount,
    //         items: items?.map(item => {
    //           const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
    //           const productVariantName = getVariantAttributes("Flavors", item?.variant)
    //           const {discountAmount} = getPrices(item?.variant?.product, false, item?.variant);
    //           const categories = getItemCategoriesFromAttribute(item?.variant);
    //           const isMonthIncluded = categories?.sizeCategory2?.toLowerCase()?.includes("month");
    //           return {
    //             item_id: item.variant?.product?.id ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product") : null,
    //             item_name: item?.variant?.product?.name,
    //             item_brand: "plixlife",
    //             currency: "INR",
    //             discount:discountAmount,
    //             coupon: checkout?.voucherCode || "NA",
    //             quantity: item?.quantity,
    //             item_category: item?.variant?.product?.category?.name,
    //             item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
    //             item_category3: categories?.sizeCategory1 || "NA",
    //             item_category4: isMonthIncluded ? "NA" : (categories?.sizeCategory2 || "NA"),
    //             price: item?.variant?.pricing?.price?.gross?.amount,
    //             item_variant: productVariantName,
    //             item_list_name: itemJourneyInfo?.addedFrom || "NA",
    //             item_list_id: itemJourneyInfo?.productListId || "NA",
    //             index: "NA"
    //           };
    //         })
    //       },
    //     });
    //   }
    // }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
        document.body.style.position = "unset";
      }
      handleCheckoutRecalculation(!isRecalculate);
    };
  }, []);

  useEffect(() => {
    let hasError = false;
    let error = "";
    // const { getCityStateFromPincode } = useCheckoutRes;
    if (!formState[IIAddressFieldNames.POSTAL_CODE].hasError) {
      setPincodeFetched(false);
      const setCityAndState = (pin: string) => {
        client
          .query({
            query: GET_POSTAL_PIN,
            variables: {
              pin: pin,
            },
            fetchPolicy: "no-cache",
          })
          .then(res => {
            if (
              (res?.errors && res.errors[0]?.message) ||
              !res?.data?.pincode?.city ||
              !res?.data?.pincode?.state
            ) {
              hasError = true;
              error = "Invalid Pincode";
              dispatch({
                type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
                data: {
                  name: IIAddressFieldNames.POSTAL_CODE,
                  value: formState[IIAddressFieldNames.POSTAL_CODE].value,
                  hasError,
                  error,
                  touched: true,
                  isFormValid: false,
                },
              });
              return;
            }
            const apiCity = res?.data?.pincode?.city;
            let apiState = res?.data?.pincode?.state;
            const cityTier = res?.data?.pincode?.cityType;
            if (apiState === "Chattisgarh") {
              apiState = "Chhattisgarh";
            } else if (apiState === "Orissa") {
              apiState = "Odisha";
            } else if (apiState === "Pondicherry") {
              apiState = "Puducherry";
            }
            // let isFormValid = callAfterUserData;
            const cityAndStateData = {
              // ...formState,
              city: {
                value: apiCity,
                touched: true,
                hasError: false,
                error: "",
              },
              countryArea: {
                value: apiState,
                touched: false,
                hasError: false,
                error: "",
              },
            };
            if (typeof clevertap?.profile?.push === "function") {
              clevertap.profile.push({
                Site: {
                  city: apiCity,
                  cityTier: cityTier,
                },
              });
            }

            for (const name in cityAndStateData) {
              const item = cityAndStateData[name];
              const { value } = item;
              const { hasError, error } = validateInput(
                name as IIAddressFieldNames,
                value,
                dispatch,
                cityAndStateData,
                useCheckoutRes
              );

              // if (hasError) {
              //   isFormValid = false;
              // }
              if (name) {
                dispatch({
                  type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
                  data: {
                    name,
                    value,
                    hasError,
                    error,
                    touched: true,
                    isFormValid: false,
                  },
                });
              }
            }
            setCallAfterUserData(true);
            setTimeout(() => {
              setPincodeFetched(true);
            }, 500);
          })
          .catch(err => {
            hasError = true;
            error = "Invalid Pincode";
            dispatch({
              type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
              data: {
                name: IIAddressFieldNames.POSTAL_CODE,
                value: formState[IIAddressFieldNames.POSTAL_CODE].value,
                hasError,
                error,
                touched: true,
                isFormValid: false,
              },
            });
          });
      };
      setCityAndState(formState[IIAddressFieldNames.POSTAL_CODE].value);
    }
  }, [formState[IIAddressFieldNames.POSTAL_CODE].value]);

  useEffect(() => {
    if (formState[IIAddressFieldNames.POSTAL_CODE].value && pincodeFetched) {
      let isFormValid = callAfterUserData;
      for (const name in formState) {
        const item = formState[name];
        const { value } = item;
        const { hasError, error } = validateInput(
          name as IIAddressFieldNames,
          value,
          dispatch,
          formState,
          useCheckoutRes
        );
        if (hasError) {
          isFormValid = false;
        }
        if (name === "isFormValid" || (name && formState[name]?.touched)) {
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name,
              value,
              hasError,
              error,
              touched: true,
              isFormValid,
            },
          });
        }
      }
    }
  }, [formState[IIAddressFieldNames.COUNTRY_AREA].value, pincodeFetched]);

  useEffect(() => {
    if (authenticated) {
      getWalletAmount();

      if(isMember(user) && membershipdata?.variantID){
        const includeMemberProduct = items.findIndex((item)=> item?.variant?.id === membershipdata?.variantID)
        if(includeMemberProduct !== -1){
          setLoading(true)
          removeItemRest(membershipdata?.variantID, true, isRecalculate).finally(() =>
          setLoading(false)
          ); 
        }
      }
    }
  }, [authenticated]);

  useEffect(() => {
    if (showJuspaySubmitError) {
      if (
        paymentMode === "card" &&
        showJuspaySubmitError === "Gateway account not found" &&
        paymentCardInfo?.card_brand
      ) {
        setCheckoutError("This card is not supported. Use an Alternate card.");
        // setCheckoutError(
        //   `Card Not Supported - ${
        //     paymentCardInfo?.card_sub_type || paymentCardInfo?.card_brand
        //   }`
        // );
      } else {
        setCheckoutError(showJuspaySubmitError);
      }
      setShowJuspaySubmitError("");
    }
  }, [showJuspaySubmitError]);

  let juspayForm;
  useEffect(() => {
    try {
      if (typeof Juspay !== "undefined" && paymentStep === 2) {
        juspayForm = Juspay.Setup({
          payment_form: "#payment_form",
          success_handler(status) {
            setLoading(false);
          },
          error_handler(
            error_code,
            error_message,
            bank_error_code,
            bank_error_message,
            gateway_id
          ) {
            if (error_code && error_message) {
              // setCheckoutError(error_message);
              setShowJuspaySubmitError(error_message);
            }
            setLoading(false);
          },
          card_encoding_key: JUSPAY_CARD_ENCODING_KEY,
          card_encoding_version: JUSPAY_CARD_ENCODING_VERSION,
          card_bin_digit_count: 6,

          /* Fingerprint will work only if customer_id and client_auth_token are present in set-up as shown below */
          // customer: {
          //   customer_id: "XXX",
          //   client_auth_token: "tkn_SSS",
          // },
          iframe_elements: getJuspayIframeElements(paymentMode),

          /* Set `auto_tab_enabled` flag to true if you want to enable auto-switching between fields when the user types the valid data (recommended but optional).
           * It will have the following order:`card_exp_month` -> `card_exp_year` ->`security_code`. */
          auto_tab_enabled: true,

          /* Set `auto_tab_from_card_number` to either `card_exp_month` or `name_on_card` based on which field is rendered after card_number (recommended but optional).
           * Note 1: Please set `auto_tab_enabled` to `true` as shown above to enable this functionality. */
          auto_tab_from_card_number: "card_exp_month",

          /* Set `tokenize_support` flag to true if you want to check tokenize support response of a particular card bin. */
          tokenize_support: true,

          styles: JUSPAY_STYLE_OBJECT,

          /* This function will be called with an event object as a parameter in two cases:
              * 1. When some event occurs on the input field inside the iframe element.
              * 2. The user clicks on the submit button and the values in some of the input fields are invalid. (In the second case, we will send the event object with the state of the first invalid field in the checkout form.)
              
              * This event object will contain the state of the input field. You should use this event object to show validation messages in your checkout form. */

          iframe_element_callback(event) {
            if (event?.target_element === "card_number") {
              setPaymentCardInfo(event);
            }
            /* The event information will be available in the event object */
          },
        });
        setJuspayFormElement(juspayForm);
      }
    } catch (err) {
      console.log("error in juspay setup", err);
    }
  }, [paymentMode, paymentStep]);


  const WhatsappCheckbox: React.FC<{
    formData: Array<IAddressField>[];
    mutation: MutationFn<
      updateCheckoutMetadatWhatsapp,
      updateCheckoutMetadatWhatsappVariables
    >;
  }> = React.memo(({ formData, mutation }) => {
    const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = useState(false);

    const handleCheckboxWhatsapp = async () => {
      setUpdatesOnWhatsapp(prev => {
        const input = {
          key: "sendInvoiceToWhatsApp",
          value: !prev ? "true" : "false",
        };
        mutation({
          variables: {
            id: checkout?.id,
            input: [input],
          },
        });

        return !prev;
      });
    };

    return (
      <div className={styles.checkboxContainer}>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map(row => {
                return (
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={handleCheckboxWhatsapp}
                  >
                    <Input
                      key={row.name}
                      label={
                        <div className={styles.whatsappCheckboxLabel}>
                          {row.meta.labelSVG && <MemoWhatsapp />}
                          <div> {row.label} </div>
                        </div>
                      }
                      checked={updatesOnWhatsapp}
                      variant={1}
                      customStyles={styles}
                      customStylesName="whatsappInputContainer"
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      placeholder={row.placeholder}
                      value={row?.value || formState[row.name].value}
                      autoComplete={row.autoComplete}
                      inputMode={row.inputMode}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  });

  const NotificationCheckbox: React.FC<{
    formData: any;
  }> = ({ formData }) => {
    const handleUserNotificationChange = async () => {
      setUserNotification(prev_value => !prev_value);
    };
    return (
      <div className={styles.userNotificationCheckboxContainer}>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map(row => {
                return (
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={handleUserNotificationChange}
                  >
                    <Input
                      key={row.name}
                      label={
                        <div className={styles.userNotificationCheckboxLabel}>
                          {/* {row.meta.labelSVG && <MemoWhatsapp />} */}
                          <div> {row.label} </div>
                        </div>
                      }
                      checked={userNotification}
                      variant={1}
                      customStyles={styles}
                      customStylesName={
                        userNotification
                          ? "userNotificationInputContainer-checked"
                          : "userNotificationInputContainer"
                      }
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      placeholder={row.placeholder}
                      value={row?.value || formState[row.name].value}
                      autoComplete={row.autoComplete}
                      inputMode={row.inputMode}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  const badgeSectionData =
    getMetadataValue(ShopMetaContextValue, "checkout_testimonial_section") &&
    parseJson(
      getMetadataValue(ShopMetaContextValue, "checkout_testimonial_section")
    );

  const CheckoutTopBadgeSection = useCallback(() => {
    if (badgeSectionData?.enabled) {
      return (
        <div className={styles.badgeSectionWrapper}>
          <div className={styles.testimonyStrip}>
            <div>
              <span>{badgeSectionData?.testimonyData?.statement}</span>
              {badgeSectionData?.testimonyData?.name && (
                <span className={styles.testimonyName}>
                  -{badgeSectionData?.testimonyData?.name}
                </span>
              )}

              {badgeSectionData?.testimonyData?.rating && (
                <>
                  <span className={styles.testimonyRating}>
                    <span>{badgeSectionData?.testimonyData?.rating}</span>
                    <MemoShinnyStar />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    return <></>;
  }, [badgeSectionData]);

  const addressFileds2Copy = [...addressFileds2];
  addressFileds2Copy.shift();

  const clevertapPaymentFailure = () => {
    if (clevertapEvents.paymentFailure.enable) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const todayDate = `${mm} + / + ${dd} + / + ${yyyy}`;
      clevertap.event.push(clevertapEvents.paymentFailure.value, {
        platform: window.screen.width < 520 ? "msite" : "website",
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email || checkout?.email,
        customerPhone:
          user?.phone ||
          user?.defaultShippingAddress?.phone ||
          checkout?.shippingAddress.phone,
        quantity: totalQuantity,
        cartAmount: totalPrice?.gross?.amount,
        price: totalPrice?.gross?.amount,
        couponName: promoCodeDiscount?.discountName,
        orderAddressPin:
          checkout?.shippingAddress?.postalCode ||
          checkout?.billingAddress?.postalCode,
        orderAddressCity:
          checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
        couponAmount: couponDiscount.gross.amount,
        paymentAmount: totalPrice?.gross?.amount,
        paymentMode:
          radioState === "mirumee.payments.razorpay" ? "Online" : "COD",
        purchaseDate: todayDate,
      });
    }
  };

  const paymentFailureDatalayer = () => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.paymentFailure.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.paymentFailure.value,
        eventCategory: gtmConfig.paymentFailure.value,
        eventAction: "payment_try_again_click",
        product_id: items
          ?.map(item => {
            if (item.id) {
              return getDBIdFromGraphqlId(item.variant?.id, "ProductVariant");
            }
            return "";
          })
          .join("|"),
        user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out", //  logged_in,logged_out
        product_price: totalPrice?.gross?.amount,
      });
    }
  };

  const razorpayPopupDatalayer = () => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.razorpayPopup.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.razorpayPopup.value,
        platform: window.screen.width < 520 ? "msite" : "website",
        timeStamp: Date.now(),
        customerEmail: user?.email || checkout?.email,
        customerPhone:
          user?.phone ||
          user?.defaultShippingAddress?.phone ||
          checkout?.shippingAddress.phone,
        quantity: totalQuantity,
        cartAmount: totalPrice?.gross?.amount,
        price: totalPrice?.gross?.amount,
        couponName: promoCodeDiscount?.discountName,
        orderAddressPin:
          checkout?.shippingAddress?.postalCode ||
          checkout?.billingAddress?.postalCode,
        orderAddressCity:
          checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
        couponAmount: couponDiscount.gross.amount,
        paymentAmount: totalPrice?.gross?.amount,
        paymentMode:
          radioState === "mirumee.payments.razorpay" ? "Online" : "COD",
      });
    }
  };

  const debouncedUpdateCheckoutWithPhoneNumber = React.useRef(
    debounce(async (user: UserFragment) => {
      const userAddress =
        user?.defaultBillingAddress ||
        user?.defaultShippingAddress ||
        (user?.addresses?.length && user?.addresses[0]);
      const dummyFormState = {
        city: userAddress?.city || "delhi",
        countryArea: userAddress?.countryArea || "Delhi",
        firstName: userAddress?.firstName || "there",
        lastName: userAddress?.lastName || "Plixfam",
        phone: user?.phone,
        postalCode: userAddress?.postalCode || "110006",
        streetAddress1: userAddress?.streetAddress1 || "abandoned",
        streetAddress2: userAddress?.streetAddress2 || "",
      };
      try {
        if (
          typeof window !== "undefined" &&
          window.dataLayer &&
          gtmConfig.phoneOnCheckout.enable
        ) {
          window.dataLayer.push({
            event: gtmConfig.phoneOnCheckout.value,
            phoneNo: user?.phone,
            firstName: userAddress?.firstName,
            lastName: userAddress?.lastName,
            email: validUserMail,
          });
        }
        const altUserMail =
          getMetadataValue(user?.metadata, "alt_email") &&
          parseJson(getMetadataValue(user?.metadata, "alt_email"));
        const correctedEmail = altUserMail || user?.email;
        const resAddress = await setShippingAndBillingAddress(
          { ...dummyFormState, country: { code: "IN" } },
          correctedEmail,
          !checkout?.shippingMethod,
          true,
          true
        );

        // await handleCheckoutRecalculation();
      } catch (error) {
        console.log(error);
      }
    }, 200)
  ).current;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [formExpanded, setFormExpanded] = useState<boolean>(true);
  const formWrapperRef = useRef(null);
  const {
    createAccountAddress,
    updateAccountAddress,
    updateUserMeta,
  } = useUser();

  // Saved Address Logic Moved Here
  const [addressOnEditMode, setAddressOnEditMode] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  useEffect(() => {
    if (
      (modalOpen || currentCheckoutStep === 1 || currentCheckoutStep === 2) &&
      typeof window !== "undefined" &&
      window.innerWidth < 992
    ) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    } else if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
    }
  }, [modalOpen, currentCheckoutStep]);

  const onAddressEditClick = (address_id: string, validateMail: boolean) => {
    const selectedAddressValue = user?.addresses?.find(
      ad => ad.id === address_id
    );
    const selectedAddressInFormState =
      user?.addresses.length &&
      Object.values(IIAddressFieldNames).reduce((total, curr) => {
        const newObject = {};

        if (curr === "email") {
          newObject[curr] = {
            value:
              validUserMail ||
              (checkout?.email?.includes("@example.com") ||
              DISALLOWED_KEYWORDS.includes(checkout?.email)
                ? ""
                : checkout?.email) ||
              "",
            touched: false,
            hasError: true,
            error: "",
          };
        } else if (curr === IIAddressFieldNames.PHONE) {
          newObject[curr] = {
            value: user?.phone || "",
            touched: false,
            hasError: true,
            error: "",
          };
        } else {
          newObject[curr] = {
            value:
              (!DISALLOWED_KEYWORDS.includes(selectedAddressValue[curr]) &&
                selectedAddressValue[curr]) ||
              "",
            touched: false,
            hasError: true,
            error: "",
          };
        }

        return { ...total, ...newObject };
      }, {});

    selectedAddressInFormState.isFormValid;

    if (Object.keys(selectedAddressInFormState).length !== 0) {
      let isFormValid = true;

      for (const name in selectedAddressInFormState) {
        const item = selectedAddressInFormState[name];
        const { value } = item;
        const { hasError, error } = validateInput(
          name as IIAddressFieldNames,
          value,
          dispatch,
          selectedAddressInFormState,
          useCheckoutRes
        );
        if (hasError) {
          isFormValid = false;
        }
        if (name) {
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name,
              value,
              hasError,
              error,
              touched: true,
              isFormValid,
            },
          });
        }
      }
      // dispatch({
      //   type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
      //   data: selectedAddressInFormState,
      // });
    }
    setCurrentCheckoutStep(2);
  };

  const handleAddressChange = (add_id: string) => {
    if (selectedAddressId === add_id) return;
    setSelectedAddressId(add_id);
  };

  const handleNewFormToggle = userMail => {
    dispatch({
      type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
      data: {
        ...initialState,
        phone: {
          value: user?.phone || "",
          touched: true,
          hasError: !user?.phone,
          error: "",
        },
        email: {
          value: userMail || "",
          touched: true,
          hasError: !userMail,
          error: "",
        },
      },
    });
    // setShowNewForm(true);
    setCurrentCheckoutStep(2);
  };

  const checkAddressEquality = () => {
    if (checkout?.shippingAddress && user?.addresses?.length) {
      const currentlySetUserAddress = user.addresses.find(user_address => {
        const userAddress = Object.values(IIOnlyAddressFieldNames).reduce(
          (total, curr) => {
            return { ...total, [curr]: user_address[curr] || "" };
          },
          {}
        );
        const userAddressInString = JSON.stringify(userAddress)?.toLowerCase();
        const checkoutAddress = Object.values(IIOnlyAddressFieldNames).reduce(
          (total, curr) => {
            return { ...total, [curr]: checkout.shippingAddress[curr] || "" };
          },
          {}
        );
        const checkoutAddressInString = JSON.stringify(
          checkoutAddress
        )?.toLowerCase();
        return checkoutAddressInString === userAddressInString;
      });
      if (currentlySetUserAddress) {
        return currentlySetUserAddress?.id;
      }
    }
  };
  useEffect(() => {
    if (user && authenticated && user?.phone) {
      dispatch({
        type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
        data: {
          name: IIAddressFieldNames.PHONE,
          value: user?.phone,
          hasError: false,
          error: "",
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });

      dispatch({
        type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
        data: {
          name: IIAddressFieldNames.EMAIL,
          value: validUserMail || "",
          hasError: !validUserMail,
          error: "",
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });

      const defaultAddressId =
        user?.defaultBillingAddress?.id ||
        user?.defaultShippingAddress?.id ||
        (user?.addresses?.length && user?.addresses[0]?.id);

      if (user?.addresses?.length === 0) {
        // setShowNewForm(true);
        setCurrentCheckoutStep(2);
        return;
      }
      const alreadySetAddressId = checkAddressEquality();
      if (alreadySetAddressId) {
        setSelectedAddressId(alreadySetAddressId);
        setCurrentCheckoutStep(4);
        debouncedAddShippingInfoDataLayer();
      } else if (defaultAddressId) {
        setSelectedAddressId(defaultAddressId);
        setCurrentCheckoutStep(4);
        debouncedAddShippingInfoDataLayer();
      }
    } else if (!authenticated && !authenticating) {
      setCurrentCheckoutStep(1);
    }
  }, [authenticated]);

  // Update formstate with correct email and phone
  useEffect(() => {
    if (user?.phone && formState?.phone?.value !== user?.phone) {
      dispatch({
        type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
        data: {
          name: IIAddressFieldNames.PHONE,
          value: user?.phone,
          hasError: false,
          error: "",
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });
    }
    if (validUserMail && formState?.email?.value !== validUserMail) {
      dispatch({
        type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
        data: {
          name: IIAddressFieldNames.EMAIL,
          value: validUserMail || "",
          hasError: !validUserMail,
          error: "",
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });
    }
  }, [user, formState?.phone?.value, validUserMail, formState?.email?.value]);

  const updateCheckoutAddress = (user, selectedAddressId, userCheckout) => {
    const selectedAddressData = user?.addresses?.find(
      address => address.id === selectedAddressId
    );
    if (selectedAddressData) {
      const selectedAddressInFormState =
        user?.addresses.length &&
        Object.values(IIAddressFieldNames).reduce((total, curr) => {
          const newObject = {};

          if (curr === "email") {
            newObject[curr] = {
              value: validUserMail || "",
              touched: false,
              hasError: true,
              error: "",
            };
          } else if (curr === IIAddressFieldNames.PHONE) {
            newObject[curr] = {
              value: user?.phone || "",
              touched: false,
              hasError: true,
              error: "",
            };
          } else {
            newObject[curr] = {
              value:
                (!DISALLOWED_KEYWORDS.includes(selectedAddressData[curr]) &&
                  selectedAddressData[curr]) ||
                "",
              touched: false,
              hasError: true,
              error: "",
            };
          }

          return { ...total, ...newObject };
        }, {});

      const { email, ...formStateWithoutEmail } = selectedAddressInFormState;
      const formStateWithoutEmailWithValues = Object.keys(
        formStateWithoutEmail
      ).reduce((total, curr) => {
        const newObject = {};
        newObject[curr] = formStateWithoutEmail[curr].value;
        //

        return { ...total, ...newObject };
      }, {});
      const correctedEmail = validUserMail || formState?.email?.value;
      debouncedSetAddress(
        formStateWithoutEmailWithValues,
        correctedEmail,
        user,
        userCheckout
      );
    }
  };
  const addOrUpdateUserAddress = async (
    address_id?: string | null | undefined,
    putEmailInUserMeta?: boolean
  ) => {
    setLoading(true);
    let isFormValid = true;
    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const { hasError, error } = validateInput(
        name as IIAddressFieldNames,
        value,
        dispatch,
        formState,
        useCheckoutRes
      );
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }

    if (!isFormValid) {
      setCheckoutError("Please enter all the details correctly");
      setLoading(false);
      return;
    }
    if(typeof window !== 'undefined'){
      (window.dataLayer = window.dataLayer || []).push({
        event: "save_address_click",
        eventCategory: "save_address",
        eventAction: "save_address_click",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : "NA",
        user_type: user ? "logged_in" : "logged_out",
      });
    }

    const addressData = {
      ...formStateWithoutEmailWithValues,
      companyName: "",
      country: "IN",
    };

    // If address id is passed, update the address.
    if (address_id) {
      const resUpdateAccountAddress = await updateAccountAddress({
        id: address_id,
        input: addressData,
      });
      if (
        resUpdateAccountAddress?.errors?.length ||
        resUpdateAccountAddress?.data?.accountAddressUpdate?.accountErrors
          ?.length
      ) {
        setCheckoutError("Unable to save address.");
      }
      if (
        resUpdateAccountAddress?.data?.accountAddressUpdate?.user &&
        resUpdateAccountAddress?.data?.accountAddressUpdate?.address?.id &&
        resUpdateAccountAddress?.data?.accountAddressUpdate?.address?.id ===
          selectedAddressId
      ) {
        setAddressOnEditMode("");
        setCurrentCheckoutStep(3);
        updateCheckoutAddress(
          resUpdateAccountAddress.data.accountAddressUpdate.user,
          selectedAddressId,
          checkout
        );
      } else if (
        resUpdateAccountAddress?.data?.accountAddressUpdate?.address?.id
      ) {
        setAddressOnEditMode("");
        setCurrentCheckoutStep(3);
        setLoading(false);
      }

      return;
    }

    // If address id is not passed create a new user address.
    const res = await createAccountAddress({
      input: {
        ...addressData,
      },
    });
    if (user?.id && formState?.email?.value && putEmailInUserMeta) {
      updateUserMeta(user?.id, [
        {
          key: "alt_email",
          value: formState?.email?.value,
        },
      ]);
    }

    if (res?.data?.accountAddressCreate?.address?.id) {
      setSelectedAddressId(res?.data?.accountAddressCreate?.address?.id);
      setCurrentCheckoutStep(3);
      return;
    }
    if (
      res.data.accountAddressCreate.accountErrors &&
      res.data.accountAddressCreate.accountErrors.length
    ) {
      setLoading(false);
      setCheckoutError("Unable to save address");
      return;
    }
    setLoading(false);
  };

  const getCurrentlySelectedAddressValue = useCallback(() => {
    const selectedAddressContent =
      user &&
      authenticated &&
      selectedAddressId &&
      user?.addresses?.find(address => address.id === selectedAddressId);
    return selectedAddressContent;
  }, [user, selectedAddressId, authenticated]);

  useEffect(() => {
    if (selectedAddressId && user && checkout) {
      setAddressOnEditMode("");
      const val = checkAddressEquality();
      if (!(selectedAddressId === val) || !checkout?.shippingMethod) {
        updateCheckoutAddress(user, selectedAddressId, checkout);
      } else {
        setLoading(false);
      }
    }
  }, [selectedAddressId]);

  const currentlySelectedAddressData = getCurrentlySelectedAddressValue();

  const CheckoutSteplist = () => {
    return (
      <>
        <div className={styles.steplistWrapper}>
          {NEW_CHECKOUT_STEPS.map((checkoutStep, index) => {
            if (checkoutStep.isVisible) {
              let isActive = checkoutStep.stepNumber === currentCheckoutStep;
              if (
                [2, 3].includes(currentCheckoutStep) &&
                checkoutStep?.stepNumber === 1
              ) {
                isActive = true;
              }
              const isComplete =
                checkoutStep?.completeOn <= currentCheckoutStep;
              return (
                <>
                  <S2.CheckoutStep isActive={isActive} isComplete={isComplete}>
                    <button
                    // onClick={() => {
                    //   if (checkoutStep.stepNumber < currentCheckoutStep) {
                    //     setCurrentCheckoutStep(checkoutStep?.stepNumber);
                    //   }
                    // }}
                    >
                      {isComplete ? (
                        <>
                          <MemoWhiteTick />
                        </>
                      ) : checkoutStep.stepNumber === 4 ? (
                        "2"
                      ) : (
                        checkoutStep.stepNumber
                      )}
                    </button>
                    <span>{checkoutStep.name}</span>
                  </S2.CheckoutStep>
                  {index < NEW_CHECKOUT_STEPS.length - 1 && (
                    <div className={styles.stepline} />
                  )}
                </>
              );
            }
            return <></>;
          })}
        </div>
      </>
    );
  };
  const locallyUpdatedPaymentSummary = updateCheckoutAmountsBeforeResponse();
  return (
    <div
      onClick={event => {
        // Close the form if clicked outside of the form and the form is filled and valid.
        if (
          formWrapperRef?.current &&
          !formWrapperRef?.current?.contains(event?.target) &&
          formExpanded &&
          isFormValid
        ) {
          setFormExpanded(false);
        }
      }}
    >
      <Link legacyBehavior href="/order-placed">
        <a
          style={{
            color: "transparent",
            cursor: "auto",
            display: "block",
            width: "0px",
            height: "0px",
          }}
        >
          .
        </a>
      </Link>
      <CheckoutTopBadgeSection />
      {checkoutError ? (
        <div className={styles.checkoutErrorWrapper}>
          <Alert onClose={() => setCheckoutError("")} severity="error">
            {checkoutError}
          </Alert>
        </div>
      ) : (
        <></>
      )}
      <CheckoutSteplist />

      <div className={styles.container}>
        {(loading || checkoutLoading || placeOrderClicked) &&
          currentCheckoutStep !== 1 &&
          !(
            currentCheckoutStep === 4 &&
            paymentStep === 2 &&
            paymentMode === "UPI"
          ) && (
            <div className={styles.loader}>
              <CircularProgress color="inherit" />
            </div>
          )}
        <div
          className={`${styles.mainWrapper} ${
            paymentStep === 2 ? styles.onlyLargeScreen : ""
          }`}
        >
          <DiscountAndOffersDropDown
            refetch={() => {
              return null;
            }}
            subHeadingText={
              isBoxInCart
                ? "*Coupon codes are not applicable with build-your-own-box products*"
                : ""
            }
            disableCouponApply={items?.some(item => isBoxProduct(item))}
            couponDiscount={paymentSummary?.couponDiscount?.gross?.amount}
            onCouponApplyOrRemove={async res => {
              // await handleCheckoutRecalculation();
              await getCheckoutTotalAmounts(
                res?.availablePaymentGateways[0]?.id,
                isItemInCart(res?.lines, codChargeProduct?.variantId)
              );
            }}
          />
          {cartOfferPolicies && Array.isArray(cartOfferPolicies) ? (
            <div className={styles.offerPolicyWrapper}>
              {cartOfferPolicies.map((policy, index) => (
                <li key={policy + index}>{policy}</li>
              ))}
            </div>
          ) : (
            <></>
          )}

          <S.OrderSummary
            className={styles.mobileOrderSummary}
            loading={loading || checkoutLoading || placeOrderClicked}
            fullOpacity
          >
            <OrderSummary
              formRef={formRef}
              loading={loading || checkoutLoading || placeOrderClicked}
              paymentSummaryValue={locallyUpdatedPaymentSummary}
            />
          </S.OrderSummary>
          {/* <CheckoutLoginSection dispatch={dispatch} /> */}
          {currentCheckoutStep === 4 && currentlySelectedAddressData && (
            <S2.SavedAddressContainer
              className={styles.paymentStepAddressBox}
              disabled={checkoutLoading || loading || placeOrderClicked}
            >
              <div className={styles.addressDisplayBar}>
                <div>
                  <div>
                    <MemoLocationMarker />
                    Delivery to {currentlySelectedAddressData?.postalCode}
                  </div>
                </div>

                <div>
                  <>
                    <span className={styles.addresslineOnMobile}>
                      {truncateString(
                        currentlySelectedAddressData?.streetAddress1,
                        30
                      )}
                    </span>
                    <span className={styles.addresslineOnDesktop}>
                      {truncateString(
                        currentlySelectedAddressData?.streetAddress1,
                        60
                      )}
                    </span>
                  </>
                  <span
                    onClick={() => {
                      // openAddressForm();
                      setCurrentCheckoutStep(3);
                      setModalOpen(true);
                    }}
                    className={styles.changeButton}
                  >
                    CHANGE
                  </span>
                </div>
              </div>
            </S2.SavedAddressContainer>
          )}
          {currentCheckoutStep > 1 &&
          user &&
          authenticated &&
          typeof userWalletBalance === "number" ? (
            <div className={styles.couponApplySection}>
              <div className={styles.cashback}>
                {authenticated && user && showCashback && !isBoxInCart ? (
                  <>
                    {typeof userWalletBalance === "number" ? (
                      <>
                        <div className={`${styles.walletCreditWrapper}`}>
                          <div className={`${styles.walletCredit} ${walletDisabled ? styles.wallet_disabled : ""}`}>
                            <div
                              onClick={async () => {
                                if (userWalletBalance) {
                                  setLoading(true);
                                  await handleCashbackClick();
                                  // await refetch();
                                  setLoading(false);
                                }
                              }}
                            >
                              <input type="checkbox" checked={useCashback} />
                              <span>Use Wallet Credit</span>
                            </div>
                            <div>
                              Avl Bal{" "}
                              <S.WalletBalance>
                                &#8377;{userWalletBalance}
                              </S.WalletBalance>
                            </div>
                          </div>
                          {walletDisabled ? <S.WalletDisabledText>{walletDisableProducts?.text || ""}</S.WalletDisabledText> : <></>}
                          {useCashback &&
                            cashbackDiscount &&
                            remainingWalletBalance !== NaN &&
                            remainingWalletBalance !== userWalletBalance && (
                              <S.RemainingWalletBalanceText>
                                Remaining Wallet Balance :{" "}
                                <S.WalletBalance>
                                  &#8377;
                                  {remainingWalletBalance}
                                </S.WalletBalance>
                              </S.RemainingWalletBalanceText>
                            )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.tcDestkop}>t&c | privacy</div>
        </div>
        <div className={styles.vDivider} />
        <div className={styles.desktopSummaryWrapper}>
          {currentCheckoutStep === 1 ? (
            <>
              <UserLogin
                onLogin={user => {
                  if (
                    !(
                      user?.addresses?.length ||
                      user?.defaultBillingAddress ||
                      user?.defaultShippingAddress
                    )
                  ) {
                    debouncedUpdateCheckoutWithPhoneNumber(user);
                  }
                  if (user?.addresses?.length) {
                    setCurrentCheckoutStep(3);
                  } else {
                    setCurrentCheckoutStep(2);
                  }
                }}
                onSignUp={user => {
                  if (
                    !(
                      user?.addresses?.length ||
                      user?.defaultBillingAddress ||
                      user?.defaultShippingAddress
                    )
                  ) {
                    debouncedUpdateCheckoutWithPhoneNumber(user);
                  }
                }}
                notifyBox={
                  <NotificationCheckbox formData={notificationCheckboxFields} />
                }
              />
            </>
          ) : (
            <>
              <div id="otpless" style={{ display: "none" }} />
            </>
          )}

          {currentCheckoutStep !== 1 && user && authenticated && (
            <>
              {/* <CheckoutSavedAddresses
                dispatch={dispatch}
                setAutofillFromUser={setAutofillFromUser}
                setFormExpanded={setFormExpanded}
              /> */}
              <>
                <UserAddresses
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                  addOrUpdateUserAddress={addOrUpdateUserAddress}
                  addressFileds2={addressFileds2}
                  // addressFileds2Copy={addressFileds2Copy}
                  addressOnEditMode={addressOnEditMode}
                  currentCheckoutStep={currentCheckoutStep}
                  dispatch={dispatch}
                  setPaymentStep={setPaymentStep}
                  formState={formState}
                  // formSubmitHandler={formSubmitHandler}
                  handleAddressChange={handleAddressChange}
                  handleNewFormToggle={handleNewFormToggle}
                  isLoading={checkoutLoading || loading}
                  onAddressEditClick={onAddressEditClick}
                  setAddressOnEditMode={setAddressOnEditMode}
                  setCurrentCheckoutStep={setCurrentCheckoutStep}
                  currentlySelectedAddressData={currentlySelectedAddressData}
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                  setCheckoutError={setCheckoutError}
                  setCheckoutLoading={setLoading}
                  totalPrice={paymentSummary?.totalPrice?.gross?.amount}
                  badgeSectionData={badgeSectionData}
                />
              </>

              {currentCheckoutStep === 4 && (
                <>
                  <S.FormContainer fullOpacity className={styles.formContainer}>
                    <div className={styles.form}>
                      {/* <WalletCheckbox formData={checkboxFields} /> */}
                      <PaymentOptions
                        createJuspayOrderAndPaymentParams={
                          createJuspayOrderAndPaymentParams
                        }
                        upiValue={upiValue}
                        upiValueError={upiValueError}
                        setUpiValue={setUpiValue}
                        setUpiValueError={setUpiValueError}
                        formData={juspayPaymentRadioOptions}
                        paymentMode={paymentMode}
                        handleRadioClick={handleRadioClick}
                        selectedWallet={selectedWallet}
                        setCheckoutError={setCheckoutError}
                        setSelectedWallet={setSelectedWallet}
                        setSelectedNB={setSelectedNB}
                        selectedNB={selectedNB}
                        paymentStep={paymentStep}
                        setPaymentStep={setPaymentStep}
                        juspayFormElement={juspayFormElement}
                        juspayOrderId={juspayOrderId}
                        checkoutTotals={checkoutTotals}
                        setCheckoutLoading={setLoading}
                        formSubmitHandler={formSubmitHandler}
                        setPlaceOrderClicked={setPlaceOrderClicked}
                        placeOrderClicked={placeOrderClicked}
                        paymentMethodChangeLoading={
                          paymentMethodChangeLoading === true
                        }
                        isLoading={checkoutLoading || loading}
                        cashbackStripData={newCashbackStripData}
                        radioState={radioState}
                        setPaymentMode={setPaymentMode}
                      />

                      {paymentStep > 1 &&
                        paymentMode !== "WALLET" &&
                        paymentMode !== "cod" && (
                          <>
                            <div
                              className={`${styles.paymentSummaryPlaceOrderButton} ${styles.onlyLargeScreen}`}
                            >
                              <Input
                                variant={2}
                                onClick={e => {
                                  e?.preventDefault();
                                  setPlaceOrderClicked(true);
                                }}
                                type="button"
                                value="Place Order"
                                customStyles={styles}
                                customStylesName={
                                  !(
                                    loading ||
                                    checkoutLoading ||
                                    placeOrderClicked
                                  )
                                    ? "placeOrderButton"
                                    : "placeOrderButton--disable"
                                }
                                form="checkoutAddressForm"
                                disabled={
                                  loading ||
                                  checkoutLoading ||
                                  placeOrderClicked
                                }
                              />
                            </div>

                            <div className={styles.stickyButtonContainer}>
                              <Input
                                variant={2}
                                onClick={e => {
                                  e?.preventDefault();
                                  setPlaceOrderClicked(true);
                                }}
                                type="button"
                                value="Place Order"
                                customStyles={styles}
                                customStylesName={
                                  !(
                                    loading ||
                                    checkoutLoading ||
                                    placeOrderClicked
                                  )
                                    ? "placeOrderButton"
                                    : "placeOrderButton--disable"
                                }
                                form="checkoutAddressForm"
                                disabled={
                                  loading ||
                                  checkoutLoading ||
                                  placeOrderClicked
                                }
                              />
                            </div>
                          </>
                        )}
                    </div>
                  </S.FormContainer>
                </>
              )}
              <div className={styles.badgeList}>
                {Array.isArray(badgeSectionData?.badges) && (
                  <>
                    {badgeSectionData?.badges?.map((badge, index) => {
                      return (
                        <div key={badge?.text + index} className={styles.badge}>
                          <CachedImage url={badge?.image} />
                          <span>{badge?.text}</span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
          {/* <S.OrderSummary
            className={styles.desktopOrderSummary}
            loading={loading}
          >
            {loading && (
              <div className={styles.loader}>
                <CircularProgress color="inherit" />
              </div>
            )}
            <OrderSummary formRef={formRef} />

            <div className={styles.paymentSummaryContainerWrapper}>
              <PaymentSummary
                paymentSummary={paymentSummary}
                toggle
                loading={loading}
              />
            </div>
          </S.OrderSummary> */}
          {/* <CheckoutReviewCard /> */}
        </div>
        <div className={styles.tcMobile}>t&c | privacy</div>
      </div>
      {/* <CheckoutBottomSection /> */}
    </div>
  );
};

CheckoutV4.displayName = "CheckoutV4";
export default React.memo(CheckoutV4);
