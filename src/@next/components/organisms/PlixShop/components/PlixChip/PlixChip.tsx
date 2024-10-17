import React from "react";
import ReactSVG from "react-svg";
import * as S from "./style";
import CloseButton from "../../assets/closeButton.svg";
import MemocloseButton from "../../assets/closeButton";
import style from "../../scss/index.module.scss"

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
    <div className={style.chipWrapper}>
      <div className={style.Text}>{text}</div>
      <div className={style.clossWrapper} onClick={() => onFilterRemove(filterId)} >
        <MemocloseButton/>
      </div>
    </div>
  ) : null;
};
PlixChip.displayName = "PlixChip";
export default PlixChip;
