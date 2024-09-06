import React, { useContext } from "react";
import MyCustomLink from "@components/molecules/MyCustomLink";

import ReactSVG from "react-svg";
// import { FormattedMessage } from "react-intl";

// import CartIcon from "images/cart.svg";
// import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import { INewAddToCartButton } from "./NewAddToCartButton";

import * as S from "./style";

export type TGoToCartButton = Pick<
  INewAddToCartButton,
  "disabled" | "page" | "size" | "withIcons"
>;

export const GoToCartButton: React.FC<TGoToCartButton> = ({
  disabled,
  page,
  size,
  withIcons,
}) => {
  // const { show } = useContext(OverlayContext);

  return (
    <>
      <MyCustomLink disable={disabled} href="/cart">
        <S.ProductCardButton
          className="atc-button gtc"
          testingContext="goToCart"
          color="primary"
          size={size}
          page={page}
          onClick={() => {
            if (disabled) {
              // show(OverlayType.plixlifefcCart, OverlayTheme.right);
            }
          }}
        >
          <S.LeftSide>
            {/* {withIcons ? <ReactSVG path={CartIcon} /> : <></>} */}
            {/* <FormattedMessage defaultMessage="Added To Cart" /> */}
          </S.LeftSide>
        </S.ProductCardButton>
      </MyCustomLink>
    </>
  );
};

GoToCartButton.displayName = "GoToCartButton";
export default GoToCartButton;
