import React from "react";
import styles from "./index.module.scss";
import { CircularProgress, CircularProgressProps } from "@mui/material";

function mmatchPropsAreEqual(prevMatch: any, nextMatch: any) {
  return prevMatch?.loader?.loading === nextMatch?.loader?.loading;
}

interface ILoader {
  loading: boolean;
  loaderComponent?: React.ReactNode;
  circularLoaderProps?: CircularProgressProps;
}
export interface IButtonNextProps
  extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loader?: ILoader;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  variant: number;
  customStyles?: any;
  customStylesName?: string;
}

export const ButtonNext: React.FC<IButtonNextProps> = props => {
  const {
    handleClick,
    text,
    loader,
    leftIcon,
    rightIcon,
    variant = 1,
    customStyles,
    customStylesName = "button",
    ...buttonProps
  } = props;

  const styleObject = {
    button: `button${variant}`,
    buttonLeftIcon: `button${variant}__buttonLeftIcon`,
    buttonText: `button${variant}__buttonText`,
    buttonRightIcon: `button${variant}__buttonRightIcon`,
    buttonLoader: `button${variant}__buttonLoader`,

    customButton: `${customStylesName}`,
    customButtonLeftIcon: `${customStylesName}__buttonLeftIcon`,
    customButtonText: `${customStylesName}__buttonText`,
    customButtonRightIcon: `${customStylesName}__buttonRightIcon`,
    customButtonLoader: `${customStylesName}__buttonLoader`,
  };

  if (loader && loader.loading) {
    return (
      <button
        className={`${styles[styleObject.button]} ${
          customStyles[styleObject.customButton]
        }`}
        onClick={handleClick}
      >
        <div
          className={`${styles[styleObject.buttonLeftIcon]} ${
            customStyles[styleObject.customButtonLeftIcon]
          }`}
        >
          {loader && loader.loaderComponent ? (
            loader.loaderComponent
          ) : (
            <CircularProgress color="inherit" {...loader.circularLoaderProps} />
          )}
        </div>
      </button>
    );
  }
  return (
    <button
      className={`${styles[styleObject.button]} ${
        customStyles[styleObject.customButton]
      }`}
      {...buttonProps}
      onClick={handleClick}
    >
      <div
        className={`${styles[styleObject.buttonLeftIcon]} ${
          customStyles[styleObject.customButtonLeftIcon]
        }`}
      >
        {leftIcon}
      </div>
      <div
        className={`${styles[styleObject.buttonText]} ${
          customStyles[styleObject.customButtonText]
        }`}
      >
        {text}
      </div>
      <div
        className={`${styles[styleObject.buttonRightIcon]} ${
          customStyles[styleObject.customButtonRightIcon]
        }`}
      >
        {rightIcon}
      </div>
    </button>
  );
};
ButtonNext.displayName = "ButtonNext";
export default React.memo(ButtonNext, mmatchPropsAreEqual);
