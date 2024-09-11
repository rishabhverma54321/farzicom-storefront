import {
  CheckoutLineFragment,
  RemoveItemResult,
  UpdateItemResult,
  useAuth,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
  UserFragment,
} from "@saleor/sdk";
import { History } from "history";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IUseCustomHistory, useCustomHistory } from "@hooks/useCustomHistory";
import round from "lodash/round";
import isEqual from "lodash/isEqual";
import { Loader } from "@components/atoms/Loader";
import { CartHeader } from "@components/atoms/CartHeader";
import { TaxedMoney } from "@components/molecules/TaxedMoney";
import { CartSide } from "@components/molecules/CartSide";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";

// import { CartEmpty } from "@components/templates";
// import Empty from "./Empty";
// import { IItems } from "@saleor/sdk/lib/api/Cart/types";
// import { UserDetails_me } from "@saleor/sdk/lib/queries/gqlTypes/UserDetails";
import { BASE_URL, CLIENT, ENABLE_GA4 } from "Themes/config";

import { checkoutMessages } from "@src/intl";
import { ITaxedMoney } from "@src/types";
import {
  generateProductUrl,
  getGclid,
  getGraphqlIdFromDBId,
  getUtmData,
} from "@src/core/utils";

import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
  OverlayContextInterface,
  ShowOverlayType,
} from "@components/templates";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js"; // @ts-check
import { useCustomLocation } from "@hooks/useCustomLocation";
import { clients } from "@globalTypes/customGlobalTypes";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@src/pages/_app";
import {
  createTaxedPriceFromAmount,
  datalayerEventForByb,
  getCheckoutMetaForSubscription,
  getCheckoutMetaForVariantAttributeWeight,
  getItemCategoriesFromAttribute,
  getItemJourneyInfo,
  getMetadataValue,
  getPrices,
  getVariantAttributes,
  isBoxProduct,
  isGiftBoxProduct,
  membershipDiscountData,
  parseJson,
  RECENTLY_DELETED_PRODUCTS,
  removeItemFromLinesJourney,
  skuToUserPropertyClevertap,
} from "@utils/misc";
import Cart from "./Cart";

// import { CartRow } from "./CartRow/index";
// import { IProps } from "./types";

import * as S from "./styles";
import CartRow from "./CartRow/CartRow";
import { isMember } from "@utils/misc";
// import {
//   deleteMetadata,
//   removeTags,
// } from "@components/organisms/ProductSubscriptionPopup/queries";
import { client } from "@src/client";

// @ts-ignore
// @ts-ignore
// @ts-ignore

// const title = <CollectionHeading Heading="Cart" />;
const productRemovedFromCart = async (
  name: string,
  id: string,
  unitPrice: React.ReactNode,
  quantity: number,
  variant: any,
  totalQuantity: number,
  totalPrice: any,
  couponDiscount: any,
  productUrl: string | undefined,
  hooksData?: any,
  journeyInfo?: any
) => {
  const {
    user = { id: undefined },
    getWalletAmount,
    promoCodeDiscount,
    utm_data,
  } = hooksData;

  let walletBalance = 0;
  if (user?.id) {
    await getWalletAmount().then(walletAmount => {
      walletBalance = walletAmount.data;
    });
  }
  if (
    typeof window !== "undefined" &&
    window.dataLayer &&
    gtmConfig.removeFromCart.enable
  ) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: gtmConfig.removeFromCart.value,
      ecommerce: {
        currencyCode: "INR",
        remove: {
          products: [
            {
              name,
              id: id ? getDBIdFromGraphqlId(id, "Product") : null,
              price: variant?.pricing?.price?.gross?.amount,
              brand: "Plixlife",
              variant_name: variant?.name,
              variant_id: variant?.id
                ? getDBIdFromGraphqlId(variant?.id, "ProductVariant")
                : null,
              quantity: 1,
              category: variant?.product?.category?.name,
            },
          ],
        },
      },
    });
  }

  if (ENABLE_GA4) {
    const categories = getItemCategoriesFromAttribute(variant);
    const isMonthIncluded = categories?.sizeCategory2
      ?.toLowerCase()
      ?.includes("month");
    const productVariantName = getVariantAttributes("Flavors", variant);
    const { listprice, discountedPrice, discountAmount } = getPrices(
      variant?.product,
      false,
      variant
    );
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.removeFromCartGa4.enable
    ) {
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: gtmConfig.removeFromCartGa4.value,
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        cta_type: "delete_icon",
        ecommerce: {
          currency: "INR",
          value: variant?.pricing?.price?.gross?.amount,
          items: [
            {
              item_id: id ? getDBIdFromGraphqlId(id, "Product") : null,
              item_name: name,
              item_brand: "plixlife",
              currency: "INR",
              quantity: quantity,
              discount: discountAmount || 0,
              item_category: variant?.product?.category?.name,
              item_category2: isMonthIncluded
                ? categories?.sizeCategory2
                : "NA",
              item_category3: categories?.sizeCategory1 || "NA",
              item_category4: isMonthIncluded
                ? "NA"
                : categories?.sizeCategory2,
              price: variant?.pricing?.price?.gross?.amount,
              item_variant: productVariantName,
              item_list_name: journeyInfo?.addedFrom || "NA",
              item_list_id: journeyInfo?.productListId || "NA",
            },
          ],
        },
      });
    }
  }
  // if (gtmConfig.removeFromCart.enable) {
  //   if (window.dataLayer) {
  //     window.dataLayer.push({ ecommerce: null });
  //   }
  //   (window.dataLayer = window.dataLayer || []).push({
  //     event: "removeFromCart",
  //     ecommerce: {
  //       remove: {
  //         products: [
  //           {
  //             name,
  //             id,
  //             price: unitPrice,
  //             quantity,
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }

  if (clevertapEvents.removeFromCart.enable) {
    const clevertap = makeClevertap();
    clevertap.event.push(clevertapEvents.removeFromCart.value, {
      platform: window.screen.width < 520 ? "msite" : "website",
      timeStamp: Date.now(),
      clickTarget: document.location.href,
      customerEmail: user?.email,
      customerPhone: user?.defaultBillingAddress?.phone,
      orderAddressCity: user?.defaultBillingAddress?.city,
      quantity: totalQuantity,
      cartAmount: totalPrice?.gross?.amount,
      couponAmount: couponDiscount?.amount,
      couponName: promoCodeDiscount?.discountName,
      productName: variant?.product?.name || "",
      productId: variant?.product?.id || "",
      price: variant?.pricing?.price.net.amount,
      productImage: variant?.product?.thumbnail,
      categoryName: variant?.product?.category?.name,
      productUrl,
      walletBalance,
      clickSource: utm_data,
      gaUserId: getGclid(),
    });
  }
};
const getShoppingButton = (history: IUseCustomHistory) => (
  <S.ContinueStyledButton
    testingContext="cartPageContinueShoppingButton"
    onClick={() => history.push(BASE_URL)}
  >
    <FormattedMessage {...checkoutMessages.continueShopping} />
  </S.ContinueStyledButton>
);

const getCheckoutButton = (
  history: IUseCustomHistory,
  user?: UserFragment | null
) => (
  <S.StyledButton
    testingContext="proceedToCheckoutButton"
    onClick={() => history.push(`/checkout/address`)}
  >
    <FormattedMessage defaultMessage="CHECKOUT" />
  </S.StyledButton>
);

const cartHeader = <CartHeader />;

export type setCouponPrepaidDiscountsType = React.Dispatch<
  React.SetStateAction<{
    couponAmount: number;
    prepaidAmount: number;
    cashbackAmount: number;
  }>
>;

const prepareCartFooter = (
  subtotalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  couponDiscountTaxedPrice?: ITaxedMoney | null,
  prepaidDiscountTaxedPrice?: ITaxedMoney | null,
  totalPrice?: ITaxedMoney | null,
  walletBalance?: ITaxedMoney | null,
  itemDiscount?: ITaxedMoney | null,
  netPrice?: ITaxedMoney | null,
  mrp?: ITaxedMoney | null
) => {
  let prepaidDiscountTaxedPrice_new = prepaidDiscountTaxedPrice;
  if (prepaidDiscountTaxedPrice?.gross?.amount < 0) {
    prepaidDiscountTaxedPrice_new = {
      gross: {
        ...prepaidDiscountTaxedPrice.gross,
        amount: Math.abs(prepaidDiscountTaxedPrice?.gross.amount),
      },
      net: {
        ...prepaidDiscountTaxedPrice.net,
        amount: Math.abs(prepaidDiscountTaxedPrice?.net.amount),
      },
    };
  }
  const { checkout } = useCheckoutState();
  const { items } = useCartState();
  const ShopMetaContextValue = useContext(ShopMetaContext);
  const metaData = checkout?.metadata;
  const discountFromCheckoutMeta =
    metaData &&
    getMetadataValue(metaData, "discount") &&
    typeof parseJson(getMetadataValue(metaData, "discount")) === "string"
      ? parseJson(getMetadataValue(metaData, "discount")?.replace(/'/g, '"'))
      : parseJson(getMetadataValue(metaData, "discount"));

  const membershipDiscountArray = membershipDiscountData(
    discountFromCheckoutMeta,
    "membership-new"
  );

  const membershipEnrollmentDiscountArray = membershipDiscountData(
    discountFromCheckoutMeta,
    "member enrollment"
  );

  const membershipDiscount =
    !!membershipDiscountArray.length &&
    !!membershipDiscountArray[0]?.discount_amount
      ? parseFloat(membershipDiscountArray[0]?.discount_amount).toFixed(2)
      : 0;

  const membershipEnrollmentDiscount =
    !!membershipEnrollmentDiscountArray.length &&
    !!membershipEnrollmentDiscountArray[0]?.discount_amount
      ? parseFloat(
          membershipEnrollmentDiscountArray[0]?.discount_amount
        ).toFixed(2)
      : 0;

  const recalculation_toggle =
    getMetadataValue(ShopMetaContextValue, "recalculation_toggle") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "recalculation_toggle"));

  let totalbyobMrpInItems: number = 0;
  let totalbyobItemAmount: number = 0;

  const isBoxItemInCart = items.filter(item => isBoxProduct(item)) || [];

  const boxItems: any =
    (getMetadataValue(checkout?.metadata, "byobItems") &&
      parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
    [];

  !!isBoxItemInCart.length &&
    isBoxItemInCart.forEach(item => {
      const findBox = boxItems.find(
        box => box?.boxItemSKU === item?.variant?.sku
      );
      if (findBox && findBox.items) {
        const boxItemstotalPrice = findBox.items.reduce(
          (total, item) => total + Number(item?.price),
          0
        );
        totalbyobMrpInItems += boxItemstotalPrice * (item?.quantity || 0);
      }
      const itemPrice = item?.variant?.pricing?.price?.gross?.amount || 0;
      totalbyobItemAmount += itemPrice * (item?.quantity || 0);
    });

  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  return (
    <>
      <CartSide
        subtotalPrice={
          <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
        }
        shippingPrice={
          shippingTaxedPrice && (
            <TaxedMoney
              data-test="shippingPrice"
              taxedMoney={shippingTaxedPrice}
            />
          )
        }
        itemDiscount={
          itemDiscount && (
            <TaxedMoney
              data-test="shippingPrice"
              taxedMoney={
                !!isBoxItemInCart.length
                  ? createTaxedPriceFromAmount(
                      Number(itemDiscount?.gross?.amount) +
                        totalbyobMrpInItems -
                        totalbyobItemAmount
                    )
                  : itemDiscount
              }
            />
          )
        }
        // netPrice={
        //   netPrice && (
        //     <TaxedMoney data-test="shippingPrice" taxedMoney={netPrice} />
        //   )
        // }
        walletCredit={
          !recalculation_toggle || isRecalculate
            ? walletBalance?.gross?.amount && (
                <TaxedMoney
                  data-test="walletCredit"
                  taxedMoney={walletBalance}
                />
              )
            : null
        }
        couponDiscount={
          couponDiscountTaxedPrice && (
            <TaxedMoney
              data-test="couponDiscount"
              taxedMoney={couponDiscountTaxedPrice}
            />
          )
        }
        totalPrice={
          <TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />
        }
        mrp={
          <TaxedMoney
            data-test="mrp"
            taxedMoney={
              !!isBoxItemInCart.length
                ? createTaxedPriceFromAmount(
                    Number(mrp?.gross?.amount) +
                      totalbyobMrpInItems -
                      totalbyobItemAmount
                  )
                : mrp
            }
          />
        }
        membershipDiscount={
          Number(membershipDiscount) || Number(membershipEnrollmentDiscount) ? (
            <TaxedMoney
              data-test="membershipDiscount"
              taxedMoney={
                !!membershipDiscountArray?.length
                  ? createTaxedPriceFromAmount(membershipDiscount)
                  : createTaxedPriceFromAmount(membershipEnrollmentDiscount)
              }
            />
          ) : null
        }
        netTotal={
          Number(membershipDiscount) || Number(membershipEnrollmentDiscount) ? (
            <TaxedMoney
              data-test="membershipDiscount"
              taxedMoney={
                !!membershipDiscountArray?.length
                  ? createTaxedPriceFromAmount(
                      Number(totalPrice?.gross?.amount) +
                        Number(membershipDiscount)
                    )
                  : createTaxedPriceFromAmount(
                      Number(totalPrice?.gross?.amount) +
                        Number(membershipEnrollmentDiscount)
                    )
              }
            />
          ) : (
            <TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />
          )
        }
        prepaidDiscount={
          !recalculation_toggle
            ? prepaidDiscountTaxedPrice_new && (
                <TaxedMoney
                  data-test="offerDiscount"
                  taxedMoney={prepaidDiscountTaxedPrice_new}
                />
              )
            : null
        }
        prepaidDiscountText={
          !recalculation_toggle
            ? prepaidDiscountTaxedPrice?.gross?.amount > 0
              ? "Prepaid Discount"
              : prepaidDiscountTaxedPrice?.gross?.amount < 0
              ? "COD Charges"
              : undefined
            : null
        }
      />
    </>
  );
};

export const getTotalDiscount = (
  prices: Array<ITaxedMoney | null | undefined>
) => {
  const totalDiscount = prices.reduce(
    (acc, curr) => acc + parseFloat(curr?.gross?.amount?.toString() || "0"),
    0
  );

  return round(totalDiscount, 2);
};

export const CartPage: React.FC<{
  overlay: OverlayContextInterface;
}> =({overlay}) =>{

  const history = useCustomHistory();
  const { user } = useAuthState();
  const {
    checkoutPaymentMethodUpdate,
    // availablePaymentGateways,
  } = useCheckout();
  const { checkout, promoCodeDiscount, checkoutLoading } = useCheckoutState();
  const {
    updateItemRest,
    updateItemWithLines,
    updateItemWithLinesRest,
    removeItemRest,
    removeItem,
  } = useCart();
  const loaded = true;
  const {
    items,
    shippingPrice,
    subtotalPrice,
    totalPrice,
    cashbackDiscount,
    discount,
    itemDiscount,
    mrp,
    offerDiscount,
    prepaidDiscount,
    cashbackRecieve,
    netPrice,
    couponDiscount,
  } = useCartState();

  // const [checkoutDiscounts, setCheckoutDiscounts] = useState({
  //   couponAmount: 0,
  //   prepaidAmount: 0,
  //   cashbackAmount: 0,
  // });

  // const couponDiscount = {
  //   amount: checkoutDiscounts.couponAmount,
  //   currency: "INR",
  // };

  // const prepaidDiscount = {
  //   amount: checkoutDiscounts.prepaidAmount,
  //   currency: "INR",
  // };

  const shippingTaxedPrice = shippingPrice;

  // const couponDiscountTaxedPrice = couponDiscount &&
  //   couponDiscount.amount !== 0 && {
  //     gross: couponDiscount,
  //     net: couponDiscount,
  //   };

  // const prepaidDiscountTaxedPrice = prepaidDiscount &&
  //   prepaidDiscount.amount !== 0 && {
  //     gross: prepaidDiscount,
  //     net: prepaidDiscount,
  //   };

  // const cashbackDiscountTaxedPrice = cashbackDiscount && {
  //   gross: cashbackDiscount,
  //   net: cashbackDiscount,
  // };

  // const cashbackRecieveTaxedPrice = cashbackRecieve && {
  //   gross: cashbackRecieve,
  //   net: cashbackRecieve,
  // };

  const subtotalTaxedPrice = subtotalPrice && {
    ...subtotalPrice,
    gross: {
      amount: subtotalPrice?.gross.amount,
      currency: "INR",
    },
    net: {
      amount: subtotalPrice?.net.amount,
      currency: "INR",
    },
  };

  //

  // const totalDiscount = getTotalDiscount([
  //   couponDiscountTaxedPrice,
  //   prepaidDiscountTaxedPrice,
  //   cashbackDiscountTaxedPrice,
  // ]);
  const { pathname } = useCustomLocation();

  const utm_data = getUtmData(pathname);

  // useEffect(() => {
  //   if (items?.length === 0) {
  //     //
  //     checkoutPaymentMethodUpdate({
  //       gateway: "mirumee.payments.razorpay",
  //       useCashback: false,
  //     });
  //   }
  // }, [items?.length]);

  const [openCart, setOpenCart] = useState(false);

  const generateCart = (
    checkoutLoading: boolean,
    items: CheckoutLineFragment[],
    // removeItem: (data: Omit<myIProps, "quantity">) => any,
    removeItem: (
      variantId: string,
      updateShippingMethod?: boolean,
      isRecalculate?: boolean,
      line_item?: any,
      checkoutMetadataInput?: any
    ) => Promise<any>,
    updateItem: (
      variantId: string,
      quantity: number,
      prevQuantity: number,
      updateShippingMethod?: boolean,
      isRecalculate?: boolean,
      line_item?: any
    ) => UpdateItemResult,

    updateItemWithLinesRest: (
      linesToAdd: any,
      updateShippingMethod?: boolean,
      useCheckoutLoading?: boolean,
      isRecalculate?: boolean,
      checkoutMetadataInput?: any
    ) => Promise<any>,

    show?: ShowOverlayType,
    CartTotalPrice?: any,
    // recordCartPageClevertap?: () => void,
    // quantityChangeClevertap?: (variant: any) => void,
    couponDiscount?: any,
    hooksData?: any
  ) => {
    const ShopMetaContextValue = useContext(ShopMetaContext);
    const checkoutMetadata = checkout?.metadata || [];
    const [itemsInCart, setItemsInCart] = useState<{
      itemsToShow: Array<any>;
      boxItemsToShow: Array<any>;
    }>({
      itemsToShow: [],
      boxItemsToShow: [],
    });
    const [removeProductLoader, setRemoveProductLoader] = useState(false);
    const personalisedBoxConfigNew =
      ShopMetaContextValue &&
      getMetadataValue(ShopMetaContextValue, "personalised_box_config_new") &&
      parseJson(
        getMetadataValue(ShopMetaContextValue, "personalised_box_config_new")
      );

    const isRecalculate =
      ShopMetaContextValue &&
      getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
      parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

    const discountedItemsBXGY =
      checkoutMetadata &&
      getMetadataValue(checkoutMetadata, "discounted_items") &&
      typeof parseJson(
        getMetadataValue(checkoutMetadata, "discounted_items")
      ) === "string"
      ? parseJson(getMetadataValue(checkoutMetadata, "discounted_items")?.replace(/'/g, '"'))
        : parseJson(getMetadataValue(checkoutMetadata, "discounted_items"));

    const giftBoxConfig =
      ShopMetaContextValue &&
      getMetadataValue(ShopMetaContextValue, "gift_box_config") &&
      parseJson(getMetadataValue(ShopMetaContextValue, "gift_box_config"));
    // useEffect(() => {
    //   const removeUnwantedByobProduct = async () => {
    //     if (checkout && items && !!items.length && !removeProductLoader) {
    //       const isBoxItemInCart =
    //         items.filter(item => isBoxProduct(item)) || [];
    //       const boxItems: any =
    //         (getMetadataValue(checkout?.metadata, "byobItems") &&
    //           parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
    //         [];
    //       const updatedByobCheckoutMeta = !!boxItems.length
    //         ? boxItems?.filter(
    //             (boxItem: any) =>
    //               isBoxItemInCart?.findIndex(
    //                 item => item?.variant?.sku === boxItem?.boxItemSKU
    //               ) !== -1
    //           )
    //         : [];

    //       const isUpdateMeta =
    //         updatedByobCheckoutMeta?.length !== boxItems.length;
    //       if (isUpdateMeta) {
    //         try {
    //           const res = await updateCheckoutMeta([
    //             {
    //               key: "byobItems",
    //               value: JSON.stringify(updatedByobCheckoutMeta),
    //             },
    //           ]);
    //         } catch (err) {
    //           console.log(err);
    //         }
    //       }
    //     }
    //   };
    //   removeUnwantedByobProduct();
    // }, [items]);
    //
    // const overlay = useContext(OverlayContext);
    // const { totalPrice: CartTotalPrice } = useCart();

    // const { show } = overlay;

    useEffect(() => {
      // Creating free products from line for BXGY part
      if (items?.length) {
        const itemsToShow = items.filter(item => !isBoxProduct(item));
        const boxItemsToShow = items.filter(item => isBoxProduct(item));
        // Apply discounts to items
        if (discountedItemsBXGY?.length) {
          discountedItemsBXGY.forEach(item => {
            const itemIndex = itemsToShow.findIndex(line => line?.id === item?.line_id);
            if (itemIndex !== -1) {
              const currentItem = itemsToShow[itemIndex];
              if (currentItem?.quantity - item?.quantity > 0) {
                itemsToShow[itemIndex] = {
                  ...currentItem,
                  newQuantity: currentItem?.quantity - item?.quantity,
                };
                itemsToShow.push({
                  ...currentItem,
                  quantity: item?.quantity,
                  productType: "free"
                });
              } else {
                // First, remove the current item and then push it again to the list because free items need to be at the end
                itemsToShow.splice(itemIndex, 1);
                itemsToShow.push({
                  ...currentItem,
                  productType: "free",
                });
              }
            }
          });
        }
  
        // Set items in cart
        setItemsInCart({
          itemsToShow,
          boxItemsToShow
        });
      }
    }, [checkout?.totalPrice?.net?.amount, items]);

    const maxCapingGiftBox = (variant: any) => {
      const specificGiftBox =
        giftBoxConfig &&
        Object.keys(giftBoxConfig)?.filter(
          item => giftBoxConfig[item]?.variant_id === variant?.id
        );
      const maxQuantity = !!specificGiftBox?.length
        ? giftBoxConfig[specificGiftBox[0]]?.capping || 1
        : 1;
      return maxQuantity;
    };
    // const removeByobFromCheckoutMeta = async (
    //   variant,
    //   id,
    //   quantity,
    //   totalPrice,
    //   checkout
    // ) => {
    //   let newBoxItems: any[] = [];
    //   const boxItems: any =
    //     getMetadataValue(checkout?.metadata, "byobItems") &&
    //     parseJson(getMetadataValue(checkout?.metadata, "byobItems"));

    //   newBoxItems = (boxItems.length &&
    //     boxItems?.filter(
    //       item => item?.boxItemSKU !== variant?.sku
    //     )) || [...boxItems];

    //   const boxLines =
    //     (boxItems.length &&
    //       boxItems?.filter(item => item?.boxItemSKU === variant?.sku)) ||
    //     {};

    //   if (checkout?.id) {
    //     datalayerEventForByb(
    //       "remove",
    //       variant,
    //       user,
    //       (boxLines.length && boxLines[0]) || [],
    //       "Remove Box"
    //     );
    //     try {
    //       const res = await updateCheckoutMeta([
    //         {
    //           key: "byobItems",
    //           value: JSON.stringify(newBoxItems),
    //         },
    //       ]);
    //       if (res?.data?.updateMetadata?.item) {
    //         setRemoveProductLoader(false);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // };
    return (
      <>
        {itemsInCart?.boxItemsToShow && !!itemsInCart?.boxItemsToShow?.length ? (
          itemsInCart?.boxItemsToShow?.map(
            ({ id, variant, quantity, totalPrice }, index) => (
              <CartRow
                key={id ? `id-${id}` : `idx-${index}`}
                // index={index}
                id={variant?.product?.id || ""}
                name={variant?.product?.name || ""}
                maxQuantity={maxCapingGiftBox(variant) || 1}
                categorySlug=""
                quantity={quantity}
                isPersonalisedBox
                onRemove={async (
                  setLoading,
                  upsell_id,
                  items,
                  freebie_id = null,
                  freebie_quiz_ids = null) => {
                  try {
                    const handleRemove = (res, boxLines, freebieProduct = null) => {
                      if (res?.errors?.length) {
                        let errMsg = "Something went wrong!";
                        switch (res?.errors[0]?.code) {
                          case "PRODUCT_UNAVAILABLE_FOR_PURCHASE":
                            errMsg = "Product is unavailable for purchase";
                            break;
                          case "INSUFFICIENT_STOCK":
                            errMsg = "Product is out of stock";
                            break;
                          case "NOT_FOUND":
                            errMsg = "Product is either deleted or not found";
                            break;
                          default:
                            errMsg = "Something went wrong";
                            break;
                        }
                        show(OverlayType.message, OverlayTheme.modal, {
                          title: errMsg,
                          status: "error",
                        });
                      } else {
                        datalayerEventForByb(
                          "remove",
                          variant,
                          user,
                          (boxLines.length && boxLines[0]) || [],
                          "Remove Box"
                        );

                        if (freebieProduct) {
                          productRemovedFromCart(
                            freebieProduct[0]?.variant?.product?.name || "",
                            freebieProduct[0]?.variant?.product?.id || "",
                            freebieProduct[0]?.variant?.pricing?.price,
                            quantity,
                            variant,
                            1,
                            CartTotalPrice?.gross.amount,
                            couponDiscount,
                            "",
                            hooksData
                          );
                          removeItemFromLinesJourney(freebie_id);
                          skuToUserPropertyClevertap(
                            freebieProduct[0]?.variant?.sku,
                            "REMOVE"
                          );
                        }
                      }
                    };

                    const boxItemsProducts = items.filter(item =>
                      isBoxProduct(item)
                    );
                    const dataCheckoutMeta: any =
                      (typeof window !== undefined &&
                        localStorage.getItem("data_checkout") &&
                        parseJson(localStorage.getItem("data_checkout"))) ||
                      [];

                    const byobMetaData: any =
                      (dataCheckoutMeta &&
                        dataCheckoutMeta?.metadata?.filter(
                          item => item?.key === "byobItems"
                        )) ||
                      [];

                    const boxItems =
                      Array.isArray(byobMetaData) && !!byobMetaData?.length
                        ? parseJson(byobMetaData[0]?.value)
                        : [];

                    const newBoxItems = (boxItems.length &&
                      boxItems?.filter(
                        item => item?.boxItemSKU !== variant?.sku
                      )) || [...boxItems];
                    // setRemoveProductLoader(true);
                    const updatedCheckoutMeta = [
                      {
                        key: "byobItems",
                        value: JSON.stringify(newBoxItems),
                      },
                    ];

                    const boxLines =
                      (boxItems.length &&
                        boxItems?.filter(
                          item => item?.boxItemSKU === variant?.sku
                        )) ||
                      {};

                  const freebieProduct =
                  freebie_id &&
                  items.filter(item => item.variant.id === freebie_id) || [];

                  // Freebie with Byob products
                  if (
                    freebieProduct &&
                  Array.isArray(freebieProduct) &&
                  !!freebieProduct?.length
                ) {
                  const checkOtherProducthaveSameFreebie = items
                  ?.filter(product => product?.variant?.id !== variant?.id)
                  ?.some(product => {
                    const variantMetadata = product?.variant?.metadata || [];
                    const freebieWithProduct =
                      variantMetadata &&
                      getMetadataValue(
                        variantMetadata,
                        "freebie_includes"
                      ) &&
                      parseJson(
                        getMetadataValue(variantMetadata, "freebie_includes")
                      );
                          if (
                            freebieWithProduct?.enable &&
                            freebieWithProduct?.variant_id
                          ) {
                            return true;
                          }
                          return false;
                        });
                      if (!checkOtherProducthaveSameFreebie) {
                        const linesToRemove = [
                          {
                            variantId: getDBIdFromGraphqlId(
                              variant.id,
                              "ProductVariant"
                            ).toString(),
                            quantity: 0,
                          },
                          {
                            variantId: getDBIdFromGraphqlId(
                              freebie_id,
                              "ProductVariant"
                            ).toString(),
                            quantity: 0,
                          },
                        ];
                        updateItemWithLinesRest(
                          linesToRemove,
                          false,
                          true,
                          isRecalculate,
                          updatedCheckoutMeta
                        ).then(res=>{
                          handleRemove(res, boxLines, freebieProduct);
                        });
                      } else {
                        removeItem(
                          variant.id,
                          false,
                          isRecalculate,
                          null,
                          updatedCheckoutMeta
                        ).then((res)=>{
                          handleRemove(res, boxLines);
                          if (boxItemsProducts && !res.errors.length) {
                            try {
                              document.querySelector("#applyCoupon_inputcode").value =
                                "";
                            } catch (err) {
                              console.log(err);
                            }
                          }
                        });
                      }
                    } else {
                      removeItem(
                        variant.id,
                        false,
                        isRecalculate,
                        null,
                        updatedCheckoutMeta
                      ).then((res)=>{
                        handleRemove(res, boxLines);
                        if (boxItemsProducts && !res.errors.length) {
                          try {
                            document.querySelector("#applyCoupon_inputcode").value =
                              "";
                          } catch (err) {
                            console.log(err);
                          }
                        }
                      });
                    }
                    // removeByobFromCheckoutMeta(
                    //   variant,
                    //   id,
                    //   quantity,
                    //   totalPrice,
                    //   res?.data
                    // );
                  } catch (err) {
                    console.log("Error in removing box item", err);
                  }
                }}
                // @ts-ignore
                onQuantityChange={(quantity, prevQuantity, setLoading) => {
                  setOpenCart(true);

                  updateItem(variant.id, quantity, prevQuantity, false).then(
                    res => {
                      setLoading(false);

                      if (res.data.lines.length) {
                        const newQuantity = res.data.lines.find(
                          (line: any) => line.variant.id === variant.id
                        ).quantity;
                        const errMsg = "Limited product stock!";
                        if (newQuantity === prevQuantity) {
                          show(OverlayType.message, OverlayTheme.modal, {
                            title: errMsg,
                            status: "error",
                          });
                        }
                      }
                      // refetch();
                    }
                  );
                  setLoading(true);
                }}
                thumbnail={{
                  ...variant?.product?.thumbnail,
                  alt: variant?.product?.thumbnail?.alt || "",
                }}
                totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
                weightValue={undefined}
                metadata={undefined}
                variant={variant}
                items={items}
                showDiscount
              />
            )
          )
        ) : (
          <></>
        )}
        {/* {console.log(
          "@@@@@@@@@",
          parseJson(getMetadataValue(checkout.metadata, "subscription_product"))
        )} */}
        {itemsInCart?.itemsToShow?.map(({ id, variant, quantity, totalPrice, productType, newQuantity }, index) => {
          return (
            <CartRow
              key={id ? `id-${id}-${index}` : `idx-${index}`}
              index={index}
              id={variant?.product?.id || ""}
              name={variant?.product?.name || ""}
              maxQuantity={variant.quantityAvailable || quantity}
              categorySlug={variant.product?.category?.slug || ""}
              quantity={quantity}
              newQuantity={newQuantity || quantity}
              freeProduct={productType === "free"}
              onRemove={(
                setLoading,
                upsell_id,
                items,
                freebie_id = null,
                freebie_quiz_ids = null
              ) => {
                const itemJourneyInfo = getItemJourneyInfo(variant.id);
                const dataCheckoutMeta: any =
                  (typeof window !== "undefined" &&
                    localStorage.getItem("data_checkout") &&
                    parseJson(localStorage.getItem("data_checkout"))) ||
                  [];


                const variantAttributeWeight: any =
                  (dataCheckoutMeta &&
                    dataCheckoutMeta?.metadata?.filter(
                      item => item?.key === "variant_attribute_weight"
                    )) ||
                  [];

                const searchWeightAttributeInCheckoutmeta =
                  Array.isArray(variantAttributeWeight) &&
                  !!variantAttributeWeight?.length
                    ? parseJson(variantAttributeWeight[0]?.value)?.find(
                        item => item?.variant_id === variant?.id
                      )
                    : [];

                const checkoutMetaData =
                  searchWeightAttributeInCheckoutmeta?.variant_id
                    ? [
                        getCheckoutMetaForVariantAttributeWeight(
                          variant.id,
                          dataCheckoutMeta?.metadata,
                          "REMOVE"
                        ),
                      ]
                    : null;

                const handleAfterRemove = (res, variant) => {
                  setLoading(false);
                  const { errors } = res;
                  if (errors?.length) {
                    let errMsg = "Something went wrong!";
                    switch (errors[0]?.code) {
                      case "PRODUCT_UNAVAILABLE_FOR_PURCHASE":
                        errMsg = "Product is unavailable for purchase";
                        break;
                      case "INSUFFICIENT_STOCK":
                        errMsg = "Product is out of stock";
                        break;
                      case "NOT_FOUND":
                        errMsg = "Product is either deleted or not found";
                        break;
                      default:
                        errMsg = "Something went wrong";
                        break;
                    }
                    show(OverlayType.message, OverlayTheme.modal, {
                      title: errMsg,
                      status: "error",
                    });
                  } else {
                    removeItemFromLinesJourney(variant.id);
                    const variantMetaData = variant?.metadata;
                    const variantConfig = variantMetaData &&
                      (getMetadataValue(variantMetaData, "variant_config") &&
                    parseJson(
                      getMetadataValue(variantMetaData, "variant_config")
                      ));

                    const RecentlyDeletedProducts = parseJson(
                      localStorage.getItem(RECENTLY_DELETED_PRODUCTS)
                    ) || [];

                    // handle Recently deleted Quiz products
                    if (
                      variantConfig &&
                      (variantConfig?.is_skin_quiz ||
                          variantConfig?.is_weight_quiz ||
                          variantConfig?.is_hair_quiz)
                    ) {
                      const findProductAlreadyExists = RecentlyDeletedProducts?.find(
                        item => item?.variantId === variant?.id
                      );
                      if(!findProductAlreadyExists) {
                        const listPrice = variantMetaData &&
                          (getMetadataValue(variantMetaData, "listPrice") &&
                            parseJson(
                              getMetadataValue(variantMetaData, "listPrice")
                            )) ||
                          variant?.pricing?.priceUndiscounted?.gross?.amount;

                        const productCardAttributes =
                          (getMetadataValue(variantMetaData, "product_card_attributes") &&
                            parseJson(
                              getMetadataValue(variantMetaData, "product_card_attributes")
                            )) ||
                          (getMetadataValue(variant?.product?.metadata, "product_card_attributes") &&
                            parseJson(getMetadataValue(variant?.product?.metadata, "product_card_attributes")));

                        const discountedPrice = Number(
                          variant?.pricing?.price?.gross?.amount
                        );

                        const tag =
                          productCardAttributes?.card_tag ||
                          (variant?.product?.tags?.length &&
                            variant?.product?.tags[0]?.name) ||
                          "";

                        const sortImages =
                          variant.images &&
                          variant.images
                            .slice()
                            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1));
    
                        const image =
                          variant.images && variant.images.length
                          ? sortImages[0].url
                          : variant?.product?.thumbnail?.url;
    
                        const totalDiscount = Math.ceil(
                          ((listPrice - discountedPrice) * 100) / listPrice
                        );
    
                        const averageRatingString =
                        (variantMetaData &&
                            getMetadataValue(
                              variantMetaData,
                              "average_rating"
                            )) ||
                        (variant?.product?.metadata && getMetadataValue(variant?.product?.metadata, "average_rating"));
                      
                        const averageRating = averageRatingString
                          ? parseFloat(averageRatingString) ? parseFloat(averageRatingString).toFixed(1) : '5.0'
                          : '5.0';
    
                        const productBasicInfo = {
                          name : variant?.product?.name,
                          variantId : variant?.id,
                          discountedPrice,
                          undiscountedPrice: listPrice,
                          totalDiscount,
                          rating: averageRating,
                          freebies: freebie_quiz_ids,
                          tag,
                          image,
                        };
                        RecentlyDeletedProducts.push(productBasicInfo);
                        try {
                          localStorage.setItem(
                            RECENTLY_DELETED_PRODUCTS,
                            JSON.stringify(RecentlyDeletedProducts)
                          );
                        } catch (err) {
                          console.log(
                            "error while saving recently deleted products"
                          );
                        }
                      }
                    }
                    // handle Recently deleted Quiz products
                    const subscription_product_skus =
                      res?.data?.metadata &&
                      getMetadataValue(
                        res?.data?.metadata,
                        "subscription_skus"
                      ) &&
                      parseJson(
                        getMetadataValue(
                          res?.data?.metadata,
                          "subscription_skus"
                        )
                      );

                    let checkoutMetaUpdateValue;
                    if (
                      Array.isArray(subscription_product_skus) &&
                      subscription_product_skus.includes(variant.sku)
                    ) {
                      const checkoutMetaForSubscription =
                        getCheckoutMetaForSubscription(
                          variant,
                          res?.data?.metadata,
                          "REMOVE"
                        );
                      if (
                        Array.isArray(checkoutMetaForSubscription) &&
                        !checkoutMetaForSubscription?.length
                      ) {
                        client.query({
                          query: removeTags,
                          variables: {
                            id: res?.data?.id,
                            input: ["subscription_product"],
                          },
                          fetchPolicy: "no-cache",
                        });
                      }
                      checkoutMetaUpdateValue = [
                        {
                          key: "subscription_skus",
                          value: JSON.stringify(checkoutMetaForSubscription),
                        },
                      ];

                      updateCheckoutMeta(checkoutMetaUpdateValue);
                    }

                    let totalQuantity = 0;
                    items?.forEach(item => {
                      totalQuantity += item.quantity;
                    });
                    const productUrl =
                      variant.product &&
                      generateProductUrl(
                        variant?.product.id,
                        variant?.product.name,
                        variant?.product.slug
                      );

                    skuToUserPropertyClevertap(variant?.sku, "REMOVE");
                    productRemovedFromCart(
                      variant?.product?.name || "",
                      variant?.product?.id || "",
                      variant?.pricing?.price,
                      quantity,
                      variant,
                      totalQuantity,
                      CartTotalPrice?.gross.amount,
                      couponDiscount,
                      productUrl,
                      hooksData,
                      itemJourneyInfo
                    );
                    removeItemFromLinesJourney(variant.id);
                    // if (recordCartPageClevertap) {
                    //   recordCartPageClevertap(
                    //     couponDiscount.amount,
                    //     prepaidDiscount.gross.amount
                    //   );
                    // }
                    // if (quantityChangeClevertap) {
                    //   quantityChangeClevertap(variant);
                    // }
                  }
                };

                if (freebie_quiz_ids) {
                  const checkProductWithFreebie = items
                    ?.filter(product => product?.variant?.id !== variant?.id)
                    ?.some(product => {
                      const variantMetadata = product?.variant?.metadata || [];
                      const freebie_quiz =
                        variantMetadata &&
                        getMetadataValue(
                          variantMetadata,
                          "freebie_with_quiz"
                        ) &&
                        parseJson(
                          getMetadataValue(variantMetadata, "freebie_with_quiz")
                        );
                      if (
                        freebie_quiz?.enable &&
                        Array.isArray(freebie_quiz?.products) &&
                        freebie_quiz?.products?.length
                      ) {
                        const isEqualArray = isEqual(
                          freebie_quiz?.products,
                          freebie_quiz_ids
                        );
                        return isEqualArray;
                      }
                      return false;
                    });

                  if (checkProductWithFreebie) {
                    removeItem(
                      variant.id,
                      false,
                      isRecalculate,
                      null,
                      checkoutMetaData
                    ).then(res => {
                      handleAfterRemove(res, variant);
                    });
                  } else {
                    const linesToRemove = freebie_quiz_ids?.reduce(
                      (acc, curr) => {
                        return [
                          ...acc,
                          {
                            variantId: getDBIdFromGraphqlId(
                              curr?.variant_id,
                              "ProductVariant"
                            ).toString(),
                            quantity: 0,
                          },
                        ];
                      },
                      []
                    );

                    linesToRemove.push({
                      variantId: getDBIdFromGraphqlId(
                        variant?.id,
                        "ProductVariant"
                      ).toString(),
                      quantity: 0,
                    });

                    updateItemWithLinesRest(
                      linesToRemove,
                      false,
                      true,
                      isRecalculate,
                      checkoutMetaData
                    ).then(res => {
                      linesToRemove?.forEach(lines => {
                        const variantId = getGraphqlIdFromDBId(
                          lines?.variantId,
                          "ProductVariant"
                        );
                        const removedVariant = items?.find(
                          product => product?.variant?.id === variantId
                        );
                        handleAfterRemove(res, removedVariant?.variant);
                      });
                    });
                  }
                } else {
                  removeItem(
                    variant.id,
                    false,
                    isRecalculate,
                    null,
                    checkoutMetaData
                  ).then(res => {
                    handleAfterRemove(res, variant);
                  });
                }
                // Remove upsell id from localstorage (Used for timer).
                localStorage.removeItem(`${upsell_id}`);
                // Remove upsell product as well if parent product is removed
                const upsellProduct =
                  upsell_id &&
                  items.filter(item => item.variant.id === upsell_id)?.length &&
                  items.filter(item => item.variant.id === upsell_id);

                if (
                  upsellProduct &&
                  Array.isArray(upsellProduct) &&
                  !!upsellProduct?.length
                ) {
                  removeItem(upsell_id, false, isRecalculate).then(res => {
                    const { errors } = res;
                    if (errors.length) {
                      let errMsg = "Something went wrong!";
                      switch (errors[0]?.code) {
                        case "PRODUCT_UNAVAILABLE_FOR_PURCHASE":
                          errMsg = "Product is unavailable for purchase";
                          break;
                        case "INSUFFICIENT_STOCK":
                          errMsg = "Product is out of stock";
                          break;
                        case "NOT_FOUND":
                          errMsg = "Product is either deleted or not found";
                          break;
                        default:
                          errMsg = "Something went wrong";
                          break;
                      }
                      show(OverlayType.message, OverlayTheme.modal, {
                        title: errMsg,
                        status: "error",
                      });
                    } else {
                      removeItemFromLinesJourney(upsell_id);
                      skuToUserPropertyClevertap(
                        upsellProduct[0]?.variant?.sku,
                        "REMOVE"
                      );
                    }
                  });
                }

                  const freebieProduct =
                  freebie_id &&
                  items.filter(item => item.variant.id === freebie_id) || [];
            
                // Freebie with products
                if (
                    freebieProduct &&
                  Array.isArray(freebieProduct) &&
                  !!freebieProduct?.length
                ) {
                  const checkOtherProducthaveSameFreebie = items
                  ?.filter(product => product?.variant?.id !== variant?.id)
                  ?.some(product => {
                    const variantMetadata = product?.variant?.metadata || [];
                    const freebieWithProduct =
                      variantMetadata &&
                      getMetadataValue(
                        variantMetadata,
                        "freebie_includes"
                      ) &&
                      parseJson(
                        getMetadataValue(variantMetadata, "freebie_includes")
                      );
                    if (
                      freebieWithProduct?.enable &&
                      freebieWithProduct?.variant_id
                    ) {
                      return true;
                    }
                    return false;
                  });
                    if (!checkOtherProducthaveSameFreebie) {
                    try {
                      removeItem(freebie_id, false).then(res => {
                        const { errors } = res;
                        if (errors.length) {
                          let errMsg = "Something went wrong!";
                          switch (errors[0]?.code) {
                            case "PRODUCT_UNAVAILABLE_FOR_PURCHASE":
                              errMsg = "Product is unavailable for purchase";
                              break;
                            case "INSUFFICIENT_STOCK":
                              errMsg = "Product is out of stock";
                              break;
                            case "NOT_FOUND":
                              errMsg = "Product is either deleted or not found";
                              break;
                            default:
                              errMsg = "Something went wrong";
                              break;
                          }
                          show(OverlayType.message, OverlayTheme.modal, {
                            title: errMsg,
                            status: "error",
                          });
                        } else {
                          productRemovedFromCart(
                            freebieProduct[0]?.variant?.product?.name || "",
                            freebieProduct[0]?.variant?.product?.id || "",
                            freebieProduct[0]?.variant?.pricing?.price,
                            quantity,
                            variant,
                            1,
                            CartTotalPrice?.gross.amount,
                            couponDiscount,
                            "",
                            hooksData,
                            itemJourneyInfo
                          );
                          removeItemFromLinesJourney(freebie_id);
                          skuToUserPropertyClevertap(
                            freebieProduct[0]?.variant?.sku,
                            "REMOVE"
                          );
                        }
                      });
                    } catch (err) {
                      console.log("freebie product remove", err);
                    }
                  }
                }
              }}
              // @ts-ignore
              onQuantityChange={(quantity, prevQuantity, setLoading) => {
                setOpenCart(true);

                updateItem(
                  variant.id,
                  quantity,
                  prevQuantity,
                  false,
                  isRecalculate
                ).then(res => {
                  setLoading(false);

                  if (res.data.lines.length) {
                    const newQuantity = res.data.lines.find(
                      (line: any) => line.variant.id === variant.id
                    ).quantity;
                    const errMsg = "Limited product stock!";
                    if (newQuantity === prevQuantity) {
                      show(OverlayType.message, OverlayTheme.modal, {
                        title: errMsg,
                        status: "error",
                      });
                    }
                  }
                  // refetch();
                });
                setLoading(true);
              }}
              thumbnail={{
                ...variant?.product?.thumbnail,
                alt: variant?.product?.thumbnail?.alt || "",
              }}
              totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
              unitPrice={<TaxedMoney taxedMoney={variant?.pricing?.price} />}
              sku={variant.sku}
              attributes={variant.attributes?.map(attribute => {
                return {
                  attribute: {
                    id: attribute.attribute.id,
                    name: attribute.attribute.name || "",
                  },
                  values:
                    Array.isArray(attribute.values) &&
                    attribute.values.map(value => {
                      return {
                        id: value?.id,
                        name: value?.name || "",
                        value: value?.value,
                      };
                    }),
                };
              })}
              weightValue={variant.product?.weight?.value}
              metadata={variant.product?.metadata}
              variant={variant}
              items={items}
              showDiscount
            />
          );
        })}

        {checkoutLoading && !openCart && items?.length == 0 ? (
          <ContainerSkeleton
            render={{
              image: true,
              description: false,
              title: true,
            }}
            headerSkeleton={false}
            cardCount={1}
            containerClass="plixlife__cartRow__skeleton__container"
            cardClass="plixlife__cartRow__skeleton__container__card"
          />
        ) : (
          <> </>
        )}
      </>
    );
  };

  const recordCartPageClevertap = (
    couponDiscount: number,
    prepaidDiscount: number
  ) => {
    const clevertap = makeClevertap();
    let totalQuantity = 0;
    items?.forEach(item => {
      totalQuantity += item.quantity;
    });

    if (clevertapEvents.cartPage.enable && loaded) {
      const extractp = {};
      const nonFreeProducts = items?.filter(
        item =>
          item.variant.sku &&
          item?.variant?.product?.category?.slug !== "free-gift-products" &&
          item?.variant?.product?.category?.slug !== "freebies-with-product"
      );
      for (let i = 0; i < nonFreeProducts?.length! && i < 3; i++) {
        // @ts-ignore
        extractp[`product ${i + 1} name`] =
          nonFreeProducts?.[i]?.variant?.product?.name;
        // @ts-ignore
        extractp[`product ${i + 1} price`] =
          nonFreeProducts?.[i]?.variant?.pricing?.price?.net?.amount;
        // @ts-ignore
        extractp[`product ${i + 1} url`] = generateProductUrl(
          nonFreeProducts?.[i]?.variant?.product?.id!,
          nonFreeProducts?.[i]?.variant?.product?.slug!
        );
        // @ts-ignore
        extractp[`product ${i + 1} image url`] =
          nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
        // @ts-ignore
        extractp[`product ${i + 1} quantity`] = nonFreeProducts?.[i]?.quantity;
        // @ts-ignore
        extractp[`product ${i + 1} total price`] =
          nonFreeProducts?.[i]?.totalPrice?.gross?.amount;
      }
      // @ts-ignore
      extractp["Products count"] = nonFreeProducts?.length;
      const ctp = {
        timeStamp: Date.now(),
        gaUserId: getGclid(),
        clickSource: utm_data,
        clickTarget: document.location.href,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        productName: items
          ?.map(item => {
            return item?.variant?.product?.name;
          })
          .toString(),
        "Product Price": items
          ?.map(item => {
            return item.variant.pricing?.price?.net?.amount;
          })
          .toString(),
        "Product Quantity": items
          ?.map(item => {
            return item.quantity;
          })
          .toString(),
        quantity: totalQuantity,
        "Coupon code": promoCodeDiscount?.voucherCode
          ? promoCodeDiscount?.voucherCode
          : "",
        couponName: promoCodeDiscount?.discountName,

        "Coupon discount": couponDiscount,
        "Order total": totalPrice?.gross?.amount,
        "Delivery Charges": shippingTaxedPrice.gross.amount, // TODO
        "Prepaid discount": prepaidDiscount, // TODO
        "Total discount": discount?.amount,
        cartAmount: totalPrice?.gross?.amount,
      };

      // //
      clevertap.event.push(clevertapEvents.cartPage.value, {
        ...ctp,
        ...extractp,
      });
    }
  };

  const { getWalletAmount, updateCheckoutMeta } = useCheckout();

  useEffect(() => {
    if (gtmConfig.cartPageVisible.enable && window?.dataLayer) {
      window.dataLayer.push({
        event: gtmConfig.cartPageVisible.value,
        eventLabel: "TRUE",
        eventAction: "Cart page visible",
        eventCategory: "Page visibility",
        user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out",
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
      });
    }
    localStorage.setItem("CartStatus", "Open");
    window.dispatchEvent(new Event("cart-opened"));
    return () => {
      sessionStorage.removeItem("CartStatus");
    };
  }, []);

  useEffect(() => {
    let totalQuantity = 0;
    const items_sku = [];
    items?.forEach(item => {
      totalQuantity += item.quantity;
      if (item.variant?.sku) items_sku.push(item.variant.sku);
    });

    if (gtmConfig.cartPage.enable && totalPrice?.gross?.amount) {
      //   if (user) {
      //     const clevertap = makeClevertap();
      //     getWalletAmount().then(walletAmount => {
      //       const ctp = {
      //         Name: `${user.firstName} ${user.lastName}`,
      //         Email: user.email,
      //         Phone: user?.defaultBillingAddress?.phone,
      //         Identity: user?.defaultBillingAddress?.phone,
      //         "Net Cashback": walletAmount.data,
      //       };
      //       //
      //       clevertap.onUserLogin.push({
      //         Site: ctp,
      //       });
      //     });
      //   }

      //   const clevertap = makeClevertap();
      //   if (clevertapEvents.pageVisit.enable) {
      //     clevertap.event.push(clevertapEvents.pageVisit.value, {
      //       gaUserId: getGclid(),
      //       clickSource: utm_data,
      //       timeStamp: Date.now(),
      //       pageTitle: document.title,
      //       customerEmail: user?.email,
      //       customerPhone: user?.defaultBillingAddress?.phone,
      //       quantity: items?.length || 0,
      //       URL: window.location.href,
      //     });
      //   }
      //   if (gtmConfig.pageViews.enable) {
      //     (window.dataLayer = window.dataLayer || []).push({
      //       event: gtmConfig.pageViews.value,
      //       ecommerce: {
      //         "Page Views": {
      //           URL: window.location.href,
      //           Title: "Cart:Plixlife",
      //         },
      //       },
      //     });
      //   }

      //   if (mrp?.amount) {
      //     recordCartPageClevertap();
      //   }
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.cartPage.value,
        ecommerce: {
          "Cart Page": {
            "Product name": items?.map(item => {
              return item?.variant?.product?.name;
            }),
            "Product Price": items?.map(item => {
              return item.variant.pricing?.price?.net?.amount;
            }),
            "Product Quantity": items?.map(item => {
              return item.quantity;
            }),
            "Products Sku": items_sku,
            "Total Quantity": totalQuantity,
            "Coupon code": promoCodeDiscount?.voucherCode,
            "Order total": subtotalPrice?.gross?.amount,
            "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
            "Total discount": discount?.amount,
            "Total Cart Value": totalPrice?.gross?.amount,
          },
        },
      });
    }
    const clevertap = makeClevertap();

    if (clevertapEvents.cartPage.enable && loaded) {
      const extractp = {};
      const nonFreeProducts = items?.filter(
        item =>
          item.variant.sku &&
          item?.variant?.product?.category?.slug !== "free-gift-products" &&
          item?.variant?.product?.category?.slug !== "freebies-with-product"
      );
      for (let i = 0; i < nonFreeProducts?.length! && i < 3; i++) {
        // @ts-ignore
        extractp[`product ${i + 1} name`] =
          nonFreeProducts?.[i]?.variant?.product?.name;
        // @ts-ignore
        extractp[`product ${i + 1} price`] =
          nonFreeProducts?.[i]?.variant?.pricing?.price?.net?.amount;
        // @ts-ignore
        extractp[`product ${i + 1} url`] = generateProductUrl(
          nonFreeProducts?.[i]?.variant?.product?.id!,
          nonFreeProducts?.[i]?.variant?.product?.slug!
        );
        // @ts-ignore
        extractp[`product ${i + 1} image url`] =
          nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
        // @ts-ignore
        extractp[`product ${i + 1} quantity`] = nonFreeProducts?.[i]?.quantity;
        // @ts-ignore
        extractp[`product ${i + 1} total price`] =
          nonFreeProducts?.[i]?.totalPrice?.gross?.amount;
      }
      // @ts-ignore
      extractp["Products count"] = nonFreeProducts?.length;
      const ctp = {
        timeStamp: Date.now(),
        gaUserId: getGclid(),
        clickSource: utm_data,
        clickTarget: document.location.href,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        productName: items
          ?.map(item => {
            return item?.variant?.product?.name;
          })
          .toString(),
        "Product Price": items
          ?.map(item => {
            return item.variant.pricing?.price?.net?.amount;
          })
          .toString(),
        "Product Quantity": items
          ?.map(item => {
            return item.quantity;
          })
          .toString(),
        quantity: totalQuantity,
        "Coupon code": promoCodeDiscount?.voucherCode
          ? promoCodeDiscount?.voucherCode
          : "",
        couponName: promoCodeDiscount?.discountName,
        "Order total": totalPrice?.gross?.amount,
        "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
        "Total discount": discount?.amount,
        cartAmount: totalPrice?.gross?.amount,
      };

      clevertap.event.push(clevertapEvents.cartPage.value, {
        ...ctp,
        ...extractp,
      });
    }

    if (ENABLE_GA4 && items?.length) {
      const cartItems = items?.map(item => {
        let productId;
        const categories = getItemCategoriesFromAttribute(item?.variant);
        const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
        const isMonthIncluded = categories?.sizeCategory2;
        const productVariantName = getVariantAttributes(
          "Flavors",
          item?.variant
        );
        const { listprice, discountedPrice, discountAmount } = getPrices(
          item?.variant?.product,
          false,
          item?.variant
        );
        try {
          productId = getDBIdFromGraphqlId(
            item?.variant?.product?.id,
            "Product"
          );
        } catch (error) {
          productId = null;
        }
        return {
          item_id: productId,
          item_name: item?.variant?.product?.name,
          item_brand: "plixlife",
          currency: "INR",
          quantity: item?.quantity,
          item_list_name: itemJourneyInfo?.addedFrom || "NA",
          item_list_id: itemJourneyInfo?.productListId || "NA",
          coupon: checkout?.voucherCode || "NA",
          item_category: item?.variant?.product?.category?.name,
          item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
          item_category3: categories?.sizeCategory1 || "NA",
          item_category4: isMonthIncluded
            ? "NA"
            : categories?.sizeCategory2 || "NA",
          price: discountedPrice,
          discount: discountAmount,
          item_variant: productVariantName,
        };
      });
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        gtmConfig.viewCart.enable
      ) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: gtmConfig.viewCart.value,
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
          ecommerce: {
            coupon: checkout?.voucherCode || "NA",
            currency: "INR",
            value: totalPrice?.gross?.amount,
            items: cartItems,
          },
        });
      }
    }
  }, [totalPrice?.gross?.amount]);

  const hooksData = {
    user,
    getWalletAmount,
    promoCodeDiscount,
    utm_data,
  };

  if (!loaded) return <Loader />;
  const isEmpty =
    loaded && items?.length && items[0].quantity > 0 && items[0].totalPrice;

  const overlayHook = useContext(OverlayContext);
  const { show } = overlayHook;

  const prepaidPercent = Math.round(
    prepaidDiscount && prepaidDiscount.gross.amount
      ? (prepaidDiscount.gross.amount /
          (totalPrice?.gross.amount + prepaidDiscount?.gross.amount)) *
          100
      : 0
  );

  const savingAmount =
    prepaidDiscount?.gross.amount +
    couponDiscount?.gross.amount +
    cashbackDiscount?.gross.amount;

  let metaWrapperContent: any;

  if (CLIENT == clients.BODY_FIRST) {
    metaWrapperContent = {
      title: "Cart-Bodyfirst",
      description: "Cart-Bodyfirst",
    };
  } else {
    metaWrapperContent = {
      title: "Cart-Plixlifefc",
      description: "Cart-Plixlifefc",
    };
  }
  return (
    <Cart
      emptyCart={isEmpty}
      // overlay={overlay}
      title=""
      cashbackRecieve={cashbackRecieve.amount}
      button={getCheckoutButton(history, user)}
      cartHeader={cartHeader}
      cashbackDiscountTaxedPrice={cashbackDiscount}
      cartFooter={prepareCartFooter(
        subtotalPrice,
        shippingPrice,
        couponDiscount,
        prepaidDiscount,
        totalPrice,
        cashbackDiscount,
        itemDiscount,
        netPrice,
        mrp
      )}
      continueShopping={getShoppingButton(history)}
      cart={generateCart(
        checkoutLoading,
        items,
        removeItemRest,
        updateItemRest,
        updateItemWithLinesRest,
        show,
        totalPrice,
        couponDiscount,
        hooksData
      )}
      totalDiscount={Number(
        (couponDiscount?.gross.amount + prepaidDiscount?.gross.amount).toFixed(
          2
        )
      )}
      totalPrice={totalPrice?.gross.amount}
      refetch={() => {
        return {};
      }}
      prepaidPercent={prepaidPercent}
      data-test="thisislotuscart"
      savingAmount={savingAmount}
      checkoutLoading={checkoutLoading}
    />
  );
};

export default React.memo(CartPage);