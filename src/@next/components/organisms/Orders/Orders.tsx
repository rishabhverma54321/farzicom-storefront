// import { BlankScreen, OrderDispatchCard } from "@components/atoms";
import OrderDispatchCard from "@components/atoms/OrderDispatchCard";
import Filter from "@components/atoms/YarnFilter/Filter";
import Search from "@components/containers/MyTeamComponent/components/Search";
import OrderDetail from "@components/molecules/OrderDetail";
// import { OrderDetail } from "@components/molecules";
import { useWindowWidth } from "@hooks/useWindowWidth";
// import { getMetadataValue } from "@utils/misc";
import React, { useEffect, useState } from "react";
import { useCustomHistory } from "@hooks/useCustomHistory";
import Button from "./Button";
import * as O from "./styles";

export interface IOrdersProps {
  tablist: Array<string>;
  title: string;
  date?: string;
  data?: any;
  dispatchData?: any;
  loadMore?: any;
  ordersData?: any;
  typeColor?: string;
  hasNext?: boolean | null;
  type?: string;
  loading?: any;
  getSearchedData?: (val: string) => void;
}

export const Orders: React.FC<IOrdersProps> = ({
  tablist,
  title,
  date,
  data,
  dispatchData,
  loadMore,
  hasNext,
  ordersData,
  typeColor,
  type,
  loading,
  getSearchedData,
}) => {
  const [selectBtn, setSelectBtn] = useState("all");
  const [selectDispatch, setSelectDispatch] = useState<any>("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const history = useCustomHistory();
  const screenWidth = useWindowWidth()[0];
  const dispatchSelected = (id: any) => {
    if (title === "orders") {
      const filteredItem = ordersData.filter(
        (item: any) => item.order.id === id
      )[0];
      setSelectDispatch(filteredItem);
    } else {
      const filteredItem = dispatchData.filter(
        (item: any) => item?.node?.id === id
      )[0];
      setSelectDispatch(filteredItem.node);
    }
  };
  useEffect(() => {
    setFilteredData(ordersData);
  }, [ordersData]);
  const redirectFunc = (id: any) => {
    if (title === "orders") {
      history.push({
        pathname: `/page/${type}-order/${id}`,
        state: {
          id,
          tablist,
          title,
          type,
          typeColor,
        },
      });
    } else {
      history.push({
        pathname: `/page/${type}-dispatch/${id}`,
        state: {
          id,
          tablist,
          title,
          type,
          typeColor,
        },
      });
    }
  };
  const getDate = (data: any) => {
    const date = new Date(data);
    const newDate = date ? date.toDateString().split(" ") : "-";
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
  const getFilteredData = (type: string) => {
    if (type === "all") {
      const filtered = ordersData.filter(
        (item: any) => item.order.lines.length !== 0
      );
      setSelectBtn("all");
      setFilteredData(filtered);
    }
    if (type === "pending") {
      const filtered = ordersData.filter(
        (item: any) => item.pendingQuantity !== 0
      );
      setSelectBtn("pending");
      setFilteredData(filtered);
    }
  };

  return (
    <O.OrderPage>
      <>
        <O.Orders className="orders">
          <O.Heading>{title}</O.Heading>
          {title === "orders" && (
            <Button
              selectBtn={selectBtn}
              getFilteredData={getFilteredData}
              typeColor={typeColor}
            />
          )}
          <O.SearchBox className="searchbox">
            <Search getSearchedData={getSearchedData} searchBy="order number" />
            <Filter title={title} color={typeColor} />
          </O.SearchBox>
          <O.OrderList>
            {title === "orders"
              ? ordersData.length !== 0 &&
                filteredData?.map((item: any) => {
                  const result =
                    type === "supplier"
                      ? item?.buyerCompany?.companyName
                      : item?.supplierCompany?.companyName;
                  const companyName = result ? ` - ${result}` : "- NA";

                  return (
                    <OrderDispatchCard
                      key={item?.order?.id}
                      productTitle={`${item?.order?.lines[0]?.productName}${companyName}`}
                      totalQuantity={item?.order?.lines[0]?.quantity}
                      pendingQuantity={
                        item.pendingQuantity
                          ? `${item.pendingQuantity}kg`
                          : "--"
                      }
                      rate={`${getRate(item)} All Inclusive`}
                      selectDispatchId={selectDispatch?.order?.id}
                      borderStyle
                      date={`${getDate(item?.order?.created)} | ${atob(
                        item.order.id
                      )}`}
                      dispatchSelected={
                        screenWidth >= 992 ? dispatchSelected : redirectFunc
                      }
                      orderStatus={item?.order?.status}
                      showEffect={screenWidth <= 992 && true}
                      dispatchId={item?.order.id}
                      progressBarColor={typeColor}
                      companyDetails={
                        type === "supplier"
                          ? item.buyerCompany
                          : item.supplierCompany
                      }
                    />
                  );
                })
              : dispatchData?.map(({ node }: any) => {
                  if (!node.items.length) {
                    return <></>;
                  }
                  const result =
                    type === "supplier"
                      ? node?.buyerCompany?.companyName
                      : node?.supplierCompany?.companyName;
                  const companyName = result ? ` - ${result}` : "- NA";
                  return (
                    <OrderDispatchCard
                      key={node.id}
                      productTitle={`${
                        node?.items[0]?.productVariantId?.product
                          ? `${node.items[0].productVariantId?.product.name}${companyName}`
                          : "NA"
                      }`}
                      disputeData={node.shipmentDispute}
                      totalQuantity={
                        node?.items[0]?.itemQuantity
                          ? node?.items[0]?.itemQuantity
                          : "-"
                      }
                      rate={`${getRate(node)} Ex-Mill | ${atob(node.order.id)}`}
                      borderStyle
                      selectDispatchId={selectDispatch?.id}
                      dispatchSelected={
                        screenWidth >= 992 ? dispatchSelected : redirectFunc
                      }
                      history={node?.history}
                      dispatchId={node.id}
                      dispatchStatus={node?.status}
                      showEffect={screenWidth <= 992 && true}
                      progressBarColor={typeColor}
                      companyDetails={
                        type === "supplier"
                          ? node.buyerCompany
                          : node.supplierCompany
                      }
                    />
                  );
                })}
            <O.Loader color={typeColor}>
              {hasNext ? (
                loading ? (
                  "Loading...."
                ) : (
                  <button className="pagination-btn" onClick={() => loadMore()}>
                    Load More...
                  </button>
                )
              ) : (
                `No more ${title} available!`
              )}
            </O.Loader>
          </O.OrderList>
        </O.Orders>
        <O.OrderInfo className="order-info">
          <OrderDetail
            tablist={tablist}
            title={title}
            selectDispatch={selectDispatch}
            getRate={getRate}
            getDateData={getDate}
            color={typeColor}
            type={type}
          />
        </O.OrderInfo>
      </>
      {/* ) : (
        <BlankScreen
          info={`${
            title === "orders"
              ? "You have no Pending Orders"
              : "You have no Dispatches planned"
          }`}
          color={typeColor}
        />
      )} */}
    </O.OrderPage>
  );
};
Orders.displayName = "Orders";
export default Orders;
