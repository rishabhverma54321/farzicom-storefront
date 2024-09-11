import { useCart } from "@saleor/sdk";
import { CLIENT } from "Themes/config";
import React, { useContext, useState } from "react";
// import { Button } from "@components/atoms/Button";
import { FormattedMessage } from "react-intl";
// import MyCustomLink from "@components/next-react/MyCustomLink";
import { ProductCardButton } from "../NewAddToCartButton/style";
import { clients } from "gqlTypes/customGlobalTypes";
import {
  OverlayContext,
  InnerOverlayContextInterface,
  OverlayType,
  OverlayTheme,
} from "@temp/components";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { addToCartDataLayer } from "@utils/misc";

export interface IBuyNowButtonProps {
  disabled: boolean;
  onSubmit: (disabled?: boolean) => void;
  itemAdded: boolean;
  size: "sm" | "md" | "none";
  page: string;
  variantId: string;
  product: any;
  productId?: string;
}

export const BuyNowButton: React.FC<IBuyNowButtonProps> = ({
  onSubmit,
  disabled,
  itemAdded,
  size,
  page,
  variantId,
  product,
  productId,
}) => {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);
  const history = useCustomHistory();
  const handleAddToCart = async () => {
    if (
      CLIENT == clients.WOW_HEALTH_NEW ||
      CLIENT === clients.WOWFC_NEW ||
      CLIENT === clients.BUY_WOW
    ) {
      // show(OverlayType.lotusCart, OverlayTheme.right);
    } else {
      // show(OverlayType.plixlifefcCart, OverlayTheme.right);
    }

    setLoading(true);
    //
    try {
      addItem(variantId, 1).then(res => {
        onSubmit();
        setLoading(false);
        addToCartDataLayer(res, product, variantId);
        history.push("/checkout/address");
      });
    } catch (e) {}
  };

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
      handleAddToCart();
    }
  };

  return (
    <>
      {/* <MyCustomLink 
        to="/checkout/address"
        style={{
          width: "100%",
        }}
      > */}
      <ProductCardButton
        testingContext="addProductToCartButton"
        onClick={() => {
          if (!loading) handleClick();
        }}
        color="secondary"
        disabled={disabled}
        size={size}
        page=""
        fullWidth
      >
        {loading ? (
          <FormattedMessage defaultMessage="Adding..." />
        ) : (
          <FormattedMessage defaultMessage="Buy Now" />
        )}
      </ProductCardButton>
      {/* </MyCustomLink> */}
    </>
  );
};
BuyNowButton.displayName = "BuyNowButton";
export default BuyNowButton;
