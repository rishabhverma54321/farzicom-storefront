import React, { useEffect } from "react";
// import { renderToStaticMarkup } from "react-dom/server";

import { FormattedMessage } from "react-intl";

import { Button } from "@components/atoms/Button";
import { checkoutMessages } from "@temp/intl";

import { NetworkStatus } from "apollo-client";

import { useCheckout } from "@saleor/sdk";
import { showCashback } from "Themes/config";
import * as S from "./styles";
import { IProps } from "./types";
import CollectionHeading from "../../atoms/CollectionHeading/CollectionHeading";
import { TypedDeliveryDate } from "../MyOrderList/queries";
import { TypedGetCashback } from "../CartSummary/queries";

const ThankYou: React.FC<IProps> = ({
  orderNumber,
  continueShopping,
  lines,
  user,
  order,
  itemDiscount,
  mrp,
  offerDiscount,
}: IProps) => {
  const { postalCode } = order.shippingAddress;
  const sku = lines?.map(item => ({
    sku: item?.variant?.sku!,
    quantity: item?.quantity!,
  }));

  const { createCheckout } = useCheckout();
  useEffect(() => {
    //
    createCheckout().then(res => {
      //
      if (res.dataError) {
        createCheckout();
      }
    });
  }, []);

  return (
    <div className="container">
      <CollectionHeading Heading="order" />
      <S.Wrapper>
        <S.SubHeader>
          <span role="img" aria-label="smiling emoji">
            😊 Congratulations!
          </span>
        </S.SubHeader>
        <S.ThankYouHeader>
          <div>
            {
              "You're a step closer to an Organic Lifestyle by successfully placing this order! "
            }
            <span role="img" aria-label="Blue Heart">
              💙
            </span>
          </div>
          <br />
          <div>Our team is curating your box of Organic Goodness.</div>
          <br />
          <div>
            {`Your Order ID is `}
            <S.OrderId>{`LO-${orderNumber}`}</S.OrderId>
          </div>
          <br />
          <div>
            {`Also, we have sent you a unique coupon code for an `}
            <S.Discount>EXTRA 5% OFF</S.Discount>
            {` your next purchase in your Order Confirmation Email.`}
          </div>
          {showCashback && (
            <TypedGetCashback
              variables={{ orderToken: order.token }}
              displayLoader={false}
            >
              {({ data, loading, error }) => {
                if (error) return <></>;
                if (loading) return <div>Getting cashback...</div>;
                if (!data?.cashback)
                  return (
                    <S.Cashback>
                      You will recieve a Cashback of ₹
                      <S.CashbackAmount>0</S.CashbackAmount> for this order:
                    </S.Cashback>
                  );
                return (
                  <S.Cashback>
                    You will recieve a Cashback of ₹
                    <S.CashbackAmount>
                      {data?.cashback?.amount}
                    </S.CashbackAmount>{" "}
                    for this order after 7 days of successful delivery.
                  </S.Cashback>
                );
              }}
            </TypedGetCashback>
          )}
          <br />

          <span>
            {" "}
            Please check your spam in case not received in your inbox.{" "}
          </span>
          <br />
          <TypedDeliveryDate
            variables={{
              pincode: postalCode,
              input: sku,
            }}
            displayLoader={false}
            alwaysRender
          >
            {({ data, loading, networkStatus }) => {
              if (loading) {
                return (
                  <div
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    Expected delivery date: Getting date...
                  </div>
                );
              }
              if (networkStatus === NetworkStatus.error) {
                return (
                  <div
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    Expected delivery date: Could not get the date
                  </div>
                );
              }

              if (data && data?.deliveryDate) {
                const deliveryDate = JSON.parse(data.deliveryDate).data
                  ? JSON.parse(data.deliveryDate).data.delivery_date
                  : "date";
                //
                return (
                  <div
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    {`Expected delivery date: ${deliveryDate}`}
                  </div>
                );
              }
              return <> </>;
            }}
          </TypedDeliveryDate>
        </S.ThankYouHeader>

        <S.Buttons>
          <Button
            testingContext="continueShoppingButton"
            onClick={continueShopping}
            color="primary"
            size="md"
          >
            <FormattedMessage {...checkoutMessages.continueShopping} />
          </Button>
        </S.Buttons>
      </S.Wrapper>
    </div>
  );
};

export { ThankYou };
