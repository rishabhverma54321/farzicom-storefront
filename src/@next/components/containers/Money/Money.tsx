import React from "react";
import { IProps } from "./types";

export const Money: React.FC<IProps> = ({
  money,
  defaultValue,
  hideFraction,
  ...props
}: IProps) => {
  if (!money) {
    return <span {...props}>{defaultValue}</span>;
  }
  if (hideFraction) {
    return (
      <span {...props}>
        {money.currency && money.currency !== ""
          ? money?.amount?.toLocaleString(undefined, {
              currency: money.currency,
              style: "currency",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })
          : money.amount?.toString()}
      </span>
    );
  }
  return (
    <span {...props}>
      {money.currency && money.currency !== ""
        ? money?.amount?.toLocaleString(undefined, {
            currency: money.currency,
            style: "currency",
          })
        : money.amount?.toString()}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
