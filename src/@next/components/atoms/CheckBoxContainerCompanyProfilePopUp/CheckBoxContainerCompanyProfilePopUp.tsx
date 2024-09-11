import React from "react";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import * as S from "./style";

export interface ICheckBoxContainerCompanyProfilePopUpProps {
  checkboxContent: Array<string>;
}

export const CheckBoxContainerCompanyProfilePopUp: React.FC<ICheckBoxContainerCompanyProfilePopUpProps> = ({
  checkboxContent,
}) => {
  return (
    <S.Container>
      {checkboxContent.map((content, idx) => {
        return (
          <CustomCheckBox checkboxName={content} checkboxLabel={content} />
        );
      })}
    </S.Container>
  );
};
CheckBoxContainerCompanyProfilePopUp.displayName =
  "CheckBoxContainerCompanyProfilePopUp";
export default CheckBoxContainerCompanyProfilePopUp;
