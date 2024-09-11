import React from "react";
import OrangeRupee from "images/lotus-stage/lotus/OrangeRupee.svg";
import ReactSVG from "react-svg";
import * as S from "./styles";

export interface ICashbackStripNewProps {
  amount: number | null | undefined;
  ClassName?: string;
}

export const CashbackStripNew: React.FC<ICashbackStripNewProps> = ({
  amount,
  ClassName,
}) => {
  return (
    <>
      {amount ? (
        <S.Wrapper className={`cbstrip__${ClassName}`}>
          <S.IconWrapper>
            <ReactSVG path={OrangeRupee} />
          </S.IconWrapper>
          <S.Text>
            You will get <S.AmountText>{amount}</S.AmountText> cashback after
            delivery
          </S.Text>
        </S.Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
CashbackStripNew.displayName = "CashbackStripNew";
export default CashbackStripNew;
