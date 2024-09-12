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
import { clientSSR, client } from "@temp/client";
import {
  CheckoutLineFragment,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import debounce from "lodash/debounce";
import { CreatePaymentInput } from "@saleor/sdk/dist/apollo/types/checkout";
import {
  ENABLE_GA4,
  IMAGE_CDN,
  IMAGE_CDN_PROVIDERS,
  META_DEFAULTS,
  showCashback,
} from "Themes/config";
import { theme } from "Themes/globalStyles/constants";
import { CircularProgress } from '@mui/material';
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoPaySVG from "@components/atoms/SvgIcons/PaySVG";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoDownArrow from "@components/atoms/SvgIcons/DownArrow";
import MemoUpArrow from "@components/atoms/SvgIcons/UpArrow";
import { getUrlWithParams, isComboProduct } from "@utils/misc";
import Image from "next/image";
import {
  getGclid,
  getThisVariantPrices,
  getUtmData,
  generateProductUrl,
} from "@temp/core/utils";
import {
  createTaxedPriceFromAmount,
  customEventTrigger,
  getItemCategoriesFromAttribute,
  getMetadataValue,
  getPhoneNoWithoutPrefix,
  getPrices,
  getVariantAttributes,
  isBoxProduct,
  isGiftBoxProduct,
  membershipDiscountData,
  isMember,
  parseJson,
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
import MemoGreenTickNewSvg from "@components/atoms/SvgIcons/GreenTickNewSvg";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { getDBIdFromGraphqlId } from "@utils/core";
import PlixLifeFcApplyCoupon from "@components/molecules/PlixLifeFcApplyCoupon";
import MemoSingleStarIcon from "@components/atoms/SvgIcons/SingleStarIcon";
// import MemoGreenPlusNewIcon from "@components/atoms/SvgIcons/GreenPlusNewIcon";
// import MemoGreenMinusNewIcon from "@components/atoms/SvgIcons/GreenMinusNewIcon";
import ApplyCouponCode from "../../../ApplyCouponCode";
import * as S from "../../../styles";
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
} from "../../../formUtils";
import styles from "./index.module.scss";
import MemoGreenPlusNewIcon from "@components/atoms/SvgIcons/GreenPlusNewIcon";
import MemoGreenMinusNewIcon from "@components/atoms/SvgIcons/GreenMinusNewIcon";
import { GET_POSTAL_PIN } from "@temp/pages/checkout/queries";
import { getItemJourneyInfo } from "@utils/misc";
import { beginCheckout } from "farzicom-ui/lib/Track/beginCheckout";
import {
  deleteMetadata,
  removeTags,
} from "@components/organisms/ProductSubscriptionPopup/queries";

// import "./checkout.module.scss";
// import MemoNewplixlogo from "@temp/themes/plixlifefc/components/ClientFooter/assets/NewPlixLogoSVG";
const CheckoutV3 = ({ headerAndFooterData, shopMeta }) => {
  const { checkout } = useCheckoutState();
  const router = useRouter();
  const {
    setCheckout,
    setShippingAndBillingAddress,
    checkoutRecalculation,
    setShippingAddressAndEmail,
    updateCheckoutMeta,
  } = useCheckout();
  const [initialLoading, setInitialLoading] = useState(
    !checkout?.lines?.length
  );

  useEffect(() => {
    scrollToTop("auto");
  }, []);

  const recalculation_toggle =
    getMetadataValue(
      shopMeta?.data.shopmeta.edges[0].node.metadata,
      "recalculation_toggle"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data.shopmeta.edges[0].node.metadata,
        "recalculation_toggle"
      )
    );

  useEffect(() => {
    if (checkout && checkout?.id && checkout?.lines?.length && initialLoading) {
      setInitialLoading(false);
    }
    if (checkout && checkout?.id && checkout?.lines?.length == 0) {
      setInitialLoading(false);
    }
    if (
      !(checkout && checkout?.id && checkout?.lines?.length) &&
      !window?.location?.search?.includes("token")
    ) {
      setInitialLoading(false);
    }
  }, [checkout?.id]);

//  This Abandoned checkout logic is for farzi checkout 
  // useEffect(() => {
  //   if (router?.query?.token) {
  //     if (checkout?.id && typeof window !== "undefined") {
  //       localStorage.clear();
  //       window.location.reload();
  //     }
  //     getCheckoutDetailsFromToken(router?.query?.token);
  //   }
  // }, [router?.query?.token]);
//  This Abandoned checkout logic is for farzi checkout 

  // const ShopMetaContextValue = useContext(ShopMetaContext);
  // const recalculation_toggle =
  // getMetadataValue(ShopMetaContextValue, "recalculation_toggle") &&
  // parseJson(getMetadataValue(ShopMetaContextValue, "recalculation_toggle"));

  const getCheckoutDetailsFromToken = async (token: any) => {
    try {
      setInitialLoading(true);
      const { data, errors } = await client.query({
        query: checkoutDetails,
        variables: {
          token: token,
        },
        fetchPolicy: "network-only",
      });

      if (data?.checkout) {
        setCheckout(data?.checkout, true);
        if (data?.checkout?.availableShippingMethods?.length === 0) {
          setShippingAndBillingAddress(
            {
              city: "delhi",
              country: {
                code: "IN",
              },
              countryArea: "Delhi",
              firstName: "dummy",
              lastName: "dummy",
              phone: "7894561230",
              postalCode: "110006",
              streetAddress1: "dummy",
              streetAddress2: "dummy",
            },
            "dummy@dummy.com",
            false,
            true,
            true
          );
          // if(recalculation_toggle){
          //   checkoutRecalculation();
          // }
        }
      } else {
        setInitialLoading(false);
      }
    } catch (err) {
      console.log("err>>", err);
    }
  };

  if (!(checkout && checkout?.id && checkout?.lines?.length)) {
    return (
      <ShopMetaContext.Provider
        value={shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <AppHeader headerData={headerAndFooterData} />
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
  return (
    <ShopMetaContext.Provider
      value={shopMeta?.data.shopmeta.edges[0].node.metadata}
    >
      <AppHeader headerData={headerAndFooterData} />
      <div key="checkout-form">
        <CheckoutForm />
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

const CheckoutLoginSection = ({ dispatch, setLoading }) => {
  const { user, authenticated } = useAuthState();
  const useCheckoutRes = useCheckout();
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const [selectedAddress, setSelectedAddress] = useState(0);

  const { show } = useContext(OverlayContext);
  const { items } = useCartState();

  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  const userAltEmail =
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));
  const validUserMail =
    typeof user?.email === "string" && user?.email.includes("@example.com")
      ? userAltEmail
      : user?.email;

  useEffect(() => {
    if (authenticated) {
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
              value:
                (user?.addresses[selectedAddress][curr] &&
                  getPhoneNoWithoutPrefix(
                    user?.addresses[selectedAddress][curr]
                  )) ||
                "",
              touched: false,
              hasError: true,
              error: "",
            };
          } else {
            newObject[curr] = {
              value:
                (!DISALLOWED_KEYWORDS.includes(
                  user?.addresses[selectedAddress][curr]
                ) &&
                  user?.addresses[selectedAddress][curr]) ||
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
    }
  }, [selectedAddress, authenticated]);

  if (authenticated) {
    const addressOptions = user.addresses.map((address, index) => {
      const formattedString = convertAddressString(address, "addressToString");
      return {
        name: formattedString,
        value: index.toString(),
        disabled: false,
      };
    });
    return (
      <div className={styles.addressContainer}>
        <div className={styles.checkoutLoginContainerTextWhenLoggedIn}>
          <div className={styles.userIconDiv}>
            <MemoBackButtonSVG />
          </div>
          <div>Contact Information</div>
        </div>

        {addressOptions && addressOptions.length ? (
          <>
            <div> Your Delivery Addresses </div>
            <div className={styles.addressDropdownContainer}>
              <Select
                variant={1}
                customStyles={styles}
                name="userAddresses"
                id="userAddresses"
                placeholder="userAddresses"
                value={selectedAddress}
                selectOptions={addressOptions || []}
                onChange={e => {
                  const { value } = e.target;

                  setSelectedAddress(parseInt(value));
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className={styles.checkoutLoginContainer}>
      <div className={styles.checkoutLoginContainerText}>
        <div className={styles.userIconDiv}>
          <MemoBackButtonSVG />
        </div>
        <div className={styles.contact_info}>Contact Information</div>
      </div>
      <div className={styles.checkoutLoginContainerRightSection}>
        <div className={styles.member}>Already a member?</div>
        <Input
          variant={2}
          type="button"
          value="Login Now"
          customStyles={styles}
          customStylesName="loginButton"
          onClick={() => {
            if (gtmConfig.loginClick.enable) {
              customEventTrigger(gtmConfig.loginClick.value, user, {
                cta_position: "top",
              });
            }
            show(OverlayType.mobileNumberInput, OverlayTheme.modal);
          }}
        />
      </div>
    </div>
  );
};

const ShowHR = ({ name, customClass = false }) => {
  switch (name) {
    case "show":
    case "Net Price":
    case "Sub Total":
      // case "Wallet Credit":
      return (
        <hr
          className={`${styles.hr} ${customClass ? styles.customClass : ""}`}
        />
      );

    default:
      return <> </>;
  }
};

export const PaymentSummary: React.FC<{
  paymentSummary: any;
  toggle?: boolean;
  defaultShowPaceOrderButton?: boolean;
  loading?: boolean;
  cashbackValue?: any;
  cashbackLoading?: boolean;
  otherDiscount?: any;
  isThankyoupage?: boolean;
}> = ({
  paymentSummary,
  toggle = false,
  defaultShowPaceOrderButton = false,
  loading = false,
  cashbackValue,
  cashbackLoading,
  otherDiscount,
  isThankyoupage,
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

  const Router = useRouter();
  const isThankyou = Router?.pathname == "/order-placed";
  const { checkout, recentOrder } = useCheckoutState();
  const metaData = isThankyou ? recentOrder?.metadata : checkout?.metadata;
  // Byb discount logic
  const ShopMetaContextValue = useContext(ShopMetaContext);
  // const personalisedBoxConfig =
  //   ShopMetaContextValue &&
  //   getMetadataValue(ShopMetaContextValue, "personalised_box_config") &&
  //   parseJson(
  //     getMetadataValue(ShopMetaContextValue, "personalised_box_config")
  //   );

  const discountFromCheckoutMeta =
    metaData &&
    getMetadataValue(metaData, "discount") &&
    typeof parseJson(getMetadataValue(metaData, "discount")) === "string"
      ? parseJson(getMetadataValue(metaData, "discount")?.replace(/'/g, '"'))
      : parseJson(getMetadataValue(metaData, "discount"));

  const membershipDiscountArray = membershipDiscountData(
    discountFromCheckoutMeta,
    "membership-new"
  );

  const membershipEnrollmentDiscountArray = membershipDiscountData(
    discountFromCheckoutMeta,
    "member enrollment"
  );

  const membershipDiscount =
    !!membershipDiscountArray.length &&
    !!membershipDiscountArray[0]?.discount_amount
      ? parseFloat(membershipDiscountArray[0]?.discount_amount).toFixed(2)
      : 0;

  const membershipEnrollmentDiscount =
    !!membershipEnrollmentDiscountArray.length &&
    !!membershipEnrollmentDiscountArray[0]?.discount_amount
      ? parseFloat(
          membershipEnrollmentDiscountArray[0]?.discount_amount
        ).toFixed(2)
      : 0;

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

  const isBoxItemInCart = isThankyou
    ? recentOrder?.lines?.filter(item => isBoxProduct(item)) || []
    : items.filter(item => isBoxProduct(item)) || [];

  const boxItems: any =
    (getMetadataValue(metaData, "byobItems") &&
      parseJson(getMetadataValue(metaData, "byobItems"))) ||
    [];

  let totalbyobMrpInItems: number = 0;
  let totalbyobItemAmount: number = 0;

  !!isBoxItemInCart.length &&
    isBoxItemInCart.forEach(item => {
      const findBox = boxItems.find(
        box => box?.boxItemSKU === item?.variant?.sku
      );
      if (findBox && findBox.items) {
        const boxItemstotalPrice = findBox.items.reduce(
          (total, item) => total + Number(item?.price),
          0
        );
        totalbyobMrpInItems += boxItemstotalPrice * (item?.quantity || 0);
      }
      const itemPrice = item?.variant?.pricing?.price?.gross?.amount || 0;
      totalbyobItemAmount += itemPrice * (item?.quantity || 0);
    });

  const summaryPrices = isThankyou
    ? {
        MRP: !!isBoxItemInCart.length
          ? createTaxedPriceFromAmount(
              Number(mrp?.gross?.amount) +
                totalbyobMrpInItems -
                totalbyobItemAmount
            )
          : mrp,
        "Item Discount": !!isBoxItemInCart.length
          ? createTaxedPriceFromAmount(
              Number(itemDiscount?.gross?.amount) +
                totalbyobMrpInItems -
                totalbyobItemAmount
            )
          : itemDiscount,
        // "Net Price": netPrice,
        "Sub Total": subtotalPrice,
        "Coupon Discount": couponDiscount,
        "Wallet Credit": cashbackDiscount,
        "Net Total": createTaxedPriceFromAmount(
          totalPrice?.gross?.amount +
            otherDiscount -
            Number(couponDiscount?.gross?.amount)
        ),
        "Other Discount": createTaxedPriceFromAmount(
          otherDiscount - Number(couponDiscount?.gross?.amount)
        ),
      }
    : {
        MRP: !!isBoxItemInCart.length
          ? createTaxedPriceFromAmount(
              Number(mrp?.gross?.amount) +
                totalbyobMrpInItems -
                totalbyobItemAmount
            )
          : mrp,
        "Item Discount": !!isBoxItemInCart.length
          ? createTaxedPriceFromAmount(
              Number(itemDiscount?.gross?.amount) +
                totalbyobMrpInItems -
                totalbyobItemAmount
            )
          : itemDiscount,
        // "Net Price": netPrice,
        "Sub Total": subtotalPrice,
        "Coupon Discount": couponDiscount,
        "Wallet Credit": cashbackDiscount,
        "Net Total":
          Number(membershipDiscount) || Number(membershipEnrollmentDiscount)
            ? !!membershipDiscountArray?.length
              ? createTaxedPriceFromAmount(
                  Number(totalPrice?.gross?.amount + Number(membershipDiscount))
                )
              : createTaxedPriceFromAmount(
                  Number(
                    totalPrice?.gross?.amount +
                      Number(membershipEnrollmentDiscount)
                  )
                )
            : totalPrice,
        "Membership Discount (10%)": !!membershipDiscountArray?.length
          ? createTaxedPriceFromAmount(membershipDiscount)
          : createTaxedPriceFromAmount(membershipEnrollmentDiscount),
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

  const discountKeys = isThankyou
    ? [
        "Item Discount",
        "Coupon Discount",
        "Wallet Credit",
        "Prepaid Discount",
        "Other Discount",
      ]
    : [
        "Item Discount",
        "Coupon Discount",
        "Wallet Credit",
        "Prepaid Discount",
        "Membership Discount (10%)",
      ];

  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const cashbackRecieveValue = cashbackValue || cashbackRecieve?.amount;

  if (toggle) {
    return (
      <div className={styles.paymentSummaryContainer}>
        <div
          className={styles.paymentSummaryHeader}
          onClick={() => setShowPaymentSummary(prev => !prev)}
        >
          <div className={styles.paymentSummaryHeaderText}>
            Payment Summary{" "}
          </div>

          <div>
            {showPaymentSummary ? (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show Less</span>
                <MemoGreenMinusNewIcon />
                {/* <MemoUpArrow /> */}
              </div>
            ) : (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show More</span>
                <MemoGreenPlusNewIcon />
                {/* <MemoDownArrow /> */}
              </div>
            )}
          </div>
        </div>
        {showPaymentSummary ? (
          <div className={styles.paymentSummaryContainer}>
            {Object.keys(summaryPrices).map((price, i) => {
              if (
                summaryPrices[price] &&
                ((price == "Coupon Discount" &&
                  !summaryPrices["Wallet Credit"].gross.amount) ||
                  summaryPrices[price].gross.amount)
              ) {
                return (
                  <div key={`summary_${i}`} className={`${styles.row}`}>
                    <div
                      className={`${styles.paymentSummaryRow} ${
                        price === "Membership Discount (10%)"
                          ? styles.paymentSummaryRow_membership
                          : ""
                      }`}
                    >
                      {price}
                      <span>
                        {discountKeys.includes(price) &&
                        summaryPrices[price]?.gross?.amount
                          ? " - "
                          : ""}
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
              <ShowHR name="show" />
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
        {/* {cashbackRecieve?.amount && parseFloat(cashbackRecieve?.amount) > 0 ? (
          <div className={styles.cashBackStripContainer}>
            <div className={styles.cashBackStrip}>
              &#8377;{parseInt(cashbackRecieve?.amount)} cashback will get
              credited to your Plix Wallet after delivery
            </div>
          </div>
        ) : (
          <></>
        )} */}
        {/* <Media
          query={{ maxWidth: largeScreen }}
          render={() => (
            
          )}
        /> */}
        <div className={isThankyoupage ? "" : "cashBackStripContainer_mobile"}>
          <div className={styles.cashbackWrapper}>
            {cashbackRecieveValue && parseInt(cashbackRecieveValue) > 0 ? (
              <div className="custom_cash">
                <div
                  className={`${styles.cashBackStripContainer} ${
                    cashbackLoading ? styles.disabledUi : ""
                  }`}
                >
                  <div className={styles.cashBackStrip}>
                    {cashbackLoading ? (
                      <div className={styles.cashbackstripLoader}>
                        <CircularProgress size="20px" />
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* <p>Get ₹ {parseInt(cashbackRecieve?.amount)} Cashback </p> */}
                    You will get &#8377; {parseInt(cashbackRecieveValue)}{" "}
                    Cashback with this order.
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {!isThankyou ? (
            <div className={styles.showStripmobile}>
              <ShowHR name="show" />
              <S.CashbackStripNew>
                <span>Place Prepaid order to get extra </span>
                5% Cashback
              </S.CashbackStripNew>
            </div>
          ) : null}
        </div>

        {defaultShowPaceOrderButton && (
          <div className={styles.paymentSummaryPlaceOrderButton}>
            <Input
              variant={2}
              type="submit"
              value="Place Order"
              customStyles={styles}
              customStylesName={
                !loading ? "placeOrderButton" : "placeOrderButton_disable"
              }
              form="checkoutAddressForm"
              disabled={loading}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.paymentSummaryContainer}>
      {Object.keys(summaryPrices).map((price, index) => {
        if (summaryPrices[price] && summaryPrices[price].gross.amount) {
          return (
            <div key={`summary_${index}`}>
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
        <div className={styles.paymentSummaryRowBold}>
          Grand Total <TaxedMoney taxedMoney={totalPrice} />
        </div>
      </div>
    </div>
  );
};

const CheckoutReviewCard = () => {
  return (
    <div className={styles.checkoutReviewCardWrapper}>
      <S.CheckoutReviewCard>
        {/* <Card
          content={{
            ...{
              title: "Most Truthworthy Nutrition Company",
              description: `I love how Plix makes nutrition fun and tasty! I have been using a
              range of products for weight and beauty from Plix and the results
              are amazing! There are 0 side effects and I love how the ingredients
              are all plant-based!`,
            },
          }}
          cardClass="review-card-checkout"
        /> */}
        <div className="review-card-footer">
          <CachedImage url="https://plixlifefc-media.farziengineer.co/hosted/WhatsApp_Image_2022-09-02_at_6.43_1-45ac6f38febc.png" />
          <div className="customer_review">
            <MyRating
              rating={5}
              isReadOnly
              fontSizeSm="20px"
              color="#FFA227"
              showEmptyIconOutlined
            />
            <p>Most Truthworthy Nutrition Company</p>
            <div className="review-verify-tag-checkout">
              <h4>Saloni Jain</h4>
              <MemoGreenTickNewSvg />

              {/* <span>Verified Buyer</span> */}
            </div>
          </div>
        </div>
        <div className="review_content">
          I love how Plix makes nutrition fun and tasty! I have been using a
          range of products for weight and beauty from Plix and the results are
          amazing! There are 0 side effects and I love how the ingredients are
          all plant-based!
        </div>
      </S.CheckoutReviewCard>
    </div>
  );
};

export const OrderSummary = ({
  defaultShowSummary = false,
  formRef,
  externalItems,
  externalPaymentSummary,
}: any) => {
  const [showSummary, setShowSummary] = useState(false);
  const { items: cartItems } = useCartState();

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

  // const paymentSummary = externalPaymentSummary || useCartState();

  const itemsToShow = showSummary ? items : items.slice(0, 1);
  const itemsToShowMobile = showSummary ? items : [];

  return (
    <div className={styles.orderSummaryContainer}>
      <div
        className={styles.orderSummaryHeader}
        onClick={() => setShowSummary(prev => !prev)}
      >
        <div className={styles.orderSummary}>Order Summary</div>
        {!defaultShowSummary && (
          <div>
            {showSummary ? (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show Less</span>
                <MemoGreenMinusNewIcon />
                {/* <MemoUpArrow /> */}
              </div>
            ) : (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show More</span>
                <MemoGreenPlusNewIcon />
                {/* <MemoDownArrow /> */}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.showHrdesktop}>
        <ShowHR name="show" />
      </div>
      <div className={styles.showHrmobile}>
        {showSummary ? <ShowHR name="show" /> : null}
      </div>
      <div>
        <div className={styles.ordersummerydesktop}>
          <OrderSummaryProductList
            externalItems={itemsToShow}
            allItems={items}
          />
        </div>

        <div className={styles.ordersummerymobile}>
          <OrderSummaryProductList
            externalItems={itemsToShowMobile}
            allItems={items}
          />
        </div>
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
  const { checkout, recentOrder } = useCheckoutState();
  const items = externalItems || cartItems;
  const itemsToshow = items.filter(item => !isBoxProduct(item));

  // const allItemsUpdated = allItems || cartItems;
  // const ShopMetaContextValue = useContext(ShopMetaContext);
  // const isOrderPlacedPage =
  //   typeof window !== "undefined" &&
  //   window.location.pathname === "/order-placed";

  // const boxItems: any = isOrderPlacedPage ? recentOrder &&
  //   getMetadataValue(recentOrder?.metadata, "boxItems") &&
  //   parseJson(getMetadataValue(recentOrder?.metadata, "boxItems")) :
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
  const isBoxItemInCart: any[] = Array.isArray(items)
    ? items.filter(item => isBoxProduct(item))
    : [];
  return (
    <div className={styles.orderSummaryProductList}>
      {isBoxItemInCart && !!isBoxItemInCart?.length ? (
        <>
          {isBoxItemInCart?.map((lines, index) => (
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
  const ShopMetaContextValue = useContext(ShopMetaContext);
  if (boxItem) {
    let specificboxItem: any = {};
    const isOrderPlacedPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/order-placed";
    const updatedBoxItem = boxItem;
    const [netPrice] = getThisVariantPrices(updatedBoxItem.variant);
    const giftBoxItemsProducts = isGiftBoxProduct(boxItem?.variant?.sku);
    const boxItems: any = isOrderPlacedPage
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
      (boxItems &&
        boxItems.length &&
        boxItems?.filter(
          item => item?.boxItemSKU === updatedBoxItem?.variant?.sku
        )) ||
      [];

    specificboxItem = !!specificItem.length && specificItem[0];

    const sortImages =
      boxItem.variant?.images && boxItem.variant?.images.length
        ? boxItem.variant?.images
            .slice()
            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
        : [boxItem.variant.product.thumbnail];

    const boxThumbnailWithImgix =
      sortImages.length && imageURLReplaceWithCDN(sortImages[0]?.url);

    const boxItemUndiscountedPriceValue =
      specificboxItem?.items &&
      specificboxItem?.items?.reduce((total, item) => {
        return total + Number(item?.price);
      }, 0);

    const undiscountedPrice = {
      gross: { amount: boxItemUndiscountedPriceValue, currency: "INR" },
      net: { amount: boxItemUndiscountedPriceValue, currency: "INR" },
    };

    const discountedPrice = updatedBoxItem?.variant?.pricing?.price;
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
        <div
          className={`${styles.orderSummaryProductContent} ${styles.orderSummaryProductContent__byob}`}
        >
          <div
            className={`${styles.orderSummaryProductContentName} ${styles.orderSummaryProductContentName__byob}`}
          >
            {updatedBoxItem?.variant?.product?.name}
            <div className={styles.discounted}>
              <TaxedMoney taxedMoney={netPrice} />
            </div>
          </div>
          <div>
            {specificboxItem?.items &&
              Array.isArray(specificboxItem?.items) && (
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
              <></>
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
          <div className={styles.quantity}>
            {" "}
            Quantity: {giftBoxItemsProducts ? boxItem?.quantity : 1}{" "}
          </div>
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
    sortImages.length && imageURLReplaceWithCDN(sortImages[0]?.url);
  const altText = line.variant.images.length && line.variant.images[0]?.alt;
  const [mrp, netPrice, discount] = getThisVariantPrices(line.variant);

  const codChargeProductDescriptionText =
    line?.variant?.product?.metadata &&
    getMetadataValue(
      line?.variant?.product?.metadata,
      "cod_charge_description"
    ) &&
    parseJson(
      getMetadataValue(
        line?.variant?.product?.metadata,
        "cod_charge_description"
      )
    );
  const subscription_product_skus =
    checkout?.metadata &&
    getMetadataValue(checkout?.metadata, "subscription_skus") &&
    parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

  const isSubscriptionProduct =
    Array.isArray(subscription_product_skus) &&
    subscription_product_skus.includes(line?.variant?.sku);

  const subscriptionProductData =
    line?.variant?.product?.metadata &&
    getMetadataValue(line?.variant?.product?.metadata, "subscription_data") &&
    parseJson(
      getMetadataValue(line?.variant?.product?.metadata, "subscription_data")
    );

  return (
    <div
      className={`${
        isSubscriptionProduct
          ? styles.orderSummarySubscriptionProduct
          : styles.orderSummaryProduct
      }`}
    >
      {subscriptionProductData?.productCardData?.upperText &&
        isSubscriptionProduct && (
          <div className={styles.subscriptionProductUpperText}>
            {subscriptionProductData?.productCardData?.upperText}
          </div>
        )}
      {subscriptionProductData?.productCardData?.lowerText &&
        isSubscriptionProduct && (
          <div className={styles.subscriptionProductLowerText}>
            {subscriptionProductData?.productCardData?.lowerText}
          </div>
        )}
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
          {line.variant.product.name}
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
        <div className={styles.quantity}>
          Quantity: {line?.newQuantity || line?.quantity}{" "}
        </div>
        {codChargeProductDescriptionText ? (
          <div className={styles.codChargeProductDescriptionText}>
            {codChargeProductDescriptionText}
          </div>
        ) : (
          <></>
        )}
      </div>
      {line?.productType === "free" ?(
        <div className={styles.discounted_free}>FREE</div>
      ) : (
      <div className={styles.discounted}>
          <TaxedMoney taxedMoney={netPrice} />
      </div>
       )}
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
const CheckoutForm = () => {
  const clevertap = makeClevertap();

  const initialState = {
    firstName: { value: "", touched: false, hasError: true, error: "" },
    lastName: { value: "", touched: false, hasError: true, error: "" },
    phone: { value: "", touched: false, hasError: true, error: "" },
    email: { value: "", touched: false, hasError: true, error: "" },
    streetAddress1: { value: "", touched: false, hasError: true, error: "" },
    streetAddress2: { value: "", touched: false, hasError: false, error: "" },
    postalCode: { value: "", touched: false, hasError: true, error: "" },
    city: { value: "", touched: false, hasError: true, error: "" },
    countryArea: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  };

  const useCheckoutRes = useCheckout();
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

  const [cashbackValue, setCashbackValue] = useState<any>(null);

  const totalQuantity = items?.length
    ? items.reduce((total, curr) => {
        total += curr.quantity;
        return total;
      }, 0)
    : 0;

  const { user } = useAuthState();
  const { pathname } = useRouter();
  const Router = useRouter();
  const { updateItemWithLinesRest } = useCart();
  const [callAfterUserData, setCallAfterUserData] = useState(false);
  const [walletDisabled, setwalletDisabled] = useState(false);
  const { show, hide } = useContext(OverlayContext2);
  const { removeItemRest } = useCart();

  const ShopMetaContextValueCheckout = useContext(ShopMetaContext);
  const offerPolicies =
    getMetadataValue(ShopMetaContextValueCheckout, "offer_policies") &&
    parseJson(getMetadataValue(ShopMetaContextValueCheckout, "offer_policies"));

  const exitPopupData =
    getMetadataValue(ShopMetaContextValueCheckout, "checkout_exit_popup") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "checkout_exit_popup")
    );

  const isRecalculate =
    getMetadataValue(ShopMetaContextValueCheckout, "atc_recalculation") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "atc_recalculation")
    );

  const membershipdata =
    getMetadataValue(ShopMetaContextValueCheckout, "membership_v3") &&
    parseJson(getMetadataValue(ShopMetaContextValueCheckout, "membership_v3"));

  const codChargeProduct =
    getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product")
    );

  // mrp and list price update for product byob
  let totalbyobMrpInItems: number = 0;
  let totalbyobItemAmount: number = 0;

  const boxItems: any =
    (getMetadataValue(checkout?.metadata, "byobItems") &&
      parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
    [];

  const isBoxItemInCart = items.filter(item => isBoxProduct(item)) || [];

  !!isBoxItemInCart.length &&
    isBoxItemInCart.forEach(item => {
      const findBox = boxItems.find(
        box => box?.boxItemSKU === item?.variant?.sku
      );
      if (findBox && findBox.items) {
        const boxItemstotalPrice = findBox.items.reduce(
          (total, item) => total + Number(item?.price),
          0
        );
        totalbyobMrpInItems += boxItemstotalPrice * (item?.quantity || 0);
      }
      const itemPrice = item?.variant?.pricing?.price?.gross?.amount || 0;
      totalbyobItemAmount += itemPrice * (item?.quantity || 0);
    });
  // mrp and list price update for product byob

  const savingAmount =
    prepaidDiscount?.gross.amount +
    cashbackDiscount?.gross.amount +
    couponDiscount?.gross.amount +
    (!!isBoxItemInCart.length
      ? Number(itemDiscount?.gross?.amount) +
        totalbyobMrpInItems -
        totalbyobItemAmount
      : itemDiscount?.gross.amount);

  // Show Popup when user tries to exit checkout
  useEffect(() => {
    if (typeof window !== "undefined" && exitPopupData?.enabled) {
      window.onpopstate = function () {
        window.history.go(1);
        show(OverlayType2.pageExitWarning, OverlayTheme2.modal, {
          data: {
            infoText: exitPopupData?.infoText,
            // questionText: exitPopupData?.questionText,
            savingAmount: savingAmount,
            cashbackRecieve: cashbackRecieve,
            onAccept: () => {
              if (typeof window !== "undefined") {
                hide();
                window.onpopstate = null;
                Router.push(getUrlWithParams("/"));
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
      // handleCheckoutRecalculation(!isRecalculate);
    };
  }, [cashbackRecieve?.amount, savingAmount]);

  const walletDisableProducts =
    getMetadataValue(ShopMetaContextValueCheckout, "wallet_disabled") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "wallet_disabled")
    );

  useEffect(() => {
    if (items.length) {
      const subscription_product_skus =
        checkout?.metadata &&
        getMetadataValue(checkout?.metadata, "subscription_skus") &&
        parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

      let updated_product_skus = subscription_product_skus;
      if (Array.isArray(subscription_product_skus)) {
        subscription_product_skus.forEach((v_sku: string) => {
          if (!items.some(item => item.variant.sku === v_sku)) {
            updated_product_skus = subscription_product_skus.filter(
              i => i !== v_sku
            );
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
          const checkoutMetaUpdateValue = [
            {
              key: "subscription_skus",
              value: JSON.stringify(updated_product_skus),
            },
          ];

          updateCheckoutMeta(checkoutMetaUpdateValue);
        }
      }

      const walletDisableCheck =
        walletDisableProducts &&
        walletDisableProducts?.enable &&
        Array.isArray(walletDisableProducts?.productIds) &&
        !!walletDisableProducts?.productIds?.length
          ? items &&
            items?.some(item =>
              walletDisableProducts?.productIds?.includes(
                getDBIdFromGraphqlId(
                  item?.variant?.product?.id,
                  "Product"
                ).toString()
              )
            )
          : null;

      setwalletDisabled(walletDisableCheck);
    }
  }, [items, checkout]);

  const userAltEmail =
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));
  const validUserMail =
    typeof user?.email === "string" && user?.email.includes("@example.com")
      ? userAltEmail
      : user?.email;

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
          checkout?.email && checkout?.email?.includes("@example.com")
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
              value:
                (userData &&
                  userData[curr] &&
                  getPhoneNoWithoutPrefix(userData[curr])) ||
                "",
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
  };

  const debouncedAddShippingInfoDataLayer = React.useRef(
    debounce(() => {
      if (ENABLE_GA4) {
        if (
          typeof window !== "undefined" &&
          window.dataLayer &&
          gtmConfig.addShippingInfo.enable
        ) {
          window.dataLayer.push({ ecommerce: null });
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.addShippingInfo.value,
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
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
                const productVariantName = getVariantAttributes(
                  "Flavors",
                  item?.variant
                );
                const { discountAmount } = getPrices(
                  item?.variant?.product,
                  false,
                  item?.variant
                );
                const categories = getItemCategoriesFromAttribute(
                  item?.variant
                );
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
                  quantity: item?.quantity,
                  discount: discountAmount,
                  coupon: checkout?.voucherCode || "NA",
                  item_category: item?.variant?.product?.category?.name,
                  item_category2: isMonthIncluded
                    ? categories?.sizeCategory2
                    : "NA",
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
          });
        }
      }
    }, 2000)
  ).current;

  const getInitialRadioState = () => {
    if (availablePaymentGateways && availablePaymentGateways.length) {
      if (
        availablePaymentGateways[0].id === PaymentMethods.RAZORPAY ||
        availablePaymentGateways[0].id === PaymentMethods.WALLET ||
        availablePaymentGateways[0].id === "mirumee.payments.juspay" ||
        availablePaymentGateways[0].id === "mirumee.payments.gokwik"
      ) {
        return PaymentMethods.RAZORPAY;
      }
      return PaymentMethods.COD;
    }

    return PaymentMethods.RAZORPAY;
  };

  const initialRadioState = getInitialRadioState();

  availablePaymentGateways && availablePaymentGateways.length
    ? availablePaymentGateways[0].id
    : PaymentMethods.RAZORPAY;

  const [radioState, setradioState] =
    useState<PaymentRadioFields>(initialRadioState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethodChangeLoading, setPaymentMethodChangeLoading] = useState<
    boolean | "initial"
  >("initial");
  const [placeOrderClicked, setPlaceOrderClicked] = useState<boolean>(false);
  const [isTotalZero, setIsTotalZero] = useState(false);
  const [pincodeFetched, setPincodeFetched] = useState(false);
  const isBoxInCart =
    items && items.some(item => isBoxProduct(item) && !isComboProduct(item));
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  // const cartShowCashbackData = // await handleCheckoutRecalculation();
  //   getMetadataValue(ShopMetaContextValue, "show_cashback_text") &&
  //   parseJson(getMetadataValue(ShopMetaContextValue, "show_cashback_text"));

  const cartShowCashbackData =
    getMetadataValue(ShopMetaContextValue, "show_cashback_text_new") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "show_cashback_text_new"));

  let remainingWalletBalance =
    userWalletBalance - cashbackDiscount?.gross?.amount;
  if (remainingWalletBalance && typeof remainingWalletBalance === "number") {
    remainingWalletBalance = parseInt(remainingWalletBalance.toFixed(2));
  }

  const paymentSummary = useCartState();

  const handleCashbackClick = async () => {
    // setUseCashback(!useCashback);
    await checkoutPaymentMethodUpdate({
      gateway: availablePaymentGateways[0]?.id,
      useCashback: !useCashback,
    });

    // await handleCheckoutRecalculation();
  };

  useEffect(() => {
    if (
      availablePaymentGateways.length &&
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

  useEffect(() => {
    if (!paymentMethodChangeLoading) {
      setCashbackValue(cashbackRecieve?.amount);
    }
  }, [cashbackRecieve?.amount, paymentMethodChangeLoading]);

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
        //pushState needs to be called on component mount
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
      try {
        const cartItems = paymentSummary.items.map(item => {
          return {
            item_name: item?.variant?.product?.name,
            item_id: item?.variant?.product?.id,
            price: item?.variant?.pricing?.price?.gross?.amount,
            currency: item?.variant?.pricing?.price?.gross?.currency,
            variant: item?.variant?.name,
            quantity: item?.quantity,
          };
        });
  
        beginCheckout(ShopMetaContextValue, {
          cart_amount: paymentSummary.totalPrice?.gross?.amount,
          currency: paymentSummary.totalPrice?.gross?.currency,
          items: cartItems,
        });
      } catch (err) {
        console.log("fc-collect begin checkout error", err);
      }
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

        const byobItems = parseJson(
          getMetadataValue(checkout?.metadata, "byobItems")
        );
        const byobItemsForCtpString =
          byobItems && Array.isArray(byobItems)
            ? byobItems
                ?.map(item => {
                  const itemName = items?.find(
                    it => it.variant.sku == item?.boxItemSKU
                  )?.variant?.product?.name;
                  const itemsSku = item?.items?.map(i => i?.sku)?.join(",");
                  return `${itemName} - ${itemsSku}`;
                })
                ?.join(" | ")
            : "";

        const ctp = {
          platform: window.screen.width > 520 ? "website" : "msite",
          timeStamp: Date.now(),
          gaUserId: getGclid(),
          customerEmail: validUserMail || checkout?.email,
          customerPhone:
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
          "Cart MRP": !!isBoxItemInCart.length
            ? Number(mrp?.gross?.amount) +
              totalbyobMrpInItems -
              totalbyobItemAmount
            : mrp?.gross.amount,
          "Checkout Url": `https://www.plixlife.com/checkout/address?token=${checkout?.token}`,
          "Item Discount": !!isBoxItemInCart.length
            ? Number(itemDiscount?.gross?.amount) +
              totalbyobMrpInItems -
              totalbyobItemAmount
            : itemDiscount?.gross.amount,
          "Net Price": netPrice?.gross.amount,
          "Coupon discount": couponDiscount.gross.amount,
          "Offer discount": offerDiscount?.gross.amount,
          "Order total": totalPrice?.gross?.amount,
          "Delivery Charges": shippingPrice?.gross.amount,
          "Prepaid discount": prepaidDiscount.gross.amount,
          "Total discount": discount?.amount,
          "Total Cart Value": totalPrice?.gross?.amount,
          "BYOB Info": byobItemsForCtpString,
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
  const [addressFieldOnce, setAddressFilledOnce] = useState(false);

  const [checkoutError, setCheckoutError] = useState("");

  const {
    setShippingMethod,
    checkoutPaymentMethodUpdate,
    createRazorpayOrder,
    createPayment,
    completeCheckout,
    getWalletAmount,
    setShippingAddress,
    checkoutRecalculation,
    setShippingAddressAndEmail,
    updateCheckoutMeta,
  } = useCheckoutRes;

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

  const history = useCustomHistory();

  const { authenticated, userCheckoutLoading } = useAuthState();

  useEffect(() => {
    if (
      user &&
      isMember(user) &&
      membershipdata?.variantID &&
      !userCheckoutLoading
    ) {
      const includeMemberProduct = items.findIndex(
        item => item?.variant?.id === membershipdata?.variantID
      );
      if (includeMemberProduct !== -1) {
        setLoading(true);
        removeItemRest(membershipdata?.variantID, true, isRecalculate).finally(
          () => setLoading(false)
        );
      }
    }
  }, [userCheckoutLoading]);

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
        dbVariantId &&
        (!items.find(item => item.variant.id === codChargeProduct?.variantId) ||
          paymentMethodChangeLoading === true)
      ) {
        const updateItemWithLinesRes = await updateItemWithLinesRest(
          [{ variantId: dbVariantId, quantity: 1 }],
          false,
          false,
          true
        );
      }
    } else if (
      actionType === "REMOVE" &&
      (items.find(item => item.variant.id === codChargeProduct?.variantId) ||
        paymentMethodChangeLoading === true)
    ) {
      if (dbVariantId) {
        const updateItemWithLinesRes = await updateItemWithLinesRest(
          [{ variantId: dbVariantId, quantity: 0 }],
          false,
          false,
          true
        );
      }
    }
    setPaymentMethodChangeLoading(false);
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

  const formSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement> | undefined = undefined
  ) => {
    // prevents the form from submitting
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setPlaceOrderClicked(false);

    if (items.length) {
      const subscription_product_skus =
        checkout?.metadata &&
        getMetadataValue(checkout?.metadata, "subscription_skus") &&
        parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

      let updated_product_skus = subscription_product_skus;
      if (Array.isArray(subscription_product_skus)) {
        subscription_product_skus.forEach((v_sku: string) => {
          if (!items.some(item => item.variant.sku === v_sku)) {
            updated_product_skus = subscription_product_skus.filter(
              i => i !== v_sku
            );
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
          const checkoutMetaUpdateValue = [
            {
              key: "subscription_skus",
              value: JSON.stringify(updated_product_skus),
            },
          ];

          updateCheckoutMeta(checkoutMetaUpdateValue);
        }
      }
    }

    if (
      !(
        items &&
        items.length &&
        items.some(
          item =>
            item?.variant?.product?.category?.name == "All Products" ||
            item?.variant?.product?.category?.name == "Byob Products" ||
            item?.variant?.product?.category?.name == "Membership"
        )
      )
    ) {
      setLoading(false);
      setCheckoutError("Please add any product along with this.");
      return;
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
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce: {
              currency: "INR",
              value: paymentSummary?.totalPrice?.gross?.amount,
              coupon: checkout?.voucherCode || "NA",
              payment_type:
                radioState === "mirumee.payments.dummy"
                  ? "Cash On Delivery"
                  : "Card|UPI|Netbanking|Wallet",
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
                const categories = getItemCategoriesFromAttribute(
                  item?.variant
                );
                const isMonthIncluded = categories?.sizeCategory2
                  ?.toLowerCase()
                  ?.includes("month");
                return {
                  item_id: item.variant?.product?.id
                    ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product")
                    : "NA",
                  item_name: item?.variant?.product?.name,
                  item_brand: "plixlife",
                  currency: "INR",
                  quantity: item?.quantity,
                  discount: discountAmount,
                  coupon: checkout?.voucherCode || "NA",
                  item_category: item?.variant?.product?.category?.name,
                  item_category2: isMonthIncluded
                    ? categories?.sizeCategory2
                    : "NA",
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
        try {
          const createPaymentRes = await createPayment(createPaymentInput);

          if (
            createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message ==
              "Checkout matching query does not exist."
          ) {
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
          }

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
                // await handleCheckoutRecalculation();
              }

              // await handleCheckoutRecalculation();
            }

            clevertapPaymentFailure();
            paymentFailureDatalayer();
            setLoading(false);
            return;
          }
        } catch (err) {
          if (err.message.includes("Checkout matching query does not exist.")) {
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
          }
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
          history.push(getUrlWithParams("/order-placed"));
        }
      } else {
        if (radioState === "mirumee.payments.razorpay") {
          const createRazorpayOrderRes = await createRazorpayOrder();

          if (
            createRazorpayOrderRes?.data &&
            createRazorpayOrderRes?.data?.razorpayOrderCreate &&
            createRazorpayOrderRes?.data?.razorpayOrderCreate?.razorpayErrors[0]?.message.includes(
              "Couldn't resolve to a node"
            )
          ) {
            setLoading(false);
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
            return;
          }

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
            createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
            createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message ==
              "Checkout matching query does not exist."
          ) {
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
          }

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
                history.push(getUrlWithParams("/order-placed"));
              }

              setLoading(false);
            },
          };

          if (!(createPaymentRes.errors && createPaymentRes.errors.length)) {
            const _window = window as any;
            const paymentObject = new _window.Razorpay(options);
            paymentObject.on(
              "payment.failed",
              function failed(response: any) {}
            );
            paymentObject.open();
          }
        }

        if (radioState === "mirumee.payments.dummy") {
          const createPaymentInput: CreatePaymentInput = {
            gateway: availablePaymentGateways[0]?.id,
            token: "not-charged",
          };
          // const resRecalculatedCheckout = await handleCheckoutRecalculation();
          try {
            const createPaymentRes = await createPayment(createPaymentInput);
            if (
              createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
              createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message?.includes(
                "Checkout matching query does not exist."
              )
            ) {
              localStorage.removeItem("data_checkout");
              localStorage.removeItem("data_checkout_discounts");
              window.location.reload();
            }

            if (
              (createPaymentRes?.errors &&
                createPaymentRes?.errors[0]?.message) ||
              (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
                createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                  ?.message)
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
                createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]
                  .code === "INVALID" &&
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
                    paymentMethodRes?.data?.checkoutPaymentMethodUpdate
                      ?.checkout?.availablePaymentGateways[0]?.id
                  );
                  // await handleCheckoutRecalculation();
                }
                // await handleCheckoutRecalculation();
              }
              clevertapPaymentFailure();
              paymentFailureDatalayer();
              setLoading(false);
              return;
            }
          } catch (err) {
            if (
              err.message.includes("Checkout matching query does not exist.")
            ) {
              localStorage.removeItem("data_checkout");
              localStorage.removeItem("data_checkout_discounts");
              window.location.reload();
            }
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
            history.push(getUrlWithParams("/order-placed"));
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
      default:
        break;
    }
  };

  const handleRadioClick = async (id: string) => {
    switch (id) {
      case "online": {
        setradioState("mirumee.payments.razorpay");
        setLoading(true);
        if (codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.razorpay",
            useCashback,
          },
          false
        );
        if (res?.errors && res?.errors[0]?.message) {
          setCheckoutError(res?.errors[0]?.message);
        }
        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }
      case "cod": {
        setradioState("mirumee.payments.dummy");
        setLoading(true);
        if (codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
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
          setradioState("mirumee.payments.razorpay");
          checkoutPaymentMethodUpdate({
            gateway: "mirumee.payments.razorpay",
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
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
          }
        }
        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }

      default: {
        setradioState("mirumee.payments.razorpay");
        setLoading(true);
        if (codChargeProduct?.enabled) {
          setPaymentMethodChangeLoading(true);
        }
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: "mirumee.payments.razorpay",
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
            localStorage.removeItem("data_checkout");
            localStorage.removeItem("data_checkout_discounts");
            window.location.reload();
          }
        }
        // await handleCheckoutRecalculation();
        setLoading(false);
        break;
      }
    }
  };

  const handleCheckboxWallet = async () => {
    setLoading(true);

    const res = await checkoutPaymentMethodUpdate(
      {
        gateway: radioState,
        useCashback: !useCashback,
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
            res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.message)
      );
      if (
        res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors &&
        res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.code ===
          "NOT_FOUND" &&
        res?.data?.checkoutPaymentMethodUpdate?.checkoutErrors[0]?.field ===
          "checkoutId" &&
        typeof window !== "undefined"
      ) {
        localStorage.removeItem("data_checkout");
        localStorage.removeItem("data_checkout_discounts");
        window.location.reload();
      }
    }
    // await handleCheckoutRecalculation();
    setLoading(false);
  };

  const debouncedSetAddress = React.useRef(
    debounce(
      async (formStateWithoutEmailWithValues, email, currentCheckout) => {
        setLoading(true);

        if (email?.value === "dummy@dummy.com") {
          setCheckoutError("Invalid email");
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name: "email",
              value: "",
              hasError: true,
              error: "Invalid email",
              touched: false,
              isFormValid: false,
            },
          });
          setLoading(false);
          return;
        }

        const resAddress = await setShippingAddressAndEmail(
          { ...formStateWithoutEmailWithValues, country: { code: "IN" } },
          email.value,
          true
        );

        // const resCheckout = await handleCheckoutRecalculation();

        if (resAddress?.errors && resAddress.errors[0]?.message) {
          setCheckoutError(resAddress?.errors && resAddress.errors[0]?.message);
        }
        if (resAddress?.errors && resAddress?.errors[0]?.message) {
          setCheckoutError(
            resAddress?.errors && resAddress?.errors[0]?.message
          );
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
            data: initialState,
          });
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
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name: "phone",
              value: "",
              hasError: true,
              error:
                resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]
                  ?.message,
              touched: false,
              isFormValid: false,
            },
          });
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
          localStorage.removeItem("data_checkout");
          localStorage.removeItem("data_checkout_discounts");
          window.location.reload();
        }

        if (
          resAddress?.data?.checkoutShippingAddressUpdate?.errors &&
          resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.message
        ) {
          setCheckoutError(
            resAddress?.data?.checkoutShippingAddressUpdate?.errors[0]?.message
          );
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
            data: initialState,
          });
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
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name: "email",
              value: "",
              hasError: true,
              error: resAddress?.data?.checkoutEmailUpdate?.errors[0]?.message,
              touched: false,
              isFormValid: false,
            },
          });
          setLoading(false);
          return;
        }

        const phoneNo =
          resAddress?.data?.checkoutShippingAddressUpdate?.checkout
            ?.shippingAddress?.phone;

        if (!authenticated && resAddress) {
          clevertap.onUserLogin.push({
            Site: {
              Identity: phoneNo?.replace("+", ""),
              Phone: phoneNo,
              "MSG-whatsapp": true,
            },
          });
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
        if (!addressFieldOnce) {
          setAddressFilledOnce(true);
        }
        setLoading(false);
      },
      1200
    )
  ).current;

  useEffect(() => {
    if (
      formState[IIAddressFieldNames.STREET_ADDRESS_1].value &&
      !validateInput(
        IIAddressFieldNames.STREET_ADDRESS_1,
        formState[IIAddressFieldNames.STREET_ADDRESS_1].value,
        dispatch,
        formState,
        useCheckoutRes
      )?.hasError
    ) {
      debouncedAddShippingInfoDataLayer();
    }
  }, [formState[IIAddressFieldNames.STREET_ADDRESS_1].value]);

  const updateCheckoutAmountsBeforeResponse = () => {
    if (
      paymentMethodChangeLoading &&
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
          availablePaymentGateways[0]?.id === PaymentMethods.RAZORPAY &&
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

  useEffect(() => {
    const walletDisablecheck =
      walletDisableProducts &&
      walletDisableProducts?.enable &&
      items &&
      Array.isArray(items) &&
      Array.isArray(walletDisableProducts?.productIds) &&
      !!walletDisableProducts?.productIds?.length
        ? items?.some(item =>
            walletDisableProducts?.productIds?.includes(
              getDBIdFromGraphqlId(
                item?.variant?.product?.id,
                "Product"
              ).toString()
            )
          )
        : null;
    const initialShippingAndPaymenMethod = async () => {
      if (
        availablePaymentGateways &&
        availablePaymentGateways.length &&
        availablePaymentGateways[0]?.id
      ) {
        const gatewayToSet =
          availablePaymentGateways[0]?.id === "mirumee.payments.juspay"
            ? "mirumee.payments.razorpay"
            : availablePaymentGateways[0]?.id;
        const res = await checkoutPaymentMethodUpdate(
          {
            gateway: gatewayToSet,
            useCashback:
              walletDisablecheck && useCashback ? false : useCashback,
          },
          false
        );

        if (
          res?.data?.checkoutPaymentMethodUpdate?.checkout
            ?.availablePaymentGateways &&
          res?.data?.checkoutPaymentMethodUpdate?.checkout
            ?.availablePaymentGateways.length
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
        }
        // await handleCheckoutRecalculation();
      }
    };
    initialShippingAndPaymenMethod();
    autoFillForm();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");

    return () => {
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
    }
  }, [authenticated]);

  useEffect(() => {
    if (formState.isFormValid) {
      debouncedSetAddress(formStateWithoutEmailWithValues, email, checkout);
    }
  }, [
    JSON.stringify({ ...formStateWithoutEmailWithValues, email }),
    formState?.isFormValid,
  ]);

  useEffect(() => {
    // Update Checkout with phone number as soon as user enters it.
    if (!formState.isFormValid) {
      debouncedUpdateCheckoutWithPhoneNumber(
        IIAddressFieldNames.PHONE,
        dispatch,
        formState,
        useCheckoutRes,
        formStateWithoutEmailWithValues,
        checkout
      );
    }
  }, [formStateWithoutEmailWithValues?.phone]);

  const FormCreator: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    return (
      <>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map(row => {
                if (row.type === "select") {
                  return (
                    <div className={styles.inputErroDiv} key={row.name}>
                      <Select
                        key={row.name}
                        variant={1}
                        customStyles={styles}
                        name={row.name}
                        id={row.id}
                        placeholder={row.placeholder}
                        value={row.value || formState[row.name].value}
                        autoComplete={row.autoComplete}
                        inputMode={row.inputMode}
                        selectOptions={row?.selectOptions || []}
                        onChange={e => {
                          onInputChange(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }}
                        onBlur={e => {
                          onFocusOut(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }}
                      />
                      {formState[row.name].touched &&
                        formState[row.name].hasError && (
                          <div className={styles.errorMessage}>
                            {formState[row.name].error}
                          </div>
                        )}
                    </div>
                  );
                }
                return (
                  <div className={styles.inputErroDiv} key={row.name}>
                    <Input
                      key={row.name}
                      variant={1}
                      customStyles={styles}
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      placeholder={row.placeholder}
                      value={formState[row.name].value}
                      autoComplete={row.autoComplete}
                      inputMode={row.inputMode}
                      onChange={e => {
                        onInputChange(
                          row.name,
                          e.target.value,
                          dispatch,
                          formState,
                          useCheckoutRes
                        );
                      }}
                      onBlur={e => {
                        if (row.name !== IIAddressFieldNames.POSTAL_CODE) {
                          onFocusOut(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }
                      }}
                    />
                    {formState[row.name].touched &&
                      formState[row.name].hasError && (
                        <div className={styles.errorMessage}>
                          {formState[row.name].error}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  const RadioLabel: React.FC<{ row: IAddressField }> = ({ row }) => {
    const { prepaidDiscount, totalPrice } = useCartState();

    const prepaidDiscountPercent = Math.round(
      (prepaidDiscount.gross.amount / totalPrice?.gross?.amount) * 100
    );

    if (
      radioState === row.value &&
      radioState === "mirumee.payments.razorpay"
    ) {
      return (
        <div className={styles.radioLabelContainer}>
          <div>
            {" "}
            <p>{row.label} </p>
            <CachedImage
              isStaticImage
              url={imageURLReplaceWithCDN(
                "https://plixlifefc-media.farziengineer.co/hosted/Group_34324-24a8b1c90798.png"
              )}
            />
          </div>
          <div className={styles.radioLabelContainerSecondary}>
            <div
              className={styles.boldBlackText}
              style={{ marginBottom: "1rem" }}
            >
              Applied: Extra 5% cashback with your order
            </div>
            {/* <div>
              After clicking
              <span className={styles.boldBlackText}> "Place Order" </span> ,
              you will be redirected to Razorpay (Cards, UPI, NetBanking,
              Wallets) to complete your purchase securely.
            </div> */}
          </div>
          {row.meta.labelSVG && <MemoPaySVG width={295} height={27} />}
        </div>
      );
    }

    if (radioState === row.value && radioState === "mirumee.payments.dummy") {
      return (
        <div className={styles.radioLabelContainer}>
          <div> {row.label} </div>
          <div className={styles.radioLabelContainerSecondary}>
            <div className={styles.boldBlackText}>
              For all COD orders, Rs.49 is charged mandatorily in the form of
              seed paper.
            </div>
            <br className={styles.breakline} />
            <div className={styles.boldBlackText}>
              Do you know you get an Extra 5% Cashback when you pay online?
            </div>
            {/* <div style={{ marginBottom: "1rem" }}>
              For everyone's safety, we advise paying online to limit contact
              and help stop the spread of the virus.
            </div> */}

            {/* <div>
              Click{" "}
              <span className={styles.boldBlackText}> "Place Order" </span> , to
              complete your purchase.
            </div> */}
          </div>
          {row.meta.labelSVG && <MemoPaySVG width={295} height={27} />}
        </div>
      );
    }

    return (
      <div className={styles.radioLabelContainer}>
        <div>
          {" "}
          <p>{row.label} </p>
          {row.value === "mirumee.payments.razorpay" ? (
            <CachedImage url="https://plixlifefc-media.farziengineer.co/hosted/Group_34324-24a8b1c90798.png" />
          ) : (
            <></>
          )}
        </div>

        {row.meta.labelSVG && <MemoPaySVG width={295} height={27} />}
      </div>
    );
  };

  const RadioButtonCotainer: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    return (
      <S.RadioContainer
        className={styles.radioContainer}
        disabled={
          checkoutLoading || loading || isTotalZero || placeOrderClicked
        }
      >
        <div className={styles.bigBoldText}> Payment Method</div>
        {formData.map((rows, index) => {
          return (
            <div className={`${styles.rowRadioButton}`} key={index}>
              {rows.map(row => {
                return (
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={() => {
                      if (!(row?.value === radioState)) {
                        handleRadioClick(row.id);
                      }
                    }}
                  >
                    <Input
                      key={row.name}
                      label={<RadioLabel row={row} />}
                      checked={row?.value === radioState}
                      variant={1}
                      customStyles={styles}
                      customStylesName="radioInputContainer"
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      value={row?.value}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </S.RadioContainer>
    );
  };

  const WalletCheckbox: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    const { authenticated, user } = useAuthState();

    if (authenticated && userWalletBalance) {
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
                      onClick={handleCheckboxWallet}
                    >
                      <Input
                        key={row.name}
                        label={
                          <>
                            {row.label} (&#8377; {userWalletBalance})
                          </>
                        }
                        checked={useCashback}
                        variant={1}
                        customStyles={styles}
                        customStylesName="radioInputContainer"
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
    }
    return <> </>;
  };

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

  const CheckoutTopBadgeSection = () => {
    const ShopMetaContextValue = useContext(ShopMetaContext);
    const badgeSectionData =
      getMetadataValue(ShopMetaContextValue, "checkout_testimonial_section") &&
      parseJson(
        getMetadataValue(ShopMetaContextValue, "checkout_testimonial_section")
      );
    if (badgeSectionData?.enabled) {
      return (
        <div className={styles.badgeSectionWrapper}>
          <div className={styles.testimonyStrip}>
            {badgeSectionData?.testimonyData?.image &&
              typeof badgeSectionData?.testimonyData?.image === "string" && (
                <CachedImage url={badgeSectionData?.testimonyData?.image} />
              )}
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
                    <MemoSingleStarIcon />
                  </span>
                </>
              )}
            </div>
          </div>
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
        </div>
      );
    }
    return <></>;
  };

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
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
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
    debounce(
      async (
        name,
        dispatch,
        formState,
        useCheckoutRes,
        formStateWithoutEmailWithValues,
        currentCheckout
      ) => {
        const { hasError } = validateInput(
          name,
          formStateWithoutEmailWithValues?.phone || "",
          dispatch,
          formState,
          useCheckoutRes
        );
        if (name === IIAddressFieldNames.PHONE && !hasError) {
          const dummyFormState = {
            city: formStateWithoutEmailWithValues?.city || "delhi",
            countryArea:
              formStateWithoutEmailWithValues?.countryArea || "Delhi",
            firstName: formStateWithoutEmailWithValues?.firstName || "there",
            lastName: formStateWithoutEmailWithValues?.lastName || "Plixfam",
            phone: formStateWithoutEmailWithValues?.phone,
            postalCode: formStateWithoutEmailWithValues?.postalCode || "110006",
            streetAddress1:
              formStateWithoutEmailWithValues?.streetAddress1 || "abandoned",
            streetAddress2:
              formStateWithoutEmailWithValues?.streetAddress2 || "abandoned",
          };
          try {
            if (
              typeof window !== "undefined" &&
              window.dataLayer &&
              gtmConfig.phoneOnCheckout.enable
            ) {
              window.dataLayer.push({
                event: gtmConfig.phoneOnCheckout.value,
                phoneNo: formStateWithoutEmailWithValues?.phone,
                firstName: formStateWithoutEmailWithValues?.firstName,
                lastName: formStateWithoutEmailWithValues?.lastName,
                email: email?.value,
              });
            }
            const resAddress = await setShippingAddressAndEmail(
              { ...dummyFormState, country: { code: "IN" } },
              email.value,
              true
            );

            // const resCheckout = await handleCheckoutRecalculation();
            let phoneNo =
              resAddress?.data?.checkoutShippingAddressUpdate?.checkout
                ?.shippingAddress?.phone;
            if (!authenticated && resAddress) {
              clevertap.onUserLogin.push({
                Site: {
                  Identity: phoneNo?.replace("+", ""),
                  Phone: phoneNo,
                  "MSG-whatsapp": true,
                },
              });
            }
            // const resCheckout = await handleCheckoutRecalculation();
          } catch (error) {
            console.log(error);
          }
        }
      },
      1000
    )
  ).current;

  const locallyUpdatedPaymentSummary = updateCheckoutAmountsBeforeResponse();
  return (
    <div>
      {/* {
        placeOrderClicked ? <div className={styles.fullScreenLoader}>
        <div className={styles.loader}>
          <CircularProgress color="inherit" />
        </div>
      </div> : <></>
      } */}
      <Link href="/order-placed">
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

      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <CheckoutLoginSection dispatch={dispatch} setLoading={setLoading} />

          <S.FormContainer className={styles.formContainer}>
            <form
              id="checkoutAddressForm"
              className={styles.form}
              onSubmit={e => {
                e.preventDefault();
                setPlaceOrderClicked(true);
              }}
              ref={formRef}
            >
              <div className={styles.formFieldsContainer}>
                <>
                  {addressFileds2.slice(0, 1).map((rows, index) => {
                    return (
                      <div key={index}>
                        <div className={styles.row}>
                          {rows.map(row => {
                            if (row.type === "select") {
                              return (
                                <div
                                  className={styles.inputErroDiv}
                                  key={row.name}
                                >
                                  <Select
                                    key={row.name}
                                    variant={1}
                                    customStyles={styles}
                                    name={row.name}
                                    id={row.id}
                                    placeholder={row.placeholder}
                                    value={
                                      row.value || formState[row.name].value
                                    }
                                    autoComplete={row.autoComplete}
                                    inputMode={row.inputMode}
                                    selectOptions={row?.selectOptions || []}
                                    onChange={e => {
                                      onInputChange(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                    onBlur={e => {
                                      onFocusOut(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                  />
                                  {formState[row.name].touched &&
                                    formState[row.name].hasError && (
                                      <div className={styles.errorMessage}>
                                        {formState[row.name].error}
                                      </div>
                                    )}
                                </div>
                              );
                            }
                            return (
                              <>
                                {row.id === "phone" ? (
                                  // <div className={styles.countryCodePrefix}>
                                  <div
                                    className={styles.countryCodePrefix}
                                    key={row.name}
                                  >
                                    <Input
                                      key="Country code"
                                      variant={1}
                                      customStyles={styles}
                                      type="text"
                                      name="Country code"
                                      id="country code"
                                      disabled
                                      placeholder="+91"
                                      // value="+91"
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div
                                  className={styles.inputErroDiv}
                                  key={row.name}
                                >
                                  <Input
                                    key={row.name}
                                    variant={1}
                                    customStyles={styles}
                                    type={row.type}
                                    name={row.name}
                                    id={row.id}
                                    placeholder={row.placeholder}
                                    value={formState[row.name].value}
                                    autoComplete={row.autoComplete}
                                    inputMode={row.inputMode}
                                    isValidated={
                                      !validateInput(
                                        row.name,
                                        formState[row.name]?.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      )?.hasError
                                    }
                                    showValidityTick
                                    onChange={e => {
                                      onInputChange(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                    onBlur={e => {
                                      if (
                                        row.name !==
                                        IIAddressFieldNames.POSTAL_CODE
                                      ) {
                                        onFocusOut(
                                          row.name,
                                          e.target.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        );
                                      }
                                    }}
                                  />
                                  {formState[row.name].touched &&
                                    formState[row.name].hasError && (
                                      <div className={styles.errorMessage}>
                                        {formState[row.name].error}
                                      </div>
                                    )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {rows.map((row, index) => {
                          if (row.subText) {
                            return (
                              <div key={row.subText + index} className={styles.inputSubtext}>
                                {row.subText}
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}

                  <div className={styles.showHrdesktop}>
                    <ShowHR name="show" />
                  </div>
                  <div className={styles.showHrmobile}>
                    <ShowHR name="show" customClass />
                  </div>

                  <div className={styles.bigBoldText}> Shipping Address </div>

                  {addressFileds2Copy.map((rows, index) => {
                    return (
                      <div key={index} className={styles.rowWrapper}>
                        <div className={styles.row}>
                          {rows.map(row => {
                            if (row.type === "select") {
                              return (
                                <div
                                  className={styles.inputErroDiv}
                                  key={row.name}
                                >
                                  <Select
                                    key={row.name}
                                    variant={1}
                                    customStyles={styles}
                                    name={row.name}
                                    id={row.id}
                                    placeholder={row.placeholder}
                                    value={
                                      row.value || formState[row.name].value
                                    }
                                    autoComplete={row.autoComplete}
                                    inputMode={row.inputMode}
                                    selectOptions={row?.selectOptions || []}
                                    onChange={e => {
                                      onInputChange(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                    onBlur={e => {
                                      onFocusOut(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                  />
                                  {formState[row.name].touched &&
                                    formState[row.name].hasError && (
                                      <div className={styles.errorMessage}>
                                        {formState[row.name].error}
                                      </div>
                                    )}
                                </div>
                              );
                            }

                            return (
                              <>
                                <div
                                  className={styles.inputErroDiv}
                                  key={row.name}
                                >
                                  <Input
                                    key={row.name}
                                    variant={1}
                                    customStyles={styles}
                                    type={row.type}
                                    name={row.name}
                                    id={row.id}
                                    maxLength={row.maxLength}
                                    placeholder={row.placeholder}
                                    value={formState[row.name].value}
                                    autoComplete={row.autoComplete}
                                    inputMode={row.inputMode}
                                    onChange={e => {
                                      onInputChange(
                                        row.name,
                                        e.target.value,
                                        dispatch,
                                        formState,
                                        useCheckoutRes
                                      );
                                    }}
                                    onBlur={e => {
                                      if (
                                        row.name !==
                                        IIAddressFieldNames.POSTAL_CODE
                                      ) {
                                        onFocusOut(
                                          row.name,
                                          e.target.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        );
                                      }
                                    }}
                                  />
                                  {formState[row.name].touched &&
                                    formState[row.name].hasError && (
                                      <div className={styles.errorMessage}>
                                        {formState[row.name].error}
                                      </div>
                                    )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {rows.map((row, index) => {
                          if (row.subText) {
                            return (
                              <div key={row.subText + index} className={styles.inputSubtext}>
                                {row.subText}
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}

                  {/* <ShowHR name="show" /> */}

                  <Media
                    query={{ minWidth: largeScreen }}
                    render={() => (
                      <div className="cashBackStripContainer_mobile">
                        {/* {cashbackRecieve?.amount && parseFloat(cashbackRecieve?.amount) > 0 ? (
                        <div className="custom_cash">
                        <div className={styles.cashBackStripContainer}>
                          <div className={styles.cashBackStrip}>
                            <p>Get ₹ {parseInt(cashbackRecieve?.amount)} Cashback </p>
                            You will get &#8377; {parseInt(cashbackRecieve?.amount)} Cashback
                            with this order.
                          </div>
                        </div>
                      </div>
                      ) : (
                        <></>
                      )} */}
                        {/* <S.CashbackStripNew>
                        <span>Place Prepaid order to get extra </span>
                        5% Cashback
                      </S.CashbackStripNew> */}
                      </div>
                    )}
                  />
                </>
              </div>
            </form>

            <div className={styles.couponApplySection}>
              {/* <ShowHR name="show" />	 */}
              <div
                className={`${styles.couponApplyBox} ${
                  checkoutLoading || placeOrderClicked ? styles.disabledUi : ""
                }`}
              >
                <PlixLifeFcApplyCoupon
                  disableCartOpenOnApply
                  refetch={() => {
                    return null;
                  }}
                  subHeadingText={
                    isBoxInCart
                      ? "*Coupon codes are not applicable with build-your-own-box products*"
                      : ""
                  }
                  // onCouponApplyOrRemove={()=> {
                  //   handleCheckoutRecalculation()
                  // }}
                  disableCouponApply={
                    items?.some(
                      item => isBoxProduct(item) && !isComboProduct(item)
                    ) ||
                    loading ||
                    checkoutLoading ||
                    placeOrderClicked
                  }
                  newui
                />
              </div>
              {offerPolicies && Array.isArray(offerPolicies?.checkout) && (
                <S.OfferPolicyStrip>
                  {offerPolicies?.checkout?.map((policy, index) => (
                    <li key={policy + index}>{policy}</li>
                  ))}
                </S.OfferPolicyStrip>
              )}

              <div className={styles.cashback}>
                {authenticated && showCashback && !isBoxInCart ? (
                  <>
                    {userWalletBalance ? (
                      <>
                        <div
                          className={`cart-plix__cashback-login-wrapper ${
                            checkoutLoading || placeOrderClicked
                              ? styles.disabledUi
                              : ""
                          }`}
                        >
                          <div
                            className={`cart-plix__cashback-login ${
                              walletDisabled ? styles.wallet_disabled : ""
                            }`}
                          >
                            <div
                              onClick={async () => {
                                setLoading(true);
                                await handleCashbackClick();
                                // await refetch();
                                setLoading(false);
                              }}
                            >
                              <input type="checkbox" checked={useCashback} />
                              <span>Use Wallet Credit</span>
                            </div>
                            <div>
                              Avl Bal{" "}
                              <S.WalletBalance>
                                &#8377; {userWalletBalance}
                              </S.WalletBalance>
                            </div>
                          </div>
                          {walletDisabled ? (
                            <S.WalletDisabledText>
                              {walletDisableProducts?.text || ""}
                            </S.WalletDisabledText>
                          ) : (
                            <></>
                          )}
                          {useCashback &&
                            cashbackDiscount &&
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
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : showCashback && !isBoxInCart ? (
                  <div
                    className={`cart-plix__cashback-no-login  ${styles.cashbackLogin}`}
                  >
                    <div className={styles.svgAndTextWrapper}>
                      <div className="cart-plix__cashback-no-login__svg">
                        <img
                          src={imageURLReplaceWithCDN(
                            "https://plixlifefc-media.farziengineer.co/hosted/wallet-f7713882deaa.png"
                          )}
                          width="70"
                        />
                      </div>
                      <div
                        className={`cart-plix__cashback-no-login__text  ${styles.loginText}`}
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
                      className={`cart-plix__cashback-no-login__login ${styles.cashbackNoLogin} ${styles.logintextbold}`}
                      onClick={() => {
                        if (gtmConfig.loginClick.enable) {
                          customEventTrigger(gtmConfig.loginClick.value, user, {
                            cta_position: "bottom",
                          });
                        }
                        router.push(
                          getUrlWithParams("/page/login", {
                            redirect_from: "checkout",
                          })
                        );
                      }}
                    >
                      Login
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <Media
                query={{ minWidth: largeScreen }}
                render={() => (
                  <>
                    <ShowHR name="show" />
                    <S.CashbackStripNew>
                      <span>Place Prepaid order to get extra </span>
                      5% Cashback
                    </S.CashbackStripNew>
                  </>
                )}
              />
            </div>

            <div className={styles.form}>
              <S.OrderSummary
                className={styles.mobileOrderSummary}
                loading={loading || checkoutLoading || placeOrderClicked}
              >
                {(loading || checkoutLoading || placeOrderClicked) && (
                  <div className={styles.loader}>
                    <CircularProgress color="inherit" />
                  </div>
                )}
                <OrderSummary formRef={formRef} />

                <div className={styles.paymentSummaryContainerWrapper}>
                  <PaymentSummary
                    paymentSummary={locallyUpdatedPaymentSummary}
                    toggle
                    loading={loading || checkoutLoading || placeOrderClicked}
                    cashbackValue={cashbackValue}
                    cashbackLoading={
                      typeof paymentMethodChangeLoading === "boolean" &&
                      paymentMethodChangeLoading &&
                      !checkoutLoading
                    }
                  />
                </div>
              </S.OrderSummary>
              {/* <WalletCheckbox formData={checkboxFields} /> */}
              <RadioButtonCotainer formData={paymentRadioFields2} />

              <div
                className={`${styles.paymentSummaryPlaceOrderButton} ${styles.onlyLargeScreen}`}
              >
                <Input
                  variant={2}
                  type="submit"
                  value="Place Order"
                  customStyles={styles}
                  customStylesName={
                    loading || checkoutLoading || placeOrderClicked
                      ? "placeOrderButton_disable"
                      : "placeOrderButton"
                  }
                  form="checkoutAddressForm"
                  disabled={loading}
                />
              </div>

              <div className={styles.stickyButtonContainer}>
                <Input
                  variant={2}
                  type="submit"
                  value="Place Order"
                  customStyles={styles}
                  customStylesName={
                    loading || checkoutLoading || placeOrderClicked
                      ? "placeOrderButton_disable"
                      : "placeOrderButton"
                  }
                  form="checkoutAddressForm"
                  disabled={loading || checkoutLoading || placeOrderClicked}
                />
                {(loading || checkoutLoading || placeOrderClicked) && (
                  <div className={styles.loaderOnInput}>
                    <CircularProgress color="inherit" size="22px" />
                  </div>
                )}
              </div>
              <NotificationCheckbox formData={notificationCheckboxFields} />
              <Media
                query={{ maxWidth: largeScreen }}
                render={() => <CheckoutReviewCard />}
              />
            </div>
          </S.FormContainer>
        </div>

        <div className={styles.desktopSummaryWrapper}>
          <S.OrderSummary
            className={styles.desktopOrderSummary}
            loading={loading || checkoutLoading || placeOrderClicked}
          >
            {(loading || checkoutLoading || placeOrderClicked) && (
              <div className={styles.loader}>
                <CircularProgress color="inherit" />
              </div>
            )}
            <OrderSummary formRef={formRef} />

            <div className={styles.paymentSummaryContainerWrapper}>
              <PaymentSummary
                paymentSummary={locallyUpdatedPaymentSummary}
                toggle
                loading={loading || checkoutLoading || placeOrderClicked}
                cashbackValue={cashbackValue}
                cashbackLoading={
                  typeof paymentMethodChangeLoading === "boolean" &&
                  paymentMethodChangeLoading &&
                  !checkoutLoading
                }
              />
            </div>
          </S.OrderSummary>
          <div className={styles.cashbackWrapper}>
            {cashbackValue && parseInt(cashbackValue) > 0 ? (
              <div
                className={`${styles.cashBackStripContainer} ${
                  typeof paymentMethodChangeLoading === "boolean" &&
                  paymentMethodChangeLoading
                    ? styles.disabledUi
                    : ""
                }`}
              >
                <div className={styles.cashBackStrip}>
                  {typeof paymentMethodChangeLoading === "boolean" &&
                  paymentMethodChangeLoading &&
                  !checkoutLoading ? (
                    <div className={styles.cashbackstripLoader}>
                      <CircularProgress size="20px" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* <p>Get ₹ {parseInt(cashbackRecieve?.amount)} Cashback </p> */}
                  You will get &#8377; {parseInt(cashbackValue)} Cashback with
                  this order.
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <CheckoutReviewCard />
        </div>
      </div>
      {/* <CheckoutBottomSection /> */}
      <>
        <Snackbar
          open={checkoutError !== ""}
          autoHideDuration={3000}
          onClose={() => setCheckoutError("")}
        >
          <Alert severity="error">{checkoutError}</Alert>
        </Snackbar>
      </>
    </div>
  );
};

CheckoutV3.displayName = "CheckoutV3";
export default React.memo(CheckoutV3);
