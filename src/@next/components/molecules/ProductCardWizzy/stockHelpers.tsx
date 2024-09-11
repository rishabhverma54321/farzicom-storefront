import * as React from "react";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
// import {
//   ProductDetails_product_variants_pricing,
//   ProductDetails_product_pricing,
// } from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
// import isEqual from "lodash/isEqual";
import { getMetadataValue } from "@utils/misc";
import { TaxedMoney } from "../../containers/TaxedMoney";

import * as S from "./style";

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

export const getThisVariantPrice = (variant: any, showDiscount: boolean) => {
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
    : variant?.pricing?.priceUndiscounted;
  const totalDiscount = Math.ceil(
    ((undiscountedPrice.gross.amount - discountedPrice.gross.amount) * 100) /
      undiscountedPrice.gross.amount
  );
  return (
    <div>
      {totalDiscount > 0 ? (
        <S.PriceContainer>
          <S.UndiscountedPrice>
            <span>
              &#x20B9;{undiscountedPrice.gross.amount.toLocaleString()}
            </span>
          </S.UndiscountedPrice>
          <S.DiscountedPrice>
            <span>&#x20B9;{discountedPrice.gross.amount.toLocaleString()}</span>
          </S.DiscountedPrice>
        </S.PriceContainer>
      ) : (
        <S.PriceContainer>
          <S.DiscountedPrice>
            <span>&#x20B9;{discountedPrice.gross.amount.toLocaleString()}</span>
          </S.DiscountedPrice>
        </S.PriceContainer>
      )}
      {showDiscount && totalDiscount > 0 && (
        <S.Discounted>
          <button>{totalDiscount}% OFF</button>
        </S.Discounted>
      )}
    </div>
  );
};
