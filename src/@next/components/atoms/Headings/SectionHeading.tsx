import React from "react";

import * as S from "./styled";

export interface ISectionHeading {
  children: React.ReactNode;
}

const SectionHeading: React.FC<ISectionHeading> = ({ children }) => {
  return (
    <S.Header>
      <S.Heading>{children}</S.Heading>
    </S.Header>
  );
};
SectionHeading.displayName = "SectionHeading";
export default SectionHeading;
