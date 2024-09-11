import React from "react";
import ReactSVG from "react-svg";
import * as S from "./style";
import CloseButton from "../../assets/closeButton.svg";
import MemocloseButton from "../../assets/closeButton";

interface PlixChipProps {
  text?: string;
  filterId: string;
  onFilterRemove: (id: string) => void;
}

export const PlixChip: React.FC<PlixChipProps> = ({
  text,
  filterId,
  onFilterRemove,
}) => {
  return text ? (
    <S.Wrapper>
      <S.Text>{text}</S.Text>
      <S.CloseWrapper onClick={() => onFilterRemove(filterId)} >
        <MemocloseButton/>
      </S.CloseWrapper>
    </S.Wrapper>
  ) : null;
};
PlixChip.displayName = "PlixChip";
export default PlixChip;
