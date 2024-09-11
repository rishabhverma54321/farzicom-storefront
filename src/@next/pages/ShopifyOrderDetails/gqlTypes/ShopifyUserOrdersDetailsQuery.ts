/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ShopifyUserOrdersDetailsQuery
// ====================================================

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_discount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal_net;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice_net;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total_net;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  status: OrderStatus;
  trackingClientId: string;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string | null;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean | null;
  discountName: string | null;
  discount: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_discount | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_metadata | null)[];
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_subtotal | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_shippingPrice | null;
  /**
   * Total amount of the order.
   */
  total: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order_total | null;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice_net;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice_net;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_variant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  sortOrder: number | null;
  alt: string;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_variant_images | null)[] | null;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  variantName: string;
  productName: string;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_unitPrice | null;
  /**
   * Price of the order line.
   */
  totalPrice: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_totalPrice | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines_variant | null;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  countryArea: string;
  postalCode: string;
  phone: string | null;
  /**
   * Shop's default country.
   */
  country: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_shippingAddress_country;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders_billingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  countryArea: string;
  postalCode: string;
  phone: string | null;
  /**
   * Shop's default country.
   */
  country: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_billingAddress_country;
}

export interface ShopifyUserOrdersDetailsQuery_shopifyUserOrders {
  __typename: "ShopifyOrderType";
  /**
   * shopify order id
   */
  id: string;
  /**
   * Order
   */
  order: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order | null;
  /**
   * List of order lines.
   */
  lines: (ShopifyUserOrdersDetailsQuery_shopifyUserOrders_lines | null)[] | null;
  /**
   * Shipping Address of the Order
   */
  shippingAddress: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_shippingAddress | null;
  /**
   * Billing Address of the Order
   */
  billingAddress: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_billingAddress | null;
}

export interface ShopifyUserOrdersDetailsQuery {
  shopifyUserOrders: (ShopifyUserOrdersDetailsQuery_shopifyUserOrders | null)[] | null;
}

export interface ShopifyUserOrdersDetailsQueryVariables {
  userId?: string | null;
  orderId?: string | null;
}
