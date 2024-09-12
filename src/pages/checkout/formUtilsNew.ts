import { ISelectOptions } from "@components/farzicom-ui-kit/Select";
import { AddressFragment, useCheckoutState } from "@saleor/sdk";
import { CheckoutSDK } from "@saleor/sdk/dist/core/checkout";

const stateOptions = [
  { name: "State", value: "", disabled: false },
  { name: "Andhra Pradesh", value: "Andhra Pradesh", disabled: false },
  { name: "Arunachal Pradesh", value: "Arunachal Pradesh", disabled: false },
  { name: "Assam", value: "Assam", disabled: false },
  { name: "Bihar", value: "Bihar", disabled: false },
  { name: "Chhattisgarh", value: "Chhattisgarh", disabled: false },
  { name: "Goa", value: "Goa", disabled: false },
  { name: "Gujarat", value: "Gujarat", disabled: false },
  { name: "Haryana", value: "Haryana", disabled: false },
  { name: "Himachal Pradesh", value: "Himachal Pradesh", disabled: false },
  { name: "Jharkhand", value: "Jharkhand", disabled: false },
  { name: "Karnataka", value: "Karnataka", disabled: false },
  { name: "Kerala", value: "Kerala", disabled: false },
  { name: "Madhya Pradesh", value: "Madhya Pradesh", disabled: false },
  { name: "Maharashtra", value: "Maharashtra", disabled: false },
  { name: "Manipur", value: "Manipur", disabled: false },
  { name: "Meghalaya", value: "Meghalaya", disabled: false },
  { name: "Mizoram", value: "Mizoram", disabled: false },
  { name: "Nagaland", value: "Nagaland", disabled: false },
  { name: "Odisha", value: "Odisha", disabled: false },
  { name: "Punjab", value: "Punjab", disabled: false },
  { name: "Rajasthan", value: "Rajasthan", disabled: false },
  { name: "Sikkim", value: "Sikkim", disabled: false },
  { name: "Tamil Nadu", value: "Tamil Nadu", disabled: false },
  { name: "Telangana", value: "Telangana", disabled: false },
  { name: "Tripura", value: "Tripura", disabled: false },
  { name: "Uttar Pradesh", value: "Uttar Pradesh", disabled: false },
  { name: "Uttarakhand", value: "Uttarakhand", disabled: false },
  { name: "West Bengal", value: "West Bengal", disabled: false },
  { name: "Andaman Nicobar", value: "Andaman Nicobar", disabled: false },
  { name: "Daman Diu", value: "Daman Diu", disabled: false },
  { name: "Delhi", value: "Delhi", disabled: false },
  { name: "Jammu & Kashmir", value: "Jammu & Kashmir", disabled: false },
  { name: "Ladakh", value: "Ladakh", disabled: false },
  { name: "Lakshadweep", value: "Lakshadweep", disabled: false },
  { name: "Puducherry", value: "Puducherry", disabled: false },
];

export enum CheckoutFormActionTypes {
  UPDATE_FORM_VALUE = "UPDATE_FORM_VALUE",
  UPDATE_COMPLETE_FORM = "UPDATE_COMPLETE_FORM",
}
export enum IIAddressFieldNames {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PHONE = "phone",
  STREET_ADDRESS_1 = "streetAddress1",
  STREET_ADDRESS_2 = "streetAddress2",
  CITY = "city",
  POSTAL_CODE = "postalCode",
  COUNTRY_AREA = "countryArea",
}

export enum IIOnlyAddressFieldNames {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  STREET_ADDRESS_1 = "streetAddress1",
  STREET_ADDRESS_2 = "streetAddress2",
  CITY = "city",
  POSTAL_CODE = "postalCode",
  COUNTRY_AREA = "countryArea",
}

export enum CheckoutEnumsOthersThanAddress {
  PAYMENT_METHOD = "paymentMethod",
  USE_CASHBACK = "useCashback",
  UPDATE_ON_WHATSAPP = "updateOnWhatsapp",
}

export enum PaymentMethods {
  RAZORPAY = "mirumee.payments.razorpay",
  COD = "mirumee.payments.dummy",
  WALLET = "mirumee.payments.wallet",
  JUSPAY = "mirumee.payments.juspay",
  GOKWIK = "mirumee.payments.gokwik"
}

export type PaymentModeType =
  | "cod"
  | "WALLET"
  | "UPI"
  | "card"
  | "NB"
  | "razorpay";

export enum PaymentModes {
  COD = "cod",
  WALLET = "WALLET",
  NB = "NB",
  UPI = "UPI",
  CARD = "card",
  RAZORPAY = "razorpay",
  UPI_GOKWIK="UPI-gokwik"
}

export interface IAddressField {
  name: IIAddressFieldNames | CheckoutEnumsOthersThanAddress;
  id: string;
  placeholder: string;
  label: string;
  row: number;
  autoComplete: string;
  inputMode:
    | "text"
    | "tel"
    | "numeric"
    | "email"
    | "search"
    | "none"
    | "url"
    | "decimal";
  type: string;
  selectOptions?: Array<ISelectOptions>;
  value?: string;
  meta?: any;
  maxLength?: number;
  subText?: string;
}

export type PaymentRadioFields =
  | "mirumee.payments.razorpay"
  | "mirumee.payments.dummy"
  | "mirumee.payments.juspay";

export const addressFileds: Array<IAddressField>[] = [
  [
    {
      name: IIAddressFieldNames.FIRST_NAME,
      id: "firstName",
      placeholder: "First Name *",
      label: "First name",
      row: 1,
      autoComplete: "first-name",
      inputMode: "text",
      type: "text",
    },
    {
      name: IIAddressFieldNames.LAST_NAME,
      id: "lastName",
      placeholder: "Last Name *",
      label: "Last name",
      row: 1,
      autoComplete: "family-name",
      inputMode: "text",
      type: "text",
    },
  ],
  // [
  //   {
  //     name: IIAddressFieldNames.PHONE,
  //     id: "phone",
  //     placeholder: "Phone *",
  //     label: "Phone",
  //     row: 2,
  //     autoComplete: "tel",
  //     inputMode: "numeric",
  //     type: "tel",
  //   },
  // ],
  [
    {
      name: IIAddressFieldNames.EMAIL,
      id: "email",
      placeholder: "Email *",
      label: "Email",
      row: 3,
      autoComplete: "email",
      inputMode: "text",
      type: "email",
    },
  ],
  [
    {
      name: IIAddressFieldNames.STREET_ADDRESS_1,
      id: "streetAddress1",
      placeholder: "Address Line 1 *",
      label: "Address Line 1",
      row: 3,
      autoComplete: "address-line1",
      inputMode: "text",
      type: "text",
    },
  ],
  // [
  //   {
  //     name: IIAddressFieldNames.STREET_ADDRESS_2,
  //     id: "streetAddress2",
  //     placeholder: "Apartment, Landmark, etc. (optional)",
  //     label: "Address Line 2",
  //     row: 3,
  //     autoComplete: "address-line2",
  //     inputMode: "text",
  //     type: "text",
  //   },
  // ],
  [
    {
      name: IIAddressFieldNames.POSTAL_CODE,
      id: "postalCode",
      placeholder: "PostalCode *",
      label: "PostalCode",
      row: 3,
      autoComplete: "postal-code",
      inputMode: "tel",
      type: "tel",
    },
    {
      name: IIAddressFieldNames.CITY,
      id: "city",
      placeholder: "City *",
      label: "City",
      row: 3,
      autoComplete: "address-line2",
      inputMode: "text",
      type: "text",
    },
  ],
  [
    {
      name: IIAddressFieldNames.COUNTRY_AREA,
      id: "countryArea",
      placeholder: "State *",
      label: "State",
      row: 3,
      autoComplete: "state",
      inputMode: "text",
      type: "select",
      selectOptions: stateOptions,
    },
  ],
];
export const addressFileds2: Array<IAddressField>[] = [
  // [
  //   {
  //     name: IIAddressFieldNames.PHONE,
  //     id: "phone",
  //     placeholder: "Phone (Active On Whatsapp)*",
  //     label: "Phone",
  //     row: 2,
  //     autoComplete: "tel",
  //     inputMode: "numeric",
  //     type: "tel",
  //     subText:
  //       "Note: Phone number is needed to contact you for shipping- related questions.",
  //   },
  // ],
  [
    {
      name: IIAddressFieldNames.FIRST_NAME,
      id: "firstName",
      placeholder: "First Name *",
      label: "First name*",
      row: 1,
      autoComplete: "first-name",
      inputMode: "text",
      type: "text",
    },
    {
      name: IIAddressFieldNames.LAST_NAME,
      id: "lastName",
      placeholder: "Last Name *",
      label: "Last name*",
      row: 1,
      autoComplete: "family-name",
      inputMode: "text",
      type: "text",
    },
  ],
  [
    {
      name: IIAddressFieldNames.POSTAL_CODE,
      id: "postalCode",
      placeholder: "Pin Code *",
      label: "Pincode*",
      row: 3,
      autoComplete: "postal-code",
      inputMode: "tel",
      type: "tel",
    },
    {
      name: IIAddressFieldNames.CITY,
      id: "city",
      placeholder: "City *",
      label: "City*",
      row: 3,
      autoComplete: "address-line2",
      inputMode: "text",
      type: "text",
    },
  ],
  [
    {
      name: IIAddressFieldNames.COUNTRY_AREA,
      id: "countryArea",
      placeholder: "State *",
      label: "State*",
      row: 3,
      autoComplete: "state",
      inputMode: "text",
      type: "select",
      selectOptions: stateOptions,
    },
  ],
  [
    {
      name: IIAddressFieldNames.STREET_ADDRESS_1,
      id: "streetAddress1",
      placeholder: "Eg: 401, Roman Plaza Building, Sector 5, Jambli Gali",
      label: "Address*",
      row: 3,
      autoComplete: "address-line1",
      inputMode: "text",
      type: "text",
      maxLength: 50,
    },
  ],
  [
    {
      name: IIAddressFieldNames.STREET_ADDRESS_2,
      id: "streetAddress2",
      placeholder: "Near Ganesh Talkies, Santacruz east",
      label: "Address Line 2",
      row: 3,
      autoComplete: "address-line2",
      inputMode: "text",
      type: "text",
    },
  ],
  [
    {
      name: IIAddressFieldNames.EMAIL,
      id: "email",
      placeholder: "Email *",
      label: "Email Address*",
      row: 3,
      autoComplete: "email",
      inputMode: "text",
      type: "email",
    },
  ],
];

export const paymentRadioFields: Array<IAddressField>[] = [
  [
    {
      name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
      id: "online",
      placeholder: "",
      label: "Pay Online",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "radio",
      value: PaymentMethods.RAZORPAY,
      meta: {
        labelDescription: "Get extra discount on prepaid orders.",
        labelSVG: true,
      },
    },
  ],
  [
    {
      name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
      id: "cod",
      placeholder: "",
      label: "Cash On Delivery",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "radio",
      value: PaymentMethods.COD,
      meta: {
        labelDescription: "",
        labelSVG: false,
      },
    },
  ],
];

export const paymentRadioFields2: Array<IAddressField>[] = [
  [
    {
      name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
      id: "online",
      placeholder: "",
      label: "Razorpay (Cards, UPI, NetBanking, Wallets)",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "radio",
      value: PaymentMethods.RAZORPAY,
      meta: {
        labelDescription: "Get extra discount on prepaid orders.",
        labelSVG: false,
      },
    },
  ],
  [
    {
      name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
      id: "cod",
      placeholder: "",
      label: "Cash On Delivery",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "radio",
      value: PaymentMethods.COD,
      meta: {
        labelDescription: "",
        labelSVG: false,
      },
    },
  ],
];

export const juspayPaymentRadioOptions: Array<IAddressField> = [
  {
    name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
    id: "upi",
    placeholder: "",
    label: "Pay via UPI",
    row: 2,
    autoComplete: "",
    inputMode: "none",
    type: "radio",
    value: PaymentModes.UPI,
    gateway: PaymentMethods.JUSPAY,
    subText: "Select Any UPI Option",
    meta: {
      labelDescription: "Get extra discount on prepaid orders.",
      labelSVG: false,
      labelIconLink:
        "https://plixlifefc-media.farziengineer.co/hosted/Icons_1-3395e1f6c169.png",
    },
  },
  // {
  //   name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
  //   id: "upi-gokwik",
  //   placeholder: "",
  //   label: "Pay via UPI - Gokwik",
  //   row: 2,
  //   autoComplete: "",
  //   inputMode: "none",
  //   type: "radio",
  //   value: PaymentModes.UPI_GOKWIK,
  //   gateway: PaymentMethods.GOKWIK,
  //   subText: "Select Any UPI Option",
  //   meta: {
  //     labelDescription: "Get extra discount on prepaid orders.",
  //     labelSVG: false,
  //     labelIconLink:
  //       "https://plixlifefc-media.farziengineer.co/hosted/logo-ae9a273ee943.svg",
  //   },
  // },
  {
    name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
    id: "card",
    placeholder: "Card",
    label: "Pay via Card",
    row: 2,
    autoComplete: "",
    inputMode: "none",
    type: "radio",
    value: PaymentModes.CARD,
    gateway: PaymentMethods.RAZORPAY,
    subText: "Credit/ Debit Cards",
    meta: {
      labelDescription: "Get extra discount on prepaid orders.",
      labelSVG: false,
      labelIconLink:
        "https://plixlifefc-media.farziengineer.co/hosted/Icons_2-b9dfaa75be3c.png",
    },
  },
  {
    name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
    id: "wallet",
    placeholder: "",
    label: "Pay via Wallets",
    row: 2,
    autoComplete: "",
    inputMode: "none",
    type: "radio",
    value: PaymentModes.WALLET,
    gateway: PaymentMethods.JUSPAY,
    subText: "Select any wallet",
    meta: {
      labelDescription: "Get extra discount on prepaid orders.",
      labelSVG: false,
      labelIconLink:
        "https://plixlifefc-media.farziengineer.co/hosted/Icons_3-8ccacd44b4b2.png",
    },
  },
  {
    name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
    id: "netbanking",
    placeholder: "",
    label: "Netbanking",
    row: 2,
    autoComplete: "",
    inputMode: "none",
    type: "radio",
    value: PaymentModes.NB,
    gateway: PaymentMethods.JUSPAY,
    subText: "Select Bank",
    meta: {
      labelDescription: "Get extra discount on prepaid orders.",
      labelSVG: false,
      labelIconLink:
        "https://plixlifefc-media.farziengineer.co/hosted/Icons_4-dbe2afdb9e33.png",
    },
  },
  {
    name: CheckoutEnumsOthersThanAddress.PAYMENT_METHOD,
    id: "cod",
    placeholder: "",
    label: "Cash on Delivery",
    row: 2,
    autoComplete: "",
    inputMode: "none",
    type: "radio",
    value: PaymentModes.COD,
    gateway: PaymentMethods.COD,
    subText: "Confirm your order",
    meta: {
      labelDescription: "",
      labelSVG: false,
      labelIconLink:
        "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_5-3c852b163677.png",
    },
  },
];

export const checkboxFields: Array<IAddressField>[] = [
  [
    {
      name: CheckoutEnumsOthersThanAddress.USE_CASHBACK,
      id: "useCashback",
      placeholder: "",
      label: "Apply Wallet",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "checkbox",
      value: "useCashback",
    },
  ],
];

export const notificationCheckboxFields: Array<IAddressField>[] = [
  [
    {
      name: CheckoutEnumsOthersThanAddress.USE_CASHBACK,
      id: "userNotification",
      placeholder: "",
      label: "Notify me for orders, updates and offers.",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "checkbox",
      value: "userNotification",
    },
  ],
];

export const whatsappCheckboxFields: Array<IAddressField>[] = [
  [
    {
      name: CheckoutEnumsOthersThanAddress.UPDATE_ON_WHATSAPP,
      id: CheckoutEnumsOthersThanAddress.UPDATE_ON_WHATSAPP,
      placeholder: "",
      label: "Get Updates on WhatsApp",
      row: 2,
      autoComplete: "",
      inputMode: "none",
      type: "checkbox",
      value: CheckoutEnumsOthersThanAddress.UPDATE_ON_WHATSAPP,
      meta: {
        labelSVG: true,
      },
    },
  ],
];

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (
  name,
  value,
  dispatch,
  formState,
  useCheckoutRes
) => {
  const { hasError, error } = validateInput(
    name,
    value,
    dispatch,
    formState,
    useCheckoutRes
  );
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false;
      break;
    }
  }

  // console.log("oninputchange", {
  //   name,
  //   value,
  //   hasError,
  //   error,
  //   touched: false,
  //   isFormValid,
  // });

  // Dont validate form on pincode change immediately, its handled in a useEffect in checkout.
  if (name === IIAddressFieldNames.POSTAL_CODE) {
    isFormValid = false;
  }
  dispatch({
    type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const tasksOnInputChange = async (
  name: IIAddressFieldNames,
  value,
  dispatch,
  formState,
  useCheckoutRes: CheckoutSDK
) => {
  const { getCityStateFromPincode } = useCheckoutRes;
  switch (name) {
    case IIAddressFieldNames.POSTAL_CODE: {
      const { data, errors } = await getCityStateFromPincode(value);
      // console.log("error", data, errors);
      if (data?.pincode && data?.pincode?.serviceable) {
      } else {
        // console.log("in else");
        dispatch({
          type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
          data: {
            name,
            value,
            hasError: true,
            error: "Incorrect Pincode",
            touched: true,
            isFormValid: false,
          },
        });
      }
    }
  }
};

export const validateInput = (
  name: IIAddressFieldNames,
  value,
  dispatch,
  formState,
  useCheckoutRes: CheckoutSDK
) => {
  // const { getCityStateFromPincode } = useCheckoutRes;
  // console.log("useCheckoutRes", useCheckoutRes, getCityStateFromPincode);
  let hasError = false;
  let error = "";
  switch (name) {
    case "firstName":
    case "lastName":
      if (value?.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else if (value?.trim().length < 3) {
        hasError = true;
        error = "Invalid Name. Must be atleast 3 characters long";
      } else if (DISALLOWED_KEYWORDS.includes(value?.trim())) {
        hasError = true;
        error = "Invalid Name";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "email":
      if (value?.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value?.toLowerCase()
        ) ||
        DISALLOWED_KEYWORDS.includes(value?.trim())
      ) {
        hasError = true;
        error = "Invalid Email";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "phone":
      if (value?.trim() === "") {
        hasError = true;
        error = "Mobile cannot be empty";
      } else if (!/(^(\+91)?([0-9]{10}))$/.test(value)) {
        hasError = true;
        error = "Invalid Mobile Number.";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "postalCode": {
      if (value?.trim() === "") {
        hasError = true;
        error = "Pincode cannot be empty";
      } else if (!/^[0-9]{6}$/.test(value)) {
        hasError = true;
        error = "Invalid Pincode. Use 6 digits only";
      } else {
        hasError = false;
        error = "";
      }

      break;
    }
    case "streetAddress1":
      if (value?.trim() === "") {
        hasError = true;
        error = "Address Line 1 cannot be empty";
      } else if (
        value
          ?.replace(/[^A-Za-z0-9]+/g, " ")
          ?.trim()
          ?.split(" ")?.length < 2
      ) {
        // Raise Error if the string less than 2 terms
        hasError = true;
        error = "Address Line 1 should have atleast 2 words";
      } else if (DISALLOWED_KEYWORDS.includes(value?.trim())) {
        hasError = true;
        error = "Invalid Address";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "streetAddress2":
      if (DISALLOWED_KEYWORDS.includes(value.trim())) {
        hasError = true;
        error = "Invalid Address";
      } else if (
        !/^[A-Za-z0-9 @~`!@#$%^&*()_=+\\\\';:\"\\\/?>.<,-]*$/.test(value)
      ) {
        hasError = true;
        error =
          "Address can only include alphabets, numbers and special characters.";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "city":
      if (value?.trim() === "") {
        hasError = true;
        error = "City cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "countryArea":
      if (value?.trim() === "") {
        hasError = true;
        error = "State cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    default:
      break;
  }
  return { hasError, error };
};
export const onFocusOut = (
  name,
  value,
  dispatch,
  formState,
  useCheckoutRes
) => {
  const { hasError, error } = validateInput(
    name,
    value,
    dispatch,
    formState,
    useCheckoutRes
  );
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

export const initFunc = initialState => {
  return initialState;
};

export const formsReducer = (state, action) => {
  switch (action.type) {
    case CheckoutFormActionTypes.UPDATE_FORM_VALUE:
      const {
        name,
        value,
        hasError,
        error,
        touched,
        isFormValid,
      } = action.data;
      return {
        ...state,
        // update the state of the particular field,
        // by retaining the state of other fields
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    case CheckoutFormActionTypes.UPDATE_COMPLETE_FORM:
      return initFunc(action.data);
    default:
      return state;
  }
};

export const convertAddressString = (
  address: AddressFragment,
  type: "stringToAddress" | "addressToString"
) => {
  const {
    city,
    country,
    countryArea,
    firstName,
    lastName,
    phone,
    postalCode,
    streetAddress1,
    streetAddress2,
  } = address;

  switch (type) {
    case "addressToString":
      const formattedString = `${firstName} ${lastName} | ${streetAddress1} | ${streetAddress2} | ${city}, ${countryArea} | ${postalCode} | ${country?.country} | ${phone}`;
      return formattedString;

    case "stringToAddress":

    default:
      return formattedString;
  }
};

export const DISALLOWED_KEYWORDS = [
  "abandoned",
  "dummy",
  "Plixfam",
  "there",
  "dummy@dummy.com",
];

export const JUSPAY_STYLE_OBJECT = {
  /* Add common styling for all input fields here */
  input: {
    "max-height": "30px",
    "background-color": "white",
    "border-radius": "8px",
    "font-weight": "700",
  },
  /* Add the styling for card number input field here */
  ".card_number": {
    "line-height": "20px",
    "font-size": "14px",
  },
  /* Add the styling for card holder name input field here */
  ".name_on_card": {
    height: "40px",
    "line-height": "20px",
    "font-size": "14px",
  },
  /* Add the styling for card expiry month input field here */
  ".card_exp_month": {
    "line-height": "20px",
    "font-size": "14px",
    width: "90px",
  },
  /* Add the styling for card expiry year input field here */
  ".card_exp_year": {
    "line-height": "20px",
    "font-size": "14px",
    width: "90px",
  },
  /* Add the styling for card security code input field here */
  ".security_code": {
    "line-height": "20px",
    "font-size": "14px",
    width: "90px",
  },
  // ".upi_vpa": {
  //   "max-height": "40px",
  //   border: "1px solid lightgray",
  //   padding: "0.5rem 1rem",
  // },
  /* Add the styling to be added to input fields in focus state */
  ":focus": {
    outline: "none",
  },
  ":focus-visible": {
    outline: "none",
  },
  "::placeholder": {
    "font-weight": "400",
  },
};

export const constructPaymentUri = (appName: UPI_APP_NAMES, params) => {
  if (
    params &&
    params.tr &&
    params.merchantVpa &&
    params.mcc &&
    params.merchantName &&
    params.amount &&
    params.orderId
  ) {
    switch (appName) {
      case UPI_APP_NAMES.PHONEPE:
        return `phonepe://pay?tr=${params.tr}&pa=${params?.merchantVpa}&mc=${params?.mcc}&pn=${params?.merchantName}&am=${params?.amount}&cu=INR&tn=Plix-${params?.orderId}`;
      case UPI_APP_NAMES.GPAY:
        return `gpay://upi/pay?tr=${params.tr}&pa=${params?.merchantVpa}&mc=${params?.mcc}&pn=${params?.merchantName}&am=${params?.amount}&cu=INR&tn=Plix-${params?.orderId}`;
      case UPI_APP_NAMES.PAYTM:
        return `paytmmp://pay?tr=${params.tr}&pa=${params?.merchantVpa}&mc=${params?.mcc}&pn=${params?.merchantName}&am=${params?.amount}&cu=INR&tn=Plix-${params?.orderId}`;
      case UPI_APP_NAMES.OTHER:
        return `upi://pay?tr=${params.tr}&pa=${params?.merchantVpa}&mc=${params?.mcc}&pn=${params?.merchantName}&am=${params?.amount}&cu=INR&tn=Plix-${params?.orderId}`;
      default:
        break;
    }
  }
};

export const getJuspayIframeElements = paymentMode => {
  switch (paymentMode) {
    case "upi":
      return {
        upi_vpa: {
          container: ".upi_vpa",
        },
      };
    case "card":
      return {
        card_number: {
          /* Class name of the <div> which will hold the iframe element for card number. */
          container: ".card_number_div",
          attributes: {
            /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
            placeholder: "XXXX XXXX XXXX XXXX",
          },
        },
        name_on_card: {
          /* Class name of the <div> which will hold the iframe element for card holder name. */
          container: ".name_on_card_div",
          attributes: {
            /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
            placeholder: "Name On Card",
          },
        },
        card_exp_month: {
          /* Class name of the <div> which will hold the iframe element for card expiry month. */
          container: ".card_exp_month_div",
          attributes: {
            /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
            placeholder: "MM",
          },
        },
        card_exp_year: {
          /* Class name of the <div> which will hold the iframe element for card expiry year. */
          container: ".card_exp_year_div",
          attributes: {
            /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
            placeholder: "YY",
          },
        },
        security_code: {
          /* Class name of the <div> which will hold the iframe element for card security code. */
          container: ".security_code_div",
          attributes: {
            /* Field Attributes, which you want to set for the <input> field inside the iframe element. */
            placeholder: "XXX",
          },
        },
      };
    default:
      return {};
  }
};

export const getCardErrorText = errorField => {
  switch (errorField) {
    case "card_exp_year":
      return "Card expiry year is invalid";
    case "card_exp_month":
      return "Card expiry month is invalid";
    case "card_number":
      return "Card number is invalid";
    case "name_on_card":
      return "Card name is invalid";
    default:
      return "Invalid card detials";
  }
};

export const DEFAULT_BANKS = [
  // {
  //   value: "NB_HDFC",
  //   label: "HDFC",
  //   imgUrl:
  //     "https://plixlifefc-media.farziengineer.co/hosted/hdfc-logo-695548f973fe.webp",
  // },
  {
    value: "NB_AXIS",
    label: "AXIS",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/axis-logo-3878bbd893ad.webp",
  },
  {
    value: "NB_SBI",
    label: "SBI",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/sbi-logo-238bfbf5cdbd.webp",
  },
  {
    value: "NB_ICICI",
    label: "ICICI",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/icici-logo-cabf6ab7bde4.webp",
  },
];

export const DEFAULT_WALLETS = [
  {
    value: "PHONEPE",
    label: "PhonePe",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_2_2-1b35350e6896.png",
  },
  {
    value: "PAYTM",
    label: "Paytm",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_12-7f4b1e704eb1.png",
  },
  {
    value: "AMAZONPAY",
    label: "Amazon Pay",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_3-690a1b9dbad9.png",
  },
  {
    value: "MOBIKWIK",
    label: "MobiKwik",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_12-aac47daa332d.png",
  },
  {
    value: "FREECHARGE",
    label: "Free Charge",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_13_1-f1119073800e.png",
  },
  {
    value: "AIRTELMONEY",
    label: "Airtel Money",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_4-2fb5839ee9b9.png",
  },
  {
    value: "OLAMONEY",
    label: "Ola Money",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_15_1-42dbdde6d2e6.png",
  },
  {
    value: "JIOMONEY",
    label: "Jio Money",
    imgUrl:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_16-6d99597d7c48.png",
  },
];
export interface IUpiAppButtons {
  name: string;
  img: string;
}

export enum UPI_APP_NAMES {
  PHONEPE = "PhonePe",
  GPAY = "Google Pay",
  PAYTM = "Paytm",
  OTHER = "Other apps",
}

export const UPI_APP_BUTTONS: Array<IUpiAppButtons> = [
  {
    name: "PhonePe",
    img:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_copy_2_2-1b35350e6896.png",
  },
  {
    name: "Google Pay",
    img:
      "https://plixstage-media.farziengineer.co/hosted/Artboard_1_copy-2a6e7ed37ed1.png",
  },
  {
    name: "Paytm",
    img:
      "https://plixlifefc-media.farziengineer.co/hosted/Artboard_1_12-7f4b1e704eb1.png",
  },
  {
    name: "Other apps",
    img:
      "https://plixstage-media.farziengineer.co/hosted/Artboard_1_copy_14-b991f89425d2.png",
  },
];

export const NETBANKING_OPTIONS = [
  {
    value: "NB_AXIS",
    label: "Axis Bank",
  },
  // {
  //   value: "NB_HDFC",
  //   label: "HDFC Bank",
  // },
  {
    value: "NB_AIRTEL",
    label: "Airtel Payments Bank",
  },
  {
    value: "NB_AUB",
    label: "AU Small Finance Bank",
  },
  // {
  //   value: "NB_BOI",
  //   label: "Bank of India",
  // },
  // {
  //   value: "NB_BOM",
  //   label: "Bank of Maharashtra",
  // },
  // {
  //   value: "NB_DCB",
  //   label: "Development Credit Bank",
  // },
  {
    value: "NB_CORP",
    label: "Corporation Bank",
  },
  {
    value: "NB_CBI",
    label: "Central Bank Of India",
  },
  {
    value: "NB_FED",
    label: "Federal Bank",
  },
  {
    value: "NB_ICICI",
    label: "ICICI Netbanking",
  },
  {
    value: "NB_IDBI",
    label: "Industrial Development Bank of India",
  },
  {
    value: "NB_INDB",
    label: "Indian Bank",
  },
  {
    value: "NB_INDUS",
    label: "IndusInd Bank",
  },
  {
    value: "NB_IOB",
    label: "Indian Overseas Bank",
  },
  {
    value: "NB_JNK",
    label: "Jammu and Kashmir Bank",
  },
  // {
  //   value: "NB_KARN",
  //   label: "Karnataka Bank",
  // },
  {
    value: "NB_KVB",
    label: "Karur Vysya",
  },
  {
    value: "NB_SBBJ",
    label: "State Bank of Bikaner and Jaipur",
  },
  {
    value: "NB_SBH",
    label: "State Bank of Hyderabad",
  },
  {
    value: "NB_SBI",
    label: "State Bank of India",
  },
  {
    value: "NB_SBM",
    label: "State Bank of Mysore",
  },
  {
    value: "NB_SBT",
    label: "State Bank of Travancore",
  },
  {
    value: "NB_SOIB",
    label: "South Indian Bank",
  },
  {
    value: "NB_UBI",
    label: "Union Bank of India",
  },
  {
    value: "NB_UNIB",
    label: "United Bank Of India",
  },
  {
    value: "NB_VJYB",
    label: "Vijaya Bank",
  },
  {
    value: "NB_YESB",
    label: "Yes Bank",
  },
  {
    value: "NB_CUB",
    label: "CityUnion",
  },
  {
    value: "NB_CANR",
    label: "Canara Bank",
  },
  {
    value: "NB_SBP",
    label: "State Bank of Patiala",
  },
  // {
  //   value: "NB_CITI",
  //   label: "Citi Bank NetBanking",
  // },
  // {
  //   value: "NB_DEUT",
  //   label: "Deutsche Bank",
  // },
  // {
  //   value: "NB_KOTAK",
  //   label: "Kotak Bank",
  // },
  {
    value: "NB_DLS",
    label: "Dhanalaxmi Bank",
  },
  {
    value: "NB_EQUITAS",
    label: "Equitas small finance bank",
  },
  // {
  //   value: "NB_ING",
  //   label: "ING Vysya Bank",
  // },
  {
    value: "NB_ANDHRA",
    label: "Andhra Bank",
  },
  // {
  //   value: "NB_PNBCORP",
  //   label: "Punjab National Bank CORPORATE",
  // },
  {
    value: "NB_PNB",
    label: "Punjab National Bank",
  },
  {
    value: "NB_BOB",
    label: "Bank of Baroda",
  },
  // {
  //   value: "NB_CSB",
  //   label: "Catholic Syrian Bank",
  // },
  // {
  //   value: "NB_OBC",
  //   label: "Oriental Bank Of Commerce",
  // },
  {
    value: "NB_SCB",
    label: "Standard Chartered Bank",
  },
  {
    value: "NB_TMB",
    label: "Tamilnad Mercantile Bank",
  },
  {
    value: "NB_SARASB",
    label: "Saraswat Bank",
  },
  {
    value: "NB_SYNB",
    label: "Syndicate Bank",
  },
  // {
  //   value: "NB_UCOB",
  //   label: "UCO Bank",
  // },
  // {
  //   value: "NB_BOBCORP",
  //   label: "Bank of Baroda Corporate",
  // },
  {
    value: "NB_ALLB",
    label: "Allahabad Bank",
  },
  // {
  //   value: "NB_BBKM",
  //   label: "Bank of Bahrain and Kuwait",
  // },
  // {
  //   value: "NB_JSB",
  //   label: "Janata Sahakari Bank",
  // },
  // {
  //   value: "NB_LVBCORP",
  //   label: "Lakshmi Vilas Bank Corporate",
  // },
  // {
  //   value: "NB_LVB",
  //   label: "Lakshmi Vilas Bank Retail",
  // },
  // {
  //   value: "NB_NKGSB",
  //   label: "North Kanara GSB",
  // },
  // {
  //   value: "NB_PMCB",
  //   label: "Punjab and Maharashtra Coop Bank",
  // },
  // {
  //   value: "NB_PNJSB",
  //   label: "Punjab and Sind Bank",
  // },
  {
    value: "NB_RATN",
    label: "Ratnakar Bank",
  },
  // {
  //   value: "NB_RBS",
  //   label: "Royal Bank of Scotland",
  // },
  // {
  //   value: "NB_SVCB",
  //   label: "Shamrao Vithal Coop Bank",
  // },
  // {
  //   value: "NB_TNSC",
  //   label: "Tamil Nadu State Apex Coop Bank",
  // },
  // {
  //   value: "NB_DENA",
  //   label: "DENA Bank",
  // },
  // {
  //   value: "NB_COSMOS",
  //   label: "COSMOS Bank",
  // },
  // {
  //   value: "NB_DBS",
  //   label: "DBS Bank Ltd",
  // },
  // {
  //   value: "NB_DCBB",
  //   label: "DCB BANK Business",
  // },
  // {
  //   value: "NB_SVC",
  //   label: "SVC Cooperative Bank",
  // },
  {
    value: "NB_BHARAT",
    label: "Bharat Bank",
  },
  // {
  //   value: "NB_KVBCORP",
  //   label: "Karur Vysya Corporate Banking",
  // },
  // {
  //   value: "NB_UBICORP",
  //   label: "Union Bank Corporate Banking",
  // },
  {
    value: "NB_IDFC",
    label: "IDFC Bank",
  },
  // {
  //   value: "NB_NAIB",
  //   label: "The Nainital Bank",
  // },
];

const formUtilsNew = () => {};

export default formUtilsNew
