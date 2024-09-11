import React from "react";

import styled from "styled-components";
import * as S from "./styles";
import { IProps } from "./types";

const Backdrop = styled.div`
  position: fixed;
  /* top: 50%; */
  height: 100vh;
  width: 100vw;
  display: flex;
  /* background: rgba(0, 0, 0, 0.1); */
  z-index: 5;
  top: 0;
  left: 0;
`;
export const Loader: React.FC<IProps> = ({ fullScreen }: IProps) => {
  return (
    <Backdrop>
      <S.Wrapper fullScreen={!!fullScreen}>
        <S.Items>
          <span />
          <span />
          <span />
        </S.Items>
      </S.Wrapper>
    </Backdrop>
  );
};
