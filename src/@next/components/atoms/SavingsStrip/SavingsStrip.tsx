import React from "react";
import SavingRupeesSVG from "@components/atoms/SvgIcons/SavingsRupees";
import * as S from "./SavingsStrip.styled";

export interface ISavingsStripProps {
  totalDiscount: Number;
}

export const SavingsStrip: React.FC<ISavingsStripProps> = ({
  totalDiscount,
}) => {
  return (
    <>
      <S.Wrapper>
        <SavingRupeesSVG />
        Saving of ₹ {totalDiscount} with this order.
      </S.Wrapper>
    </>
  );
};

SavingsStrip.displayName = "SavingsStrip";
export default SavingsStrip;
