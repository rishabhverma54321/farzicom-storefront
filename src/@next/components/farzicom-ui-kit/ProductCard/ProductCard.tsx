import React, { useCallback } from "react";
import Image from "next/image";
import { generateProductUrl } from "@temp/core/utils";
import MyRating from "@components/atoms/MyRating";
import styles from "./index.module.scss";
import MyCustomLink from "@components/next-react/MyCustomLink";
import AddToCartButtonNext from "@components/farzicom-ui-kit/AddToCartButtonNext";
import { getMetadataValue, useImageURLReplaceWithCDN } from "@utils/misc";
import { ProductVariantFragment, PriceFragment } from "@saleor/sdk";
import MoneyNext from "@components/farzicom-ui-kit/MoneyNext";
import { OverlayType } from "@temp/components";
import * as S from "./styles";
export interface IProductCardNextProps {
  product: any;
}

export const ProductCardNext: React.FC<IProductCardNextProps> = ({
  product,
}) => {
  const getProductImageURL = useCallback(
    (product: any) => {
      const sortImages =
        product?.defaultVariant?.images &&
        product?.defaultVariant?.images.sort((prev: any, next: any) =>
          prev.sortOrder > next.sortOrder ? 1 : -1
        );

      const image =
        product?.defaultVariant?.images &&
        product?.defaultVariant?.images.length
          ? sortImages[0].url
          : product?.thumbnail2x?.url;

      const imageUrlImgixScr = useImageURLReplaceWithCDN(image);

      return [imageUrlImgixScr, "Product Image"];
    },
    [product?.id]
  );

  const getThisVariantPrices = useCallback(
    (variant: ProductVariantFragment): Array<PriceFragment> => {
      const variantMetadata = variant && variant?.metadata;

      const discountedPrice = variant && variant?.pricing?.price;

      const unDiscountedListPrice =
        variantMetadata &&
        variantMetadata.length &&
        getMetadataValue(variantMetadata, "listPrice");

      const undiscountedPrice = unDiscountedListPrice
        ? {
            gross: {
              amount: parseFloat(unDiscountedListPrice),
              currency: "INR",
            },
            net: { amount: parseFloat(unDiscountedListPrice), currency: "INR" },
          }
        : variant?.pricing?.priceUndiscounted;

      const discount =
        undiscountedPrice?.gross?.amount - discountedPrice?.gross?.amount;

      const discountPrice = {
        gross: { amount: discount, currency: "INR" },
        net: { amount: discount, currency: "INR" },
      };
      return [undiscountedPrice, discountedPrice, discountPrice];
    },
    [product?.id]
  );

  const getAverageRating = useCallback(
    (product: any) => {
      const averageRating = getMetadataValue(
        product?.metadata,
        "average_rating"
      );
      if (averageRating === null) {
        return 5;
      }
      if (averageRating && typeof averageRating === "string") {
        return parseFloat(parseFloat(averageRating).toFixed(2));
      }
      if (averageRating && typeof averageRating === "number") {
        return averageRating;
      }
      return 5;
    },
    [product?.id]
  );

  const getTag = useCallback(
    (product: any) => {
      const flagsObject =
        getMetadataValue(product?.metadata, "flags") &&
        JSON.parse(getMetadataValue(product?.metadata, "flags"));

      const flagText =
        flagsObject?.text && flagsObject?.text.length
          ? flagsObject?.text[0]
          : "";

      const flagColor = flagsObject?.background_color || "#56774d";
      const textColor = flagsObject?.text_color || "#ffffff";

      return [flagText, flagColor, textColor];
    },
    [product?.id]
  );

  const [mrp, netPrice, discountPrice] = getThisVariantPrices(
    product?.defaultVariant
  );

  const [imageUrlImgixScr, imageAlt] = getProductImageURL(product);

  let averageRating = getAverageRating(product);
  const url = generateProductUrl(product?.id, product?.name, product?.slug);

  const [flagText, flagColor, textColor] = getTag(product);
  return (
    <div className={styles.productCardContainerWrapper}>
      <div className={styles.productCardContainer}>
        {flagText && (
          <S.Flag
            color={textColor}
            backgroundColor={flagColor}
            className={styles.productCardTag}
          >
            {flagText}
          </S.Flag>
        )}

        <div className={styles.productCardImage}>
          {imageUrlImgixScr && (
            <MyCustomLink href={url} aTagClassname={styles.productCardLink}>
              <Image
                src={imageUrlImgixScr}
                alt={imageAlt || "Product Image"}
                width={260}
                height={260}
              />
            </MyCustomLink>
          )}
        </div>
        <div className={styles.productCardContents}>
          <div className={styles.productCardRating}>
            <MyRating precision={0.1} isReadOnly rating={averageRating || 5} />
            <span className={styles.productCardRatingText}>
              ({averageRating || 5})
            </span>
          </div>
          <div className={styles.productCardName}>
            <MyCustomLink href={url}>{product?.name}</MyCustomLink>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.discounted}>
              <MoneyNext taxedMoney={netPrice} />
            </div>

            {mrp?.gross?.amount && discountPrice?.gross?.amount ? (
              <div className={styles.undiscounted}>
                <MoneyNext taxedMoney={mrp} />
              </div>
            ) : (
              <> </>
            )}

            {discountPrice?.gross?.amount ? (
              <div className={styles.discount}>
                (
                {Math.round(
                  (discountPrice?.gross?.amount / mrp?.gross?.amount) * 100
                )}
                )%off
              </div>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <div className={styles.productCardButton}>
          <AddToCartButtonNext
            text="Add To Cart"
            variantId={product?.defaultVariant?.id}
            sideCart={OverlayType.lotusCart}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};
ProductCardNext.displayName = "ProductCardNext";
export default ProductCardNext;
