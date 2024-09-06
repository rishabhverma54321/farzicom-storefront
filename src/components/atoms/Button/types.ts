import React from "react";

export type Size = "md" | "sm" | "none";
export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button color type
   */
  color?: "primary" | "secondary" | "tertiary";
  /**
   * Reference to HTML button element
   */
  btnRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Whether width should take all available space
   */
  fullWidth?: boolean;
  /**
   * Size
   */
  size?: Size;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;

  startIcon?: string;
  endIcon?: string;
  btnRadius?: string;
  toCapitalize?: boolean;
}
