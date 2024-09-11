import React from "react";
import * as S from "./style";

export interface ICheckBoxItemProps {
  content: {
    name: string;
    id: string;
    checked: boolean;
  };
  onProdTypeChange: (content: {
    id: string;
    checked: boolean;
    name: string;
  }) => void;
}

export const CheckBoxItem: React.FC<ICheckBoxItemProps> = ({
  content,
  onProdTypeChange,
}) => {
  return (
    <S.Wrapper
      onClick={() => {
        onProdTypeChange({
          id: content.id,
          checked: !content.checked,
          name: content.name,
        });
      }}
    >
      <S.Checkbox
        className="styled-checkbox"
        type="checkbox"
        value={content.id}
        name={content.name}
        id={content.id}
        checked={content?.checked}
      />
      <S.Label>{content.name}</S.Label>
    </S.Wrapper>
  );
};
CheckBoxItem.displayName = "CheckBoxItem";
export default CheckBoxItem;
