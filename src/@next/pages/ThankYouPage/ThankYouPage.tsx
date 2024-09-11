import React, { useEffect, useState } from "react";
// import { useWallet } from "@saleor/sdk";
import { ThankYouIkkai } from "@components/organisms/ThankYouIkkai";
import { ThankYou } from "@components/organisms/ThankYou";

import {
  BASE_URL,
  CLIENT,
  CLIENT_INITIALS,
  META_DEFAULTS,
} from "Themes/config";
import { getUtmData } from "@temp/core/utils";
import { CartEmpty } from "@components/templates/CartEmpty";
import { OrderByToken_orderByToken_metadata } from "@saleor/sdk/lib/queries/gqlTypes/OrderByToken";
import { TypedGetCashback } from "@components/organisms/CartSummary/queries";
import { getMetadataValue } from "@utils/misc";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { IProps } from "./types";

const ThankYouPage: React.FC<IProps> = ({}: IProps) => {
  const location = useCustomLocation();
  const history = useCustomHistory();
  const clevertap = makeClevertap();
  const {
    order,
    user,
    items,
    mrp,
    itemDiscount,
    offerDiscount,
    // id,
    couponName,
    paymentMethod,
    cartPrice,
  } = location.state;
  // const { getWalletAmount } = useWallet();
  const clevertapItems =
    items && items.length
      ? items.map(item => ({
          Title: item?.variant?.product.name,
          Quantity: item?.quantity,
          Vendor: META_DEFAULTS.name,
          Price: item?.variant?.pricing?.price?.gross.amount,
          Sku: item?.variant?.sku,
        }))
      : [];

  const shopifyOrderNumber =
    order?.metadata && getMetadataValue(order?.metadata, "shopify_order_name");

  const cashbackDiscount = getMetadataValue(
    order?.metadata,
    "cashback_discount",
    0
  );
  const couponAmount = getMetadataValue(order?.metadata, "coupon_discount", 0);

  //
  const getZee5Coupon = (metadata: OrderByToken_orderByToken_metadata[]) => {
    const zee5 = metadata.find(data => data.key === "zee5_test_coupon");
    if (zee5) {
      return zee5.value;
    }
    return undefined;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(0);
  const { pathname } = useCustomLocation();

  useEffect(() => {
    //
    if (!isLoading) {
      const price = order?.total?.net?.amount;

      if (gtmConfig.purchase.enable) {
        if (window.dataLayer) {
          window.dataLayer.push({ ecommerce: null });
        }
        (window.dataLayer || []).push({ ecommerce: null });
        window.dataLayer.push({
          event: "Purchase",
          ecommerce: {
            purchase: {
              actionField: {
                id: CLIENT_INITIALS
                  ? `${CLIENT_INITIALS}-${shopifyOrderNumber || order?.number}`
                  : shopifyOrderNumber || order?.number,
                affliation: "Website",
                revenue: price,
              },
              products: items
                .filter((item: any) => {
                  if (
                    item?.variant?.product?.category?.slug !==
                    "free-gift-products"
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((item: any) => {
                  return {
                    name: item?.variant?.product?.name,
                    price: item?.variant?.pricing?.price?.net?.amount,
                    quantity: item?.quantity,
                    id: item?.variant?.sku,
                  };
                }),
            },
          },
        });
      }
      if (clevertapEvents.walletBalanceApplied.enable) {
        clevertap.event.push(clevertapEvents.walletBalanceApplied.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          customerEmail: user ? user.email : "",
          paymentMethod,
        });
      }

      if (clevertapEvents.charged.enable) {
        chargedClevertap();
      }
    }
  }, [isLoading]);
  const chargedClevertap = async () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const todayDate = `${mm} + / + ${dd} + / + ${yyyy}`;
    const utm_data = getUtmData(pathname);

    let ctp = {
      platform: window.screen.width < 520 ? "msite" : "website",
      timeStamp: Date.now(),
      clickTarget: document.location.href,
      customerEmail: order?.userEmail || user?.email || "",
      EmailAddress: order?.userEmail || user?.email || "",
      clickSource: utm_data,
      customerPhone:
        order?.shippingAddress?.phone || user?.defaultBillingAddress?.phone,
      phone_no:
        order?.shippingAddress?.phone || user?.defaultBillingAddress?.phone,
      items: clevertapItems,
      orderAddressPin: order?.shippingAddress?.postalCode,
      orderAddressCity: order?.shippingAddress?.city,
      "Order ID": CLIENT_INITIALS
        ? `${CLIENT_INITIALS}-${shopifyOrderNumber || order?.number}`
        : shopifyOrderNumber || order?.number,

      cartAmount: cartPrice,
      shippingAmount: order?.shippingPrice?.net?.amount,
      purchaseDate: todayDate,
      paymentMethod,
      purchaseAmount: order?.total?.net?.amount,
      couponCodeAppliedName: couponName,
      couponCodeAppliedAmount: couponAmount,
      couponCodeApplied: !!couponAmount,
      offerDiscount: offerDiscount?.amount,
      // walletBalance:
      //   user !== null &&
      //   (await getWalletAmount()).data - parseInt(cashbackDiscount, 10),
      "Cashback Used": cashbackDiscount,
      "Cashback Recieved": data,
    };
    const zee5 = getZee5Coupon(order?.metadata);
    if (zee5) {
      ctp = {
        ...ctp,
        // @ts-ignore
        zee5_coupon: zee5,
      };
    }
    clevertap.event.push(clevertapEvents.charged.value, ctp);
  };

  return (
    <>
      <span className="final-value" style={{ display: "none" }}>
        {order?.total?.net?.amount}
      </span>
      <TypedGetCashback
        variables={{ orderToken: order?.token }}
        displayLoader={false}
      >
        {({ data, loading, error }) => {
          setIsLoading(loading);
          if (data?.cashback) setData(data.cashback.amount);
          if (order?.number) {
            if (CLIENT === "lotus")
              return (
                <ThankYou
                  continueShopping={() => history.push(BASE_URL)}
                  orderNumber={order?.number}
                  lines={items}
                  user={user}
                  order={order}
                  mrp={mrp}
                  itemDiscount={itemDiscount}
                  offerDiscount={offerDiscount}
                />
              );
            return (
              <ThankYouIkkai
                continueShopping={() => history.push(BASE_URL)}
                viewOrder={() => history.push(`/page/my-order/${order?.token}`)}
                orderNumber={order?.number}
                lines={items}
                user={user}
                order={order}
                mrp={mrp}
                itemDiscount={itemDiscount}
                offerDiscount={offerDiscount}
              />
            );
          }
          return <CartEmpty />;
        }}
      </TypedGetCashback>
    </>
  );
};

export { ThankYouPage };
