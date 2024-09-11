import MobileFilterItem from "@components/atoms/MobileFilterItem";
import React from "react";
import * as S from "./style";

export interface IMobileFilterListProps {
  filterData: any[];
  onFilterChange: (id: string, name: string) => void;
  makeLink?: boolean;
  onLinkClick?:any;
}

export const MobileFilterList: React.FC<IMobileFilterListProps> = ({
  filterData,
  onFilterChange,
  makeLink,
  onLinkClick
}) => {
  return (
    <div>
      <S.Wrapper>
        {filterData.map((filter, index) => (
          <MobileFilterItem
            filter={filter}
            onFilterChange={onFilterChange}
            key={index}
            makeLink={makeLink}
            onLinkClick={onLinkClick}
          />
        ))}
      </S.Wrapper>
    </div>
  );
};
MobileFilterList.displayName = "MobileFilterList";
export default MobileFilterList;
