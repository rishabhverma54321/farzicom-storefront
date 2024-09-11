import React from "react";
import { Loader } from "@components/atoms/Loader";
import * as S from "./styles";
import RecipeCard from "../../molecules/RecipeCard/RecipeCard";

export interface IRecipeListProps {
  recipes?: any[];
  loading?: boolean;
  hoverShadow?: string;
  recipeCardClassName?: string;
}

export const RecipeList: React.FC<IRecipeListProps> = ({
  recipes,
  loading = false,
  hoverShadow,
  recipeCardClassName,
}) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <S.List>
          {recipes.map(recipe => {
            const { id, name } = recipe;
            return (
              id &&
              name && (
                <S.RecipeCard key={recipe.id}>
                  <div className="recipeCardContainer">
                    <RecipeCard
                      key={id}
                      recipe={recipe}
                      recipeCardClassName={recipeCardClassName}
                      hoverShadow={hoverShadow}
                    />
                  </div>
                </S.RecipeCard>
              )
            );
          })}
        </S.List>
      )}
    </>
  );
};
RecipeList.displayName = "RecipeList";
export default RecipeList;
