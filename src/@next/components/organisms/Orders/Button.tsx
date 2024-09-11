import React from "react";
import * as O from "./styles";

export interface ButtonProps {
  selectBtn: string;
  getFilteredData: any;
  typeColor: string | undefined;
}
function Button({ selectBtn, getFilteredData, typeColor }: ButtonProps) {
  return (
    <O.ButtonList className="orders-btn">
      <button
        onClick={() => getFilteredData("pending")}
        style={
          selectBtn === "pending"
            ? { background: `${typeColor}`, color: "#ffffff" }
            : { background: "#ffffff", color: "#000000" }
        }
      >
        Pending
      </button>
      <button
        onClick={() => getFilteredData("all")}
        style={
          selectBtn === "all"
            ? { background: `${typeColor}`, color: "#ffffff" }
            : { background: "#ffffff", color: "#000000" }
        }
      >
        All
      </button>
    </O.ButtonList>
  );
}

export default Button;
