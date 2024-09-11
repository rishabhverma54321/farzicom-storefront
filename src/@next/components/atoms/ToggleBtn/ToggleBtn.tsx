import React from "react";
import * as T from "./styles";

export interface IToggleBtnProps {
  buttonOne: string;
  buttonTwo: string;
  selectBtn: any;
  setSelectBtn: any;
  ClassStyle: string;
}

export const ToggleBtn: React.FC<IToggleBtnProps> = ({
  buttonOne,
  buttonTwo,
  selectBtn,
  setSelectBtn,
  ClassStyle,
}) => {
  //
  return (
    <T.ButtonList className={ClassStyle}>
      <button
        onClick={() => setSelectBtn(buttonOne)}
        className={`${selectBtn === buttonOne ? "first-btn" : "default"}`}
      >
        {buttonOne}
      </button>
      <button
        onClick={() => setSelectBtn(buttonTwo)}
        className={`${selectBtn === buttonTwo ? "second-btn" : "default"}`}
      >
        {buttonTwo}
      </button>
    </T.ButtonList>
  );
};
ToggleBtn.displayName = "ToggleBtn";
export default ToggleBtn;
