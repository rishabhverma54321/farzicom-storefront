import React from "react";
import * as S from "./style";
import style from "./scss/index.module.scss"

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
    <div
     className={style.Wrapper}
      onClick={() => {
        onProdTypeChange({
          id: content.id,
          checked: !content.checked,
          name: content.name,
        });
      }}
    >
      <input
        className={`styled-checkbox ${style.Checkbox}`}
        type="checkbox"
        value={content.id}
        name={content.name}
        id={content.id}
        checked={content?.checked}
      />
      <span className={style.Label}>{content.name}</span>
    </div>
  );
};
CheckBoxItem.displayName = "CheckBoxItem";
export default CheckBoxItem;
