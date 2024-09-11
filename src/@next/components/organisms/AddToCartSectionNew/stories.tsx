// import { storiesOf } from "@storybook/react";
// import { ProductDetails_product_category_products } from "@temp/views/Product/gqlTypes/ProductDetails";
// import React from "react";
// import { IntlProvider } from "react-intl";

// import AddToCartSection, { IAddToCartSection } from "./AddToCartSection";
// const products: ProductDetails_product_category_products = {
//   __typename: "ProductCountableConnection",
//   edges: [
//     {
//       node: {
//         __typename: "Product",
//         id: "UHJvZHVjdDo0NQ==",
//         name: "Blissful Perfecting Mask",
//         thumbnail: {
//           __typename: "Image",
//           url:
//             "https://v2api.lotus-organics.com/graphql/media/__sized__/products/1576049833-806360104156_1-thumbnail-255x255-70.jpg",
//           alt: "",
//         },
//         thumbnail2x: {
//           __typename: "Image",
//           url:
//             "https://v2api.lotus-organics.com/graphql/media/__sized__/products/1576049833-806360104156_1-thumbnail-510x510-70.jpg",
//         },
//         isAvailableForPurchase: true,
//         isAvailable: true,
//         variants: [],
//         metadata: [],
//         availableForPurchase: true,
//         pricing: null,
//       },
//     },
//   ],
// };
// const DEFAULT_PROPS: IAddToCartSection = {
//   productVariants: [],
//   name: "Tribute",
//   productPricing: {
//     onSale: false,
//     priceRangeUndiscounted: {
//       start: {
//         gross: { amount: 10, currency: "USD", __typename: "Money" },
//         net: { amount: 10, currency: "USD", __typename: "Money" },
//         __typename: "TaxedMoney",
//       },
//       stop: {
//         gross: { amount: 15, currency: "USD", __typename: "Money" },
//         net: { amount: 15, currency: "USD", __typename: "Money" },
//         __typename: "TaxedMoney",
//       },
//       __typename: "TaxedMoneyRange",
//     },
//     priceRange: {
//       start: {
//         gross: { amount: 10, currency: "USD", __typename: "Money" },
//         net: { amount: 10, currency: "USD", __typename: "Money" },
//         __typename: "TaxedMoney",
//       },
//       stop: {
//         gross: { amount: 15, currency: "USD", __typename: "Money" },
//         net: { amount: 15, currency: "USD", __typename: "Money" },
//         __typename: "TaxedMoney",
//       },
//       __typename: "TaxedMoneyRange",
//     },
//     __typename: "ProductPricingInfo",
//   },
//   items: [],
//   queryAttributes: {},
//   setVariantId: variantId => undefined,
//   variantId: "",
//   onAddToCart: (variantId, quantity) => undefined,
//   onAttributeChangeHandler: (slug, value) => undefined,
//   availableForPurchase: null,
//   isAvailableForPurchase: null,
//   itemAdded: false,
//   category: {
//     __typename: "Category",
//     id: "1",
//     name: "Sample Category",
//     products,
//   },

// };

// storiesOf("@components/organisms/AddToCartSection", module).add(
//   "default",
//   () => (
//     <IntlProvider locale="en">
//       <AddToCartSection {...DEFAULT_PROPS} />
//     </IntlProvider>
//   )
// );
