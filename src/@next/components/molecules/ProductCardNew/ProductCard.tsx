import React, { useContext } from "react";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import { MyRating, PriceShow, CustomizeButton, Line } from "@components/atoms";
import { useItemInCart, useStockHelpers } from "@hooks";
import {
  useAuthState,
  useCart,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { generateProductUrl } from "@temp/core/utils";
import { Wishlist } from "@components/molecules/Wishlist";
import Imgix from "react-imgix";

import NoPhoto from "images/no-photo.svg";
// import { defaultTheme } from "../../../globalStyles/themes";

import { OverlayContext, OverlayType, OverlayTheme } from "@temp/components";
import {
  CLIENT,
  IMAGE_CDN,
  IMAGE_CDN_PROVIDERS,
  META_DEFAULTS,
} from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import { getMetadataValue, useImageURLReplaceWithCDN } from "@utils/misc";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import AddToCartButton from "../NewAddToCartButton";
import * as S from "./style";
import { dummyAddress } from "../../templates/Cart/Cart";

import { TypedGetProductRatings } from "./queries";
import CustomizeButton from "@components/atoms/CustomizeButton";
import Line from "@components/atoms/Line";
import MyRating from "@components/atoms/MyRating";
import PriceShow from "@components/atoms/PriceShow";
import { useCustomLocation } from "@hooks/useCustomLocation";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface IProductCardNewProps {
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
}
// export const messageContext: InnerOverlayContextInterface = {
//   title: "Item Added to cart",
//   status: "success",
// };

export const ProductCardNew: React.FC<IProductCardNewProps> = ({
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
}) => {
  const { show } = useContext(OverlayContext);

  const {
    id,
    name,
    slug,
    thumbnail,
    // pricing,
    // isAvailableForPurchase,
    defaultVariant,
    variants,
    metadata,
  } = product;
  const { pathname } = useCustomLocation();

  const sortImages =
    defaultVariant?.images &&
    defaultVariant?.images.sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    );

  const image =
    defaultVariant?.images && defaultVariant?.images.length
      ? sortImages[0].url
      : thumbnail?.url;
  const imageUrlImgixScr = useImageURLReplaceWithCDN(image);

  const shortDescriptionArray =
    metadata && metadata.filter((item: any) => item.key === "shortDescription");

  const parseJson = (value: any) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const shortDescription =
    shortDescriptionArray && shortDescriptionArray.length > 0
      ? parseJson(shortDescriptionArray[0].value)
      : null;

  const ProductDetailsArray =
    metadata && metadata.filter((item: any) => item.key === "product_details");

  const ProductDetailsFromMeta =
    ProductDetailsArray && ProductDetailsArray.length > 0
      ? parseJson(ProductDetailsArray[0].value)
      : null;
  //
  // const image = thumbnail?.url;
  const variantId =
    defaultVariant?.id || (variants && variants.length > 0 && variants[0]?.id);
  const variantPricing =
    defaultVariant?.pricing ||
    (variants && variants.length > 0 && variants[0].pricing);
  // const variantStock = variants && variants[0].quantityAvailable;
  const discountedPrice = variantPricing && variantPricing.price?.gross?.amount;
  // const ratingValue = 4;
  const url = generateProductUrl(id, name, slug);

  const itemAdded = useItemInCart(id);
  const { addItem } = useCart();

  const { setShippingAddress, setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();

  const clevertap = makeClevertap();

  const productClick = () => {
    if (gtmConfig.bannerClicks.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.bannerClicks.value,
        ecommerce: {
          click: {
            products: [
              {
                name: product.name,
                price: discountedPrice,
              },
            ],
          },
        },
      });
    }
    if (clevertapEvents.productClick.enable) {
      clevertap.event.push(clevertapEvents.productClick.value, {
        products: [
          {
            name: product.name,
            price: discountedPrice,
          },
        ],
      });
    }
    if (gtmConfig.addedToCart.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.addedToCart.value,
        ecommerce: {
          currencyCode: "INR",
          add: {
            products: [
              {
                name,
                id: defaultVariant?.sku,
                price: discountedPrice,
                brand: META_DEFAULTS.name,
                manufacturedBy:
                  ProductDetailsFromMeta?.product_information?.filter(
                    item => item?.key == "Manufactured By"
                  )[0]?.value || "",
                countryOfOrigin:
                  ProductDetailsFromMeta?.product_information?.filter(
                    item => item?.key == "Country of origin"
                  )[0]?.value || "",
                quantity: 1,
              },
            ],
          },
        },
      });
    }
  };

  const { disableButton, productPrice, itemDiscount } = useStockHelpers(
    product
  );

  // useEffect(() => {
  //   if(!disableButton){

  //   }
  // }, [disableButton]);

  const { user } = useAuthState();

  const recordClevertap = () => {
    const clevertap = makeClevertap();
    const ctp = {
      "Product name": name,
      Price: variantPricing.priceUndiscounted?.net?.amount,
      Quantity: 1,
      Discount: itemDiscount,
      "Added from": from,
    };
    //
    // "🚀 ~ file: ProductCardNew.tsx ~ line 216 ~ recordClevertap ~ ctp",
    // ctp
    // );
    if (clevertapEvents.addedToWishlist.enable) {
      clevertap.event.push(clevertapEvents.addedToWishlist.value, ctp);
    }
    if (gtmConfig.addedToWishlist.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.addedToWishlist.value,
        ecommerce: {
          "Added to wishlist": {
            "Product name": name,
            Price: productPrice,
            Quantity: 1,
            Discount: itemDiscount,
            "Added from": from,
          },
        },
      });
    }
  };

  const createCheckout = async () => {
    if (user && user.defaultShippingAddress) {
      const { dataError } = await setShippingAddress(
        user.defaultShippingAddress,
        user.email
      );
      const error = dataError?.error;
      if (error) {
        // alert("error in cart setting dummy shipping address");
      }
    } else {
      const { dataError } = await setShippingAddress(
        dummyAddress,
        "dummy@dummy.com"
      );
      const error = dataError?.error;
      if (error) {
        // alert("error in cart setting dummy shipping address");
      }
    }

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);
  };

  return (
    <>
      <S.CardBody
        hoverBg={hoverBg}
        bg={bg}
        hoverShadow={hoverShadow}
        className={classname}
      >
        {!onSearchPage && (
          <S.CardWishlist className={`${classname}__wishlistContainer`}>
            <Wishlist
              id={id}
              isWishlist={isWishlist}
              onSubmit={recordClevertap}
            />
          </S.CardWishlist>
        )}
        <MyCustomLink href={url} className={`${classname}__imageLink`}>
          <S.CardImage>
            {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
              <Imgix
                src={imageUrlImgixScr}
                sizes="100vw"
                width={240}
                disableQualityByDPR
                imgixParams={{ sharp: 20 }}
                htmlAttributes={{ alt: "productImage" }}
              />
            ) : (
              <img src={image || NoPhoto} width="90%" alt="img" />
            )}
          </S.CardImage>
        </MyCustomLink>
        {/* <div> */}
        <S.CardInfo className={`${classname}__cardInfo`}>
          <a href={url}>
            <S.CardName className={`${classname}__productName`}>
              {name}
            </S.CardName>
          </a>

          {/* {shortDescription && (
            <div>
              {shortDescription.map(item => (
                <>{item} </>
              ))}
            </div>
          )} */}
        </S.CardInfo>
        {shortDescription && pathname === "/" && (
          <S.CardShortDdescription className={`${classname}__shortDescription`}>
            {shortDescription.map(desc => (
              <li>-{desc}</li>
            ))}
          </S.CardShortDdescription>
        )}
        <S.CardPrice className={`${classname}__priceContainer`}>
          <S.Quantity>
            {/* <span style={{ color: "black", fontSize: "10px" }}>250ml</span> */}
          </S.Quantity>
          <PriceShow
            price={productPrice}
            discount={itemDiscount}
            alignMent="flex-start"
          />
          {priceUl && <Line width="50px" marginTop="10px" height="2px" />}
        </S.CardPrice>
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
              variantId={variantId}
              disabled={itemAdded ? false : disableButton}
              itemAdded={itemAdded}
              size="sm"
              page=""
              productId={product?.id}
              leftIcon="images/cart.svg"
              mainText={CLIENT === clients.GENIEFC ? "Add to bag" : null}
            />
          </S.CardButton>
        )}

        {/* </div> */}
      </S.CardBody>
    </>
  );
};
ProductCardNew.displayName = "ProductCardNew";
export default React.memo(ProductCardNew);
