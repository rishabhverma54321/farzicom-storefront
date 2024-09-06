import { useCart } from "@saleor/sdk";

export const useCanAddToCart = (
  isAvailableForPurchase: boolean,
  variantId: string,
  variantStock: number,
  quantity: number
): boolean => {
  const { items } = useCart();

  const cartItem = items?.find(item => item.variant.id === variantId);
  const syncedQuantityWithCart = cartItem
    ? quantity + (cartItem?.quantity || 0)
    : quantity;

  //
  return (
    isAvailableForPurchase &&
    quantity > 0 &&
    !!variantId &&
    variantStock >= syncedQuantityWithCart
  );
};
