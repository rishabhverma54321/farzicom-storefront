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

export enum CheckoutEnumsOthersThanAddress {
  PAYMENT_METHOD = "paymentMethod",
  USE_CASHBACK = "useCashback",
  UPDATE_ON_WHATSAPP = "updateOnWhatsapp",
}

export enum PaymentMethods {
  RAZORPAY = "mirumee.payments.razorpay",
  COD = "mirumee.payments.dummy",
  WALLET = "mirumee.payments.wallet",
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
  | "mirumee.payments.dummy";

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
  [
    {
      name: IIAddressFieldNames.PHONE,
      id: "phone",
      placeholder: "Phone *",
      label: "Phone",
      row: 2,
      autoComplete: "tel",
      inputMode: "numeric",
      type: "tel",
    },
  ],
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
  [
    {
      name: IIAddressFieldNames.STREET_ADDRESS_2,
      id: "streetAddress2",
      placeholder: "Apartment, Landmark, etc. (optional)",
      label: "Address Line 2",
      row: 3,
      autoComplete: "address-line2",
      inputMode: "text",
      type: "text",
    },
  ],
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
  [
    {
      name: IIAddressFieldNames.PHONE,
      id: "phone",
      placeholder: "Phone (Active On Whatsapp)*",
      label: "Phone",
      row: 2,
      autoComplete: "tel",
      inputMode: "numeric",
      type: "tel",
      subText:
        "Note: Phone number is needed to contact you for shipping- related questions.",
    },
  ],
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
      name: IIAddressFieldNames.POSTAL_CODE,
      id: "postalCode",
      placeholder: "Pin Code *",
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
  [
    {
      name: IIAddressFieldNames.STREET_ADDRESS_1,
      id: "streetAddress1",
      placeholder: "Eg: 401, Roman Plaza Building, Sector 5, Jambli Gali",
      label: "Address Line 1",
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
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else if (value.trim().length < 3) {
        hasError = true;
        error = "Invalid Name. Must be atleast 3 characters long";
      } else if (DISALLOWED_KEYWORDS.includes(value.trim())) {
        hasError = true;
        error = "Invalid Name";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}?$/.test(
          value?.toLowerCase()
        ) ||
        DISALLOWED_KEYWORDS.includes(value.trim())
      ) {
        hasError = true;
        error = "Invalid Email";
      } else {
        const email = value?.split("@");
        const domainParts = email[1]?.split(".");
        const tld = domainParts?.pop();
        const sld = domainParts.length > 1 ? domainParts?.pop() : "";
        if (sld && !TLDs?.includes(`${sld}.${tld}`)) {
          hasError = true;
          error = `${sld}.${tld} invalid domain name`;
        } else if (!TLDs?.includes(tld)) {
          hasError = true;
          error = `${tld} invalid domain name`;
        } else {
          hasError = false;
          error = "";
        }
      }
      break;
    case "phone":
      if (value.trim() === "") {
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
      if (value.trim() === "") {
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
      if (value.trim() === "") {
        hasError = true;
        error = "Address Line 1 cannot be empty";
      } else if (
        !/^[A-Za-z0-9 @~`!@#$%^&*()_=+\\\\';:\"\\\/?>.<,-]*$/.test(value)
      ) {
        hasError = true;
        error =
          "Address can only include alphabets, numbers and special characters.";
      } else if (
        value
          ?.replace(/[^A-Za-z0-9]+/g, " ")
          ?.trim()
          ?.split(" ")?.length < 2
      ) {
        // Raise Error if the string less than 2 terms
        hasError = true;
        error = "Address Line 1 should have atleast 2 words";
      } else if (DISALLOWED_KEYWORDS.includes(value.trim())) {
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
      if (value.trim() === "") {
        hasError = true;
        error = "City cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "countryArea":
      if (value.trim() === "") {
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

const TLDs = [
  "com",
  "net",
  "org",
  "gov",
  "edu",
  "mil",
  "biz",
  "info",
  "mobi",
  "name",
  "pro",
  "aero",
  "asia",
  "cat",
  "coop",
  "int",
  "jobs",
  "museum",
  "tel",
  "travel",
  "arpa",
  "xxx",
  "uk",
  "ac",
  "ad",
  "ae",
  "af",
  "ag",
  "ai",
  "al",
  "am",
  "an",
  "ao",
  "aq",
  "ar",
  "as",
  "at",
  "au",
  "aw",
  "ax",
  "az",
  "ba",
  "bb",
  "bd",
  "be",
  "bf",
  "bg",
  "bh",
  "bi",
  "bj",
  "bm",
  "bn",
  "bo",
  "br",
  "bs",
  "bt",
  "bv",
  "bw",
  "by",
  "bz",
  "ca",
  "cc",
  "cd",
  "cf",
  "cg",
  "ch",
  "ci",
  "ck",
  "cl",
  "cm",
  "cn",
  "co",
  "cr",
  "cu",
  "cv",
  "cx",
  "cy",
  "cz",
  "de",
  "dj",
  "dk",
  "dm",
  "do",
  "dz",
  "ec",
  "ee",
  "eg",
  "er",
  "es",
  "et",
  "eu",
  "fi",
  "fj",
  "fk",
  "fm",
  "fo",
  "fr",
  "ga",
  "gb",
  "gd",
  "ge",
  "gf",
  "gg",
  "gh",
  "gi",
  "gl",
  "gm",
  "gn",
  "gp",
  "gq",
  "gr",
  "gs",
  "gt",
  "gu",
  "gw",
  "gy",
  "hk",
  "hm",
  "hn",
  "hr",
  "ht",
  "hu",
  "id",
  "ie",
  "il",
  "im",
  "in",
  "io",
  "iq",
  "ir",
  "is",
  "it",
  "je",
  "jm",
  "jo",
  "jp",
  "ke",
  "kg",
  "kh",
  "ki",
  "km",
  "kn",
  "kp",
  "kr",
  "kw",
  "ky",
  "kz",
  "la",
  "lb",
  "lc",
  "li",
  "lk",
  "lr",
  "ls",
  "lt",
  "lu",
  "lv",
  "ly",
  "ma",
  "mc",
  "md",
  "me",
  "mg",
  "mh",
  "mk",
  "ml",
  "mm",
  "mn",
  "mo",
  "mp",
  "mq",
  "mr",
  "ms",
  "mt",
  "mu",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nc",
  "ne",
  "co.in",
  "co.uk",
  "com.au",
  "co.nz",
  "co.jp",
  "co.kr",
  "co.za",
  "co.in",
  "co.id",
  "com.cn",
  "com.tw",
  "co.th",
  "com.br",
  "co.hu",
  "co.il",
  "co.cr",
  "com.mx",
  "co.ug",
  "com.ng",
  "co.ao",
  "com.ar",
  "co.ke",
  "com.sg",
  "com.ph",
  "co.ma",
  "com.my",
  "com.hk",
  "co.tz",
  "com.pe",
  "com.eg",
  "co.cr",
  "co.ve",
  "com.do",
  "co.zw",
  "co.bw",
  "co.mz",
  "co.ug",
  "com.pk",
  "com.bd",
  "co.th",
  "co.nz",
  "com.tr",
  "com.gh",
  "co.bw",
  "com.gh",
  "com.vn",
  "com.gt",
  "com.na",
];

const formUtils = () => {}

export default formUtils
