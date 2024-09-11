import React, { ReactNode, FC } from "react";
import * as AC from "./styles";

export interface Props {
  fieldOne: string | ReactNode;
  fieldTwo: string | ReactNode;
}
const Quantity: FC<Props> = ({ fieldOne, fieldTwo }) => {
  return (
    <AC.Quantity>
      <h3>{fieldOne}</h3>
      <h4>{fieldTwo}</h4>
    </AC.Quantity>
  );
};

export default Quantity;
