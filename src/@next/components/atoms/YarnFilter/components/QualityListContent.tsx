import { useDispatchContext } from "@app/pages/YarzbazarPage/Context/DispatchContext";
import React from "react";
import { useOrderContext } from "../../../../pages/YarzbazarPage/Context/OrderContext";
import { TypedProductForFilterQuery } from "../queries";
import CategoryTab from "./CategoryTab";
import * as C from "./styles";

// export interface ICategoryContentProps {
//   productData: any;
// }
function QualityListContent({ title }: { title?: string }) {
  return (
    <TypedProductForFilterQuery>
      {({ data, loading }) => {
        if (loading) {
          return <p style={{ textAlign: "center" }}>loading...</p>;
        }
        const products = data?.products?.edges.map(item => item.node);
        return (
          <C.QualityListContent>
            {products &&
              products.map((item: any) => (
                <Item
                  key={item.id}
                  text={item.name}
                  title={title}
                  styleClass="quality__item"
                />
              ))}
          </C.QualityListContent>
        );
      }}
    </TypedProductForFilterQuery>
  );
}

export default QualityListContent;

export function Item({
  text,
  styleClass,
  title,
}: {
  text: string;
  styleClass: string;
  title?: string;
}) {
  const { updateQuality, dispatchFilterState } = useDispatchContext();
  const { updateOrderQuality, orderFilterState } = useOrderContext();
  const checkedVal =
    title === "orders" ? orderFilterState.quality : dispatchFilterState.quality;
  const newText = text.toLowerCase();
  return (
    <div className={styleClass}>
      <CategoryTab text={text} styleClass="content" />
      {/* <YarnCheckbox heightClass="one-em margin-left" bgColor="#A33A34" /> */}
      <input
        type="radio"
        name="quality"
        value={newText}
        checked={newText === checkedVal}
        onChange={() =>
          title === "orders"
            ? updateOrderQuality(newText)
            : updateQuality(newText)
        }
      />
    </div>
  );
}
