import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
// import ReactSVG from "react-svg";
import cx from "classnames";
import { GTCArrow } from "@components/atoms/SvgIcons";
import CartIcon from "images/cart.svg";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import ReactSVG from "react-svg";
import GoToCartButton from "./GoToCartButton";
import * as S from "./style";

export interface IAddToCartButton {
  disabled: boolean;
  onSubmit: (disabled?: boolean) => void;
  itemAdded: boolean;
  size: "sm" | "md" | "none";
  page: string;
  loading: boolean;
  withIcons?: Boolean;
  productId?: string;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  onSubmit,
  disabled,
  itemAdded,
  size,
  page,
  loading,
  withIcons,
  productId,
}) => {
  const { show } = useContext(OverlayContext);
  const handleClick = () => {
    if (disabled) {
      onSubmit(disabled);
      if (productId) {
        const notifyMeContext: InnerOverlayContextInterface = {
          data: productId,
        };
        show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
      }
    } else {
      onSubmit();
    }
  };

  return (
    <>
      {itemAdded ? (
        <GoToCartButton
          disabled={disabled}
          page={page}
          size={size}
          withIcons={withIcons}
        />
      ) : (
        <S.ProductCardButton
          className="atc-button"
          testingContext="addProductToCartButton"
          onClick={() => {
            if (!loading) handleClick();
          }}
          color="primary"
          disabled={false}
          size={size}
          page={page}
          // startIcon={CartIcon}
          fullWidth
          // endIcon={CartIcon}
        >
          <S.LeftSide className={cx({ disabled, loading })}>
            {!disabled && !loading && withIcons ? (
              <ReactSVG path={CartIcon} />
            ) : (
              <></>
            )}
            {disabled && !itemAdded && !loading ? (
              <FormattedMessage defaultMessage="Notify Me" />
            ) : (
              <>
                {loading ? (
                  <FormattedMessage defaultMessage="Adding..." />
                ) : (
                  <>
                    <FormattedMessage defaultMessage="Add to Cart" />
                  </>
                )}{" "}
              </>
            )}
          </S.LeftSide>
          <S.RightSide>
            {!disabled && !loading && withIcons ? <GTCArrow /> : <></>}
          </S.RightSide>
        </S.ProductCardButton>
      )}
    </>
  );
};

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
