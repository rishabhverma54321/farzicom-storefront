import { getDate } from "@app/pages/YarzbazarPage/utils/misc";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { useWindowWidth } from "@hooks/useWindowWidth";
import RightArraow from "images/profileSvg/RightArraow";
import React from "react";
// import RightArrow from "../CustomInput/RightArrow";
import * as OD from "./style";

export interface IOrderOverviewProps {
  shipments: any;
  type?: string;
  quantity?: number;
}
export const OrderOverview: React.FC<IOrderOverviewProps> = ({
  shipments,
  type,
  quantity,
}) => {
  return (
    <OD.Container>
      <OD.Heading>Dispatches</OD.Heading>
      <OD.TableHeader>
        {tableHeader.map((item, index) => (
          <h3 key={index}>{item}</h3>
        ))}
      </OD.TableHeader>
      <OD.TableContent
        className={shipments?.length ? "dispatches" : "nodispatches"}
      >
        {shipments?.length ? (
          shipments?.map((item: any, index: any) => {
            const pendingQuantity = getPendingQuantity(
              shipments,
              index,
              quantity
            );
            return (
              <ListOfDispatch
                key={index}
                item={item}
                type={type}
                pendingQuantity={pendingQuantity}
              />
            );
          })
        ) : (
          <p>No dispatches planned yet</p>
        )}
      </OD.TableContent>
    </OD.Container>
  );
};
OrderOverview.displayName = "OrderOverview";
export default OrderOverview;

const tableHeader = ["Dispatch quantity", "pending", "status", "0"];

export const ListOfDispatch = ({
  item,
  type,
  pendingQuantity,
}: {
  item: any;
  type: string;
  pendingQuantity: number;
}) => {
  const history = useCustomHistory();
  const screenWidth = useWindowWidth()[0];
  const redirectToNewTab = (link: string) => {
    if (screenWidth >= 992) {
      window.open(link, "_blank");
    } else {
      history.push({
        pathname: link,
      });
    }
  };
  const linkGenerate =
    type === "buyer"
      ? `/page/buyer-dispatch/${item.id}`
      : `/page/supplier-dispatch/${item.id}`;
  return (
    <OD.DispatchDetail
      className="row"
      onClick={() => redirectToNewTab(linkGenerate)}
    >
      <span className="block quantity">
        {item?.dispatchItemQuantity ? `${item?.dispatchItemQuantity}kg` : "--"}
      </span>
      <span className="block quantity">{pendingQuantity}kg</span>
      <span className="block">
        <span>{item?.status ? `${item?.status}` : "--"}</span>
        <span>{item?.createdAt ? `${getDate(item?.createdAt)}` : "--"}</span>
      </span>
      <span className="block">
        <RightArraow />
      </span>
    </OD.DispatchDetail>
  );
};

export const getPendingQuantity = (
  data: any,
  index: number,
  quantity: number
) => {
  let total = 0;
  for (let i = index; i < data.length; i++) {
    total = total + data[i].dispatchItemQuantity;
  }
  const result = quantity - total < 0 ? 0 : quantity - total;
  return result;
};
