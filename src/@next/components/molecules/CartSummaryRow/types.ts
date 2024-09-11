import {
  Checkout_lines_variant_product_weight,
  Checkout_lines_variant_product_metadata,
} from "@saleor/sdk/lib/fragments/gqlTypes/Checkout";
import { ICheckoutModelLineVariant } from "@saleor/sdk/lib/helpers";
import { IImage, ITaxedMoney } from "@types";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
  categorySlug: string | undefined;
  variant: ICheckoutModelLineVariant;
  weight: Checkout_lines_variant_product_weight | null | undefined;
  metadata: (Checkout_lines_variant_product_metadata | null)[] | undefined;
}
export interface IProps {
  index?: number;
  name: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
  categorySlug?: string;
  product: IProduct;
}
