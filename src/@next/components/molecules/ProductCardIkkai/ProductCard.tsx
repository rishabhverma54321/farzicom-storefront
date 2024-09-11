import React, { useEffect, useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import OOSBox from "@components/atoms/SvgIcons/OOSBox";
import { MyRating } from "@components/atoms/MyRating";
import { Gap } from "@components/atoms/Gap";
import { AddToCartButton } from "@components/molecules/AddToCartButton";
import { CachedImage } from "@components/molecules/CachedImage";
import { Price } from "@components/molecules/Price";
import AddWishlist from "@components/organisms/AddWishlist";
import { dummyAddress } from "@components/templates/Cart";
import { useItemInCart } from "@hooks/useItemInCart";
import { useStockHelpers } from "@hooks/useStockHelpers";
import { theme } from "Themes/globalStyles/constants";
import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { generateProductUrl } from "@temp/core/utils";

// @ts-ignore
import gtmConfig from "Themes/lib/gtmConfig.js"; // @ts-ignore
import clevertapEvents from "Themes/lib/clevertapEvents.js";
// @ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";

import { META_DEFAULTS } from "Themes/config";
import { TypedGetProductRatings } from "./queries";
import * as S from "./style";

export interface IProductCardIkkaiProps {
  product: any;
  isWishlist?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  withATC?: boolean;
  refetch?: (variables?: {}) => any;
}

export const ProductCardIkkai: React.FC<IProductCardIkkaiProps> = ({
  product,
  from,
  ctTitle,
  onSearchPage = false,
  withATC = true,
  refetch,
}) => {
  const { id, name, slug, thumbnail, variants } = product;

  const image = thumbnail?.url;
  const bigThumbnail = product.thumbnail2x?.url;
  const variantId = variants && variants[0]?.id;
  const variantPricing = variants && variants[0]?.pricing;
  const discountedPrice = variantPricing && variantPricing.price.gross.amount;
  const url = generateProductUrl(id, name, slug);

  const itemAdded = useItemInCart(id);
  const { addItem } = useCart();

  const [loading, setLoading] = useState(false);

  const { setShippingAddress, setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();

  const { user } = useAuthState();

  const clevertap = makeClevertap();

  useEffect(() => {
    if (itemAdded) {
      setLoading(false);
    }
  }, [itemAdded]);

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
  };

  const { disableButton, weightWithUnit } = useStockHelpers(product);

  const handleAddToCart = async (variantId: string, quantity: number) => {
    try {
      addItem(variantId, quantity).then(res => {
        if (res.error) {
          setLoading(false);
        }
        if (res.data) {
          const isItemAdded =
            res.data.lines.filter(
              (line: { variant: { id: string } }) =>
                line.variant.id === variantId
            ).length > 0;
          if (!isItemAdded && refetch) {
            refetch();
          } else if (!checkout?.shippingAddress) {
            createCheckout();
          }
        }
      });
      // show(OverlayType.message, OverlayTheme.modal, messageContext);
      if (checkout?.id === undefined) {
        await createCheckout();
      }
    } catch (e) {
      //
    }

    if (clevertapEvents.addedToCart.enable) {
      clevertap.event.push(clevertapEvents.addedToCart.value, {
        "Product name": name,
        "Product Price": discountedPrice,
        Quantity: quantity,
        "Added from": from,
        "Image URL": image,
        URL: window.location.href,
        Title: ctTitle,
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
                id: variants[0].sku,
                price: discountedPrice,
                brand: META_DEFAULTS.name,

                quantity,
              },
            ],
          },
        },
      });
    }
  };

  // const recordClevertap = () => {
  //   const clevertap = makeClevertap();
  //   const ctp = {
  //     "Product name": name,
  //     Price: variantPricing.priceUndiscounted.net.amount,
  //     Quantity: 1,
  //     Discount: itemDiscount,
  //     "Added from": from,
  //   };
  //   //
  //   // "🚀 ~ file: ProductCardIkkai.tsx ~ line 216 ~ recordClevertap ~ ctp",
  //   // ctp
  //   // );
  //   if (clevertapEvents.addedToWishlist.enable) {
  //     clevertap.event.push(clevertapEvents.addedToWishlist.value, ctp);
  //   }
  //   if (gtmConfig.addedToWishlist.enable) {
  //     (window.dataLayer = window.dataLayer || []).push({
  //       event: gtmConfig.addedToWishlist.value,
  //       ecommerce: {
  //         "Added to wishlist": {
  //           "Product name": name,
  //           Price: productPrice,
  //           Quantity: 1,
  //           Discount: itemDiscount,
  //           "Added from": from,
  //         },
  //       },
  //     });
  //   }
  // };

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
      <S.CardBody>
        <MyCustomLink href={url}>
          <S.CardImage>
            <CachedImage url={bigThumbnail || image} alt="Product Image" />
            {disableButton && !itemAdded && (
              <S.OOSOverlay>
                <S.OOSBackground />
                <OOSBox />
                <S.OOSText>Currently Out Of Stock</S.OOSText>
              </S.OOSOverlay>
            )}
          </S.CardImage>
        </MyCustomLink>

        <Gap size="0.75rem" />

        <S.CardInfo>
          <TypedGetProductRatings
            displayLoader={false}
            variables={{ product: product.id, first: 100 }}
          >
            {({ data, loading }) => {
              const avg =
                data &&
                data?.productReviews &&
                data?.productReviews?.edges &&
                data?.productReviews?.edges.length > 0
                  ? data?.productReviews?.edges.reduce((total, curr) => {
                      if (
                        curr?.node?.rating &&
                        (curr.node.user || curr.node?.userName)
                      ) {
                        return total + curr.node.rating;
                      }
                      return total + 0;
                    }, 0)
                  : 0;

              const reviewLength =
                data?.productReviews?.edges.filter(
                  review => review?.node?.user || review?.node?.userName
                ).length || 0;

              const rating = reviewLength > 0 ? avg / reviewLength : 0;
              if (loading)
                return (
                  <S.Rating>
                    <MyRating color={theme.primary} rating={5} isReadOnly />
                    <S.ReviewsCount>{reviewLength} reviews</S.ReviewsCount>
                    <S.WishlistContainer>
                      <AddWishlist id={id} hideWishlist={onSearchPage} />
                    </S.WishlistContainer>
                  </S.Rating>
                );

              return (
                <S.Rating>
                  <MyRating color={theme.primary} rating={rating} isReadOnly />
                  <S.ReviewsCount>{reviewLength} reviews</S.ReviewsCount>
                  <S.WishlistContainer>
                    <AddWishlist id={id} hideWishlist={onSearchPage} />
                  </S.WishlistContainer>
                </S.Rating>
              );
            }}
          </TypedGetProductRatings>

          <Gap size="0.75rem" />

          <MyCustomLink href={url}>
            <S.CardName>{name?.toLowerCase()}</S.CardName>
          </MyCustomLink>

          <Gap size="0.75rem" />
        </S.CardInfo>

        <S.CardWeight>
          {weightWithUnit.replace(/\s/g, "").toLowerCase()}
        </S.CardWeight>

        <Gap size="0.5rem" />

        <S.CardPrice>
          <Price product={product} config={{ priceWithFractions: false }} />
        </S.CardPrice>

        {withATC && (
          <>
            <Gap size="0.5rem" />

            <S.CardButton>
              <AddToCartButton
                onSubmit={async disabled => {
                  if (disabled && refetch) {
                    refetch();
                  } else {
                    setLoading(true);
                    productClick();
                    handleAddToCart(variantId, 1);
                  }
                }}
                loading={loading}
                disabled={disableButton}
                itemAdded={itemAdded}
                size="sm"
                page=""
                withIcons
                productId={product?.id}
              />
            </S.CardButton>
          </>
        )}
      </S.CardBody>
    </>
  );
};

ProductCardIkkai.displayName = "ProductCardIkkai";
export default React.memo(ProductCardIkkai);
