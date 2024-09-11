import MyCustomLink from "@components/next-react/MyCustomLink";
import React from "react";
import Input from "@components/farzicom-ui-kit/Input";
import * as S from "./styles";
import styles from "./index.module.scss";

export interface IContinueShoppingNextProps {
  minHeight?: string;
  width?: string;
}

export const ContinueShoppingNext: React.FC<IContinueShoppingNextProps> = ({
  minHeight,
  width,
}) => {
  return (
    <S.ContinueShopping minHeight={minHeight} width={width}>
      <MyCustomLink href="/">
        <Input
          variant={2}
          type="button"
          value="Continue Shopping"
          customStyles={styles}
          customStylesName="continueShopping"
        />
      </MyCustomLink>
    </S.ContinueShopping>
  );
};
ContinueShoppingNext.displayName = "ContinueShoppingNext";
export default ContinueShoppingNext;
