import React, { useEffect } from "react";
// import { renderToStaticMarkup } from "react-dom/server";

import { FormattedMessage } from "react-intl";

import { Button } from "@components/atoms/Button";
import { checkoutMessages } from "@temp/intl";

import { NetworkStatus } from "apollo-client";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { BASE_URL, showCashback } from "Themes/config";
import { useCheckout } from "@saleor/sdk";
import * as S from "./styles";
import { IProps } from "./types";
import Icon from "./Icon";
// import CollectionHeading from "../../atoms/CollectionHeading/CollectionHeading";
import { TypedDeliveryDate } from "../MyOrderList/queries";
import { TypedGetCashback } from "../CartSummary/queries";

export const continueShoppingButton = () => {
  const history = useCustomHistory();
  return (
    <S.Buttons>
      <Button
        testingContext="continueShoppingButton"
        onClick={() => history.push(BASE_URL)}
        color="primary"
        size="md"
        btnRadius="4px"
      >
        <FormattedMessage {...checkoutMessages.continueShopping} />
      </Button>
    </S.Buttons>
  );
};

const NewThankYou: React.FC<IProps> = ({
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
      {/* <CollectionHeading Heading="order" /> */}
      <S.Wrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "fit-content",
          }}
        >
          <Icon fontSize="5rem" />
          <span>Order Placed </span>
        </div>

        <S.SubHeader>
          <span role="img" aria-label="smiling emoji">
            Congratulations!
          </span>
        </S.SubHeader>

        <S.ThankYouHeader>
          <S.OrderId>{`Your Order ID is LO-${orderNumber}`}</S.OrderId>

          <TypedDeliveryDate
            variables={{
              pincode: postalCode,
              input: sku,
            }}
            displayLoader={false}
            alwaysRender
          >
            {({ data, loading, networkStatus, error }) => {
              if (error) return <></>;

              if (loading) {
                return (
                  <>
                    <br />
                    <br />
                    <S.DeliveryDateContent>
                      Expected delivery date
                    </S.DeliveryDateContent>
                    <br /> <br />
                    <S.DeliveryDate>Getting date...</S.DeliveryDate>
                    <br />
                  </>
                );
              }
              if (networkStatus === NetworkStatus.error) {
                return (
                  <>
                    <br />
                    <br />
                    <S.DeliveryDateContent>
                      Expected delivery date
                    </S.DeliveryDateContent>
                    <br />
                    <br />
                    <S.DeliveryDate>Could not get the date</S.DeliveryDate>
                    <br />
                  </>
                );
              }

              if (data && data?.deliveryDate) {
                const deliveryDate = JSON.parse(data.deliveryDate).data
                  ? JSON.parse(data.deliveryDate).data.delivery_date
                  : "date";
                //
                return (
                  <>
                    <br />
                    <br />
                    <S.DeliveryDateContent>
                      Expected delivery date
                    </S.DeliveryDateContent>
                    <br />
                    <br />
                    <S.DeliveryDate>{deliveryDate}</S.DeliveryDate>
                    <br />
                  </>
                );
              }
              return <> </>;
            }}
          </TypedDeliveryDate>
          {showCashback && (
            <TypedGetCashback
              variables={{ orderToken: order.token }}
              displayLoader={false}
            >
              {({ data, loading, error }) => {
                if (error) return <></>;
                if (loading)
                  return <S.Cashback>Getting cashback...</S.Cashback>;
                if (!data?.cashback)
                  return (
                    <S.Cashback>
                      You will recieve a Cashback of
                      <S.CashbackAmount>₹0</S.CashbackAmount> for this order:
                    </S.Cashback>
                  );
                return (
                  <S.Cashback>
                    You will get&nbsp;
                    <S.CashbackAmount>
                      ₹{data?.cashback?.amount}
                    </S.CashbackAmount>{" "}
                    cashback with this order
                    {/* for this order after 7 days of successful delivery. */}
                  </S.Cashback>
                );
              }}
            </TypedGetCashback>
          )}
          <br />
          <S.Content>
            You’re a step closer to an Organic Lifestyle by successfully placing
            this order.
          </S.Content>
          <br />
          <S.Content>
            Our team is curating your box of Organic Goodness.
          </S.Content>
        </S.ThankYouHeader>

        {continueShoppingButton()}
      </S.Wrapper>
    </div>
  );
};

export { NewThankYou };
