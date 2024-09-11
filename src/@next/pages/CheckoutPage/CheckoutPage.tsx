import React, { useContext, useEffect, useRef, useState } from "react";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { TextWithIcon } from "@components/atoms/TextWithIcon";
import { Loader } from "@components/atoms/Loader";
import Media from "react-media";
import {
  Header,
  Container,
  Checkout,
} from "@components/templates/Checkout/styles";
import DownArrow from "@components/atoms/SvgIcons/DownArrow";
import UpArrow from "@components/atoms/SvgIcons/UpArrow";
import { CartRow } from "@temp/components/OverlayManager/LotusCart/CartRow";
import { TaxedMoney } from "@components/containers/TaxedMoney";

import { GetCashback } from "@components/molecules/GetCashback";
import { GetWhatsappUpdate } from "@components/molecules/GetWhatsappUpdate";
import { SelectPaymentMode } from "@components/molecules/SelectPaymentMode";
import { NewGetCashback } from "@components/molecules/NewGetCashback";

import { NewGetWhatsappUpdate } from "@components/molecules/NewGetWhatsappUpdate";
import { NewSelectPaymentMode } from "@components/molecules/NewSelectPaymentMode";

import { PaymentGatewaysList } from "@components/organisms/PaymentGatewaysList";
import { CartSummary } from "@components/organisms/CartSummary";

// import { Checkout, LotusCheckout } from "@components/templates";
import {
  useCart,
  useCheckout,
  useAuthState,
  useCartState,
  useCheckoutState,
} from "@saleor/sdk";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import {
  CHECKOUT_STEPS,
  CheckoutStep,
  showCashback,
  CLIENT,
  META_DEFAULTS,
} from "Themes/config";
import { ITaxedMoney, ICardData, IFormError } from "@types";
import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import { largeScreen } from "@styles/constants";

import Shield from "images/shield.svg";

import { TypedCouponPrepaidDiscount } from "@components/molecules/ApplyCoupon/queris";
import { generateProductUrl, getGclid, getUtmData } from "@temp/core/utils";
import { TypedGetWalletAmountWithLogs } from "@components/organisms/Cashbacks/queries";
import { TypedUpdateCheckoutMetadataWhatsapp } from "@components/molecules/GetWhatsappUpdate/queries";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { clients } from "../../../../gqlTypes/customGlobalTypes";
import { CheckoutRouter } from "./CheckoutRouter";
import {
  CheckoutAddressSubpage,
  ICheckoutAddressSubpageHandles,
} from "./subpages";

import { IProps } from "./types";
import * as S from "./style";
import { CostLine } from "../../components/organisms/CartSummary/CartSummary";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { LotusCheckout } from "@components/templates/LotusCheckout";
import { getMetadataValue } from "@utils/misc";

// @ts-ignore
// @ts-ignore
// @ts-ignore

// console.log("useWallet", useWallet);
const prepareCartSummary = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  couponDiscount?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null,
  mrp?: ITaxedMoney | null,
  netPrice?: ITaxedMoney | null,
  itemDiscount?: ITaxedMoney | null,
  offerDiscount?: ITaxedMoney | null,
  prepaidDiscount?: ITaxedMoney | null,
  cashbackDiscount?: ITaxedMoney | null,
  cashbackRecieveTaxedPrice?: ITaxedMoney | null,
  items?: IItems,
  useCashback?: boolean,
  handleCashbackClick: () => Promise<void>,
  showPrepaidOffer?: boolean
) => {
  const products = items?.map(({ id, variant, totalPrice, quantity }) => ({
    id: variant?.product?.id || "",
    name: variant.product?.name || "",
    price: {
      gross: {
        amount: totalPrice?.gross.amount || 0,
        currency: totalPrice?.gross.currency || "",
      },
      net: {
        amount: totalPrice?.net.amount || 0,
        currency: totalPrice?.net.currency || "",
      },
    },
    quantity,
    sku: variant.sku || "",
    thumbnail: {
      alt: variant.product?.thumbnail?.alt || undefined,
      url: variant.product?.thumbnail?.url,
      url2x: variant.product?.thumbnail2x?.url,
    },
    categorySlug: variant.product?.category?.slug,
    weight: variant.product?.weight,
    metadata: variant.product?.metadata,
    variant,
  }));
  return (
    <CartSummary
      totalPrice={totalPrice}
      shippingTaxedPrice={shippingTaxedPrice}
      couponDiscount={couponDiscount}
      subtotalPrice={subtotalPrice}
      mrp={mrp}
      netPrice={netPrice}
      itemDiscount={itemDiscount}
      offerDiscount={offerDiscount}
      prepaidDiscount={prepaidDiscount}
      cashbackDiscount={cashbackDiscount}
      cashbackRecieveTaxedPrice={cashbackRecieveTaxedPrice}
      products={products}
      useCashback={useCashback}
      handleCashbackClick={handleCashbackClick}
      showPrepaidOffer={showPrepaidOffer}
    />
  );
};

const getButton = (
  buttonDisabled: boolean,
  text?: string,
  onClick?: () => void
) => {
  if (text) {
    if (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST) {
      return (
        <S.PlaceOrderButton
          disabled={buttonDisabled}
          testingContext="checkoutPageNextStepButton"
          onClick={onClick}
          type="submit"
          style={{ color: "#fff" }}
        >
          {text}
        </S.PlaceOrderButton>
      );
    }
    return (
      <S.PlaceOrderButton
        disabled={buttonDisabled}
        testingContext="checkoutPageNextStepButton"
        onClick={onClick}
        type="submit"
      >
        {text}
      </S.PlaceOrderButton>
    );
  }
  return null;
};

export type RadioState = "PayOnline" | "COD" | null;

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const history = useCustomHistory();
  const { user } = useAuthState();
  const location = useCustomLocation();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [useCashback, setUseCashback] = useState(showCashback);

  // const [prepaidDiscount, setPrepaidDiscount] = useState(-1);
  // const [couponDiscount, setCouponDiscount] = useState(0);
  const {
    // discount,
    // mrp,
    // netPrice,
    // itemDiscount,
    // offerDiscount,
    // items,
  } = useCart();

  const {
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
    mrp,
    netPrice,
    itemDiscount,
    offerDiscount,
    couponDiscount,
    prepaidDiscount,
    cashbackDiscount,
    cashbackRecieve,
  } = useCartState();

  const mrpListPrice =
    items?.reduce((total, item) => {
      // calculates the sum of listprice of all items in cart
      return (
        total +
        item?.quantity *
          Number(
            (getMetadataValue(item?.variant?.metadata, "listPrice") &&
              JSON.parse(
                getMetadataValue(item?.variant?.metadata, "listPrice")
              )) ||
              item?.variant?.pricing?.price?.gross?.amount
          )
      );
    }, 0) || 0;

  const cartLoaded = true;
  const checkoutLoaded = true;
  const {
    // loaded: checkoutLoaded,
    // checkout,
    payment,
    // availablePaymentGateways,
    // availableShippingMethods,
    setShippingMethod,
    createPayment,
    completeCheckout,
    checkoutPaymentMethodUpdate,
    // getLatestCheckout,
    // promoCodeDiscount,
  } = useCheckout();

  const {
    checkout,
    availablePaymentGateways,
    availableShippingMethods,
    promoCodeDiscount,
  } = useCheckoutState();
  const [submitInProgress, setSubmitInProgress] = useState(false);

  const initialValueId = availablePaymentGateways
    ? availablePaymentGateways[0].id
    : "mirumee.payments.razorpay";

  const initialRadioState =
    initialValueId === "mirumee.payments.razorpay" ? "PayOnline" : "COD";

  const [radioState, setradioState] = useState<RadioState>(initialRadioState);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);

  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);
  const [paymentGatewayErrors, setPaymentGatewayErrors] = useState<
    IFormError[]
  >([]);

  const [errors, setErrors] = useState<IFormError[]>([]);
  const overlay = useContext(OverlayContext);

  const { show } = overlay;
  const errorContext: InnerOverlayContextInterface = {
    content: errors,
  };

  // const [lengthShippingMethod, setLengthShippingMethod] = useState(
  //   availableShippingMethods?.length
  // );
  const lengthShippingMethod = availableShippingMethods?.length;
  const [pgLoading, setPgLoading] = useState(false);

  useEffect(() => {
    setSelectedPaymentGateway(payment?.gateway);
  }, [payment?.gateway]);

  useEffect(() => {
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  useEffect(() => {
    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);
  }, [lengthShippingMethod]);

  useEffect(() => {
    if (availablePaymentGateways?.length)
      checkoutPaymentMethodUpdate({
        gateway: availablePaymentGateways[0].id,
        useCashback,
      });
  }, []);

  useEffect(() => {
    if (availablePaymentGateways && availablePaymentGateways?.length > 0) {
      if (availablePaymentGateways[0].id === "mirumee.payments.wallet")
        setradioState(null);

      if (availablePaymentGateways[0].id === "mirumee.payments.razorpay")
        setradioState("PayOnline");

      if (availablePaymentGateways[0].id === "mirumee.payments.dummy")
        setradioState("COD");
    }
  }, [availablePaymentGateways]);

  // useEffect(() => {
  //   checkoutPaymentMethodUpdate({
  //     gateway: "mirumee.payments.razorpay",
  //   });
  // }, []);

  const steps = CHECKOUT_STEPS;

  const checkoutAddressSubpageRef = useRef<ICheckoutAddressSubpageHandles>(
    null
  );

  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);
  let totalQuantity = 0;
  items?.forEach(item => {
    totalQuantity += item.quantity;
  });
  const handleRadioClick = async (value: RadioState) => {
    setButtonDisabled(true);
    setradioState(value);
    switch (value) {
      case "PayOnline": {
        await checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.razorpay",
          useCashback,
        });
        setButtonDisabled(false);

        break;
      }
      case "COD": {
        await checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.dummy",
          useCashback,
        });
        setButtonDisabled(false);

        break;
      }

      default:
        checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.razorpay",
          useCashback,
        });
    }
  };

  const handleNextStepClick = () => {
    // getWalletAmount().then(walletAmount => {
    //   if (clevertapEvents.deliveryDetails.enable) {
    //     const clevertap = makeClevertap();
    //     clevertap.event.push(clevertapEvents.deliveryDetails.value, {
    //       platform: window.screen.width < 520 ? "msite" : "website",
    //       clickTarget: document.location.href,
    //       clickSource: utm_data,
    //       gaUserId: getGclid(),
    //       customerEmail: user?.email,
    //       customerPhone: user?.defaultBillingAddress?.phone,
    //       quantity: totalQuantity,
    //       cartAmount: totalPrice?.net?.amount,
    //       productName: items
    //         ?.map(item => {
    //           return item?.variant?.product?.name;
    //         })
    //         .toString(),
    //       paymentMode: "Online",
    //       paymentAmount: totalPrice?.net?.amount,
    //       orderAddressPin:
    //         checkout?.shippingAddress?.postalCode ||
    //         checkout?.billingAddress?.postalCode,
    //       orderAddressCity:
    //         checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
    //       state:
    //         checkout?.shippingAddress?.countryArea ||
    //         checkout?.billingAddress?.countryArea,
    //       couponAmount: couponDiscount,
    //       walletAmount: walletAmount.data,
    //       couponName: promoCodeDiscount?.discountName,
    //     });
    //   }
    // });

    if (checkoutAddressSubpageRef.current?.submitAddress) {
      checkoutAddressSubpageRef.current?.submitAddress();
    }
  };

  const handleCODPayment = async () => {
    const paymentData1 = {
      gateway: availablePaymentGateways ? availablePaymentGateways[0].id : "",
      token: "not-charged",
    };
    setSubmitInProgress(true);

    const { dataError } = await createPayment(paymentData1);
    const errors = dataError?.error;
    if (errors) {
      setPaymentGatewayErrors(errors);
      show(OverlayType.message, OverlayTheme.modal, {
        title: `${errors[0]?.message}, ${errors[0]?.field}`,
        status: "error",
      });
      getLatestCheckout().then(async res => {
        if (
          res.data &&
          res.data.availablePaymentGateways.length &&
          res.data.availablePaymentGateways[0].id === "mirumee.payments.wallet"
        ) {
          await checkoutPaymentMethodUpdate({
            gateway: "mirumee.payments.razorpay",
            useCashback,
          });
          // setradioState("PayOnline");
        }
      });
      setSubmitInProgress(false);
    } else {
      setPaymentGatewayErrors([]);

      const { data, dataError } = await completeCheckout();
      setSubmitInProgress(false);

      const error = dataError?.error;
      if (error) {
        setErrors(error);
        show(OverlayType.message, OverlayTheme.modal, errorContext);
        setPgLoading(false);
        setSubmitInProgress(false);
      } else if (data && data?.order) {
        setErrors([]);
        setPgLoading(false);
        setSubmitInProgress(false);

        history.push({
          pathname: "/order-placed",
          state: {
            id: data?.order?.id,
            token: data?.order?.token,
            paymentMethod: radioState === "PayOnline" ? "Online" : "COD",
            cartPrice: netPrice?.gross.amount,
            order: data?.order,
            user,
            items,
            mrp,
            itemDiscount,
            offerDiscount,
          },
        });
      }
    }
  };

  const handleEventPush = async eventType => {
    getLatestCheckout().then(async (res: any) => {
      const { data } = res;
      const ctp = {
        firstName:
          user?.firstName ||
          data?.billingAddress?.firstName ||
          data?.shippingAddress?.firstName,
        lastName:
          user?.lastName ||
          data?.billingAddress?.lastName ||
          data?.shippingAddress?.lastName,
        phone: data?.billingAddress?.phone || data?.shippingAddress?.phone,
        email: user?.email || data?.email,
      };
      if (eventType === "COD") {
        if (clevertapEvents.codPaymentOrder.enable) {
          const clevertap = makeClevertap();
          clevertap.event.push(clevertapEvents.codPaymentOrder.value, ctp);
        }
        if (gtmConfig.codPaymentOrder.enable) {
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.codPaymentOrder.value,
            ecommerce: {
              "User Details": ctp,
            },
          });
        }
      } else {
        if (clevertapEvents.onlinePaymentOrder.enable) {
          const clevertap = makeClevertap();
          clevertap.event.push(clevertapEvents.onlinePaymentOrder.value, ctp);
        }
        if (gtmConfig.onlinePaymentOrder.enable) {
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.onlinePaymentOrder.value,
            ecommerce: {
              "User Details": ctp,
            },
          });
        }
      }
    });
  };

  const handleStepSubmitSuccess = async (
    currentStep: CheckoutStep,
    data?: object
  ) => {
    if (radioState === "PayOnline") {
      history.push(steps[1].link);
      if (
        CLIENT === clients.LOTUS_NEW ||
        CLIENT === clients.LOTUS_STAGE ||
        CLIENT === clients.WOW_HEALTH_NEW ||
        CLIENT === clients.WOWFC_NEW
      ) {
        handleEventPush("Online");
      }

      if (clevertapEvents.paymentInitiated.enable) {
        const clevertap = makeClevertap();
        clevertap.event.push(clevertapEvents.paymentInitiated.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          timeStamp: Date.now(),
          clickTarget: document.location.href,
          clickSource: utm_data,
          gaUserId: getGclid(),
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          quantity: totalQuantity,
          cartAmount: totalPrice?.net?.amount,
          productName: items
            ?.map(item => {
              return item?.variant?.product?.name;
            })
            .toString(),
          paymentMode: "Online",
          paymentAmount: totalPrice?.net?.amount,
          orderAddressPin:
            checkout?.shippingAddress?.postalCode ||
            checkout?.billingAddress?.postalCode,
          orderAddressCity:
            checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
          couponAmount: couponDiscount,
        });
      }
    } else {
      if (
        CLIENT === clients.LOTUS_NEW ||
        CLIENT === clients.LOTUS_STAGE ||
        CLIENT === clients.WOW_HEALTH_NEW ||
        CLIENT === clients.WOWFC_NEW
      ) {
        handleEventPush("COD");
      }
      handleCODPayment();
    }
  };

  const handleCashbackClick = async () => {
    setUseCashback(!useCashback);

    await checkoutPaymentMethodUpdate({
      gateway: "mirumee.payments.razorpay",
      useCashback: !useCashback,
    });
  };

  // const { storedValue: couponAmount } = useLocalStorage("couponAmount");
  const [showMore, setShowMore] = useState(false);
  const [showOrderSummery, setShowOrderSummery] = useState(false);

  // const checkoutView =
  //   CLIENT === "lotus-new" ? (
  //     cartLoaded && checkoutLoaded ? (
  //       <>
  //         <CheckoutAddressSubpage
  //           ref={checkoutAddressSubpageRef}
  //           changeSubmitProgress={setSubmitInProgress}
  //           onSubmitSuccess={() =>
  //             handleStepSubmitSuccess(CheckoutStep.Address)
  //           }
  //           stopLoader={() => setSubmitInProgress(false)}
  //         />
  //         <Media
  //           query={{ maxWidth: largeScreen }}
  //           render={() => (
  //             <Container>
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "space-between",
  //                   marginBottom: "5px",
  //                 }}
  //               >
  //                 <Header
  //                   style={{
  //                     fontWeight: "normal",
  //                     fontSize: "16px",
  //                     marginBottom: showOrderSummery ? "10px" : "0",
  //                     textTransform: "capitalize",
  //                   }}
  //                 >
  //                   Your Order Summery
  //                 </Header>
  //                 <span
  //                   onClick={() => {
  //                     if (showOrderSummery) {
  //                       setShowMore(false);
  //                     }
  //                     setShowOrderSummery(!showOrderSummery);
  //                   }}
  //                 >
  //                   {showOrderSummery ? <UpArrow /> : <DownArrow />}
  //                 </span>
  //               </div>

  //               {showOrderSummery &&
  //                 items?.map(({ id, variant, quantity, totalPrice }, index) => {
  //                   if (index === 0) {
  //                     return (
  //                       <CartRow
  //                         key={id ? `id-${id}` : `idx-${index}`}
  //                         index={index}
  //                         id={variant?.product?.id || ""}
  //                         name={variant?.product?.name || ""}
  //                         maxQuantity={variant.quantityAvailable || quantity}
  //                         categorySlug={variant.product?.category?.slug || ""}
  //                         quantity={quantity}
  //                         thumbnail={{
  //                           ...variant?.product?.thumbnail,
  //                           alt: variant?.product?.thumbnail?.alt || "",
  //                         }}
  //                         totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
  //                         unitPrice={
  //                           <TaxedMoney taxedMoney={variant?.pricing?.price} />
  //                         }
  //                         sku={variant.sku}
  //                         attributes={variant.attributes?.map(attribute => {
  //                           return {
  //                             attribute: {
  //                               id: attribute.attribute.id,
  //                               name: attribute.attribute.name || "",
  //                             },
  //                             values: attribute.values.map(value => {
  //                               return {
  //                                 id: value?.id,
  //                                 name: value?.name || "",
  //                                 value: value?.value,
  //                               };
  //                             }),
  //                           };
  //                         })}
  //                         weightValue={variant.product?.weight?.value}
  //                         metadata={variant.product?.metadata}
  //                         variant={variant}
  //                         quantityAndRemove={false}
  //                         showMore={showMore ? 0 : items?.length - 1}
  //                         handleShowMore={setShowMore}
  //                       />
  //                     );
  //                   }
  //                   if (showMore) {
  //                     return (
  //                       <CartRow
  //                         key={id ? `id-${id}` : `idx-${index}`}
  //                         index={index}
  //                         id={variant?.product?.id || ""}
  //                         name={variant?.product?.name || ""}
  //                         maxQuantity={variant.quantityAvailable || quantity}
  //                         categorySlug={variant.product?.category?.slug || ""}
  //                         quantity={quantity}
  //                         thumbnail={{
  //                           ...variant?.product?.thumbnail,
  //                           alt: variant?.product?.thumbnail?.alt || "",
  //                         }}
  //                         totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
  //                         unitPrice={
  //                           <TaxedMoney taxedMoney={variant?.pricing?.price} />
  //                         }
  //                         sku={variant.sku}
  //                         attributes={variant.attributes?.map(attribute => {
  //                           return {
  //                             attribute: {
  //                               id: attribute.attribute.id,
  //                               name: attribute.attribute.name || "",
  //                             },
  //                             values: attribute.values.map(value => {
  //                               return {
  //                                 id: value?.id,
  //                                 name: value?.name || "",
  //                                 value: value?.value,
  //                               };
  //                             }),
  //                           };
  //                         })}
  //                         weightValue={variant.product?.weight?.value}
  //                         metadata={variant.product?.metadata}
  //                         variant={variant}
  //                         quantityAndRemove={false}
  //                       />
  //                     );
  //                   }
  //                 })}
  //               {showOrderSummery && totalPrice && (
  //                 <CostLine name="Total" cost={totalPrice} />
  //               )}
  //             </Container>
  //           )}
  //         />
  //         <Media
  //           query={{ maxWidth: largeScreen }}
  //           render={() =>
  //             user &&
  //             showCashback && (
  //               <Container
  //                 style={{
  //                   padding: "0.8rem 1rem",
  //                 }}
  //               >
  //                 <TypedGetWalletAmountWithLogs>
  //                   {({ data, loading }) => {
  //                     const amount =
  //                       data && data.wallet ? data.wallet.amount : 0;
  //                     if (loading)
  //                       return (
  //                         <div>
  //                           {" "}
  //                           <Loader />{" "}
  //                         </div>
  //                       );
  //                     if (data && amount > -1)
  //                       return (
  //                         <NewGetCashback
  //                           useCashback={useCashback}
  //                           // setUseCashback={setUseCashback}
  //                           handleCashbackClick={handleCashbackClick}
  //                           userWallterBalance={amount}
  //                         />
  //                       );
  //                     return <> </>;
  //                   }}
  //                 </TypedGetWalletAmountWithLogs>
  //               </Container>
  //             )
  //           }
  //         />

  //         <Container
  //           style={{
  //             marginBottom: window.screen.width <= 992 ? "1px" : "10px",
  //           }}
  //         >
  //           <Header>CHOOSE PAYMENT METHOD</Header>
  //           <NewSelectPaymentMode
  //             setRadioState={setradioState}
  //             handleOnSelect={handleRadioClick}
  //             initialValue={radioState}
  //           />
  //         </Container>
  //         {/* <S.TextWithIconWrapper borderType="none">
  //       <TextWithIcon
  //         item={{
  //           text: "100% Payment Protection, Easy Return Policy",
  //           url: "",
  //           title: "",
  //           path: Shield,
  //         }}
  //         isLink={false}
  //       />
  //     </S.TextWithIconWrapper> */}
  //         <Container
  //           style={{
  //             padding:
  //               window.screen.width <= 992 ? "0.8rem 1rem" : "0.8rem 1.5rem",
  //           }}
  //         >
  //           <TypedUpdateCheckoutMetadataWhatsapp>
  //             {mutation => <NewGetWhatsappUpdate mutation={mutation} />}
  //           </TypedUpdateCheckoutMetadataWhatsapp>
  //         </Container>
  //       </>
  //     ) : (
  //       <Loader />
  //     )
  //   ) : cartLoaded && checkoutLoaded ? (
  //     <>
  //       <CheckoutAddressSubpage
  //         ref={checkoutAddressSubpageRef}
  //         changeSubmitProgress={setSubmitInProgress}
  //         onSubmitSuccess={() => handleStepSubmitSuccess(CheckoutStep.Address)}
  //         stopLoader={() => setSubmitInProgress(false)}
  //       />
  //       <TypedUpdateCheckoutMetadataWhatsapp>
  //         {mutation => <GetWhatsappUpdate mutation={mutation} />}
  //       </TypedUpdateCheckoutMetadataWhatsapp>

  //       {user && showCashback && (
  //         <TypedGetWalletAmountWithLogs>
  //           {({ data, loading }) => {
  //             const amount = data && data.wallet ? data.wallet.amount : 0;
  //             if (loading)
  //               return (
  //                 <div>
  //                   {" "}
  //                   <Loader />{" "}
  //                 </div>
  //               );
  //             if (data && amount > 0)
  //               return (
  //                 <GetCashback
  //                   useCashback={useCashback}
  //                   // setUseCashback={setUseCashback}
  //                   handleCashbackClick={handleCashbackClick}
  //                   userWallterBalance={amount}
  //                 />
  //               );
  //             return <> </>;
  //           }}
  //         </TypedGetWalletAmountWithLogs>
  //       )}
  //       <S.TextWithIconWrapper borderType="none">
  //         <TextWithIcon
  //           item={{
  //             text: "100% Payment Protection, Easy Return Policy",
  //             url: "",
  //             title: "",
  //             path: Shield,
  //           }}
  //           isLink={false}
  //         />
  //       </S.TextWithIconWrapper>
  //       <SelectPaymentMode
  //         setRadioState={setradioState}
  //         handleOnSelect={handleRadioClick}
  //         initialValue={radioState}
  //       />
  //     </>
  //   ) : (
  //     <Loader />
  //   );

  const handleProcessPayment = async (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => {
    const { dataError, data } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
    });
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
      show(OverlayType.message, OverlayTheme.modal, {
        title: `${errors[0]?.message}, ${errors[0]?.field}`,
        status: "error",
      });
      getLatestCheckout().then(async res => {
        if (
          res.data &&
          res.data.availablePaymentGateways.length &&
          res.data.availablePaymentGateways[0].id === "mirumee.payments.wallet"
        ) {
          await checkoutPaymentMethodUpdate({
            gateway: "mirumee.payments.razorpay",
            useCashback,
          });
          // setradioState("PayOnline");
        }
      });

      return { errors };
    }
    setPaymentGatewayErrors([]);
    return { data };
  };

  // const [pgLoading, setPgLoading] = useState(false);

  const handleSubmitPayment = async (paymentData?: object) => {
    setPgLoading(true);
    const { data, dataError } = await completeCheckout({ paymentData });
    const error = dataError?.error;

    if (error) {
      setErrors(error);
      show(OverlayType.message, OverlayTheme.modal, errorContext);
      setPgLoading(false);
      setSubmitInProgress(false);
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
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          quantity: totalQuantity,
          cartAmount: totalPrice?.net?.amount,
          price: "",
          couponName: promoCodeDiscount?.discountName,
          orderAddressPin:
            checkout?.shippingAddress?.postalCode ||
            checkout?.billingAddress?.postalCode,
          orderAddressCity:
            checkout?.shippingAddress?.city || checkout?.billingAddress?.city,
          couponAmount: couponDiscount,
          paymentAmount: totalPrice?.net?.amount,
          paymentMode: "online",
          purchaseDate: todayDate,
        });
      }
    } else if (data && data?.order) {
      setErrors([]);
      setPgLoading(false);
      setSubmitInProgress(false);
      history.push({
        pathname: "/order-placed",
        state: {
          order: data?.order,
          paymentMethod: radioState === "PayOnline" ? "Online" : "COD",
          cartPrice: netPrice?.gross.amount,
          user,
          items,
          mrp,
          itemDiscount,
          offerDiscount,
        },
      });
    }

    return {
      confirmationData: data?.confirmationData,
      confirmationNeeded: data?.confirmationNeeded,
      order: data?.order,
      errors: dataError?.error,
    };
  };
  const handleSubmitPaymentSuccess = (
    order?: CompleteCheckout_checkoutComplete_order
  ) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors([]);
    handleStepSubmitSuccess(CheckoutStep.Payment, {
      id: order?.id,
      orderNumber: order?.number,
      token: order?.token,
    });
  };
  const handlePaymentGatewayError = (errors: IFormError[]) => {
    setSubmitInProgress(false);

    setPaymentGatewayErrors(errors);
    const paymentStepLink = steps.find(
      step => step.step === CheckoutStep.Payment
    )?.link;
    if (paymentStepLink) {
      history.push(paymentStepLink);
    }
  };

  const clevertap = makeClevertap();

  const validateItems = (items: IItems) => {
    return items?.every(item => item?.variant?.product?.name);
  };

  // const { getWalletAmount } = useWallet();
  const { pathname } = useCustomLocation();
  const utm_data = getUtmData(pathname);

  useEffect(() => {
    if (items?.length && validateItems(items)) {
      let totalQuantity = 0;
      items?.forEach(item => {
        totalQuantity += item.quantity;
      });

      if (user) {
        const clevertap = makeClevertap();
        // getWalletAmount().then(walletAmount => {
        //   const ctp = {
        //     Name: `${user.firstName} ${user.lastName}`,
        //     Email: user.email,
        //     Phone: user?.defaultBillingAddress?.phone,
        //     Identity: user?.defaultBillingAddress?.phone,
        //     "Net Cashback": walletAmount.data,
        //   };
        //   // console.log("🚀 ~ file: Page.tsx ~ line 54 ~ ctp", ctp);
        //   clevertap.onUserLogin.push({
        //     Site: ctp,
        //   });
        // });
      }

      if (
        clevertapEvents.checkoutPage.enable &&
        prepaidDiscount.gross.amount !== -1
      ) {
        const extractp = {};
        const nonFreeProducts = items?.filter(
          item =>
            item?.variant?.product?.category?.slug !== "free-gift-products"
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
            nonFreeProducts?.[i]?.variant?.product?.name!
          );
          // @ts-ignore
          extractp[`product ${i + 1} image url`] =
            nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
          // @ts-ignore
          extractp[`product ${i + 1} quantity`] =
            nonFreeProducts?.[i]?.quantity;
          // @ts-ignore
          extractp[`product ${i + 1} total price`] =
            nonFreeProducts?.[i]?.totalPrice?.net?.amount;
        }
        // @ts-ignore
        extractp["Products count"] = nonFreeProducts?.length;
        const ctp = {
          platform: window.screen.width > 520 ? "website" : "msite",
          timeStamp: Date.now(),
          gaUserId: getGclid(),
          customerEmail: user?.email,
          customerPhone: user?.defaultBillingAddress?.phone,
          quantity: totalQuantity,
          cartAmount: totalPrice?.net?.amount,
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
          "Cart MRP": mrp?.gross.amount,
          "Item Discount": itemDiscount?.gross.amount,
          "Net Price": netPrice?.gross.amount,
          "Coupon discount": couponDiscount,
          "Offer discount": offerDiscount?.gross.amount,
          "Order total": totalPrice?.net?.amount,
          "Delivery Charges": shippingPrice?.gross.amount, // TODO
          "Prepaid discount": prepaidDiscount, // TODO
          "Total discount": discount?.amount,
          "Total Cart Value": totalPrice?.net?.amount,
        };
        clevertap.event.push(clevertapEvents.checkoutPage.value, {
          ...ctp,
          ...extractp,
        });
      }

      const ProductName = items?.map(item => {
        return item?.variant?.product?.name;
      });

      const ProductId = items?.map(item => {
        return item?.variant?.sku;
      });

      const ProductPrice = items?.map(item => {
        return item.variant.pricing?.price?.net?.amount;
      });

      const ProductQuantity = items?.map(item => {
        return item.quantity;
      });

      const products = [];

      for (let i = 0; i < ProductName!.length; i++) {
        products.push({
          name: ProductName![i],
          id: ProductId![i],
          price: ProductPrice![i],
          brand: META_DEFAULTS.name,

          quantity: ProductQuantity![i],
        });
      }
      if (
        gtmConfig.checkoutPage.enable &&
        prepaidDiscount.gross.amount !== -1
      ) {
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.checkoutPage.value,
          ecommerce: {
            checkout: {
              actionField: { step: 1, option: "checkout" },
              products,
              totalQuantity,
              "coupon discount": couponDiscount,
              "offer discount": offerDiscount?.gross.amount,
              "order total": totalPrice?.net?.amount,
              "delivery charges": shippingPrice?.gross.amount, // TODO
              "prepaid discount": prepaidDiscount, // TODO
              "total discount": discount?.amount,
              "total cart value": totalPrice?.net?.amount,
            },
          },
        });
      }
    }
  }, [items?.length, prepaidDiscount.gross.amount]);

  const setAmountCurrency = (amount: any) => {
    return {
      amount: amount === undefined || null ? 0 : amount,
      currency: "INR",
    };
  };

  const setTaxedMoney = (price: any): ITaxedMoney => {
    return {
      gross: price || 0,
      net: price || 0,
    };
  };

  let checkoutView: any;
  switch (CLIENT) {
    case clients.WOWFC_NEW:
    case clients.WOW_HEALTH_NEW:
    case clients.LOTUS_NEW:
    case clients.LOTUS_STAGE:
      checkoutView =
        cartLoaded && checkoutLoaded ? (
          <>
            <CheckoutAddressSubpage
              ref={checkoutAddressSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
              onSubmitSuccess={() =>
                handleStepSubmitSuccess(CheckoutStep.Address)
              }
              stopLoader={() => setSubmitInProgress(false)}
            />
            <Media
              query={{ maxWidth: largeScreen }}
              render={() => (
                <Container>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <Header
                      style={{
                        fontWeight: "normal",
                        fontSize: "16px",
                        marginBottom: showOrderSummery ? "10px" : "0",
                        textTransform: "capitalize",
                      }}
                    >
                      Your Order Summary
                    </Header>
                    <span
                      onClick={() => {
                        if (showOrderSummery) {
                          setShowMore(false);
                        }
                        setShowOrderSummery(!showOrderSummery);
                      }}
                    >
                      {showOrderSummery ? <UpArrow /> : <DownArrow />}
                    </span>
                  </div>

                  {showOrderSummery &&
                    items?.map(
                      ({ id, variant, quantity, totalPrice }, index) => {
                        if (index === 0) {
                          return (
                            <CartRow
                              key={id ? `id-${id}` : `idx-${index}`}
                              index={index}
                              id={variant?.product?.id || ""}
                              name={variant?.product?.name || ""}
                              maxQuantity={
                                variant.quantityAvailable || quantity
                              }
                              categorySlug={
                                variant.product?.category?.slug || ""
                              }
                              quantity={quantity}
                              thumbnail={{
                                ...variant?.product?.thumbnail,
                                alt: variant?.product?.thumbnail?.alt || "",
                              }}
                              totalPrice={
                                <TaxedMoney taxedMoney={totalPrice} />
                              }
                              unitPrice={
                                <TaxedMoney
                                  taxedMoney={variant?.pricing?.price}
                                />
                              }
                              sku={variant.sku}
                              attributes={variant.attributes?.map(attribute => {
                                return {
                                  attribute: {
                                    id: attribute.attribute.id,
                                    name: attribute.attribute.name || "",
                                  },
                                  values: attribute.values.map(value => {
                                    return {
                                      id: value?.id,
                                      name: value?.name || "",
                                      value: value?.value,
                                    };
                                  }),
                                };
                              })}
                              weightValue={variant.product?.weight?.value}
                              metadata={variant.product?.metadata}
                              variant={variant}
                              quantityAndRemove={false}
                              showMore={showMore ? 0 : items?.length - 1}
                              handleShowMore={setShowMore}
                            />
                          );
                        }
                        if (showMore) {
                          return (
                            <CartRow
                              key={id ? `id-${id}` : `idx-${index}`}
                              index={index}
                              id={variant?.product?.id || ""}
                              name={variant?.product?.name || ""}
                              maxQuantity={
                                variant.quantityAvailable || quantity
                              }
                              categorySlug={
                                variant.product?.category?.slug || ""
                              }
                              quantity={quantity}
                              thumbnail={{
                                ...variant?.product?.thumbnail,
                                alt: variant?.product?.thumbnail?.alt || "",
                              }}
                              totalPrice={
                                <TaxedMoney taxedMoney={totalPrice} />
                              }
                              unitPrice={
                                <TaxedMoney
                                  taxedMoney={variant?.pricing?.price}
                                />
                              }
                              sku={variant.sku}
                              attributes={variant.attributes?.map(attribute => {
                                return {
                                  attribute: {
                                    id: attribute.attribute.id,
                                    name: attribute.attribute.name || "",
                                  },
                                  values: attribute.values.map(value => {
                                    return {
                                      id: value?.id,
                                      name: value?.name || "",
                                      value: value?.value,
                                    };
                                  }),
                                };
                              })}
                              weightValue={variant.product?.weight?.value}
                              metadata={variant.product?.metadata}
                              variant={variant}
                              quantityAndRemove={false}
                            />
                          );
                        }
                      }
                    )}
                  {showOrderSummery && totalPrice && (
                    <CostLine name="Total" cost={totalPrice} />
                  )}
                </Container>
              )}
            />
            <Media
              query={{ maxWidth: largeScreen }}
              render={() =>
                user && showCashback ? (
                  <Container
                    style={{
                      padding: "0.8rem 1rem",
                    }}
                  >
                    <TypedGetWalletAmountWithLogs>
                      {({ data, loading }) => {
                        const amount =
                          data && data.wallet ? data.wallet.amount : 0;
                        if (loading)
                          return (
                            <div>
                              {" "}
                              <Loader />{" "}
                            </div>
                          );
                        if (data && amount > -1)
                          return (
                            <NewGetCashback
                              useCashback={useCashback}
                              // setUseCashback={setUseCashback}
                              handleCashbackClick={handleCashbackClick}
                              userWallterBalance={amount}
                            />
                          );
                        return <> </>;
                      }}
                    </TypedGetWalletAmountWithLogs>
                  </Container>
                ) : (
                  <> </>
                )
              }
            />

            <Container
              style={{
                marginBottom: window.screen.width <= 992 ? "1px" : "10px",
              }}
            >
              <Header>CHOOSE PAYMENT METHOD</Header>
              <NewSelectPaymentMode
                setRadioState={setradioState}
                handleOnSelect={handleRadioClick}
                initialValue={radioState}
              />
            </Container>

            <Container
              style={{
                padding:
                  window.screen.width <= 992 ? "0.8rem 1rem" : "0.8rem 1.5rem",
              }}
            >
              <TypedUpdateCheckoutMetadataWhatsapp>
                {mutation => <NewGetWhatsappUpdate mutation={mutation} />}
              </TypedUpdateCheckoutMetadataWhatsapp>
            </Container>
          </>
        ) : (
          <Loader />
        );
      break;
    case clients.BODY_FIRST:
    case clients.PLIXLIFEFC:
      checkoutView =
        cartLoaded && checkoutLoaded ? (
          <>
            <CheckoutAddressSubpage
              ref={checkoutAddressSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
              onSubmitSuccess={() =>
                handleStepSubmitSuccess(CheckoutStep.Address)
              }
              stopLoader={() => setSubmitInProgress(false)}
            />

            {user && showCashback && (
              <TypedGetWalletAmountWithLogs>
                {({ data, loading }) => {
                  const amount = data && data.wallet ? data.wallet.amount : 0;
                  if (loading)
                    return (
                      <div>
                        {" "}
                        <Loader />{" "}
                      </div>
                    );
                  if (data && amount > 0)
                    return (
                      <GetCashback
                        useCashback={useCashback}
                        // setUseCashback={setUseCashback}
                        handleCashbackClick={handleCashbackClick}
                        userWallterBalance={amount}
                      />
                    );
                  return <> </>;
                }}
              </TypedGetWalletAmountWithLogs>
            )}

            <SelectPaymentMode
              setRadioState={setradioState}
              handleOnSelect={value => {
                handleRadioClick(value);
              }}
              initialValue={radioState}
            />
          </>
        ) : (
          <Loader />
        );
      break;
    default:
      checkoutView =
        cartLoaded && checkoutLoaded ? (
          <>
            <CheckoutAddressSubpage
              ref={checkoutAddressSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
              onSubmitSuccess={() =>
                handleStepSubmitSuccess(CheckoutStep.Address)
              }
              stopLoader={() => setSubmitInProgress(false)}
            />
            <TypedUpdateCheckoutMetadataWhatsapp>
              {mutation => <GetWhatsappUpdate mutation={mutation} />}
            </TypedUpdateCheckoutMetadataWhatsapp>

            {user && showCashback && (
              <TypedGetWalletAmountWithLogs>
                {({ data, loading }) => {
                  const amount = data && data.wallet ? data.wallet.amount : 0;
                  if (loading)
                    return (
                      <div>
                        {" "}
                        <Loader />{" "}
                      </div>
                    );
                  if (data && amount > 0)
                    return (
                      <GetCashback
                        useCashback={useCashback}
                        // setUseCashback={setUseCashback}
                        handleCashbackClick={handleCashbackClick}
                        userWallterBalance={amount}
                      />
                    );
                  return <> </>;
                }}
              </TypedGetWalletAmountWithLogs>
            )}
            <S.TextWithIconWrapper borderType="none">
              <TextWithIcon
                item={{
                  text: "100% Payment Protection, Easy Return Policy",
                  url: "",
                  title: "",
                  path: Shield,
                }}
                isLink={false}
              />
            </S.TextWithIconWrapper>
            <SelectPaymentMode
              setRadioState={setradioState}
              handleOnSelect={handleRadioClick}
              initialValue={radioState}
            />
          </>
        ) : (
          <Loader />
        );
  }

  const cashbackRecieveTaxedPrice = {
    gross: {
      amount: cashbackRecieve.amount,
      currency: "INR",
    },
    net: {
      amount: cashbackRecieve.amount,
      currency: "INR",
    },
  };

  return (
    <>
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        totalPrice={totalPrice}
        renderAddress={props => {
          if (
            CLIENT === "lotus-new" ||
            CLIENT === "lotus-stage" ||
            CLIENT == clients.WOW_HEALTH_NEW ||
            CLIENT === clients.WOWFC_NEW
          ) {
            return (
              <LotusCheckout
                loading={submitInProgress}
                cartSummary={prepareCartSummary(
                  totalPrice,
                  shippingPrice,
                  couponDiscount,
                  netPrice,
                  mrp,
                  subtotalPrice,
                  itemDiscount,
                  offerDiscount,
                  prepaidDiscount,
                  cashbackDiscount,
                  cashbackRecieveTaxedPrice,
                  items,
                  useCashback,
                  handleCashbackClick,
                  radioState === "PayOnline"
                )}
                {...props}
                checkout={checkoutView}
                totalPrice={totalPrice}
                button={getButton(
                  buttonDisabled,
                  "place order",
                  handleNextStepClick
                )}
                showPrepaidOffer={radioState === "PayOnline"}
              />
            );
          }
          return (
            <Checkout
              loading={submitInProgress}
              cartSummary={prepareCartSummary(
                totalPrice,
                shippingPrice,
                couponDiscount,
                netPrice,
                mrp,
                subtotalPrice,
                itemDiscount,
                offerDiscount,
                prepaidDiscount,
                cashbackDiscount,
                cashbackRecieveTaxedPrice,
                items,
                useCashback,
                handleCashbackClick,
                radioState === "PayOnline"
              )}
              {...props}
              checkout={checkoutView}
              totalPrice={totalPrice}
              button={getButton(
                buttonDisabled,
                "place order",
                handleNextStepClick
              )}
              showPrepaidOffer={radioState === "PayOnline"}
            />
          );
        }}
        renderPayment={() => {
          if (availablePaymentGateways) {
            return (
              <PaymentGatewaysList
                loading={pgLoading}
                changeSubmitProgress={setSubmitInProgress}
                paymentGateways={availablePaymentGateways}
                processPayment={handleProcessPayment}
                submitPayment={handleSubmitPayment}
                submitPaymentSuccess={handleSubmitPaymentSuccess}
                formId={checkoutGatewayFormId}
                formRef={checkoutGatewayFormRef}
                selectedPaymentGateway={selectedPaymentGateway}
                selectedPaymentGatewayToken={selectedPaymentGatewayToken}
                selectPaymentGateway={setSelectedPaymentGateway}
                onError={handlePaymentGatewayError}
                errors={paymentGatewayErrors}
              />
            );
          }
        }}
      />
    </>
  );
};

export { CheckoutPage };
