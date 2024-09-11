import React from "react";
import * as S from "./style";

export interface ICustomCheckBoxProps {
  checkboxName: string;
  checkboxLabel: string;
}

export const CustomCheckBox: React.FC<ICustomCheckBoxProps> = ({
  checkboxLabel,
  checkboxName,
}) => {
  return (
    <S.Container>
      <label htmlFor={checkboxName}>
        {checkboxLabel}
        <input
          type="checkbox"
          name={checkboxName}
          id={checkboxName}
          value={checkboxName}
        />
      </label>
    </S.Container>
  );
};
CustomCheckBox.displayName = "CustomCheckBox";
export default CustomCheckBox;
