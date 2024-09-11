import React from "react";

import { IconButton } from "@components/atoms/IconButton";

import * as S from "./styles";
import { IProps } from "./types";
import MemoClosebutton from "@components/atoms/SvgIcons/Closebutton";
import MemoBackButton from "@components/atoms/SvgIcons/BackButton";

export const CardHeader: React.FC<IProps> = ({
  children,
  customIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
  fixedposition
}: IProps) => {
  const withCloseIcon = !!onHide && !customIcon;

  return (
    <S.Header divider={divider} fixedposition={fixedposition}>
      { fixedposition && 
         <S.Backbutton>
            <div onClick={onHide}>
              <MemoBackButton />
            </div>
         </S.Backbutton>
      }
      {textStyle === "title" ? (
        <S.Title size={titleSize} fixedposition={fixedposition}>{children}</S.Title>
      ) : (
        <S.Paragraph>{children}</S.Paragraph>
      )}

      {withCloseIcon && !fixedposition && (
        <IconButton
          name="x"
          size={19}
          onClick={onHide}
          testingContext="closeOverlayButton"
        />
      )}
      {customIcon}
    </S.Header>
  );
};
