import React, { useContext } from "react";
import isEqual from "lodash/isEqual";
import { RupeesDiscounted, RupeesUndiscounted } from "@components/atoms/SvgIcons";

import { getItemDiscount } from "@hooks/useGetItemDiscount";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { ITaxedMoney } from "@types";
import { IConfig } from "./Price";
import * as S from "./styled";

const defaultConfig = {
  priceWithFractions: true,
};

export interface IPriceOfVariantProps {
  variantPricing: any;
  config?: IConfig;
}

const PriceOfVariant: React.FC<IPriceOfVariantProps> = ({
  variantPricing,
  config = defaultConfig,
}) => {
  const { priceWithFractions } = config;
  const { priceUndiscounted, price } = variantPricing;
  const itemDiscount = getItemDiscount(variantPricing);

  const { displayGrossPrices } = useContext(ShopContext);
  const getMoney = (taxedMoney: ITaxedMoney) => {
    const amount = displayGrossPrices
      ? taxedMoney.gross?.amount
      : taxedMoney.net?.amount;
    // Float to Int
    // eslint-disable-next-line no-bitwise
    return priceWithFractions ? amount : ~~amount;
  };

  if (variantPricing) {
    if (isEqual(priceUndiscounted, price)) {
      return (
        <>
          <S.DiscountedPrice>
            <RupeesDiscounted className="rupees-discounted" />
            {getMoney(price)}
          </S.DiscountedPrice>
          {!!itemDiscount && <S.Discount>{itemDiscount}% Off</S.Discount>}
        </>
      );
    }
    return (
      <>
        <S.DiscountedPrice>
          <RupeesDiscounted className="rupees-discounted" />
          {getMoney(price)}
        </S.DiscountedPrice>
        <S.UndiscountedPrice>
          <RupeesUndiscounted className="rupees-undiscounted" />
          {getMoney(priceUndiscounted)}
        </S.UndiscountedPrice>
        {itemDiscount && <S.Discount>{itemDiscount}% Off</S.Discount>}
      </>
    );
  }
  return <></>;
};

PriceOfVariant.displayName = "PriceOfVariant";
export default PriceOfVariant;
