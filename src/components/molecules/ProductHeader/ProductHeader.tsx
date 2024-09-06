import React, { useState } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import * as S from "./Styles";

export enum ButtonPostion {
  WITH_HEADER = "with_header",
  WITH_FILTERS = "with_filters",
}
export interface t {
  text: string;
  id: string;
}
export interface IProductHeaderProps {
  heading: string;
  title?: string;
  headingh2?:string,
  navbar?: {
    data: t[];
    navbarHandler: Function;
    initialLink?: string;
  };

  button?: {
    text: string;
    position: ButtonPostion;
    link?: string;
    leftIcon?: string | React.ReactNode;
    rightIcon?: string | React.ReactNode;
    onClick?:  () => void
  };
  headerClass: string;
}

export const ProductHeader: React.FC<IProductHeaderProps> = ({
  heading,
  headingh2,
  title,
  navbar,
  button,
  headerClass,
}) => {
  const [navlink, setnavlink] = useState(
    navbar && navbar.initialLink ? navbar.initialLink : "ALL"
  );

  return (
    <>
      <S.Wrapper className={headerClass}>
        <S.Row1 className={`${headerClass}__row1`}>
          <S.Row1Left className={`${headerClass}__left`}>
            {title && <S.Title>{title}</S.Title>}
            {headingh2 ?
            <S.Headingh2 className={`${headerClass}__headingh2`}>{headingh2}</S.Headingh2> :
            <></>
            }
            {heading ? 
            <S.Heading className={`${headerClass}__heading`}>
              {heading}
            </S.Heading>:
            <></>
            }
          </S.Row1Left>
          {button !== undefined &&
            button.position === ButtonPostion.WITH_HEADER && (
              <CustomizeButton
                text={button.text}
                leftIcon={button.leftIcon}
                rightIcon={button.rightIcon}
                link={button.link ? button.link : "/"}
                buttonClass={`${headerClass}__right__button`}
                handleClick={button?.onClick}
              />
            )}
        </S.Row1>

        {navbar && (
          <S.Right className={`${headerClass}__right`}>
            {navbar && (
              <S.FilterContainer className={`${headerClass}__right__filter`}>
                {navbar.data?.map((item, index) => {
                  return (
                    <S.Filter
                      className={`${headerClass}___right__filter__child ${
                        navlink === item.text ? "active" : ""
                      }`}
                      onClick={() => {
                        setnavlink(item.text);
                        navbar.navbarHandler(item.id, item.text);
                      }}
                      key={index}
                    >
                      {item.text}
                    </S.Filter>
                  );
                })}
              </S.FilterContainer>
            )}

            {button !== undefined &&
              button.position === ButtonPostion.WITH_FILTERS && (
                <CustomizeButton
                  text={button.text}
                  leftIcon={button.leftIcon}
                  rightIcon={button.rightIcon}
                  link={button.link ? button.link : "/"}
                  buttonClass={`${headerClass}__right__button`}
                />
              )}
          </S.Right>
        )}
      </S.Wrapper>
    </>
  );
};
ProductHeader.displayName = "ProductHeader";
export default ProductHeader;
