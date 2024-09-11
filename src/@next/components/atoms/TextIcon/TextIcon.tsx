import React, { ReactNode } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./style";

export interface ITextIconProps {
  text: ReactNode;
  icon?: ReactNode;
  ClassName?: string;
  textColor?: string;
  link?: string;
}

export const TextIcon: React.FC<ITextIconProps> = ({
  text,
  textColor,
  icon,
  ClassName,
  link,
}) => {
  return (
    <MyCustomLink href={link || "#"}>
      <S.Container className={`${ClassName}`}>
        <S.Text textColor={textColor}>{text}</S.Text>
        {icon}
      </S.Container>
    </MyCustomLink>
  );
};
TextIcon.displayName = "TextIcon";
export default TextIcon;
