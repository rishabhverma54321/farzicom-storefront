import React, { useContext } from "react";
import isEqual from "lodash/isEqual";
import { RupeesDiscounted, RupeesUndiscounted } from "@components/atoms/SvgIcons";
import { useGetItemDiscount } from "@hooks/useGetItemDiscount";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { ITaxedMoney } from "@types";

import * as S from "./styled";

const defaultConfig = {
  priceWithFractions: true,
};

export interface IConfig {
  priceWithFractions?: Boolean;
}

export interface IPriceProps {
  product: any;
  config?: IConfig;
}

export const Price: React.FC<IPriceProps> = ({
  product,
  config = defaultConfig,
}) => {
  const { priceWithFractions } = config;
  const { metadata, pricing: productPricingRange, variants } = product;

  const listPriceArray =
    metadata && metadata.filter((item: any) => item.key === "listPrice");
  const listPrice =
    listPriceArray && listPriceArray.length > 0
      ? JSON.parse(listPriceArray[0].value)
      : null;
  const variantPricing = variants && variants[0]?.pricing;
  const { priceUndiscounted, price } = variantPricing;
  const itemDiscount = useGetItemDiscount(
    productPricingRange,
    listPrice,
    variantPricing,
    true // asNumber
  );
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
    if (listPrice) {
      return (
        <>
          <S.UndiscountedPrice>
            <RupeesUndiscounted className="rupees-undiscounted" />
            {listPrice}
          </S.UndiscountedPrice>
          <S.DiscountedPrice>
            <RupeesDiscounted className="rupees-discounted" />
            {getMoney(price)}
          </S.DiscountedPrice>
          {itemDiscount && <S.Discount>{itemDiscount}% Off</S.Discount>}
        </>
      );
    }
    if (isEqual(priceUndiscounted, price)) {
      return (
        <>
          <S.DiscountedPrice>
            <RupeesDiscounted className="rupees-discounted" />
            {getMoney(price)}
          </S.DiscountedPrice>
          {itemDiscount && <S.Discount>{itemDiscount}% Off</S.Discount>}
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

  if (!productPricingRange?.priceRange) {
    return <></>;
  }

  const { start, stop } = productPricingRange?.priceRange;
  if (isEqual(start, stop)) {
    return (
      <>
        <RupeesDiscounted className="rupees-discounted" />
        {getMoney(start)}
      </>
    );
  }
  return (
    <>
      <RupeesDiscounted className="rupees-discounted" />
      {getMoney(start)}
      {" - "}
      <RupeesDiscounted className="rupees-discounted" />
      {getMoney(stop)}
    </>
  );
};

Price.displayName = "Price";
export default Price;
