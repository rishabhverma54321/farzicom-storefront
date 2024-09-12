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
// import { CLIENT } from "Themes/config";

// import * as S from "./style";
import { TypedSectionQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import { getMetadataValue, isMember, parseJson } from "@utils/misc";
import MemoMoneyBill from "@components/atoms/SvgIcons/MoneyBill";
import MemoChevronRight from "@components/atoms/SvgIcons/ChevronRight";
import { ShopMetaContext } from "@temp/pages/_app.page";
import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "./gqlTypes/CouponPrepaidDiscount";
import * as S from "./style";
import { IProps } from "./types";
import {
  InnerOverlayContextInterface2,
  OverlayContext,
  OverlayContext2,
  OverlayTheme,
  OverlayTheme2,
  OverlayType,
  OverlayType2,
} from "../../../../components";

type refetchType = () => {};

// const getAmount = (
//   data: CouponPrepaidDiscount
// ): {
//   couponAmount: number;
//   prepaidAmount: number;
//   cashbackAmount: number;
// } => {
//   return {
//     couponAmount: round(parseFloat(data.checkoutDiscounts?.couponDiscount), 2),
//     prepaidAmount: round(
//       parseFloat(data.checkoutDiscounts?.prepaidDiscount),
//       2
//     ),
//     cashbackAmount: round(
//       parseFloat(data.checkoutDiscounts?.cashbackDiscount),
//       2
//     ),
//   };
// };

// const setDiscounts = (
//   setpromoCode?: React.Dispatch<React.SetStateAction<string | undefined>>,
//   initialPromoCode?: string
// ) => {
//   if (setpromoCode) setpromoCode(initialPromoCode!);
// };

const createErrorArray = (
  errors: readonly GraphQLError[],
  field?: string
): IFormError[] => {
  return errors.map(error => ({
    message: error.message,
    field: field || error.name,
  }));
};

export const PlixLifeFcApplyCoupon: React.FC<IProps> = ({
  refetch,
  modal,
  hide,
  selectedCoupon,
  setSelectedCoupon,
  disableCouponApply,
  disableCartOpenOnApply,
  newui,
  cartUi,
  onCouponApplyOrRemove,
  recalculate = true,
  subHeadingText,
}: IProps) => {
  const {
    addPromoCode,
    removePromoCode,
    getWalletAmount,
    setUseCashback,
    checkoutRecalculation,
  } = useCheckout();

  const { checkout, promoCodeDiscount, useCashback } = useCheckoutState();
  const { user, authenticated } = useAuthState();
  const { cashbackDiscount, items, totalPrice } = useCartState();

  const { token } = checkout || { token: "" };

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const [promoCode, setpromoCode] = useState<string | undefined>(
    document.querySelector(".style__FormContainer-n2dxum-1 input")?.value || ""
  );

  const [loading, setLoading] = useState(false);
  // const [newValue, setNewValue] = useState<string | undefined>("");
  const { show } = useContext(OverlayContext2);
  const overlayCart = useContext(OverlayContext);

  const [applyCouponContext, setApplyCouponContext] = useState<
    InnerOverlayContextInterface2
  >();

  useEffect(() => {
    if (selectedCoupon) {
      applyCouponContext?.data.setValue(selectedCoupon);
      if (handleAddPromoCode) {
        handleAddPromoCode(selectedCoupon, refetch);
      }
    }
  }, [selectedCoupon]);
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
    const { data, errors } = await addPromoCode(promoCode, false, recalculate);
    setLoading(false);

    const voucherCode = data?.checkoutAddPromoCode.checkout?.voucherCode;

    if (errors) {
      setPromoCodeErrors(createErrorArray(errors));
    } else if (!voucherCode) {
      setPromoCodeErrors([
        {
          field: "promoCode",
          message: "Invalid Coupon code",
        },
      ]);
    } else {
      if (clevertapEvents.couponCodeApplied.enable) {
        if (typeof onCouponApplyOrRemove === "function") {
          onCouponApplyOrRemove();
        }
        // await checkoutRecalculation();
        const clevertap = makeClevertap();
        let walletBalance = 0;

        if (user && authenticated) {
          await getWalletAmount().then(walletAmount => {
            walletBalance = walletAmount?.data?.wallet?.amount;
          });
        }
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
          product_price: items
            ?.map(item => item.variant?.pricing?.price?.gross?.amount)
            ?.join("|"),
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
          coupon_name: voucherCode || "NA",
        });
      }

      setpromoCode(promoCode);
      setPromoCodeErrors([]);
      refetch();
      if (hide) {
        hide();
      }
      if (useCashback) {
        setUseCashback(false);
      }
      if (!disableCartOpenOnApply) {
        overlayCart.show(OverlayType.plixlifefcCart, OverlayTheme.right);
      }
    }
  };

  const handleRemovePromoCode = async (
    promoCode: string,
    refetch: refetchType,
    setFieldValue:any
  ) => {
    setLoading(true);
    const { errors } = await removePromoCode(promoCode, false, recalculate);
    setLoading(false);

    if (errors) {
      setPromoCodeErrors(createErrorArray(errors));
    } else {
      // setisCouponApplied(false);
      if (clevertapEvents.couponCodeRemoved.enable) {
        // await checkoutRecalculation();
        if (typeof onCouponApplyOrRemove === "function") {
          onCouponApplyOrRemove();
        }
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
      setFieldValue('inputCode','')
      setPromoCodeErrors([]);
      refetch();
    }
  };

  const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 45px;
  `;

  const shopMetadata = useContext(ShopMetaContext);

  const available_offers =
    getMetadataValue(shopMetadata, "available_offers_new") &&
    parseJson(getMetadataValue(shopMetadata, "available_offers_new"));

  const switchRender = (refetch: refetchType) => {
    return (
      <>
        {!modal && (
          <S.CouponHeader>
            Offers and Coupons{" "}
            <S.CouponNumer 
              onClick={() => {
                show(
                  OverlayType2.CouponOffers,
                  OverlayTheme2.modal,
                  applyCouponContext
                );
              }}
            >
              <MemoMoneyBill />
              <p>{available_offers.length} Offers</p>
              <span><MemoChevronRight /></span>
            </S.CouponNumer>
          </S.CouponHeader>
        )}
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
              const p_code =
                document.querySelector(".style__FormContainer-n2dxum-1 input")
                  ?.value || values.inputCode;
              handleAddPromoCode(p_code, refetch);
            }
            setSubmitting(true);
          }}
        >
          {({ handleChange, resetForm, setFieldValue, values }) => {
            const error = promoCodeErrors.length === 0 ? "25px" : 0;
            const ApplyCouponContext: InnerOverlayContextInterface2 = {
              data: {
                disableCartOpenOnApply,
                refetch,
                setValue: (newValueToSet: string) => {
                  setFieldValue("inputCode", newValueToSet);
                },
              },
            };
            if (!applyCouponContext) setApplyCouponContext(ApplyCouponContext);
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
                    id="applyCoupon_inputcode"
                    placeholder="Enter Coupon Code"
                    value={
                      document.querySelector(
                        ".style__FormContainer-n2dxum-1 input"
                      )?.value ||
                      promoCode ||
                      values.inputCode
                    }
                    onChange={(e: any) => {
                      handleChange(e);
                      // setErrorMsg("");
                      setPromoCodeErrors([]);
                    }}
                  />
                  {promoCodeErrors.length !== 0 && !promoCode ? (
                    <S.Apply
                      style={{ color: "#E95F5F" }}
                      onClick={() => {
                        resetForm({ inputCode: "" });
                        setPromoCodeErrors([]);
                        setpromoCode("");
                        if (setSelectedCoupon) setSelectedCoupon("");
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
                          style={
                            modal === true
                              ? {
                                  backgroundColor: "#02262A",
                                  color: "#fff",
                                  width: "40%",
                                }
                              : {}
                          }
                          onClick={() => {
                            resetForm({ inputCode: "" });

                            setPromoCodeErrors([]);
                            setpromoCode("");
                            if (setSelectedCoupon) setSelectedCoupon("");
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
                          style={
                            modal === true
                              ? {
                                  backgroundColor: "#02262A",
                                  color: disableCouponApply ? "gray" : "#fff",
                                  width: "40%",
                                  pointerEvents: disableCouponApply
                                    ? "none"
                                    : "all",
                                }
                              : {
                                  backgroundColor: disableCouponApply
                                    ? "transparent"
                                    : "#fff",
                                  color: disableCouponApply
                                    ? "#6C6C6C"
                                    : "#02262A",
                                  pointerEvents: disableCouponApply
                                    ? "none"
                                    : "all",
                                }
                          }
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
        {!modal && !cartUi && (
          <>
            {newui &&
            available_offers &&
            Array.isArray(available_offers) &&
            available_offers.length ? (
              <>
                <S.OfferWrapper
                  onClick={() => {
                    show(
                      OverlayType2.CouponOffers,
                      OverlayTheme2.modal,
                      applyCouponContext
                    );
                  }}
                >
                  <S.CouponAndTextWrapper>
                    <p>Available Offers</p>
                    <S.CouponNumer>
                      <MemoMoneyBill />
                      <p>{available_offers.length} Offers</p>
                    </S.CouponNumer>
                  </S.CouponAndTextWrapper>
                  <MemoChevronRight />
                </S.OfferWrapper>
              </>
            ) : (
              <S.ViewAllOffersButton
                onClick={() => {
                  show(
                    OverlayType2.CouponOffers,
                    OverlayTheme2.modal,
                    applyCouponContext
                  );
                  // Datalayer Event for view available offer click
                  // if (
                  //   typeof window !== "undefined" &&
                  //   window.dataLayer &&
                  //   gtmConfig.viewAvailableOfferClick.enable
                  // ) {
                  //   window.dataLayer.push({
                  //     event: gtmConfig.viewAvailableOfferClick.value,
                  //     user_id: user?.id
                  //       ? getDBIdFromGraphqlId(user?.id, "User")
                  //       : null,
                  //     user_email: user?.email,
                  //   });
                  // }
                }}
                className="viewAllOfferBtn"
              >
                View available offers
              </S.ViewAllOffersButton>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {loading && (
        <div className="cart__loader">
          <CircularProgress color="inherit" />
        </div>
      )}
      <S.Container>{switchRender(refetch)}</S.Container>
    </>
  );
};
PlixLifeFcApplyCoupon.displayName = "PlixLifeFcApplyCoupon";
export default PlixLifeFcApplyCoupon;
