import React from "react";
import { HeaderText, NavHeader } from "./style";

export interface IHeaderOfferProps {
  message: String;
}

export const HeaderOffer: React.FC<IHeaderOfferProps> = ({ message }) => {
  return (
    <NavHeader>
      <HeaderText>{message}</HeaderText>
    </NavHeader>
  );
};
HeaderOffer.displayName = "HeaderOffer";
export default HeaderOffer;
