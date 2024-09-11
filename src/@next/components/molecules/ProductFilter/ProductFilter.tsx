import React from "react";

import { FormattedMessage } from "react-intl";
import { DropdownSelect } from "@components/atoms/DropdownSelect";
import * as S from "./styles";

interface SortOptions {
  value?: string;
  label: string;
}

interface ActiveFiltersAttribute {
  attributeSlug: string;
  valueSlug: string;
  valueName: string;
}
export interface IProductFilterProps {
  activeSortOption?: string;
  activeFilters: number;
  activeFiltersAttributes: ActiveFiltersAttribute[];
  numberOfProducts: number;
  sortOptions: SortOptions[];
  onChange: (order: { value?: string; label: string }) => void;
  onCloseFilterAttribute: (attributeSlug: string, valueSlug: string) => void;
  openFiltersMenu: () => void;
  clearFilters: () => void;
}

export const ProductFilter: React.FC<IProductFilterProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}) => {
  return (
    <>
      <S.Wrapper>
        <S.Bar>
          <S.RightSide>
            <S.Element data-test="productsFoundCounter">
              <S.Label>
                <FormattedMessage defaultMessage="Products found:" />{" "}
                <span style={{ color: "black" }}>{numberOfProducts}</span>
              </S.Label>
            </S.Element>
            <S.Element>
              <S.Sort>
                <DropdownSelect
                  onChange={onChange}
                  options={sortOptions}
                  value={sortOptions.find(
                    option => option.value === activeSortOption
                  )}
                />
              </S.Sort>
            </S.Element>
          </S.RightSide>
        </S.Bar>
      </S.Wrapper>
    </>
  );
};
ProductFilter.displayName = "ProductFilter";
export default ProductFilter;
