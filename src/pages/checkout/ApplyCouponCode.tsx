import MemoAlertSVG from "@components/atoms/SvgIcons/AlertSVG";
import MemoCircleTick from "@components/atoms/SvgIcons/CircleTick";
import { ButtonNext } from "@components/farzicom-ui-kit/ButtonNext";
import Input from "@components/farzicom-ui-kit/Input";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import * as S from "./styles";

const ApplyCouponCode: React.FC<{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLoading }) => {
  const { addPromoCode, removePromoCode } = useCheckout();
  const { promoCodeDiscount } = useCheckoutState();
  const formRef = useRef(null);

  const initialCouponCode = promoCodeDiscount.voucherCode;

  const couponCodeMessages = {
    success: "Coupon Code Applied Successfully!",
    error: "Invalid Coupon Code!",
  };

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeResultMessage, setCouponCodeResultMessage] = useState(
    initialCouponCode
      ? { message: couponCodeMessages.success, hasError: false }
      : { message: "", hasError: false }
  );

  useEffect(() => {
    if (initialCouponCode) {
      setCouponCode(initialCouponCode);
      setCouponCodeResultMessage({
        message: couponCodeMessages.success,
        hasError: false,
      });
    } else {
      setCouponCode("");
      setCouponCodeResultMessage({
        message: "",
        hasError: false,
      });
    }
  }, [initialCouponCode]);



  const changeCouponCode = e => {
    const { value } = e.target;
    setCouponCode(value);
  };

  const applyCouponCodeSubmithandler = async e => {
    e.preventDefault();
    setLoading(true);
    if (!initialCouponCode) {
      const res = await addPromoCode(couponCode);
      const errors = res.data?.checkoutAddPromoCode?.errors;

      if (errors && errors.length) {
        setCouponCodeResultMessage({
          message: errors[0].message,
          hasError: true,
        });
      } else if (res.data.checkoutAddPromoCode.checkout.voucherCode) {
        setCouponCodeResultMessage({
          message: couponCodeMessages.success,
          hasError: false,
        });
      } else {
        setCouponCodeResultMessage({
          message: couponCodeMessages.error,
          hasError: true,
        });
      }
      setLoading(false);
    } else {
      const res = await removePromoCode(initialCouponCode);
      const errors = res.data?.checkoutRemovePromoCode?.errors;

      if (errors && errors.length) {
        setCouponCodeResultMessage({
          message: errors[0].message,
          hasError: true,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.applyCouponCodeContainer}>
      <form
        id="applyCouponForm"
        className={styles.applyCouponCode}
        onSubmit={e => applyCouponCodeSubmithandler(e)}
      >
        <Input
          variant={1}
          placeholder="Enter Coupon Code Here"
          name="couponCode"
          value={couponCode}
          onChange={changeCouponCode}
          customStyles={styles}
          customStylesName="applyCouponCodeInput"
          readOnly={initialCouponCode ? true : false}
        />

        <ButtonNext
          type="submit"
          text={initialCouponCode ? "Remove" : "Apply"}
          variant={2}
          customStyles={styles}
          customStylesName="applyCouponCodeButton"
        />
      </form>

      {couponCodeResultMessage.message && (
        <S.ApplyCouponCodeErrorMessage
          className={styles.couponCodeResultMessage}
          hasError={couponCodeResultMessage.hasError}
        >
          {couponCodeResultMessage.hasError ? (
            <MemoAlertSVG fontSize="1.2rem" />
          ) : (
            <MemoCircleTick fontSize="1.2rem" />
          )}

          <span> {couponCodeResultMessage.message} </span>
        </S.ApplyCouponCodeErrorMessage>
      )}
    </div>
  );
};

export default ApplyCouponCode;
