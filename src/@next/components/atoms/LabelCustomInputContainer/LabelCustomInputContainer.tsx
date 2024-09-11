import React, { ReactNode } from "react";
import CustomInput from "../CustomInput/CustomInput";

import * as S from "./style";

export interface ILabelCustomInputContainerProps {
  InputId: string;
  labelName: string;
  className: string;
  inputPlaceholder: string;
  inputPlaceHolderColor: string;
  id: string;
  RightIcon?: ReactNode;
  bgColor: string;
  required?: boolean;
}

export const LabelCustomInputContainer: React.FC<ILabelCustomInputContainerProps> = ({
  labelName,
  InputId,
  className,
  inputPlaceHolderColor,
  inputPlaceholder,
  id,
  RightIcon,
  bgColor,
  required,
}) => {
  return (
    <S.Container className={className} bgColor={bgColor}>
      <label htmlFor={InputId} className={className}>
        {labelName}
        {required && <span className="required">*</span>}
      </label>
      <S.Input
        type="text"
        id="fname"
        name={InputId}
        placeholder={inputPlaceholder}
      />
      {/* <CustomInput
        placeholder={inputPlaceholder}
        RightIcon={RightIcon}
        ClassName="edit_profile"
        placeHolderColor=""
        id={id}
        outerWidth={50}
      /> */}
    </S.Container>
  );
};
LabelCustomInputContainer.displayName = "LabelCustomInputContainer";
export default LabelCustomInputContainer;
