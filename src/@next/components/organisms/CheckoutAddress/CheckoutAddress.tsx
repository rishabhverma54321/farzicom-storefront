import React, { useState } from "react";
// import { FormattedMessage } from "react-intl";

// import { checkoutMessages } from "@temp/intl";
import { filterNotEmptyArrayItems } from "@utils/misc";

import { CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country } from "@saleor/sdk/lib/mutations/gqlTypes/CreateUserAddress";
import { AddressForm } from "../AddressForm";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = React.memo(
  ({
    checkoutShippingAddress,
    checkoutBillingAddress,
    billingAsShippingAddress = true,
    email,
    selectedUserShippingAddressId,
    selectedUserBillingAddressId,
    userAddresses,
    countries,
    userId,
    shippingFormId,
    shippingFormRef,
    billingFormId,
    billingFormRef,
    shippingAddressRequired,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    shippingErrors,
    billingErrors,
    newAddressFormId,
  }: IProps) => {
    const [address] = useState(checkoutShippingAddress);
    const country: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country = {
      __typename: "CountryDisplay",
      code: "IN",
      country: "India",
    };
    return (
      <S.Wrapper>
        {shippingAddressRequired && (
          <>
            <section>
              <AddressForm
                testingContext="shippingAddressForm"
                formId={shippingFormId}
                formRef={shippingFormRef}
                countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
                address={{
                  ...address,
                  email,
                }}
                handleSubmit={async addr => {
                  // debugger;
                  const address = {
                    ...addr,
                    country,
                  };
                  if (address !== undefined) {
                    setShippingAddress(address, address?.email, address.type);
                  }
                }}
                includeEmail
                shippingErrors={shippingErrors}
              />
              {/* } */}
            </section>
          </>
        )}
      </S.Wrapper>
    );
  }
);

export { CheckoutAddress };
