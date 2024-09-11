import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
// import { RouteComponentProps } from "react-router";

import { CheckoutPayment } from "@components/organisms/CheckoutPayment";
import { useCheckout } from "@saleor/sdk";
import { commonMessages } from "@temp/intl";
import { IFormError } from "@types";

// import { ICheckoutAddressSubpageHandles } from "./CheckoutAddressSubpage";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps {
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
  onPaymentGatewayError: (errors: IFormError[]) => void;
}

const CheckoutPaymentSubpageWithRef: RefForwardingComponent<
  ICheckoutPaymentSubpageHandles,
  IProps
> = (
  {
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
    onPaymentGatewayError,
    ...props
  }: IProps,
  ref
) => {
  const {
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout();

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const promoCodeDiscountFormId = "discount-form";
  const promoCodeDiscountFormRef = useRef<HTMLFormElement>(null);
  const intl = useIntl();

  const lengthShippingMethod = availableShippingMethods?.length;

  useEffect(() => {
    // availableShippingMethods?.map(s => {
    //   setShippingMethod(s.id)
    // })
    // checkoutAddressSubpageRef.current?.submitAddress();
    //

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);

    //

    // setShippingMethod(availableShippingMethods?[0])
  }, [lengthShippingMethod]);
  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    },
  }));

  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    }
  };
  const handleRemovePromoCode = async (promoCode: string) => {
    const { dataError } = await removePromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    }
  };
  const handleSubmitUnchangedDiscount = () => {
    if (paymentGatewayFormRef.current) {
      paymentGatewayFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    } else {
      changeSubmitProgress(false);
      onPaymentGatewayError([
        { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
      ]);
    }
  };

  // const { items } = useCart();

  // useEffect(() => {
  //   (window.dataLayer = window.dataLayer || []).push({
  //     event: "checkout",
  //     ecommerce: {
  //       checkout: {
  //         actionField: { step: "Payment page" },
  //         products: {
  //           cartItems: items,
  //         },
  //       },
  //     },
  //   });
  // });

  return (
    <CheckoutPayment
      {...props}
      promoCodeDiscountFormId={promoCodeDiscountFormId}
      promoCodeDiscountFormRef={promoCodeDiscountFormRef}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
      }}
      addPromoCode={handleAddPromoCode}
      removeVoucherCode={handleRemovePromoCode}
      submitUnchangedDiscount={handleSubmitUnchangedDiscount}
      promoCodeErrors={promoCodeErrors}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
