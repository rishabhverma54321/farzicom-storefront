import React, { useState } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import * as S from "./Styles";
import style from "./scss/index.module.scss";

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
  headingh2?: string;
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
    onClick?: () => void;
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
      <section className={`${headerClass} ${style.Wrapper}`}>
        <div className={`${headerClass}__row1 ${style.Row1}`}>
          <div className={`${headerClass}__left ${style.Row1Left}`}>
            {title && <S.Title>{title}</S.Title>}
            {headingh2 ? (
              <S.Headingh2
                className={`${headerClass}__headingh2 ${style.Headingh2}`}
              >
                {headingh2}
              </S.Headingh2>
            ) : (
              <></>
            )}
            {heading ? (
              <S.Heading className={`${headerClass}__heading ${style.Heading}`}>
                {heading}
              </S.Heading>
            ) : (
              <></>
            )}
          </div>
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
        </div>

        {navbar && (
          <div className={`${headerClass}__right ${style.Right}`}>
            {navbar && (
              <div
                className={`${headerClass}__right__filter ${style.FilterContainer}`}
              >
                {navbar.data?.map((item, index) => {
                  return (
                    <span
                      className={`${headerClass}___right__filter__child ${
                        navlink === item.text ? "active" : ""
                      } ${style.Filter}`}
                      onClick={() => {
                        setnavlink(item.text);
                        navbar.navbarHandler(item.id, item.text);
                      }}
                      key={index}
                    >
                      {item.text}
                    </span>
                  );
                })}
              </div>
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
          </div>
        )}
      </section>
    </>
  );
};
ProductHeader.displayName = "ProductHeader";
export default ProductHeader;
