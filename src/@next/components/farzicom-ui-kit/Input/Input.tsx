import MemoVerifiedGreenTick from "@components/atoms/SvgIcons/VerifiedGreenTick";
import MemoVerifiedGreyTick from "@components/atoms/SvgIcons/VerifiedGreyTIck";
import React, { InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: number;
  label?: React.ReactNode;
  customClassname?: string;
  customStyles?: any;
  customStylesName?: string;
  isValidated?: boolean;
  showValidityTick?: boolean;
}

export const Input: React.FC<IInputProps> = props => {
  const {
    variant = 1,
    id,
    label,
    customStyles,
    customStylesName = "inputContainer",
    isValidated,
    showValidityTick,
    ...inputProps
  } = props;
  const styleObject = {
    container: `inputContainer${variant}`,
    input: `inputContainer${variant}__input`,
    label: `inputContainer${variant}__label`,
    customContainer: `${customStylesName}`,
    customInput: `${customStylesName}__input`,
    customLabel: `${customStylesName}__label`,
    trailingIcon: `${customStylesName}__trailingIcon`,
  };
  return (
    <div
      className={`${styles[styleObject.container]} ${
        customStyles[styleObject.customContainer]
      }`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`${styles[styleObject.label]} ${
            customStyles[styleObject.customLabel]
          }`}
        >
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={`${styles[styleObject.input]} ${
          customStyles[styleObject.customInput]
        }`}
      />
      <>
        {showValidityTick && (
          <span
            className={`${styles[styleObject.trailingIcon]} ${
              customStyles[styleObject.trailingIcon]
            }`}
          >
            {isValidated ? <MemoVerifiedGreenTick /> : <MemoVerifiedGreyTick />}
          </span>
        )}
      </>
    </div>
  );
};
Input.displayName = "Input";
export default Input;
