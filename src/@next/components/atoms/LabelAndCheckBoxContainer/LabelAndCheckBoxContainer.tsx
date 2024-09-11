import React from "react";
import { CheckBoxContainerCompanyProfilePopUp } from "../CheckBoxContainerCompanyProfilePopUp";
import * as S from "./style";

export interface ILabelAndCheckBoxContainerProps {
  labelName: string;
  checkboxName: Array<string>;
  className: string;
}

export const LabelAndCheckBoxContainer: React.FC<ILabelAndCheckBoxContainerProps> = ({
  checkboxName,
  labelName,
  className,
}) => {
  return (
    <S.Container className={`${className} __checkbox-container`}>
      <p>{labelName}</p>
      <CheckBoxContainerCompanyProfilePopUp checkboxContent={checkboxName} />
    </S.Container>
  );
};
LabelAndCheckBoxContainer.displayName = "LabelAndCheckBoxContainer";
export default LabelAndCheckBoxContainer;
