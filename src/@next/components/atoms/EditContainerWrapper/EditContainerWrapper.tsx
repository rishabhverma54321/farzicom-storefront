import LeftArrow from "images/profileSvg/LeftArrowSVG";
import React from "react";
import * as EW from "./styles";

export interface IEditContainerWrapperProps {
  title: string;
  display: boolean;
  modalClose: () => void;
}

export const EditContainerWrapper: React.FC<IEditContainerWrapperProps> = ({
  children,
  title,
  modalClose,
}) => {
  return (
    <EW.WrapperBox className="wrapper">
      <div className="wrapper__modal">
        <EW.HeadingBox>
          <LeftArrow className="wrapper__leftArrow" onClick={modalClose} />
          <h1 className="wrapper__heading">{title}</h1>
        </EW.HeadingBox>
        <div className="wrapper__body">{children}</div>
      </div>
    </EW.WrapperBox>
  );
};
EditContainerWrapper.displayName = "EditContainerWrapper";
export default EditContainerWrapper;
