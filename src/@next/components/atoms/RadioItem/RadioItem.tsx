import React from "react";
import * as S from "./style";

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
    <S.Wrapper
      onClick={() => {
        onCollectionChange(id, label);
      }}
    >
      <S.RadioInput
        type="radio"
        className="custom-radio-button"
        checked={checked}
        value={id}
        id={id}
      />
      <S.RadioLabel>{label || ""}</S.RadioLabel>
    </S.Wrapper>
  );
};
RadioItem.displayName = "RadioItem";
export default RadioItem;
