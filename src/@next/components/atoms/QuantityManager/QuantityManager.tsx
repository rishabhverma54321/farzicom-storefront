import React from "react";
import { QuantityDecrease, QuantityIncrease } from "../SvgIcons";
// import {  QuantityDecrease } from "@components/atoms/QuantityDecrease";
// import { QuantityIncrease } from "@components/atoms/QuantityIncrease";

import * as S from "./QuantityManager.styled";

export interface IQuantityManagerProps {
  currentQuantity: number;
  substract: () => void;
  add: () => void;
  isItemAdded?: boolean;
}

export const QuantityManager: React.FC<IQuantityManagerProps> = ({
  currentQuantity,
  substract,
  add,
  isItemAdded = false,
}) => {
  return (
    <>
      <S.Wrapper data-test="quantityControls">
        <S.Minus
          data-test="subtractButton"
          className={currentQuantity <= 1 || isItemAdded ? "disabled" : ""}
          onClick={() =>
            currentQuantity > 1 && !isItemAdded ? substract() : null
          }
        >
          <QuantityDecrease />
        </S.Minus>

        <S.Quantity>{currentQuantity}</S.Quantity>

        <S.Plus
          data-test="increaseButton"
          className={isItemAdded ? "disabled" : ""}
          onClick={() => !isItemAdded && add()}
        >
          <QuantityIncrease />
        </S.Plus>
      </S.Wrapper>
    </>
  );
};

QuantityManager.displayName = "QuantityManager";
export default QuantityManager;
