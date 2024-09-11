import React from "react";
import { ITaxedMoney } from "@types";
import { ShopContext } from "@temp/components/ShopProvider/context";
import styles from "./index.module.scss";

export interface IMoneyNextProps {
  taxedMoney?: ITaxedMoney | null;
  displayGrossPrices?: boolean;
}

export const MoneyNext: React.FC<IMoneyNextProps> = ({
  taxedMoney,
  displayGrossPrices = true,
}) => {
  const priceToShow = displayGrossPrices
    ? taxedMoney?.gross?.amount
    : taxedMoney?.net?.amount;
  return <div className={styles.money}> &#8377; {priceToShow}</div>;
};
MoneyNext.displayName = "MoneyNext";
export default React.memo(MoneyNext);
