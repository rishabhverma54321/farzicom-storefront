import React from "react";
import { components } from "react-select";
import { ControlProps } from "react-select/lib/components/Control";
import { InputProps } from "react-select/lib/components/Input";
import { OptionProps } from "react-select/lib/components/Option";
import { ThemeContext } from "styled-components";

import { Icon } from "@components/atoms/Icon";
import { InputLabel } from "@components/atoms/InputLabel";
import { Select } from "@components/atoms/Select";

import * as S from "./styles";
import { IProps } from "./types";

export const InputSelect: React.FC<IProps> = ({
  label,
  inputProps,
  ...props
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);
  const secondaryColor = customTheme.colors.secondary;
  // const borderColor = customTheme.input.border;

  const customStyles = {
    control: (provided: any, state: { menuIsOpen: any }) => ({
      ...provided,
      ":hover": {
        border: `1px solid ${secondaryColor}`,
        outlineColor: secondaryColor,
        outlineStyle: "solid",
        outlineWidth: "1px",
      },
      background: "none",
      borderRadius: 0,
      boxShadow: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: "0.55rem 1rem",
    }),
    valueContainer: (provided: any) => {
      return {
        ...provided,
        padding: 0,
      };
    },
  };

  const customComponents = {
    Control: (props: ControlProps<any>) => {
      const customTheme = React.useContext(ThemeContext);
      return (
        <>
          <components.Control
            data-test="inputSelect"
            {...{ customTheme, ...props }}
          />
          <InputLabel
            labelBackground="white"
            active={props.selectProps.menuIsOpen || props.hasValue}
          >
            {label}
          </InputLabel>
        </>
      );
    },
    IndicatorSeparator: () => null,
    IndicatorsContainer: ({ selectProps, hasValue, clearValue }: any) => {
      const showClearIndicator =
        selectProps.isClearable ||
        (selectProps.isMulti && selectProps.isClearable === undefined);

      if (showClearIndicator && hasValue) {
        return (
          <S.ClearIndicator onClick={clearValue}>
            <Icon name="select_x" size={10} />
          </S.ClearIndicator>
        );
      }
      // Boolean to string conversion done due to
      // https://github.com/styled-components/styled-components/issues/1198
      return (
        <S.DropdownIndicator rotate={String(selectProps.menuIsOpen)}>
          <Icon name="select_arrow" size={10} />
        </S.DropdownIndicator>
      );
    },
    Input: (props: InputProps) => {
      return <components.Input {...{ ...props, ...inputProps }} />;
    },
    Option: (props: OptionProps<any>) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <Select
      customComponents={customComponents}
      {...props}
      customStyles={customStyles}
    />
  );
};
