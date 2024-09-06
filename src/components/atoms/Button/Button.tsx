import React from "react";

import {ReactSVG} from "react-svg";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * The basic button
 */
export const Button: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  testingContext,
  testingContextId,
  fullWidth = false,
  size = "md",
  startIcon,
  endIcon,
  toCapitalize = true,
  ...props
}: IProps) => {
  const ButtonWithTheme = color === "secondary" ? S.Secondary : S.Primary;

  return (
    <ButtonWithTheme
      data-test={testingContext}
      data-test-id={testingContextId}
      color={color}
      fullWidth={fullWidth}
      size={size}
      ref={btnRef}
      {...props}
    >
      {startIcon && <ReactSVG src={startIcon} />}
      <S.Text btnColor={color} size={size} toCapitalize={toCapitalize}>
        {children}
      </S.Text>
      {endIcon && <ReactSVG src={endIcon} />}
    </ButtonWithTheme>
  );
};
