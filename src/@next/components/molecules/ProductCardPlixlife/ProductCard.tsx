import React, { useContext, useEffect, useState } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { MyRating } from "@components/atoms/MyRating";

import { useCanAddToCart } from "@hooks/useCanAddToCart";
import { useItemInCart } from "@hooks/useItemInCart";
// import { useCart } from "@saleor/sdk";
import CloseCrossIcon from "@components/atoms/SvgIcons/CloseCrossIcon";
import { generateProductUrl } from "@temp/core/utils";
import NoPhoto from "images/no-photo.svg";
import Stroller from "@components/atoms/SvgIcons/Stroller";
import MemoLearnMoreIcon from "@components/atoms/SvgIcons/MemoLearnMoreIcon";
import {
  imageURLReplaceWithCDN,
  getMetadataValue,
  parseJson,
  getItemListName,
  productClickDatalayer,
  getRoundedRating,
} from "@utils/misc";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";

import { IMAGE_CDN_PROVIDERS, IMAGE_CDN, META_DEFAULTS } from "Themes/config";
import Imgix from "react-imgix";
import { OverlayType, OverlayTheme, OverlayContext } from "@temp/components";
import * as S from "./style";
import AddToCartButton from "../NewAddToCartButton";
import { getThisVariantPrice, getVariantPriceIncludeTaxes } from "./stockHelpers";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useCustomLocation } from "@hooks/useCustomLocation";
import Image from "next/image";
import Rating from "@material-ui/lab/Rating";
import RatingNext from "@components/farzicom-ui-kit/RatingNext";
import { ProductInfoPopUp } from "@components/molecules/ProductInfoPopUp";
import { getdiscount } from "./stockHelpers";
import MemoCartPageIcon from "images/lotus-new/CartPageIcon";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import { ConstructImageSchema } from "@temp/core/SEO/Image/imageSchema";
import { useAuthState, useCartState } from "@saleor/sdk";

export interface cardtag {
  name: string;
  tagColor?: string;
}
export interface IProductCardPlixlifeProps {
  product: any;
  showCart?: boolean;
  hoverBg: boolean | undefined;
  bg?: string;
  isWishlist?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  button?: boolean;
  hoverShadow?: string;
  productDetailPopup?: any;
  priceUl?: boolean;
  refetch?: (variables?: {}) => any;
  classname?: string;
  cardTag?: cardtag;
  preventClickToPdp?: boolean;
  popupstate?: any;
  productDetailPopupOnImage?: any;
  productHeaderRatingStatus?: boolean;
  showRatingNtype?: any;
  buildYourBoxButtonProps?: {
    addtoBoxButtonText: string;
    addtoBoxOnClickHandler: (id: string, product?: any) => void;
    removeFromBoxButtonText: string;
    removeFromBoxClickHandler: (id: string, product?: any, sku?:any) => void;
    steps: { v_id: string; step_no: number }[];
    current_step_no: number;
  };
  showProductInfoPopup?: boolean;
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

export const ProductCardPlixlife: React.FC<IProductCardPlixlifeProps> = ({
  product,
  hoverBg,
  isWishlist,
  showCart,
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
  productDetailPopup = null,
  productDetailPopupOnImage = null,
  popupstate,
  showRatingNtype,
  buildYourBoxButtonProps,
  showProductInfoPopup,
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
    defaultVariant,
    isAvailableForPurchase,
  } = product;
  const { pathname } = useCustomLocation();
  const { user } = useAuthState();
  const [modalProps, setModalProps] = useState({
    modalOpen: false,
    modalStartPosition: null,
  });

  const defaultVariantMeta = defaultVariant?.metadata;

  const shortDescriptionArray =
    metadata && metadata.filter((item: any) => item.key === "shortDescription");

  const isByob = from === "Byob";

  const productCardAttributes =
    (getMetadataValue(defaultVariantMeta, "product_card_attributes") &&
      parseJson(
        getMetadataValue(defaultVariantMeta, "product_card_attributes")
      )) ||
    (getMetadataValue(metadata, "product_card_attributes") &&
      parseJson(getMetadataValue(metadata, "product_card_attributes")));

  // const tagColor = getMetadataValue(metadata, "tagColor");

  const averageRatingString =
    (defaultVariantMeta &&
      getMetadataValue(defaultVariantMeta, "average_rating")) ||
    (metadata && getMetadataValue(metadata, "average_rating"));
  
  const averageRating = averageRatingString
    ? parseFloat(averageRatingString) ? parseFloat(averageRatingString).toFixed(1) : '5.0'
    : '5.0';

  const shortDescription =
    shortDescriptionArray && shortDescriptionArray.length > 0
      ? parseJson(shortDescriptionArray[0].value)
      : null;

  const sortImages =
    defaultVariant?.images &&
    [...defaultVariant?.images].sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    );

  const image =
    productCardAttributes && productCardAttributes?.image
      ? productCardAttributes?.image
      : defaultVariant?.images && defaultVariant?.images.length
      ? sortImages[0].url
      : thumbnail2x?.url || thumbnail?.url;
  const imageUrlImgixScr = imageURLReplaceWithCDN(image);

  const schemaObj = {
    url: imageUrlImgixScr,
    name: "Product Image",
    author: "plixlife",
  };

  const variantId = defaultVariant && defaultVariant?.id;

  const variantPricing = defaultVariant && defaultVariant.pricing;
  const variantStock = defaultVariant && defaultVariant.quantityAvailable;

  const falvorsAtt =
    defaultVariant &&
    defaultVariant.attributes?.find(att => att.attribute.slug === "flavors");
  const currFlavor =
    falvorsAtt && falvorsAtt.values.length && falvorsAtt.values[0].value;

  const sizeAtt =
    defaultVariant &&
    defaultVariant.attributes?.find(att => att.attribute.slug === "size");
  const currSize = sizeAtt && sizeAtt.values.length && sizeAtt.values[0].value;

  const discountedPrice = variantPricing && variantPricing.price.gross.amount;
  const url = generateProductUrl(id, name, slug);

  const itemAdded = useItemInCart(id);
  // const { items, addItem } = useCart();
  const { items } = useCartState();

  const disableButton = !useCanAddToCart(
    isAvailableForPurchase,
    defaultVariant?.id,
    variantStock,
    1
  );

  // const clevertap = makeClevertap();

  const productClick = () => {
    const clevertap = makeClevertap();
    const ctp = {
      "Product name": name,
      "Product Price": discountedPrice,
      Quantity: 1,
      "Added from": from,
      "Image URL": image,
      URL: window?.location.href,
      Title: ctTitle,
      Duration: currSize,
      Flavor: currFlavor,
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

  const { show } = useContext(OverlayContext);

  const discountvalue = getdiscount(product);

  // Build your box logic to handle button text and onclick functionalities from props
  let boxProductOnClickHandler;
  let boxProductCardButtonText;
  let disableboxButton;

  if (buildYourBoxButtonProps) {
    const {
      steps,
      removeFromBoxButtonText,
      addtoBoxButtonText,
      removeFromBoxClickHandler,
      addtoBoxOnClickHandler,
      current_step_no,
    } = buildYourBoxButtonProps;
    const currentlySelectedVariantId = steps?.find(
      step => step.step_no == current_step_no
    )?.v_id;
    const boxProducts = steps;
    disableboxButton =
      currentlySelectedVariantId && currentlySelectedVariantId !== variantId;

    boxProductOnClickHandler =
      Array.isArray(boxProducts) && currentlySelectedVariantId === variantId
        ? removeFromBoxClickHandler
        : addtoBoxOnClickHandler;
    boxProductCardButtonText =
      disableButton ? "Notify Me" : 
      Array.isArray(boxProducts) && currentlySelectedVariantId === variantId
        ? removeFromBoxButtonText
        : addtoBoxButtonText;
  }

  // const { user } = useAuthState();

  const productCardTag =
    productCardAttributes?.card_tag || (cardTag && cardTag?.name);

  const isFasterResultProduct =
    ctTitle == "plixlife-faster-results" ||
    ctTitle == "plixlife-faster-results-cart";

  const ratingImageUrlWithImgix = imageURLReplaceWithCDN(
    "https://plixlifefc-media.farziengineer.co/hosted/rating_star-148dc021bba0.svg"
  );

  if (defaultVariant && defaultVariant.id) {
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
              <S.TopHeaderTag tagColor={ cardTag && cardTag?.tagColor || ""}>
                {" "}
                {productCardTag}{" "}
              </S.TopHeaderTag>
            )}

            <S.Rating>
              {/* <RatingNext
                value={averageRating}
                size="small"
                color="#EB9220"
                readOnly
              /> */}

              {/* <MyRating rating={averageRating ? averageRating : 5} isReadOnly /> */}
            </S.Rating>
            {discountvalue > 0 ? (
              <div className="discount_percentage">-{discountvalue}%</div>
            ) : null}
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
                    productListId
                  );
                }
              }
            }}
            href={url}
            className={`${classname}__imageLink`}
            disable={preventClickToPdp}
          >
            {popupstate ? (
              <S.CardImage>
                {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                  <Image
                    src={imageUrlImgixScr}
                    alt="Product Image"
                    width={200}
                    height={200}
                    onClick={() => popupstate(product)}
                  />
                ) : (
                  <img src={image || NoPhoto} width="90%" alt="img" />
                )}
              </S.CardImage>
            ) : (
              <S.CardImage className={`${classname}__image`}>
                {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                  <Image
                    src={imageUrlImgixScr}
                    alt="Product Image"
                    width={400}
                    height={400}
                    onClick={e => {
                      productDetailPopupOnImage &&
                      typeof productDetailPopupOnImage === "function"
                        ? productDetailPopupOnImage(product)
                        : productDetailPopupOnImage &&
                          typeof productDetailPopupOnImage === "boolean"
                        ? setModalProps({
                            modalStartPosition: e?.clientX,
                            modalOpen: !modalProps?.modalOpen,
                          })
                        : undefined;
                    }}
                  />
                ) : (
                  <img src={image || NoPhoto} width="90%" alt="img" />
                )}
              </S.CardImage>
            )}
          </MyCustomLink>

          {/* <div> */}
          <S.CardInfo className={`${classname}__cardInfo`}>
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
                    productListId
                  );
                }
              }}
            >
              <S.CardName className="productCard__name">
                {productCardAttributes?.name || name}
              </S.CardName>
            </MyCustomLink>

            {/* ht rating and_product type wrapper */}

            {popupstate ? (
              <>
                <div className="rating_and_product_type_wrapper">
                  <div className="rating">
                    <img src={ratingImageUrlWithImgix} alt="Rating Star" />
                    {(averageRating || 5)}
                  </div>
                  <div className="vertical_bar"></div>
                  <div className="product_type">{cardTag && cardTag?.name}</div>
                </div>
                {from === "CollectionPage" ||
                from === "HomePage" ||
                from === "Byob" ? (
                  <div className="collection-variant-name">
                    {
                      product?.defaultVariant?.attributes
                        ?.filter(item => item?.attribute?.slug === "size")[0]
                        ?.values[0]?.name?.split("__")[0]
                    }
                  </div>
                ) : (
                  <>
                    <div className="collection-variant-name">
                      {
                        product?.defaultVariant?.attributes
                          ?.filter(item => item?.attribute?.slug === "size")[0]
                          ?.values[0]?.name?.split("__")[0]
                      }
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="rating_and_product_type_wrapper">
                  {isByob ? (
                    <div className="rating byob-rating">
                      <img
                        src="/plixlifefc/assets/rating_star.svg"
                        alt="Rating Star"
                      />
                      <span>{averageRating ? averageRating : 5}</span>
                    </div>
                  ) : (
                    <div className="rating">
                      <img
                        src="/plixlifefc/assets/rating_star.svg"
                        alt="Rating Star"
                      />
                      {averageRating ? averageRating : 5}
                    </div>
                  )}
                  {cardTag?.name && (
                    <div className="tag_wrapper">
                      <div className="vertical_bar"></div>
                      <div className="product_type">
                        {cardTag && cardTag?.name}
                      </div>
                    </div>
                  )}
                  {productDetailPopup &&
                    typeof productDetailPopup === "function" &&
                    !isByob && (
                      <>
                        <div className="vertical_bar"></div>
                        <div className="faster-result-know-more">
                          <S.ProductInfoModalToggle
                            onClick={() => productDetailPopup(product)}
                          >
                            Know more
                          </S.ProductInfoModalToggle>
                        </div>
                      </>
                    )}
                  {showProductInfoPopup && isFasterResultProduct && (
                    <>
                      <div className="vertical_bar"></div>
                      <div className="faster-result-know-more">
                        <S.ProductInfoModalToggle
                          onClick={e =>
                            setModalProps({
                              modalStartPosition: e?.clientX,
                              modalOpen: !modalProps?.modalOpen,
                            })
                          }
                        >
                          Know more
                        </S.ProductInfoModalToggle>
                      </div>
                    </>
                  )}
                </div>
                {from === "CollectionPage" || from === "HomePage" ? (
                  <div className="collection-variant-name">
                    {
                      product?.defaultVariant?.attributes
                        ?.filter(item => item?.attribute?.slug === "size")[0]
                        ?.values[0]?.name?.split("__")[0]
                    }
                  </div>
                ) : (
                  <>
                    <div className="collection-variant-name">
                      {
                        product?.defaultVariant?.attributes
                          ?.filter(item => item?.attribute?.slug === "size")[0]
                          ?.values[0]?.name?.split("__")[0]
                      }
                    </div>
                  </>
                )}
              </>
            )}
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
          {/* {getThisVariantPrice(defaultVariant)} */}
          <div className={`${isByob ? "space_content" : ""}`}>
            <S.PriceRow isCrossSell={ctTitle == "plixlife-faster-results"}>
              { ctTitle == "plixlife-faster-results" ? getVariantPriceIncludeTaxes(defaultVariant) : getThisVariantPrice(defaultVariant)}
              {(showProductInfoPopup || productDetailPopup) &&
                !isFasterResultProduct && (
                  <S.ProductInfoModalToggle
                    isByob={isByob}
                    onClick={e => {
                      if (
                        productDetailPopup &&
                        typeof productDetailPopup === "function"
                      ) {
                        productDetailPopup(product);
                      } else {
                        setModalProps({
                          modalStartPosition: e?.clientX,
                          modalOpen: !modalProps?.modalOpen,
                        });
                      }
                    }}
                  >
                    {isByob ? (
                      <>
                        <MemoLearnMoreIcon /> <span>Learn</span>
                      </>
                    ) : (
                      "Know more"
                    )}
                  </S.ProductInfoModalToggle>
                )}
            </S.PriceRow>
          </div>
          {showProductInfoPopup && modalProps?.modalOpen && (
            <ProductInfoPopUp
              product={product}
              modalProps={modalProps}
              setModalProps={setModalProps}
              variantId={variantId}
              disableButton={disableButton}
              popupFor={ctTitle}
              atcProps={{
                atcText: boxProductCardButtonText || "ADD TO CART",
                onClick: boxProductOnClickHandler || null,
                disableboxButton: disableboxButton || false,
              }}
            />
          )}
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
                showCart={showCart}
                limitProductCategories={[
                  { name: "Others also Liked Products", limit: 1 },
                ]}
                productCategoryName={product?.category?.name}
                variantId={variantId}
                disabled={itemAdded ? false : disableButton}
                productListId={productListId}
                itemAdded={false}
                size="sm"
                page=""
                index={index}
                productId={product?.id}
                leftIcon={
                  boxProductCardButtonText == "Remove From Box" ? (
                    <CloseCrossIcon />
                  ) : (
                    <MemoCartPlusIcon />
                  )
                }
                withIcons
                ctTitle={ctTitle}
                buttonClassName={
                  disableboxButton
                    ? "add-to-box-disabled"
                    : boxProductCardButtonText == "Remove From Box"
                    ? "remove-from-box"
                    : disableButton
                    ? "plixlife-button-notify"
                    : "plixlife-button"
                }
                product={product}
                customOnclickHandler={boxProductOnClickHandler}
                mainText={boxProductCardButtonText}
                parentProducts={parentProducts}
              />
            </S.CardButton>
          )}
        </S.CardBody>
      </>
    );
  }
  return <></>;
};

ProductCardPlixlife.displayName = "ProductCardPlixlife";
export default React.memo(ProductCardPlixlife, mmatchPropsAreEqual);
