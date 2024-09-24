import { TaxedMoney } from "@components/containers/TaxedMoney";
import { useCheckoutState } from "@saleor/sdk";
import React, { useEffect } from "react";
import { getMetadataValue } from "@utils/misc";
import styles from "./index.module.scss";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import Layout from "@temp/components/Layout";
import { OrderSummaryProductList } from "@temp/pages/checkout/CustomCheckouts/CheckoutVariants/CheckoutV1/CheckoutV1";

const ThankYouPageV1 = ({ headerAndFooterData, shopMeta }) => {
  const { recentOrder } = useCheckoutState();
  const couponAmount = getMetadataValue(
    recentOrder?.metadata,
    "coupon_discount",
    0
  );
  useEffect(() => {
    if (recentOrder) {
      (window.dataLayer || []).push({ ecommerce: null });
      window.dataLayer.push({
        event: "Purchase",
        ecommerce: {
          purchase: {
            actionField: {
              id: recentOrder.number,
              affliation: "Website",
              revenue: recentOrder.total?.gross?.amount,
              couponAmount: couponAmount,
              totalTax: recentOrder?.total?.tax?.amount,
              cartSubtotal: recentOrder?.subtotal?.gross?.amount,
            },
            userDetails: {
              firstName: recentOrder.shippingAddress?.firstName,
              lastName: recentOrder.shippingAddress?.lastName,
              email: recentOrder?.userEmail,
              phone: recentOrder.shippingAddress?.phone,
              address: {
                city: recentOrder.shippingAddress?.city,
                postalCode: recentOrder.shippingAddress?.postalCode,
              },
            },
            products: recentOrder?.lines
              ?.filter((item: any) => {
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
  }, [JSON.stringify(recentOrder)]);

  if (recentOrder && recentOrder.id) {
    return (
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        <div className={styles.mainContainer}>
          <div className={styles.firstContainer}>
            <div className={styles.thankYouText}>
              Thank you for placing the order!
            </div>
            <div className={styles.orderNumberText}>
              Your Order Number is : {recentOrder.number}
            </div>
          </div>
          <div className={styles.orderSummaryContainer}>
            <div className={styles.orderSummary}>
              <OrderSummaryProductList externalItems={recentOrder.lines} />
            </div>
            <div className={styles.grandTotal}>
              Grand Total : <TaxedMoney taxedMoney={recentOrder.total} />
            </div>

            <ContinueShoppingNext minHeight="5rem" width="100%" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      <ContinueShoppingNext />
    </Layout>
  );
};

export default React.memo(ThankYouPageV1);
