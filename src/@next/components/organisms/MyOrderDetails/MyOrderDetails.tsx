import React, { ReactNode } from "react";
// import { RouteComponentProps } from "react-router-dom";
import { MyOrderCardOnDetails } from "@components/molecules/MyOrderCardOnDetails";
import { Money } from "@components/containers/Money";
import { Container, Header } from "@components/organisms/MyOrderList/styles";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { Loader } from "@components/atoms/Loader";
import { useOrderDetails } from "@saleor/sdk";
import * as H from "history";
import { UserOrderByToken_orderByToken_lines } from "@saleor/sdk/lib/queries/gqlTypes/UserOrderByToken";
import { OrderByToken_orderByToken_lines } from "@saleor/sdk/lib/queries/gqlTypes/OrderByToken";
import { getMetadataValue } from "@utils/misc";
import { TypedGetCashbackRecieveAmount } from "@components/molecules/ApplyCoupon/queris";
import { CLIENT, showCashback } from "Themes/config";
import * as S from "./styles";
import { TypedWareIqStatus } from "../MyOrderList/queries";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

export interface IOrderDetailsProps {
  history: H.History;
}

const makeRow = (value: string | ReactNode, key?: string) => {
  return (
    <S.InfoDetailsRow>
      {key ? <div>{key}</div> : <> </>}
      <div>{value}</div>
    </S.InfoDetailsRow>
  );
};

enum Keys {
  mrp = "MRP",
  gst = "GST",
  couponDiscount = "Coupon Discount",
  offerDiscount = "Offer Discount",
  prepaidDiscount = "Prepaid Discount",
  cashbackDiscount = "Store credits used",
  total = "TOTAL",
}
export const MyOrderDetails: React.FC<{
  token?: string;
}> = ({
  match: {
    params: { token },
  },
}) => {
  const { data: order, loading } = useOrderDetails(
    { token },
    { fetchPolicy: "network-only" }
  );

  const shippingAddress = order?.shippingAddress;
  const metadata = order?.metadata;
  const lines = order?.lines;
  const orderTotal = order?.total?.gross.amount;
  const number = getMetadataValue(
    metadata,
    "order_id",
    (order && order.number) || ""
  );
  const prepaidDiscount = getMetadataValue(metadata, "prepaid_discount");
  const couponDiscount = getMetadataValue(metadata, "coupon_discount");
  const cashbackDiscount = getMetadataValue(metadata, "cashback_discount");
  const status = getMetadataValue(metadata, "order_status");
  const total = parseFloat(
    getMetadataValue(metadata, "grand_total", orderTotal)
  );

  //

  const mrp = lines?.reduce(
    (accumulatorPrice, line) =>
      accumulatorPrice +
      line?.variant?.pricing?.priceUndiscounted?.gross.amount! *
        line?.quantity!,
    0
  );

  const offerDiscount = lines?.reduce((total, curr) => {
    return (
      total +
      (curr?.variant?.pricing?.priceUndiscounted?.gross?.amount! -
        curr?.variant?.pricing?.price?.gross?.amount!) *
        curr?.quantity!
    );
  }, 0);

  return (
    <>
      {CLIENT === "lotus" ? (
        <CollectionHeading Heading="MY ORDER" />
      ) : (
        <CollectionHeadingIkkai Heading="MY ORDER" />
      )}
      <Container>
        <Header>
          <div>ORDER NO. {number} </div>
        </Header>
        {lines?.map(
          (
            item:
              | (UserOrderByToken_orderByToken_lines | null)
              | (OrderByToken_orderByToken_lines | null)
              | undefined
          ) => {
            if (item !== null && item !== undefined) {
              return (
                <MyOrderCardOnDetails
                  item={item}
                  total={total}
                  key={item.variant?.id}
                />
              );
            }
          }
        )}
      </Container>
      {loading ? (
        <Loader />
      ) : CLIENT === clients.DRINKSWA2 ? (
        <Container>
          <S.InfoDetails>
            <S.Title>PRICE</S.Title>
            {mrp ? (
              makeRow(
                <Money money={{ amount: mrp!, currency: "INR" }} />,
                Keys.mrp
              )
            ) : (
              <></>
            )}
            {/* {makeRow(
              <Money money={{ amount: 0, currency: "INR" }} />,
              Keys.gst
            )} */}
            {couponDiscount ? (
              makeRow(
                <Money
                  money={{
                    amount: parseFloat(couponDiscount!),
                    currency: "INR",
                  }}
                />,
                Keys.couponDiscount
              )
            ) : (
              <></>
            )}
            {offerDiscount ? (
              makeRow(
                <Money money={{ amount: offerDiscount!, currency: "INR" }} />,
                Keys.offerDiscount
              )
            ) : (
              <></>
            )}
            {prepaidDiscount ? (
              makeRow(
                <Money
                  money={{
                    amount: parseFloat(prepaidDiscount!),
                    currency: "INR",
                  }}
                />,
                Keys.prepaidDiscount
              )
            ) : (
              <></>
            )}
            {cashbackDiscount ? (
              makeRow(
                <Money
                  money={{
                    amount: parseFloat(cashbackDiscount!) || 0,
                    currency: "INR",
                  }}
                />,
                Keys.cashbackDiscount
              )
            ) : (
              <></>
            )}
            {total ? (
              makeRow(
                <Money money={{ amount: total!, currency: "INR" }} />,
                Keys.total
              )
            ) : (
              <></>
            )}
          </S.InfoDetails>

          {showCashback && (
            <TypedGetCashbackRecieveAmount variables={{ orderToken: token }}>
              {({ data, loading }) => {
                if (loading) {
                  return (
                    <S.InfoDetails>
                      <S.Title>CashBack</S.Title>
                      {makeRow(`loading...`, `You will recieve a Cashback of:`)}
                    </S.InfoDetails>
                  );
                }
                if (data && data?.cashback)
                  return (
                    <S.InfoDetails>
                      <S.Title>CashBack</S.Title>
                      {makeRow(
                        `₹${data?.cashback?.amount}`,
                        `You will recieve a Cashback of:`
                      )}
                    </S.InfoDetails>
                  );
                return (
                  <S.InfoDetails>
                    <S.Title>CashBack</S.Title>
                    {makeRow(`₹0`, `You will recieve a Cashback of:`)}
                  </S.InfoDetails>
                );
              }}
            </TypedGetCashbackRecieveAmount>
          )}

          <S.InfoDetails>
            <S.Title>Shipping Address</S.Title>
            {makeRow(
              `${shippingAddress?.firstName} ${shippingAddress?.lastName}`
            )}
            {makeRow(
              `${shippingAddress?.streetAddress1}, ${
                shippingAddress?.streetAddress2
                  ? `${shippingAddress?.streetAddress2}, `
                  : ""
              } ${shippingAddress?.city}, ${shippingAddress?.countryArea}, ${
                shippingAddress?.postalCode
              }`
            )}
            {makeRow(`Mobile No : ${shippingAddress?.phone}`)}
            {makeRow(`Email : ${order?.userEmail}`)}
          </S.InfoDetails>
          {/*
          <TypedWareIqStatus
            variables={{ token }}
            // onCompleted={data =>
          >
            {({ data }) => (
              <S.InfoDetails>
                <S.Title>ORDER STATUS</S.Title>
                {makeRow(status || data?.orderStatus?.status)}
              </S.InfoDetails>
            )}
          </TypedWareIqStatus>
          */}
          {/* <S.InfoDetails>
            <S.Title>Created At:</S.Title>
            {makeRow(result)}
          </S.InfoDetails> */}
        </Container>
      ) : (
        <Container>
          <S.InfoDetails>
            <S.Title>PRICE</S.Title>
            {makeRow(
              <Money money={{ amount: mrp!, currency: "INR" }} />,
              Keys.mrp
            )}
            {/* {makeRow(
              <Money money={{ amount: 0, currency: "INR" }} />,
              Keys.gst
            )} */}
            {makeRow(
              <Money
                money={{ amount: parseFloat(couponDiscount!), currency: "INR" }}
              />,
              Keys.couponDiscount
            )}
            {makeRow(
              <Money money={{ amount: offerDiscount!, currency: "INR" }} />,
              Keys.offerDiscount
            )}
            {makeRow(
              <Money
                money={{
                  amount: parseFloat(prepaidDiscount!),
                  currency: "INR",
                }}
              />,
              Keys.prepaidDiscount
            )}
            {makeRow(
              <Money
                money={{
                  amount: parseFloat(cashbackDiscount!) || 0,
                  currency: "INR",
                }}
              />,
              Keys.cashbackDiscount
            )}
            {makeRow(
              <Money money={{ amount: total!, currency: "INR" }} />,
              Keys.total
            )}
          </S.InfoDetails>

          {showCashback && (
            <TypedGetCashbackRecieveAmount variables={{ orderToken: token }}>
              {({ data, loading }) => {
                if (loading) {
                  return (
                    <S.InfoDetails>
                      <S.Title>CashBack</S.Title>
                      {makeRow(`loading...`, `You will recieve a Cashback of:`)}
                    </S.InfoDetails>
                  );
                }
                if (data && data?.cashback)
                  return (
                    <S.InfoDetails>
                      <S.Title>CashBack</S.Title>
                      {makeRow(
                        `₹${data?.cashback?.amount}`,
                        `You will recieve a Cashback of:`
                      )}
                    </S.InfoDetails>
                  );
                return (
                  <S.InfoDetails>
                    <S.Title>CashBack</S.Title>
                    {makeRow(`₹0`, `You will recieve a Cashback of:`)}
                  </S.InfoDetails>
                );
              }}
            </TypedGetCashbackRecieveAmount>
          )}

          <S.InfoDetails>
            <S.Title>Shipping Address</S.Title>
            {makeRow(
              `${shippingAddress?.firstName} ${shippingAddress?.lastName}`
            )}
            {makeRow(
              `${shippingAddress?.streetAddress1}, ${
                shippingAddress?.streetAddress2
                  ? `${shippingAddress?.streetAddress2}, `
                  : ""
              } ${shippingAddress?.city}, ${shippingAddress?.countryArea}, ${
                shippingAddress?.postalCode
              }`
            )}
            {makeRow(`Mobile No : ${shippingAddress?.phone}`)}
            {makeRow(`Email : ${order?.userEmail}`)}
          </S.InfoDetails>

          <TypedWareIqStatus
            variables={{ token }}
            // onCompleted={data =>
          >
            {({ data }) => (
              <S.InfoDetails>
                <S.Title>ORDER STATUS</S.Title>
                {makeRow(status || data?.orderStatus?.status)}
              </S.InfoDetails>
            )}
          </TypedWareIqStatus>

          {/* <S.InfoDetails>
            <S.Title>Created At:</S.Title>
            {makeRow(result)}
          </S.InfoDetails> */}
        </Container>
      )}
    </>
  );
};
MyOrderDetails.displayName = "OrderDetails";
export default MyOrderDetails;
