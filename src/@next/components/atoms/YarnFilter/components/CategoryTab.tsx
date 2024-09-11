import React from "react";
import * as T from "./styles";

export interface ICategoryTabProps {
  text: string;
  icon?: React.ReactNode;
  activebar?: boolean;
  styleClass?: string;
  setterFun?: any;
  id?: number;
  activebarClr?: string;
}
function CategoryTab({
  text,
  icon,
  activebar,
  styleClass,
  id,
  setterFun,
  activebarClr,
}: ICategoryTabProps) {
  return (
    <T.Tab
      className={`tab ${styleClass} ${activebar && "background-affect"}`}
      onClick={() => setterFun(id)}
    >
      {icon && <span className="tab__icon">{icon}</span>}
      <span className="tab__text">{text}</span>
      {activebar && <T.ActiveBar color={activebarClr} />}
    </T.Tab>
  );
}

export default CategoryTab;
