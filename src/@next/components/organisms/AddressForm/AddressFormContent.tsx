import React, { useCallback, useState, useEffect } from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";

// @ts-ignore
import {
  AddressTypes,
  AddressTypeType,
  useAuth,
  useCheckout,
  useWallet,
} from "@saleor/sdk";
import pick from "lodash/pick";
import { filterNotEmptyArrayItems } from "@utils/misc";
import { CLIENT } from "Themes/config";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@material-ui/core";
import { IAddress, IAddressWithEmailAndTypes } from "@types";
import { InputLabel } from "@components/atoms/InputLabel";
import FormLabel from "@mui/material";
import FormControl from "@mui/material";
import FormControlLabel from "@mui/material";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import { defaultTheme } from "Themes/globalStyles";
import makeClevertap from "Themes/lib/makeClevertap.js";
import Media from "react-responsive";
import { mediumScreen } from "@styles/constants";
import AddressSelector from "../../molecules/AddressSelector/AddressSelector";
import * as S from "./styles";
import { PropsWithFormik } from "./types";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
// @ts-ignore

const stateOptions = [
  { name: "State" },
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chhattisgarh" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Orissa" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
  { name: "Andaman Nicobar" },
  { name: "Chhattisgarh" },
  { name: "Daman Diu" },
  { name: "Delhi" },
  { name: "Jammu & Kashmir" },
  { name: "Ladakh" },
  { name: "Lakshadweep" },
  { name: "Puducherry" },
];

const ADDRESS_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "postalCode",
  "city",
  "countryArea",
  "streetAddress1",
  "companyName",
  "streetAddress2",
  "type",
  "id",
  "country",
];

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  address,
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors,
  touched,
  handleSubmit,
  values,
  countriesOptions,
  defaultValue,
  setFieldValue,
  testingContext,
  includeEmail = false,
  shippingErrors,
  validateForm,
  setValues,
  submitCount,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const intl = useIntl();
  const fieldErrors: any = {};
  const [postalCodeError, setPostalCodeError] = useState("");
  const {
    setShippingAddress,
    setBillingAddress,
    getWalletAmount,
  } = useCheckout();

  const setCityAndState = (pin: string) => {
    fetch(process.env.API_URI!, {
      method: "POST",
      body: JSON.stringify({
        query: `
          query Pincode($pin: String) {
            pincode(pin: $pin){
              city
              state
              serviceable
            } 
          }
        `,
        variables: {
          pin,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res?.data?.pincode) {
          if (res?.data?.pincode?.serviceable) {
            const city =
              res?.data?.pincode?.city?.charAt(0).toUpperCase() +
              res?.data?.pincode?.city?.slice(1).toLowerCase();
            const state = res?.data?.pincode?.state?.includes(" ")
              ? res?.data?.pincode?.state
              : res?.data?.pincode?.state?.charAt(0).toUpperCase() +
                res?.data?.pincode?.state?.slice(1).toLowerCase();
            setFieldValue("city", city);
            setFieldValue("countryArea", state);
          } else {
            setPostalCodeError("Pincode is not serviceable");
            setFieldValue("city", "");
            setFieldValue("countryArea", "State");
          }
        } else {
          setPostalCodeError("The value is not valid for the address.");
          setFieldValue("city", "");
          setFieldValue("countryArea", "State");
        }
      })
      .catch(err => console.log(err));

    //   fetch(`https://api.postalpincode.in/pincode/${pin}`)
    //     .then(res => {
    //       res.json().then(val => {
    //         if (val?.[0].Status === "Error") {
    //           setPostalCodeError(val?.[0]?.Message);
    //           return;
    //         }
    //         const apiCity = val?.[0]?.PostOffice?.[0]?.District;
    //         let apiState = val?.[0]?.PostOffice?.[0]?.State;
    //         if (apiState === "Chattisgarh") {
    //           apiState = "Chhattisgarh";
    //         }
    //         setFieldValue("city", apiCity);
    //         setFieldValue("countryArea", apiState);
    //       });
    //     })
    //     .catch(e => {
    //       // console.log(e);
    //     });
    // };
  };

  if (shippingErrors) {
    shippingErrors.map(
      ({ field, message }: { field: string; message: string }) => {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      }
    );
  }

  // const [walletBalance, setWalletBalance] = useState(false);
  // const [addressType, setAddressType] = useState("work");
  const getAddressType = (type: any) => {
    switch (type) {
      case AddressTypeType.ADDRESSTYPES_HOME:
        return AddressTypes.HOME;

      case AddressTypeType.ADDRESSTYPES_WORK:
        return AddressTypes.WORK;

      case AddressTypeType.ADDRESSTYPES_OTHER:
        return AddressTypes.OTHER;

      default:
        return AddressTypes.HOME;
    }
  };
  const { user } = useAuthState();

  const handleSelectAddress = (address: Partial<IAddressWithEmailAndTypes>) => {
    let addressWithPickedFields = pick(address, ADDRESS_FIELDS);
    // console.log("handleselectaddress", user?.email);
    if (addressWithPickedFields?.phone?.length! > 10) {
      addressWithPickedFields.phone = addressWithPickedFields?.phone?.slice(3);
    }
    addressWithPickedFields = {
      ...addressWithPickedFields,
      email: user?.email?.toString().includes("@example.com")
        ? // @ts-ignore
          user?.metadata.filter(meta => meta?.key === "alt_email")[0]?.value ||
          ""
        : user?.email,
    };
    setValues(addressWithPickedFields);
    setFieldValue("countryArea", addressWithPickedFields?.countryArea!);
    setFieldValue("type", getAddressType(addressWithPickedFields.type));
    localStorage.setItem(
      "selectedAddress",
      JSON.stringify(addressWithPickedFields)
    );
  };
  const addresses = user?.addresses
    ?.filter(
      // @ts-ignore
      addr => filterNotEmptyArrayItems(addr) && !addr.isDefaultBillingAddress
    )
    // @ts-ignore
    .map(address => ({
      address: {
        ...address,
        isDefaultBillingAddress: address?.isDefaultBillingAddress || false,
        isDefaultShippingAddress: address?.isDefaultShippingAddress || false,
        phone: address?.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  const onLoginClevertap = async () => {
    const walletAmount = user ? await getWalletAmount() : { data: 0 };
    if (
      values &&
      values.phone &&
      values.email &&
      errors.phone === undefined &&
      errors.email === undefined
    ) {
      const clevertap = makeClevertap();
      const ctp = {
        Name: `${values?.firstName} ${values.lastName}`,
        Email: values.email,
        Phone: `+91${values.phone}`,
        Identity: `+91${values.phone}`,
        "Net Cashback": walletAmount.data,
      };
      // console.log("🚀 ~ file: Page.tsx ~ line 54 ~ ctp", ctp);
      clevertap.onUserLogin.push({
        Site: ctp,
      });
    }
  };

  useEffect(() => {
    setMyAddresses(addresses);
    if (address && address?.firstName !== "dummy") {
      handleSelectAddress(address);
    } else if (addresses?.length) handleSelectAddress(addresses[0].address);
  }, [user]);
  const [myAddresses, setMyAddresses] = useState(addresses);

  useEffect(() => {
    let count = 0;

    while (
      errors[ADDRESS_FIELDS[count]] === undefined &&
      count < ADDRESS_FIELDS.length - 2
    ) {
      // console.log("AddressFormContent", errors[ADDRESS_FIELDS[count]]);
      count++;
    }
    if (count < ADDRESS_FIELDS.length - 2)
      document.getElementsByName(ADDRESS_FIELDS[count])[0].focus();
    else if (!values?.firstName)
      document.getElementsByName(ADDRESS_FIELDS[0])[0].focus();
  }, [submitCount]);
  return (
    <S.AddressForm
      id={formId}
      ref={formRef}
      onSubmit={e => {
        // debugger;
        onLoginClevertap();
        handleSubmit!(e);
      }}
      data-test={testingContext}
    >
      <S.Wrapper>
        {Boolean(user) && (
          <AddressSelector
            addresses={myAddresses || []}
            setAddress={handleSelectAddress}
            setMyAddresses={setMyAddresses}
          />
        )}

        <S.Card>
          <S.RowWithTwoCells
            style={{
              marginBottom:
                errors?.firstName || errors?.lastName ? "2rem" : "0px",
            }}
          >
            <S.StyledTextField
              // ref={firstNameRef}
              name="firstName"
              label={intl.formatMessage({
                defaultMessage: "First Name",
              })}
              value={values!.firstName}
              autoComplete="family-name"
              inputMode="text"
              helpText={
                errors.firstName && touched?.firstName && errors.firstName
              }
              {...basicInputProps()}
            />
            <S.StyledTextField
              name="lastName"
              label={intl.formatMessage({
                defaultMessage: "Last Name",
              })}
              value={values!.lastName}
              autoComplete="family-name"
              inputMode="text"
              helpText={
                errors.lastName && touched?.lastName ? errors.lastName : ""
              }
              {...basicInputProps()}
            />
          </S.RowWithTwoCells>
          <S.RowWithTwoCells
            style={{
              marginBottom: errors?.email || errors?.phone ? "1rem" : "0px",
            }}
          >
            <S.StyledTextField
              name="email"
              label={intl.formatMessage(commonMessages.shortEmail)}
              value={values!.email}
              autoComplete="email"
              helpText={errors.email && touched?.email ? errors.email : ""}
              onChange={basicInputProps().onChange}
              onBlur={e => {
                basicInputProps().onBlur?.(e);
                onLoginClevertap();
              }}
              // {...basicInputProps()}
            />
            <S.StyledTextField
              name="phone"
              label={intl.formatMessage(commonMessages.phone)}
              value={values!.phone || undefined}
              inputMode="numeric"
              autoComplete="tel"
              helpText={errors.phone && touched?.phone ? errors.phone : ""}
              onChange={basicInputProps().onChange}
              onBlur={e => {
                basicInputProps().onBlur?.(e);
                onLoginClevertap();
              }}
            />
          </S.RowWithTwoCells>
        </S.Card>
        <S.Card>
          <S.RowWithThreeCells
            style={{
              marginBottom:
                errors?.postalCode || errors?.city || errors?.countryArea
                  ? "2rem"
                  : "0px",
            }}
          >
            <S.StyledTextField
              name="postalCode"
              label={intl.formatMessage({
                defaultMessage: "Pincode",
              })}
              value={values!.postalCode}
              autoComplete="postal-code"
              errors={fieldErrors!.postalCode}
              helpText={
                (errors.postalCode || postalCodeError) && touched?.postalCode
                  ? errors.postalCode || postalCodeError
                  : ""
              }
              onBlur={basicInputProps().onBlur}
              onChange={e => {
                if (postalCodeError) setPostalCodeError("");
                basicInputProps().onChange?.(e);
                if (
                  e.currentTarget.value.toString().length === 6 &&
                  e.currentTarget.value.toString() !== values!.postalCode
                ) {
                  setCityAndState(e.currentTarget.value);
                }
              }}
            />
            <S.StyledTextField
              name="city"
              label={intl.formatMessage({ defaultMessage: "City" })}
              value={values!.city}
              autoComplete="address-level2"
              // errors={fieldErrors!.city}
              helpText={errors.city && touched?.city ? errors.city : ""}
              {...basicInputProps()}
            />

            <S.SelectWrapper>
              <S.Select
                autoComplete="address-level1"
                name="countryArea"
                value={values?.countryArea}
                onChange={val => {
                  // console.log(val.target.value);
                  setFieldValue("countryArea", val.target.value);
                }}
              >
                {stateOptions.map(option => {
                  return (
                    <S.Option disabled={option?.name! === "State"}>
                      {option.name}
                    </S.Option>
                  );
                })}
              </S.Select>
              {values?.countryArea! !== "State" && (
                <InputLabel active labelBackground="white">
                  State
                </InputLabel>
              )}
              {errors.countryArea && touched?.countryArea && (
                <S.ErrorTextWrapper>
                  <S.ErrorText>{errors.countryArea}</S.ErrorText>
                </S.ErrorTextWrapper>
              )}
            </S.SelectWrapper>
          </S.RowWithThreeCells>
          <S.RowWithOneCell
            style={{
              marginBottom: errors?.streetAddress1 ? "2rem" : "0px",
              marginTop: "2rem",
            }}
          >
            <S.StyledTextField
              name="streetAddress1"
              label={intl.formatMessage({
                defaultMessage: "Address 1 (House No, Building, Street, Area)",
              })}
              value={values!.streetAddress1}
              autoComplete="address-line1"
              helpText={
                errors.streetAddress1 && touched?.streetAddress1
                  ? errors.streetAddress1
                  : ""
              }
              // errors={fieldErrors!.streetAddress1}
              onBlur={e => {
                // console.log(
                // // "🚀 ~ file: AddressFormContent.tsx ~ line 380 ~ values",
                // // values
                // // );
                if (values) {
                  const {
                    firstName,
                    lastName,
                    email,
                    phone,
                    postalCode,
                    city,
                    countryArea,
                    streetAddress1,
                  } = values;
                  const address: IAddress = {
                    firstName,
                    lastName,
                    phone,
                    postalCode,
                    city,
                    countryArea,
                    streetAddress1,
                    country: {
                      code: "IN",
                      country: "India",
                    },
                  };
                  // console.log(
                  // // "🚀 ~ file: AddressFormContent.tsx ~ line 391 ~ address",
                  // // address
                  // // );

                  if (
                    firstName &&
                    lastName &&
                    email &&
                    phone &&
                    postalCode &&
                    city &&
                    countryArea &&
                    streetAddress1
                  ) {
                    (async function setAddress() {
                      await setShippingAddress(address, values.email!);

                      await setBillingAddress(address, values.email!);
                    })();
                  }
                }
                basicInputProps().onBlur?.(e);
              }}
              onChange={basicInputProps().onChange}
              // {...basicInputProps()}
            />
          </S.RowWithOneCell>
          <S.RowWithOneCell
            style={{
              marginBottom: errors?.streetAddress2 ? "2rem" : "0px",
              marginTop: "2rem",
            }}
          >
            <S.StyledTextField
              name="streetAddress2"
              label={intl.formatMessage({
                defaultMessage: "Address 2 (Locality, Landmark, Town)",
              })}
              value={values!.streetAddress2}
              autoComplete="address-line2"
              helpText={
                errors.streetAddress2 && touched?.streetAddress2
                  ? errors.streetAddress2
                  : ""
              }
              // errors={fieldErrors!.streetAddress2}
              {...basicInputProps()}
            />
          </S.RowWithOneCell>
          <S.RowWithOneCell>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                aria-label="type"
                name="type"
                value={values!.type}
                // onChange={e => setAddressType(e.target.value)}
                style={{ flexDirection: "row" }}
                {...basicInputProps()}
              >
                <FormControlLabel
                  value={AddressTypes.HOME}
                  control={
                    <Radio
                      style={{
                        color: defaultTheme.colors.checkboxRadioColor,
                      }}
                    />
                  }
                  label="Home"
                />
                <FormControlLabel
                  value={AddressTypes.WORK}
                  control={
                    <Radio
                      style={{
                        color: defaultTheme.colors.checkboxRadioColor,
                      }}
                    />
                  }
                  label="Work"
                />
                <FormControlLabel
                  value={AddressTypes.OTHER}
                  control={
                    <Radio
                      style={{
                        color: defaultTheme.colors.checkboxRadioColor,
                      }}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </S.RowWithOneCell>
        </S.Card>
      </S.Wrapper>
    </S.AddressForm>
  );
};
