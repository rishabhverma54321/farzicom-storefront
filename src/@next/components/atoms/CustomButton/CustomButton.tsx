import React, { ReactNode } from "react";
import * as S from "./style";

export interface ICustomButtonProps {
  text: string;
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
  ClassName?: string;
  height?: number;
  width?: number;
  textColor?: string;
  handleClick?: any;
  bgColor?: string;
  fontWeight?: number;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  RightIcon,
  LeftIcon,
  ClassName,
  handleClick,
  width,
  height,
  textColor,
  bgColor,
  fontWeight,
}) => {
  return (
    <>
      <S.ButtonContainer
        width={width}
        height={height}
        onClick={handleClick}
        className={ClassName}
        bgColor={bgColor}
      >
        {LeftIcon ? <div className="right">{LeftIcon}</div> : <> </>}
        <S.Button fontWeight={fontWeight} color={textColor}>
          {text}
        </S.Button>
        {RightIcon ? <div className="left">{RightIcon}</div> : <> </>}
      </S.ButtonContainer>
    </>
  );
};
CustomButton.displayName = "CustomButton";
export default CustomButton;
