import React from "react";
import * as S from "./styles";

export interface IStyledSelectProps {
  name: string;
  options: any[];
}

export const StyledSelect: React.FC<IStyledSelectProps> = ({
  name,
  options,
}) => {
  return (
    <>
      <S.StlyedSelectField component="select" name={name}>
        {" "}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.lable}
          </option>
        ))}{" "}
      </S.StlyedSelectField>
    </>
  );
};
StyledSelect.displayName = "StyledSelect";
export default StyledSelect;
