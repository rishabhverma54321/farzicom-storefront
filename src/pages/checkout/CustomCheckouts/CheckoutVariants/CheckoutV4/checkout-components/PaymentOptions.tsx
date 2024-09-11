import MemoGreenTickSvg from "@components/atoms/SvgIcons/GreenTickSvg";
import MemoPaySVG from "@components/atoms/SvgIcons/PaySVG";
import MemoVerifiedGreenTick from "@components/atoms/SvgIcons/VerifiedGreenTick";
import MemoVerifiedGreyTick from "@components/atoms/SvgIcons/VerifiedGreyTIck";
import Input from "@components/farzicom-ui-kit/Input";
import { useWindowWidth } from "@hooks";
import { useCartState, useCheckout, useCheckoutState } from "@saleor/sdk";
import {
  constructPaymentUri,
  DEFAULT_BANKS,
  DEFAULT_WALLETS,
  IAddressField,
  IIAddressFieldNames,
  NETBANKING_OPTIONS,
  PaymentMethods,
  PaymentModes,
  PaymentModeType,
  UPI_APP_BUTTONS,
  UPI_APP_NAMES,
} from "@temp/pages/checkout/formUtilsNew";
import {
  JUSPAY_MERCHANT_ID,
  PREV_CHECKOUT_TOTAL,
} from "@temp/themes/plixlifefc/config";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MemoSideArrowIcon from "@components/atoms/SvgIcons/SideArrowIcon";
import MemoBackArrow from "@components/atoms/SvgIcons/BackArrow";
import MemoCheckoutUpiIcons from "@components/atoms/SvgIcons/CheckoutUpiIcons";
import MemoCheckoutCardsIcon from "@components/atoms/SvgIcons/CheckoutCardsIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoPaymentCardIcon from "@components/atoms/SvgIcons/PaymentCartIcon";
import { getMetadataValue, parseJson, sleep, useImageURLReplaceWithCDN } from "@utils/misc";
import { useRouter } from "next/router";
import MemoRupeeWithArrow from "@components/atoms/SvgIcons/RupeeWithArrowIcon";
import { CreatePaymentInput } from "@saleor/sdk/dist/apollo/types/checkout";
import { CircularProgress } from '@mui/material';
import MemoCartClose from "images/lotus-new/CartClose";
import styles from "../index.module.scss";
import styles2 from "../index-2.module.scss";
import * as S from "../../../../styles";
import newStyles from "./index.module.scss";
import { ShopMetaContext } from "@temp/pages/_app";

// export const PaymentOptionIcon: React.FC<{ paymentMode: PaymentModeType }> = ({
//   paymentMode,
// }) => {
//   switch (paymentMode) {
//     case "UPI":
//       return <MemoCheckoutUpiIcons />;
//     case "card":
//       return <MemoCheckoutCardsIcon />;

//     default:
//       return <></>;
//   }
// };

export const RadioLabel = ({
  row,
  totals,
  paymentMode,
  cashbackStripData,
  checkoutPaymentMethod,
  currentCheckoutTotalCashback,
}) => {
  const totalAmount =
    row?.value === PaymentModes.COD ? totals?.cod : totals?.prepaid;

  let cashbackTextStrip;

  if (row?.value === PaymentModes.COD) {
    cashbackTextStrip = "Get only 5% cashback";
  } else if (
    typeof totals?.prepaidCashback === "number" &&
    Math.round(totals?.prepaidCashback) > 0
  ) {
    cashbackTextStrip = `Get Rs. ${Math.round(
      totals?.prepaidCashback
    )} + Extra 5% as cashback`;
  }

  const subLabel =
    cashbackStripData?.paymentSubtexts &&
    cashbackStripData?.paymentSubtexts[row?.value];

  return (
    <div className={newStyles.paymentLabelContainer}>
      <div>
        {totalAmount && typeof totalAmount === "number" ? (
          <div className={newStyles.checkoutTotal}>
            <span>&#8377;{Math.round(totalAmount)}</span>
            {cashbackTextStrip ? (
              <span className={newStyles.discountPercentStrip}>
                {cashbackTextStrip}
              </span>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className={newStyles.paymentLabel}> {row.label} </div>
        {subLabel && (
          <div className={newStyles.paymentSubLabel}> {subLabel} </div>
        )}
      </div>
      <div className={newStyles.paymentIconsWrapper}>
        {row?.meta?.labelIconLink && (
          <div className={newStyles.paymentLabelIcon}>
            <CachedImage url={row?.meta?.labelIconLink} />
          </div>
        )}
        <MemoSideArrowIcon />
      </div>
    </div>
  );
};

export const PaymentOptions: React.FC<{
  formData: Array<IAddressField>;
  handleRadioClick: (value: string) => Promise<void>;
  paymentMode: PaymentModeType;
  setCheckoutError: React.Dispatch<React.SetStateAction<string>>;
  selectedWallet: string;
  setSelectedWallet: React.Dispatch<React.SetStateAction<string>>;
  paymentStep: number;
  setPaymentStep: React.Dispatch<React.SetStateAction<number>>;
  upiValue: string;
  setUpiValue: React.Dispatch<React.SetStateAction<string>>;
  upiValueError: {
    upiAddress: string;
    hasError: boolean;
  };
  setUpiValueError: React.Dispatch<
    React.SetStateAction<{
      upiAddress: string;
      hasError: boolean;
    }>
  >;
  juspayOrderId: {
    orderId: string;
    id: string;
  };
  juspayFormElement: any;
  setSelectedNB: React.Dispatch<React.SetStateAction<string>>;
  selectedNB: string;
  checkoutTotals: {
    cod: number;
    prepaid: number;
    prepaidCashback: number;
  };
  createJuspayOrderAndPaymentParams: any;
  setCheckoutLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formSubmitHandler: (e: any) => Promise<void>;
  isLoading: boolean;
  cashbackStripData: any;
  setPlaceOrderClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  placeOrderClicked?: boolean;
  paymentMethodChangeLoading?: boolean | "initial";
  radioState: any;
  setPaymentMode: React.Dispatch<React.SetStateAction<PaymentModeType>>;
}> = ({
  formData,
  handleRadioClick,
  paymentMode,
  setCheckoutError,
  selectedWallet,
  setSelectedWallet,
  paymentStep,
  setPaymentStep,
  upiValue,
  setUpiValue,
  upiValueError,
  setUpiValueError,
  juspayOrderId,
  juspayFormElement,
  selectedNB,
  setSelectedNB,
  checkoutTotals,
  createJuspayOrderAndPaymentParams,
  setCheckoutLoading,
  formSubmitHandler,
  isLoading,
  cashbackStripData,
  setPlaceOrderClicked,
  placeOrderClicked,
  paymentMethodChangeLoading,
  radioState,
  setPaymentMode,
}) => {
  const { checkout, availablePaymentGateways } = useCheckoutState();
  const {
    juspayVpaVerify,
    getCheckoutTotals,
    checkJuspayOrderStatus,
    createPayment,
    completeCheckout,
    checkoutRecalculation,
  } = useCheckout();
  const paymentSummary = useCartState();
  const router = useRouter();
  const [showWaitingScreen, setshowWaitingScreen] = useState(false);
  const [showPaymentFailed, setShowPaymentFailed] = useState(false);
  // const [paymentUriParams, setPaymentUriParams] = useState<string | null>(null);
  const [attempts, setAttemts] = useState<number>(0);
  const [paymentStatusCheck, setPaymetStatusCheck] = useState<
    null | "SUCCESS" | "FAILED"
  >(null);
  const [intervalFnValue, setIntervalFnValue] = useState<number | null>(null);

  const createAndInitiatePayment = async (orderId, submit_form?: boolean) => {
    const createPaymentInput: CreatePaymentInput = {
      gateway: availablePaymentGateways[0]?.id,
      token: orderId,
    };
    const recalculateCheckoutRes = await checkoutRecalculation();

    const createPaymentRes = await createPayment(createPaymentInput);
    const createPaymentResErrorMessage =
      (createPaymentRes?.errors && createPaymentRes?.errors[0]?.message) ||
      (createPaymentRes?.data?.checkoutPaymentCreate?.errors &&
        createPaymentRes?.data?.checkoutPaymentCreate?.errors[0]?.message);
    if (createPaymentResErrorMessage) {
      setCheckoutError(createPaymentResErrorMessage);
      return createPaymentResErrorMessage;
    }
    if (submit_form) {
      juspayFormElement?.submit_form();
    }
    if (paymentMode !== "card") {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    if (
      juspayOrderId &&
      juspayOrderId?.orderId &&
      juspayOrderId?.id &&
      paymentStep === 2
    ) {
      setCheckoutLoading(true);
      createAndInitiatePayment(juspayOrderId?.id, true);
    }
  }, [juspayOrderId]);

  useEffect(() => {
    // Show Error and Remove error message from url param if error is encountered in payment
    if (router?.isReady && router?.query?.errorMessage && !showPaymentFailed) {
      // setCheckoutError(router?.query?.errorMessage);
      setShowPaymentFailed(true);
      router.push(
        {
          query: {},
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        }
      );
    }
  }, [router?.isReady]);

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

  const headerText =
    paymentStep === 1
      ? ""
      : formData &&
        Array.isArray(formData) &&
        formData.find(item => item.value === paymentMode)?.subText;

  const ShopMetaContextValueCheckout = useContext(ShopMetaContext);

  const codChargeProduct =
    getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product") &&
    parseJson(
      getMetadataValue(ShopMetaContextValueCheckout, "cod_charge_product")
    );

  const checkOrderStatus = async () => {
    console.log("paymentStatusCheck", paymentStatusCheck, attempts);
    // if (!paymentStatusCheck && attempts < 3) {
    // Check order status
    setCheckoutLoading(true);
    const orderStatusData = await checkJuspayOrderStatus();
    setAttemts(prev => prev + 1);
    if (
      orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.status ===
        "CHARGED" &&
      orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.id
    ) {
      if (intervalFnValue) {
        clearInterval(intervalFnValue);
        if (typeof window !== "undefined") {
          localStorage.removeItem(PREV_CHECKOUT_TOTAL);
        }
      }
      //  isCharged = true;
      //  orderId =
      //    orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.orderId;
      setPaymetStatusCheck("SUCCESS");

      const paymentData = {
        token: orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.id,
        juspayOrderId:
          orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.orderId,
      };
      const completeCheckoutRes = await completeCheckout({
        paymentData,
      });
      if (
        !(completeCheckoutRes.errors && completeCheckoutRes.errors.length) &&
        completeCheckoutRes.data.checkoutComplete.order?.id
      ) {
        router?.push("/order-placed");
      } else {
        setPaymentStep(1);
        setCheckoutError(
          "Failed to complete your order, if any money is deducted it will be refunded."
        );
      }
      setCheckoutLoading(false);
    } else if (
      orderStatusData?.data?.juspayOrderStatusCheck?.juspayOrder?.status !==
      "PENDING_VBV"
    ) {
      if (intervalFnValue) {
        clearInterval(intervalFnValue);
        if (typeof window !== "undefined") {
          localStorage.removeItem(PREV_CHECKOUT_TOTAL);
        }
      }
      setPaymentStep(1);
      setPaymetStatusCheck("FAILED");
      setCheckoutLoading(false);
      setShowPaymentFailed(true);
      // setCheckoutError(
      //   "We failed to detect any payment from your end, if your money is deducted, it will be refunded."
      // );
      //  await sleep(5000);
    }
    // }
  };

  const generateSdkParamsAndCreatePayment: (
    upi_app
  ) => void = async upi_app => {
    setCheckoutLoading(true);
    // setPaymentUriParams(null);
    const params = await createJuspayOrderAndPaymentParams();
    if (params?.id && typeof window !== "undefined" && !params?.hasError) {
      // Generates  payment uri from payment params based on the chosen app.
      const appPaymentUri = constructPaymentUri(upi_app, params);
      if (appPaymentUri && upi_app && typeof window !== "undefined") {
        console.log(appPaymentUri);
        // window.open(appPaymentUri, "_blank");
        window.location.assign(appPaymentUri);
        setshowWaitingScreen(true);
        // Polling
        setIntervalFnValue(setInterval(checkOrderStatus, 5000));
        // const paymentErrorText = await createAndInitiatePayment(params?.id);
        // setPaymentUriParams(params);
      } else {
        setCheckoutError("Failed to initiate payment, please try again.");
      }

      // Polling
      // setIntervalFnValue(setInterval(checkOrderStatus, 35000));
      // await checkOrderStatus();
    } else {
      setCheckoutError("Failed to initiate payment, please try again.");
    }
    setCheckoutLoading(false);
    // setshowWaitingScreen(false);
    // setCheckoutLoading(false);
  };
  useEffect(() => {
    if (paymentStatusCheck || attempts > 20) {
      if (intervalFnValue) {
        clearInterval(intervalFnValue);
        if (typeof window !== "undefined") {
          localStorage.removeItem(PREV_CHECKOUT_TOTAL);
        }
      }
      if (attempts > 20) {
        setCheckoutError("Payment failed, please try again.");
      }
      setAttemts(0);
      setPaymetStatusCheck(null);
      setshowWaitingScreen(false);
      setCheckoutLoading(false);
      setPaymentStep(1);
    } else if (paymentStep !== 2) {
      setAttemts(0);
      setPaymetStatusCheck(null);
      setshowWaitingScreen(false);
      setCheckoutLoading(false);
      if (intervalFnValue) {
        clearInterval(intervalFnValue);
      }
    }
  }, [paymentStatusCheck, attempts, paymentStep]);

  useEffect(() => {
    return () => {
      if (intervalFnValue) {
        clearInterval(intervalFnValue);
      }
    };
  }, [intervalFnValue]);

  // useEffect(() => {
  //   if (
  //     paymentStep === 2 &&
  //     paymentMode === "UPI" &&
  //     typeof window !== "undefined" &&
  //     window.innerWidth < 992
  //   ) {
  //     generateSdkParamsAndCreatePayment();
  //   }
  // }, [paymentStep, paymentMode]);

  const prepaidSavingAmount =
    typeof checkoutTotals?.cod === "number" &&
    typeof checkoutTotals?.prepaid === "number" &&
    checkoutTotals?.cod > checkoutTotals?.prepaid &&
    checkoutTotals?.cod - checkoutTotals?.prepaid;

  console.log(
    "paymentoptiosss",
    isLoading,
    paymentMethodChangeLoading,
    placeOrderClicked
  );

  return (
    <S.RadioContainer
      className={styles.radioContainer}
      fullOpacity
      disabled={
        isLoading &&
        !showWaitingScreen &&
        !(paymentMode === "cod" && paymentStep === 2) &&
        !(paymentMode === "UPI" && paymentStep === 2)
      }
    >
      <div className={newStyles.paymentSectionHeader}>
        {" "}
        {paymentStep > 1 && (
          <span
            className={newStyles.paymentBackButton}
            onClick={() => {
              setPaymentStep(prev_value =>
                prev_value > 1 ? prev_value - 1 : 1
              );
            }}
          >
            <MemoBackArrow />
          </span>
        )}{" "}
        <span>{headerText}</span>
        {paymentStep === 1 && cashbackStripData?.extraCbOnPrepaidText ? (
          <div
            className={`${styles.cashBackStripContainer} ${newStyles.extraCbForPrepaidStrip}`}
          >
            <div className={styles.cashBackStrip}>
              <MemoRupeeWithArrow />
              <span> {cashbackStripData?.extraCbOnPrepaidText}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {showPaymentFailed &&
      paymentSummary?.totalPrice?.gross?.amount > 0 &&
      paymentSummary?.items?.length ? (
        <>
          <div className={newStyles.modalBackground} />

          <div className={newStyles.codModalWrapper}>
            <div className={newStyles.codModalHeader}>
              Transaction Failed
              <span
                onClick={() => {
                  setPaymentStep(1);
                  setShowPaymentFailed(false);
                }}
              >
                <MemoCartClose height={16} width={16} />
              </span>
            </div>
            <div className={newStyles.codModalContent}>
              <div className={newStyles.codInfoWrapper}>
                <div>
                  Payment for &#8377;
                  {paymentSummary?.totalPrice?.gross?.amount} for{" "}
                  {paymentSummary.items.length} items
                </div>
                <div>
                  Any amount deducted will be refunded within 2-4 days. How
                  would you like to proceed?
                </div>
              </div>
              <>
                <div className={styles.payonlineButton}>
                  <Input
                    variant={2}
                    onClick={() => {
                      setPaymentStep(1);
                      setShowPaymentFailed(false);
                    }}
                    type="button"
                    value="TRY OTHER PAYMENT METHODS"
                    customStyles={styles}
                    customStylesName={
                      !isLoading
                        ? "placeOrderButton"
                        : "placeOrderButton--disable"
                    }
                    form="checkoutAddressForm"
                    disabled={isLoading}
                  />
                </div>
              </>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {paymentStep === 1 ? (
        <>
          {formData.map((row, index) => {
            return (
              <div
                className={`${styles.paymentButton}`}
                key={index}
                style={{
                  backgroundColor:
                    row?.value === PaymentModes.UPI ||
                    row?.value === PaymentModes.UPI_GOKWIK
                      ? "#06543D"
                      : "",
                }}
              >
                <div className={styles2.paymentRadioWrapper}>
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={() => {
                      if (!(row?.gateway === radioState)) {
                        handleRadioClick(row.value);
                      } else {
                        setPaymentMode(row.value);
                        setPaymentStep(2);
                      }
                    }}
                  >
                    <Input
                      key={row.name}
                      label={
                        <RadioLabel
                          row={row}
                          totals={checkoutTotals}
                          paymentMode={row.value}
                          cashbackStripData={cashbackStripData}
                          checkoutPaymentMethod={
                            checkout?.availablePaymentGateways &&
                            checkout?.availablePaymentGateways[0].id
                          }
                          currentCheckoutTotalCashback={
                            paymentSummary?.cashbackRecieve?.amount
                          }
                        />
                      }
                      checked={row?.value === paymentMode}
                      variant={1}
                      customStyles={styles}
                      customStylesName="radioInputContainer"
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      value={row?.value}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className={newStyles.juspayFormMobile}>
            <form
              className="juspay_inline_form"
              id="payment_form"
              name="payment_form"
              onKeyDown={e => {
                // Prevent form submit on enter press
                const key = e.charCode || e.keyCode;
                if (key == 13) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="hidden"
                className="merchant_id"
                value={JUSPAY_MERCHANT_ID}
              />
              <input
                type="hidden"
                className="order_id"
                value={juspayOrderId?.orderId}
              />

              <input
                type="hidden"
                className="payment_method_type"
                value={paymentMode}
              />
              {paymentMode === "UPI" && (
                <>
                  {showWaitingScreen ? (
                    <div className={newStyles.upiWaitingScreen}>
                      <div className="waitingScreenLoader">
                        <span />
                      </div>
                      <span>Hold On!</span>
                      <p>We are verifying your payment status.</p>
                      <small>
                        If you are not redirected to order confirmation page in
                        5 seconds after payment then please click on retry
                        payment.
                      </small>
                      <button
                        className={newStyles.upiRetryButton}
                        onClick={() => {
                          if (intervalFnValue) {
                            clearInterval(intervalFnValue);
                          }
                          setAttemts(0);
                          setPaymetStatusCheck(null);
                          setshowWaitingScreen(false);
                          setCheckoutLoading(false);
                        }}
                      >
                        Retry payment
                      </button>
                      <div className={newStyles.tcPrivacy}>T&C | Privacy</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={newStyles.upiAppsMobileOnly}>
                    <div className={newStyles.upiAppsWrapper}>
                      {(isLoading ||
                        paymentMethodChangeLoading ||
                        placeOrderClicked) &&
                      !showWaitingScreen ? (
                        <div className={newStyles.upiAppsLoader}>
                          <CircularProgress color="inherit" />
                        </div>
                      ) : (
                        <></>
                      )}
                      {UPI_APP_BUTTONS.map(appButton => {
                        return (
                          <S.UpiButton
                            type="button"
                            phonepe={appButton.name === UPI_APP_NAMES.PHONEPE}
                            disabled={
                              isLoading ||
                              paymentMethodChangeLoading ||
                              placeOrderClicked
                            }
                            onClick={() => {
                              // const a = window.open();
                              if (juspayOrderId && appButton.name) {
                                // Generates  payment uri from payment params based on the chosen app.
                                try {
                                  generateSdkParamsAndCreatePayment(
                                    appButton.name
                                  );
                                  // checkOrderStatus();
                                } catch (err) {
                                  console.log("Error encountered", err);
                                }
                              } else {
                                setCheckoutError("Failed to initiate payment");
                              }
                            }}
                          >
                            <img src={useImageURLReplaceWithCDN(appButton.img)} />
                            <span>{appButton.name}</span>
                          </S.UpiButton>
                        );
                      })}
                    </div>
                    <div className={newStyles.upiDivider}>
                      <span />
                      <strong>OR</strong>
                      <span />
                    </div>
                  </div>
                  <div className={newStyles.upiSectionHeader}>
                    We will send a payment request to your upi id.
                  </div>
                  <div className={newStyles.upiInputWrapper}>
                    <input
                      type="text"
                      className={`${newStyles.upiInput} upi_vpa`}
                      placeholder="example@oksbi"
                      value={upiValue}
                      onChange={e => setUpiValue(e.target.value)}
                    />
                    <span className={newStyles.trailingIcon}>
                      {upiValueError?.upiAddress === upiValue &&
                      !upiValueError?.hasError ? (
                        <MemoVerifiedGreenTick height={14} width={16} />
                      ) : (
                        <MemoVerifiedGreyTick height={14} width={16} />
                      )}
                    </span>
                  </div>
                  {upiValueError?.upiAddress === upiValue &&
                  !upiValueError?.hasError ? (
                    <></>
                  ) : (
                    <div className={newStyles.upiVerifyWrapper}>
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          verifyUpiAddress();
                        }}
                      >
                        Verify UPI Address
                      </button>{" "}
                    </div>
                  )}

                  <input type="hidden" className="payment_method" value="UPI" />
                  <input
                    type="hidden"
                    className="txn_type"
                    value="UPI_COLLECT"
                  />
                </>
              )}
              {paymentMode === "card" && (
                <>
                  <div className={newStyles.addNewCardWrapper}>
                    <div className={newStyles.cardDetailsHeader}>
                      Enter card details
                    </div>
                    <div className={newStyles.cardInputWrapper}>
                      <div>Full Name</div>
                      <div className="name_on_card_div" />
                    </div>
                    <div className="name_on_card_div" />
                    <div className={newStyles.cardInputWrapper}>
                      <div>Card Number</div>
                      <div className="card_number_div" />
                    </div>
                    <div className={newStyles.cardInputRow}>
                      <div className={newStyles.cardInputWrapper}>
                        <div>Valid through</div>
                        <div className={newStyles.cardExpiryWrapper}>
                          <div className="card_exp_month_div" /> <div>/</div>
                          <div className="card_exp_year_div" />
                        </div>
                      </div>
                      <div className={newStyles.cardInputWrapper}>
                        <div>Enter CVV</div>
                        <div className={newStyles.cardInputRow}>
                          <div className="security_code_div" />
                          <MemoPaymentCardIcon width={24} height={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {paymentMode === "cod" && (
                <>
                  <div className={newStyles.modalBackground} />

                  <div className={newStyles.codModalWrapper}>
                    <div className={newStyles.codModalHeader}>
                      Confirm Cash On Delivery{" "}
                      <span
                        onClick={() => {
                          setPaymentStep(1);
                        }}
                      >
                        <MemoCartClose height={16} width={16} />
                      </span>
                    </div>
                    <div className={newStyles.codModalContent}>
                      <div className={newStyles.codInfoWrapper}>
                        {checkoutTotals?.cod ? (
                          <div>
                            Please confirm your COD order of &#8377;{" "}
                            {checkoutTotals?.cod} (Including Rs.
                            {codChargeProduct?.price} for Seed Paper){" "}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
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
                              !(isLoading || placeOrderClicked)
                                ? paymentStep === 2
                                  ? "payonlinebuttonclass"
                                  : "placeOrderButton"
                                : paymentStep === 2
                                ? "payonlinebuttonclass"
                                : "placeOrderButton--disable"
                            }
                            form="checkoutAddressForm"
                            disabled={isLoading || placeOrderClicked}
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
                              !(isLoading || placeOrderClicked)
                                ? paymentStep === 2
                                  ? "payonlinebuttonclass"
                                  : "placeOrderButton"
                                : paymentStep === 2
                                ? "payonlinebuttonclass"
                                : "placeOrderButton--disable"
                            }
                            form="checkoutAddressForm"
                            disabled={isLoading || placeOrderClicked}
                          />
                        </div>
                        {paymentStep === 2 && prepaidSavingAmount ? (
                          <>
                            <div className={styles.payonlineButton}>
                              <Input
                                variant={2}
                                onClick={() => {
                                  setPaymentStep(1);
                                }}
                                type="button"
                                value={`Pay online now & save ${Math.round(
                                  prepaidSavingAmount
                                )}`}
                                customStyles={styles}
                                customStylesName={
                                  !(isLoading || placeOrderClicked)
                                    ? "placeOrderButton"
                                    : "placeOrderButton--disable"
                                }
                                form="checkoutAddressForm"
                                disabled={isLoading || placeOrderClicked}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    </div>
                  </div>
                </>
              )}
              {paymentMode === "NB" && (
                <div className={newStyles.netbankingFormWrapper}>
                  <div className={newStyles.nbBanks}>
                    {DEFAULT_BANKS.map(bank => {
                      const isSelected = bank.value === selectedNB;
                      return (
                        <button
                          style={{
                            border: isSelected
                              ? "1px solid lightgray"
                              : "1px solid transparent",
                            borderRadius: "4px",
                          }}
                          type="button"
                          onClick={() => {
                            setSelectedNB(bank.value);
                            // if (nbSelectRef?.current) {
                            //   nbSelectRef.current.value = bank.value;
                            // }
                          }}
                        >
                          <img src={useImageURLReplaceWithCDN(bank.imgUrl)} />
                          <span>{bank.label}</span>
                          {isSelected && (
                            <MemoGreenTickSvg width={16} height={16} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <select
                    className={`payment_method ${newStyles.netbankingSelectInput}`}
                    onChange={e => setSelectedNB(e.target.value)}
                  >
                    {NETBANKING_OPTIONS?.map(bankItem => {
                      return (
                        <option
                          value={bankItem?.value}
                          label={bankItem?.label}
                          selected={selectedNB === bankItem.value}
                        >
                          {bankItem?.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {paymentMode === "WALLET" && (
                <>
                  <div className={newStyles.walletList}>
                    {DEFAULT_WALLETS.map(wallet => {
                      const isSelected = selectedWallet === wallet.value;
                      return (
                        <div className={newStyles.walletItem}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedWallet(prevVal =>
                                prevVal === wallet.value ? "" : wallet.value
                              );
                            }}
                          >
                            <div>
                              <img src={wallet.imgUrl} />
                              <span>{wallet.label}</span>
                            </div>
                            <div>
                              <span
                                style={{
                                  transform: isSelected ? "rotate(90deg)" : "",
                                }}
                              >
                                <MemoSideArrowIcon />
                              </span>
                            </div>
                          </button>
                          {isSelected && (
                            <div
                              className={`${styles.paymentSummaryPlaceOrderButton}`}
                            >
                              <Input
                                variant={2}
                                onClick={e => formSubmitHandler(e)}
                                type="button"
                                value={`Place Order \u20B9${Math.round(
                                  checkoutTotals?.prepaid
                                )}`}
                                customStyles={styles}
                                customStylesName={
                                  !isLoading
                                    ? "placeOrderButton"
                                    : "placeOrderButton--disable"
                                }
                                form="checkoutAddressForm"
                                disabled={isLoading}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <select
                    className={`payment_method ${newStyles.walletSelect}`}
                  >
                    {DEFAULT_WALLETS.map(wallet => (
                      <option
                        value={wallet?.value}
                        selected={selectedWallet === wallet.value}
                        label={wallet?.label}
                      >
                        {wallet?.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <input type="hidden" className="redirect" value="true" />
            </form>
          </div>
        </>
      )}
    </S.RadioContainer>
  );
};
