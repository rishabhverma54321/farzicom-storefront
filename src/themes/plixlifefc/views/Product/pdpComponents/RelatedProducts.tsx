import React from "react";
import { TypedSectionWithoutChildrenQuery } from "../../Home/queries";
import { getMetadataValue, parseJson } from "@utils/misc";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { CachedImage } from "@components/molecules/CachedImage";
import { ProductHeader } from "@components/molecules/ProductHeader";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks";

const RelatedProducts: React.FC<{}> = ({
  fastResultProducts,
  isPerfumePdp = false,
  product,
  heading="",
  isPerfumeInformation=true,
  relatedProducts,
  popupstateHandler,
}) => {
  const [width] = useWindowWidth();
  return (
    <>
      <div
        id="faster-result-pdp"
        className={`product__fasterResult__wrapper ${
          isPerfumePdp ? "product__fasterResult__wrapper_perfume" : ""
        }
        ${!isPerfumeInformation ? "product__fasterResult__wrapper_information" :""} `
      }
      >
        <ProductHeader
          headerClass="df"
          heading={heading}
        />
        {fastResultProducts &&
        Array.isArray(fastResultProducts) &&
        fastResultProducts.length ? (
          <>
            <div
              className={`product__fasterResult__left ${
                isPerfumePdp ? "product__fasterResult__left_perfume" : ""
              }`}
            ></div>
            <div
              className={`product__fasterResult__right ${
                isPerfumePdp ? "product__fasterResult__right_perfume" : ""
              }`}
            ></div>
            <MemoizedProductList
              products={relatedProducts
                ?.map(element => {
                  const arrangedProducts = fastResultProducts?.find(
                    obj => obj?.id === element?.id
                  );
                  return arrangedProducts;
                })
                .filter(element => element !== undefined)}
              isCarousel
              from="productPage"
              ctTitle="plixlife-faster-results"
              parentProducts={product?.id}
              // refetch={refetch}
              carouselProps={{
                infinite:
                  fastResultProducts.filter(node => {
                    return node?.id !== product?.id;
                  }).length > 4,
              }}
              mobileCarouselProps={{
                arrows: false,
                dots: true,
              }}
              desktopCarouselProps={{
                arrows: true,
                slidesToScroll: 1,
              }}
              slidesOnMobile={2}
              slidesOnDesktop={4}
              productDetailPopup={
                width < 720 ? e => popupstateHandler(e) : null
              }
              showProductInfoPopup={width > 720 ? true : false}
            />
          </>
        ) : (
          <ContainerSkeleton
            render={{
              image: true,
              title: true,
            }}
            headerSkeleton={false}
            cardCount={2}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(RelatedProducts);
