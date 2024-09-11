import React from "react";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { OrdersByUser_me_orders_edges } from "@saleor/sdk/lib/queries/gqlTypes/OrdersByUser";
import { MyOrderCard } from "@components/molecules/MyOrderCard";
import { NetworkStatus } from "apollo-client";
import { CLIENT } from "Themes/config";
import * as S from "./styles";
import { TypedDeliveryDate, TypedWareIqStatus } from "./queries";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

export interface IMyOrderCardProps {
  order: OrdersByUser_me_orders_edges;
}

export const MyOrderList: React.FC<IMyOrderCardProps> = ({
  order: { node },
}) => {
  //
  const { lines, metadata, created } = node;
  const history = useCustomHistory();

  const handleClick = () => {
    history.push({
      pathname: `/page/my-order/${node.token}`,
      state: {
        node,
      },
    });
  };

  const oldId = metadata?.filter(meta => meta?.key === "order_id")[0]?.value;
  const number = oldId || node?.number;

  const status = metadata?.filter(meta => meta?.key === "order_status")[0]
    ?.value;

  const createdAt =
    metadata?.filter(meta => meta?.key === "created_at")[0]?.value || created;

  const result = createdAt.match("[0-9]{4}([-/ .])[0-9]{2}[-/ .][0-9]{2}");

  //
  // const eta = moment().add(4, "days").format("DD-MM-YYYY");
  // const eta = result.substr(-2);

  let cDate = result[0].slice(-2);
  //
  const removedDate = result[0].slice(0, -2);
  cDate = parseInt(cDate, 10) + 3;
  const eta = `${removedDate}${cDate}`;

  const total = metadata?.filter(meta => meta?.key === "grand_total")[0]?.value;

  // @ts-ignore
  const postalCode = node.shippingAddress?.postalCode
    ? // @ts-ignore
      node.shippingAddress?.postalCode
    : "";

  const sku = node.lines.map(item => ({
    // @ts-ignore
    sku: item?.variant?.sku!,
    quantity: item?.quantity!,
  }));

  return (
    <>
      <S.Container>
        <S.Header>
          <div>ORDER NO. {number} </div>

          <S.OrderDetailsText onClick={handleClick}>
            ORDER DETAILS
          </S.OrderDetailsText>
        </S.Header>
        {lines.map(item => {
          //

          if (item !== null && item !== undefined) {
            return <MyOrderCard item={item} total={total} key={item.id} />;
          }
        })}
        {CLIENT == clients.DRINKSWA2 ? (
          <></>
        ) : (
          <S.OrderContainer>
            <TypedWareIqStatus
              variables={{ token: node.token }}
              displayLoader={false}
              alwaysRender
            >
              {({ data, loading }) => {
                if (loading) {
                  return <S.OrderStatus>ORDER STATUS: Status...</S.OrderStatus>;
                }
                return (
                  <S.OrderStatus>
                    ORDER STATUS: {status || data?.orderStatus?.status}
                  </S.OrderStatus>
                );
              }}
            </TypedWareIqStatus>
            {oldId ? (
              <> </>
            ) : (
              <TypedDeliveryDate
                variables={{
                  pincode: postalCode,
                  input: sku,
                }}
                displayLoader={false}
              >
                {({ data, loading, networkStatus }) => {
                  if (loading) {
                    return (
                      <S.OrderStatus>
                        Expected delivery date: Date...
                      </S.OrderStatus>
                    );
                  }
                  if (networkStatus === NetworkStatus.error) {
                    return (
                      <S.OrderStatus>
                        Expected delivery date: Oops! Error Occurred
                      </S.OrderStatus>
                    );
                  }

                  if (data && data?.deliveryDate) {
                    const deliveryDate = JSON.parse(data.deliveryDate).data
                      ? JSON.parse(data.deliveryDate).data.delivery_date
                      : eta;
                    //
                    return (
                      <S.OrderStatus>
                        Expected delivery date: {deliveryDate}
                      </S.OrderStatus>
                    );
                  }
                  return <> </>;
                }}
              </TypedDeliveryDate>
            )}
          </S.OrderContainer>
        )}
      </S.Container>
    </>
  );
};

MyOrderList.displayName = "MyOrderList";
export default MyOrderList;
