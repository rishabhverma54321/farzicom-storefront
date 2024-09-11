import {
  CheckoutLineFragment,
  RemoveItemResult,
  UpdateItemResult,
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
  UserFragment,
} from "@saleor/sdk";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IUseCustomHistory, useCustomHistory } from "@hooks/useCustomHistory";
import round from "lodash/round";
import { CartHeader } from "@components/atoms/CartHeader";

import { TaxedMoney } from "@components/containers/TaxedMoney";
import { CartSide } from "@components/molecules/CartSide";

import { BASE_URL } from "Themes/config";

import { checkoutMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";
import { generateProductUrl, getGclid, getUtmData } from "@temp/core/utils";

import {
  MetaWrapper,
  OverlayContext,
  OverlayTheme,
  OverlayType,
  OverlayContextInterface,
  ShowOverlayType,
} from "@temp/components";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js"; // @ts-check
import Cart from "./Cart";

import { CartRow } from "./CartRow/index";

import * as S from "./styles";
import { useCustomLocation } from "@hooks/useCustomLocation";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import { addToCartDataLayer } from "@utils/misc";

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
  hooksData?: any
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

  if (gtmConfig.removeFromCart.enable) {
    (window.dataLayer = window.dataLayer || []).push({
      event: "removeFromCart",
      ecommerce: {
        remove: {
          products: [
            {
              name,
              id,
              price: unitPrice,
              quantity,
            },
          ],
        },
      },
    });
  }

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
      cartAmount: totalPrice?.net?.amount,
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
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null,
  couponDiscount?: ITaxedMoney | null,
  prepaidDiscount?: ITaxedMoney | null,
  cashbackDiscount?: ITaxedMoney | null
) => {
  if (couponDiscount || prepaidDiscount) {
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
          couponDiscount={
            couponDiscount && (
              <TaxedMoney
                data-test="couponDiscount"
                taxedMoney={couponDiscount}
              />
            )
          }
          // totalPrice={<TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />}
          // mrp={<TaxedMoney data-test="mrp" taxedMoney={mrp} />}
          // netPrice={<TaxedMoney data-test="netPrice" taxedMoney={netPrice} />}
          // itemDiscount={
          //   <TaxedMoney data-test="itemDiscount" taxedMoney={itemDiscount} />
          // }

          prepaidDiscount={
            prepaidDiscount && (
              <TaxedMoney
                data-test="offerDiscount"
                taxedMoney={prepaidDiscount}
              />
            )
          }
        />
      </>
    );
  }
  return undefined;
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
}> = ({ overlay }) => {
  const history = useCustomHistory();

  const { user } = useAuthState();
  const {
    // checkout,
    // promoCodeDiscount,
    checkoutPaymentMethodUpdate,
    // availablePaymentGateways,
  } = useCheckout();

  const {
    checkout,
    promoCodeDiscount,
    availablePaymentGateways,
    checkoutLoading,
  } = useCheckoutState();

  // console.log("checkoutLoading", checkoutLoading);
  const {
    // loaded,
    removeItem,
    updateItem,
    // discount,
    // mrp,
    // netPrice,
    // itemDiscount,
    // offerDiscount,
    // prepaidDiscount,
    // cashbackDiscount,
    // cashbackRecieve,
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
  //console.log("total data",useCartState());
  const { pathname } = useCustomLocation();

  const utm_data = getUtmData(pathname);

  useEffect(() => {
    if (items?.length === 0) {
      //
      checkoutPaymentMethodUpdate({
        gateway: "mirumee.payments.razorpay",
        useCashback: false,
      });
    }
  }, [items?.length]);

  const [openCart, setOpenCart] = useState(false);

  const generateCart = (
    checkoutLoading: boolean,
    items: CheckoutLineFragment[],
    // removeItem: (data: Omit<myIProps, "quantity">) => any,
    removeItem: (variantId: string) => RemoveItemResult,
    updateItem: (
      variantId: string,
      quantity: number,
      prevQuantity: number
    ) => UpdateItemResult,

    show?: ShowOverlayType,
    CartTotalPrice?: any,
    // recordCartPageClevertap?: () => void,
    // quantityChangeClevertap?: (variant: any) => void,
    couponDiscount?: any,
    hooksData?: any
  ) => {
    // console.log("checkoutLoading", checkoutLoading);
    return (
      <>
        {items && items?.length ? (
          items?.map(({ id, variant, quantity, totalPrice }, index) => {
            return (
              <CartRow
                key={id ? `id-${id}` : `idx-${index}`}
                index={index}
                id={variant?.product?.id || ""}
                name={variant?.product?.name || ""}
                slug={variant?.product?.slug || ""}
                maxQuantity={variant.quantityAvailable || quantity}
                categorySlug={variant.product?.category?.slug || ""}
                quantity={quantity}
                onRemove={() => {
                  removeItem(variant.id).then(res => {
                    const errors = res.errors;
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
                      let totalQuantity = 0;
                      items?.forEach(item => {
                        totalQuantity += item.quantity;
                      });
                      const productUrl =
                        variant.product &&
                        generateProductUrl(
                          variant?.product.id,
                          variant?.product.name,
                          variant.product.slug
                        );
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
                        hooksData
                      );
                      // if (recordCartPageClevertap) {
                      //   recordCartPageClevertap();
                      // }
                      // if (quantityChangeClevertap) {
                      //   quantityChangeClevertap(variant);
                      // }
                    }
                  });
                }}
                // @ts-ignore
                onQuantityChange={(quantity, prevQuantity) => {
                  setOpenCart(true);
                  updateItem(variant.id, quantity, prevQuantity).then(res => {
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
                      } else if (quantity > prevQuantity) {
                        addToCartDataLayer(
                          res,
                          variant.product,
                          variant.id,
                          variant
                        );
                      }
                    }
                  });
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
                    values: attribute.values.map(value => {
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
                showVariantListPrice
              />
            );
          })
        ) : (
          <> </>
        )}

        {checkoutLoading && !openCart ? (
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

  // const recordCartPageClevertap = () => {
  //   const clevertap = makeClevertap();
  //   let totalQuantity = 0;
  //   items?.forEach(item => {
  //     totalQuantity += item.quantity;
  //   });

  //   if (clevertapEvents.cartPage.enable && loaded) {
  //     const extractp = {};
  //     const nonFreeProducts = items?.filter(
  //       item =>
  //         item.variant.sku &&
  //         item?.variant?.product?.category?.slug !== "free-gift-products"
  //     );
  //     for (let i = 0; i < nonFreeProducts?.length! && i < 3; i++) {
  //       // @ts-ignore
  //       extractp[`product ${i + 1} name`] =
  //         nonFreeProducts?.[i]?.variant?.product?.name;
  //       // @ts-ignore
  //       extractp[`product ${i + 1} price`] =
  //         nonFreeProducts?.[i]?.variant?.pricing?.price?.net?.amount;
  //       // @ts-ignore
  //       extractp[`product ${i + 1} url`] = generateProductUrl(
  //         nonFreeProducts?.[i]?.variant?.product?.id!,
  //         nonFreeProducts?.[i]?.variant?.product?.name!
  //       );
  //       // @ts-ignore
  //       extractp[`product ${i + 1} image url`] =
  //         nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
  //       // @ts-ignore
  //       extractp[`product ${i + 1} quantity`] = nonFreeProducts?.[i]?.quantity;
  //       // @ts-ignore
  //       extractp[`product ${i + 1} total price`] =
  //         nonFreeProducts?.[i]?.totalPrice?.net?.amount;
  //     }
  //     // @ts-ignore
  //     extractp["Products count"] = nonFreeProducts?.length;
  //     const ctp = {
  //       timeStamp: Date.now(),
  //       gaUserId: getGclid(),
  //       clickSource: utm_data,
  //       clickTarget: document.location.href,
  //       customerEmail: user?.email,
  //       customerPhone: user?.defaultBillingAddress?.phone,
  //       productName: items
  //         ?.map(item => {
  //           return item?.variant?.product?.name;
  //         })
  //         .toString(),
  //       "Product Price": items
  //         ?.map(item => {
  //           return item.variant.pricing?.price?.net?.amount;
  //         })
  //         .toString(),
  //       "Product Quantity": items
  //         ?.map(item => {
  //           return item.quantity;
  //         })
  //         .toString(),
  //       quantity: totalQuantity,
  //       "Coupon code": promoCodeDiscount?.voucherCode
  //         ? promoCodeDiscount?.voucherCode
  //         : "",
  //       couponName: promoCodeDiscount?.discountName,
  //       "Cart MRP": mrp?.amount,
  //       "Item Discount": itemDiscount?.amount,
  //       "Net Price": netPrice?.amount,
  //       "Coupon discount": couponDiscount?.amount,
  //       "Offer discount": offerDiscount?.amount,
  //       "Order total": totalPrice?.net?.amount,
  //       "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
  //       "Prepaid discount": prepaidDiscount?.amount, // TODO
  //       "Total discount": discount?.amount,
  //       cartAmount: totalPrice?.net?.amount,
  //     };

  //     // //
  //     clevertap.event.push(clevertapEvents.cartPage.value, {
  //       ...ctp,
  //       ...extractp,
  //     });
  //   }
  // };

  // const quantityChangeClevertap = async (variant: any) => {
  //   let totalQuantity = 0;
  //   items?.forEach(item => {
  //     totalQuantity += item.quantity;
  //   });
  //   let walletBalance;
  //   await getWalletAmount().then(walletAmount => {
  //     walletBalance = walletAmount.data;
  //   });
  //   const productUrl =
  //     variant.product &&
  //     generateProductUrl(variant?.product.id, variant?.product.name);
  //   const clevertap = makeClevertap();
  //   if (clevertapEvents.removeFromCart.enable) {
  //     clevertap.event.push(clevertapEvents.removeFromCart.value, {
  //       platform: window.screen.width < 520 ? "msite" : "website",
  //       timeStamp: Date.now(),
  //       clickTarget: document.location.href,
  //       customerEmail: user?.email,
  //       customerPhone: user?.defaultBillingAddress?.phone,
  //       orderAddressCity: user?.defaultBillingAddress?.city,
  //       quantity: totalQuantity,
  //       cartAmount: totalPrice?.net?.amount,
  //       couponAmount: couponDiscount?.amount,
  //       couponName: promoCodeDiscount?.discountName,
  //       productName: variant?.product?.name || "",
  //       productId: variant?.product?.id || "",
  //       price: variant?.pricing?.price.net.amount,
  //       productImage: variant?.product?.thumbnail,
  //       categoryName: variant?.product?.category?.name,
  //       productUrl,
  //       walletBalance,
  //       clickSource: utm_data,
  //       gaUserId: getGclid(),
  //     });
  //   }
  // };

  const { getWalletAmount } = useCheckout();

  const [cartPageFiredOnce, setCartPageFiredOnce] = useState(false);

  useEffect(() => {
    let totalQuantity = 0;
    items?.forEach(item => {
      totalQuantity += item.quantity;
    });

    if (gtmConfig.cartPage.enable && !checkoutLoading && !cartPageFiredOnce) {
      // console.log("checkoutLoading useeffect", checkoutLoading, items);
      setCartPageFiredOnce(true);
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
            "Total Quantitty": totalQuantity,
            "Coupon code": promoCodeDiscount?.voucherCode,
            "Cart MRP": mrp?.gross?.amount,
            "Item Discount": itemDiscount?.gross?.amount,
            "Net Price": netPrice?.gross?.amount,
            "Coupon discount": couponDiscount?.gross?.amount,
            "Offer discount": offerDiscount?.gross?.amount,
            "Order total": subtotalPrice?.gross?.amount,
            "Delivery Charges": shippingPrice?.gross?.amount,
            "Prepaid discount": prepaidDiscount?.gross.amount,
            "Total discount": discount?.amount,
            "Total Cart Value": totalPrice?.net?.amount,
          },
        },
      });
    }
  }, [checkoutLoading]);

  const hooksData = {
    user,
    getWalletAmount,
    promoCodeDiscount,
    utm_data,
  };

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

  return (
    <MetaWrapper
      meta={{
        title: "Cart-Wow",
        description: "Cart-Wow",
      }}
    >
      <Cart
        emptyCart={isEmpty}
        overlay={overlay}
        title=""
        cashbackRecieve={cashbackRecieve.amount}
        button={getCheckoutButton(history, user)}
        cartHeader={cartHeader}
        //cashbackDiscountTaxedPrice={cashbackDiscountTaxedPrice}
        cartFooter={prepareCartFooter(
          totalPrice,
          shippingPrice,
          subtotalPrice,
          couponDiscount,
          prepaidDiscount,
          cashbackDiscount
        )}
        continueShopping={getShoppingButton(history)}
        cart={generateCart(
          checkoutLoading,
          items,
          removeItem,
          updateItem,
          show,
          totalPrice,
          couponDiscount,
          hooksData
        )}
        totalDiscount={Number(
          (
            couponDiscount?.gross.amount + prepaidDiscount?.gross.amount
          ).toFixed(2)
        )}
        totalPrice={totalPrice?.gross.amount}
        refetch={() => {
          return {};
        }}
        prepaidPercent={prepaidPercent}
        data-test="thisislotuscart"
        checkoutLoading={checkoutLoading}
      />
    </MetaWrapper>
  );
};
