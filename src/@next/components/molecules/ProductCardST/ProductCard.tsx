import React, { useContext } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { MyRating } from "@components/atoms/MyRating";

import { useCanAddToCart } from "@hooks/useCanAddToCart";
import { useItemInCart } from "@hooks/useItemInCart";
// import { useCart } from "@saleor/sdk";
import { generateProductUrl, getGraphqlIdFromDBId } from "@temp/core/utils";
import NoPhoto from "images/no-photo.svg";
import Stroller from "@components/atoms/SvgIcons/Stroller";
import {
  imageURLReplaceWithCDN,
  getMetadataValue,
  parseJson,
  productClickDatalayer,
  getItemListName,
  getRoundedRating,
} from "@utils/misc";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";

import { IMAGE_CDN_PROVIDERS, IMAGE_CDN, META_DEFAULTS } from "Themes/config";
import { OverlayType, OverlayTheme, OverlayContext } from "@temp/components";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useCustomLocation } from "@hooks/useCustomLocation";
import Image from "next/image";
import AddToCartButton from "../NewAddToCartButton";
import * as S from "./style";
import { ConstructImageSchema } from "@temp/core/SEO/Image/imageSchema";
import { useAuthState } from "@saleor/sdk";

export interface cardtag {
  name: string;
  tagColor?: string;
}
export interface IProductCardPlixlifeProps {
  product: any;
  hoverBg: boolean | undefined;
  bg?: string;
  isWishlist?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  button?: boolean;
  hoverShadow?: string;
  priceUl?: boolean;
  refetch?: (variables?: {}) => any;
  classname?: string;
  cardTag?: cardtag;
  preventClickToPdp?: boolean;
  parentProducts?: string;
  productListId?: string;
  index?: number;
}
function mmatchPropsAreEqual(prevMatch, nextMatch) {
  if (prevMatch.cardTag) {
    return prevMatch.cardTag.name === nextMatch.cardTag.name;
  }
  return true;
}

export const ProductCardST: React.FC<IProductCardPlixlifeProps> = ({
  product,
  hoverBg,
  isWishlist,
  from,
  ctTitle,
  onSearchPage = false,
  button,
  refetch,
  bg,
  hoverShadow,
  priceUl = false,
  classname,
  cardTag,
  preventClickToPdp,
  parentProducts,
  productListId,
  index,
}) => {
  const {
    id,
    name,
    slug,
    thumbnail,
    thumbnail2x,
    metadata,
    default_variant: defaultVariant,
    is_available_for_purchase,
  } = product;

  const { pathname } = useCustomLocation();

  const shortDescriptionArray =
    metadata && metadata.filter((item: any) => item.key === "shortDescription");

  const productCardAttributes =
    getMetadataValue(metadata, "product_card_attributes") &&
    parseJson(getMetadataValue(metadata, "product_card_attributes"));

  // const tagColor = getMetadataValue(metadata, "tagColor");

  const averageRatingString =
    metadata && getMetadataValue(metadata, "average_rating");
  const averageRating = averageRatingString
    ? parseFloat(averageRatingString)
    : 5;

  const shortDescription =
    shortDescriptionArray && shortDescriptionArray.length > 0
      ? JSON.parse(shortDescriptionArray[0].value)
      : null;

  const sortImages =
    defaultVariant?.images &&
    defaultVariant?.images.sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    );

  const image =
    productCardAttributes && productCardAttributes?.image
      ? productCardAttributes?.image
      : defaultVariant?.images && defaultVariant?.images.length
      ? sortImages[0].url
      : thumbnail2x?.url || thumbnail?.url;
  const imageUrlImgixScr = imageURLReplaceWithCDN(image);
  // console.log("imageUrlImgixScr", imageUrlImgixScr);

  const variantId =
    defaultVariant &&
    defaultVariant?.id &&
    getGraphqlIdFromDBId(defaultVariant?.id, "ProductVariant");

  const discounted_price =
    defaultVariant &&
    defaultVariant.price &&
    defaultVariant.price.length &&
    defaultVariant.price[0].amount;

  const cost_price =
    defaultVariant && getMetadataValue(defaultVariant.metadata, "listPrice");
  const variantStock = defaultVariant && defaultVariant.quantity_available;

  // const falvorsAtt =
  //   defaultVariant &&
  //   defaultVariant.attributes?.find(att => att.attribute.slug === "flavors");
  // const currFlavor =
  //   falvorsAtt && falvorsAtt.values.length && falvorsAtt.values[0].value;

  // const sizeAtt =
  //   defaultVariant &&
  //   defaultVariant.attributes?.find(att => att.attribute.slug === "size");
  // const currSize = sizeAtt && sizeAtt.values.length && sizeAtt.values[0].value;

  // const discountedPrice = variantPricing && variantPricing.price.gross.amount;
  const url = `/product/${slug}/${id}/`;

  // console.log("id", id);

  const itemAdded = useItemInCart(variantId);
  // const { items, addItem } = useCart();

  const disableButton = !useCanAddToCart(
    is_available_for_purchase,
    variantId,
    variantStock,
    1
  );
  // const clevertap = makeClevertap();

  const productClick = () => {
    const clevertap = makeClevertap();
    const ctp = {
      "Product name": name,
      "Product Price": discounted_price,
      Quantity: 1,
      "Added from": from,
      "Image URL": image,
      URL: window?.location.href,
      Title: ctTitle,
      // Duration: currSize,
      // Flavor: currFlavor,
      sku: defaultVariant?.sku,
    };
    clevertap.event.push(clevertapEvents.addedToCart.value, ctp);

    // if (gtmConfig.addedToCart.enable) {
    //   (window.dataLayer = window.dataLayer || []).push({
    //     event: gtmConfig.addedToCart.value,
    //     ecommerce: {
    //       currencyCode: "INR",
    //       add: {
    //         products: [
    //           {
    //             name,
    //             id:
    //               atob(product.id).split(":").length > 1
    //                 ? atob(product.id).split(":")[1]
    //                 : atob(product.id),
    //             price: discountedPrice,
    //             brand: META_DEFAULTS.name,
    //             quantity: 1,
    //             Duration: currSize,
    //             Flavor: currFlavor,
    //             sku: defaultVariant?.sku,
    //           },
    //         ],
    //       },
    //     },
    //   });
    // }
  };

  const schemaObj = {
    url: imageUrlImgixScr,
    name: "Product Image",
    author: "plixlife",
  };

  const { show } = useContext(OverlayContext);

  const { user } = useAuthState();

  const productCardTag = product.category || cardTag?.name;

  const PriceSection = () => {
    const discountAmount = parseInt(cost_price) - parseInt(discounted_price);
    return (
      <>
        {discountAmount && cost_price && discounted_price ? (
          <S.PriceContainer>
            <S.UndiscountedPrice>
              <span>&#x20B9;{cost_price}</span>
            </S.UndiscountedPrice>
            <S.DiscountedPrice>
              <span>&#x20B9;{discounted_price}</span>
            </S.DiscountedPrice>
          </S.PriceContainer>
        ) : discounted_price ? (
          <>
            <S.PriceContainer>
              <S.DiscountedPrice>
                <span>&#x20B9;{discounted_price}</span>
              </S.DiscountedPrice>
            </S.PriceContainer>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  if (defaultVariant) {
    return (
      <>
        <ConstructImageSchema data={schemaObj} />
        <S.CardBody
          hoverBg={hoverBg}
          // loading={loading}
          bg={bg}
          hoverShadow={hoverShadow}
          className={classname}
        >
          <S.CardTopHeader>
            {productCardTag && (
              <S.TopHeaderTag tagColor="rgb(250, 230, 226)">
                {" "}
                {productCardTag}{" "}
              </S.TopHeaderTag>
            )}

            <S.Rating>
              <MyRating rating={getRoundedRating(averageRating || 5)} isReadOnly />
            </S.Rating>
          </S.CardTopHeader>

          <MyCustomLink
            onClick={() => {
              if (typeof window !== "undefined") {
                window.navigated_from = getItemListName(ctTitle);
                window.navigated_from_id = productListId;
                window.itemIndexFromList =
                  typeof index == "number" ? index : undefined;
                if (!preventClickToPdp) {
                  productClickDatalayer(
                    product,
                    user,
                    index,
                    ctTitle,
                    productListId,
                    true
                  );
                }
              }
            }}
            href={url}
            className={`${classname}__imageLink`}
            disable={preventClickToPdp}
          >
            <S.CardImage>
              {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                <Image
                  src={imageUrlImgixScr}
                  alt="Product Image"
                  width={200}
                  height={200}
                />
              ) : (
                <img src={image || NoPhoto} width="90%" alt="img" />
              )}
            </S.CardImage>
          </MyCustomLink>
          <S.CardInfo className={`${classname}__cardInfo`}>
            <div className="collection-variant-name">
              {
                product?.defaultVariant?.attributes
                  ?.filter(item => item?.attribute?.slug === "size")[0]
                  ?.values[0]?.name?.split("__")[0]
              }
            </div>
            <MyCustomLink
              href={url}
              disable={preventClickToPdp}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.navigated_from = getItemListName(ctTitle);
                  window.navigated_from_id = productListId;
                  window.itemIndexFromList =
                    typeof index == "number" ? index : undefined;
                }
                if (!preventClickToPdp) {
                  productClickDatalayer(
                    product,
                    user,
                    index,
                    ctTitle,
                    productListId,
                    true
                  );
                }
              }}
            >
              <S.CardName className="productCard__name">
                {productCardAttributes?.name || name}
              </S.CardName>
            </MyCustomLink>
          </S.CardInfo>
          {shortDescription && pathname === "/" && (
            <S.CardShortDdescription
              className={`${classname}__shortDescription`}
            >
              {shortDescription.map(desc => (
                <li>-{desc}</li>
              ))}
            </S.CardShortDdescription>
          )}
          <PriceSection />
          {/* {getThisVariantPrice(defaultVariant)} */}
          {button === false ? (
            <CustomizeButton
              text="KNOW MORE"
              link={id && name ? generateProductUrl(id, name, slug) : "/"}
              buttonClass="whatsNewButton"
            />
          ) : (
            <S.CardButton className={`${classname}__buttonContainer`}>
              <AddToCartButton
                onSubmit={async disabled => {
                  if (disabled && refetch) {
                    refetch();
                  } else {
                    productClick();
                  }
                }}
                // limitProductCategories={[
                //   { name: "Others also Liked Products", limit: 1 },
                // ]}
                productCategoryName={product?.category}
                variantId={variantId}
                // disabled={false}
                disabled={itemAdded ? false : disableButton}
                itemAdded={false}
                size="sm"
                page=""
                productId={getGraphqlIdFromDBId(product?.id, "Product")}
                leftIcon={<Stroller />}
                withIcons
                buttonClassName={
                  disableButton ? "plixlife-button-notify" : "plixlife-button"
                }
                // buttonClassName="plixlife-button"
                product={product}
              />
            </S.CardButton>
          )}
        </S.CardBody>
      </>
    );
  }
  return <> </>;
};

ProductCardST.displayName = "ProductCardST";
export default React.memo(ProductCardST, mmatchPropsAreEqual);
