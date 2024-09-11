import { Checkout_lines_variant_product_metadata } from "@saleor/sdk/lib/fragments/gqlTypes/Checkout";
import { IImage } from "@types";
import React from "react";

export interface IProps {
  /**
   * Item index
   */
  index?: number;
  /**
   * Id of the product
   */
  id: string;
  /**
   * Price for single unit
   */
  unitPrice: React.ReactNode;
  /**
   * Price of single unit mupltiplied by quantity
   */
  totalPrice?: React.ReactNode;
  /**
   * Name of the product
   */
  name: string;
  /**
   * slug of the product
   */
  slug: string;
  /**
   * Stock keeping unit
   */
  sku?: string;
  /**
   * Quantity of particular item
   */
  quantity: number;
  /**
   * Maximum possible quantity of particular item
   */
  maxQuantity: number;
  /**
   * Method run when removing item from cart
   */
  onRemove?: () => void;
  /**
   * Method run while chaning product quantity
   */
  onQuantityChange?: (value: number, prevValue: number) => void;
  /**
   * Product thumbnail image
   */
  thumbnail?: IImage;
  /**
   * Variant attributes
   */
  attributes?: Array<{
    attribute: { id: string; name: string };
    values: Array<{ name: string }>;
  }>;

  categorySlug: string;

  weightValue: number | undefined;

  metadata: (Checkout_lines_variant_product_metadata | null)[] | undefined;

  variant: any;
  quantityAndRemove?: boolean;
  showMore?: number;
  handleShowMore?: (show: boolean) => void;
  showVariantListPrice?: boolean;
}
