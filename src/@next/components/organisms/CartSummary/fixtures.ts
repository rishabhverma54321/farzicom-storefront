import { IProduct } from "@types";
import productImage from "./productImage.png";

const money = {
  gross: {
    amount: 123,
    currency: "INR",
  },
  net: {
    amount: 100,
    currency: "INR",
  },
};

const product: IProduct = {
  id: "abc123",
  name: "The Great Square Table",
  price: money,
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "product image",
    url: productImage,
  },
  categorySlug: "free-gift-products-2",
  weight: 50,
  metadata: [],
};

export const DEFAULT_PROPS = {
  products: [product, product, product],
  totalPrice: money,
  subtotalPrice: money,
  shippingTaxedPrice: money,
  couponDiscount: money,
  mrp: money,
  netPrice: money,
  itemDiscount: money,
  offerDiscount: money,
  prepaidDiscount: money,
  cashbackDiscount: money,
  cashbackRecieveTaxedPrice: money,
};

/*
  totalPrice,
  subtotalPrice,
  shippingTaxedPrice,
  couponDiscount,
  mrp,
  netPrice,
  itemDiscount,
  offerDiscount,
  prepaidDiscount,
  cashbackDiscount,
  cashbackRecieveTaxedPrice,
  products,
*/
