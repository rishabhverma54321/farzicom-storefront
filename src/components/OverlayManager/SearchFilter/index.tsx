import React, { useEffect, useState } from "react";
import { Overlay, OverlayContextInterface } from "@temp/components";
import Media from "react-media";
import { CheckBoxItemList } from "@components/molecules/CheckBoxItemList";
import { RadioItemList } from "@components/molecules/RadioItemList";

import { largeScreen } from "@styles/constants";
import ReactSVG from "react-svg";
import { useRouter } from "next/router";
import { generateCollectionUrl } from "@temp/core/utils";
import { FilterAccordian } from "@temp/pages/search-new/content/Accordion";
import { Slider } from "@mui/material";
import MemoCircularCloseIcon from "@components/atoms/SvgIcons/CircularCloseIcon";
import CloseButton from "./assets/CircularCloseButton.svg";
import * as S from "./style";

interface ISearchFilterProps {
  overlay: OverlayContextInterface;
}

export const SearchFilter: React.FC<ISearchFilterProps> = ({ overlay }) => {
  //   Filter states
  const {
    filters,
    onApply,
    onClear,
    initialStates,
    showPriceSlider,
  } = overlay.context.data;

  const { active_filters, slider_value, slider_range } = initialStates;

  const [activeFilters, setActiveFilters] = useState(
    active_filters || {
      // category: [],
      collections: [],
      type: [],
      // weight: [],
    }
  );
  const [sliderValue, setSliderValue] = React.useState(
    slider_value || [0, 5000]
  );

  const handleFilter = (checked, filter_name, filter_value) => {
    if (checked) {
      const updated_array = activeFilters[filter_name];
      updated_array.push(filter_value);
      setActiveFilters(activeFilters => ({
        ...activeFilters,
        [filter_name]: updated_array,
      }));
    } else {
      let updated_array_removed = activeFilters[filter_name];
      updated_array_removed = updated_array_removed.filter(
        filter => filter !== filter_value
      );
      setActiveFilters(activeFilters => ({
        ...activeFilters,
        [filter_name]: updated_array_removed,
      }));
    }
  };

  const filter_names = filters && Object.keys(filters);
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
              <S.FilterHeader>Filter By</S.FilterHeader>

              <S.FilterTable>
                {showPriceSlider ? (
                  <S.SliderWrapper>
                    <S.SliderHeader>Price Range</S.SliderHeader>
                    <div>
                      <Slider
                        value={sliderValue}
                        onChange={(event, newValue) => setSliderValue(newValue)}
                        valueLabelDisplay="off"
                        color="primary"
                        min={slider_range[0]}
                        max={slider_range[1]}
                        step={20}
                      />
                    </div>
                    <span>
                      {" "}
                      &#x20B9;{sliderValue[0]}- &#x20B9;{sliderValue[1]}
                    </span>
                  </S.SliderWrapper>
                ) : (
                  <></>
                )}
                {filter_names?.length ? (
                  filter_names?.map(filter_name => {
                    let subFilters = filters[filter_name];
                    subFilters = subFilters.filter(
                      subfilter => !subfilter.label.includes("__")
                    );
                    return (
                      <>
                        {subFilters && subFilters.length ? (
                          <FilterAccordian
                            header={filter_name?.split("_")?.join(" ")}
                          >
                            {subFilters.map((subFilter, index) => {
                              return (
                                <div key={subFilter?.label + index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      checked={
                                        activeFilters &&
                                        activeFilters[filter_name].includes(
                                          subFilter?.label
                                        )
                                      }
                                      onChange={e =>
                                        handleFilter(
                                          e.target.checked,
                                          filter_name,
                                          subFilter?.label
                                        )
                                      }
                                    />
                                    <span>{subFilter?.label}</span>{" "}
                                  </div>

                                  <span>[{subFilter?.value}]</span>
                                </div>
                              );
                            })}
                          </FilterAccordian>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </S.FilterTable>
              <S.ButtonContainer>
                <button
                  onClick={() => {
                    onClear();
                    overlay.hide();
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    onApply(activeFilters, sliderValue);
                    overlay.hide();
                  }}
                >
                  Apply
                </button>
              </S.ButtonContainer>
            </S.ContentWrapper>
          </S.Wrapper>
        )}
      />
    </Overlay>
  );
};

SearchFilter.displayName = "SearchFilter";
export default SearchFilter;
