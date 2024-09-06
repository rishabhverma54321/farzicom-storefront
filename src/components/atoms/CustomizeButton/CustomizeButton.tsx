import React from "react";
import { DoubleArrow } from "@components/atoms/SvgIcons";
import * as S from "./style";

// import arrow from "./assets/doubleArrow.svg";
// import Insta from "./assets/instagram 2.svg";
import { CustomLink } from "../CustomLink";
import MemoInstagramSVG from "./assets/InstagramSVG";

export interface ICustomizeButtonProps {
  text: string;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  link: string;
  buttonClass: string;
  handleClick?: () => void;
}

export const CustomizeButton: React.FC<ICustomizeButtonProps> = ({
  text,
  leftIcon,
  rightIcon,
  link,
  buttonClass,
  handleClick,
}) => {
  return (
    <>
      <S.ButtonContainer className={buttonClass} onClick={handleClick}>
        <CustomLink
          linkClassName={`${buttonClass}__atag`}
          to={link}
          openInNewTab
        >
          <S.Span>
            {leftIcon && (
              <>
                {typeof leftIcon === "string" ? <MemoInstagramSVG /> : leftIcon}
              </>
            )}
            <S.Button>{text}</S.Button>
            {rightIcon && (
              <>
                {typeof rightIcon === "string" ? (
                  <DoubleArrow className={`${buttonClass}__svgRight`} />
                ) : (
                  rightIcon
                )}
              </>
            )}
          </S.Span>
        </CustomLink>
      </S.ButtonContainer>
    </>
  );
};
CustomizeButton.displayName = "CustomizeButton";
export default CustomizeButton;
