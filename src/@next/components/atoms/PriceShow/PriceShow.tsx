import React from "react";
import * as S from "./style";

export interface IPriceShowProps {
  // oldPrice: JSX.Element | number | undefined;
  price: JSX.Element | number | undefined;
  discount?: string | Number | null;
  alignMent: string;
  priceSectionClass?: string;
  className?: string;
}

export const PriceShow: React.FC<IPriceShowProps> = ({
  // oldPrice,
  price,
  discount,
  alignMent,
  priceSectionClass,
  className,
}) => {
  return (
    <>
      <S.CPriceContainer
        alignMent={alignMent}
        className={`price-show-wrapper ${className}`}
      >
        <S.PriceSection className={priceSectionClass}>{price}</S.PriceSection>
      </S.CPriceContainer>
    </>
  );
};
PriceShow.displayName = "PriceShow";
export default PriceShow;
