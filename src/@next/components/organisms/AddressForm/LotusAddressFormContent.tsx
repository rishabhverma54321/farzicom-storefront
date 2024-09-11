import React, { useCallback, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Header, Container } from "@components/templates/Checkout/styles";
import Media from "react-media";
import { commonMessages } from "@temp/intl";

// @ts-ignore
import {
  AddressTypes,
  AddressTypeType,
  useAuthState,
  useCheckout,
  useWallet,
} from "@saleor/sdk";
import pick from "lodash/pick";
import MenuItem from "@mui/material";
import Select from "@mui/material";
import TextField from "@mui/material";
import InputLabel from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { filterNotEmptyArrayItems } from "@utils/misc";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@material-ui/core";
import { IAddress, IAddressWithEmailAndTypes } from "@types";
// import { InputLabel } from "@components/atoms/InputLabel";
import { largeScreen } from "@styles/constants";

// import FormLabel from "@mui/material";
import FormControl from "@mui/material";
import FormControlLabel from "@mui/material";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
// import { defaultTheme } from "Themes/globalStyles";
import makeClevertap from "Themes/lib/makeClevertap.js";
import AddressSelector from "../../molecules/AddressSelector/AddressSelector";
import * as S from "./styles";
import { PropsWithFormik } from "./types";
// @ts-ignore

const stateOptions = [
  // { name: "State" },
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
  { name: "Odisha" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
  { name: "Andaman and Nicobar Islands" },
  { name: "Chandigarh" },
  { name: "Daman and Diu" },
  { name: "Delhi" },
  { name: "Jammu and Kashmir" },
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
export const useStyle = makeStyles(theam => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    // background: "red",
    width: "100%",
    // textFillColor: "black !important",
    // input: {
    //   color: "black !impotant",
    // },
    backgroundColor: "transparent",
    "& .MuiFormHelperText-root ": {
      color: "red",
    },
    "& .MuiInputLabel-root": {
      color: "#686B78",
      "& .MuiFormLabel-asterisk": {
        color: "red",
      },
    },
    "& .MuiInput-underline": {
      "&::after": {
        color: "#56774D",
        borderBottom: "2px solid #56774D",
      },
    },
  },
  selectState: {
    "& .MuiSelect-select": {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  },
  focused: {},
}));
export const LotusAddressFormContent: React.FC<PropsWithFormik> = ({
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

  const classes = useStyle();
  const intl = useIntl();
  const fieldErrors: any = {};
  const [postalCodeError, setPostalCodeError] = useState("");
  const {
    setShippingAddress,
    setBillingAddress,
    getWalletAmount,
  } = useCheckout();

  const setCityAndState = (pin: string) => {
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
      .then(res => {
        res.json().then(val => {
          if (val?.[0].Status === "Error") {
            setPostalCodeError(val?.[0]?.Message);
            return;
          }
          const apiCity = val?.[0]?.PostOffice?.[0]?.District;
          let apiState = val?.[0]?.PostOffice?.[0]?.State;
          if (apiState === "Chattisgarh") {
            apiState = "Chhattisgarh";
          }
          setFieldValue("city", apiCity);
          setFieldValue("countryArea", apiState);
        });
      })
      .catch(e => {
        //
      });
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
  const getAddressType = (type: AddressTypeType): AddressTypes => {
    switch (type) {
      case "ADDRESSTYPES_HOME":
        return "HOME";

      case "ADDRESSTYPES_WORK":
        return "WORK";

      case "ADDRESSTYPES_OTHER":
        return "OTHER";

      default:
        return "HOME";
    }
  };
  const { user } = useAuthState();

  const handleSelectAddress = (address: Partial<IAddressWithEmailAndTypes>) => {
    let addressWithPickedFields = pick(address, ADDRESS_FIELDS);
    //
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
      //
      clevertap.onUserLogin.push({
        Site: ctp,
      });
    }
  };

  useEffect(() => {
    setMyAddresses(addresses);
    if (address) {
      return;
    }
    if (addresses?.length) handleSelectAddress(addresses[0].address);
  }, [user]);
  const [myAddresses, setMyAddresses] = useState(addresses);

  useEffect(() => {
    let count = 0;

    while (
      errors[ADDRESS_FIELDS[count]] === undefined &&
      count < ADDRESS_FIELDS.length - 2
    ) {
      //
      count++;
    }
    // if (count < ADDRESS_FIELDS.length - 2)
    //   document.getElementsByName(ADDRESS_FIELDS[count])[0].focus();
    // else if (!values?.firstName)
    //   document.getElementsByName(ADDRESS_FIELDS[0])[0].focus();
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
      <Container>
        <Header>YOUR delivery address</Header>
        {Boolean(user) && (
          <AddressSelector
            addresses={myAddresses || []}
            setAddress={handleSelectAddress}
            setMyAddresses={setMyAddresses}
            className={classes}
          />
        )}

        {/* <S.Card> */}
        <S.RowWithTwoCells
          style={{
            marginBottom:
              errors?.firstName || errors?.lastName ? "1rem" : "0px",
            marginTop: 0,
          }}
        >
          <TextField
            // ref={firstNameRef}
            name="firstName"
            label={intl.formatMessage({ defaultMessage: "First Name" })}
            value={values!.firstName}
            autoComplete="family-name"
            inputMode="text"
            variant="standard"
            helperText={
              errors.firstName && touched?.firstName && errors.firstName
            }
            {...basicInputProps()}
            required
            className={classes.textField}
          />
          <TextField
            name="lastName"
            label={intl.formatMessage({ defaultMessage: "Last Name" })}
            value={values!.lastName}
            autoComplete="family-name"
            inputMode="text"
            helperText={
              errors.lastName && touched?.lastName ? errors.lastName : ""
            }
            {...basicInputProps()}
            required
            className={classes.textField}
          />
        </S.RowWithTwoCells>
        <Media
          query={{ minWidth: largeScreen }}
          render={() => (
            <S.RowWithTwoCells
              style={{
                marginBottom: errors?.email || errors?.phone ? "1rem" : "0px",
              }}
            >
              <TextField
                name="phone"
                label={intl.formatMessage(commonMessages.phone)}
                value={values!.phone || undefined}
                inputMode="numeric"
                autoComplete="tel"
                helperText={errors.phone && touched?.phone ? errors.phone : ""}
                onChange={basicInputProps().onChange}
                onBlur={e => {
                  basicInputProps().onBlur?.(e);
                  onLoginClevertap();
                }}
                required
                className={classes.textField}
              />
              <TextField
                name="email"
                label={intl.formatMessage(commonMessages.shortEmail)}
                value={values!.email}
                autoComplete="email"
                helperText={errors.email && touched?.email ? errors.email : ""}
                onChange={basicInputProps().onChange}
                onBlur={e => {
                  basicInputProps().onBlur?.(e);
                  onLoginClevertap();
                }}
                required
                className={classes.textField}
                // {...basicInputProps()}
              />
            </S.RowWithTwoCells>
          )}
        />
        <Media
          query={{ maxWidth: largeScreen }}
          render={() => (
            <>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress2 ? "1rem" : "0px",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  name="phone"
                  label={intl.formatMessage(commonMessages.phone)}
                  value={values!.phone || undefined}
                  inputMode="numeric"
                  autoComplete="tel"
                  helperText={
                    errors.phone && touched?.phone ? errors.phone : ""
                  }
                  onChange={basicInputProps().onChange}
                  onBlur={e => {
                    basicInputProps().onBlur?.(e);
                    onLoginClevertap();
                  }}
                  required
                  className={classes.textField}
                />
              </S.RowWithOneCell>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress2 ? "1rem" : "0px",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  name="email"
                  label={intl.formatMessage(commonMessages.shortEmail)}
                  value={values!.email}
                  autoComplete="email"
                  helperText={
                    errors.email && touched?.email ? errors.email : ""
                  }
                  onChange={basicInputProps().onChange}
                  onBlur={e => {
                    basicInputProps().onBlur?.(e);
                    onLoginClevertap();
                  }}
                  required
                  className={classes.textField}
                  // {...basicInputProps()}
                />
              </S.RowWithOneCell>
            </>
          )}
        />

        <S.RowWithOneCell
          style={{
            marginBottom: errors?.streetAddress1 ? "1rem" : "0px",
            marginTop: "1rem",
          }}
        >
          <TextField
            name="streetAddress1"
            label={intl.formatMessage({
              defaultMessage: "Address (House no, street, area)",
            })}
            value={values!.streetAddress1}
            autoComplete="address-line1"
            helperText={
              errors.streetAddress1 && touched?.streetAddress1
                ? errors.streetAddress1
                : ""
            }
            required
            className={classes.textField}
            // errors={fieldErrors!.streetAddress1}
            onBlur={e => {
              //
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
                //
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
            marginBottom: errors?.streetAddress2 ? "1rem" : "0px",
            marginTop: "1rem",
          }}
        >
          <TextField
            name="streetAddress2"
            label={intl.formatMessage({
              defaultMessage: "Locality/ Landmark",
            })}
            value={values!.streetAddress2}
            autoComplete="address-line2"
            helperText={
              errors.streetAddress2 && touched?.streetAddress2
                ? errors.streetAddress2
                : ""
            }
            // errors={fieldErrors!.streetAddress2}
            {...basicInputProps()}
            required
            className={classes.textField}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells
          style={{
            marginBottom:
              errors?.firstName || errors?.lastName ? "1rem" : "0px",
          }}
        >
          <TextField
            name="postalCode"
            label={intl.formatMessage({ defaultMessage: "Pincode" })}
            value={values!.postalCode}
            autoComplete="postal-code"
            // errors={fieldErrors!.postalCode}
            helperText={
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
            required
            className={classes.textField}
          />
          <TextField
            name="city"
            label={intl.formatMessage({ defaultMessage: "City" })}
            value={values!.city}
            autoComplete="address-level2"
            // errors={fieldErrors!.city}
            helperText={errors.city && touched?.city ? errors.city : ""}
            {...basicInputProps()}
            required
            className={classes.textField}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell
          style={{
            marginBottom: errors?.streetAddress2 ? "1rem" : "0px",
            marginTop: "1rem",
          }}
        >
          <S.SelectWrapper>
            <FormControl variant="standard" className={classes.textField}>
              <InputLabel id="selectstate" variant="standard">
                State
              </InputLabel>
              <Select
                autoComplete="address-level1"
                name="countryArea"
                value={values?.countryArea}
                onChange={(e: any) => {
                  //
                  setFieldValue("countryArea", e.target.value);
                }}
                required
                variant="standard"
                labelId="selectstate"
                className={classes.selectState}
              >
                {stateOptions.map(option => {
                  return (
                    <MenuItem
                      disabled={option?.name! === "State"}
                      value={option.name}
                    >
                      {option.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {/* {values?.countryArea! !== "State" && (
              <InputLabel active labelBackground="white">
                State
              </InputLabel>
            )} */}
              {errors.countryArea && touched?.countryArea && (
                <S.ErrorTextWrapper>
                  <S.ErrorText>{errors.countryArea}</S.ErrorText>
                </S.ErrorTextWrapper>
              )}
            </FormControl>
          </S.SelectWrapper>
        </S.RowWithOneCell>
        {/* </S.Card> */}
      </Container>
      <Container>
        <Header>SAVE ADDRESS AS</Header>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Type</FormLabel> */}
          <RadioGroup
            aria-label="type"
            name="type"
            value={values!.type}
            // onChange={e => setAddressType(e.target.value)}
            style={{ flexDirection: "row" }}
            {...basicInputProps()}
          >
            <FormControlLabel
              value="HOME"
              control={<Radio style={{ color: "#56774D" }} />}
              label="Home"
            />
            <FormControlLabel
              value="WORK"
              control={<Radio style={{ color: "#56774D" }} />}
              label="Work"
            />
            <FormControlLabel
              value="OTHER"
              control={<Radio style={{ color: "#56774D" }} />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
      </Container>
    </S.AddressForm>
  );
};
