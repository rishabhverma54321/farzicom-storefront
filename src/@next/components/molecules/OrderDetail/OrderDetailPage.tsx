import React from "react";
import { useParams } from "react-router";
import { Loader } from "@components/atoms/Loader";
// import { TypeGetDispatchItemQuery } from "@app/pages/YarzbazarPage/SupplierDispatch/queries";
import { LoaderScreen } from "@app/pages/YarzbazarPage/SupplierDispatch/styles";
import { TypeDispatchItemQuery, TypeOrderItemQuery } from "./queries";
import OrderDetail from "./OrderDetail";
import { useCustomLocation } from "@hooks/useCustomLocation";
// import { AnyRecord } from "dns";

export const paymentData = [
  "Yarn payment",
  "transporter payment",
  "convenience fee",
];

const OrderDetailPage = () => {
  const { id } = useParams<any>();
  let tablist: Array<string>;
  let title: string;
  let type: string;
  let typeColor: string;
  const { pathname } = useCustomLocation();
  const pageType = pathname.split("/")[2];
  if (pageType === "supplier-order") {
    tablist = ["overview"];
    type = "supplier";
    typeColor = "#A33A34";
    title = "orders";
  }
  if (pageType === "supplier-dispatch") {
    tablist = ["overview", "documents", "payments"];
    type = "supplier";
    typeColor = "#A33A34";
    title = "dispatches";
  }
  if (pageType === "buyer-order") {
    tablist = ["overview"];
    type = "buyer";
    typeColor = "#F99F23";
    title = "orders";
  }
  if (pageType === "buyer-dispatch") {
    tablist = ["overview", "documents", "payments"];
    type = "buyer";
    typeColor = "#F99F23";
    title = "dispatches";
  }
  const getDate = (data: any) => {
    const date = new Date(data);
    const newDate = date ? date.toDateString().split(" ") : "-";
    //
    if (newDate) {
      return `${newDate[1]} ${newDate[2]} ${newDate[3]}`;
    }
    return newDate;
  };
  const getRate = (node: any) => {
    if (node?.order.metadata?.length) {
      const rate = node?.order?.metadata.filter(
        (item: any) => item.key === "orderRate"
      )[0];
      return rate ? rate.value : "-";
    }
    return "-";
  };
  if (title === "dispatches") {
    return (
      <TypeDispatchItemQuery variables={{ id }}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <LoaderScreen>
                <Loader />
              </LoaderScreen>
            );
          }
          const itemDetail = data?.shipmentsB2B?.edges[0]?.node;

          return (
            <OrderDetail
              tablist={tablist}
              title={title}
              selectDispatch={itemDetail}
              getRate={getRate}
              getDateData={getDate}
              color={typeColor}
              type={type}
            />
          );
        }}
      </TypeDispatchItemQuery>
    );
  }
  if (title === "orders") {
    return (
      <TypeOrderItemQuery variables={{ id }}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <LoaderScreen>
                <Loader />
              </LoaderScreen>
            );
          }
          const itemDetail: any = data?.ordersb2b;

          return (
            <OrderDetail
              tablist={tablist}
              title={title}
              selectDispatch={itemDetail[0]}
              getRate={getRate}
              getDateData={getDate}
              color={typeColor}
              type={type}
            />
          );
        }}
      </TypeOrderItemQuery>
    );
  }
};

export default OrderDetailPage;
