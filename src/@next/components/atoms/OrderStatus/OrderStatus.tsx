import React from "react";
import * as S from "./style";

export interface IOrderStatusProps {
  ClassName?: string;
}

export const OrderStatus: React.FC<IOrderStatusProps> = ({ ClassName }) => {
  return (
    <div className={ClassName}>
      <S.Title textColor="#33A532" className={`${ClassName}__title`}>
        Completed
      </S.Title>
      <S.Info className={`${ClassName}__info`}>23 June 2021</S.Info>
    </div>
  );
};
OrderStatus.displayName = "OrderStatus";
export default OrderStatus;
