import React from "react";
import * as S from "./style";

export interface IInvoiceTextAndPriceProps {
  text: string;
  money: React.ReactNode | number;
  className?: string;
}

export const InvoiceTextAndPrice: React.FC<IInvoiceTextAndPriceProps> = ({
  text,
  money,
  className = "",
}) => {
  return (
    <>
      <S.Div className={className}>
        <div>{text}</div>
        <div>{money}</div>
      </S.Div>
    </>
  );
};
InvoiceTextAndPrice.displayName = "InvoiceTextAndPrice";
export default InvoiceTextAndPrice;
