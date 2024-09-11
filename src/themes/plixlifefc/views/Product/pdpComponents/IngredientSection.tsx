import { CachedImage } from "@components/molecules/CachedImage";
import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import React, { useState } from "react";

const IngredientSection: React.FC<{ ingredientsData: any }> = ({
  ingredientsData,
}) => {
  return (
    <>
      {ingredientsData && (
        <div className="container ingredientSection__wrapper">
          <ProductHeader
            headerClass="ingredientSection__header"
            heading={ingredientsData.sectionHeader}
          />
          <div className="container ingredientSection__content">
            <Card
              content={{ ...ingredientsData.content, image: "" }}
              cardClass="ingredientSection__card"
            />
            <CachedImage
              url={ingredientsData?.content?.image}
              className="ingredientSection__rightImage"
              imgixSizes="50vw"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(IngredientSection);
