import React, { useEffect, useState } from "react";
import Carousel from "@temp/components/ProductCarousel";
import { Loader } from "@components/atoms/Loader";
import { AppProductCard } from "@components/templates/AppProductCard";
import { CustomVisibilitySensor } from "@components/farzicom-ui-kit/CustomVisibilitySensor";
import { productListImpressionDatalayer } from "@utils/misc";
import { IProps } from "./types";
import * as S from "./styles";
import styles from "./index.module.scss";
import { useAuthState } from "@saleor/sdk";

function mmatchPropsAreEqual(prevMatch, nextMatch) {
  if (prevMatch.products) {
    return (
      JSON.stringify(prevMatch.products) ===
        JSON.stringify(nextMatch.products) &&
      prevMatch.loading === nextMatch.loading &&
      prevMatch.buildYourBoxButtonProps === nextMatch.buildYourBoxButtonProps &&
      prevMatch?.productDetailPopup === nextMatch.productDetailPopup &&
      prevMatch?.showProductInfoPopup === nextMatch.showProductInfoPopup
    );
  }
  return true;
}

const ProductList: React.FC<IProps> = ({
  withATC = true,
  products,
  canLoadMore = false,
  loading = false,
  showCart = true,
  testingContextId,
  isCarousel,
  isWishlist,
  from,
  ctTitle,
  onSearchPage = false,
  refetch,
  desktopCarouselProps,
  tabCarouselProps,
  mobileCarouselProps,
  carouselProps,
  slidesOnDesktop,
  button,
  bg,
  hoverShadow,
  priceUl,
  slidesOnMobile,
  slidesOnTab,
  productCardClassname,
  cardTag,
  productListClassname,
  slidesToScroll,
  productCardContainerClass,
  preventClickToPdp,
  productsBeforeCarousel = 4,
  searchTapProductCard,
  wizzyProductCard,
  buildYourBoxButtonProps,
  showProductInfoPopup,
  popupstate,
  parentProducts,
  productListId,
  disableVisibilitySensor = false,
  productDetailPopup,
  productDetailPopupOnImage,
}: IProps) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const { user } = useAuthState();
  
  useEffect(() => {
    if (isCarousel) {
      setShowCarousel(true);
    }
  }, []);
  if (isCarousel) {
    if (showCarousel) {
      // console.log("showCarousel", showCarousel);
      return (
        <CustomVisibilitySensor
          partialVisibility
          disable={disableVisibilitySensor}
          onChange={inViewport => {
            if (inViewport) {
              productListImpressionDatalayer(
                products,
                user,
                ctTitle,
                productListId,
                searchTapProductCard
              );
            }
          }}
        >
          <Carousel
            slidesOnDesktop={slidesOnDesktop || 4}
            slidesOnMobile={slidesOnMobile || 2}
            slidesOnTab={slidesOnTab || 2}
            desktopCarouselProps={desktopCarouselProps}
            tabCarouselProps={tabCarouselProps}
            mobileCarouselProps={mobileCarouselProps}
            slidesToScroll={slidesToScroll}
            {...carouselProps}
          >
            {products?.map((product, index) => {
              const { id } = product;

              return (
                // <S.ProductCard key={product.id}>
                <AppProductCard
                  searchTapProductCard={searchTapProductCard}
                  wizzyProductCard={wizzyProductCard}
                  key={id}
                  product={product}
                  hoverBg
                  showCart={showCart}
                  from={from}
                  ctTitle={ctTitle}
                  isWishlist={isWishlist}
                  refetch={refetch}
                  button={button}
                  bg={bg}
                  priceUl={priceUl}
                  productDetailPopup={productDetailPopup}
                  hoverShadow={hoverShadow}
                  productDetailPopupOnImage={productDetailPopupOnImage}
                  classname={productCardClassname}
                  onSearchPage={onSearchPage}
                  withATC={withATC}
                  productCardClassname={productCardClassname}
                  cardTag={cardTag}
                  preventClickToPdp={preventClickToPdp}
                  buildYourBoxButtonProps={buildYourBoxButtonProps}
                  showProductInfoPopup={showProductInfoPopup}
                  popupstate={popupstate}
                  productIndex={index}
                  parentProducts={parentProducts}
                  productListId={productListId}
                />
                // </S.ProductCard>
              );
            })}
          </Carousel>
        </CustomVisibilitySensor>
      );
    }

    return (
      <CustomVisibilitySensor
        partialVisibility
        disable={disableVisibilitySensor}
        onChange={inViewport => {
          if (inViewport) {
            productListImpressionDatalayer(
              products,
              user,
              ctTitle,
              productListId,
              searchTapProductCard
            );
          }
        }}
      >
        <div className={styles.productListBeforeCarousel}>
          {Array.isArray(products) &&
            !!products?.length &&
            products?.slice(0, productsBeforeCarousel).map((product, index) => {
              const { id } = product;

              return (
                // <S.ProductCard key={product.id}>
                <AppProductCard
                  searchTapProductCard={searchTapProductCard}
                  wizzyProductCard={wizzyProductCard}
                  key={id}
                  product={product}
                  hoverBg
                  showCart={showCart}
                  from={from}
                  ctTitle={ctTitle}
                  isWishlist={isWishlist}
                  refetch={refetch}
                  button={button}
                  bg={bg}
                  priceUl={priceUl}
                  hoverShadow={hoverShadow}
                  classname={productCardClassname}
                  onSearchPage={onSearchPage}
                  withATC={withATC}
                  productCardClassname={productCardClassname}
                  cardTag={cardTag}
                  preventClickToPdp={preventClickToPdp}
                  buildYourBoxButtonProps={buildYourBoxButtonProps}
                  showProductInfoPopup={showProductInfoPopup}
                  popupstate={popupstate}
                  productIndex={index}
                  parentProducts={parentProducts}
                  productListId={productListId}
                />
                // </S.ProductCard>
              );
            })}
        </div>
      </CustomVisibilitySensor>
    );
  }
  // ToDo
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CustomVisibilitySensor
          partialVisibility
          disable={disableVisibilitySensor}
          onChange={inViewport => {
            if (inViewport) {
              productListImpressionDatalayer(
                products,
                user,
                ctTitle,
                productListId,
                searchTapProductCard
              );
            }
          }}
        >
          <S.List
            data-test="productList"
            data-test-id={testingContextId}
            className={productListClassname}
          >
            {products?.map((product, index) => {
              const { id } = product;

              return (
                <S.ProductCard key={product.id}>
                  <AppProductCard
                    searchTapProductCard={searchTapProductCard}
                    wizzyProductCard={wizzyProductCard}
                    key={id}
                    product={product}
                    showCart={showCart}
                    hoverBg
                    from={from}
                    ctTitle={ctTitle}
                    isWishlist={isWishlist}
                    refetch={refetch}
                    button={button}
                    bg={bg}
                    priceUl={priceUl}
                    hoverShadow={hoverShadow}
                    productDetailPopup={productDetailPopup}
                    classname={productCardClassname}
                    productDetailPopupOnImage={productDetailPopupOnImage}
                    onSearchPage={onSearchPage}
                    withATC={withATC}
                    productCardClassname={productCardClassname}
                    cardTag={cardTag}
                    productCardContainerClass={productCardContainerClass}
                    buildYourBoxButtonProps={buildYourBoxButtonProps}
                    preventClickToPdp={preventClickToPdp}
                    showProductInfoPopup={showProductInfoPopup}
                    popupstate={popupstate}
                    productIndex={index}
                    parentProducts={parentProducts}
                    productListId={productListId}
                  />
                </S.ProductCard>
              );
            })}
          </S.List>
        </CustomVisibilitySensor>
      )}
    </>
  );
};
const MemoizedProductList = React.memo(ProductList, mmatchPropsAreEqual);
export default MemoizedProductList;
