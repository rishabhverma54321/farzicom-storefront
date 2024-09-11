import { optionsKnob } from "@storybook/addon-knobs";
import React, { SelectHTMLAttributes } from "react";
import styles from "./index.module.scss";

export interface ISelectOptions {
  name: string;
  value: string;
  disabled?: boolean;
}

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant: number;
  selectOptions: Array<ISelectOptions>;
  label?: string;
  customClassname?: string;
  customStyles?: any;
}

export const Select: React.FC<ISelectProps> = props => {
  const {
    variant = 1,
    id,
    label,
    customStyles,
    selectOptions,
    ...selectProps
  } = props;
  const styleObject = {
    container: `selectContainer${variant}`,
    select: `selectContainer${variant}__select`,
    option: `selectContainer${variant}__option`,
    label: `selectContainer${variant}__label`,
    customContainer: `selectContainer`,
    customSelect: `selectContainer__select`,
    customOption: `selectContainer__option`,
    customLabel: `selectContainer__label`,
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
      <select
        {...selectProps}
        className={`${styles[styleObject.select]} ${
          customStyles[styleObject.customSelect]
        }`}
      >
        {selectOptions.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value}
              disabled={option?.disabled || false}
              className={`${styles[styleObject.option]} ${
                customStyles[styleObject.customOption]
              }`}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
Select.displayName = "Select";
export default Select;
