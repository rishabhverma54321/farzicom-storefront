import { IAddress, IAddressWithEmail, IAddressWithEmailAndTypes } from "@types";
import { FormikTouched } from "formik";
import { AddressTypes } from "@saleor/sdk";

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue: (field: string, value: string) => void;
  values?: IAddressWithEmailAndTypes;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  includeEmail?: boolean;
  touched?: FormikTouched<Partial<IAddressWithEmailAndTypes>>;
  validateForm: any;
  setValues: (values: Partial<IAddressWithEmailAndTypes>) => void;
  submitCount: number;
  isdefaultAddress?:any;
}

export type AddressError = { field?: string; message: string };

export interface IProps {
  address?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  handleSubmit?: (formData: IAddressWithEmailAndTypes | undefined) => void;
  // handleChange: (e: React.ChangeEvent) => void;
  // handleBlur: (e: React.FocusEvent) => void;
  includeEmail?: boolean;
  testingContext?: string;
  shippingErrors?: any;
  setShippingAddress?: (
    address?: IAddress | undefined,
    email?: string | undefined,
    type?: AddressTypes | undefined,
    id?: string | undefined
  ) => void;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
