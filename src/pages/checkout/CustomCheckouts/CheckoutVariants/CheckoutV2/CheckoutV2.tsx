import Input from "@components/farzicom-ui-kit/Input";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import {
  addressFileds,
  CheckoutFormActionTypes,
  onInputChange,
  onFocusOut,
  validateInput,
  formsReducer,
  IIAddressFieldNames,
  paymentRadioFields,
  IAddressField,
  PaymentRadioFields,
  PaymentMethods,
  checkboxFields,
  initFunc,
  convertAddressString,
  whatsappCheckboxFields,
} from "../../../formUtils";
import Select from "@components/farzicom-ui-kit/Select";
import {
  CheckoutLineFragment,
  useAuthState,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import debounce from "lodash/debounce";
import { CreatePaymentInput } from "@saleor/sdk/dist/apollo/types/checkout";
import { IMAGE_CDN, IMAGE_CDN_PROVIDERS, META_DEFAULTS } from "Themes/config";
import { theme } from "Themes/globalStyles/constants";
import { CircularProgress } from "@mui/material";
import * as S from "../../../styles";
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoPaySVG from "@components/atoms/SvgIcons/PaySVG";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoDownArrow from "@components/atoms/SvgIcons/DownArrow";
import MemoUpArrow from "@components/atoms/SvgIcons/UpArrow";
import Image from "next/image";
import { getThisVariantPrices } from "@temp/core/utils";
import { imageURLReplaceWithCDN } from "@utils/misc";
import { TypedUpdateCheckoutMetadataWhatsapp } from "@components/molecules/GetWhatsappUpdate/queries";
import MemoWhatsapp from "@components/atoms/SvgIcons/Whatsapp";
import {
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables,
} from "@components/molecules/GetWhatsappUpdate/gqlTypes/updateCheckoutMetadatWhatsapp";
import { MutationFn } from "react-apollo";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import MemoUserIconSVG from "@components/atoms/SvgIcons/UserIconSVG";
import { useCustomHistory } from "@hooks/useCustomHistory";
import ApplyCouponCode from "../../../ApplyCouponCode";
import { ShopMetaContext } from "@temp/pages/_app.page";
import AppHeader from "@components/templates/AppHeader";

const CheckoutV2 = ({ headerAndFooterData, shopMeta }) => {
  const { checkout } = useCheckoutState();

  if (!(checkout && checkout?.id && checkout?.lines?.length)) {
    return (
      <ShopMetaContext.Provider
        value={shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <AppHeader headerData={headerAndFooterData} />
        <S.ContinueShopping className={styles.continueShopping}>
          <MyCustomLink href="/">
            <Input
              variant={2}
              type="button"
              value="Continue Shopping"
              customStyles={styles}
              customStylesName="loginButton"
            />
          </MyCustomLink>
        </S.ContinueShopping>
      </ShopMetaContext.Provider>
    );
  }
  return (
    <ShopMetaContext.Provider
      value={shopMeta?.data.shopmeta.edges[0].node.metadata}
    >
      <AppHeader headerData={headerAndFooterData} />
      <div>
        <CheckoutForm />
      </div>
    </ShopMetaContext.Provider>
  );
};

const CheckoutLoginSection = ({ dispatch }) => {
  const { user, authenticated } = useAuthState();
  const useCheckoutRes = useCheckout();

  const [selectedAddress, setSelectedAddress] = useState(0);

  const { show } = useContext(OverlayContext);

  useEffect(() => {
    if (authenticated) {
      const selectedAddressInFormState =
        user?.addresses.length &&
        Object.values(IIAddressFieldNames).reduce((total, curr) => {
          let newObject = {};

          if (curr === "email") {
            newObject[curr] = {
              value: user?.email,
              touched: false,
              hasError: true,
              error: "",
            };
          } else {
            newObject[curr] = {
              value: user?.addresses[selectedAddress][curr],
              touched: false,
              hasError: true,
              error: "",
            };
          }

          return { ...total, ...newObject };
        }, {});

      selectedAddressInFormState["isFormValid"];
      if (Object.keys(selectedAddressInFormState).length !== 0) {
        let isFormValid = true;

        for (const name in selectedAddressInFormState) {
          const item = selectedAddressInFormState[name];
          const { value } = item;
          const { hasError, error } = validateInput(
            name as IIAddressFieldNames,
            value,
            dispatch,
            selectedAddressInFormState,
            useCheckoutRes
          );
          if (hasError) {
            isFormValid = false;
          }
          if (name) {
            dispatch({
              type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
              data: {
                name,
                value,
                hasError,
                error,
                touched: true,
                isFormValid,
              },
            });
          }
        }

        // dispatch({
        //   type: CheckoutFormActionTypes.UPDATE_COMPLETE_FORM,
        //   data: selectedAddressInFormState,
        // });
      }
    }
  }, [selectedAddress, authenticated]);

  if (authenticated) {
    const addressOptions = user.addresses.map((address, index) => {
      const formattedString = convertAddressString(address, "addressToString");
      return {
        name: formattedString,
        value: index.toString(),
        disabled: false,
      };
    });
    return (
      <div className={styles.addressContainer}>
        <div> Your Delivery Addresses </div>
        <div className={styles.addressDropdownContainer}>
          <span> Deliver To: </span>
          <Select
            variant={1}
            customStyles={styles}
            name="userAddresses"
            id="userAddresses"
            placeholder="userAddresses"
            value={selectedAddress}
            selectOptions={addressOptions || []}
            onChange={(e) => {
              const { value } = e.target;

              setSelectedAddress(parseInt(value));
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutLoginContainer}>
      <div className={styles.checkoutLoginContainerText}>
        <div className={styles.userIconDiv}>
          <MemoUserIconSVG />
        </div>
        <div>Already a member?</div>
      </div>
      <div>
        <Input
          variant={2}
          type="button"
          value="Login Now"
          customStyles={styles}
          customStylesName="loginButton"
          onClick={() =>
            show(OverlayType.mobileNumberInput, OverlayTheme.modal)
          }
        />
      </div>
    </div>
  );
};

const ShowHR = ({ name }) => {
  switch (name) {
    case "show":
    case "Net Price":
    case "Store Credit":
      return <hr className={styles.hr} />;

    default:
      return <> </>;
  }
};

const PaymentSummary: React.FC<{
  paymentSummary: any;
  toggle?: boolean;
  defaultShowPaceOrderButton?: boolean;
}> = ({
  paymentSummary,
  toggle = false,
  defaultShowPaceOrderButton = false,
}) => {
  const {
    mrp,
    itemDiscount,
    netPrice,
    couponDiscount,
    prepaidDiscount,
    cashbackDiscount,
    subtotalPrice,
    totalPrice,
  } = paymentSummary;

  const summaryPrices = {
    MRP: mrp,
    "Item Discount": itemDiscount,
    "Net Price": netPrice,
    "Sub Total": subtotalPrice,
    "Coupon Discount": couponDiscount,
    "Prepaid Discount": prepaidDiscount,
    "Store Credit": cashbackDiscount,
  };

  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  if (toggle) {
    return (
      <div className={styles.paymentSummaryContainer}>
        <div
          className={styles.paymentSummaryHeader}
          onClick={() => setShowPaymentSummary((prev) => !prev)}
        >
          <div className={styles.paymentSummaryHeaderText}>Price Summary </div>

          <div>
            {showPaymentSummary ? (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show Less</span>
                <MemoUpArrow />
              </div>
            ) : (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show More</span>
                <MemoDownArrow />
              </div>
            )}
          </div>
        </div>
        {showPaymentSummary ? (
          <div className={styles.paymentSummaryContainer}>
            {Object.keys(summaryPrices).map((price, index) => {
              if (summaryPrices[price] && summaryPrices[price].gross.amount) {
                return (
                  <div key={`summary_${index}`}>
                    <div className={styles.paymentSummaryRow}>
                      {price} <TaxedMoney taxedMoney={summaryPrices[price]} />
                    </div>
                    <ShowHR name={price} />
                  </div>
                );
              }
              return <> </>;
            })}

            <div>
              <div className={styles.paymentSummaryRowBold}>
                Grand Total <TaxedMoney taxedMoney={totalPrice} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.paymentSummaryRowBold}>
              Grand Total <TaxedMoney taxedMoney={totalPrice} />
            </div>
          </div>
        )}

        {defaultShowPaceOrderButton && (
          <div className={styles.paymentSummaryPlaceOrderButton}>
            <Input
              variant={2}
              type="submit"
              value="Place Order"
              customStyles={styles}
              customStylesName="placeOrderButton"
              form="checkoutAddressForm"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.paymentSummaryContainer}>
      {Object.keys(summaryPrices).map((price, index) => {
        if (summaryPrices[price] && summaryPrices[price].gross.amount) {
          return (
            <div key={`summary_${index}`}>
              <div className={styles.paymentSummaryRow}>
                {price} <TaxedMoney taxedMoney={summaryPrices[price]} />
              </div>
              <ShowHR name={price} />
            </div>
          );
        }
        return <> </>;
      })}

      <div>
        <div className={styles.paymentSummaryRowBold}>
          Grand Total <TaxedMoney taxedMoney={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export const OrderSummary = ({
  defaultShowSummary = false,
  formRef,
  externalItems,
  externalPaymentSummary,
}: any) => {
  const [showSummary, setShowSummary] = useState(false);
  const { items: cartItems } = useCartState();
  const items = externalItems || cartItems;

  const totalQuantity = items?.length
    ? items.reduce((total, curr) => {
        total += curr.quantity;
        return total;
      }, 0)
    : 0;

  const itemsToShow = showSummary ? items : items.slice(0, 2);
  return (
    <div className={styles.orderSummaryContainer}>
      <div
        className={styles.orderSummaryHeader}
        onClick={() => setShowSummary((prev) => !prev)}
      >
        <div>Order Summary ({totalQuantity} items) </div>
        {!defaultShowSummary && (
          <div>
            {showSummary ? (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show Less</span>
                <MemoUpArrow />
              </div>
            ) : (
              <div className={styles.showMoreContainer}>
                <span className={styles.showMoreContainerText}>Show More</span>
                <MemoDownArrow />
              </div>
            )}
          </div>
        )}
      </div>

      <ShowHR name="show" />
      <div>
        <OrderSummaryProductList externalItems={itemsToShow} />
      </div>
    </div>
  );
};

export const OrderSummaryProductList = ({
  externalItems,
}: {
  externalItems?: any;
}) => {
  const { items: cartItems } = useCartState();
  const items = externalItems || cartItems;
  return (
    <div className={styles.orderSummaryProductList}>
      {items.map((line, index) => {
        return (
          <>
            <OrderSummaryProduct line={line} />
            {items.length - 1 !== index ? <ShowHR name="show" /> : <> </>}
          </>
        );
      })}
    </div>
  );
};

export const OrderSummaryProduct: React.FC<{ line: CheckoutLineFragment }> = ({
  line,
}) => {
  const sortImages =
    line.variant?.images && line.variant?.images.length
      ? line.variant?.images
          .slice()
          .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
      : [line.variant.product.thumbnail];

  const imageUrlImgixScr =
    sortImages.length && imageURLReplaceWithCDN(sortImages[0].url);
  const altText = line.variant.images.length && line.variant.images[0].alt;
  const [mrp, netPrice, discount] = getThisVariantPrices(line.variant);

  return (
    <div className={styles.orderSummaryProduct}>
      <div className={styles.orderSummaryProductImage}>
        {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
          <Image
            src={imageUrlImgixScr}
            alt={altText || "Product Image"}
            width={150}
            height={150}
          />
        ) : (
          <>
            {imageUrlImgixScr && (
              <img width="100%" src={imageUrlImgixScr} alt={altText} />
            )}
          </>
        )}
      </div>
      <div className={styles.orderSummaryProductContent}>
        <div className={styles.orderSummaryProductContentName}>
          {line.variant.product.name}
        </div>
        <div className={styles.orderSummaryProductContentPriceContainer}>
          {mrp.gross.amount && discount.gross.amount ? (
            <div className={styles.undiscounted}>
              <TaxedMoney taxedMoney={mrp} />
            </div>
          ) : (
            <> </>
          )}
          <div className={styles.discounted}>
            <TaxedMoney taxedMoney={netPrice} />
          </div>
          {discount.gross.amount ? (
            <div className={styles.discount}>
              ({Math.round((discount.gross.amount / mrp.gross.amount) * 100)}
              )%off
            </div>
          ) : (
            <> </>
          )}
        </div>
        <div className={styles.quantity}> Quantity: {line.quantity} </div>
      </div>
    </div>
  );
};

const CheckoutForm = () => {
  const initialState = {
    firstName: { value: "", touched: false, hasError: true, error: "" },
    lastName: { value: "", touched: false, hasError: true, error: "" },
    phone: { value: "", touched: false, hasError: true, error: "" },
    email: { value: "", touched: false, hasError: true, error: "" },
    streetAddress1: { value: "", touched: false, hasError: true, error: "" },
    streetAddress2: { value: "", touched: false, hasError: true, error: "" },
    postalCode: { value: "", touched: false, hasError: true, error: "" },
    city: { value: "", touched: false, hasError: true, error: "" },
    countryArea: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  };

  const useCheckoutRes = useCheckout();
  const {
    availableShippingMethods,
    availablePaymentGateways,
    checkout,
    useCashback,
    userWalletBalance,
    promoCodeDiscount,
  } = useCheckoutState();

  const [formState, dispatch] = useReducer(
    formsReducer,
    initialState,
    initFunc
  );

  const [radioState, setradioState] = useState<PaymentRadioFields>(
    PaymentMethods.RAZORPAY
  );

  const [loading, setLoading] = useState(false);
  const [isTotalZero, setIsTotalZero] = useState(false);

  const paymentSummary = useCartState();

  useEffect(() => {
    if (
      availablePaymentGateways.length &&
      availablePaymentGateways[0].id === "mirumee.payments.wallet"
    ) {
      setIsTotalZero(true);
    } else {
      setIsTotalZero(false);
    }
  }, [availablePaymentGateways]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const products = paymentSummary.items.map((item) => {
        return {
          brand: META_DEFAULTS.name,
          id: item?.variant.sku,
          name: item?.variant.product.name,
          price: item?.variant.pricing.price.gross.amount,
          quantity: item.quantity,
        };
      });
      const quantity = paymentSummary.items.reduce(
        (partialSum, a) => partialSum + a?.quantity,
        0
      );
      (window.dataLayer = window.dataLayer || []).push({
        event: "Checkout",
        ecommerce: {
          checkout: {
            actionField: { step: 1, option: "checkout" },
            products: products,
            totalQuantity: quantity,
            "coupon discount": paymentSummary.couponDiscount?.gross?.amount,
            "offer discount": paymentSummary.offerDiscount?.gross?.amount,
            "order total": paymentSummary.totalPrice?.gross?.amount,
            "delivery charges": paymentSummary.shippingPrice?.gross?.amount,
            "prepaid discount": paymentSummary.prepaidDiscount?.gross?.amount,
            "total discount": paymentSummary.discount?.amount,
            "total cart value": paymentSummary.totalPrice?.gross?.amount,
          },
        },
      });
    }
  }, []);

  const { isFormValid, email, ...formStateWithoutEmail } = formState;

  const formRef = useRef(null);

  const formStateWithoutEmailWithValues = Object.keys(
    formStateWithoutEmail
  ).reduce((total, curr) => {
    const newObject = {};
    newObject[curr] = formStateWithoutEmail[curr].value;
    //

    return { ...total, ...newObject };
  }, {});

  const [showError, setShowError] = useState(false);

  const {
    setShippingAndBillingAddress,
    setShippingMethod,
    checkoutPaymentMethodUpdate,
    createRazorpayOrder,
    createPayment,
    completeCheckout,
    getWalletAmount,
  } = useCheckoutRes;

  const history = useCustomHistory();

  const { authenticated } = useAuthState();

  function loadScript(src: string) {
    return new Promise((resolve) => {
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

  const formSubmitHandler = async (e) => {
    setLoading(true);

    e.preventDefault(); //prevents the form from submitting

    let isFormValid = true;

    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const { hasError, error } = validateInput(
        name as IIAddressFieldNames,
        value,
        dispatch,
        formState,
        useCheckoutRes
      );
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }
    if (!isFormValid) {
      setShowError(true);
    } else {
      //Logic to submit the form to backend

      if (isTotalZero) {
        const createPaymentInput: CreatePaymentInput = {
          gateway: availablePaymentGateways[0]?.id,
          token: "not-charged",
        };
        const createPaymentRes = await createPayment(createPaymentInput);

        const completeCheckoutRes = await completeCheckout();
        if (
          !(completeCheckoutRes.errors && completeCheckoutRes.errors.length) &&
          completeCheckoutRes.data.checkoutComplete.order?.id
        ) {
          history.push("/order-placed");
        }
      } else {
        if (radioState === "mirumee.payments.razorpay") {
          const createRazorpayOrderRes = await createRazorpayOrder();

          const data =
            createRazorpayOrderRes.data.razorpayOrderCreate.razorpayOrder;
          const createPaymentInput: CreatePaymentInput = {
            gateway: availablePaymentGateways[0]?.id,
            token: data.id,
          };
          const createPaymentRes = await createPayment(createPaymentInput);

          const options = {
            key: availablePaymentGateways[0]?.config[0].value,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: META_DEFAULTS.name,
            description: META_DEFAULTS.title,
            prefill: {
              email: email.value,
              contact: formState["phone"].value,
            },
            theme: {
              color: theme.razorpayColor,
            },
            async handler(response: any) {
              setLoading(true);

              const paymentData = {
                token: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                razorpayOrderId: response.razorpay_order_id,
              };

              const completeCheckoutRes = await completeCheckout({
                paymentData,
              });
              if (
                !(
                  completeCheckoutRes.errors &&
                  completeCheckoutRes.errors.length
                ) &&
                completeCheckoutRes.data.checkoutComplete.order.id
              ) {
                history.push("/order-placed");
              }

              setLoading(false);
            },
          };

          if (!(createPaymentRes.errors && createPaymentRes.errors.length)) {
            const _window = window as any;
            const paymentObject = new _window.Razorpay(options);
            paymentObject.on(
              "payment.failed",
              function failed(response: any) {}
            );
            paymentObject.open();
          }
        }

        if (radioState === "mirumee.payments.dummy") {
          const createPaymentInput: CreatePaymentInput = {
            gateway: availablePaymentGateways[0]?.id,
            token: "not-charged",
          };
          const createPaymentRes = await createPayment(createPaymentInput);

          const completeCheckoutRes = await completeCheckout();
          if (
            !(
              completeCheckoutRes.errors && completeCheckoutRes.errors.length
            ) &&
            completeCheckoutRes.data.checkoutComplete.order.id
          ) {
            history.push("/order-placed");
          }
        }
      }
    }

    setLoading(false);

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  const handleRadioClick = async (id: string) => {
    switch (id) {
      case "online": {
        setradioState("mirumee.payments.razorpay");
        setLoading(true);
        await checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.razorpay",
          useCashback,
        });
        setLoading(false);
        break;
      }
      case "cod": {
        setradioState("mirumee.payments.dummy");
        setLoading(true);
        await checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.dummy",
          useCashback,
        });
        setLoading(false);
        break;
      }

      default: {
        setradioState("mirumee.payments.razorpay");
        setLoading(true);
        await checkoutPaymentMethodUpdate({
          gateway: "mirumee.payments.razorpay",
          useCashback,
        });
        setLoading(false);
        break;
      }
    }
  };

  const handleCheckboxWallet = async () => {
    setLoading(true);

    await checkoutPaymentMethodUpdate({
      gateway: radioState,
      useCashback: !useCashback,
    });

    setLoading(false);
  };

  const debouncedSetAddress = React.useRef(
    debounce(async (formStateWithoutEmailWithValues, email) => {
      setLoading(true);

      const resAddress = await setShippingAndBillingAddress(
        { ...formStateWithoutEmailWithValues, country: { code: "IN" } },
        email.value
      );

      if (
        !checkout.shippingMethod &&
        resAddress?.resShipping.data.checkoutShippingAddressUpdate.checkout
          .availableShippingMethods
      ) {
        const setShippingMethodRes = await setShippingMethod(
          resAddress?.resShipping.data.checkoutShippingAddressUpdate.checkout
            .availableShippingMethods[0]?.id
        );
      }

      // console.log("form-state", formStateWithoutEmailWithValues, email);
      if(typeof window !== 'undefined'){
        (window.dataLayer || []).push({ ecommerce: null });
        window.dataLayer.push({
          event: "Checkout Value Updated",
          ecommerce: {
            purchase: {
              actionField: {
                "First Name": formStateWithoutEmailWithValues?.firstName,
                "Last Name": formStateWithoutEmailWithValues?.lastName,
                Email: email?.value,
                Phone: formStateWithoutEmailWithValues?.phone,
              },
            },
          },
        });
      }

      setLoading(false);
    }, 800)
  ).current;

  useEffect(() => {
    if (
      availableShippingMethods &&
      availableShippingMethods.length &&
      availableShippingMethods[0]?.id
    ) {
      setShippingMethod(availableShippingMethods[0]?.id);
    }
    if (
      availablePaymentGateways &&
      availablePaymentGateways.length &&
      availablePaymentGateways[0]?.id
    ) {
      checkoutPaymentMethodUpdate({
        gateway: availablePaymentGateways[0]?.id,
        useCashback,
      });
    }
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  useEffect(() => {
    let hasError = false,
      error = "";
    const { getCityStateFromPincode } = useCheckoutRes;
    if (!formState[IIAddressFieldNames.POSTAL_CODE].hasError) {
      getCityStateFromPincode(
        formState[IIAddressFieldNames.POSTAL_CODE].value
      ).then(({ data }) => {
        if (!(data && data?.pincode)) {
          hasError = true;
          error = "Invalid Pincode";
          dispatch({
            type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
            data: {
              name: IIAddressFieldNames.POSTAL_CODE,
              value: formState[IIAddressFieldNames.POSTAL_CODE].value,
              hasError,
              error,
              touched: true,
              isFormValid: false,
            },
          });
        } else if (!data?.pincode?.serviceable) {
          hasError = true;
          error = "Pincode is not serviceable!";
        } else {
          let isFormValid = true;
          const cityAndStateData = {
            ...formState,
            city: {
              value: data?.pincode?.city,
              touched: true,
              hasError: false,
              error: "",
            },
            countryArea: {
              value: data?.pincode?.state,
              touched: false,
              hasError: false,
              error: "",
            },
          };
          for (const name in cityAndStateData) {
            const item = cityAndStateData[name];
            const { value } = item;
            const { hasError, error } = validateInput(
              name as IIAddressFieldNames,
              value,
              dispatch,
              cityAndStateData,
              useCheckoutRes
            );

            if (hasError) {
              isFormValid = false;
            }
            if (name) {
              dispatch({
                type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
                data: {
                  name,
                  value,
                  hasError,
                  error,
                  touched: true,
                  isFormValid,
                },
              });
            }
          }
        }
      });
    }
  }, [formState[IIAddressFieldNames.POSTAL_CODE].value]);

  useEffect(() => {
    if (authenticated) {
      getWalletAmount();
    }
  }, [authenticated]);
  useEffect(() => {
    if (formState.isFormValid) {
      debouncedSetAddress(formStateWithoutEmailWithValues, email);
    }
  }, [JSON.stringify({ ...formStateWithoutEmailWithValues, email })]);
  const FormCreator: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    return (
      <>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map((row) => {
                if (row.type === "select") {
                  return (
                    <div className={styles.inputErroDiv} key={row.name}>
                      <Select
                        key={row.name}
                        variant={1}
                        customStyles={styles}
                        name={row.name}
                        id={row.id}
                        placeholder={row.placeholder}
                        value={row.value || formState[row.name].value}
                        autoComplete={row.autoComplete}
                        inputMode={row.inputMode}
                        selectOptions={row?.selectOptions || []}
                        onChange={(e) => {
                          onInputChange(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }}
                        onBlur={(e) => {
                          onFocusOut(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }}
                      />
                      {formState[row.name].touched &&
                        formState[row.name].hasError && (
                          <div className={styles.errorMessage}>
                            {formState[row.name].error}
                          </div>
                        )}
                    </div>
                  );
                }
                return (
                  <div className={styles.inputErroDiv} key={row.name}>
                    <Input
                      key={row.name}
                      variant={1}
                      customStyles={styles}
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      placeholder={row.placeholder}
                      value={formState[row.name].value}
                      autoComplete={row.autoComplete}
                      inputMode={row.inputMode}
                      onChange={(e) => {
                        onInputChange(
                          row.name,
                          e.target.value,
                          dispatch,
                          formState,
                          useCheckoutRes
                        );
                      }}
                      onBlur={(e) => {
                        if (row.name !== IIAddressFieldNames.POSTAL_CODE) {
                          onFocusOut(
                            row.name,
                            e.target.value,
                            dispatch,
                            formState,
                            useCheckoutRes
                          );
                        }
                      }}
                    />
                    {formState[row.name].touched &&
                      formState[row.name].hasError && (
                        <div className={styles.errorMessage}>
                          {formState[row.name].error}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  const RadioButtonCotainer: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    const { prepaidDiscount } = useCartState();

    return (
      <S.RadioContainer
        className={styles.radioContainer}
        isTotalZero={isTotalZero}
      >
        <div>CHOOSE PAYMENT METHOD</div>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map((row) => {
                return (
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={() => {
                      handleRadioClick(row.id);
                    }}
                  >
                    <Input
                      key={row.name}
                      label={
                        <div className={styles.radioLabelContainer}>
                          <div> {row.label} </div>
                          {row.id === "online" ? (
                            row.meta.labelDescription &&
                            prepaidDiscount &&
                            prepaidDiscount.gross.amount ? (
                              <div> {row.meta.labelDescription} </div>
                            ) : (
                              <> </>
                            )
                          ) : row.meta.labelDescription ? (
                            <div> {row.meta.labelDescription} </div>
                          ) : (
                            <> </>
                          )}

                          {row.meta.labelSVG && (
                            <MemoPaySVG width={295} height={27} />
                          )}
                        </div>
                      }
                      checked={row?.value === radioState}
                      variant={1}
                      customStyles={styles}
                      customStylesName="radioInputContainer"
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      value={row?.value}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </S.RadioContainer>
    );
  };

  const WalletCheckbox: React.FC<{ formData: Array<IAddressField>[] }> = ({
    formData,
  }) => {
    const { authenticated, user } = useAuthState();

    if (authenticated && userWalletBalance) {
      return (
        <div className={styles.checkboxContainer}>
          {formData.map((rows, index) => {
            return (
              <div className={styles.row} key={index}>
                {rows.map((row) => {
                  return (
                    <div
                      className={styles.inputErroDiv}
                      key={row.name}
                      onClick={handleCheckboxWallet}
                    >
                      <Input
                        key={row.name}
                        label={
                          <>
                            {row.label} (&#8377; {userWalletBalance})
                          </>
                        }
                        checked={useCashback}
                        variant={1}
                        customStyles={styles}
                        customStylesName="radioInputContainer"
                        type={row.type}
                        name={row.name}
                        id={row.id}
                        placeholder={row.placeholder}
                        value={row?.value || formState[row.name].value}
                        autoComplete={row.autoComplete}
                        inputMode={row.inputMode}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }
    return <> </>;
  };

  const WhatsappCheckbox: React.FC<{
    formData: Array<IAddressField>[];
    mutation: MutationFn<
      updateCheckoutMetadatWhatsapp,
      updateCheckoutMetadatWhatsappVariables
    >;
  }> = React.memo(({ formData, mutation }) => {
    const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = useState(false);

    const handleCheckboxWhatsapp = async () => {
      setUpdatesOnWhatsapp((prev) => {
        const input = {
          key: "sendInvoiceToWhatsApp",
          value: !prev ? "true" : "false",
        };
        mutation({
          variables: {
            id: checkout.id,
            input: [input],
          },
        });

        return !prev;
      });
    };

    return (
      <div className={styles.checkboxContainer}>
        {formData.map((rows, index) => {
          return (
            <div className={styles.row} key={index}>
              {rows.map((row) => {
                return (
                  <div
                    className={styles.inputErroDiv}
                    key={row.name}
                    onClick={handleCheckboxWhatsapp}
                  >
                    <Input
                      key={row.name}
                      label={
                        <div className={styles.whatsappCheckboxLabel}>
                          {row.meta.labelSVG && <MemoWhatsapp />}
                          <div> {row.label} </div>
                        </div>
                      }
                      checked={updatesOnWhatsapp}
                      variant={1}
                      customStyles={styles}
                      customStylesName="whatsappInputContainer"
                      type={row.type}
                      name={row.name}
                      id={row.id}
                      placeholder={row.placeholder}
                      value={row?.value || formState[row.name].value}
                      autoComplete={row.autoComplete}
                      inputMode={row.inputMode}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      {loading && (
        <div className={styles.loader}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <CheckoutLoginSection dispatch={dispatch} />

          <S.FormContainer className={styles.formContainer} loading={loading}>
            <form
              id="checkoutAddressForm"
              className={styles.form}
              onSubmit={(e) => formSubmitHandler(e)}
              ref={formRef}
            >
              <div className={styles.formFieldsContainer}>
                <>
                  {addressFileds.map((rows, index) => {
                    return (
                      <div className={styles.row} key={index}>
                        {rows.map((row) => {
                          if (row.type === "select") {
                            return (
                              <div
                                className={styles.inputErroDiv}
                                key={row.name}
                              >
                                <Select
                                  key={row.name}
                                  variant={1}
                                  customStyles={styles}
                                  name={row.name}
                                  id={row.id}
                                  placeholder={row.placeholder}
                                  value={row.value || formState[row.name].value}
                                  autoComplete={row.autoComplete}
                                  inputMode={row.inputMode}
                                  selectOptions={row?.selectOptions || []}
                                  onChange={(e) => {
                                    onInputChange(
                                      row.name,
                                      e.target.value,
                                      dispatch,
                                      formState,
                                      useCheckoutRes
                                    );
                                  }}
                                  onBlur={(e) => {
                                    onFocusOut(
                                      row.name,
                                      e.target.value,
                                      dispatch,
                                      formState,
                                      useCheckoutRes
                                    );
                                  }}
                                />
                                {formState[row.name].touched &&
                                  formState[row.name].hasError && (
                                    <div className={styles.errorMessage}>
                                      {formState[row.name].error}
                                    </div>
                                  )}
                              </div>
                            );
                          }
                          return (
                            <div className={styles.inputErroDiv} key={row.name}>
                              <Input
                                key={row.name}
                                variant={1}
                                customStyles={styles}
                                type={row.type}
                                name={row.name}
                                id={row.id}
                                placeholder={row.placeholder}
                                value={formState[row.name].value}
                                autoComplete={row.autoComplete}
                                inputMode={row.inputMode}
                                onChange={(e) => {
                                  onInputChange(
                                    row.name,
                                    e.target.value,
                                    dispatch,
                                    formState,
                                    useCheckoutRes
                                  );
                                }}
                                onBlur={(e) => {
                                  if (
                                    row.name !== IIAddressFieldNames.POSTAL_CODE
                                  ) {
                                    onFocusOut(
                                      row.name,
                                      e.target.value,
                                      dispatch,
                                      formState,
                                      useCheckoutRes
                                    );
                                  }
                                }}
                              />
                              {formState[row.name].touched &&
                                formState[row.name].hasError && (
                                  <div className={styles.errorMessage}>
                                    {formState[row.name].error}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </>
              </div>
            </form>

            <div className={styles.form}>
              <div className={styles.mobileOrderSummary}>
                <OrderSummary formRef={formRef} />
                <ApplyCouponCode setLoading={setLoading} />
                <div className={styles.paymentSummaryContainerWrapper}>
                  <PaymentSummary paymentSummary={paymentSummary} toggle />
                </div>
              </div>
              <WalletCheckbox formData={checkboxFields} />
              <RadioButtonCotainer formData={paymentRadioFields} />

              <TypedUpdateCheckoutMetadataWhatsapp>
                {(mutation) => (
                  <WhatsappCheckbox
                    formData={whatsappCheckboxFields}
                    mutation={mutation}
                  />
                )}
              </TypedUpdateCheckoutMetadataWhatsapp>
              <div className={styles.stickyButtonContainer}>
                <div className={styles.stickyButtonContainerElement}>
                  <TaxedMoney taxedMoney={checkout.totalPrice} />
                </div>
                <Input
                  variant={2}
                  type="submit"
                  value="Place Order"
                  customStyles={styles}
                  customStylesName="placeOrderButton"
                  form="checkoutAddressForm"
                />
              </div>
            </div>
          </S.FormContainer>
        </div>
        <div className={styles.desktopOrderSummary}>
          <OrderSummary formRef={formRef} />

          <ApplyCouponCode setLoading={setLoading} />
          <div className={styles.paymentSummaryContainerWrapper}>
            <PaymentSummary
              paymentSummary={paymentSummary}
              toggle
              defaultShowPaceOrderButton
            />
          </div>
        </div>
      </div>
    </>
  );
};

CheckoutV2.displayName = "CheckoutV2";
export default React.memo(CheckoutV2);
