import React from "react";

import { NavLink } from "@components/atoms/NavLink";
import { ShadowBox } from "@components/atoms/ShadowBox";
import { useHandlerWhenClickedOutside } from "@hooks/useHandlerWhenClickedOutside";

import * as S from "./styles";

const Column: React.FC<any> = ({ item }) => (
  <S.RowItem>
    <S.SubLink item={item} />
    {item.children.length > 0 &&
      item.children.map((subitem: any) => <S.SubLink item={subitem} light />)}
  </S.RowItem>
);

export const Dropdown: React.FC<any> = ({ onHide, item }) => {
  const { setElementRef } = useHandlerWhenClickedOutside(onHide);

  return (
    <S.Wrapper ref={setElementRef} onMouseLeave={onHide} onClick={onHide}>
      <S.Rows>
        {item.children.map((item: any) => (
          <Column item={item} />
        ))}
      </S.Rows>
      <S.Side>
        <S.RowItem>
          <NavLink item={{ ...item, name: "view all products" }} />
        </S.RowItem>
      </S.Side>
      <ShadowBox />
    </S.Wrapper>
  );
};
