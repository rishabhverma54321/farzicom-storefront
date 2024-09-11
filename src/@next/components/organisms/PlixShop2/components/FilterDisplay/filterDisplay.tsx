import React from "react";
import PlixChip from "../PlixChip";
import * as S from "./style";

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
    <S.Wrapper>
      <S.ProductCount>{productCount} Products</S.ProductCount>
      {activeFilters.map(activeFilter => (
        <PlixChip
          text={activeFilter.name}
          filterId={activeFilter.id}
          onFilterRemove={onFilterRemove}
        />
      ))}
    </S.Wrapper>
  );
};
Filterdisplay.displayName = "Filterdisplay";
export default Filterdisplay;
