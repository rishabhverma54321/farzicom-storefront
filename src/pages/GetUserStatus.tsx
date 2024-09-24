import { checkoutDetails } from "@components/templates/AppHeader/queries";
import { useAuth, useCheckout } from "@saleor/sdk";
import { client } from "@temp/client";
import { getDBIdFromGraphqlId } from "@utils/core";
import {
  CSRF_TOKEN,
  REFRESH_TOKEN,
  getCSRFToken,
  getItemCategoriesFromAttribute,
  getItemJourneyInfo,
  getMetadataValue,
  getPrices,
  getRefreshToken,
  getUrlWithParams,
  getVariantAttributes,
  isBoxProduct,
  isMember,
  parseJson,
  setCSRFToken,
  setRefreshToken,
} from "@utils/misc";
import React, { useEffect, useCallback, useState } from "react";
import { ShopMetaContext } from "./_app.page";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import clevertapEvents from "@temp/themes/plixlifefc/lib/clevertapEvents";
import { getGclid, getUtmData, generateProductUrl } from "@temp/core/utils";
import { useRouter } from "next/router";
import { META_DEFAULTS } from "@temp/themes/plixlifefc/config";
import { beginCheckout } from "farzicom-ui/lib/Track/beginCheckout";
import { userDetailsQuery } from "@temp/gloablQueries/queries";

const GetUserStatus = () => {
  const { refreshToken, getUserCheckout } = useAuth();
  const router = useRouter();
  const token = router?.query?.token || null;
  const checkoutType = router?.query?.checkout_type || null;
  const { setCheckout } = useCheckout();
  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const gokwikConfig =
    getMetadataValue(ShopMetaContextValue, "gokwik_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "gokwik_config"));

  // kwickpass config
  let kwikpass_config =
    getMetadataValue(ShopMetaContextValue, "kwikpass_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "kwikpass_config"));
  const refreshTokenMutation = () => {
    return client.query<any, any>({
      query: userDetailsQuery,
      fetchPolicy: "cache-first",
    });
  };

  const addressShippingInfoDataLayer = () => {
    const checkoutData =
      (typeof window !== "undefined" &&
        localStorage.getItem("data_checkout") &&
        parseJson(localStorage.getItem("data_checkout"))) ||
      [];

    const getCSRFToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(CSRF_TOKEN))
        : null;

    const getRefreshToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(REFRESH_TOKEN))
        : null;

    const items = checkoutData?.lines;

    const ecommerce = {
      currency: "INR",
      coupon: checkoutData?.voucherCode || "NA",
      value: checkoutData?.totalPrice?.gross?.amount,
      items: items?.map(item => {
        const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
        const productVariantName = getVariantAttributes(
          "Flavors",
          item?.variant
        );
        const { discountAmount } = getPrices(
          item?.variant?.product,
          false,
          item?.variant
        );
        const categories = getItemCategoriesFromAttribute(item?.variant);
        const isMonthIncluded = categories?.sizeCategory2
          ?.toLowerCase()
          ?.includes("month");
        return {
          item_id: item.variant?.product?.id
            ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product")
            : null,
          item_name: item?.variant?.product?.name,
          item_brand: "plixlife",
          currency: "INR",
          quantity: item?.quantity,
          discount: discountAmount,
          coupon: checkoutData?.voucherCode || "NA",
          item_category: item?.variant?.product?.category?.name,
          item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
          item_category3: categories?.sizeCategory1 || "NA",
          item_category4: isMonthIncluded
            ? "NA"
            : categories?.sizeCategory2 || "NA",
          price: item?.variant?.pricing?.price?.gross?.amount,
          item_variant: productVariantName,
          item_list_name: itemJourneyInfo?.addedFrom || "NA",
          item_list_id: itemJourneyInfo?.productListId || "NA",
          index: "NA",
        };
      }),
    };

    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.addShippingInfo.enable &&
      gtmConfig.gkAddShippingInfo.enable
    ) {
      if (!!getCSRFToken && !!getRefreshToken) {
        refreshTokenMutation().then(res => {
          const user = res?.data?.user || {};
          window.dataLayer.push({ ecommerce: null });
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.addShippingInfo.value,
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            user_type: "logged_in",
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce,
          });
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.gkAddShippingInfo.value,
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            user_type: "logged_in",
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce,
          });
        });
      } else {
        window.dataLayer.push({ ecommerce: null });
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.addShippingInfo.value,
          user_type: "logged_out", // Guest user or Loggedin user
          ecommerce,
        });
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.gkAddShippingInfo.value,
          user_type: "logged_out", // Guest user or Loggedin user
          ecommerce,
        });
      }
    }
  };

  const paymentFailureDatalayer = paymentFailure => {
    const checkoutData =
      (typeof window !== "undefined" &&
        localStorage.getItem("data_checkout") &&
        parseJson(localStorage.getItem("data_checkout"))) ||
      [];

    const getCSRFToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(CSRF_TOKEN))
        : null;

    const getRefreshToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(REFRESH_TOKEN))
        : null;

    const items = checkoutData?.items;

    const clevertapPaymentFailure = user => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const todayDate = `${mm} + / + ${dd} + / + ${yyyy}`;

      const totalQuantity = items?.length
        ? items.reduce((total, curr) => {
            total += curr.quantity;
            return total;
          }, 0)
        : 0;
      return {
        platform: window.screen.width < 520 ? "msite" : "website",
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email || checkoutData?.email,
        customerPhone:
          user?.defaultShippingAddress?.phone ||
          checkoutData?.shippingAddress?.phone,
        quantity: totalQuantity,
        cartAmount: checkoutData?.totalPrice?.gross?.amount,
        price: checkoutData?.totalPrice?.gross?.amount,
        couponName: checkoutData?.voucherCode,
        orderAddressPin:
          checkoutData?.shippingAddress?.postalCode ||
          checkoutData?.billingAddress?.postalCode,
        orderAddressCity:
          checkoutData?.shippingAddress?.city ||
          checkoutData?.billingAddress?.city,
        couponAmount: checkoutData?.paymentMethod?.couponDiscount,
        paymentAmount: checkoutData?.totalPrice?.gross?.amount,
        paymentMode: paymentFailure?.payment_method || "",
        purchaseDate: todayDate,
      };
    };
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.paymentFailure.enable &&
      gtmConfig.gkAddPaymentInfo.enable
    ) {
      if (!!getCSRFToken && !!getRefreshToken) {
        refreshTokenMutation().then(res => {
          const user = res?.data?.user || {};

          if (clevertapEvents.paymentFailure.enable) {
            clevertap.event.push(clevertapEvents.paymentFailure.value, {
              ...clevertapPaymentFailure(user),
            });
          }
          window.dataLayer.push({
            event: gtmConfig.paymentFailure.value,
            eventCategory: gtmConfig.paymentFailure.value,
            eventAction: "payment_try_again_click",
            product_id: items
              ?.map(item => {
                if (item.id) {
                  return getDBIdFromGraphqlId(
                    item.variant?.id,
                    "ProductVariant"
                  );
                }
                return "";
              })
              .join("|"),
            user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
            user_type: "logged_in",
            product_price: checkoutData?.totalPrice?.gross?.amount,
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
          });
          window.dataLayer.push({
            event: gtmConfig.gkPaymentFailure.value,
            eventCategory: gtmConfig.gkPaymentFailure.value,
            eventAction: "payment_try_again_click",
            product_id: items
              ?.map(item => {
                if (item.id) {
                  return getDBIdFromGraphqlId(
                    item.variant?.id,
                    "ProductVariant"
                  );
                }
                return "";
              })
              .join("|"),
            user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
            user_type: "logged_in",
            product_price: checkoutData?.totalPrice?.gross?.amount,
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
          });
        });
      } else {
        if (clevertapEvents.paymentFailure.enable) {
          clevertap.event.push(clevertapEvents.paymentFailure.value, {
            ...clevertapPaymentFailure(null),
          });
        }
        window.dataLayer.push({
          event: gtmConfig.paymentFailure.value,
          eventCategory: gtmConfig.paymentFailure.value,
          eventAction: "payment_try_again_click",
          product_id: items
            ?.map(item => {
              if (item.id) {
                return getDBIdFromGraphqlId(item.variant?.id, "ProductVariant");
              }
              return "";
            })
            .join("|"),
          user_type: "logged_out",
          product_price: checkoutData?.totalPrice?.gross?.amount,
        });
        window.dataLayer.push({
          event: gtmConfig.gkPaymentFailure.value,
          eventCategory: gtmConfig.gkPaymentFailure.value,
          eventAction: "payment_try_again_click",
          product_id: items
            ?.map(item => {
              if (item.id) {
                return getDBIdFromGraphqlId(item.variant?.id, "ProductVariant");
              }
              return "";
            })
            .join("|"),
          user_type: "logged_out",
          product_price: checkoutData?.totalPrice?.gross?.amount,
        });
      }
    }
  };

  const addPaymentDatalayerInfo = paymentMethod => {
    const checkoutData =
      (typeof window !== "undefined" &&
        localStorage.getItem("data_checkout") &&
        parseJson(localStorage.getItem("data_checkout"))) ||
      [];

    const getCSRFToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(CSRF_TOKEN))
        : null;

    const getRefreshToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(REFRESH_TOKEN))
        : null;

    const items = checkoutData?.items;

    const ecommerce = {
      currency: "INR",
      value: checkoutData?.totalPrice?.gross?.amount,
      coupon: checkoutData?.voucherCode || "NA",
      payment_type: paymentMethod?.payment_method || "",
      items: items?.map(item => {
        const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
        const productVariantName = getVariantAttributes(
          "Flavors",
          item?.variant
        );
        const { discountAmount } = getPrices(
          item?.variant?.product,
          false,
          item?.variant
        );
        const categories = getItemCategoriesFromAttribute(item?.variant);
        const isMonthIncluded = categories?.sizeCategory2
          ?.toLowerCase()
          ?.includes("month");
        return {
          item_id: item.variant?.product?.id
            ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product")
            : "NA",
          item_name: item?.variant?.product?.name,
          item_brand: "plixlife",
          currency: "INR",
          quantity: item?.quantity,
          discount: discountAmount,
          coupon: checkoutData?.voucherCode || "NA",
          item_category: item?.variant?.product?.category?.name,
          item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
          item_category3: categories?.sizeCategory1 || "NA",
          item_category4: isMonthIncluded
            ? "NA"
            : categories?.sizeCategory2 || "NA",
          price: item?.variant?.pricing?.price?.gross?.amount,
          item_variant: productVariantName,
          item_list_name: itemJourneyInfo?.addedFrom || "NA",
          item_list_id: itemJourneyInfo?.productListId || "NA",
          index: "NA",
        };
      }),
    };

    const placeOrderEcommerce = {
      checkout_option: {
        actionField: { step: 3, option: "Place Order" },

        products: items?.map(item => ({
          name: item?.variant?.product?.name,
          id: item?.variant?.product?.id,
          price: item?.variant?.pricing?.price?.gross?.amount,
          brand: "Plixlife",
          category: item?.variant?.product?.category?.name,
          quantity: item?.quantity,
          variant: item?.variant?.name,
        })),
      },
    };

    const clevertapPaymentData = user => {
      const userAltEmail =
        user?.metadata &&
        getMetadataValue(user?.metadata, "alt_email") &&
        parseJson(getMetadataValue(user?.metadata, "alt_email"));

      const validUserMail =
        typeof user?.email === "string" && user?.email.includes("@example.com")
          ? userAltEmail
          : user?.email || null;

      let totalQuantity = 0;
      items?.forEach(item => {
        totalQuantity += item.quantity;
      });

      const utm_data = getUtmData(router?.pathname);

      return {
        platform: window.screen.width < 520 ? "msite" : "website",
        clickTarget: document.location.href,
        clickSource: utm_data,
        gaUserId: getGclid(),
        customerEmail: validUserMail || checkoutData?.email,
        customerPhone:
          user?.defaultShippingAddress?.phone ||
          checkoutData?.shippingAddress?.phone,
        quantity: totalQuantity,
        cartAmount: checkoutData?.totalPrice?.gross?.amount,
        productName: items
          ?.map(item => {
            return item?.variant?.product?.name;
          })
          .toString(),
        paymentMode: paymentMethod?.payment_method || "",
        paymentAmount: checkoutData?.totalPrice?.gross?.amount,
        orderAddressPin:
          checkoutData?.shippingAddress?.postalCode ||
          checkoutData?.billingAddress?.postalCode,
        orderAddressCity:
          checkoutData?.shippingAddress?.city ||
          checkoutData?.billingAddress?.city,
        state:
          checkoutData?.shippingAddress?.countryArea ||
          checkoutData?.billingAddress?.countryArea,
        couponAmount: checkoutData?.paymentMethod?.couponDiscount,
        walletAmount: checkoutData?.paymentMethod?.cashbackDiscountAmount,
        couponName: checkoutData?.voucherCode,
      };
    };

    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.addPaymentInfo.enable &&
      gtmConfig.gkAddPaymentInfo.enable
    ) {
      if (!!getCSRFToken && !!getRefreshToken) {
        refreshTokenMutation().then(res => {
          const user = res?.data?.user || {};
          window.dataLayer.push({ ecommerce: null });
          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.addPaymentInfo.value,
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            user_type: "logged_in", // Guest user or Loggedin user
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce,
          });
          window.dataLayer.push({
            event: "checkoutPlaceOrder",
            UserID: user ? getDBIdFromGraphqlId(user?.id, "User") : null,
            user_type: "logged_in",
            ecommerce: placeOrderEcommerce,
          });

          (window.dataLayer = window.dataLayer || []).push({
            event: gtmConfig.gkAddPaymentInfo.value,
            user_ID: user?.id
              ? getDBIdFromGraphqlId(user?.id, "User")
              : undefined,
            user_type: "logged_in", // Guest user or Loggedin user
            membership_status: isMember(user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
            ecommerce,
          });
          window.dataLayer.push({
            event: "gkCheckoutPlaceOrder",
            UserID: user ? getDBIdFromGraphqlId(user?.id, "User") : null,
            user_type: "logged_in",
            ecommerce: placeOrderEcommerce,
          });

          if (clevertapEvents.paymentInitiated.enable) {
            clevertap.event.push(clevertapEvents.paymentInitiated.value, {
              ...clevertapPaymentData(user),
            });
          }

          if (clevertapEvents.deliveryDetails.enable) {
            clevertap.event.push(clevertapEvents.deliveryDetails.value, {
              ...clevertapPaymentData(user),
            });
          }
        });
      } else {
        window.dataLayer.push({ ecommerce: null });
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.addPaymentInfo.value,
          user_type: "logged_out", // Guest user or Loggedin user
          ecommerce,
        });
        window.dataLayer.push({
          event: "checkoutPlaceOrder",
          user_type: "logged_out",
          ecommerce: placeOrderEcommerce,
        });
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.gkAddPaymentInfo.value,
          user_type: "logged_out", // Guest user or Loggedin user
          ecommerce,
        });
        window.dataLayer.push({
          event: "gkCheckoutPlaceOrder",
          user_type: "logged_out",
          ecommerce: placeOrderEcommerce,
        });

        if (clevertapEvents.paymentInitiated.enable) {
          clevertap.event.push(clevertapEvents.paymentInitiated.value, {
            ...clevertapPaymentData(null),
          });
        }

        if (clevertapEvents.deliveryDetails.enable) {
          clevertap.event.push(clevertapEvents.deliveryDetails.value, {
            ...clevertapPaymentData(null),
          });
        }
      }
    }
  };

  const checkoutReady = () => {
    const checkoutData =
      (typeof window !== "undefined" &&
        localStorage.getItem("data_checkout") &&
        parseJson(localStorage.getItem("data_checkout"))) ||
      [];

    const getCSRFToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(CSRF_TOKEN))
        : null;

    const getRefreshToken =
      typeof window !== "undefined"
        ? parseJson(localStorage.getItem(REFRESH_TOKEN))
        : null;

    const items = checkoutData?.lines || [];
    const isBoxItemInCart = items.filter(item => isBoxProduct(item)) || [];

    const ctp = user => {
      let totalbyobMrpInItems: number = 0;
      let totalbyobItemAmount: number = 0;
      let totalQuantity = 0;
      items?.forEach(item => {
        totalQuantity += item.quantity;
      });
      const utm_data = getUtmData(router.pathname);

      const boxItems: any =
        (getMetadataValue(checkoutData?.metadata, "byobItems") &&
          parseJson(getMetadataValue(checkoutData?.metadata, "byobItems"))) ||
        [];

      const userAltEmail =
        getMetadataValue(user?.metadata, "alt_email") &&
        parseJson(getMetadataValue(user?.metadata, "alt_email"));

      const validUserMail =
        typeof user?.email === "string" && user?.email.includes("@example.com")
          ? userAltEmail
          : user?.email;

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

      const mrp =
        checkoutData?.lines?.reduce((total, curr) => {
          const variantMetadata = curr?.variant?.metadata;

          const listPrice = getMetadataValue(variantMetadata, "listPrice");

          if (curr?.quantity) {
            if (listPrice && typeof listPrice === "number") {
              total += listPrice * curr.quantity;
            } else if (listPrice && typeof listPrice === "string") {
              total += parseFloat(listPrice) * curr.quantity;
            } else {
              total +=
                (curr?.variant.pricing?.priceUndiscounted?.gross?.amount ||
                  curr?.variant.pricing?.price?.gross?.amount ||
                  0) * curr.quantity;
            }
          } else {
            total += 0;
          }

          return total;
        }, 0) || 0;

      const netPrice =
        checkoutData?.lines?.reduce((total, curr) => {
          if (curr?.quantity) {
            const netPriceAmount =
              (curr?.variant.pricing?.priceUndiscounted?.gross?.amount ||
                curr?.variant.pricing?.price?.gross?.amount ||
                0) * curr.quantity;
            total += netPriceAmount;
          } else {
            total += 0;
          }
          return total;
        }, 0) || 0;

      const itemDiscount = mrp - netPrice;

      return {
        platform: window.screen.width > 520 ? "website" : "msite",
        timeStamp: Date.now(),
        gaUserId: getGclid(),
        customerEmail: validUserMail || checkoutData?.email,
        customerPhone:
          user?.defaultShippingAddress?.phone ||
          checkoutData?.shippingAddress?.phone,
        quantity: totalQuantity,
        cartAmount: checkoutData?.totalPrice?.gross?.amount,
        clickSource: utm_data,
        clickLabel: "Checkout",
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
        "Coupon code": checkoutData?.voucherCode
          ? checkoutData?.voucherCode
          : "",
        "Cart MRP": !!isBoxItemInCart.length
          ? Number(mrp) + totalbyobMrpInItems - totalbyobItemAmount
          : mrp,
        "Item Discount": !!isBoxItemInCart.length
          ? Number(itemDiscount) + totalbyobMrpInItems - totalbyobItemAmount
          : itemDiscount,
        "Net Price": netPrice,
        "Coupon discount": checkoutData?.paymentMethod?.couponDiscount,
        "Offer discount": checkoutData?.totalPrice?.gross.amount,
        "Order total": checkoutData?.totalPrice?.gross?.amount,
        "Delivery Charges": checkoutData?.shippingPrice?.gross.amount,
        "Prepaid discount": checkoutData?.paymentMethod?.prepaidDiscountAmount,
        "Total discount": checkoutData?.discount?.amount,
        "Total Cart Value": checkoutData?.totalPrice?.gross?.amount,
      };
    };

    const extractp = {};
    const nonFreeProducts = items?.filter(
      item => item?.variant?.product?.category?.slug !== "free-gift-products"
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

    extractp["Products count"] = nonFreeProducts?.length;

    if (!!getCSRFToken && !!getRefreshToken) {
      refreshTokenMutation().then(res => {
        const user = res?.data?.user || {};
        if (clevertapEvents.checkoutPage.enable) {
          clevertap.event.push(clevertapEvents.checkoutPage.value, {
            ...ctp(user),
            ...extractp,
          });
        }
        (window.dataLayer = window.dataLayer || []).push({
          event: "checkoutBegin",
          UserID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
          user_type: "logged_in",
          ecommerce: {
            checkout_option: {
              actionField: { step: 1, option: "Checkout Begin" },

              products: items?.map(item => ({
                name: item?.variant?.product?.name,
                id: item?.variant?.product?.id,
                price: item?.variant?.pricing?.price?.gross?.amount,
                brand: "Plixlife",
                category: item?.variant?.product?.category,
                quantity: item?.quantity,
                variant: item?.variant?.name,
              })),
            },
          },
        });
      });
    } else {
      if (clevertapEvents.checkoutPage.enable) {
        clevertap.event.push(clevertapEvents.checkoutPage.value, {
          ...ctp(null),
          ...extractp,
        });
      }

      (window.dataLayer = window.dataLayer || []).push({
        event: "checkoutBegin",
        user_type: "logged_out",
        ecommerce: {
          checkout_option: {
            actionField: { step: 1, option: "Checkout Begin" },

            products: items?.map(item => ({
              name: item?.variant?.product?.name,
              id: item?.variant?.product?.id,
              price: item?.variant?.pricing?.price?.gross?.amount,
              brand: "Plixlife",
              category: item?.variant?.product?.category,
              quantity: item?.quantity,
              variant: item?.variant?.name,
            })),
          },
        },
      });
    }

    try {
      const cartItems = items.map(item => {
        return {
          item_name: item?.variant?.product?.name,
          item_id: item?.variant?.product?.id,
          price: item?.variant?.pricing?.price?.gross?.amount,
          currency: item?.variant?.pricing?.price?.gross?.currency,
          variant: item?.variant?.name,
          quantity: item?.quantity,
        };
      });

      beginCheckout(ShopMetaContextValue, {
        cart_amount: checkoutData?.totalPrice?.gross?.amount,
        currency: checkoutData?.totalPrice?.gross?.currency,
        items: cartItems,
      });
    } catch (err) {
      console.log("fc-collect begin checkout error", err);
    }
  };

  const gokwikLoginSuccessfull = async loginInitated => {
    const phoneNumber = loginInitated?.phone_no;
    const checkoutData =
      (typeof window !== "undefined" &&
        localStorage.getItem("data_checkout") &&
        parseJson(localStorage.getItem("data_checkout"))) ||
      [];
    const url = `/checkout/address?token=${checkoutData?.token}`;
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.phoneOnCheckout.enable &&
      gtmConfig.gkPhoneOnCheckout.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.phoneOnCheckout.value,
        phoneNo: phoneNumber,
        userType: loginInitated?.user_type,
      });
      window.dataLayer.push({
        event: gtmConfig.gkPhoneOnCheckout.value,
        phoneNo: phoneNumber,
        userType: loginInitated?.user_type,
      });
    }
    clevertap.onUserLogin.push({
      Site: {
        Phone: `+91${phoneNumber}`,
        Identity: `91${phoneNumber}`,
        farzicom_checkout_url: url,
        "MSG-whatsapp": true,
      },
    });
  };

  const orderComplete = orderDetails => {
    const orderToken = orderDetails?.merchant_order_details?.token;
    if (orderToken) {
      gokwikSdk.close();
      router.push(
        getUrlWithParams("/order-placed", {
          redirect_from: "gokwik-checkout",
          token: orderToken,
        })
      );
      // getUserCheckout(false)
      setCheckout({}, false);
    }
  };

  const customerAttached = customer => {
    router.prefetch("/order-placed");
    const csrftoken = customer?.user_data?.csrfToken;
    const refreshtoken = customer?.user_data?.refreshToken;
    setCSRFToken(csrftoken);
    setRefreshToken(refreshtoken);
    refreshToken(true, csrftoken, refreshtoken);
  };

  // const checkoutClose = close => {
  //   console.log("checkout-close", close);
  //   setCustomerAttached(false);
  // };

  const couponApplied = () => {
    getUserCheckout(false);
  };

  //For initial checkout failure
  const checkoutInitialFailure = () => {
    // console.log('initial checkout failure')
    router.push(
      getUrlWithParams("/checkout/address", {
        redirect_from: "proceed-to-pay",
      })
    );
    gokwikSdk.close();
  };
  useEffect(() => {
    if (gokwikConfig && gokwikConfig?.enable) {
      gokwikSdk.on("user-login-successful", gokwikLoginSuccessfull);
      gokwikSdk.on("payment-failure", paymentFailureDatalayer);
      gokwikSdk.on("address-selected", addressShippingInfoDataLayer);
      gokwikSdk.on("payment-method-selected", addPaymentDatalayerInfo);
      gokwikSdk.on("order-complete", orderComplete);
      gokwikSdk.on("customer-attached", customerAttached);
      gokwikSdk.on("coupon-applied", couponApplied);
      gokwikSdk.on("checkout-ready", checkoutReady);
      gokwikSdk.on("checkout-initiation-failure", checkoutInitialFailure);
    }
  }, []);

  useEffect(() => {
    if (token && checkoutType) {
      const routerObj = router?.query;
      delete routerObj.checkout_type;
      delete routerObj.token;

      router.push(
        {
          pathname: router.pathname,
          query: routerObj,
        },
        undefined,
        { shallow: true }
      );

      if (gokwikConfig && gokwikConfig?.enable) {
        gokwikSdk.initCheckout({
          environment: gokwikConfig?.environment || "sandbox",
          type: gokwikConfig?.type || "merchantInfo",
          mid: gokwikConfig?.mid || "",
          merchantParams: {
            merchantCheckoutId: token || "",
          },
        });
      }
    }
  }, [token, checkoutType]);

  // For kwikPass
  useEffect(() => {
    if (kwikpass_config && kwikpass_config?.enable) {
      window.merchantInfo = {
        environment: kwikpass_config.environment
          ? kwikpass_config.environment
          : "sandbox",
        mid: kwikpass_config.mid ? kwikpass_config.mid : "<merchant_id>",
        type: kwikpass_config.type ? kwikpass_config.type : "merchantInfo",
      };
      if (typeof kpUpdateDOM == "function") {
        kpUpdateDOM();
        addEventListener("user_loggedin_merchant", (response: any) => {
          if (
            response?.detail?.accountCreate &&
            response?.detail?.accountCreate?.user
          ) {
            const {
              refreshToken: newRefreshToken,
              csrfToken,
            } = response?.detail?.accountCreate?.user;
            if (newRefreshToken != "" && csrfToken != "")
              setCSRFToken(csrfToken);
            setRefreshToken(newRefreshToken);
            refreshToken(true, csrfToken, newRefreshToken);
          } else if (response?.detail && response?.detail?.id) {
            const {
              refreshToken: newRefreshToken,
              csrfToken,
            } = response?.detail;
            if (newRefreshToken != "" && csrfToken != "")
              setCSRFToken(csrfToken);
            setRefreshToken(newRefreshToken);
            refreshToken(true, csrfToken, newRefreshToken);
          }
        });
      }
    }
  }, []);

  return <></>;
};

export default GetUserStatus;
