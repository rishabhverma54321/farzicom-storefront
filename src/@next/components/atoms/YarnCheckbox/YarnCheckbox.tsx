import React, { useState } from "react";
import * as C from "./styles";
import RightClick from "../../../../images/profileSvg/GreenTickProfile";

export interface IYarnCheckboxProps {
  heightClass?: string;
  active?: boolean;
  bgColor?: string;
}

export const YarnCheckbox: React.FC<IYarnCheckboxProps> = ({
  heightClass,
  active,
  bgColor,
}) => {
  const [check, setCheck] = useState(false);
  const handleCheck = (e: any) => {
    e.stopPropagation();
    setCheck(prev => !prev);
  };
  return (
    <C.Checkbox
      className={`${heightClass} ${check ? "active" : "not-active"}`}
      back={bgColor}
      active={check}
      onClick={e => handleCheck(e)}
    >
      <RightClick />
    </C.Checkbox>
  );
};
YarnCheckbox.displayName = "YarnCheckbox";
export default YarnCheckbox;
