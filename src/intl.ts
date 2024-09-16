import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  search: {
    id: "commonMessages.search",
    defaultMessage: "search",
  },
  membership: {
    id: "commonMessages.membership",
    defaultMessage: "Plix Club Member",
  },
  outOfStock: {
    id: "commonMessages.outOfStock",
    defaultMessage: "Out of stock",
  },
  lowStock: {
    id: "commonMessages.lowStock",
    defaultMessage: "Low stock",
  },
  noItemsAvailable: {
    id: "commonMessages.noItemsAvailable",
    defaultMessage: "No items available",
  },
  noPurchaseAvailable: {
    id: "commonMessages.noPurchaseAvailable",
    defaultMessage: "Not available for purchase",
  },
  purchaseAvailableOn: {
    id: "commonMessages.purchaseAvailableOn",
    defaultMessage: `Will become available for purchase on {date} at {time}`,
  },
  youMightLike: {
    id: "commonMessages.youMightLike",
    defaultMessage: "You might like",
  },
  choosePaymentMethod: {
    id: "commonMessages.choosePaymentMethod",
    defaultMessage: "Please choose payment method.",
  },
  provideEmailAddress: {
    id: "commonMessages.provideEmailAddress",
    defaultMessage: "Please provide email address.",
  },
  account: {
    id: "commonMessages.account",
    defaultMessage: "Account",
  },
  wallet: {
    id: "commonMessages.wallet",
    defaultMessage: "Wallet",
  },
  myAccount: {
    id: "commonMessages.myAccount",
    defaultMessage: "My Account",
  },
  orderHistory: {
    id: "commonMessages.orderHistory",
    defaultMessage: "Order history",
  },
  addressBook: {
    id: "commonMessages.addressBook",
    defaultMessage: "Address book",
  },
  logOut: {
    id: "commonMessages.logOut",
    defaultMessage: "Log Out",
  },
  firstName: {
    id: "commonMessages.firstName",
    defaultMessage: "First Name",
  },
  lastName: {
    id: "commonMessages.lastName",
    defaultMessage: "Last Name",
  },
  password: {
    id: "commonMessages.password",
    defaultMessage: "Password",
  },
  quantity: {
    id: "commonMessages.quantity",
    defaultMessage: "Quantity",
  },
  sku: {
    id: "commonMessages.sku",
    defaultMessage: "SKU",
  },
  maxQtyIs: {
    id: "commonMessages.maxQtyIs",
    defaultMessage: "Maximum quantity is {maxQuantity}",
  },
  qty: {
    id: "commonMessages.qty",
    defaultMessage: "Quantity",
  },
  subtotal: {
    id: "commonMessages.subtotal",
    defaultMessage: "Subtotal",
  },
  shipping: {
    id: "commonMessages.shipping",
    defaultMessage: "Shipping",
  },
  promoCode: {
    id: "commonMessages.promoCode",
    defaultMessage: "Promo code",
  },
  total: {
    id: "commonMessages.total",
    defaultMessage: "Total",
  },
  grandTotal: {
    id: "commonMessages.grandTotal",
    defaultMessage: "Grand Total",
  },
  totalPrice: {
    id: "commonMessages.totalPrice",
    defaultMessage: "Total Price",
  },
  checkout: {
    id: "commonMessages.checkout",
    defaultMessage: "Checkout",
  },
  eMail: {
    id: "commonMessages.eMail",
    defaultMessage: "Email Address",
  },
  shortEmail: {
    id: "commonMessages.shortEmail",
    defaultMessage: "Email",
  },
  loading: {
    id: "commonMessages.loading",
    defaultMessage: "Loading",
  },
  products: {
    id: "commonMessages.products",
    defaultMessage: "Products",
  },
  price: {
    id: "commonMessages.price",
    defaultMessage: "Price",
  },
  variant: {
    id: "commonMessages.variant",
    defaultMessage: "Variant",
  },
  phone: {
    id: "commonMessages.phone",
    defaultMessage: "Phone",
  },
  phoneNumber: {
    id: "commonMessages.phoneNumber",
    defaultMessage: "Phone number: {phone}",
  },
  showEmail: {
    id: "commonMessages.showEmail",
    defaultMessage: "Email: {email}",
  },
  save: {
    id: "commonMessages.save",
    defaultMessage: "Save",
  },
  add: {
    id: "commonMessages.add",
    defaultMessage: "Add",
  },
  filterHeader: {
    id: "commonMessages.filterHeader",
    defaultMessage: "FILTERS",
  },
  clearFilterHeader: {
    id: "commonMessages.clearFilterHeader",
    defaultMessage: "CLEAR FILTERS",
  },
  status: {
    id: "commonMessages.status",
    defaultMessage: "Status",
  },
  cancel: {
    id: "commonMessages.cancel",
    defaultMessage: "Cancel",
  },
  home: {
    id: "commonMessages.home",
    defaultMessage: "Home",
  },
  wishlist: {
    id: "commonMessages.wishlist",
    defaultMessage: "Wishlist",
  },
  login: {
    id: "commonMessages.login",
    defaultMessage: "Login",
  },
  cashback: {
    id: "commonMessages.cashback",
    defaultMessage: "Plix Wallet Balance",
  },
  subscriptions: {
    id: "commonMessages.subscriptions",
    defaultMessage: "Subscriptions",
  },
});

export const checkoutMessages = defineMessages({
  stepNameAddress: {
    id: "checkoutMessages.stepNameAddress",
    defaultMessage: "Address",
  },
  stepNameShipping: {
    id: "checkoutMessages.stepNameShipping",
    defaultMessage: "Shipping",
  },
  stepNamePayment: {
    id: "checkoutMessages.stepNamePayment",
    defaultMessage: "Payment",
  },
  stepNameReview: {
    id: "checkoutMessages.stepNameReview",
    defaultMessage: "Review",
  },
  addressNextActionName: {
    id: "checkoutMessages.addressNextActionName",
    defaultMessage: "Continue to Shipping",
  },
  shippingNextActionName: {
    id: "checkoutMessages.shippingNextActionName",
    defaultMessage: "Continue to Payment",
  },
  paymentNextActionName: {
    id: "checkoutMessages.paymentNextActionName",
    defaultMessage: "Continue to Review",
  },
  reviewNextActionName: {
    id: "checkoutMessages.reviewNextActionName",
    defaultMessage: "Place order",
  },
  addNewAddress: {
    id: "checkoutMessages.addNewAddress",
    defaultMessage: "Add new address",
  },
  shippingMethod: {
    id: "checkoutMessages.shippingMethod",
    defaultMessage: "SHIPPING METHOD",
  },
  billingAddress: {
    id: "checkoutMessages.billingAddress",
    defaultMessage: "BILLING ADDRESS",
  },
  paymentMethod: {
    id: "checkoutMessages.paymentMethod",
    defaultMessage: "PAYMENT METHOD",
  },
  reviewOrder: {
    id: "checkoutMessages.reviewOrder",
    defaultMessage: "REVIEW ORDER",
  },
  viewOrder: {
    id: "checkoutMessages.viewOrder",
    defaultMessage: "VIEW ORDER",
  },
  shippingAddress: {
    id: "checkoutMessages.shippingAddress",
    defaultMessage: "Shipping Address",
  },
  continueShopping: {
    id: "checkoutMessages.continueShopping",
    defaultMessage: "CONTINUE SHOPPING",
  },
  continueShoppingCapitalize: {
    id: "checkoutMessages.continueShoppingCapitalize",
    defaultMessage: "Continue Shopping",
  },
  mrp: {
    id: "checkoutMessages.mrp",
    defaultMessage: "MRP:",
  },
});

export const prodListHeaderCommonMsg = defineMessages({
  sortOptionsClear: {
    id: "prodListHeaderCommonMsg.sortOptionsClear",
    defaultMessage: "Clear...",
  },
  sortOptionsPrice: {
    id: "prodListHeaderCommonMsg.sortOptionsPrice",
    defaultMessage: "Price Low-High",
  },
  sortOptionsPriceDsc: {
    id: "prodListHeaderCommonMsg.sortOptionsPriceDsc",
    defaultMessage: "Price High-Low",
  },
  sortOptionsName: {
    id: "prodListHeaderCommonMsg.sortOptionsName",
    defaultMessage: "Name Increasing",
  },
  sortOptionsNameDsc: {
    id: "prodListHeaderCommonMsg.sortOptionsNameDsc",
    defaultMessage: "Name Decreasing",
  },
  sortOptionsUpdatedAt: {
    id: "prodListHeaderCommonMsg.sortOptionsUpdatedAt",
    defaultMessage: "Last updated Ascending",
  },
  sortOptionsUpdatedAtDsc: {
    id: "prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc",
    defaultMessage: "Last updated Descending",
  },
});

export const paymentStatusMessages = defineMessages({
  notCharged: {
    id: "paymentStatusMessages.notCharged",
    defaultMessage: "Not charged",
  },
  partiallyCharged: {
    id: "paymentStatusMessages.partiallyCharged",
    defaultMessage: "Partially charged",
  },
  fullyCharged: {
    id: "paymentStatusMessages.fullyCharged",
    defaultMessage: "Fully charged",
  },
  partiallyRefunded: {
    id: "paymentStatusMessages.partiallyRefunded",
    defaultMessage: "Partially refunded",
  },
  fullyRefunded: {
    id: "paymentStatusMessages.fullyRefunded",
    defaultMessage: "Fully refunded",
  },
});

export const orderStatusMessages = defineMessages({
  draft: {
    id: "orderStatusMessages.draft",
    defaultMessage: "Draft",
  },
  unfulfilled: {
    id: "orderStatusMessages.unfulfilled",
    defaultMessage: "Unfulfilled",
  },
  partiallyFulfilled: {
    id: "orderStatusMessages.partiallyFulfilled",
    defaultMessage: "Partially fulfilled",
  },
  fulfilled: {
    id: "orderStatusMessages.fulfilled",
    defaultMessage: "Fulfilled",
  },
  canceled: {
    id: "orderStatusMessages.canceled",
    defaultMessage: "Canceled",
  },
});

// export function translatePaymentStatus(
//   status: string,
//   intl: IntlShape
// ): string {
//   switch (status) {
//     case "Not charged":
//       return intl.formatMessage(paymentStatusMessages.notCharged);
//     case "Partially charged":
//       return intl.formatMessage(paymentStatusMessages.partiallyCharged);
//     case "Fully charged":
//       return intl.formatMessage(paymentStatusMessages.fullyCharged);
//     case "Partially refunded":
//       return intl.formatMessage(paymentStatusMessages.partiallyRefunded);
//     case "Fully refunded":
//       return intl.formatMessage(paymentStatusMessages.fullyRefunded);
//     default:
//       return status;
//   }
// }

// export function translateOrderStatus(status: string, intl: IntlShape): string {
//   switch (status) {
//     case "Draft":
//       return intl.formatMessage(orderStatusMessages.draft);
//     case "Unfulfilled":
//       return intl.formatMessage(orderStatusMessages.unfulfilled);
//     case "Partially fulfilled":
//       return intl.formatMessage(orderStatusMessages.partiallyFulfilled);
//     case "Fulfilled":
//       return intl.formatMessage(orderStatusMessages.fulfilled);
//     case "Canceled":
//       return intl.formatMessage(orderStatusMessages.canceled);
//     default:
//       return status;
//   }
// }

