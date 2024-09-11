import React from "react";

import { ImageCard } from "@components/atoms/ImageCard";

import { AccordianIconChange } from "@components/molecules/AccordianIconChange";
import { ProductDetails_product_metadata } from "../../../../themes/lotus/views/Product/gqlTypes/ProductDetails";
import * as S from "./style";

export interface IPdpAccordianProps {
  item: ProductDetails_product_metadata;
}

export const PdpAccordian: React.FC<IPdpAccordianProps> = ({ item }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderSwitch = (item: ProductDetails_product_metadata) => {
    switch (item.key) {
      case "ingredients":
      case "uses": {
        const parsed = JSON.parse(item.value);
        if (parsed.length)
          return (
            <S.Container>
              {item.key === "ingredients" ? (
                <S.DescriptionHeading>Key Ingredients</S.DescriptionHeading>
              ) : (
                <S.DescriptionHeading>How To Use</S.DescriptionHeading>
              )}
              <S.IngredientBox>
                {JSON.parse(item.value).map((item: any, index: number) => (
                  <S.Ingredient key={index}>
                    {item.image && (
                      <S.IngredientImg>
                        <img src={item.image} alt={item.title} />
                      </S.IngredientImg>
                    )}
                    <S.IngredientText>
                      {item.title && <h4>{item.title}</h4>}
                      {item.content && <p>{item.content}</p>}
                    </S.IngredientText>
                  </S.Ingredient>
                ))}
              </S.IngredientBox>
            </S.Container>
          );
        break;
      }
      case "faq": {
        const parsed = JSON.parse(item.value);
        if (parsed.length)
          return (
            <S.Container>
              <S.DescriptionHeading>FAQ</S.DescriptionHeading>
              {JSON.parse(item.value).map((faq: any) => {
                return (
                  <AccordianIconChange
                    summary={faq.q}
                    details={faq.a}
                    key={faq.q}
                    expanded={expanded}
                    handleChange={handleChange}
                  />
                );
              })}
            </S.Container>
          );
        break;
      }
      case "benefits": {
        const parsed = JSON.parse(item.value);
        if (parsed.length)
          return (
            <S.Container>
              <S.DescriptionHeading>Key Benefits</S.DescriptionHeading>
              <S.DescriptionBox>
                {JSON.parse(item.value).map((item: any) => {
                  return (
                    <ImageCard
                      key={item.title}
                      src={item.image}
                      title={item.title}
                      description={item.content}
                    />
                  );
                })}
              </S.DescriptionBox>
            </S.Container>
          );
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <div className="">{renderSwitch(item)}</div>
    </>
  );
};
PdpAccordian.displayName = "PdpAccordian";
export default PdpAccordian;
