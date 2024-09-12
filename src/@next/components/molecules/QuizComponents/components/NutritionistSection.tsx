import {
  getMetadataValue,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import React from "react";
import styles from "../scss/index.module.scss";
import { useRouter } from "next/router";
import Carousel from "@temp/components/ProductCarousel";
import { CachedImage } from "@components/molecules/CachedImage";
import parse from "html-react-parser";
import { truncateString } from "@utils/misc";
import { INutritionistData } from "@components/molecules";

export const NutritionistSection: React.FC<INutritionistData> = ({
  nutritionistData,
  className,
  carouselProps = {
    slidesOnMobile: 1,
    slidesOnTab: 2,
    slidesOnDesktop: 3,
    slidesToScroll: 1,
  },
  hideCaution = false,
}) => {
  const router = useRouter();
  const userName = router?.query?.name || "";
  const isUserTired = router?.query?.isUserTired === "Yes" ? true : false;

  const specificProductCard =
    (nutritionistData && nutritionistData?.productCategory) || [];

  const isProductCard =
    nutritionistData &&
    Array.isArray(specificProductCard) &&
    specificProductCard?.length;

  const ratingImageUrlWithImgix = imageURLReplaceWithCDN(
    "https://plixlifefc-media.farziengineer.co/hosted/rating_star-148dc021bba0.svg"
  );

  const Ingredient = ({ image, title }) => (
    <div
      className={`${styles.quizpage_nutritionistsection_Ingredient_box} ${className}_Ingredient_box`}
    >
      <div className={styles.quizpage_nutritionistsection_Ingredient_box_image}>
        <CachedImage isNextImage nextImageLayout="fill" url={image} />
      </div>
      <p>{truncateString(title, 20)}</p>
    </div>
  );

  const ProductCard = ({ data }: { data: any }) => {
    const ingredients = data?.ingredients;
    return (
      <div
        className={`${styles.quizpage_nutritionistsection_ProductCard} ${className}_ProductCard`}
      >
        <div
          className={`${styles.quizpage_nutritionistsection_ProductHeader} ${className}_ProductHeader`}
        >
          <h2>{data?.product_type}</h2>
          <div className={styles.quizpage_nutritionistsection_ProductRating}>
            <img
              src={ratingImageUrlWithImgix}
              alt="Product Rating"
              className={styles.quizpage_nutritionistsection_RatingImg}
            />
            <p>{data?.product_rating}</p>
          </div>
        </div>
        <div
          className={`${styles.quizpage_nutritionistsection_ProductImage} ${className}_ProductImage`}
        >
          <CachedImage
            isNextImage
            url={data?.product_image}
            nextImageLayout="fill"
          />
        </div>
        <h3
          className={`${styles.quizpage_nutritionistsection_ProductName} ${className}_ProductName`}
        >
          {data?.product_name}
        </h3>
        <div
          className={`${styles.quizpage_nutritionistsection_PriceSection} ${className}_ProductSection`}
        >
          <p
            className={`${styles.quizpage_nutritionistsection_DiscountPrice} ${className}_DiscountPrice`}
          >
            {data?.product_undiscounted_price}
          </p>
          <p
            className={`${styles.quizpage_nutritionistsection_ActualPrice} ${className}_ActualPrice`}
          >
            {data?.product_price}
          </p>
        </div>
        <p
          className={`${styles.quizpage_nutritionistsection_ProductDescription} ${className}_ProductDescription`}
        >
          {data?.product_description}
        </p>
        <div className={styles.quizpage_nutritionistsection_ProductDivider} />
        <h4
          className={`${styles.quizpage_nutritionistsection_ProductIngredients} ${className}_ProductIngredients`}
        >
          {data?.product_ingredient}
        </h4>
        {Array.isArray(ingredients) && ingredients?.length ? (
          <div className={`${styles.quizpage_nutritionistsection_Ingredient} ${className}_Ingredient`}>
            {ingredients.map((ingredient, index) => (
              <Ingredient key={index} {...ingredient} />
            ))}
          </div>
        ) : (
          <></>
        )}
        {!hideCaution ? (
          <>
            <div className={styles.quizpage_nutritionistsection_UsageDivider} />
            <div
              className={styles.quizpage_nutritionistsection_UsageInstruction}
            >
              {data?.product_caution?.image ? (
                <div>
                  <CachedImage
                    isNextImage
                    url={data?.product_caution?.image}
                    nextImageLayout="fill"
                  />
                </div>
              ) : (
                <></>
              )}
              <p>{data?.product_caution?.text}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  if (nutritionistData?.enable) {
    return (
      <div
        className={`${styles.quizpage_nutritionistsection} ${styles.quizpage_width} ${className}`}
      >
        <h3
          className={`${styles.quizpage_nutritionistsection_heading} ${className}_heading`}
        >
          {userName} {parse(`${nutritionistData?.heading}`)}
        </h3>
        {isProductCard ? (
          <div
            className={`${styles.quizpage_nutritionistsection_products} quizpage_nutritionistsection`}
          >
            <Carousel
              slidesOnMobile={carouselProps?.slidesOnMobile || 1}
              slidesOnTab={carouselProps?.slidesOnTab || 2}
              slidesOnDesktop={carouselProps?.slidesOnDesktop || 3}
              slidesToScroll={carouselProps?.slidesToScroll || 1}
              mobileCarouselProps={{
                arrows: false,
                dots: true,
                infinite: false,
              }}
              tabCarouselProps={{
                arrows: false,
                dots: true,
                infinite: false,
                // appendDots: handleDots,
              }}
              desktopCarouselProps={{
                arrows: false,
                dots: true,
                infinite: false,
                // appendDots: handleDots,
              }}
            >
              {specificProductCard?.map((items, index) =>
                !isUserTired ? (
                  !items?.isInclude_with_extraQuestion && (
                    <ProductCard data={items} />
                  )
                ) : (
                  <ProductCard data={items} />
                )
              )}
            </Carousel>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <></>;
};

NutritionistSection.displayName = "NutritionistSection";

export default NutritionistSection;
