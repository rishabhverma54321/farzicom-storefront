import * as React from "react";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import { getMetadataValue } from "@utils/misc";
import { TaxedMoney } from "../../containers/TaxedMoney";

import * as S from "./styles";

/**
 * Renders formatted price for chosen variant or product.
 * Price ranges and discounts are additionally formatted available.
 */

// export const getDiscount = (
//   productPricingRange: ProductDetails_product_pricing,
//   variantPricing?: ProductDetails_product_variants_pricing | null,
//   listPrice?: number | null
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

export const getThisVariantDiscount = (variant: any, fontSize?: string) => {
  if (!variant) {
    return <></>;
  }
  const discountedPrice = variant.pricing.price;

  const variantMetadata = variant.metadata;

  const discountedListPrice =
    variantMetadata &&
    variantMetadata.length &&
    getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

  const undiscountedPrice = discountedListPrice
    ? {
        gross: { amount: parseFloat(discountedListPrice), currency: "INR" },
        net: { amount: parseFloat(discountedListPrice), currency: "INR" },
      }
    : variant.pricing.priceUndiscounted;

  const discount =
    undiscountedPrice.gross.amount - discountedPrice.gross.amount;
  const discountPrice = {
    gross: { amount: discount, currency: "INR" },
    net: { amount: discount, currency: "INR" },
  };
  return (
    <S.PriceContainer>
      <S.DiscountedPrice fontSize={fontSize}>
        <TaxedMoney taxedMoney={discountPrice} />
      </S.DiscountedPrice>
    </S.PriceContainer>
  );
};

export const discountExists = (variant: any) => {
  if (!variant) {
    return <></>;
  }
  const discountedPrice = variant.pricing.price;

  const variantMetadata = variant.metadata;

  const discountedListPrice =
    variantMetadata &&
    variantMetadata.length &&
    getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

  const undiscountedPrice = discountedListPrice
    ? {
        gross: { amount: parseFloat(discountedListPrice), currency: "INR" },
        net: { amount: parseFloat(discountedListPrice), currency: "INR" },
      }
    : variant.pricing.priceUndiscounted;

  if (undiscountedPrice?.gross?.amount === discountedPrice?.gross?.amount) {
    return false;
  }

  return true;
};

export const getThisVariantPrice = (variant: any) => {
  if (!variant) {
    return <></>;
  }
  const discountedPrice = variant.pricing.price;

  const variantMetadata = variant.metadata;

  const discountedListPrice =
    variantMetadata &&
    variantMetadata.length &&
    getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

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
      <S.UndiscountedPrice>
        <TaxedMoney hideFraction taxedMoney={undiscountedPrice} />
      </S.UndiscountedPrice>
      <S.DiscountedPrice>
        <TaxedMoney hideFraction taxedMoney={discountedPrice} />
      </S.DiscountedPrice>
    </S.PriceContainer>
  );
};

export const canAddToCartPlix = (
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

  //
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
export const getAvailableQuantityPlix = (
  items: ICheckoutModelLine[],
  variantId: string,
  variantStock: number
): number => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const quantityInCart = cartItem?.quantity || 0;
  return variantStock - quantityInCart;
};
