import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import ReactSVG from "react-svg";
import { FormattedMessage } from "react-intl";

import CartIcon from "images/cart.svg";
import { IAddToCartButton } from "./AddToCartButton";

import * as S from "./style";

export type TGoToCartButton = Pick<
  IAddToCartButton,
  "disabled" | "page" | "size" | "withIcons"
>;

export const GoToCartButton: React.FC<TGoToCartButton> = ({
  disabled,
  page,
  size,
  withIcons,
}) => {
  return (
    <>
      <MyCustomLink href="/cart" style={{ width: "100%" }}>
        <S.ProductCardButton
          className="atc-button gtc"
          testingContext="goToCart"
          color="primary"
          size={size}
          page={page}
        >
          <S.LeftSide>
            {withIcons ? <ReactSVG path={CartIcon} /> : <></>}
            <FormattedMessage defaultMessage="Go To Cart" />
          </S.LeftSide>
        </S.ProductCardButton>
      </MyCustomLink>
    </>
  );
};

GoToCartButton.displayName = "GoToCartButton";
export default GoToCartButton;
