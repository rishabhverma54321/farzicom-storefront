import React, { InputHTMLAttributes, ReactNode } from "react";
import * as S from "./styles";

export interface ICustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
  ClassName?: string;
  width?: number;
  height?: number;
  placeHolderColor?: string;
  outerWidth?: number;
  id?: string;
  inputRef?: any;
  value?: string | number;
}

export const CustomInput: React.FC<ICustomInputProps> = ({
  RightIcon,
  LeftIcon,
  ClassName,
  width,
  height,
  placeHolderColor,
  outerWidth,
  id,
  inputRef,
  ...inputProps
}) => {
  return (
    <S.InputContainer
      className={ClassName}
      border="1px solid #E5E5E5"
      inputHeight={2.25}
      outerWidth={outerWidth}
    >
      {LeftIcon ? <div className="right">{LeftIcon}</div> : <> </>}

      <S.CustomInput
        placeHolderColor={placeHolderColor}
        width={width}
        id={id}
        ref={inputRef}
        {...inputProps}
      />
      {RightIcon ? <div className="left">{RightIcon}</div> : <> </>}
    </S.InputContainer>
  );
};
CustomInput.displayName = "CustomInput";
export default CustomInput;
