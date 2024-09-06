import React from "react";
import { CardCustomLoaders } from "../CardCustomLoaders";

export interface IContainerSkeletonProps {
  cardCount?: number;
  containerClass?: string;
  cardClass?: string;
  headerSkeleton?: boolean;
  headerSkeletonClass?: string;
  render: {
    image?: boolean;
    title?: boolean;
    description?: boolean;
    button?: boolean;
  };
}

export const ContainerSkeleton: React.FC<IContainerSkeletonProps> = ({
  cardCount,
  containerClass,
  cardClass,
  render,
  headerSkeleton = true,
  headerSkeletonClass = "",
}) => {
  return (
    <div>
      {headerSkeleton && (
        <div className={`headerSkeleton ${headerSkeletonClass}`} />
      )}
      <div className={`containerSkeleton  ${containerClass}`}>
        {[...Array(cardCount)].map((e, i) => (
          <CardCustomLoaders key={i} render={render} cardClass={cardClass} />
        ))}
      </div>
    </div>
  );
};
ContainerSkeleton.displayName = "ContainerSkeleton";
export default ContainerSkeleton;
