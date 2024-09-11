import React from "react";
import ReactSVG from "react-svg";
import SliderIcon from "../../assets/sliders.svg";
import GreenUpArrow from "../../assets/GreenUpArrow.svg";
import * as S from "./style";

interface IBottomFilterOpenerProps {
  activeFilters: any[];
  onClick: () => void;
}

export const BottomFilterOpener: React.FC<IBottomFilterOpenerProps> = ({
  activeFilters,
  onClick,
}) => {
  return (
    <S.Wrapper onClick={onClick}>
      <div>
        <ReactSVG className="mobile-filter-icon" path={SliderIcon} />
        <S.FilterContainer>
          <span>Filter By:</span>
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
        <ReactSVG path={GreenUpArrow} />
      </div>
    </S.Wrapper>
  );
};
BottomFilterOpener.displayName = "BottomFilterOpener";
export default BottomFilterOpener;
