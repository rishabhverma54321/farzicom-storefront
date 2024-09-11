import React from "react";
import * as S from "./style";

export interface ICollectionHeadingIkkaiProps {
  Heading: string;
  className?: string;
}

export const CollectionHeadingIkkai: React.FC<ICollectionHeadingIkkaiProps> = ({
  Heading,
  className,
}) => {
  return (
    <>
      <S.SectionHeading className={className}>{Heading}</S.SectionHeading>
    </>
  );
};
CollectionHeadingIkkai.displayName = "CollectionHeadingIkkai";
export default CollectionHeadingIkkai;
