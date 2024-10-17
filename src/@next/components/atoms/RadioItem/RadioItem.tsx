import React from "react";
import * as S from "./style";
import style from "./scss/index.module.scss"

export interface IRadioItemProps {
  checked: boolean;
  label?: string;
  id: string;
  onCollectionChange: (id: string, name: string) => void;
}

export const RadioItem: React.FC<IRadioItemProps> = ({
  checked,
  label,
  id,
  onCollectionChange,
}) => {
  return (
    <div
      className={style.Wrapper}
      onClick={() => {
        onCollectionChange(id, label);
      }}
    >
      <input
        type="radio"
        className={`custom-radio-button ${style.RadioInput}`}
        checked={checked}
        value={id}
        id={id}
      />
      <span className={style.RadioLabel}>{label || ""}</span>
    </div>
  );
};
RadioItem.displayName = "RadioItem";
export default RadioItem;
