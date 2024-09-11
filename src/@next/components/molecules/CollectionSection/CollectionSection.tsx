import React from "react";
import ReactSVG from "react-svg";
import MyCustomLink from "@components/next-react/MyCustomLink";

import Media from "react-responsive";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import PrevIcon from "images/swiper-button-prev.svg";
import NextIcon from "images/swiper-button-next.svg";

import { Gap } from "@components/atoms/Gap";
// import { ProductCardIkkai, ProductCard } from "@components/molecules";
import { largeScreen } from "@styles/constants";

import { CLIENT } from "Themes/config";
import { AppProductCard } from "@components/templates/AppProductCard";
import * as S from "./CollectionSection.styled";
import ViewAllIconSVG from "./ViewAllIconSVG";

SwiperCore.use([Navigation]);

export const partition = (products: any, filter: any) => {
  const inStock: Array<any> = [];
  const outOfStock: Array<any> = [];

  products.forEach((product: any) =>
    (filter(product) ? inStock : outOfStock).push(product)
  );
  return inStock.concat(outOfStock);
};

export interface IShowAllConfig {
  canShowAll?: boolean;
  showAllUrl?: string;
  showAllMessage?: string;
  showAllClickHandler?: () => void;
}
export interface ICollectionSectionProps {
  name: string;
  products: Array<any>;
  showAllConfig?: IShowAllConfig;
  other?: {
    ctTitle?: string;
    shouldPartition?: boolean;
    bgColor?: string;
    withATC?: boolean;
  };
  className?: string;
  refetch?: any;
}

export const ViewAllButton: React.FC<{ showAllConfig: IShowAllConfig }> = ({
  showAllConfig,
}) => {
  const {
    canShowAll,
    showAllMessage,
    showAllUrl,
    showAllClickHandler,
  } = showAllConfig;

  return (
    <>
      {Boolean(showAllConfig && canShowAll) && (
        <>
          <S.ViewAllWrapper>
            {/* If has URL, then render with URL */}
            {showAllUrl ? (
              <MyCustomLink href={showAllUrl}>
                <S.Button onClick={showAllClickHandler || undefined}>
                  {showAllMessage || "View All"}
                  <ViewAllIconSVG style={{ fontSize: "0.75rem" }} />
                </S.Button>
              </MyCustomLink>
            ) : (
              // Otherwise without URL
              <S.Button onClick={showAllClickHandler || undefined}>
                {showAllMessage || "View All"}
                <ViewAllIconSVG style={{ fontSize: "0.75rem" }} />
              </S.Button>
            )}
          </S.ViewAllWrapper>
        </>
      )}
    </>
  );
};

export const CollectionSection: React.FC<ICollectionSectionProps> = ({
  name,
  products,
  showAllConfig = {},
  other = {},
  refetch,
}) => {
  const { ctTitle, shouldPartition, bgColor, withATC = false } = other;
  const finalProducts = shouldPartition
    ? partition(
        products,
        (product: any) =>
          product.variants[0]?.quantityAvailable > 0 &&
          product?.isAvailableForPurchase
      )
    : products;

  const desktopFinalProducts =
    showAllConfig && showAllConfig.canShowAll
      ? finalProducts.slice(0, 8)
      : finalProducts;

  const mobileFinalProducts = finalProducts.slice(0, 4);
  const instanceClassName = name.toLowerCase().replace(/\s/g, "-");

  return (
    <S.Container bgColor={bgColor}>
      <Gap size="1.5rem" largeScreenSize="4vw" />
      <S.HeaderWrapper>
        <S.CollectionTitle as="h2">{name}</S.CollectionTitle>

        <Media minWidth={largeScreen}>
          <ViewAllButton showAllConfig={showAllConfig} />
        </Media>
      </S.HeaderWrapper>
      <Gap size="1.5rem" largeScreenSize="1vw" />

      <Media maxWidth={largeScreen - 1}>
        <S.MSlidesContainer>
          {mobileFinalProducts.map(product => (
            <S.ProductCard key={product.id}>
              <AppProductCard
                product={product}
                from={name}
                ctTitle={ctTitle || undefined}
                withATC={withATC}
                refetch={refetch}
              />
            </S.ProductCard>
          ))}
        </S.MSlidesContainer>
      </Media>

      <Media minWidth={largeScreen}>
        <S.SwiperContainer>
          <S.SwipeNavigateBtn>
            <ReactSVG
              className={`${instanceClassName} swiper-button-prev`}
              path={PrevIcon}
            />
          </S.SwipeNavigateBtn>

          <S.ProductCardWrapper>
            <Swiper
              speed={600}
              slidesPerView={4}
              slidesPerGroup={4}
              navigation={{
                nextEl: `.${instanceClassName}.swiper-button-next`,
                prevEl: `.${instanceClassName}.swiper-button-prev`,
              }}
            >
              {desktopFinalProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <S.ProductCard>
                    <AppProductCard
                      product={product}
                      from={name}
                      ctTitle={ctTitle || undefined}
                      withATC={withATC}
                      refetch={refetch}
                    />
                  </S.ProductCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </S.ProductCardWrapper>

          <S.SwipeNavigateBtn>
            <ReactSVG
              className={`${instanceClassName} swiper-button-next`}
              path={NextIcon}
            />
          </S.SwipeNavigateBtn>
        </S.SwiperContainer>
      </Media>

      <Media maxWidth={largeScreen - 1}>
        <Gap size="1.5rem" />
        <ViewAllButton showAllConfig={showAllConfig} />
      </Media>

      <Gap size="1.5rem" largeScreenSize="4vw" />
    </S.Container>
  );
};

CollectionSection.displayName = "CollectionSection";
export default CollectionSection;
