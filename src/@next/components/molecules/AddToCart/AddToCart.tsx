import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import React from "react";
// import makeClevertap from "Themes/lib/makeClevertap.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { dummyAddress } from "../../templates/Cart/Cart";
import { useStockHelpers } from "../../../hooks/useStockHelpers";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useItemInCart } from "../../../hooks/useItemInCart";

export interface IAddToCartProps {
  product: any;
  refetch: any;
}

export const AddToCart: React.FC<IAddToCartProps> = ({ product, refetch }) => {
  const [loading, setLoading] = React.useState(false);

  const { addItem } = useCart();
  const { disableButton } = useStockHelpers(product);

  const { variants, id } = product;
  const variantId = variants[0].id;
  const variantPricing = variants && variants[0]?.pricing;
  const discountedPrice = variantPricing && variantPricing.price.gross.amount;

  const clevertap = makeClevertap();

  const { user } = useAuthState();
  const quantity = 1;
  const { setShippingAddress, setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();

  const productClick = () => {
    if (gtmConfig.bannerClicks.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.bannerClicks.value,
        ecommerce: {
          click: {
            products: [
              {
                name: product.name,
                price: discountedPrice,
              },
            ],
          },
        },
      });
    }
    if (clevertapEvents.productClick.enable) {
      clevertap.event.push(clevertapEvents.productClick.value, {
        products: [
          {
            name: product.name,
            price: discountedPrice,
          },
        ],
      });
    }
  };
  const handleAddToCart = async () => {
    // setLoading(true);
    //
    try {
      addItem(variantId, quantity).then(res => {
        //
        if (res.error) {
          setLoading(false);
        }
        if (res.data) {
          setLoading(false);

          const isItemAdded =
            res.data.lines.filter(
              (line: { variant: { id: string } }) =>
                line.variant.id === variantId
            ).length > 0;
          //
          if (!isItemAdded && refetch) {
            //

            refetch();
          } else if (!checkout?.shippingAddress) {
            createCheckout();
          }
        }
      });
      // show(OverlayType.message, OverlayTheme.modal, messageContext);
      if (checkout?.id === undefined) {
        await createCheckout();
      }
    } catch (e) {}
  };

  const createCheckout = async () => {
    if (user && user.defaultShippingAddress) {
      const { dataError } = await setShippingAddress(
        user.defaultShippingAddress,
        user.email
      );
      const error = dataError?.error;
      if (error) {
        // alert("error in cart setting dummy shipping address");
      }
    } else {
      const { dataError } = await setShippingAddress(
        dummyAddress,
        "dummy@dummy.com"
      );
      const error = dataError?.error;
      if (error) {
        // alert("error in cart setting dummy shipping address");
      }
    }

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);
  };

  const itemAdded = useItemInCart(id);

  return (
    <AddToCartButton
      onSubmit={async disabled => {
        if (disabled && refetch) {
          refetch();
        } else {
          setLoading(true);
          productClick();
          handleAddToCart();
        }
      }}
      loading={loading}
      disabled={disableButton}
      itemAdded={itemAdded}
      size="sm"
      page=""
      productId={id}
    />
  );
};
AddToCart.displayName = "AddToCart";
export default AddToCart;
