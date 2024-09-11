import React, { useEffect } from "react";

import { Loader } from "@components/atoms/Loader";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

import { PROVIDERS } from "Themes/config";

import { useCheckout, useCheckoutState } from "@saleor/sdk";
import { RazorpayGateway } from "../RazorpayGateway";
import * as S from "./styles";
import { IProps } from "./types";
import { TypedOrderIdMutation } from "./mutation";
/**
 * Payment Gateways list
 */

const PaymentGatewaysList: React.FC<IProps> = ({
  loading,
  changeSubmitProgress,
  paymentGateways,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  submitPayment,
  submitPaymentSuccess,
  errors,
  onError,
}: IProps) => {
  // const { totalPrice } = useCart();

  // const { user } = useAuthState();
  const { setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();

  // @ts-ignore
  const totalPrice = checkout?.totalPrice?.gross.amount;
  //
  // const email = user?.email || checkout?.email;
  //
  // const contact = checkout?.shippingAddress?.phone;
  //
  // "🚀 ~ file: PaymentGatewaysList.tsx ~ line 36 ~ contact",
  // contact
  // );

  useEffect(() => {
    changeSubmitProgress(false);
  }, []);

  useEffect(() => {
    if (
      availableShippingMethods &&
      availableShippingMethods.length > 0 &&
      !checkout?.shippingMethod
    )
      setShippingMethod(availableShippingMethods[0].id);
  }, []);
  //
  return (
    <S.Wrapper>
      {loading && (
        <S.Loader>
          <Loader fullScreen />
        </S.Loader>
      )}
      {paymentGateways.map(({ id, name, config }, index) => {
        if (name === "Razorpay") {
          return (
            <div key={index}>
              <TypedOrderIdMutation
                variables={{
                  input: { checkoutId: checkout?.id },
                }}
              >
                {mutation => {
                  //
                  return (
                    <RazorpayGateway
                      totalPrice={totalPrice || 0}
                      config={config}
                      formRef={formRef}
                      scriptConfig={PROVIDERS.ADYEN.script}
                      styleConfig={PROVIDERS.ADYEN.style}
                      processPayment={async (token: string) => {
                        const { data, errors } = await processPayment(
                          id,
                          token
                        );
                        return { data, errors };
                      }}
                      submitPayment={submitPayment}
                      submitPaymentSuccess={submitPaymentSuccess}
                      errors={errors}
                      onError={onError}
                      mutation={mutation}
                    />
                  );
                }}
              </TypedOrderIdMutation>
            </div>
          );
        }
      })}

      {errors && <ErrorMessage errors={errors} />}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
