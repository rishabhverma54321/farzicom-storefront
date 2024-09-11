import React, { useState, useEffect } from "react";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Loader } from "@components/atoms/Loader";
import Media from "react-media";
import { smallScreen } from "@styles/constants";
import Select from "@mui/material";
import {
  TypedRecipeCollectionsListQuery,
  TypedRecipeProductsListQuery,
} from "./queries";
import RecipeList from "../RecipeList";
import * as S from "./styles";
import AllImage from "./assets/All.png";

export interface IRecipeProps {}

export const Recipe: React.FC<IRecipeProps> = () => {
  const [usage, setUsage] = useState("");
  const [flavour, setFlavour] = useState("");

  const [showFlavours, setShowFlavours] = useState(false);

  const getUsageCollectionsData = (data: any) => {
    let usageCollectionsData = data.collections.edges.filter(edge => {
      return edge.node.name.slice(0, 7) == "Usage- ";
    });
    usageCollectionsData = usageCollectionsData.map(item => ({
      ...item,
      title: item.node.name.slice(7),
    }));

    return usageCollectionsData;
  };
  const getFlavourCollectionsData = (data: any) => {
    let flavourCollectionsData = data.collections.edges.filter(edge => {
      return edge.node.name.slice(0, 9) == "Flavour- ";
    });
    flavourCollectionsData = flavourCollectionsData.map(item => ({
      ...item,
      title: item.node.name.slice(9),
    }));
    return flavourCollectionsData;
  };

  const getRecipeListData = (data: any) => {
    let recipeListData = data.collection.products.edges.filter(edge => {
      let matchedUsage = false;
      let matchedFlavour = false;
      if (usage !== "" && flavour !== "") {
        edge.node.collections.map(({ name }) => {
          if (name === usage) {
            matchedUsage = true;
          } else if (name === flavour) {
            matchedFlavour = true;
          }
        });
        if (matchedUsage && matchedFlavour) {
          return true;
        }
        return false;
      }
      if (usage !== "") {
        edge.node.collections.map(({ name }) => {
          if (name === usage) {
            matchedUsage = true;
          }
        });
        if (matchedUsage) {
          return true;
        }
        return false;
      }
      if (flavour !== "") {
        edge.node.collections.map(({ name }) => {
          if (name === flavour) {
            matchedFlavour = true;
          }
        });
        if (matchedFlavour) {
          return true;
        }
        return false;
      }
      return true;
    });
    recipeListData = recipeListData.map(edge => {
      let usages = edge.node.collections.filter(
        ({ name }) => name.slice(0, 7) == "Usage- "
      );
      usages =
        usage.slice(7) || usages.length > 0 ? usages[0].name.slice(7) : "";
      const flavours = edge.node.collections.filter(
        ({ name }) => name.slice(0, 9) == "Flavour- "
      );
      return {
        ...edge.node,
        /* edge.node.images[0].url */
        image: (
          <div>
            <S.CardImage>
              <img src={edge.node.images[0].url} />
            </S.CardImage>
            <S.UsageFlavourDivTag>
              {usages.length > 0 ? (
                <>
                  {usages}
                  <br />
                </>
              ) : (
                ""
              )}
              {flavour.slice(9) || flavours.length > 0
                ? flavours[0].name.slice(9)
                : ""}
            </S.UsageFlavourDivTag>
          </div>
        ),
        url: `/recipe/${edge.node.id}`,
      };
    });
    return recipeListData;
  };

  return (
    <>
      <div className="container">
        <ProductHeader heading="RECIPES" headerClass="recipeHeader" />
        <TypedRecipeCollectionsListQuery>
          {({ data, loading }) => {
            if (loading) {
              return (
                <>
                  <Loader />
                </>
              );
            }
            return (
              <>
                <S.UsageFlavourDivision className="container">
                  <S.UsageDivision>
                    <S.UsageList>
                      <S.UsageCard
                        onClick={() => {
                          setUsage("");
                          setFlavour("");
                        }}
                        className={usage === "" ? "active" : "inactive"}
                      >
                        <S.UsageCardImage>
                          <img
                            src={AllImage}
                            className={usage === "" ? "active" : "inactive"}
                          />
                        </S.UsageCardImage>
                        <span className={usage === "" ? "active" : "inactive"}>
                          {" "}
                          All{" "}
                        </span>
                      </S.UsageCard>

                      {getUsageCollectionsData(data).map(item => (
                        <S.UsageCard
                          onClick={() => {
                            if (usage === item.node.name) {
                              setUsage("");
                              setFlavour("");
                            } else {
                              setUsage(item.node.name);
                            }
                          }}
                          className={
                            usage === item.node.name ? "active" : "inactive"
                          }
                        >
                          <S.UsageCardImage>
                            <img
                              src={item.node.backgroundImage.url}
                              className={
                                usage === item.node.name ? "active" : "inactive"
                              }
                            />
                          </S.UsageCardImage>
                          <span
                            className={
                              usage === item.node.name ? "active" : "inactive"
                            }
                          >
                            {" "}
                            {item.title}{" "}
                          </span>
                        </S.UsageCard>
                      ))}
                    </S.UsageList>
                  </S.UsageDivision>
                  <S.FlavoursDivision>
                    <Select
                      style={{
                        fontSize: "14px",
                      }}
                      native
                      value={flavour}
                      onChange={e => {
                        const { value } = e.target;

                        flavour === value ? setFlavour("") : setFlavour(value);
                      }}
                    >
                      <S.SelectOption disabled value="">
                        &nbsp;&nbsp;&nbsp;&nbsp;Select a flavour
                      </S.SelectOption>

                      <S.SelectOption value="">
                        &nbsp;&nbsp;&nbsp;&nbsp;Clear
                      </S.SelectOption>

                      {getFlavourCollectionsData(data).map(item => (
                        <S.SelectOption value={item.node.name}>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {item.title}
                        </S.SelectOption>
                      ))}
                    </Select>
                  </S.FlavoursDivision>

                  {/* <CardsContainer
                    data={getUsageCollectionsData(data)}
                    cardClass="recipeCollectionsCard"
                    containerClass="recipeCollectionsContainer"
                    isCarousel={{
                      slidesOnDesktop: 4,
                      slidesOnTab: 4,
                      slidesOnMobile: 4,
                    }}
                    carouselProps={{
                      renderBottomCenterControls: () => null,
                      renderCenterRightControls: () => null,
                    }}
                    mobileCarouselProps={{
                      renderCenterLeftControls: () => null,
                      renderCenterRightControls: () => null,
                    }}
                  /> */}
                </S.UsageFlavourDivision>
              </>
            );
          }}
        </TypedRecipeCollectionsListQuery>
        <TypedRecipeProductsListQuery>
          {({ data, loading, refetch }) => {
            if (loading) {
              return (
                <>
                  <Loader />
                </>
              );
            }
            data = getRecipeListData(data);
            return data.length > 0 ? (
              <RecipeList
                recipes={data}
                recipeCardClassName="recipeCardCard"
                hoverShadow="2px 4px 20px 0px #AAAAAA40"
              />
            ) : (
              <S.NoRecipeCard>No recipe found!</S.NoRecipeCard>
            );
          }}
        </TypedRecipeProductsListQuery>
      </div>
      <hr width="90%" />
    </>
  );
};
Recipe.displayName = "Recipe";
export default Recipe;
