import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import { IFormError } from "@types";
import { styled } from "@styles/themes";

import { ApolloQueryResult } from "apollo-client";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { setCouponPrepaidDiscountsType } from "@pages";
import round from "lodash/round";
import { CLIENT } from "Themes/config";
import { IProps } from "./types";

// import * as S from "./style";
import * as S from "./style";
import { TypedCouponPrepaidDiscount } from "./queris";

import {
  CouponPrepaidDiscount,
  CouponPrepaidDiscountVariables,
} from "./gqlTypes/CouponPrepaidDiscount";

type refetchType = (
  variables?: CouponPrepaidDiscountVariables | undefined
) => Promise<ApolloQueryResult<CouponPrepaidDiscount>>;

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

export const ApplyCoupon: React.FC<IProps> = ({
  setCouponPrepaidDiscounts,
}: IProps) => {
  const { setValue } = useLocalStorage(
    "checkoutDiscounts",
    JSON.stringify(
      getAmount({
        checkoutDiscounts: {
          __typename: "DiscountsType",
          couponDiscount: 0,
          prepaidDiscount: 0,
          cashbackDiscount: 0,
        },
        cashback: {
          __typename: "CashbackType",
          amount: 0,
          willAddOn: null,
        },
      })
    )
  );

  const { addPromoCode, removePromoCode } = useCheckout();

  const { checkout, promoCodeDiscount } = useCheckoutState();

  const { token } = checkout || { token: "" };

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const [promoCode, setpromoCode] = useState<string | undefined>("");

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
    const { dataError, data } = await addPromoCode(promoCode);
    const voucherCode = data?.promoCodeDiscount?.voucherCode;

    const errors = dataError?.error;

    if (errors) {
      setPromoCodeErrors(errors);
    } else if (!voucherCode) {
      setPromoCodeErrors([
        {
          field: "promoCode",
          message: "Promo code is invalid",
        },
      ]);
    } else {
      setpromoCode(promoCode);
      setPromoCodeErrors([]);
      refetch(token).then(res => {
        setDiscounts(res.data, setValue, setCouponPrepaidDiscounts);
      });
    }
  };

  const handleRemovePromoCode = async (
    promoCode: string,
    refetch: refetchType
  ) => {
    const { dataError } = await removePromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      setPromoCodeErrors(errors);
    } else {
      // setisCouponApplied(false);
      setpromoCode("");
      setPromoCodeErrors([]);
      refetch(token).then(res => {
        setDiscounts(res.data, setValue, setCouponPrepaidDiscounts);
      });
    }
  };

  const Input = styled.input`
    width: 30%;
    outline: none;
    border: none;
    border-bottom: 1px solid #8f8f8f;
    margin: 5px;
  `;

  const switchRender = (refetch: refetchType) => {
    if (!promoCode) {
      return (
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
          {({ handleChange }) => {
            return (
              <Form style={{ width: "100%" }}>
                <S.FormContainer>
                  <div>Coupon Code</div>
                  <Field
                    name="inputCode"
                    as={Input}
                    onChange={(e: any) => {
                      handleChange(e);
                      // setErrorMsg("");
                      setPromoCodeErrors([]);
                    }}
                  />

                  <S.Apply type="submit" value="Apply" />
                </S.FormContainer>
              </Form>
            );
          }}
        </Formik>
      );
    }
    return (
      <S.FormContainer>
        <div>Coupon Code</div>
        <div>{promoCode}</div>
        <S.Apply
          type="submit"
          value="Remove"
          onClick={() => handleRemovePromoCode(promoCode, refetch)}
        />
      </S.FormContainer>
    );
  };

  return (
    <>
      {CLIENT === "ikkai" && (
        <S.CodeDisplayBox>
          <div>Extra 5% off on prepaid orders</div>
          {/* <div> BOGO! Coupon Code B1G1 </div> */}
        </S.CodeDisplayBox>
      )}

      {promoCodeErrors.length > 0 &&
        promoCodeErrors.map(err => (
          <S.ErrorMessage>{err.message}</S.ErrorMessage>
        ))}
      {token && (
        <TypedCouponPrepaidDiscount
          variables={{
            token,
          }}
          onCompleted={data => {
            setDiscounts(
              data,
              setValue,
              setCouponPrepaidDiscounts
              // setpromoCode,
              // initialPromoCode
            );
          }}
          renderOnError
        >
          {({ data, refetch, error }) => {
            return <S.Container>{switchRender(refetch)}</S.Container>;
          }}
        </TypedCouponPrepaidDiscount>
      )}
    </>
  );
};
ApplyCoupon.displayName = "ApplyCoupon";
export default ApplyCoupon;
