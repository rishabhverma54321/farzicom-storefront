import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
// import ReactSVG from "react-svg";
import cx from "classnames";
import { GTCArrow } from "@components/atoms/SvgIcons";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import ReactSVG from "react-svg";
import { CircularProgress } from "@mui/material";
import {
  useCart,
  useCartState,
  useCheckoutState,
  useAuthState,
  useCheckout,
} from "@saleor/sdk";
import GoToCartButton from "./GoToCartButton";
import * as S from "./style";
import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import {
  addToCartDataLayer,
  customEventTrigger,
  getMetadataValue,
  parseJson,
  trackItemsJourney,
  getCheckoutMetaForVariantAttributeWeight,
} from "@utils/misc";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { useMessageStateUpdate } from "@temp/MessageContext";
import { useRouter } from "next/router";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import { getThisVariantPrice } from "../ProductCardPlixlife/stockHelpers";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { addTags } from "@components/organisms/ProductSubscriptionPopup/queries";
import { getDBIdFromGraphqlId } from "@utils/core";
import makeClevertap from "Themes/lib/makeClevertap.js";
import style from "./scss/style.scss"

export interface INewAddToCartButton {
  disabled: boolean;
  fullyDisabled?: boolean;
  openCart?: boolean;
  showCart?: boolean;
  onSubmit: (disabled?: boolean, checkout?: any) => void;
  itemAdded: boolean;
  size: "sm" | "md" | "none";
  page: string;
  // loading: boolean;
  // setLoading: (value: React.SetStateAction<boolean>) => void;
  variantId: string;
  buttonId: string;
  showVp?: boolean;
  product: any;
  withIcons?: Boolean;
  productId?: string;
  buttonClassName?: string;
  mainText?: string | React.ReactNode;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  showGoToCart?: boolean;
  ctTitle?: string;
  setShowBottomDrawer?: any;
  showStickyVariantPicker2?: boolean;
  limitProductCategories?: { name: string; limit: number }[];
  productCategoryName?: string;
  customOnclickHandler?: (id: string, product?: any) => void;
  isBuyNowButton?: boolean;
  showprice?: boolean;
  atcLoading?: boolean | null;
  showSmallVariant: {
    open: boolean;
    redirect: boolean;
    redirectFromLastVariant: boolean;
  };
  setShowSmallVaraint: React.Dispatch<
    React.SetStateAction<{ open: boolean; redirect: boolean }>
  >;
  parentProducts?: string;
  productListId?: string;
  index?: number;
  cta_position?: string;
  isSubscriptionProduct?: boolean;
  productCheckoutMetadata?: any;
  selectVariantWeight?: { text: string; description: string };
}

export const NewAddToCartButton: React.FC<INewAddToCartButton> = ({
  onSubmit,
  disabled,
  fullyDisabled,
  itemAdded,
  size,
  page,
  withIcons,
  productId,
  buttonClassName,
  buttonId = "",
  mainText,
  leftIcon,
  openCart = false,
  showCart = true,
  rightIcon,
  showGoToCart = true,
  variantId,
  product,
  limitProductCategories,
  productCategoryName,
  isBuyNowButton,
  setShowBottomDrawer,
  showVp = false,
  ctTitle,
  selectVariantWeight = null,
  atcLoading = null,
  showStickyVariantPicker2 = false,
  showSmallVariant = {
    open: false,
    redirect: true,
    redirectFromLastVariant: false,
  },
  setShowSmallVaraint,
  customOnclickHandler,
  showprice,
  parentProducts,
  productListId,
  index,
  cta_position,
  isSubscriptionProduct,
  productCheckoutMetadata,
}) => {
  const messageUpdate = useMessageStateUpdate();
  const { addToCartRest, updateItemWithLinesRest } = useCart();
  const { user } = useAuthState();
  const { items } = useCartState();
  const { checkout, promoCodeDiscount, useCashback } = useCheckoutState();
  const { checkoutPaymentMethodUpdate } = useCheckout();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const shopmetadata = useContext(ShopMetaContext);
  const selectedVariant =
    product?.variants && Array.isArray(product?.variants)
      ? product?.variants?.find(variant => variant.id === variantId)
      : product?.defaultVariant;
  const freebieData =
    getMetadataValue(selectedVariant?.metadata, "freebie_includes") &&
    parseJson(getMetadataValue(selectedVariant?.metadata, "freebie_includes"));

  const freebieAlreadyPresent =
    (items &&
      items?.length &&
      freebieData?.enable &&
      items?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
    false;

  const findVariantQuantity: any =
    (items && items?.find(item => item?.variant?.id === variantId))?.quantity ||
    0;

  const membershipProductVariantId =
    getMetadataValue(shopmetadata, "membership_v3") &&
    parseJson(getMetadataValue(shopmetadata, "membership_v3"))?.variantID;
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));
  const newProductVariant =
    getMetadataValue(product?.metadata, "product_variants") &&
    parseJson(getMetadataValue(product?.metadata, "product_variants"));

  const variantConfig =
    getMetadataValue(selectedVariant?.metadata, "variant_config") &&
    parseJson(getMetadataValue(selectedVariant?.metadata, "variant_config"));

  const checkoutMetaData: any[] = newProductVariant?.enable
    ? Array.isArray(productCheckoutMetadata)
      ? productCheckoutMetadata?.push(
          getCheckoutMetaForVariantAttributeWeight(
            variantId,
            checkout?.metadata,
            "ADD",
            selectVariantWeight?.text || ""
          )
        )
      : [
          getCheckoutMetaForVariantAttributeWeight(
            variantId,
            checkout?.metadata,
            "ADD",
            selectVariantWeight?.text || ""
          ),
        ]
    : productCheckoutMetadata;

  let route = router.pathname.split("/")[1];
  const { show } = useContext(OverlayContext);
  const cart_config =
    getMetadataValue(shopmetadata, "cart_config_v2") &&
    parseJson(getMetadataValue(shopmetadata, "cart_config_v2"));

  const isProductPage = router.pathname === "/product/[name]/[slug]";

  const preserveTimestamp = (product_item: any, variant_id: string) => {
    const variants: [] = product_item?.variants;
    const currentVariant = variants
      ? variants.find((v: any) => v.id === variant_id)
      : product_item?.defaultVariant;
    const upsell_product =
      currentVariant?.metadata &&
      getMetadataValue(currentVariant?.metadata, "upsell_product") &&
      parseJson(getMetadataValue(currentVariant?.metadata, "upsell_product"))
        .length &&
      parseJson(
        getMetadataValue(currentVariant?.metadata, "upsell_product")
      )[0];
    if (upsell_product) {
      localStorage.setItem(`${upsell_product.id}`, `${Date.now()}`);
    }
  };

  const cta_type =
    mainText && typeof mainText === "string"
      ? mainText.toLowerCase()
      : route == "product" &&
        ctTitle !== "plixlife-faster-results" &&
        ctTitle !== "plixlife-faster-results-cart"
      ? "add_to_cart"
      : "add";

  useEffect(() => {
    if (typeof atcLoading === "boolean") {
      setLoading(atcLoading);
    }

    return () => {
      setLoading(false);
    };
  }, [atcLoading]);

  const handleAfterATC = (
    res: any,
    currentVariant: any,
    isIncludeFreebie: boolean = false
  ) => {
    const token = res?.data?.token || null;
    if (isProductPage && cart_config?.open_cart_pdp === false && !openCart) {
      if (res?.errors[0]?.code) {
        messageUpdate(res?.errors[0]?.code, "error");
        console.log("error", res?.errors[0]?.code);
      } else {
        messageUpdate("Added to cart successfully", "success");
      }
    }
    if (CLIENT == clients.BODY_FIRST) {
      show(OverlayType.plixlifefcCart, OverlayTheme.right);
    }
    if (
      CLIENT === clients.PLIXLIFEFC &&
      product &&
      product?.category?.slug === "others-also-liked-products"
    ) {
      const cartPlix = document.getElementById("cart-plix-scrollable-area");
      cartPlix?.scroll({
        top: 0,
        behavior: "auto",
      });
    }
    if (isIncludeFreebie && freebieData?.variant_id) {
      const line = res?.data?.lines?.filter(
        line => line.variant.id === freebieData?.variant_id
      )[0];
      addToCartDataLayer(
        res,
        line?.variant?.product,
        freebieData?.variant_id,
        line,
        ctTitle,
        user,
        productListId,
        cta_type,
        "",
        index,
        cta_position
      );
      trackItemsJourney(
        res?.data?.lines,
        freebieData?.variant_id,
        parentProducts,
        ctTitle,
        productListId
      );
    }
    if (token) {
      const url = `/checkout/address?token=${token}`;
      const clevertap = makeClevertap();
      clevertap.profile.push({
        Site: {
          farzicom_checkout_url: url,
        },
      });
    }
    if (product && variantId) {
      addToCartDataLayer(
        res,
        product,
        variantId,
        res?.data?.lines?.filter(line => line.variant.id === variantId)[0],
        ctTitle,
        user,
        productListId,
        cta_type,
        "",
        index,
        cta_position
      );
      trackItemsJourney(
        res?.data?.lines,
        variantId,
        parentProducts,
        ctTitle,
        productListId
      );
    }
    if (!product && variantId === membershipProductVariantId) {
      customEventTrigger("membership_add_to_cart", user);
      addToCartDataLayer(
        res,
        res?.data?.lines?.filter(line => line.variant.id === variantId)[0]
          ?.variant?.product,
        variantId,
        res?.data?.lines?.filter(line => line.variant.id === variantId)[0],
        null,
        user,
        productListId,
        cta_type,
        "",
        index,
        cta_position
      );
      trackItemsJourney(
        res?.data?.lines,
        variantId,
        parentProducts,
        ctTitle,
        productListId
      );
    }
    try {
      if (!product && variantId === membershipProductVariantId) {
        const membership = res?.data?.lines?.filter(
          line => line.variant.id === variantId
        )[0];

        addToCartTrack(shopmetadata, {
          product_name: membership?.variant?.product?.name,
          product_id: membership?.variant?.product?.id,
          quantity: 1,
          product_price: membership?.variant?.pricing?.price?.gross?.amount,
          currency: membership?.variant?.pricing?.price?.gross?.currency,
          variant: membership?.variant?.name,
        });
      } else {
        addToCartTrack(shopmetadata, {
          product_name: product?.name,
          product_id: product?.id,
          quantity: 1,
          product_price: currentVariant?.pricing?.price?.gross?.amount,
          currency: currentVariant?.pricing?.price?.gross?.currency,
          variant: currentVariant?.name,
        });
      }
    } catch (err) {
      console.log("fc collect atc error", err);
    }
    onSubmit(null, res?.data);
    if (isBuyNowButton) {
      router?.push("/checkout/address?redirect_from=buy-now");
    }
  };

  const handleAddToCart = async () => {
    if (
      showSmallVariant?.redirect === false &&
      showVp &&
      showStickyVariantPicker2
    ) {
      setShowSmallVaraint({
        ...showSmallVariant,
        open: true,
        redirect: true,
      });
    } else {
      if (CLIENT === clients.PLIXLIFEFC) {
        //Timer for upsell
        preserveTimestamp(product, variantId);
      }
      if (
        CLIENT == clients.WOW_HEALTH_NEW ||
        CLIENT === clients.WOWFC_NEW ||
        CLIENT === clients.LOTUS ||
        CLIENT === clients.BUY_WOW
      ) {
        if (!isBuyNowButton) {
          show(OverlayType.lotusCart, OverlayTheme.right);
        }
      } else {
        if (showCart) {
          // removing isBuyNowButton because there no functionality to purchase directly.
          if (openCart) {
            // The openCart logic is outdated, so to address the time constraints, we have implemented the same logic used in showCart.
            show(OverlayType.plixlifefcCart, OverlayTheme.right);
          } else if (isProductPage && cart_config?.open_cart_pdp === false) {
            // messageUpdate("Added to cart successfully", "success");
          } else {
            show(OverlayType.plixlifefcCart, OverlayTheme.right);
          }
        }
      }

      setLoading(true);
      setShowSmallVaraint &&
        showStickyVariantPicker2 &&
        setShowSmallVaraint({
          ...showSmallVariant,
          open: false,
          redirect: showSmallVariant?.redirectFromLastVariant,
        });
      //
      let abortAddtoCart = false;
      if (limitProductCategories?.length && items && items.length) {
        limitProductCategories.map(content => {
          const sameCategoryItemCount = items.filter(
            item =>
              item?.variant?.product?.category?.name === content.name &&
              content.name === productCategoryName
          ).length;
          if (sameCategoryItemCount >= content.limit) {
            abortAddtoCart = true;
          }
        });
      }
      if (!abortAddtoCart) {
        try {
          const currentVariant =
            product?.variants?.find((v: any) => v?.id === variantId) ||
            product?.defaultVariant;

          const totalPrice = {
            gross: {
              ...currentVariant?.pricing?.price?.gross,
              __typename: "Money",
            },
            net: {
              ...currentVariant?.pricing?.price?.net,
              __typename: "Money",
            },
            __typename: "TaxedMoney",
          };

          const pricing = {
            price: {
              gross: {
                ...currentVariant?.pricing?.price?.gross,
                __typename: "Money",
              },
              net: {
                ...currentVariant?.pricing?.price?.net,
                __typename: "Money",
              },
              __typename: "TaxedMoney",
            },
            priceUndiscounted: {
              gross: {
                ...currentVariant?.pricing?.priceUndiscounted?.gross,
                __typename: "Money",
              },
              net: {
                ...currentVariant?.pricing?.priceUndiscounted?.net,
                __typename: "Money",
              },
              __typename: "TaxedMoney",
            },
            __typename: "VariantPricingInfo",
          };

          const line_item = currentVariant
            ? {
                id: currentVariant?.id, //ideally this should be checkoutLineId
                quantity: 1,
                totalPrice: totalPrice,
                variant: {
                  attributes: currentVariant?.attributes || [],
                  id: currentVariant?.id,
                  images:
                  Array.isArray(currentVariant?.images)&&currentVariant?.images[0]?.sortOrder &&
                    currentVariant?.images[0]?.alt
                      ? currentVariant?.images
                      : [],
                  metadata: currentVariant?.metadata || [],
                  name: currentVariant?.name,
                  pricing: {
                    ...pricing,
                    onSale: currentVariant?.pricing?.onSale || false,
                  },
                  quantityAvailable: currentVariant?.quantityAvailable || 5,
                  sku: currentVariant?.sku || "",
                  product: {
                    category:
                      product?.category?.name &&
                      product?.category?.slug &&
                      product?.category?.id
                        ? product.category
                        : {
                            id: "",
                            name: "",
                            slug: "",
                            __typename: "Category",
                          },
                    id: productId || "",
                    isAvailableForPurchase:
                      product?.isAvailableForPurchase || true,
                    metadata: product?.metadata || [],
                    name: product?.name || "",
                    productType:
                      product?.productType?.id &&
                      product?.productType?.isShippingRequired
                        ? product.productType
                        : {
                            id: "",
                            isShippingRequired: true,
                            __typename: "ProductType",
                          },
                    slug: product?.slug || "",
                    tags: product?.tags || [],
                    thumbnail:
                      product?.thumbnail?.url &&
                      product?.thumbnail?.alt !== undefined
                        ? product?.thumbnail
                        : {
                            url:
                            Array.isArray(currentVariant?.images)&&currentVariant?.images[0]?.url ||
                              product?.thumbnail2x?.url ||
                              "",
                            alt: "",
                            __typename: "Image",
                          },
                    weight: product?.weight || null,
                    __typename: "Product",
                  },
                  __typename: "ProductVariant",
                },
                __typename: "CheckoutLine",
              }
            : null;

          // if (checkout?.id) {
          //   setTimeout(() => {
          //     setLoading(false);
          //   }, 120);
          // }
          // Don't know the use

          // addToCartNext(variantId, 1, undefined, line_item, false)
          // .then(res => {
          //   setLoading(false);
          //   if (
          //     isProductPage &&
          //     cart_config?.open_cart_pdp === false &&
          //     !openCart
          //   ) {
          //     if (res?.errors[0]?.code) {
          //       messageUpdate(res?.errors[0]?.code, "error");
          //       console.log("error", res?.errors[0]?.code);
          //     } else {
          //       messageUpdate("Added to cart successfully", "success");
          //       }
          //     }
          //     if (CLIENT == clients.BODY_FIRST) {
          //       show(OverlayType.plixlifefcCart, OverlayTheme.right);
          //     }
          //     if (
          //       CLIENT === clients.PLIXLIFEFC &&
          //       product &&
          //       product?.category?.slug === "others-also-liked-products"
          //     ) {
          //       const cartPlix = document.getElementById(
          //         "cart-plix-scrollable-area"
          //       );
          //       cartPlix?.scroll({
          //         top: 0,
          //         behavior: "auto",
          //       });
          //     }
          //     if (product && variantId) {
          //       addToCartDataLayer(
          //         res,
          //         product,
          //         variantId,
          //         res?.data?.lines?.filter(
          //           line => line.variant.id === variantId
          //         )[0],
          //         ctTitle,
          //         parentProducts
          //       );
          //       trackItemsJourney(
          //         res?.data?.lines,
          //         variantId,
          //         parentProducts,
          //         ctTitle
          //       );
          //     }
          //     if (!product && variantId === membershipProductVariantId) {
          //       addToCartDataLayer(
          //         res,
          //         res?.data?.lines?.filter(
          //           line => line.variant.id === variantId
          //         )[0]?.variant?.product,
          //         variantId,
          //         res?.data?.lines?.filter(
          //           line => line.variant.id === variantId
          //         )[0],
          //         parentProducts
          //       );
          //     }
          //   try {
          //     if (!product && variantId === membershipProductVariantId) {
          //       const membership = res?.data?.lines?.filter(
          //         line => line.variant.id === variantId
          //       )[0];

          //       addToCartTrack(shopmetadata, {
          //         product_name: membership?.variant?.product?.name,
          //         product_id: membership?.variant?.product?.id,
          //         quantity: 1,
          //         product_price:
          //           membership?.variant?.pricing?.price?.gross?.amount,
          //         currency:
          //           membership?.variant?.pricing?.price?.gross?.currency,
          //         variant: membership?.variant?.name,
          //       });
          //     } else {
          //       addToCartTrack(shopmetadata, {
          //         product_name: product?.name,
          //         product_id: product?.id,
          //         quantity: 1,
          //         product_price:
          //           currentVariant?.pricing?.price?.gross?.amount,
          //         currency: currentVariant?.pricing?.price?.gross?.currency,
          //         variant: currentVariant?.name,
          //       });
          //     }
          //   } catch (err) {
          //     console.log("fc collect atc error", err);
          //   }
          //     onSubmit();
          //     if (isBuyNowButton) {
          //       router?.push("/checkout/address?redirect_from=buy-now");
          //     }
          // })
          // .catch(e => console.log(e, "error"))
          // .finally(() => {
          //   if (items.length == 0) {
          //     localStorage.setItem("firstAtcTime", `${Date.now()}`);
          //   }
          //   setLoading(false);
          // });
          if (
            freebieData?.enable &&
            freebieData?.variant_id &&
            !freebieAlreadyPresent
          ) {
            const linesToAdd: any = [
              {
                variantId: getDBIdFromGraphqlId(variantId, "ProductVariant"),
                quantity: 1,
              },
              {
                variantId: getDBIdFromGraphqlId(
                  freebieData?.variant_id,
                  "ProductVariant"
                ),
                quantity: 1,
              },
            ];
            updateItemWithLinesRest(
              linesToAdd,
              false,
              true,
              isRecalculate,
              checkoutMetaData
            )
              .then(result => {
                const res = result?.data ? result : { data: result };
                setLoading(false);
                handleAfterATC(res, currentVariant, true);
              })
              .catch(e => console.log(e, "error"))
              .finally(() => {
                if (items.length == 0) {
                  localStorage.setItem("firstAtcTime", `${Date.now()}`);
                }
                setLoading(false);
              });
          } else {
            addToCartRest(
              variantId,
              1,
              [],
              line_item,
              false,
              isRecalculate,
              checkoutMetaData
            )
              .then(result => {
                const res = result?.data ? result : { data: result };
                setLoading(false);
                handleAfterATC(res, currentVariant);
              })
              .catch(e => console.log(e, "error"))
              .finally(() => {
                if (items.length == 0) {
                  localStorage.setItem("firstAtcTime", `${Date.now()}`);
                }
                setLoading(false);
              });
          }
        } catch (e) {}
      } else {
        setLoading(false);
        show(OverlayType.message, OverlayTheme.modal, {
          title: `You can only add 1 single per order.`,
          status: "error",
        });
      }
    }
  };
  const handleClick = () => {
    const maxCapping = variantConfig?.variant_capping || null;
    if (setShowBottomDrawer && typeof setShowBottomDrawer === "function") {
      setShowBottomDrawer(false);
    }
    if (sessionStorage.getItem("tvc_build_popup")) {
      sessionStorage.setItem("tvc_build_popup", "false");
    }
    if (disabled) {
      onSubmit(disabled);
      if (productId) {
        const notifyMeContext: InnerOverlayContextInterface = {
          data: productId,
        };
        show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
      }
    } else if ( // maximum product capping
      findVariantQuantity &&
      typeof maxCapping === "number" &&
      maxCapping < Number(findVariantQuantity + 1) // Adding +1 because assuming product adding before ATC
     ) {
      messageUpdate(`Maximum ${maxCapping} units of this product can be added`, "error");
    } else {
      handleAddToCart();
    }
  };

  return (
    <>
      {itemAdded && showGoToCart ? (
        <GoToCartButton
          disabled={disabled}
          page={page}
          size={size}
          withIcons={withIcons}
        />
      ) : (
        <S.ProductCardButton
          className={`atc-button ${buttonClassName}`}
          testingContext="addProductToCartButton"
          id={buttonId}
          onClick={() => {
            if (
              customOnclickHandler &&
              typeof customOnclickHandler == "function"
            ) {
              customOnclickHandler(variantId, product);
            } else {
              if (!loading && !fullyDisabled) handleClick();
            }
          }}
          color="primary"
          disabled={false}
          size={size}
          page={page}
          // startIcon={CartIcon}
          fullWidth
          // endIcon={CartIcon}
        >
          {!showprice ? (
            <S.LeftSide
              className={`${cx({
                disabled,
                loading,
              })} ${buttonClassName}__leftSide `}
            >
              {!disabled && !loading && withIcons && leftIcon ? (
                <>
                  {" "}
                  {typeof leftIcon === "string" ? (
                    <ReactSVG path={`../../../../${leftIcon}`} />
                  ) : (
                    <> {leftIcon} </>
                  )}{" "}
                </>
              ) : (
                <></>
              )}
            </S.LeftSide>
          ) : null}

          <S.MainText className={`${buttonClassName}__mainText`}>
            {disabled && !itemAdded && !loading ? (
              <FormattedMessage id="notify-me" defaultMessage="Notify Me" />
            ) : (
              <>
                {loading ? (
                  <>
                    <CircularProgress style={{ color: "#000" }} size="18px" />
                  </>
                ) : (
                  <>
                    {mainText ? (
                      <>
                        {showprice ? (
                          <div className="price_row">
                            {getThisVariantPrice(product?.defaultVariant)}
                            <span>{mainText}</span>
                          </div>
                        ) : (
                          <span>{mainText}</span>
                        )}
                      </>
                    ) : (
                      <>
                        {route == "product" &&
                        ctTitle !== "plixlife-faster-results" &&
                        ctTitle !== "plixlife-faster-results-cart" ? (
                          <FormattedMessage id="ATC" defaultMessage="ADD TO CART" />
                        ) : (
                          <>
                            {showprice ? (
                              <div>
                                {getThisVariantPrice(product?.defaultVariant)}

                                {/* <span className="original_price">ok</span>
                            <span className="discounted_price"></span> */}
                              </div>
                            ) : null}
                            <FormattedMessage id="add" defaultMessage="ADD" />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}{" "}
              </>
            )}
          </S.MainText>
          <S.RightSide className={`${buttonClassName}__rightSide`}>
            {!disabled && !loading && withIcons && rightIcon ? (
              <>
                {" "}
                {typeof leftIcon === "string" ? (
                  <GTCArrow />
                ) : (
                  <> {rightIcon} </>
                )}{" "}
              </>
            ) : (
              <></>
            )}
          </S.RightSide>
        </S.ProductCardButton>
      )}
    </>
  );
};
NewAddToCartButton.displayName = "NewAddToCartButton";
export default NewAddToCartButton;
