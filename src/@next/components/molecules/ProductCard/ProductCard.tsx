import React, { useState, useEffect } from "react";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import { MyRating } from "@components/atoms/MyRating";
import { PriceShow } from "@components/atoms/PriceShow";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useItemInCart } from "@hooks/useItemInCart";
import { useStockHelpers } from "@hooks/useStockHelpers";

import {
  useAuth,
  useCart,
  useWishlist,
  useCheckout,
  useCheckoutState,
  useAuthState,
} from "@saleor/sdk";
import { generateProductUrl } from "@temp/core/utils";
import { InnerOverlayContextInterface } from "@temp/components/Overlay";
import NoPhoto from "images/no-photo.svg";
// import { defaultTheme } from "../../../globalStyles/themes";
import { imageURLReplaceWithCDN } from "@utils/misc";
import Imgix from "react-imgix";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN, META_DEFAULTS } from "Themes/config";
import { Wishlist } from "@components/molecules/Wishlist";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import AddToCartButton from "../AddToCartButton";
import * as S from "./style";
import { dummyAddress } from "../../templates/Cart/Cart";

// @ts-ignore

// @ts-ignore

// @ts-ignore
import { TypedGetProductRatings } from "./queries";

export interface IProductCardProps {
  product: any;
  hoverBg?: boolean | undefined;
  isWishlist?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  refetch?: (variables?: {}) => any;
}
export const messageContext: InnerOverlayContextInterface = {
  title: "Item Added to cart",
  status: "success",
};

export const ProductCard: React.FC<IProductCardProps> = ({
  product,
  hoverBg = true,
  isWishlist,
  from,
  ctTitle,
  onSearchPage = false,
  refetch,
}) => {
  const { id, name, slug, thumbnail, variants, thumbnail2x, images } = product;

  //

  // const listPriceArray =
  //   metadata && metadata.filter((item: any) => item.key === "listPrice");
  // images?.[0]?.url
  let image = "";
  if (images && images?.[0]?.url) {
    image = imageURLReplaceWithCDN(images?.[0]?.url?.toString());
  } else if (thumbnail2x && thumbnail2x?.url) {
    image = imageURLReplaceWithCDN(thumbnail2x?.url);
  } else if (thumbnail && thumbnail?.url) {
    image = imageURLReplaceWithCDN(thumbnail?.url);
  }

  const imageSrc = `${image}`;

  const variantId = variants && variants[0]?.id;
  const variantPricing = variants && variants[0].pricing;
  const discountedPrice = variantPricing && variantPricing.price.gross.amount;
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
  };

  const { disableButton, productPrice, itemDiscount } = useStockHelpers(
    product
  );

  const { user } = useAuthState();
  // const overlay = useContext(OverlayContext);
  // const { show } = overlay;

  const { items: wishlistItems } = useWishlist();

  const getItem = (id: string): boolean => {
    const itemsInWishlist = wishlistItems;
    //
    const isItemInCart = itemsInWishlist
      ?.map((item: any) => {
        return item.id;
      })
      .findIndex((element: string) => element === id);
    if (isItemInCart === -1 || isItemInCart === undefined) return false;
    if (isItemInCart >= 0) return true;

    return false;
  };

  const [, setaddedToWishlist] = useState(getItem(id));
  const [loading, setLoading] = useState(false);
  //

  const handleAddToCart = async (variantId: string, quantity: number) => {
    // setLoading(true);
    //
    try {
      addItem(variantId, quantity).then(res => {
        //
        if (res.error) {
          setLoading(false);
        }
        if (res.data) {
          setLoading(false);

          const isItemAdded =
            res.data.lines.filter(
              (line: { variant: { id: string } }) =>
                line.variant.id === variantId
            ).length > 0;
          //
          if (!isItemAdded && refetch) {
            //

            refetch();
          } else if (!checkout?.shippingAddress) {
            createCheckout();
          }
          // show(OverlayType.cart, OverlayTheme.right);
        }
      });
      // show(OverlayType.message, OverlayTheme.modal, messageContext);
      if (checkout?.id === undefined) {
        await createCheckout();
      }
    } catch (e) {}

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

  useEffect(() => {
    //
    const isPresent = getItem(id);
    setaddedToWishlist(prev => {
      if (prev !== isPresent) {
        return isPresent;
      }
      return prev;
    });
  }, [wishlistItems]);

  useEffect(() => {
    if (itemAdded) setLoading(false);
  }, [itemAdded]);

  return (
    <>
      <S.CardBody hoverBg={hoverBg} loading={loading}>
        {!onSearchPage && (
          <S.CardWishlist>
            <Wishlist
              id={id}
              isWishlist={isWishlist}
              setLoading={setLoading}
              heart="images/heart3.svg"
              heartFill="images/heart7.svg"
            />
          </S.CardWishlist>

          // <S.CardWishlist onClick={handleAddToWishlist}>
          //   {!addedToWishlist && !isWishlist ? (
          //     <ReactSVG path={Heart} />
          //   ) : (
          //     // <Icon name="heart" size={64} />
          //     <>
          //       {isWishlist ? (
          //         <>
          //           {" "}
          //           <IconButton
          //             testingContext="removeButton"
          //             testingContextId={id}
          //             size={22}
          //             name="trash"
          //             // onClick={onRemove}
          //           />{" "}
          //         </>
          //       ) : (
          //         <ReactSVG path={HeartFill} />
          //       )}{" "}
          //     </>
          //   )}
          // </S.CardWishlist>
        )}
        <MyCustomLink href={url}>
          <S.CardImage>
            {IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
              <Imgix
                src={imageSrc || NoPhoto}
                sizes="(min-width: 992px) 25vw, 50vw"
                imgixParams={{ sharp: 20 }}
                htmlAttributes={{ alt: name }}
              />
            ) : (
              <img src={imageSrc || NoPhoto} width="90%" alt="img" />
            )}
          </S.CardImage>
        </MyCustomLink>

        <S.CardInfo>
          <MyCustomLink href={url}>
            <S.CardName>{name}</S.CardName>
          </MyCustomLink>

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

              //
              const reviewLength =
                data?.productReviews?.edges.filter(
                  review => review?.node?.user || review?.node?.userName
                ).length || 0;

              const rating = reviewLength > 0 ? avg / reviewLength : 0;
              //
              if (loading)
                return (
                  <S.Rating>
                    <MyRating rating={5} isReadOnly />
                    <span>(0)</span>
                  </S.Rating>
                );

              return (
                <S.Rating>
                  <MyRating rating={rating} isReadOnly />
                  {reviewLength > 0 && <span>({reviewLength})</span>}
                </S.Rating>
              );
            }}
          </TypedGetProductRatings>
        </S.CardInfo>
        <S.CardPrice>
          <PriceShow
            price={productPrice}
            discount={itemDiscount}
            alignMent=""
          />
        </S.CardPrice>
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
            disabled={itemAdded ? false : disableButton}
            itemAdded={itemAdded}
            size="sm"
            page=""
            productId={product?.id}
          />
        </S.CardButton>
      </S.CardBody>
    </>
  );
};
ProductCard.displayName = "ProductCard";
export default React.memo(ProductCard);
