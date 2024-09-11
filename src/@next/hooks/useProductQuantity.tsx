import { useEffect, useState } from "react";
import { useCart } from "@saleor/sdk";

/**
 * Know a products quantity available in cart using its variant's ID
 */
export const useProductQuantity = (variantId: string): number => {
  const { items } = useCart();
  const [quantityFromCart, setQuantityFromCart] = useState(0);

  useEffect(() => {
    const cartItem = items?.find(item => item.variant.id === variantId);
    setQuantityFromCart(cartItem?.quantity || 0);
  }, [items, variantId]);

  return quantityFromCart;
};
