import {
  addToCartDataLayer,
  getMetadataValue,
  parseJson,
  preserveTimestamp,
} from "@utils/misc";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useWindowWidth } from "@hooks/useWindowWidth";
// import MemoCloseIcon from "@components/atoms/SvgIcons/CloseIcon";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import { CachedImage } from "../CachedImage";
import { useCart, useCartState } from "@saleor/sdk";
import { useMessageStateUpdate } from "@temp/MessageContext";
// import { getThisVariantPrice } from "./stockHelpers";
import { CircularProgress } from "@mui/material";
import * as S from "./style";
import { getThisVariantPrice } from "../ProductCardPlixlife/stockHelpers";
import { InnerOverlayContextInterface, OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import { ShopMetaContext } from "@temp/pages/_app";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";

enum MODAL_SIDES {
  RIGHT = "right",
  LEFT = "left",
}

interface IProductInfoPopUpProps {
  modalProps: {
    modalOpen: boolean;
    modalStartPosition: number | null;
  };
  setModalProps: (modalProps: {
    modalOpen: boolean;
    modalStartPosition: number | null;
  }) => void;
  product: any;
  variantId: any;
  productImage?: string | null;
  atcProps: {
    onClick: (id: string, product?: any) => void;
    atcText: string;
    disableboxButton: boolean;
  };
  disableButton: boolean;
  popupFor?: "upsell" | "build-your-box";
}

export const ProductInfoPopUp: React.FC<IProductInfoPopUpProps> = ({
  modalProps,
  setModalProps,
  product,
  variantId,
  disableButton,
  productImage,
  atcProps,
  popupFor = "build-your-box",
}) => {
  const modalRef = useRef(null);
  const [screenWidth] = useWindowWidth();
  const [modalOpenSide, setModalOpenSide] = useState(
    modalProps?.modalStartPosition > screenWidth / 2
      ? MODAL_SIDES.LEFT
      : MODAL_SIDES?.RIGHT
  );
  const { name, metadata, defaultVariant } = product;
  const { addToCartRest } = useCart();
  const messageUpdate = useMessageStateUpdate();
  const { items } = useCartState();
  const shopmetadata = useContext(ShopMetaContext);
  const [loading, setLoading] = useState(false);
  const selectedVariant =
  product?.variants?.find((v: any) => v?.id === variantId) ||
  product?.defaultVariant;
  const membershipProductVariantId =
    getMetadataValue(shopmetadata, "membership_v3") &&
    parseJson(getMetadataValue(shopmetadata, "membership_v3"))?.variantID;
  
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const productDetails =
    metadata &&
    getMetadataValue(metadata, "product_details") &&
    parseJson(getMetadataValue(metadata, "product_details")) ||
    getMetadataValue(metadata, "perfume_product_details") &&
    parseJson(getMetadataValue(metadata, "perfume_product_details"));

  const productAttributes =
    getMetadataValue(metadata, "product_card_attributes") &&
    parseJson(getMetadataValue(metadata, "product_card_attributes"));

  const variantConfig =
    getMetadataValue(selectedVariant?.metadata, "variant_config") &&
    parseJson(getMetadataValue(selectedVariant?.metadata, "variant_config"));

  const findVariantQuantity: any =
    (items && items?.find(item => item?.variant?.id === variantId))?.quantity || 0;

  useEffect(() => {
    if (modalProps?.modalStartPosition > screenWidth / 2) {
      setModalOpenSide(MODAL_SIDES.LEFT);
    } else {
      setModalOpenSide(MODAL_SIDES.RIGHT);
    }
  }, [modalProps, screenWidth]);

  useEffect(() => {
    /**
     * Close Popup modal if clicked outside of it.
     */
    function handleClickOutside(event: { target: EventTarget }) {
      if (modalRef?.current && !modalRef?.current?.contains(event?.target)) {
        setModalProps({ ...modalProps, modalOpen: false });
      }
    }
    if (modalProps) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      };
    }
  }, [modalRef, modalProps]);

  const { show } = useContext(OverlayContext);

  const handleAddToCart = async (variantId, product) => {
    if (disableButton && product?.id) {
      const notifyMeContext: InnerOverlayContextInterface = {
        data: product?.id,
      };
      show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
    } else {
      //Timer for upsell
      preserveTimestamp(product, variantId);
      // show(OverlayType.plixlifefcCart, OverlayTheme.right);
      setLoading(true);
      //
      try {
        const currentVariant =
          product?.variants?.find((v: any) => v?.id === variantId) ||
          product?.defaultVariant;
  
        addToCartRest(variantId, 1, undefined, null, false, isRecalculate)
          .then(res => {
            setLoading(false);
            if (res?.errors[0]?.code) {
              messageUpdate(res?.errors[0]?.code, "error");
              console.log("error", res?.errors[0]?.code);
            } else {
              messageUpdate("Added to cart successfully", "success");
            }
            setModalProps({ ...modalProps, modalOpen: false });
            if (product && variantId) {
              addToCartDataLayer(
                res,
                product,
                variantId,
                res?.data?.lines?.filter(line => line.variant.id === variantId)[0]
              );
            }
            if (!product && variantId === membershipProductVariantId) {
              addToCartDataLayer(
                res,
                res?.data?.lines?.filter(line => line.variant.id === variantId)[0]
                  ?.variant?.product,
                variantId,
                res?.data?.lines?.filter(line => line.variant.id === variantId)[0]
              );
            }
            try {
              addToCartTrack(shopmetadata, {
                product_name: product?.name,
                product_id: product?.id,
                quantity: 1,
                product_price: currentVariant?.pricing?.price?.gross?.amount,
                currency: currentVariant?.pricing?.price?.gross?.currency,
                variant: currentVariant?.name,
              });
            } catch (err) {
              console.log("fc collect atc error", err);
            }
          })
          .catch(e => console.log(e, "error"))
          .finally(() => {
            if (items.length == 0) {
              localStorage.setItem("firstAtcTime", `${Date.now()}`);
            }
            setLoading(false);
            setModalProps({ ...modalProps, modalOpen: false });
          });
      } catch (e) {}
    }
  };

  return (
    <>
      {(Array.isArray(productDetails?.whats_good) &&
        productDetails?.whats_good?.length) ||
      (Array.isArray(productDetails?.ingredients) &&
        productDetails?.ingredients?.length) ? (
        <S.ProductInfoPopUpWrapper
          side={modalOpenSide}
          ref={modalRef}
          popupFor={popupFor}
        >
          <S.PopupCloseIcon
            onClick={() => setModalProps({ ...modalProps, modalOpen: false })}
          >
            <MemoPopCloseIcon width={30} height={30} />
          </S.PopupCloseIcon>
          <S.ProductPopupRow>
            <S.PopupImageHeader>
              <S.ProductName>
                {productAttributes?.name || product?.name}
              </S.ProductName>
              {productAttributes?.image || productImage ? (
                <S.ProductImageWrapper>
                  <CachedImage
                    url={productAttributes?.image || productImage}
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </S.ProductImageWrapper>
              ) : (
                <></>
              )}
            </S.PopupImageHeader>

            <S.ProductInfoWrapper
              // maxWidth="60%"
              mobileBackground="#FFE9E9"
              background={popupFor === "upsell" ? "#FFE9E9" : "#d1ffd9"}
            >
              {/* <h3>{name}</h3> */}
              {productDetails?.whats_good &&
              Array.isArray(productDetails?.whats_good) &&
              productDetails?.whats_good.length ? (
                <>
                  <S.PopUpSectionHeader>What’s Good</S.PopUpSectionHeader>
                  <S.ProductInfoRow>
                    <>
                      {productDetails?.whats_good?.slice(0, 4)?.map(item => {
                        const imageUrl =
                          Array.isArray(item) &&
                          item.length === 2 &&
                          item[0]?.image;
                        const title =
                          Array.isArray(item) &&
                          item.length === 2 &&
                          item[1]?.title;
                        const description =
                          Array.isArray(item) &&
                          item.length === 2 &&
                          item[1]?.description;
                        return (
                          <div>
                            {imageUrl && (
                              <S.PopupImageWrapper>
                                <CachedImage
                                  url={imageUrl}
                                  isNextImage
                                  nextImageLayout="fill"
                                  nextImageObjectFit="contain"
                                />
                              </S.PopupImageWrapper>
                            )}
                            <S.InfoTitle>{title}</S.InfoTitle>
                            {/* <S.PopupDescription>
                              {description}
                            </S.PopupDescription> */}
                          </div>
                        );
                      })}
                    </>
                  </S.ProductInfoRow>
                </>
              ) : (
                <></>
              )}
            </S.ProductInfoWrapper>
          </S.ProductPopupRow>
          {/* {Array.isArray(productDetails?.ingredients) &&
          productDetails?.ingredients?.length ? (
            <S.ProductPopupRow>
              <S.ProductInfoWrapper
                background={popupFor === "upsell" ? "white" : "#FFE9E9"}
                mobileBackground="white"
              >
                <S.PopUpSectionHeader>Main Ingredients</S.PopUpSectionHeader>
                <S.ProductInfoRow>
                  <>
                    {productDetails?.ingredients?.slice(0, 4)?.map(item => {
                      const imageUrl =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[0]?.image;
                      const title =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[1]?.title;
                      const description =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[1]?.description;
                      return (
                        <div>
                          {imageUrl && (
                            <S.PopupImageWrapper>
                              <CachedImage
                                url={imageUrl}
                                isNextImage
                                nextImageLayout="fill"
                                nextImageObjectFit="contain"
                              />
                            </S.PopupImageWrapper>
                          )}
                          <S.InfoTitle>{title}</S.InfoTitle>
                          <S.PopupDescription>{description}</S.PopupDescription>
                        </div>
                      );
                    })}
                  </>
                </S.ProductInfoRow>
              </S.ProductInfoWrapper>
            </S.ProductPopupRow>
          ) : (
            <></>
          )} */}

          {popupFor === "upsell" &&
          Array.isArray(productDetails?.uses) &&
          productDetails?.uses?.length ? (
            <S.ProductPopupRow>
              <S.ProductInfoWrapper
                background={popupFor === "upsell" ? "white" : "#FFE9E9"}
                mobileBackground="white"
              >
                <S.PopUpSectionHeader>How To Use</S.PopUpSectionHeader>
                <S.ProductUsesRow>
                  <>
                    {productDetails?.uses?.slice(0, 4)?.map(item => {
                      const imageUrl =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[0]?.image;
                      const title =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[1]?.title;
                      const description =
                        Array.isArray(item) &&
                        item.length === 2 &&
                        item[1]?.description;
                      return (
                        <div>
                          {imageUrl && (
                            <S.PopupImageWrapper>
                              <CachedImage
                                url={imageUrl}
                                isNextImage
                                nextImageLayout="fill"
                                nextImageObjectFit="contain"
                              />
                            </S.PopupImageWrapper>
                          )}
                          <div>
                            <S.InfoTitle>{title}</S.InfoTitle>
                            <S.PopupDescription>
                              {description}
                            </S.PopupDescription>
                          </div>
                        </div>
                      );
                    })}
                  </>
                </S.ProductUsesRow>
              </S.ProductInfoWrapper>
            </S.ProductPopupRow>
          ) : (
            <></>
          )}

          {atcProps && (
            <S.PopupPriceContainer
              disabled={atcProps?.disableboxButton}
              popupFor={popupFor}
              onClick={() => {
                const maxCapping = variantConfig?.variant_capping || null;
                if (typeof atcProps?.onClick === "function") {
                  atcProps.onClick(defaultVariant?.id, product);
                  setModalProps({ ...modalProps, modalOpen: false });
                } else if ( // maximum product capping
                  findVariantQuantity &&
                  typeof maxCapping === "number" &&
                  maxCapping < Number(findVariantQuantity + 1) // Adding +1 because assuming product adding before ATC 
                ) {
                  messageUpdate(
                    `Maximum ${maxCapping} units of this product can be added`,
                    "error"
                  );
                } else {
                    !loading && handleAddToCart(variantId, product);
                }
              }}
            >
              <div>{getThisVariantPrice(defaultVariant || product)}</div>
              <h4>
                {loading ? (
                  <>
                    <CircularProgress style={{ color: "#000" }} size="18px" />
                  </>
                ) : (
                  <>{disableButton ? "NOTIFY ME" : atcProps?.atcText}</>
                )}
              </h4>
            </S.PopupPriceContainer>
          )}
        </S.ProductInfoPopUpWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

ProductInfoPopUp.displayName = "ProductInfoPopUp";
export default ProductInfoPopUp;
