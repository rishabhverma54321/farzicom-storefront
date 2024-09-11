import React, { useState } from "react";
import { useDispatchContext } from "@app/pages/YarzbazarPage/Context/DispatchContext";
import CategoryTab from "./components/CategoryTab";
import SortIcon from "../../../../images/yarn-filter/Shape";
import GlobIcon from "../../../../images/yarn-filter/Globe";
import RightClick from "../../../../images/profileSvg/GreenTickProfile";

import * as F from "./styles";
import SortByContent from "./components/SortByContent";
import QualityListContent from "./components/QualityListContent";
import StatusContent from "./components/StatusContent";
import { useOrderContext } from "../../../pages/YarzbazarPage/Context/OrderContext";

export interface IYarnFilterProps {
  title?: string;
  color?: string;
}

export const YarnFilter: React.FC<IYarnFilterProps> = ({ title, color }) => {
  const [select, setSelect] = useState(1);
  function selectTab(id: number) {
    setSelect(id);
  }
  return (
    <F.Filter className="yarn-filter">
      <div className="filter-body">
        <LeftSection select={select} selectTab={selectTab} color={color} />
        <RightSection select={select} title={title} />
      </div>
      <YarnFilterControl color={color} title={title} />
    </F.Filter>
  );
};
YarnFilter.displayName = "YarnFilter";
export default YarnFilter;

export const LeftSection = ({
  select,
  selectTab,
  color,
}: {
  select: number;
  selectTab: (id: number) => void;
  color?: string;
}) => {
  return (
    <F.FiltersCategorySection>
      {leftSectionItem.map((item: any) => {
        return (
          <CategoryTab
            key={item.id}
            text={item.name}
            icon={item.icon}
            styleClass="category"
            activebar={item.id === select}
            setterFun={selectTab}
            id={item.id}
            activebarClr={color}
          />
        );
      })}
    </F.FiltersCategorySection>
  );
};
export const RightSection = ({
  select,
  title,
}: {
  select: number;
  title?: string;
}) => {
  return (
    <F.FiltersListingSection>
      {/* {select === 1 && <SortByContent />} */}
      {select === 2 && <QualityListContent title={title} />}
      {select === 3 && (
        <StatusContent
          statusData={title === "orders" ? orderStatus : dispatchStatus}
          title={title}
        />
      )}
    </F.FiltersListingSection>
  );
};

export const YarnFilterControl = ({
  color,
  title,
}: {
  color?: string;
  title?: string;
}) => {
  const { clear, finalSubmit } = useDispatchContext();
  const { orderClear, finalOrderSubmit } = useOrderContext();
  return (
    <F.FilterControl>
      <button
        className="clear"
        onClick={() => (title === "orders" ? orderClear() : clear())}
        style={{ color: `${color}` }}
      >
        Clear
      </button>
      <button
        className="apply"
        onClick={() =>
          title === "orders" ? finalOrderSubmit() : finalSubmit()
        }
      >
        <RightClick /> Apply
      </button>
    </F.FilterControl>
  );
};

export const leftSectionItem = [
  // {
  //   id: 1,
  //   name: "Sort",
  //   icon: <SortIcon />,
  // },
  {
    id: 2,
    name: "Quality",
    icon: <GlobIcon />,
  },
  {
    id: 3,
    name: "Status",
    icon: <GlobIcon />,
  },
];
export const dispatchStatus = [
  {
    id: 1,
    name: "Planned",
  },
  {
    id: 2,
    name: "Confirmed",
  },
  {
    id: 3,
    name: "Loading",
  },
  {
    id: 4,
    name: "Transit",
  },
  {
    id: 5,
    name: "Received",
  },
];
export const orderStatus = [
  {
    id: 2,
    name: "Fulfilled",
  },
  {
    id: 1,
    name: "Unfulfilled",
  },
  {
    id: 3,
    name: "Canceled",
  },
];
