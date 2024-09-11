import React from "react";
import { Overlay, OverlayContextInterface } from "@temp/components";
import Media from "react-media";

import { largeScreen } from "@styles/constants";
import MemoCircularCloseIcon from "@components/atoms/SvgIcons/CircularCloseIcon";
import * as S from "./style";

interface ISearchSortListProps {
  overlay: OverlayContextInterface;
}

export const SearchSortList: React.FC<ISearchSortListProps> = ({ overlay }) => {
  //   Filter states
  const {
    initialStates,
    selectedSorting,
    onSortValueChange,
  } = overlay.context.data;

  const {
    sortOptions,
  }: { sortOptions: { label: string; field: string }[] } = initialStates;

  return (
    <Overlay testingContext="test" context={overlay}>
      <Media
        query={{ maxWidth: largeScreen }}
        render={() => (
          <S.Wrapper>
            <S.CloseButtonWrapper>
              <span onClick={() => overlay.hide()}>
                <MemoCircularCloseIcon />
              </span>
            </S.CloseButtonWrapper>
            <S.ContentWrapper>
              <S.FilterTable>
                {sortOptions && Array.isArray(sortOptions) ? (
                  sortOptions.map((option, index) => {
                    return (
                      <S.SortItem
                        onClick={() => {
                          onSortValueChange(option.label);
                          overlay.hide();
                        }}
                        borderBottom={index !== sortOptions.length - 1}
                        isSelected={
                          JSON.stringify(selectedSorting) ==
                          JSON.stringify(option.field)
                        }
                      >
                        {option.label}
                      </S.SortItem>
                    );
                  })
                ) : (
                  <></>
                )}
              </S.FilterTable>
            </S.ContentWrapper>
          </S.Wrapper>
        )}
      />
    </Overlay>
  );
};

SearchSortList.displayName = "SearchSortList";
export default SearchSortList;
