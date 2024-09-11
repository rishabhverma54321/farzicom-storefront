import React from "react";
import Media from "react-responsive";
// import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Gap } from "@components/atoms/Gap/styled";
import { ProductsList_collections_edges_node } from "@temp/themes/ikkai/views/Home/gqlTypes/ProductsList";
import { CachedImage } from "@components/molecules/CachedImage";
import { xLargeScreen } from "@styles/constants";
import { generateCollectionUrl } from "@utils/core";

import * as S from "./CategoriesShowcase.styled";

const Category: React.FC<{ category: ProductsList_collections_edges_node }> = ({
  category,
}) => {
  const { name } = category;
  const image = category.backgroundImage?.url;
  const shortDescriptionObj = category.metadata.find(
    meta => meta?.key === "shortDescription"
  );
  const url = generateCollectionUrl(category.id, category.name);

  return (
    // <NavLink to={url}>
      <S.CategoryCard>
        <S.Image>
          <CachedImage url={image} />

          <S.Name>{name}</S.Name>
        </S.Image>

        <S.Description>
          {shortDescriptionObj && shortDescriptionObj.value}
        </S.Description>
      </S.CategoryCard>
    // </NavLink>
  );
};

export interface ICategoriesShowcaseProps {
  categories: Array<ProductsList_collections_edges_node>;
}

export const CategoriesShowcase: React.FC<ICategoriesShowcaseProps> = ({
  categories,
}) => {
  const swiperSettings: Swiper = {
    // centeredSlides: true,
    slidesPerView: 1.25,
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 0px
      0: {
        spaceBetween: 0,
      },
      460: {
        slidesPerView: 1.35,
      },
      520: {
        slidesPerView: 1.45,
      },
      580: {
        slidesPerView: 1.55,
      },
      640: {
        slidesPerView: 1.65,
      },
      720: {
        slidesPerView: 2.6,
        centeredSlides: false,
      },
      820: {
        slidesPerView: 3,
        centeredSlides: false,
      },
      900: {
        slidesPerView: 3.4,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 4,
        centeredSlides: false,
      },
    },
  };

  return (
    <>
      <S.Wrapper>
        <Gap
          size="1.5rem"
          largeScreenSize="2rem"
          customSize={{ breakpoint: `${xLargeScreen}px`, size: "3rem" }}
        />

        <S.SectionHeading>Shop Our Collection</S.SectionHeading>
        <Gap size="1.5rem" largeScreenSize="2rem" />

        <S.CategoriesWrapper>
          <Media maxWidth={xLargeScreen - 1}>
            <Swiper {...swiperSettings}>
              {categories.map(category => (
                <SwiperSlide key={category.backgroundImage?.url}>
                  <Category category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Media>

          <Media minWidth={xLargeScreen}>
            {categories.map(category => (
              <Category
                category={category}
                key={category.backgroundImage?.url}
              />
            ))}
          </Media>
        </S.CategoriesWrapper>

        <Gap
          size="1.5rem"
          largeScreenSize="2rem"
          customSize={{ breakpoint: `${xLargeScreen}px`, size: "3rem" }}
        />
      </S.Wrapper>
    </>
  );
};
CategoriesShowcase.displayName = "CategoriesShowcase";
export default CategoriesShowcase;
