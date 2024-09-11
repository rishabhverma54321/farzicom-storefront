import {
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useWallet,
} from "@saleor/sdk";
import { History } from "history";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import round from "lodash/round";
import { CartHeader } from "@components/atoms/CartHeader";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { Loader } from "@components/atoms/Loader";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import { ApplyCoupon } from "@components/molecules/ApplyCoupon";
import { CartSide } from "@components/molecules/CartSide";
// import { CartEmpty, Cart } from "@components/templates";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { UserDetails_me } from "@saleor/sdk/lib/queries/gqlTypes/UserDetails";
import { BASE_URL, CLIENT, META_DEFAULTS } from "Themes/config";
import { checkoutMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";
import { useCustomHistory } from "@hooks/useCustomHistory";

import { generateProductUrl } from "@temp/core/utils";

import {
  MetaWrapper,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { CartRowIkkai } from "@components/organisms/CartRowIkkai";
import { CartRow } from "@components/organisms/CartRow";

// @ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";
// @ts-ignore
import clevertapEvents from "Themes/lib/clevertapEvents.js";
// @ts-ignore
import gtmConfig from "Themes/lib/gtmConfig.js"; // @ts-check
import * as S from "./styles";
import { IProps } from "./types";
import { clients } from "../../../../gqlTypes/customGlobalTypes";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { Cart } from "@components/templates/Cart";
import { CartEmpty } from "@components/templates/CartEmpty";

const title = <CollectionHeadingIkkai Heading="Cart" />;
const productRemovedFromCart = (
  name: string,
  id: string,
  unitPrice: React.ReactNode,
  quantity: number
) => {
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
    clevertap.event.push(clevertapEvents.removeFromCart, {
      products: [
        {
          name,
          id,
          price: unitPrice,
          quantity,
        },
      ],
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
) => (
  <>
    <ApplyCoupon setCouponPrepaidDiscounts={setCouponPrepaidDiscounts} />

    <CartSide
      subtotalPrice={
        <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
      }
      shippingPrice={
        shippingTaxedPrice &&
        shippingTaxedPrice.gross.amount !== 0 && (
          <TaxedMoney
            data-test="shippingPrice"
            taxedMoney={shippingTaxedPrice}
          />
        )
      }
      couponDiscount={
        <TaxedMoney data-test="couponDiscount" taxedMoney={couponDiscount} />
      }
      totalPrice={<TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />}
      mrp={<TaxedMoney data-test="mrp" taxedMoney={mrp} />}
      netPrice={<TaxedMoney data-test="netPrice" taxedMoney={netPrice} />}
      itemDiscount={
        <TaxedMoney data-test="itemDiscount" taxedMoney={itemDiscount} />
      }
      offerDiscount={
        <TaxedMoney data-test="offerDiscount" taxedMoney={offerDiscount} />
      }
      prepaidDiscount={
        <TaxedMoney data-test="offerDiscount" taxedMoney={prepaidDiscount} />
      }
    />
  </>
);

const generateCart = (
  items: IItems,
  // removeItem: (data: Omit<myIProps, "quantity">) => any,
  removeItem: (variantId: string, quantity: number) => any,
  updateItem: (
    variantId: string,
    quantity: number,
    prevQuantity: number
  ) => any,
  recordCartPageClevertap: () => void
) => {
  //
  const overlay = useContext(OverlayContext);

  const { show } = overlay;
  return items?.map(({ id, variant, quantity, totalPrice }, index) => {
    if (CLIENT === "ikkai")
      return (
        <CartRowIkkai
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
                  recordCartPageClevertap();
                  productRemovedFromCart(
                    variant?.product?.name || "",
                    variant?.product?.id || "",
                    variant?.pricing?.price,
                    quantity
                  );
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
                  } else {
                    recordCartPageClevertap();
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
                recordCartPageClevertap();
                productRemovedFromCart(
                  variant?.product?.name || "",
                  variant?.product?.id || "",
                  variant?.pricing?.price,
                  quantity
                );
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
                } else {
                  recordCartPageClevertap();
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

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const history = useCustomHistory();
  const { pathname } = useCustomLocation();
  const { user } = useAuthState();
  const {
    checkout,
    promoCodeDiscount,
    //   checkoutPaymentMethodUpdate,
    // getLatestCheckout,
    availablePaymentGateways,
  } = useCheckout();
  const {
    // loaded,
    removeItem,
    updateItem,
    // items,
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

  const loaded = true;
  const { items } = useCartState();
  const [checkoutDiscounts, setCheckoutDiscounts] = useState({
    couponAmount: 0,
    prepaidAmount: 0,
    cashbackAmount: 0,
  });

  useEffect(() => {
    // getLatestCheckout();
  }, []);

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

  const offerDiscountTaxedPrice = totalOfferDiscount && {
    gross: totalOfferDiscount,
    net: totalOfferDiscount,
  };

  const couponDiscountTaxedPrice = couponDiscount && {
    gross: couponDiscount,
    net: couponDiscount,
  };

  const prepaidDiscountTaxedPrice = prepaidDiscount && {
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

  useEffect(() => {
    // if (items?.length === 0) {
    //   checkoutPaymentMethodUpdate({
    //     gateway: "mirumee.payments.razorpay",
    //     useCashback: false,
    //   });
    // }
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
        "Product name": items
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
        "Total Quantitty": totalQuantity,
        "Coupon code": promoCodeDiscount?.voucherCode
          ? promoCodeDiscount?.voucherCode
          : "",
        "Cart MRP": mrp?.amount,
        "Item Discount": itemDiscount?.amount,
        "Net Price": netPrice?.amount,
        "Coupon discount": couponDiscount?.amount,
        "Offer discount": offerDiscount?.amount,
        "Order total": totalPrice?.net?.amount,
        "Delivery Charges": shippingTaxedPrice?.net?.amount, // TODO
        "Prepaid discount": prepaidDiscount?.amount, // TODO
        "Total discount": discount?.amount,
        "Total Cart Value": totalPrice?.net?.amount,
      };
      // //
      clevertap.event.push(clevertapEvents.cartPage.value, {
        ...ctp,
        ...extractp,
      });
    }
  };

  // const { getWalletAmount } = useWallet();

  useEffect(() => {
    let totalQuantity = 0;
    items?.forEach(item => {
      totalQuantity += item.quantity;
    });

    // if (user) {
    //   const clevertap = makeClevertap();
    //   getWalletAmount().then(walletAmount => {
    //     const ctp = {
    //       Name: `${user.firstName} ${user.lastName}`,
    //       Email: user.email,
    //       Phone: user?.defaultBillingAddress?.phone,
    //       Identity: user?.defaultBillingAddress?.phone,
    //       "Net Cashback": walletAmount.data,
    //     };
    //     //
    //     clevertap.onUserLogin.push({
    //       Site: ctp,
    //     });
    //   });
    // }

    const clevertap = makeClevertap();
    if (clevertapEvents.pageViews.enable) {
      clevertap.event.push(clevertapEvents.pageViews.value, {
        URL: window.location.href,
        Title: `Cart-${META_DEFAULTS.title}`,
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
    // if (availablePaymentGateways?.length)
    // checkoutPaymentMethodUpdate({
    //   gateway: availablePaymentGateways[0].id,
    //   useCashback: false,
    // });
  }, []);

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
  // if (CLIENT === clients.PLIXLIFEFC)
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/",
  //         state: { referrer: pathname },
  //       }}
  //     />
  //   );
  if (!loaded) return <Loader />;
  if (loaded && items?.length && items[0].quantity > 0 && items[0].totalPrice) {
    return (
      <MetaWrapper
        meta={{
          title: `Cart-${META_DEFAULTS.title}`,
          description: `Cart-${META_DEFAULTS.title}`,
        }}
      >
        <Cart
          title={title}
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
            generateCart(items, removeItem, updateItem, recordCartPageClevertap)
          }
          sanitizeStrip={sanitizeStrip}
          totalDiscount={totalDiscount}
          cashbackRecieve={cashbackRecieve?.amount}
          totalPrice={totalPrice?.gross.amount}
        />
      </MetaWrapper>
    );
  }
  return (
    <MetaWrapper
      meta={{
        title: `Cart-${META_DEFAULTS.title}`,
        description: `Cart-${META_DEFAULTS.title}`,
      }}
    >
      <CartEmpty button={getShoppingButton(history)} />
    </MetaWrapper>
  );
};
