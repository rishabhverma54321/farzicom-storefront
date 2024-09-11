// import { useState, useEffect } from "react";
// import { useCart } from "@saleor/sdk";
// import { IItems } from "@saleor/sdk/lib/api/Cart/types";
// import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";

// import { useCart } from "@saleor/sdk";

// export interface myICheckoutModelLine extends ICheckoutModelLine {
//   listPrice: number | null;
// }

// export declare type myIItems = myICheckoutModelLine[] | null | undefined;

// export interface myIProps {
//   listPrice: number | null;
//   undiscountedPrice: number;
//   discountedPrice: number;
//   variantId: string;
//   quantity: number;
// }

// export const useMyCart = () => {
//   const {
//     loaded,
//     items,
//     totalPrice,
//     subtotalPrice,
//     shippingPrice,
//     discount,
//     addItem,
//     removeItem,
//     updateItem,
//   } = useCart();

//   enum op {
//     add,
//     sub,
//   }

//   const SUMMARY_PRICES = "summaryPrices";
//   const MY_IITEMS = "myIItems";

//   const emptyCart = {
//     mrp: 0,
//     netPrice: 0,
//     itemDiscount: 0,
//     offerDiscount: 0,
//   };

//   const updatePrices = (
//     data: Omit<myIProps, "quantity">,
//     operation: number
//   ) => {
//     const { listPrice, undiscountedPrice, discountedPrice, variantId } = data;

//     const summaryPricesStr = localStorage.getItem(SUMMARY_PRICES);
//     const summaryPrices =
//       summaryPricesStr == null
//         ? {
//             mrp: 0,
//             netPrice: 0,
//             itemDiscount: 0,
//             offerDiscount: 0,
//           }
//         : JSON.parse(summaryPricesStr);

//     const { mrp, netPrice, itemDiscount, offerDiscount } = summaryPrices;

//     if (operation === op.add) {
//       if (listPrice) {
//         localStorage.setItem(
//           SUMMARY_PRICES,
//           JSON.stringify({
//             mrp: mrp + listPrice,
//             netPrice: netPrice + discountedPrice,
//             itemDiscount: itemDiscount + listPrice - undiscountedPrice,
//             offerDiscount: offerDiscount + undiscountedPrice - discountedPrice,
//           })
//         );
//       } else {
//         localStorage.setItem(
//           SUMMARY_PRICES,
//           JSON.stringify({
//             mrp: mrp + undiscountedPrice,
//             netPrice: netPrice + discountedPrice,
//             itemDiscount: itemDiscount,
//             offerDiscount: offerDiscount + undiscountedPrice - discountedPrice,
//           })
//         );
//       }
//       // debugger;
//       const data_checkoutStr = localStorage.getItem("data_checkout");
//       const data_checkout =
//         data_checkoutStr == null ? {} : JSON.parse(data_checkoutStr);
//       if (data_checkout.lines.length > 0) {
//         // debugger;

//         const thisProduct = data_checkout.lines.filter((item: any) => {
//           return item.variant.id == variantId;
//         })[0];

//         const myProduct = { ...thisProduct, listPrice };
//         let myIItemsStr = localStorage.getItem(MY_IITEMS);
//         let myIItems = myIItemsStr == null ? [] : JSON.parse(myIItemsStr);
//         myIItems.push(myProduct);
//         // debugger;

//         localStorage.setItem(MY_IITEMS, JSON.stringify(myIItems));
//       }
//     } else if (operation === op.sub) {
//       if (listPrice) {
//         localStorage.setItem(
//           SUMMARY_PRICES,
//           JSON.stringify({
//             mrp: mrp - listPrice,
//             netPrice: netPrice - discountedPrice,
//             itemDiscount: itemDiscount - (listPrice - undiscountedPrice),
//             offerDiscount:
//               offerDiscount - (undiscountedPrice - discountedPrice),
//           })
//         );
//       } else {
//         localStorage.setItem(
//           SUMMARY_PRICES,
//           JSON.stringify({
//             mrp: mrp - undiscountedPrice,
//             netPrice: netPrice - discountedPrice,
//             itemDiscount: itemDiscount,
//             offerDiscount:
//               offerDiscount - (undiscountedPrice - discountedPrice),
//           })
//         );
//       }
//       // debugger;
//       const my_IItemsStr = localStorage.getItem(MY_IITEMS);
//       const my_IItems = my_IItemsStr == null ? {} : JSON.parse(my_IItemsStr);

//       const myIItems: myIItems = my_IItems.filter((item: any) => {
//
//         return item.variant.id != variantId;
//       });
//
//       // debugger;

//       localStorage.setItem(MY_IITEMS, JSON.stringify(myIItems));
//     }
//   };

//   const addMyItem = async ({
//     listPrice,
//     undiscountedPrice,
//     discountedPrice,
//     variantId,
//     quantity,
//   }: myIProps) => {
//     // debugger;

//     const res = await addItem(variantId, quantity);
//

//     updatePrices(
//       { listPrice, undiscountedPrice, discountedPrice, variantId },
//       op.add
//     );
//   };

//   const removeMyItem = async ({
//     listPrice,
//     undiscountedPrice,
//     discountedPrice,
//     variantId,
//   }: Omit<myIProps, "quantity">) => {
//     const res = await removeItem(variantId);
//     updatePrices(
//       { listPrice, undiscountedPrice, discountedPrice, variantId },
//       op.sub
//     );
//   };

//   return {
//     addMyItem,
//     removeMyItem,
//     updateItem,
//   };
// };

export const useMyCart = () => {
  return {};
};
