import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  search: {
    id: "search",
    defaultMessage: "search",
  },
  membership: {
    defaultMessage: "Plix Club Member",
  },
  outOfStock: {
    defaultMessage: "Out of stock",
  },
  lowStock: {
    defaultMessage: "Low stock",
  },
  noItemsAvailable: {
    defaultMessage: "No items available",
  },
  noPurchaseAvailable: {
    defaultMessage: "Not available for purchase",
  },
  purchaseAvailableOn: {
    defaultMessage: `Will become available for purchase on {date} at {time}`,
  },
  youMightLike: {
    defaultMessage: "You might like",
  },
  choosePaymentMethod: {
    defaultMessage: "Please choose payment method.",
  },
  provideEmailAddress: {
    defaultMessage: "Please provide email address.",
  },
  account: {
    defaultMessage: "Account",
  },
  wallet: {
    defaultMessage: "Wallet",
  },
  myAccount: {
    defaultMessage: "My Account",
  },
  orderHistory: {
    defaultMessage: "Order history",
  },
  addressBook: {
    defaultMessage: "Address book",
  },
  logOut: {
    defaultMessage: "Log Out",
  },
  firstName: {
    defaultMessage: "First Name",
  },
  lastName: {
    defaultMessage: "Last Name",
  },
  password: {
    defaultMessage: "Password",
  },
  quantity: {
    defaultMessage: "Quantity",
  },
  sku: {
    defaultMessage: "SKU",
  },
  maxQtyIs: {
    defaultMessage: "Maximum quantity is {maxQuantity}",
  },
  qty: {
    defaultMessage: "Quantity",
  },
  subtotal: {
    defaultMessage: "Subtotal",
  },
  shipping: {
    defaultMessage: "Shipping",
  },
  promoCode: {
    defaultMessage: "Promo code",
  },
  total: {
    defaultMessage: "Total",
  },
  grandTotal: {
    defaultMessage: "Grand Total",
  },
  totalPrice: {
    defaultMessage: "Total Price",
  },
  checkout: {
    defaultMessage: "Checkout",
  },
  eMail: {
    defaultMessage: "Email Address",
  },
  shortEmail: {
    defaultMessage: "Email",
  },
  loading: {
    defaultMessage: "Loading",
  },
  products: {
    defaultMessage: "Products",
  },
  price: {
    defaultMessage: "Price",
  },
  variant: {
    defaultMessage: "Variant",
  },
  phone: {
    defaultMessage: "Phone",
  },
  phoneNumber: {
    defaultMessage: "Phone number: {phone}",
  },
  showEmail: {
    defaultMessage: "Email: {email}",
  },
  save: {
    defaultMessage: "Save",
  },
  add: {
    defaultMessage: "Add",
  },
  filterHeader: {
    defaultMessage: "FILTERS",
  },
  clearFilterHeader: {
    defaultMessage: "CLEAR FILTERS",
  },
  status: {
    defaultMessage: "Status",
  },
  cancel: {
    defaultMessage: "Cancel",
  },
  home: {
    defaultMessage: "Home",
  },
  wishlist: {
    defaultMessage: "Wishlist",
  },
  login: {
    defaultMessage: "Login",
  },
  cashback: {
    defaultMessage: "Plix Wallet Balance",
  },
  subscriptions: {
    defaultMessage: "Subscriptions",
  },
});

export const checkoutMessages = defineMessages({
  stepNameAddress: {
    defaultMessage: "Address",
  },
  stepNameShipping: {
    defaultMessage: "Shipping",
  },
  stepNamePayment: {
    defaultMessage: "Payment",
  },
  stepNameReview: {
    defaultMessage: "Review",
  },
  addressNextActionName: {
    defaultMessage: "Continue to Shipping",
  },
  shippingNextActionName: {
    defaultMessage: "Continue to Payment",
  },
  paymentNextActionName: {
    defaultMessage: "Continue to Review",
  },
  reviewNextActionName: {
    defaultMessage: "Place order",
  },
  addNewAddress: {
    defaultMessage: "Add new address",
  },
  shippingMethod: {
    defaultMessage: "SHIPPING METHOD",
  },
  billingAddress: {
    defaultMessage: "BILLING ADDRESS",
  },
  paymentMethod: {
    defaultMessage: "PAYMENT METHOD",
  },
  reviewOrder: {
    defaultMessage: "REVIEW ORDER",
  },
  viewOrder: {
    defaultMessage: "VIEW ORDER",
  },
  shippingAddress: {
    defaultMessage: "Shipping Address",
  },
  continueShopping: {
    defaultMessage: "CONTINUE SHOPPING",
  },
  continueShoppingCapitalize: {
    defaultMessage: "Continue Shopping",
  },
  mrp: {
    defaultMessage: "MRP:",
  },
});

export const prodListHeaderCommonMsg = defineMessages({
  sortOptionsClear: {
    defaultMessage: "Clear...",
  },
  sortOptionsPrice: {
    defaultMessage: "Price Low-High",
  },
  sortOptionsPriceDsc: {
    defaultMessage: "Price High-Low",
  },
  sortOptionsName: {
    defaultMessage: "Name Increasing",
  },
  sortOptionsNameDsc: {
    defaultMessage: "Name Decreasing",
  },
  sortOptionsUpdatedAt: {
    defaultMessage: "Last updated Ascending",
  },
  sortOptionsUpdatedAtDsc: {
    defaultMessage: "Last updated Descending",
  },
});

export const paymentStatusMessages = defineMessages({
  notCharged: {
    defaultMessage: "Not charged",
  },
  partiallyCharged: {
    defaultMessage: "Partially charged",
  },
  fullyCharged: {
    defaultMessage: "Fully charged",
  },
  partiallyRefunded: {
    defaultMessage: "Partially refunded",
  },
  fullyRefunded: {
    defaultMessage: "Fully refunded",
  },
});

export const orderStatusMessages = defineMessages({
  draft: {
    defaultMessage: "Draft",
  },
  unfulfilled: {
    defaultMessage: "Unfulfilled",
  },
  partiallyFulfilled: {
    defaultMessage: "Partially fulfilled",
  },
  fulfilled: {
    defaultMessage: "Fulfilled",
  },
  canceled: {
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
