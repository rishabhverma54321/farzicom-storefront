import React from "react";
import { styled } from "@styles/themes";
import FilterIcon from "../../../../images/yarn-filter/FilterIcon";
import YarnFilter from ".";

export const FilterModal = styled.article`
  position: relative;
  display: inline-block;
  &:hover .yarn-filter {
    display: block;
  }
  & button svg {
    font-size: 1.5rem;
  }
`;
function Filter({ title, color }: { title: string; color?: string }) {
  return (
    <FilterModal>
      <button className="dropdown__filter">
        <FilterIcon />
      </button>
      <YarnFilter title={title} color={color} />
    </FilterModal>
  );
}

export default Filter;
