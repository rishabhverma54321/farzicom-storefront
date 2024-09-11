import React, { useEffect, useState } from "react";
import { IFormError, IPaymentGatewayConfig } from "@types";

import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import { Button } from "@components/atoms/Button";
// import { styled } from "@styles/themes";
import { theme } from "Themes/globalStyles/constants";
import {
  useAuth,
  useAuthState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useIsMobile } from "@hooks/useIsMobile";

import MyCustomLink from "@components/next-react/MyCustomLink";

import { META_DEFAULTS } from "Themes/config";
import * as S from "./styles";
// import { TypedOrderIdMutation } from "./mutation";

interface IResourceConfig {
  src: string;
}

export interface IRazorpayGatewayProps {
  totalPrice: number;
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Payment gateway script resource configuration.
   */
  scriptConfig: IResourceConfig;
  /**
   * Payment gateway CSS styling resource configuration.
   */
  styleConfig: IResourceConfig;
  /**
   * Method called after the form is submitted.
   */
  processPayment: (
    token: string
  ) => Promise<{
    data: any;
    errors: any;
  }>;
  /**
   * Method to call on gateway payment submission.
   */
  submitPayment: (paymentData: object) => Promise<any>;
  /**
   * Method called after succesful gateway payment submission. This is the case when no confirmation is needed.
   */
  submitPaymentSuccess: (
    order?: CompleteCheckout_checkoutComplete_order
  ) => void;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;

  mutation: () => any;
}

export const RazorpayGateway: React.FC<IRazorpayGatewayProps> = ({
  totalPrice,
  config,
  formRef,
  scriptConfig,
  styleConfig,
  processPayment,
  submitPayment,
  submitPaymentSuccess,
  errors,
  onError,
  mutation,
}) => {
  // const history = useCustomHistory();

  const { user } = useAuthState();
  const { checkout } = useCheckoutState();
  const isMobile = useIsMobile();

  const { storedValue } = useLocalStorage("email");
  //
  // "🚀 ~ file: RazorpayGateway.tsx ~ line 80 ~ storedValue",
  // storedValue
  // );
  const [disableButton, setDisableButton] = useState(false);
  const email = user?.email.toString().includes("@example.com")
    ? storedValue
    : user?.email || storedValue;
  //
  const contact = checkout?.shippingAddress?.phone;
  //

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

  async function showRazorpayModal() {
    const result = await mutation();
    const data = result.data.razorpayOrderCreate.razorpayOrder;

    const { errors: paymentErrors } = await processPayment(data.id);

    const options = {
      key: config[0].value,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: META_DEFAULTS.name,
      description: META_DEFAULTS.title,
      prefill: {
        email,
        contact,
      },
      theme: {
        color: theme.razorpayColor,
      },
      // image: "/images/ikkaiLogo.png",
      async handler(response: any) {
        //
        //

        const paymentData = {
          token: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          razorpayOrderId: response.razorpay_order_id,
        };

        submitPayment(paymentData);
        //
      },
    };

    if (!(paymentErrors && paymentErrors.length)) {
      setDisableButton(false);
      const _window = window as any;
      const paymentObject = new _window.Razorpay(options);
      paymentObject.on("payment.failed", function failed(response: any) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });
      paymentObject.open();
    } else {
      setDisableButton(true);
    }
  }
  async function displayRazorpay() {
    //
    if (
      !document.querySelectorAll(
        `script[src="https://checkout.razorpay.com/v1/checkout.js"]`
      ).length
    ) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        // alert("Razorpay SDK failed to load. Are you online?");
      }
    }
    showRazorpayModal();
  }

  useEffect(() => {
    displayRazorpay();
  }, [JSON.stringify(checkout)]);

  return (
    <>
      <S.Container>
        <S.Heading> Your Order Total is {totalPrice} </S.Heading>
        <Button
          size="md"
          testingContext="PayUsingRazorpay"
          onClick={() => showRazorpayModal()}
          disabled={disableButton}
          color="secondary"
        >
          {" "}
          Pay with Razorpay{" "}
        </Button>
        <MyCustomLink href="/checkout/address">
          <Button
            size="md"
            testingContext="goBackToCheckoutAddress"
            color="primary"
          >
            Go Back
          </Button>
        </MyCustomLink>
      </S.Container>
    </>
  );
};
RazorpayGateway.displayName = "RazorpayGateway";
export default RazorpayGateway;
