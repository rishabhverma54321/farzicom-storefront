import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useCustomLocation } from "@hooks/useCustomLocation";

import NoPhoto from "images/no-photo.svg";
import * as S from "./styles";

export interface IRecipeCardProps {
  recipe?: any;
  recipeCardClassName?: string;
  hoverShadow?: string;
}

export const RecipeCard: React.FC<IRecipeCardProps> = ({
  recipe,
  recipeCardClassName,
  hoverShadow,
}) => {
  const { url, image, name } = recipe;
  return (
    <>
      <S.CardBody hoverShadow={hoverShadow} className={recipeCardClassName}>
        <MyCustomLink
          href={url}
          className={`${recipeCardClassName}__imageLink`}
        >
          {typeof image === "string" ? (
            <S.CardImage>
              <img src={image || NoPhoto} width="90%" alt="img" />
            </S.CardImage>
          ) : (
            image
          )}
        </MyCustomLink>
        {/* <div> */}
        <S.CardInfo className={`${recipeCardClassName}__cardInfo`}>
          <MyCustomLink href={url}>
            <S.CardName>{name}</S.CardName>
          </MyCustomLink>
        </S.CardInfo>
        {/* {shortDescription && pathname === "/" && (
          <S.CardShortDdescription className={`${productCardClassName}__shortDescription`}>
            {shortDescription.map(desc => (
              <li>-{desc}</li>
            ))}
          </S.CardShortDdescription>
        )} */}

        {/* {button === false ? (
          <CustomizeButton
            text="KNOW MORE"
            link={id && name ? generateProductUrl(id, name) : "/"}
            buttonClass="whatsNewButton"
          />
        ) : (
          <S.CardButton className={`${classname}__buttonContainer`}>
            <AddToCartButton
              onSubmit={async disabled => {
                if (disabled && refetch) {
                  refetch();
                } else {
                  setLoading(true);
                  productClick();
                  handleAddToCart(variantId, 1);
                }
              }}
              loading={loading}
              disabled={itemAdded ? false : disableButton}
              itemAdded={itemAdded}
              size="sm"
              page=""
              productId={product?.id}
              leftIcon="images/cart.svg"
            />
          </S.CardButton>
        )} */}

        {/* </div> */}
      </S.CardBody>
    </>
  );
};
RecipeCard.displayName = "RecipeCard";
export default RecipeCard;
