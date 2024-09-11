import React, { useContext, useEffect, useState } from "react";
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
import { getGclid } from "@temp/core/utils";
import { ApolloQueryResult } from "apollo-client";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { setCouponPrepaidDiscountsType } from "@pages";
import round from "lodash/round";
import { CircularProgress } from "@mui/material";

// import { CLIENT } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import { IProps } from "./types";

// import * as S from "./style";
import * as S from "./style";
import { TypedCouponPrepaidDiscount } from "./queris";
import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "./gqlTypes/CouponPrepaidDiscount";
import { GraphQLError } from "graphql";
import {
  InnerOverlayContextInterface2,
  OverlayContext2,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../../../components";

type refetchType = () => {};
const getAmount = (
  data: CouponPrepaidDiscount
): {
  couponAmount: number;
  prepaidAmount: number;
  cashbackAmount: number;
} => {
  return {
    couponAmount: round(parseFloat(data.checkoutDiscounts?.couponDiscount), 2),
    prepaidAmount: round(
      parseFloat(data.checkoutDiscounts?.prepaidDiscount),
      2
    ),
    cashbackAmount: round(
      parseFloat(data.checkoutDiscounts?.cashbackDiscount),
      2
    ),
  };
};

const setDiscounts = (
  data: CouponPrepaidDiscount,
  setValue: (value: any) => void,
  setCouponPrepaidDiscounts: setCouponPrepaidDiscountsType,
  setpromoCode?: React.Dispatch<React.SetStateAction<string | undefined>>,
  initialPromoCode?: string
) => {
  const checkoutDiscounts = getAmount(data);
  setValue(JSON.stringify(checkoutDiscounts));
  setCouponPrepaidDiscounts(checkoutDiscounts);
  //
  //   "🚀 ~ file: ApplyCoupon.tsx ~ line 59 ~ checkoutDiscounts",
  //   checkoutDiscounts
  // );

  //
  //   "🚀 ~ file: ApplyCoupon.tsx ~ line 67 ~ initialPromoCode",
  //   initialPromoCode
  // );

  if (setpromoCode) setpromoCode(initialPromoCode!);

  // if (checkoutDiscounts.couponAmount === 0 && setpromoCode) setpromoCode("");
};

const createErrorArray = (
  errors: readonly GraphQLError[],
  field?: string
): IFormError[] => {
  return errors.map(error => ({
    message: error.message,
    field: field || error.name,
  }));
};

export const LotusApplyCoupon: React.FC<IProps> = ({ refetch }: IProps) => {
  // const { setValue } = useLocalStorage(
  //   "checkoutDiscounts",
  //   JSON.stringify(
  //     getAmount({
  //       checkoutDiscounts: {
  //         __typename: "DiscountsType",
  //         couponDiscount: 0,
  //         prepaidDiscount: 0,
  //         cashbackDiscount: 0,
  //       },
  //       cashback: {
  //         __typename: "CashbackType",
  //         amount: 0,
  //         willAddOn: null,
  //       },
  //     })
  //   )
  // );

  const { addPromoCode, removePromoCode, getWalletAmount } = useCheckout();

  const { checkout, promoCodeDiscount } = useCheckoutState();
  const { user, authenticated } = useAuthState();
  const { items, totalPrice } = useCartState();

  const { token } = checkout || { token: "" };

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const [promoCode, setpromoCode] = useState<string | undefined>("");

  const [loading, setLoading] = useState(false);

  const [applyCouponContext, setApplyCouponContext] = useState<
    InnerOverlayContextInterface2
  >();

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
    const { data, errors } = await addPromoCode(promoCode);
    setLoading(false);

    const voucherCode = data?.checkoutAddPromoCode?.checkout?.voucherCode;

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
          cartAmount: totalPrice?.net?.amount,
          quantity: totalQuantity,
          walletBalance,
          couponName: promoCode,
          gaUserId: getGclid(),
        });
      }
      setpromoCode(promoCode);
      setPromoCodeErrors([]);
      refetch();
    }
  };

  const handleRemovePromoCode = async (
    promoCode: string,
    refetch: refetchType
  ) => {
    setLoading(true);
    const { errors } = await removePromoCode(promoCode);
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

        clevertap.event.push(clevertapEvents.couponCodeApplied.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          timeStamp: Date.now(),
          pageTitle: document.title,
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          quantity: totalQuantity,
          walletBalance,
          couponName: promoCode,
          gaUserId: getGclid(),
        });
      }
      setpromoCode("");
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

  const switchRender = (refetch: refetchType) => {
    if (!promoCode) {
      return (
        <>
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
              const error = promoCodeErrors.length === 0 ? "25px" : 0;
              const ApplyCouponContext: InnerOverlayContextInterface2 = {
                data: {
                  refetch,
                  setValue: (newValueToSet: string) => {
                    setFieldValue("inputCode", newValueToSet);
                  },
                },
              };
              if (!applyCouponContext)
                setApplyCouponContext(ApplyCouponContext);
              if (promoCode && !values.inputCode)
                setFieldValue("inputCode", promoCode);
              return (
                <Form
                  style={{
                    width: "100%",
                    paddingBottom: `2px`,
                    border:
                      promoCodeErrors.length !== 0
                        ? "1px solid #E95F5F"
                        : "none",
                  }}
                >
                  <S.FormContainer>
                    {/* <div>Coupon Code</div> */}
                    <Field
                      name="inputCode"
                      as={Input}
                      placeholder="Enter Coupon Code"
                      onChange={(e: any) => {
                        handleChange(e);
                        // setErrorMsg("");
                        setPromoCodeErrors([]);
                      }}
                    />
                    {promoCodeErrors.length !== 0 ? (
                      <S.Apply
                        style={{ color: "#E95F5F" }}
                        onClick={() => {
                          resetForm();
                          setPromoCodeErrors([]);
                          setpromoCode("");
                        }}
                        as="div"
                      >
                        x
                      </S.Apply>
                    ) : (
                      <S.Apply type="submit">Apply</S.Apply>
                    )}
                  </S.FormContainer>
                </Form>
              );
            }}
          </Formik>
          <OverlayContext.Consumer>
            {overlayContext => {
              return (
                <>
                  <S.ViewAllOffersButton
                    onClick={() => {
                      overlayContext.show(
                        OverlayType.CouponOffers,
                        OverlayTheme.right,
                        applyCouponContext
                      );
                    }}
                    className="viewAllOfferBtn"
                  >
                    VIEW ALL OFFERS
                  </S.ViewAllOffersButton>
                </>
              );
            }}
          </OverlayContext.Consumer>
        </>
      );
    }

    return (
      <>
        <S.FormContainer>
          <input type="text" value={promoCode} />
          <S.Apply
            type="submit"
            value="Remove"
            onClick={() => handleRemovePromoCode(promoCode, refetch)}
          >
            X
          </S.Apply>
        </S.FormContainer>

        <S.AppliedMsg>Coupon code applied successfully</S.AppliedMsg>
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
      {promoCodeErrors.length > 0 &&
        promoCodeErrors.map(err => {
          if (err.field === "promoCode") {
            return <S.ErrorMessage>Invalid Coupon code.</S.ErrorMessage>;
          }
          return <S.ErrorMessage>{err.message}.</S.ErrorMessage>;
        })}
    </>
  );
};
LotusApplyCoupon.displayName = "LotusApplyCoupon";
export default LotusApplyCoupon;
