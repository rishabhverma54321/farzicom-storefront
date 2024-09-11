import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";

import { CheckoutAddress } from "@components/organisms/CheckoutAddress";
// @ts-ignore
import {
  useAuthState,
  useCheckout,
  useCart,
  AddressTypes,
  useCartState,
} from "@saleor/sdk";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { commonMessages } from "@temp/intl";
import { IAddress, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import {
  OverlayContext,
  OverlayType,
  OverlayTheme,
} from "../../../../components/Overlay";
// import { useLocalStorage } from "@hooks/useLocalStorage";
// import makeClevertap from "Themes/lib/makeClevertap.js";
// import clevertapEvents from "Themes/lib/clevertapEvents.js";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

interface IProps {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
  stopLoader: () => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  IProps
> = (
  { changeSubmitProgress, onSubmitSuccess, stopLoader, ...props }: IProps,
  ref
) => {
  const checkoutShippingAddressFormId = "shipping-address-form";
  const checkoutShippingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutBillingAddressFormId = "billing-address-form";
  const checkoutBillingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";

  const { user } = useAuthState();
  const {
    checkout,
    selectedShippingAddressId,
    selectedBillingAddressId,
    setBillingAddress,
    setAddressType,
    setShippingMethod,
    setShippingAndBillingAddress,
  } = useCheckout();

  const { items } = useCartState();

  const { addItem, removeItem } = useCart();

  // const { setValue } = useLocalStorage("email");

  const { countries } = useContext(ShopContext);

  const [shippingErrors, setShippingErrors] = useState<IFormError[]>([]);
  const [billingErrors, setBillingErrors] = useState<IFormError[]>([]);

  const intl = useIntl();

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );
  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;
  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;

  useImperativeHandle(ref, () => ({
    submitAddress: () => {
      if (isShippingRequiredForProducts) {
        //
        // debugger;
        const event = new Event("submit", { cancelable: true });
        event.preventDefault();
        checkoutShippingAddressFormRef.current?.dispatchEvent(event);
      } else {
        checkoutBillingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const [billingAsShippingState, setBillingAsShippingState] = useState(true);

  useEffect(() => {
    //
    setBillingAsShippingState(true);
  }, []);

  const { show } = useContext(OverlayContext);
  const handleSetShippingAddress = async (
    address?: IAddress,
    email?: string,
    type?: AddressTypes,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      setShippingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide shipping address.",
          }),
        },
      ]);
      return;
    }

    const shippingEmail = email || user?.email || "";

    if (!shippingEmail || shippingEmail === "dummy@dummy.com") {
      setShippingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    changeSubmitProgress(true);
    const res = await setShippingAndBillingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );

    if (res?.dataError?.error.length) {
      const error = res?.dataError.error[0];
      show(OverlayType.message, OverlayTheme.modal, {
        title: `${error.message}, ${error.field}`,
        status: "error",
      });
      setShippingErrors(res?.dataError?.error);
    } else {
      changeSubmitProgress(false);
      setShippingErrors([]);
      setAddressType(res.data?.shippingData?.shippingAddress.id, type!);
      setAddressType(res.data?.billingData?.billingAddress.id, type!);
      if (
        res.data?.shippingData?.availableShippingMethods &&
        res.data?.shippingData?.availableShippingMethods.length > 0
      )
        setShippingMethod(
          res.data?.shippingData?.availableShippingMethods[0].id
        ).then(res => {
          if (res?.dataError?.error.length) {
            stopLoader();
            const error = res?.dataError.error[0];
            show(OverlayType.message, OverlayTheme.modal, {
              title: `${error.message}, ${error.field}`,
              status: "error",
            });
            setShippingErrors(res?.dataError?.error);
          } else {
            handleSetBillingAddress(address, email, userAddressId);
            onSubmitSuccess();
          }
        });
    }
  };

  const handleSetBillingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      setBillingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide billing address.",
          }),
        },
      ]);
      return;
    }

    const billingEmail = email || user?.email;

    if (
      !billingEmail &&
      !billingAsShippingState &&
      !isShippingRequiredForProducts
    ) {
      setBillingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    changeSubmitProgress(true);

    const { dataError } = await setBillingAddress(
      {
        ...address,
        id: userAddressId,
      },
      billingEmail
    );
    const errors = dataError?.error;

    changeSubmitProgress(false);
    if (errors) {
      setBillingErrors(errors);
    } else {
      setBillingErrors([]);
      onSubmitSuccess();
    }
  };

  const userAdresses = user?.addresses
    ?.filter(filterNotEmptyArrayItems)
    .map(address => ({
      address: {
        ...address,
        isDefaultBillingAddress: address.isDefaultBillingAddress || false,
        isDefaultShippingAddress: address.isDefaultShippingAddress || false,
        phone: address.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  return (
    <CheckoutAddress
      {...props}
      shippingErrors={shippingErrors}
      billingErrors={billingErrors}
      shippingFormId={checkoutShippingAddressFormId}
      shippingFormRef={checkoutShippingAddressFormRef}
      billingFormId={checkoutBillingAddressFormId}
      billingFormRef={checkoutBillingAddressFormRef}
      checkoutShippingAddress={checkoutShippingAddress}
      checkoutBillingAddress={checkoutBillingAddress}
      billingAsShippingAddress={billingAsShippingState}
      email={checkout?.email}
      userAddresses={userAdresses}
      selectedUserShippingAddressId={selectedShippingAddressId}
      selectedUserBillingAddressId={selectedBillingAddressId}
      countries={countries}
      userId={user?.id}
      newAddressFormId={checkoutNewAddressFormId}
      shippingAddressRequired={!!isShippingRequiredForProducts}
      setShippingAddress={handleSetShippingAddress}
      setBillingAddress={handleSetBillingAddress}
      setBillingAsShippingAddress={setBillingAsShippingState}
    />
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };
