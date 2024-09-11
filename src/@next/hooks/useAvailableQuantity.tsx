import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";

export const useAvailableQuantity = (
  items: ICheckoutModelLine[] | null | undefined,
  variantId: string,
  variantStock: number
): number => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const quantityInCart = cartItem?.quantity || 0;
  return variantStock - quantityInCart;
};
