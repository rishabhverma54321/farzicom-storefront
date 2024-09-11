import React, { useEffect, useRef } from "react";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import { getMetadataValue, parseJson } from "@utils/misc";
import CardsContainer from "@components/organisms/CardsContainer";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import MemoStopwatch from "@components/atoms/SvgIcons/Stopwatch";
import * as S from "./styles";
import { getThisVariantPrice } from "@components/molecules/ProductCardPlixlife/stockHelpers";
import { CachedImage } from "@components/molecules/CachedImage";
import { useCartState } from "@saleor/sdk";
import { useCanAddToCart } from "@hooks";

export interface IProductDetailPopupProps {
  productdata: any;
  setpopupstate: any;
  showTimer?: any;
  upsellTimer?: any;
  upsell_product?: any;
  upsell_image?: any;
  onUpsellAdd?: any;
  popupFor?: string;
  disableAtc?:boolean;
  buildYourBoxButtonProps?: {
    addtoBoxButtonText: string;
    addtoBoxOnClickHandler: (id: string, product?: any) => void;
    removeFromBoxButtonText: string;
    removeFromBoxClickHandler: (id: string, product?: any, sku?:any) => void;
    steps: { v_id: string; step_no: number }[];
    current_step_no: number;
    canAddtoCart:boolean;
  };
}

export const ProductDetailPopup: React.FC<IProductDetailPopupProps> = ({
  productdata,
  setpopupstate,
  showTimer,
  upsellTimer,
  upsell_product,
  upsell_image,
  onUpsellAdd,
  popupFor = "",
  disableAtc = false,
  buildYourBoxButtonProps = null,
}) => {
  const popupRef = useRef(null);
  const variantId =
    productdata?.defaultVariant && productdata?.defaultVariant?.id;
  const variantStock =
  productdata?.defaultVariant && productdata?.defaultVariant?.quantityAvailable;

  const { items } = useCartState();
  const quantity = 1;
  const disableButton = !useCanAddToCart(
    productdata?.isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );
  let productDetails =
    getMetadataValue(productdata?.metadata, "product_details") &&
    parseJson(getMetadataValue(productdata?.metadata, "product_details")) || 
    getMetadataValue(productdata?.metadata, "perfume_product_details") &&
    parseJson(getMetadataValue(productdata?.metadata, "perfume_product_details"))

  let productAttributes =
    getMetadataValue(productdata?.metadata, "product_card_attributes") &&
    parseJson(
      getMetadataValue(productdata?.metadata, "product_card_attributes")
    );
  // Build your box logic to handle button text and onclick functionalities from props
  let boxProductOnClickHandler: any;
  let disableboxButton: any;
  let boxProductCardButtonText: any;

  if (buildYourBoxButtonProps) {
    const {
      steps,
      removeFromBoxButtonText,
      addtoBoxButtonText,
      removeFromBoxClickHandler,
      addtoBoxOnClickHandler,
      current_step_no,
      canAddtoCart
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
      !canAddtoCart  ? "Notify Me" : 
      Array.isArray(boxProducts) && currentlySelectedVariantId === variantId
        ? removeFromBoxButtonText
        : addtoBoxButtonText;
  }

  const currentVariant =
    productdata?.variants?.find((v: any) => v?.id === variantId) ||
    productdata?.defaultVariant;

  // useEffect(() => {
  //   function handleClickOutside(event: { target: EventTarget }) {
  //     if (popupRef?.current && !popupRef?.current?.contains(event?.target)) {
  //       setpopupstate(false);
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.addEventListener("touchstart", handleClickOutside);
  //   };
  // }, [popupRef]);

  useEffect(() => {
    let rootComponent = document?.querySelector(".root-component-container");
    if (rootComponent) {
      rootComponent.style.touchAction = "none";
      return () => {
        rootComponent.style.touchAction = "unset";
      };
    }
  }, []);

  const whatsGood = productDetails ? productDetails?.whats_good : [];
  return (
    <>
      {productdata && (
        <div className="productDetailPopup" ref={popupRef}>
          <div className="popup_overlay">
            <div className="product_popup_info">
              <div className="inner_product_popup">
                <div
                  className="close_icon"
                  onClick={() => setpopupstate(false)}
                >
                  <MemoPopCloseIcon />
                </div>
                {upsell_product ? (
                  <div className="product_image_wrapper">
                    <h3>
                      {upsell_product?.product?.name
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")}
                    </h3>
                    <div className="image">
                      <img src={upsell_image} />
                    </div>
                  </div>
                ) : (
                  <div className="product_image_wrapper">
                    <h3>{productAttributes?.name || productdata?.name}</h3>
                    {productAttributes?.image ||
                    productdata?.thumbnail2x.url ? (
                      <div className="product_image_component">
                        <CachedImage
                          url={
                            productAttributes?.image ||
                            productdata?.thumbnail2x.url
                          }
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
                {/* Product benfits */}
                <>
                  {whatsGood && Array.isArray(whatsGood) && !!whatsGood.length && (
                    <div className="product__ingredients">
                      <div className="plixContainer">
                        <div className="section--title">
                          <h2>What's Good</h2>
                        </div>
                        <div className="flex ingredientsWrapper">
                          {whatsGood &&
                            whatsGood
                              .slice(0, 4)
                              .map((item, index) => (
                                <CardsContainer
                                  data={item}
                                  containerClass="cards-container"
                                  cardClass="make-perfect-card"
                                  key={index}
                                  disableLazyload={true}
                                />
                              ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
                {!disableAtc ? 
                <>
                {showTimer ? (
                  upsellTimer > 0 && (
                    <div className="addtocart_section">
                      <S.UpsellHeader>
                        <>
                          <div className="limited_time">Limited time deal</div>
                          <S.UpsellTimerTag>
                            <div className="timer">
                              <MemoStopwatch />
                            </div>
                            <span>
                              {Math.floor(upsellTimer / 60)}:{upsellTimer % 60}{" "}
                              Left!
                            </span>
                          </S.UpsellTimerTag>
                        </>
                      </S.UpsellHeader>

                      <NewAddToCartButton
                        onSubmit={() => {
                          onUpsellAdd();
                          setpopupstate(false);
                        }}
                        size="sm"
                        itemAdded={false}
                        disabled={false}
                        fullyDisabled={false}
                        page=""
                        productId={upsell_product?.product?.id}
                        leftIcon={<MemoCartPlusIcon />}
                        withIcons
                        mainText="Add To Cart"
                        variantId={upsell_product?.id}
                        buttonClassName={
                          true
                            ? "atc-button-upsell"
                            : "atc-button-upsell-disabled"
                        }
                        product={{
                          ...upsell_product?.product,
                          defaultVariant: upsell_product,
                        }}
                        rightIcon={<MemoCaretRightIcon />}
                        showprice={true}
                      />
                    </div>
                  )
                ) : (
                  <div className="addtocart_section">
                    {popupFor === "byob" ? (
                      <S.PopupPrice
                        disabled={disableboxButton}
                        popupFor={popupFor}
                        onClick={() => {
                          if (typeof boxProductOnClickHandler === "function") {
                            boxProductOnClickHandler(
                              currentVariant?.id,
                              productdata,
                            );
                            setpopupstate(false);
                          }
                        }}
                      >
                        <div>
                          {getThisVariantPrice(
                            productdata?.defaultVariant || productdata
                          )}
                        </div>
                        <h4>
                          <>
                            {boxProductCardButtonText || "Add To Box"}
                            <MemoCaretRightIcon />
                          </>
                        </h4>
                      </S.PopupPrice>
                    ) : (
                      <NewAddToCartButton
                        onSubmit={() => {
                          setpopupstate(false);
                        }}
                        size="sm"
                        itemAdded={false}
                        disabled={disableButton}
                        fullyDisabled={false}
                        page=""
                        productId={productdata?.id}
                        withIcons
                        mainText="Add To Cart"
                        variantId={productdata?.defaultVariant?.id}
                        buttonClassName={
                          true
                            ? "atc-button-upsell"
                            : "atc-button-upsell-disabled"
                        }
                        product={productdata}
                        showprice={true}
                        rightIcon={<MemoCaretRightIcon />}
                      />
                    )}
                  </div>
                )}
                </> :
                <></>
                }
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};
ProductDetailPopup.displayName = "ProductDetailPopup";
export default ProductDetailPopup;
