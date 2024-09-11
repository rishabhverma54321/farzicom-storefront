import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * The attribute
 */
export const Attribute: React.FC<IProps> = ({
  description,
  attributeValue,
  testingContext,
  changePosition
}: IProps) => {
  return (
    <S.Wrapper changePosition={changePosition}>
      <S.Description changePosition={changePosition}>{description}</S.Description>
      <div data-test={testingContext}>{attributeValue}</div>
    </S.Wrapper>
  );
};
