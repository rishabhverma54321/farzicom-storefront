import { CollectionHeading } from "@components/atoms/CollectionHeading";
import React from "react";
import * as S from "./style";

export interface IMainContainerProps {
  text: string;
  children: React.ReactNode;
  colorName: string;
  padding: string;
}

export const MainContainer: React.FC<IMainContainerProps> = ({
  text,
  children,
  colorName,
  padding,
}) => {
  return (
    <>
      <S.Container colorName={colorName} padding={padding}>
        <CollectionHeading Heading={text} />
        {children}
      </S.Container>
    </>
  );
};
MainContainer.displayName = "MainContainer";
export default MainContainer;
