import { useCart } from "@saleor/sdk";

import { useAvailableQuantity } from "./useAvailableQuantity";
import { useCanAddToCart } from "./useCanAddToCart";
import { useProductPrice } from "./useProductPrice";
import { useGetItemDiscount } from "./useGetItemDiscount";
import { useGetWeight } from "./useGetWeight";

export const useStockHelpers = (product: any) => {
  const { items } = useCart();

  const {
    metadata,
    pricing: productPricingRange,
    isAvailableForPurchase,
    variants,
    weight,
  } = product;

  const listPriceArray =
    metadata && metadata.filter((item: any) => item.key === "listPrice");

  const listPrice =
    listPriceArray && listPriceArray.length > 0
      ? JSON.parse(listPriceArray[0].value)
      : null;

  const variantId = variants && variants.length && variants[0]?.id;
  const variantPricing = variants && variants.length && variants[0].pricing;
  const variantStock =
    variants && variants.length && variants[0].quantityAvailable;
  const quantity = 1;

  const availableQuantity = useAvailableQuantity(
    items,
    variantId,
    variantStock
  );
  const disableButton = !useCanAddToCart(
    isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );
  const productPrice = useProductPrice(
    productPricingRange,
    listPrice,
    variantPricing
  );

  const itemDiscount = useGetItemDiscount(
    productPricingRange,
    listPrice,
    variantPricing
  );

  const weightWithUnit = useGetWeight(metadata, weight);

  return {
    availableQuantity,
    disableButton,
    productPrice,
    itemDiscount,
    weightWithUnit,
  };
};
