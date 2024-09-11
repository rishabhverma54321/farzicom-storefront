import {
  ProductDetails_product_variants_pricing,
  ProductDetails_product_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { ProductsList_collections_edges_node_products_edges_node_pricing } from "../../themes/lotus/views/Home/gqlTypes/ProductsList";

export const useGetItemDiscount = (
  productPricingRange:
    | ProductDetails_product_pricing
    | ProductsList_collections_edges_node_products_edges_node_pricing,
  listPrice: number,
  variantPricing?: ProductDetails_product_variants_pricing | null,
  asNumber?: Boolean
): string | Number | null => {
  if (listPrice && variantPricing) {
    const itemDiscount = Math.round(
      ((listPrice - variantPricing?.price?.gross.amount!) / listPrice) * 100
    );
    if (itemDiscount === 0) return null;
    return asNumber ? itemDiscount : `(${itemDiscount})% Off`;
  }
  const itemDiscount = Math.round(
    ((variantPricing?.priceUndiscounted?.gross.amount! -
      variantPricing?.price?.gross.amount!) /
      variantPricing?.priceUndiscounted?.gross.amount!) *
      100
  );

  if (itemDiscount === 0) return null;
  return asNumber ? itemDiscount : `(${itemDiscount})% Off`;
};

export const getItemDiscount: (
  variantPricing: ProductDetails_product_variants_pricing
) => Number | null = variantPricing => {
  const itemDiscount = Math.round(
    ((variantPricing?.priceUndiscounted?.gross.amount! -
      variantPricing?.price?.gross.amount!) /
      variantPricing?.priceUndiscounted?.gross.amount!) *
      100
  );

  if (itemDiscount === 0) return null;
  return itemDiscount;
};
