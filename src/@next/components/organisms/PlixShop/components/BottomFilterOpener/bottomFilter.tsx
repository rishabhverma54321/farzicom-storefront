import React from "react";
import ReactSVG from "react-svg";
import SliderIcon from "../../assets/sliders.svg";
import GreenUpArrow from "../../assets/GreenUpArrow.svg";
import * as S from "./style";
import MemoSliderToggle from "@components/atoms/SvgIcons/SliderToggle";
import MemoCircularButton from "@components/atoms/SvgIcons/CircularButton";
import { useRouter } from "next/router";

interface IBottomFilterOpenerProps {
  activeFilters: any[];
  onClick: () => void;
}

export const BottomFilterOpener: React.FC<IBottomFilterOpenerProps> = ({
  activeFilters,
  onClick,
}) => {
  const route = useRouter();
  return (
    <S.Wrapper onClick={onClick}>
      <div>
        {/* <ReactSVG className="mobile-filter-icon" path={SliderIcon} /> */}
        <S.MobileFilterIcon>
          {/* <img src="/plixlifefc/assets/mobile_filter_icon.png" /> */}
          <MemoSliderToggle />
        </S.MobileFilterIcon>
          <S.FilterContainer>
            <span className="filter_heading">Filter By:</span>
            {activeFilters.map((filter, index) => {
              return index < activeFilters.length - 1 ? (
                <S.ActiveFilter key={index}>{filter.name},</S.ActiveFilter>
              ) : (
                <S.ActiveFilter key={index}>{filter.name}</S.ActiveFilter>
              );
            })}
          </S.FilterContainer>
      </div>
      <div>
        {/* <img src="/plixlifefc/assets/mobile_filter_show_icon.svg" /> */}
        <MemoCircularButton />
        {/* <ReactSVG path={GreenUpArrow} /> */}
      </div>
    </S.Wrapper>
  );
};
BottomFilterOpener.displayName = "BottomFilterOpener";
export default BottomFilterOpener;
