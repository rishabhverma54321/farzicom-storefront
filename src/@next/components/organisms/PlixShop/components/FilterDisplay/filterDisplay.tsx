import React from "react";
import PlixChip from "../PlixChip";
import * as S from "./style";
import style from "../../scss/index.module.scss"

interface FilterdisplayProps {
  productCount: string | Number;
  activeFilters: { id: string; name: string }[];
  onFilterRemove: (id: string) => void;
}

export const Filterdisplay: React.FC<FilterdisplayProps> = ({
  productCount,
  activeFilters,
  onFilterRemove,
}) => {
  return (
    <div className={style.Wrapper}>
      <span className={style.productCount}>{productCount} Products</span>
      {activeFilters.map(activeFilter => (
        <PlixChip
          text={activeFilter.name}
          filterId={activeFilter.id}
          onFilterRemove={onFilterRemove}
        />
      ))}
    </div>
  );
};
Filterdisplay.displayName = "Filterdisplay";
export default Filterdisplay;
