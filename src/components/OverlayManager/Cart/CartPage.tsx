import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useCheckoutState,
  useWallet,
} from "@saleor/sdk";
import { History } from "history";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useCustomHistory } from "@hooks/useCustomHistory";
import round from "lodash/round";
import { CartHeader } from "@components/atoms/CartHeader";
import { Loader } from "@components/atoms/Loader";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import { CartSide } from "@components/molecules/CartSide";
// import { CartEmpty } from "@components/templates";
// import Empty from "./Empty";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { UserDetails_me } from "@saleor/sdk/lib/queries/gqlTypes/UserDetails";
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
} from "@temp/components";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js"; // @ts-check
import Cart from "./Cart";

import { CartRow } from "./CartRow/index";
// import { IProps } from "./types";

import * as S from "./styles";
import { useCustomLocation } from "@hooks/useCustomLocation";

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
const getShoppingButton = (history: History) => (
  <S.ContinueStyledButton
    testingContext="cartPageContinueShoppingButton"
    onClick={() => history.push(BASE_URL)}
  >
    <FormattedMessage {...checkoutMessages.continueShopping} />
  </S.ContinueStyledButton>
);

const getCheckoutButton = (history: History, user?: UserDetails_me | null) => (
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
  setCouponPrepaidDiscounts: setCouponPrepaidDiscountsType,
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  couponDiscount?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null,
  mrp?: ITaxedMoney | null,
  netPrice?: ITaxedMoney | null,
  itemDiscount?: ITaxedMoney | null,
  offerDiscount?: ITaxedMoney | null,
  prepaidDiscount?: ITaxedMoney | null
) => {
  if (couponDiscount || offerDiscount || prepaidDiscount) {
    return (
      <>
        {/* <LotusApplyCoupon setCouponPrepaidDiscounts={setCouponPrepaidDiscounts} /> */}

        <CartSide
          // subtotalPrice={
          //   <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
          // }
          // shippingPrice={
          //   shippingTaxedPrice && (
          //     <TaxedMoney
          //       data-test="shippingPrice"
          //       taxedMoney={shippingTaxedPrice}
          //     />
          //   )
          // }
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
          offerDiscount={
            offerDiscount && (
              <TaxedMoney
                data-test="offerDiscount"
                taxedMoney={offerDiscount}
              />
            )
          }
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

export const GenerateCart = (
  items: IItems,
  // removeItem: (data: Omit<myIProps, "quantity">) => any,
  removeItem: (variantId: string, quantity: number) => any,
  updateItem: (
    variantId: string,
    quantity: number,
    prevQuantity: number
  ) => any,
  // recordCartPageClevertap?: () => void,
  // quantityChangeClevertap?: (variant: any) => void,
  couponDiscount?: any,
  hooksData?: any
) => {
  //
  const overlay = useContext(OverlayContext);
  const { totalPrice: CartTotalPrice } = useCart();

  const { show } = overlay;
  return items?.map(({ id, variant, quantity, totalPrice }, index) => {
    return (
      <CartRow
        key={id ? `id-${id}` : `idx-${index}`}
        index={index}
        id={variant?.product?.id || ""}
        name={variant?.product?.name || ""}
        maxQuantity={variant.quantityAvailable || quantity}
        categorySlug={variant.product?.category?.slug || ""}
        quantity={quantity}
        onRemove={() => {
          removeItem(variant.id, quantity).then(
            (res: { error: { code: any }[] }) => {
              if (res?.error) {
                let errMsg = "Something went wrong!";
                switch (res?.error[0]?.code) {
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
                    variant?.product.slug
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
            }
          );
        }}
        // @ts-ignore
        onQuantityChange={(quantity, prevQuantity) =>
          updateItem(variant.id, quantity, prevQuantity).then(
            (response: { [key: string]: any }) => {
              if (response.data.lines.length) {
                const newQuantity = response.data.lines.find(
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
            }
          )
        }
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
      />
    );
  });
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

export const CartPage: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const history = useCustomHistory();
  const { user } = useAuthState();
  const { checkoutPaymentMethodUpdate, getWalletAmount } = useCheckout();

  const {
    checkout,
    promoCodeDiscount,
    availablePaymentGateways,
  } = useCheckoutState();

  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
    mrp,
    netPrice,
    itemDiscount,
    offerDiscount,
    prepaidDiscount,
    cashbackDiscount,
    cashbackRecieve,
  } = useCart();

  const [checkoutDiscounts, setCheckoutDiscounts] = useState({
    couponAmount: 0,
    prepaidAmount: 0,
    cashbackAmount: 0,
  });

  // useEffect(() => {
  //   getLatestCheckout();
  // }, []);

  const couponDiscount = {
    amount: checkoutDiscounts.couponAmount,
    currency: "INR",
  };
  const offerDiscountAmount =
    prepaidDiscount &&
    (offerDiscount && offerDiscount.amount ? offerDiscount.amount : 0) -
      couponDiscount.amount;

  const totalOfferDiscount = {
    amount: offerDiscountAmount!,
    currency: "INR",
  };

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;

  const mrpTaxedPrice = mrp && {
    gross: mrp,
    net: mrp,
  };

  const netPriceTaxedPrice = netPrice && {
    gross: netPrice,
    net: netPrice,
  };

  const itemDiscountTaxedPrice = itemDiscount && {
    gross: itemDiscount,
    net: itemDiscount,
  };

  const offerDiscountTaxedPrice = totalOfferDiscount &&
    totalOfferDiscount.amount !== 0 && {
      gross: totalOfferDiscount,
      net: totalOfferDiscount,
    };

  const couponDiscountTaxedPrice = couponDiscount &&
    couponDiscount.amount !== 0 && {
      gross: couponDiscount,
      net: couponDiscount,
    };

  const prepaidDiscountTaxedPrice = prepaidDiscount &&
    prepaidDiscount.amount !== 0 && {
      gross: prepaidDiscount,
      net: prepaidDiscount,
    };

  const cashbackDiscountTaxedPrice = cashbackDiscount && {
    gross: cashbackDiscount,
    net: cashbackDiscount,
  };

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

  const totalDiscount = getTotalDiscount([
    offerDiscountTaxedPrice,
    couponDiscountTaxedPrice,
    itemDiscountTaxedPrice,
    prepaidDiscountTaxedPrice,
    cashbackDiscountTaxedPrice,
  ]);
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

  const recordCartPageClevertap = () => {
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
          item?.variant?.product?.category?.slug !== "free-gift-products"
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
          nonFreeProducts?.[i]?.variant?.product?.name!
        );
        // @ts-ignore
        extractp[`product ${i + 1} image url`] =
          nonFreeProducts?.[i]?.variant?.product?.thumbnail?.url;
        // @ts-ignore
        extractp[`product ${i + 1} quantity`] = nonFreeProducts?.[i]?.quantity;
        // @ts-ignore
        extractp[`product ${i + 1} total price`] =
          nonFreeProducts?.[i]?.totalPrice?.net?.amount;
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
        "Cart MRP": mrp?.amount,
        "Item Discount": itemDiscount?.amount,
        "Net Price": netPrice?.amount,
        "Coupon discount": couponDiscount?.amount,
        "Offer discount": offerDiscount?.amount,
        "Order total": totalPrice?.net?.amount,
        "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
        "Prepaid discount": prepaidDiscount?.amount, // TODO
        "Total discount": discount?.amount,
        cartAmount: totalPrice?.net?.amount,
      };

      // //
      clevertap.event.push(clevertapEvents.cartPage.value, {
        ...ctp,
        ...extractp,
      });
    }
  };

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

  useEffect(() => {
    let totalQuantity = 0;
    items?.forEach(item => {
      totalQuantity += item.quantity;
    });

    if (user) {
      const clevertap = makeClevertap();
      getWalletAmount().then(walletAmount => {
        const ctp = {
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Phone: user?.defaultBillingAddress?.phone,
          Identity: user?.defaultBillingAddress?.phone,
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      });
    }

    const clevertap = makeClevertap();
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }

    recordCartPageClevertap();

    if (gtmConfig.cartPage.enable) {
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
            "Cart MRP": mrp?.amount,
            "Item Discount": itemDiscount?.amount,
            "Net Price": netPrice?.amount,
            "Coupon discount": couponDiscount?.amount,
            "Offer discount": offerDiscount?.amount,
            "Order total": subtotalPrice?.net?.amount,
            "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
            "Prepaid discount": prepaidDiscount?.amount, // TODO
            "Total discount": discount?.amount,
            "Total Cart Value": totalPrice?.net?.amount,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (availablePaymentGateways?.length)
      checkoutPaymentMethodUpdate({
        gateway: availablePaymentGateways[0].id,
        useCashback: false,
      });
  }, []);
  const hooksData = {
    user,
    getWalletAmount,
    promoCodeDiscount,
    utm_data,
  };

  const sanitizeStrip =
    items?.filter(item => item.variant.id === "UHJvZHVjdFZhcmlhbnQ6ODY=") &&
    items?.filter(item => item.variant.id === "UHJvZHVjdFZhcmlhbnQ6ODY=")
      .length > 0
      ? `Congratulations!♡ 10% of your total order value contributes to the
funds of Wildlife Trust of India
Congrats! 100% of the Limited Edition Box value contributes to the funds of Wildlife Trust of India. You’re now a Sustainable Ambassador!
`
      : `Congratulations!♡ 10% of your total order value contributes to the
funds of Wildlife Trust of India`;

  if (!loaded) return <Loader />;
  const isEmpty =
    loaded && items?.length && items[0].quantity > 0 && items[0].totalPrice;
  return (
    <MetaWrapper
      meta={{
        title: "Cart-Lotus Organics+",
        description: "Cart-Lotus Organics+",
      }}
    >
      <Cart
        emptyCart={isEmpty}
        overlay={overlay}
        setCheckoutDiscounts={setCheckoutDiscounts}
        title=""
        button={getCheckoutButton(history, user)}
        cartHeader={cartHeader}
        cartFooter={prepareCartFooter(
          setCheckoutDiscounts,
          totalPrice,
          shippingTaxedPrice,
          couponDiscountTaxedPrice,
          subtotalTaxedPrice,
          mrpTaxedPrice,
          netPriceTaxedPrice,
          itemDiscountTaxedPrice,
          offerDiscountTaxedPrice,
          prepaidDiscountTaxedPrice
        )}
        continueShopping={getShoppingButton(history)}
        cart={
          items &&
          GenerateCart(items, removeItem, updateItem, couponDiscount, hooksData)
        }
        sanitizeStrip={sanitizeStrip}
        totalDiscount={totalDiscount}
        cashbackRecieve={cashbackRecieve?.amount}
        totalPrice={totalPrice?.gross.amount}
      />
    </MetaWrapper>
  );

  // return (
  //   <MetaWrapper
  //     meta={{
  //       title: "Cart-Ikkai Beauty",
  //       description: "Cart-Ikkai Beauty",
  //     }}
  //   >
  //     <Cart overlay={overlay}>
  //       <Empty overlayHide={overlay.hide} />
  //     </Cart>
  //     {/* <CartEmpty button={getShoppingButton(history)} /> */}
  //   </MetaWrapper>
  // );
};
