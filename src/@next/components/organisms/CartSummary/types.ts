import {
  Checkout_lines_variant_product_weight,
  Checkout_lines_variant_product_metadata,
} from "@saleor/sdk/lib/fragments/gqlTypes/Checkout";
import { ICheckoutModelLineVariant } from "@saleor/sdk/lib/helpers";
import { IImage, ITaxedMoney } from "@types";

export interface ICostLine {
  name: string;
  cost: ITaxedMoney;
  last?: boolean;
  negative?: boolean;
  className?: string;
}

export interface ICosts {
  totalPrice?: ITaxedMoney | null;
  shippingTaxedPrice?: ITaxedMoney | null;
  couponDiscount?: ITaxedMoney | null;
  subtotalPrice?: ITaxedMoney | null;
  mrp?: ITaxedMoney | null;
  netPrice?: ITaxedMoney | null;
  itemDiscount?: ITaxedMoney | null;
  offerDiscount?: ITaxedMoney | null;
  prepaidDiscount?: ITaxedMoney | null;
  cashbackDiscount?: ITaxedMoney | null;
  cashbackRecieveTaxedPrice?: ITaxedMoney | null;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
  categorySlug: string | undefined;
  variant: ICheckoutModelLineVariant;
  weight: Checkout_lines_variant_product_weight | null | undefined;
  metadata: (Checkout_lines_variant_product_metadata | null)[] | undefined;
}

export interface IProps extends ICosts {
  products?: IProduct[];
  handleCashbackClick?: () => Promise<void>;
  useCashback?: boolean;
  showPrepaidOffer?: boolean;
}
