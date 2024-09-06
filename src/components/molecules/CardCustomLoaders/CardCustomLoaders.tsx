import React from "react";

export interface ICardCustomLoadersProps {
  cardClass?: string;

  render: {
    image?: boolean;
    title?: boolean;
    description?: boolean;
    button?: boolean;
  };
}

export const CardCustomLoaders: React.FC<ICardCustomLoadersProps> = ({
  cardClass,
  render,
}) => {
  const {
    image = false,
    title = false,
    description = false,
    button = false,
  } = render;
  return (
    <>
      <div className={`main-item ${cardClass}`}>
        {image && <div className={`imageSkeleton ${cardClass}__image `} />}

        {title && (
          <div className={`title ${cardClass}__title`}>
            <div className="skeleton-text" />
          </div>
        )}

        {description && (
          <div className={`description ${cardClass}__description`}>
            <div className="skeleton-text" />
            <div className="skeleton-text" />
          </div>
        )}

        {button && <div className={`buttonSkeleton ${cardClass}__button `} />}
      </div>
    </>
  );
};
CardCustomLoaders.displayName = "CardCustomLoaders";
export default CardCustomLoaders;
