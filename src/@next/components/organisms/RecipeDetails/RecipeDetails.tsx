import React, { useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

// import { RouteComponentProps } from "react-router-dom";
import { getMetadataValue } from "@utils/misc";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Loader } from "@components/atoms/Loader";
import { TypedRecipeDetailsQuery } from "./queries";
import * as S from "./styles";
import GalleryCarousel from "@temp/themes/wowfc-new/views/Product/GalleryCarousel";

export interface IRecipeDetailsProps {}

export const RecipeDetails: React.FC<{ id?: string }> = ({
  match: {
    params: { id },
  },
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const variables = {
    id,
  };
  const getData = data => {
    const newData: {
      name?: string;
      images?: any[];
      description?: string;
      ingredients?: string[];
      instructions?: string[];
    } = { name: data.product.name, images: data.product.images };
    newData.description = JSON.parse(
      data.product.descriptionJson
    ).blocks[0].text;
    newData.ingredients =
      getMetadataValue(data.product.metadata, "ingredients") &&
      JSON.parse(getMetadataValue(data.product.metadata, "ingredients"));
    newData.instructions =
      getMetadataValue(data.product.metadata, "instructions") &&
      JSON.parse(getMetadataValue(data.product.metadata, "instructions"));

    return newData;
  };
  return (
    <>
      <div className="container">
        <MyCustomLink href="/page/recipes">
          &lt;&nbsp;Back to Recipes
        </MyCustomLink>
      </div>
      <TypedRecipeDetailsQuery variables={variables}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <>
                <Loader />
              </>
            );
          }

          data = getData(data);
          return (
            <>
              <div className="container">
                <S.TopContainer>
                  <S.TopLeftRecipeGalleryContainer>
                    <GalleryCarousel
                      images={data.images}
                      mobileCarouselProps={{ showIndicators: true }}
                      desktopCarouselProps={{
                        showIndicators: true,
                        showThumbs: true,
                      }}
                    />
                  </S.TopLeftRecipeGalleryContainer>
                  <S.TopRightRecipeDetailsContainer>
                    <S.RecipeName>{data.name}</S.RecipeName>
                    <S.Description>
                      <S.DescriptionContent show={showDescription}>
                        {data.description}
                      </S.DescriptionContent>
                      <S.ReadMore
                        onClick={() => setShowDescription(!showDescription)}
                      >
                        {showDescription === true ? (
                          <>READ LESS</>
                        ) : (
                          <>READ MORE</>
                        )}
                      </S.ReadMore>
                    </S.Description>
                  </S.TopRightRecipeDetailsContainer>
                </S.TopContainer>
              </div>
              <S.IngredientsandInstructionsList className="container">
                <S.IngredientsDivision>
                  <ProductHeader heading="Ingredients" />
                  <S.IngredientsList>
                    {data.ingredients &&
                      data.ingredients.map(ingredient => {
                        return <li>{ingredient}</li>;
                      })}
                  </S.IngredientsList>
                </S.IngredientsDivision>
                <S.InstructionsDivision>
                  <ProductHeader heading="Instructions" />
                  <S.InstructionsList>
                    {data.instructions &&
                      data.instructions.map(instruction => {
                        return <li>{instruction}</li>;
                      })}
                  </S.InstructionsList>
                </S.InstructionsDivision>
              </S.IngredientsandInstructionsList>
            </>
          );
        }}
      </TypedRecipeDetailsQuery>
      <hr width="90%" />
    </>
  );
};
RecipeDetails.displayName = "RecipeDetails";
export default RecipeDetails;
