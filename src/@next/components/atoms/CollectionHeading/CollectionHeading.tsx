import React from "react";
import * as S from "./style";

export interface ICollectionHeadingProps {
  Heading: string;
}

export const CollectionHeading: React.FC<ICollectionHeadingProps> = ({
  Heading,
}) => {
  return (
    <>
      <S.Heading> {Heading} </S.Heading>
    </>
  );
};
CollectionHeading.displayName = "CollectionHeading";
export default CollectionHeading;
