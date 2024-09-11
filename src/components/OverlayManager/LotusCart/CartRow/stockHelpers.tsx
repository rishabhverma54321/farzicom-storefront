import * as React from "react";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";

import { getMetadataValue } from "@utils/misc";
// import { TaxedMoney } from "../../../../@next/components/containers";

import * as S from "./styles";
import { TaxedMoney } from "@components/containers/TaxedMoney";

/**
 * Renders formatted price for chosen variant or product.
 * Price ranges and discounts are additionally formatted available.
 */
// export const getProductPrice = (
//   productPricingRange: ProductDetails_product_pricing,
//   variantPricing?: ProductDetails_product_variants_pricing | null
// ) => {
//   if (variantPricing) {
//     if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
//       return <TaxedMoney taxedMoney={variantPricing.price} />;
//     }
//     return (
//       <>
//         <S.UndiscountedPrice>
//           <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
//         </S.UndiscountedPrice>
//         &nbsp;&nbsp;&nbsp;&nbsp;
//         <TaxedMoney taxedMoney={variantPricing.price} />
//       </>
//     );
//   }

//   if (!productPricingRange.priceRange) {
//     return <></>;
//   }

//   const { start, stop } = productPricingRange.priceRange;
//   if (isEqual(start, stop)) {
//     return <TaxedMoney taxedMoney={start} />;
//   }
//   return (
//     <>
//       <TaxedMoney taxedMoney={start} /> - <TaxedMoney taxedMoney={stop} />
//     </>
//   );
// };

export const canAddToCart = (
  items: ICheckoutModelLine[],
  isAvailableForPurchase: boolean,
  variantId: string,
  variantStock: number,
  quantity: number
): boolean => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const syncedQuantityWithCart = cartItem
    ? quantity + (cartItem?.quantity || 0)
    : quantity;
  return (
    isAvailableForPurchase &&
    quantity > 0 &&
    !!variantId &&
    variantStock >= syncedQuantityWithCart
  );
};

/**
 * Returns how many items you can add to the cart. Takes in account quantity already in cart.
 */
export const getAvailableQuantity = (
  items: ICheckoutModelLine[],
  variantId: string,
  variantStock: number
): number => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const quantityInCart = cartItem?.quantity || 0;
  return variantStock - quantityInCart;
};

export const getThisVariantPrice = (variant: any) => {
  const discountedPrice = variant && variant?.pricing?.price;

  const variantMetadata = variant && variant?.metadata;

  const discountedListPrice =
    variantMetadata &&
    variantMetadata.length &&
    getMetadataValue(variantMetadata, "listPrice");

  const undiscountedPrice = discountedListPrice
    ? {
        gross: { amount: parseFloat(discountedListPrice), currency: "INR" },
        net: { amount: parseFloat(discountedListPrice), currency: "INR" },
      }
    : variant.pricing.priceUndiscounted;

  if (undiscountedPrice?.gross?.amount === discountedPrice?.gross?.amount) {
    return (
      <S.PriceContainer>
        <S.DiscountedPrice>
          <TaxedMoney taxedMoney={discountedPrice} />
        </S.DiscountedPrice>
      </S.PriceContainer>
    );
  }

  return (
    <S.PriceContainer>
      <S.DiscountedPrice>
        <TaxedMoney taxedMoney={discountedPrice} />
      </S.DiscountedPrice>
      <S.UndiscountedPrice>
        <TaxedMoney taxedMoney={undiscountedPrice} />
      </S.UndiscountedPrice>
    </S.PriceContainer>
  );
};
