import { useDispatchContext } from "@app/pages/YarzbazarPage/Context/DispatchContext";
import React from "react";
import { useOrderContext } from "../../../../pages/YarzbazarPage/Context/OrderContext";
import CategoryTab from "./CategoryTab";
import * as SC from "./styles";

export interface IStatusContentProps {
  statusData: any;
  title?: string;
}
function StatusContent({ statusData, title }: IStatusContentProps) {
  return (
    <SC.StatusContent>
      {statusData &&
        statusData.map((item: any) => (
          <Item
            key={item.id}
            text={item.name}
            title={title}
            styleClass="status__item"
          />
        ))}
    </SC.StatusContent>
  );
}

export default StatusContent;

export function Item({
  text,
  styleClass,
  title,
}: {
  text: string;
  styleClass: string;
  title: string;
}) {
  const { updateStatus, dispatchFilterState } = useDispatchContext();
  const { updateOrderStatus, orderFilterState } = useOrderContext();
  let checkedVal =
    title === "orders" ? orderFilterState.status : dispatchFilterState.status;
  const newText = text.toLowerCase();
  return (
    <div className={styleClass}>
      <CategoryTab text={text} styleClass="content" />
      <input
        type="radio"
        name="status"
        value={newText}
        checked={newText === checkedVal}
        onChange={() =>
          title === "orders"
            ? updateOrderStatus(newText)
            : updateStatus(newText)
        }
      />
    </div>
  );
}
