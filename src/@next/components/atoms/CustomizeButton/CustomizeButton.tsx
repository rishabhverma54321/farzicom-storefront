import React from "react";
import ReactSVG from "react-svg";
import { DoubleArrow } from "@components/atoms/SvgIcons";
import * as S from "./style";

// import arrow from "./assets/doubleArrow.svg";
// import Insta from "./assets/instagram 2.svg";
import { CustomLink } from "../CustomLink";
import MemoInstagramSVG from "./assets/InstagramSVG";
import style from "./scss/index.module.scss"

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
      <div className={`${buttonClass} ${style.ButtonContainer}`} onClick={handleClick}>
        <CustomLink
          linkClassName={`${buttonClass}__atag`}
          to={link}
          openInNewTab
        >
          <span className={style.Span}>
            {leftIcon && (
              <>
                {typeof leftIcon === "string" ? <MemoInstagramSVG /> : leftIcon}
              </>
            )}
            <span className={style.Button}>{text}</span>
            {rightIcon && (
              <>
                {typeof rightIcon === "string" ? (
                  <DoubleArrow className={`${buttonClass}__svgRight`} />
                ) : (
                  rightIcon
                )}
              </>
            )}
          </span>
        </CustomLink>
      </div>
    </>
  );
};
CustomizeButton.displayName = "CustomizeButton";
export default CustomizeButton;
