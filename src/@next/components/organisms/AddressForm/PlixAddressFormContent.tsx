import React, { useCallback, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { GET_POSTAL_PIN } from "@temp/pages/checkout/queries";

import { commonMessages } from "@temp/intl";

// @ts-ignore
import {
  // AddressTypes,
  // AddressTypeType,
  useAuth,
  useAuthState,
  useCheckout,
  // useWallet,
  AddressTypeType,
  AddressTypes,
} from "@saleor/sdk";
import pick from "lodash/pick";
import { filterNotEmptyArrayItems } from "@utils/misc";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@material-ui/core";
import { IAddress, IAddressWithEmailAndTypes } from "@types";
import FormLabel from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import { defaultTheme } from "Themes/globalStyles";
import makeClevertap from "Themes/lib/makeClevertap.js";
import AddressSelector from "../../molecules/AddressSelector/AddressSelector";
import * as S from "./styles";
import { PropsWithFormik } from "./types";
import Media from "react-responsive";
import { mediumScreen } from "@styles/constants";
import MenuItem from "@mui/material";
import Select from "@mui/material";
import TextField from "@mui/material";
import InputLabel from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Input from "@components/farzicom-ui-kit/Input";
import { Field } from "formik";
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
  "addressLabel"
];

export const useStyle = makeStyles(theam => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#78a442",
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink":{
      transform: "translate(14px, -6px) scale(0.75) !important"
    },
    "& input.MuiOutlinedInput-input":{
      padding:"13px 14px"
    },
    
    "& .MuiSelect-select.MuiSelect-select":{
      padding: "13px 32px 13px 14px !important"

    },
    "& label.MuiInputLabel-outlined":{
      transform: "translate(14px, 13px) scale(1)"

    },
    width: "100%",
    fontFamily: "inherit",
    fontSize:"14px",
    "& .MuiInput-underline:after": {
      borderBottomColor: "#78a442",
    },
    "& .MuiInputBase-root": {
      fontFamily: "inherit",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d4d6d5",
        fontFamily: "inherit",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#78a442",
        fontFamily: "inherit",
      },
    },
    backgroundColor: "transparent",
    "& .MuiFormHelperText-root ": {
      color: "red",
    },
    "& .MuiInputLabel-root": {
      color: "#686B78",
      fontFamily: "inherit",
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

export const PlixAddressFormContent: React.FC<PropsWithFormik> = ({
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
  isdefaultAddress
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  // const { getWalletAmount } = useWallet();

  const intl = useIntl();
  const fieldErrors: any = {};
  const [postalCodeError, setPostalCodeError] = useState("");
  const [defaultaddress, setdefaultaddress] = useState(false);
  const [addresslabel,setaddresslabel] = useState("Home");
  const { setShippingAddress, setBillingAddress } = useCheckout();

  const addressLabels = ["Home","Work","Other"];

  const setCityAndState = (pin: string) => {
    try {
      client
      .query({
        query: GET_POSTAL_PIN,
        variables: {
          pin: pin,
        },
        fetchPolicy: "no-cache",
      }).then(res=> {
        if (
          (res?.errors && res.errors[0]?.message) ||
          !res?.data?.pincode?.city ||
          !res?.data?.pincode?.state
        ){
          setPostalCodeError("Invalid Pincode");
          return;
        }
        const apiCity = res?.data?.pincode?.city;
        let apiState = res?.data?.pincode?.state;
        if (apiState === "Chattisgarh") {
          apiState = "Chhattisgarh";
        } else if (apiState === "Orissa") {
          apiState = "Odisha";
        } else if (apiState === "Pondicherry") {
          apiState = "Puducherry";
        }
        setFieldValue("city", apiCity);
        setFieldValue("countryArea", apiState);

      }).catch(err=> {
        console.log("Error in fetching pincode")
      });
    } catch (error) {
      console.log("Error in fetching pincode")
    }
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
  const classes = useStyle();
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
      addr => filterNotEmptyArrayItems(addr)
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
    // const walletAmount = user ? await getWalletAmount() : { data: 0 };
    const walletAmount = 0;
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
        Identity: `91${values.phone}`,
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
    } 
    // else if (addresses?.length) handleSelectAddress(addresses[0].address);
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

  const updateCustomAddressLabel = (e) =>{
    setFieldValue("addressLabel",`${e.target.value}(other)`)
  }
  return (
    <>
      <Media maxWidth={mediumScreen}>
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
            {/* {Boolean(user) && (
              <AddressSelector
                addresses={myAddresses || []}
                setAddress={handleSelectAddress}
                setMyAddresses={setMyAddresses}
              />
            )} */}

            <S.AddressFormContainer>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.email ? "20px" : "20px",
                }}
              >
                <TextField
                  required
                  name="email"
                  label={intl.formatMessage(commonMessages.shortEmail)}
                  value={values!.email}
                  autoComplete="email"
                  variant="outlined"
                  helperText={
                    errors.email && touched?.email ? errors.email : ""
                  }
                  onChange={basicInputProps().onChange}
                  onBlur={e => {
                    basicInputProps().onBlur?.(e);
                    onLoginClevertap();
                  }}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
              </S.RowWithOneCell>
            </S.AddressFormContainer>
            <S.AddressFormContainer>
              <S.SectionTitle updatefont={true}>Shipping Address</S.SectionTitle>
              <S.RowWithTwoCells
                style={{
                  marginBottom: errors?.firstName ? "24px" : "24px",
                  marginTop: "20px",
                }}
              >
                <TextField
                  required
                  name="firstName"
                  label={intl.formatMessage({
                    defaultMessage: "First Name",
                  })}
                  value={values!.firstName}
                  autoComplete="family-name"
                  inputMode="text"
                  variant="outlined"
                  helperText={
                    errors.firstName && touched?.firstName && errors.firstName
                  }
                  {...basicInputProps()}
                  className={classes.textField}
                />
                <TextField
                  required
                  variant="outlined"
                  name="lastName"
                  label={intl.formatMessage({
                    defaultMessage: "Last Name",
                  })}
                  value={values!.lastName}
                  autoComplete="family-name"
                  inputMode="text"
                  helperText={
                    errors.lastName && touched?.lastName ? errors.lastName : ""
                  }
                  {...basicInputProps()}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}

                

              </S.RowWithTwoCells>

              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress1 ? "24px" : "24px",
                }}
              >
                <TextField
                  required
                  name="streetAddress1"
                  label={intl.formatMessage({
                    defaultMessage:
                      "Address 1 (House No, Building, Street, Area)",
                  })}
                  value={values!.streetAddress1}
                  autoComplete="address-line1"
                  helperText={
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
                  variant="outlined"
                  className={classes.textField}
                />
                {/* <S.StyledTextField
                  name="streetAddress1"
                  label={intl.formatMessage({
                    defaultMessage:
                      "Address 1 (House No, Building, Street, Area)",
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
                /> */}
              </S.RowWithOneCell>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress2 ? "24px" : "24px",
                }}
              >
                <TextField
                  variant="outlined"
                  name="streetAddress2"
                  label={intl.formatMessage({
                    defaultMessage: "Address 2 (Locality, Landmark, Town)",
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
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
              </S.RowWithOneCell>
              {/* <S.RowWithTwoCells
                style={{
                  marginBottom:
                    errors?.city || errors?.countryArea ? "1rem" : "0px",
                  marginTop: "2rem",
                }}
              >

              </S.RowWithTwoCells> */}
              <S.RowWithTwoCells
                style={{
                  marginBottom: errors?.postalCode ? "24px" : "24px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  name="postalCode"
                  label={intl.formatMessage({ defaultMessage: "Pincode" })}
                  value={values!.postalCode}
                  autoComplete="postal-code"
                  helperText={
                    (errors.postalCode || postalCodeError) &&
                    touched?.postalCode
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
                  className={classes.textField}
                />
                <TextField
                  required
                  variant="outlined"
                  name="city"
                  label={intl.formatMessage({ defaultMessage: "City" })}
                  value={values!.city}
                  autoComplete="address-level2"
                  // errors={fieldErrors!.city}
                  helperText={errors.city && touched?.city ? errors.city : ""}
                  {...basicInputProps()}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
                  name="postalCode"
                  label={intl.formatMessage({ defaultMessage: "Pincode" })}
                  value={values!.postalCode}
                  autoComplete="postal-code"
                  errors={fieldErrors!.postalCode}
                  helpText={
                    (errors.postalCode || postalCodeError) &&
                    touched?.postalCode
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
                /> */}
              </S.RowWithTwoCells>

              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.countryArea ? "24px" : "24px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  select
                  label="State"
                  autoComplete="address-level1"
                  name="countryArea"
                  value={values?.countryArea}
                  onChange={val => {
                    // console.log(val.target.value);
                    setFieldValue("countryArea", val.target.value);
                  }}
                  helperText={
                    errors.countryArea && touched?.countryArea
                      ? errors.countryArea
                      : ""
                  }
                  className={classes.textField}
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
                </TextField>
                {/* <S.SelectStateWrapper>
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
                </S.SelectStateWrapper> */}
              </S.RowWithOneCell>
              {/* <S.RowWithOneCell
                style={{
                  marginBottom: errors?.postalCode ? "24px" : "24px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  name="postalCode"
                  label={intl.formatMessage({ defaultMessage: "Pincode" })}
                  value={values!.postalCode}
                  autoComplete="postal-code"
                  helperText={
                    (errors.postalCode || postalCodeError) &&
                    touched?.postalCode
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
                  className={classes.textField}
                />
              </S.RowWithOneCell> */}
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.phone ? "24px" : "24px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
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
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
              </S.RowWithOneCell>
              
              {/* <S.AddresslabelWrapper>
                <h4>Address Label</h4>
                <S.Addresslabels>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Home"
                    value={values!.addressLabel}
                    name="addressLabel"
                    onChange={basicInputProps().onChange}
                  >
                    {addressLabels && addressLabels.map((label:any,index:any)=>(                        
                      (values?.addressLabel==label) ?
                       <S.SelectedLabel>
                         <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                       </S.SelectedLabel>
                        : 
                        values?.addressLabel?.toLocaleLowerCase().includes("other") && label!="Home" && label!="Work" ? 
                        <S.SelectedLabel>
                            <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                        </S.SelectedLabel> 
                      :
                         <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                        
                    ))}
                  </RadioGroup>

                </S.Addresslabels>
              </S.AddresslabelWrapper> */}
                    
              {/* <S.Defaultset>
                Save Address As
              </S.Defaultset> */}
              {/* {
                 values!.addressLabel?.toLowerCase().includes("other") && 
                  <S.RowWithTwoCells
                    style={{
                      marginBottom:
                        errors?.firstName || errors?.lastName ? "20px" : "20px",
                      marginTop: "50px",
                    }}
                  >
                    <TextField
                      required
                      name="other_addressLabel"
                      label={intl.formatMessage({
                        defaultMessage: "Save Address As",
                      })}
                      inputMode="text"
                      variant="outlined"
                      onChange={updateCustomAddressLabel}
                      // {...basicInputProps()}
                      className={classes.textField}
                    />
                  </S.RowWithTwoCells>

              } */}
              <S.SetDeafaultAddress> 
              <div
                    className="inputErroDiv"
                    key="inputErroDiv"
                    onClick={(e)=>setdefaultaddress(e.target.value)}
                  >
                    <Input
                    key=""
                    label={<div className="defaultlabel">
                      {/* {row.meta.labelSVG && <MemoWhatsapp />} */}
                      <div> Set as default address </div>
                    </div>}

                    customStyles=""
                    customStylesName={false
                      ? "userNotificationInputContainer-checked"
                      : "userNotificationInputContainer"}
                    type="checkbox"
                    name="type"
                    id="setdefault"
                    placeholder=""
                    value={defaultaddress ? "true" : "false"}
                    autoComplete="" variant={0}
                    onChange={basicInputProps().onChange}                   
                    />
                  </div>
              </S.SetDeafaultAddress>

            </S.AddressFormContainer>
          </S.Wrapper>
        </S.AddressForm>
      </Media>
      <Media minWidth={mediumScreen}>
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
            {/* {Boolean(user) && (
              <AddressSelector
                addresses={myAddresses || []}
                setAddress={handleSelectAddress}
                setMyAddresses={setMyAddresses}
              />
            )} */}

            <S.AddressFormContainer>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.email ? "40px" : "40px",
                  marginTop: "25px",
                }}
              >
                <TextField
                  required
                  name="email"
                  label={intl.formatMessage(commonMessages.shortEmail)}
                  value={values!.email}
                  autoComplete="email"
                  variant="outlined"
                  helperText={
                    errors.email && touched?.email ? errors.email : ""
                  }
                  onChange={basicInputProps().onChange}
                  onBlur={e => {
                    basicInputProps().onBlur?.(e);
                    onLoginClevertap();
                  }}
                  className={classes.textField}

                />
                {/* <S.StyledTextField
                      name="email"
                      label={intl.formatMessage(commonMessages.shortEmail)}
                      value={values!.email}
                      autoComplete="email"
                      variant="outlined"
                      onChange={basicInputProps().onChange}
                      onBlur={e => {
                        basicInputProps().onBlur?.(e);
                        onLoginClevertap();
                      }}
                      // {...basicInputProps()}
                    /> */}
              </S.RowWithOneCell>
            </S.AddressFormContainer>
            {/* <S.Divider>
              <div style={{ borderBottom: "1px solid #dddddd" }} />
            </S.Divider> */}
            <S.AddressFormContainer>
              <S.SectionTitle updatefont={true}>Shipping Address</S.SectionTitle>
              <S.RowWithTwoCells
                style={{
                  marginBottom:
                    errors?.firstName || errors?.lastName ? "20px" : "20px",
                  marginTop: "50px",
                }}
              >
                <TextField
                  required
                  name="firstName"
                  label={intl.formatMessage({
                    defaultMessage: "First Name",
                  })}
                  value={values!.firstName}
                  autoComplete="family-name"
                  inputMode="text"
                  variant="outlined"
                  helperText={
                    errors.firstName && touched?.firstName && errors.firstName
                  }
                  {...basicInputProps()}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
                <TextField
                  required
                  variant="outlined"
                  name="lastName"
                  label={intl.formatMessage({
                    defaultMessage: "Last Name",
                  })}
                  value={values!.lastName}
                  autoComplete="family-name"
                  inputMode="text"
                  helperText={
                    errors.lastName && touched?.lastName ? errors.lastName : ""
                  }
                  {...basicInputProps()}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
              </S.RowWithTwoCells>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress1 ? "20px" : "20px",
                }}
              >
                <TextField
                  required
                  name="streetAddress1"
                  label={intl.formatMessage({
                    defaultMessage:
                      "Address 1 (House No, Building, Street, Area)",
                  })}
                  value={values!.streetAddress1}
                  autoComplete="address-line1"
                  helperText={
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
                  variant="outlined"
                  className={classes.textField}
                />
                {/* <S.StyledTextField
                  name="streetAddress1"
                  label={intl.formatMessage({
                    defaultMessage:
                      "Address 1 (House No, Building, Street, Area)",
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
                /> */}
              </S.RowWithOneCell>
              <S.RowWithOneCell
                style={{
                  marginBottom: errors?.streetAddress2 ? "20px" : "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  name="streetAddress2"
                  label={intl.formatMessage({
                    defaultMessage: "Address 2 (Locality, Landmark, Town)",
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
                  className={classes.textField}
                />
                {/* <S.StyledTextField
                  name="streetAddress2"
                  label={intl.formatMessage({
                    defaultMessage: "Address 2 (Locality, Landmark, Town)",
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
                /> */}
              </S.RowWithOneCell>
              {/* <S.RowWithTwoCells
                style={{
                  marginBottom:
                    errors?.city || errors?.countryArea ? "1rem" : "0px",
                  marginTop: "2rem",
                }}
              >

              </S.RowWithTwoCells> */}
              <S.RowWithTwoCells
                style={{
                  marginBottom:
                    errors?.postalCode || errors?.city || errors?.countryArea
                      ? "20px"
                      : "20px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  name="postalCode"
                  label={intl.formatMessage({ defaultMessage: "Pincode" })}
                  value={values!.postalCode}
                  autoComplete="postal-code"
                  helperText={
                    (errors.postalCode || postalCodeError) &&
                    touched?.postalCode
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
                  className={classes.textField}
                />
                <TextField
                  required
                  variant="outlined"
                  name="city"
                  label={intl.formatMessage({ defaultMessage: "City" })}
                  value={values!.city}
                  autoComplete="address-level2"
                  // errors={fieldErrors!.city}
                  helperText={errors.city && touched?.city ? errors.city : ""}
                  {...basicInputProps()}
                  className={classes.textField}
                />
                {/* <S.StyledTextField
                  name="city"
                  label={intl.formatMessage({ defaultMessage: "City" })}
                  value={values!.city}
                  autoComplete="address-level2"
                  // errors={fieldErrors!.city}
                  helpText={errors.city && touched?.city ? errors.city : ""}
                  {...basicInputProps()}
                /> */}
                {/* <S.SelectStateWrapper>
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
                </S.SelectStateWrapper> */}

                {/* <S.StyledTextField
                  name="postalCode"
                  label={intl.formatMessage({ defaultMessage: "Pincode" })}
                  value={values!.postalCode}
                  autoComplete="postal-code"
                  errors={fieldErrors!.postalCode}
                  helpText={
                    (errors.postalCode || postalCodeError) &&
                    touched?.postalCode
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
                /> */}
              </S.RowWithTwoCells>
              <S.RowWithTwoCells
                style={{
                  marginBottom: errors?.phone ? "30px" : "15px",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  select
                  label="State"
                  autoComplete="address-level1"
                  name="countryArea"
                  value={values?.countryArea}
                  onChange={val => {
                    // console.log(val.target.value);
                    setFieldValue("countryArea", val.target.value);
                  }}
                  helperText={
                    errors.countryArea && touched?.countryArea
                      ? errors.countryArea
                      : ""
                  }
                  className={classes.textField}
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
                </TextField>

                <TextField
                  required
                  variant="outlined"
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
                  className={classes.textField}
                />
                {/* <S.StyledTextField
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
                /> */}
              </S.RowWithTwoCells>

              {/* address label wrapper */}
              {/* <S.AddresslabelWrapper>
                <h4>Address Label</h4>
                <S.Addresslabels>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Home"
                    value={values!.addressLabel}
                    name="addressLabel"
                    onChange={basicInputProps().onChange}
                  >
                    {addressLabels && addressLabels.map((label:any,index:any)=>(                        
                      (values?.addressLabel==label) ?
                       <S.SelectedLabel>
                         <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                       </S.SelectedLabel>
                        : 
                        values?.addressLabel?.toLocaleLowerCase().includes("other") && label!="Home" && label!="Work" ? 
                        <S.SelectedLabel>
                            <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                        </S.SelectedLabel> 
                      :
                         <FormControlLabel value={label} control={<Radio />} label={label} key={index}/>
                        
                    ))}
                  </RadioGroup>

                </S.Addresslabels>
              </S.AddresslabelWrapper> */}
                    
              {/* <S.Defaultset>
                Save Address As
              </S.Defaultset> */}

              {/* write default address */}
              {/* {
                 values!.addressLabel?.toLowerCase().includes("other") && 
                  <S.RowWithTwoCells
                    style={{
                      marginBottom:
                        errors?.firstName || errors?.lastName ? "20px" : "20px",
                      marginTop: "50px",
                    }}
                  >
                    <TextField
                      required
                      name="other_addressLabel"
                      label={intl.formatMessage({
                        defaultMessage: "Save Address As",
                      })}
                      inputMode="text"
                      variant="outlined"
                      onChange={updateCustomAddressLabel}
                      // {...basicInputProps()}
                      className={classes.textField}
                    />
                  </S.RowWithTwoCells>

              } */}


              <S.SetDeafaultAddress> 
              <div
                    className="inputErroDiv"
                    key="inputErroDiv"
                    onClick={(e)=>setdefaultaddress(e.target.value)}
                  >
                    <Input
                    key=""
                    label={<div className="defaultlabel">
                      {/* {row.meta.labelSVG && <MemoWhatsapp />} */}
                      <div> Set as default address </div>
                    </div>}

                    customStyles=""
                    customStylesName={false
                      ? "userNotificationInputContainer-checked"
                      : "userNotificationInputContainer"}
                    type="checkbox"
                    name="type"
                    id="setdefault"
                    placeholder=""
                    value={defaultaddress ? "true" : "false"}
                    autoComplete="" variant={0}
                    onChange={basicInputProps().onChange}                   
                    />
                  </div>
              </S.SetDeafaultAddress>
              {/* <div style={{ borderBottom: "1px solid #dddddd" }} /> */}
            </S.AddressFormContainer>
          </S.Wrapper>
        </S.AddressForm>
      </Media>
    </>
  );
};
