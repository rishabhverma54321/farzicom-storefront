import React from "react";
import SavingIcon from "@components/atoms/SvgIcons/SavingIcon";
import * as S from "./styles";

export interface IYouSaveStripProps {
  price: number;
  padding?: string;
  margin?: string;
}

export const YouSaveStrip: React.FC<IYouSaveStripProps> = ({
  price,
  padding = "0.5rem",
  margin = "5px 0",
}) => {
  return (
    <S.Wrapper padding={padding} margin={margin}>
      <SavingIcon fontSize="1.1rem" />
      <S.Content>
        You save <S.Price>₹ {price}</S.Price> with this order.
      </S.Content>
    </S.Wrapper>
  );
};
YouSaveStrip.displayName = "YouSaveStrip";
export default YouSaveStrip;
