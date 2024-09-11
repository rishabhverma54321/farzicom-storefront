import React from "react";
import ReactSVG from "react-svg";
import * as S from "./style";

export interface ITextWithIconProps {
  item: {
    text: string;
    path?: any;
    url?: string;
    title?: string;
  };
  isLink: boolean;
}

export const TextWithIcon: React.FC<ITextWithIconProps> = ({
  item,
  isLink,
}) => {
  const { path, text, title, url } = item;
  if (isLink)
    return (
      <>
        <a href={url} title={title}>
          <S.Div>
            {path && <ReactSVG path={path} />}
            <S.Text>{text}</S.Text>
          </S.Div>
        </a>
      </>
    );
  return (
    <>
      <S.Div>
        {path && <ReactSVG path={path} />}

        <S.Text>{text}</S.Text>
      </S.Div>
    </>
  );
};
TextWithIcon.displayName = "TextWithIcon";
export default TextWithIcon;
