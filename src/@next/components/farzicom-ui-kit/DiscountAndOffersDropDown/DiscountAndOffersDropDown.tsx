import DiscountPercent from "@components/atoms/SvgIcons/DiscountPercent";
import MemoDownArrowDropdown from "@components/atoms/SvgIcons/DownArrowDropDown";
import { TypedSectionQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import { getMetadataValue, parseJson } from "@utils/misc";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  useAuth,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
  useWallet,
} from "@saleor/sdk";
import { IFormError } from "@types";
import { styled } from "@styles/themes";
import { getDBIdFromGraphqlId, getGclid } from "@temp/core/utils";
import { ApolloQueryResult } from "apollo-client";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import { showCashback } from "Themes/config";
import { CircularProgress } from "@mui/material";
import { GraphQLError } from "graphql";
import gtmConfig from "Themes/lib/gtmConfig.js";
import Alert from '@mui/material/Alert';
import { Snackbar } from "@material-ui/core";
import { ShopMetaContext } from "@temp/pages/_app";
import styles from "./index.module.scss";
import * as S from "./styles";
import NewMemoOfferShowmore from "@components/atoms/SvgIcons/OfferShowmore";

export interface IDiscountAndOffersDropDownProps {
  refetch: () => {};
  disableCouponApply?: boolean;
  couponDiscount?: number;
  subHeadingText?: any;
  onCouponApplyOrRemove?: (res?: any) => Promise<void>;
}
type refetchType = () => {};

const createErrorArray = (
  errors: readonly GraphQLError[],
  field?: string
): IFormError[] => {
  return errors.map(error => ({
    message: error.message,
    field: field || error.name,
  }));
};
export const DiscountAndOffersDropDown: React.FC<IDiscountAndOffersDropDownProps> = ({
  refetch,
  disableCouponApply,
  couponDiscount,
  onCouponApplyOrRemove,
  subHeadingText
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedCouponIndex, setselectedcouponIndex] = useState<null | number>(
    null
  );

  const {
    addPromoCode,
    removePromoCode,
    getWalletAmount,
    setUseCashback,
  } = useCheckout();
  const { checkout, promoCodeDiscount, useCashback } = useCheckoutState();
  const { user } = useAuthState();
  const { items, totalPrice } = useCartState();

  const { token } = checkout || { token: "" };

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);
  const [couponErrorMessage, setCouponErrorMessage] = useState<string>("");

  const [promoCode, setpromoCode] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const initialPromoCode = promoCodeDiscount?.voucherCode
      ? promoCodeDiscount?.voucherCode
      : "";
    setpromoCode(initialPromoCode);
  }, [promoCodeDiscount]);

  const handleAddPromoCode = async (
    promoCode: string,
    refetch: refetchType
  ) => {
    if (promoCode.length === 0) {
      return;
    }
    setLoading(true);
    if (promoCodeDiscount?.voucherCode) {
      const { errors } = await removePromoCode(promoCodeDiscount.voucherCode);
      if (errors) {
        setCouponErrorMessage("Something went wrong, please try again.");
      }
    }
    const { data, errors } = await addPromoCode(promoCode);
    setLoading(false);

    const voucherCode = data?.checkoutAddPromoCode.checkout?.voucherCode;

    if (errors) {
      setPromoCodeErrors(createErrorArray(errors));
      setpromoCode("");
    } else if (!voucherCode) {
      setPromoCodeErrors([
        {
          field: "promoCode",
          message: "Invalid Coupon code",
        },
      ]);
      setCouponErrorMessage("Invalid Coupon code");
      setpromoCode("");
    } else {
      if (clevertapEvents.couponCodeApplied.enable) {
        const clevertap = makeClevertap();
        let walletBalance = 0;

        await getWalletAmount().then(walletAmount => {
          walletBalance = walletAmount?.data?.wallet?.amount;
        });
        let totalQuantity = 0;
        items?.forEach(item => {
          totalQuantity += item.quantity;
        });

        clevertap.event.push(clevertapEvents.couponCodeApplied.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          timeStamp: Date.now(),
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          cartAmount: totalPrice?.gross?.amount,
          quantity: totalQuantity,
          walletBalance,
          couponName: promoCode,
          gaUserId: getGclid(),
        });
      }

      // Datalayer event for coupon apply
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        gtmConfig.couponCodeApplied.enable
      ) {
        window.dataLayer.push({
          event: gtmConfig.couponCodeApplied.value,
          eventCategory: gtmConfig.couponCodeApplied.value,
          eventAction: "apply_coupon_click",
          eventLabel: promoCode,
          user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
          user_type: user ? "logged_in" : "logged_out",
          product_id: items
            ?.map(item => {
              if (item.id) {
                return getDBIdFromGraphqlId(item.variant?.id, "ProductVariant");
              }
              return "";
            })
            .join("|"),
        });
      }

      setpromoCode(promoCode);
      setPromoCodeErrors([]);
      refetch();
      setExpanded(false);
      if (useCashback) {
        setUseCashback(false);
      }
    }
    if (
      onCouponApplyOrRemove &&
      typeof onCouponApplyOrRemove === "function" &&
      data?.checkoutAddPromoCode?.checkout
    ) {
      onCouponApplyOrRemove(data?.checkoutAddPromoCode.checkout);
    }
  };

  const handleRemovePromoCode = async (
    promoCode: string,
    refetch: refetchType,
    setFieldValue: any
  ) => {
    setLoading(true);
    const { data, errors } = await removePromoCode(promoCode);
    setLoading(false);

    if (errors) {
      setPromoCodeErrors(createErrorArray(errors));
    } else {
      // setisCouponApplied(false);
      if (clevertapEvents.couponCodeRemoved.enable) {
        const clevertap = makeClevertap();
        let walletBalance = 0;
        await getWalletAmount().then(walletAmount => {
          walletBalance = walletAmount?.data?.wallet?.amount;
        });
        let totalQuantity = 0;
        items?.forEach(item => {
          totalQuantity += item.quantity;
        });

        clevertap.event.push(clevertapEvents.couponCodeRemoved.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          timeStamp: Date.now(),
          pageTitle: document.title,
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          cartAmount: totalPrice?.gross?.amount,
          quantity: totalQuantity,
          walletBalance,
          couponName: promoCode,
          gaUserId: getGclid(),
        });
      }
      setpromoCode("");
      setFieldValue("inputCode", "");
      setPromoCodeErrors([]);
      refetch();
    }
    if (
      onCouponApplyOrRemove &&
      typeof onCouponApplyOrRemove === "function" &&
      data?.checkoutRemovePromoCode?.checkout
    ) {
      data?.checkoutRemovePromoCode?.checkout?.availablePaymentGateways[0]?.id;
      onCouponApplyOrRemove(data?.checkoutRemovePromoCode?.checkout);
    }
  };

  const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 45px;
  `;

  const shopMetadata = useContext(ShopMetaContext);

  const offersDataList =
    getMetadataValue(shopMetadata, "available_offers_new") &&
    parseJson(getMetadataValue(shopMetadata, "available_offers_new"));

  return (
    <>
      <div className={styles.wrapper}>
        {loading && (
          <div className={styles.loader}>
            {/* <CircularProgress color="inherit" /> */}
          </div>
        )}
        <S.CouponListBody isExpanded={expanded}>
          <div
            className={styles.head}
            onClick={() => setExpanded(currVal => !currVal)}
          >
            <div>
              <DiscountPercent />
              <h5>Discounts & Offers</h5>
              <span style={{ transform: expanded ? "rotate(180deg)" : "" }}>
                <MemoDownArrowDropdown />
              </span>
            </div>
            {couponDiscount && couponDiscount > 0 ? (
              <div>
                You saved<span>&#8377; {couponDiscount}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          {expanded && (
            <div className={styles.body}>
              <div>
                {offersDataList &&
                  Array.isArray(offersDataList) &&
                  offersDataList.map((offer, index) => {
                    const isApplied =
                      offer?.code &&
                      typeof offer.code === "string" &&
                      offer.code.toLowerCase() === promoCode;
                    return (
                      <S.CouponCard isApplied={isApplied}>
                        {offer?.title && offer?.text ? (
                          <div>
                            <S.TitleAndCodeWrapper
                              isApplied={isApplied}
                              disabled={disableCouponApply}
                            >
                              <S.OfferCode isApplied={isApplied}>
                                {offer.code}
                              </S.OfferCode>
                              <button
                                disabled={disableCouponApply}
                                onClick={() => {
                                  if (!isApplied) {
                                    handleAddPromoCode(offer?.code, refetch);
                                  }
                                }}
                              >
                                {isApplied ? "Applied" : "Apply"}
                              </button>
                              {/* <div>
                                
                              </div> */}
                            </S.TitleAndCodeWrapper>
                            <div>
                              <div className={styles.title}>{offer.title}</div>
                            </div>
                            <span
                              className={styles.tAndC}
                              onClick={() =>
                                setselectedcouponIndex(
                                  selectedCouponIndex === index ? null : index
                                )
                              }
                            >
                              T&C
                              <span>
                                <NewMemoOfferShowmore
                                  style={{
                                    transform:
                                      selectedCouponIndex === index
                                        ? "rotate(180deg)"
                                        : "",
                                  }}
                                />
                              </span>
                            </span>
                            {selectedCouponIndex === index ? (
                              <div className={styles.detail}>{offer.text}</div>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* <div className={styles.actionBox} /> */}
                      </S.CouponCard>
                    );
                  })}
              </div>
            </div>
          )}
          <>
            <Snackbar
              open={couponErrorMessage !== ""}
              autoHideDuration={3000}
              onClose={() => setCouponErrorMessage("")}
            >
              <Alert severity="error">{couponErrorMessage}</Alert>
            </Snackbar>
          </>
        </S.CouponListBody>
        <div className={styles.couponInputWrapper}>
          {promoCodeErrors.length > 0 &&
            !promoCode &&
            promoCodeErrors.map(err => {
              if (err.field === "promoCode") {
                return <S.ErrorMessage>Invalid Coupon code.</S.ErrorMessage>;
              }
              return <S.ErrorMessage>{err.message}.</S.ErrorMessage>;
            })}
          {promoCode && (
            <S.AppliedMsg>Coupon code applied successfully</S.AppliedMsg>
          )}
          <Formik
            initialValues={{
              inputCode: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (handleAddPromoCode) {
                handleAddPromoCode(values.inputCode, refetch);
              }
              setSubmitting(true);
            }}
          >
            {({ handleChange, resetForm, setFieldValue, values }) => {
              console.log("resetForm", resetForm);
              const error = promoCodeErrors.length === 0 ? "25px" : 0;
              if (promoCode && !values.inputCode)
                setFieldValue("inputCode", promoCode);
              return (
                <Form
                  style={{
                    width: "100%",
                    border: "1px solid #ebebeb",
                    borderRadius: "4px",
                  }}
                >
                  <S.FormContainer disabled={disableCouponApply}>
                    {/* <div>Coupon Code</div> */}
                    <Field
                      name="inputCode"
                      as={Input}
                      placeholder="Enter Coupon Code"
                      value={promoCode || values.inputCode}
                      onChange={(e: any) => {
                        handleChange(e);
                        // setErrorMsg("");
                        setPromoCodeErrors([]);
                      }}
                    />
                    {promoCodeErrors.length !== 0 && !promoCode ? (
                      <S.Apply
                        disabled={disableCouponApply}
                        background={disableCouponApply ? "transparent" : "#fff"}
                        color={disableCouponApply ? "#6C6C6C" : "#E95F5F"}
                        onClick={() => {
                          resetForm({ inputCode: "" });
                          setPromoCodeErrors([]);
                          setpromoCode("");
                        }}
                        as="div"
                      >
                        Change
                      </S.Apply>
                    ) : (
                      <>
                        {promoCode ? (
                          <S.Apply
                            as="div"
                            disabled={disableCouponApply}
                            background={
                              disableCouponApply ? "transparent" : "#fff"
                            }
                            color={disableCouponApply ? "#6C6C6C" : "#5DD37C"}
                            onClick={() => {
                              resetForm({ inputCode: "" });

                              setPromoCodeErrors([]);
                              setpromoCode("");
                              handleRemovePromoCode(
                                promoCode,
                                refetch,
                                setFieldValue
                              );
                            }}
                          >
                            Change
                          </S.Apply>
                        ) : (
                          <S.Apply
                            disabled={disableCouponApply}
                            type="submit"
                            background={
                              disableCouponApply ? "transparent" : "#fff"
                            }
                            color={disableCouponApply ? "#6C6C6C" : "#5DD37C"}
                          >
                            Apply
                          </S.Apply>
                        )}
                      </>
                    )}
                  </S.FormContainer>
                </Form>
              );
            }}
          </Formik>
          {subHeadingText && (
            <S.SubHeadingText>{subHeadingText}</S.SubHeadingText>
          )}
        </div>
      </div>
    </>
  );
};
DiscountAndOffersDropDown.displayName = "DiscountAndOffersDropDown";
export default DiscountAndOffersDropDown;
