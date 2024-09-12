import { getdiscount } from "@components/molecules/ProductCardPlixlife/stockHelpers";
import { useCart, useCartState, useCheckoutState } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { addToCartDataLayer, getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoProductsPlus from "@components/atoms/SvgIcons/MemoProductsPlus";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import { useMessageStateUpdate } from "@temp/MessageContext";
import makeClevertap from "Themes/lib/makeClevertap";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { CircularProgress } from "@mui/material";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import ExpireTimer from "@components/molecules/QuizComponents/ExpireTimer";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import {
  DividerWithText,
  QuizModal,
  getQuizDiscountPercent,
} from "./miniComponents";
import style from "../scss/index.module.scss";

function getFirstDigitFromString(inputString: string) {
  const matches = inputString.match(/\d/);
  return matches ? parseInt(matches[0], 10) : null;
}

const findUniCommerceSku = (variant: any) => {
  const metadata = variant?.metadata || [];
  const unicommercerSku =
    metadata &&
    getMetadataValue(metadata, "unicommerce_sku") &&
    parseJson(getMetadataValue(metadata, "unicommerce_sku"));
  return unicommercerSku || variant?.sku;
};

const QuizProductCardV2 = ({
  data,
  variant,
  index,
  collectionProducts,
  isClientTired,
  productLinkedToQuestion,
  productId,
  metadata,
}: {
  data: any;
  variant: any;
  index?: number;
  collectionProducts: any;
  productLinkedToQuestion: any;
  isClientTired: any;
  productId: any;
  metadata: any;
}) => {
  if(!isClientTired)
    collectionProducts = collectionProducts.filter((product: any) => product?.node?.id !== productLinkedToQuestion);
  const route = useRouter();
  const { items } = useCartState();
  const { checkout } = useCheckoutState();
  const { updateItemWithLinesRest } = useCart();
  const [loadingObj, setLoading] = useState({});
  const { show, hide } = useContext(OverlayContext);
  const messageUpdate = useMessageStateUpdate();
  const shopmetadata = useContext(ShopMetaContext);
  const month: string = (route?.query?.month as string) || "1month";
  const monthInNumber: number = Number(month.split("")[0]);

  const cardTitle = variant?.attributes?.find(
    (att: any) => att?.attribute?.slug === "size"
  );

  const boxItem =
    (getMetadataValue(checkout?.metadata, "byobItems") &&
      parseJson(getMetadataValue(checkout?.metadata, "byobItems"))) ||
    [];

  const stickyButtonOptions =
    metadata &&
    getMetadataValue(metadata, "sticky_button_text") &&
    parseJson(getMetadataValue(metadata, "sticky_button_text"));

  const quizBanner =
    metadata &&
    getMetadataValue(metadata, "quizBanner") &&
    parseJson(getMetadataValue(metadata, "quizBanner"));

  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  let productVariantSteps: any = [];
  let totalundiscountedItemPrice: number = 0;
  let totalListPrice: number = 0;

  const discount = getdiscount(null, variant);

  const isItemInCart = items?.find(
    product => variant?.id === product?.variant?.id
  );

  const showStickyATC = monthInNumber === index + 1;
  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  let steps: number = 1;

  const handleClevertapEvent = (product?: any, checkout: any) => {
    const url = `/checkout/address?token=${checkout?.token}`;
    const clevertap = makeClevertap();
    clevertap.profile.push({
      Site: {
        quiz_checkout_url: url,
      },
    });
  };

  const handleAfterATC = (res: any, variant_id: any) => {
    const product = res?.data?.lines?.filter(
      line => line.variant.id === variant_id
    )[0]?.variant?.product;
    const currentVariant = res?.data?.lines?.find(
      line => line.variant.id === variant_id
    )?.variant;
    addToCartDataLayer(
      res,
      product,
      variant_id,
      res?.data?.lines?.filter(line => line.variant.id === variant_id)[0]
    );
    addToCartTrack(shopmetadata, {
      product_name: product?.name,
      product_id: product?.id,
      quantity: 1,
      product_price: currentVariant?.pricing?.price?.gross?.amount,
      currency: currentVariant?.pricing?.price?.gross?.currency,
      variant: currentVariant?.name,
    });
  };

  const handleQuizATC = (collectionProducts: any, variant: any) => {
    setLoading({ ...loadingObj, [`${variant?.id}`]: true });
    const linesToAdd = collectionProducts?.reduce((acc, curr) => {
      const isFreebie = curr?.node?.category?.slug === "freebies-with-product";
      const variantId =
        curr?.node?.defaultVariant?.id || curr?.node?.variants[0]?.id;
      const isFreebieAlreadyInCart =
        (isFreebie &&
          items?.find(product => product?.variant?.id === variantId)) ||
        null;
      if (variantId === variant?.id || (isFreebie && !isFreebieAlreadyInCart)) {
        return [
          ...acc,
          {
            variantId: getDBIdFromGraphqlId(
              variantId,
              "ProductVariant"
            ).toString(),
            quantity:
              items?.find(line => line?.variant?.id === variantId)?.quantity +
                1 || 1,
          },
        ];
      }
      return acc;
    }, []);

    updateItemWithLinesRest(linesToAdd, false, true, isRecalculate, [])
      .then(result => {
        const res = result?.data ? result : { data: result };
        show(OverlayType.modal, OverlayTheme.modal, {
          content: QuizModal(() => {
            show(OverlayType.plixlifefcCart, OverlayTheme.right);
          }, hide),
          className: style.quizProduct_container_modal,
          disableHide: true,
        });
        linesToAdd?.forEach((item: { variantId: string; quantity: number }) => {
          handleAfterATC(
            res,
            getGraphqlIdFromDBId(item?.variantId, "ProductVariant")
          );
        });
      })
      .catch(e => console.log(e, "error"))
      .finally(() => {
        if (items.length == 0) {
          localStorage.setItem("firstAtcTime", `${Date.now()}`);
        }
        setLoading({ ...loadingObj, [`${variant?.id}`]: false });
      });
  };

  const ProductCard = ({
    product,
    productVariant,
    listPrice,
  }: {
    product: any;
    productVariant?: any;
    listPrice: any;
  }) => {
    const getSpecificAttribute = (attributes: any) => {
      const findAttribute = attributes?.find(
        (att: any) => att?.attribute?.slug == "size"
      );
      return (findAttribute && findAttribute?.values[0]?.value) || null;
    };
    const metaData = productVariant?.metadata;
    const productName =
      metadata &&
      getMetadataValue(metaData, "product_name") &&
      parseJson(getMetadataValue(metaData, "product_name"));

    const variantConfig =
      metaData &&
      getMetadataValue(metaData, "variant_config") &&
      parseJson(getMetadataValue(metaData, "variant_config"));

    const Image = productVariant?.images?.length
      ? productVariant?.images[0]?.url
      : product?.node?.images[0]?.url || "";

    const isFreebie = product?.node?.category?.slug === "freebies-with-product";

    if (productVariant) {
      return (
        <>
          <div className={style.product_card_icon}>
            <MemoProductsPlus fill="#FF891C" />
          </div>
          <div className={style.product_card}>
            <div className={style.product_card_box}>
              {Image ? (
                <div className={style.product_card_image}>
                  <CachedImage url={Image} isNextImage nextImageLayout="fill" />
                </div>
              ) : (
                <></>
              )}
              <div className={style.product_card_text}>
                <div>
                  <h3>{productName || product?.node?.name}</h3>
                  <p>{variantConfig?.pack}</p>
                </div>
                <div className={style.product_card_text_price}>
                  <span className={style.product_card_text_price_mrp}>
                    MRP: ₹<span>{listPrice || "0.00"}</span>
                  </span>
                  <span className={style.product_card_text_price_listPrice}>
                    ₹{productVariant?.pricing?.price?.gross?.amount}
                  </span>
                </div>
                {/* <p>
                  {truncateString(
                    getSpecificAttribute(productVariant?.attributes) || "",
                    22
                  )}
                </p> */}
              </div>
            </div>
            <div className={style.product_card_atcContainer}>
              {!isFreebie ? (
                <div
                  onClick={() => {
                    if (loadingObj && !loadingObj[productVariant?.id]) {
                      handleQuizATC(collectionProducts, productVariant);
                    }
                  }}
                  className={style.product_card_atc}
                >
                  {loadingObj && loadingObj[productVariant?.id] ? (
                    <CircularProgress style={{ color: "#000" }} size="12px" />
                  ) : (
                    <>+ ADD</>
                  )}
                </div>
              ) : (
                <div className={style.product_card_free}>FREE</div>
              )}
              {/* <div className={style.product_card_price}>
              <span>₹{productVariant?.pricing?.price?.gross?.amount}</span>
            </div> */}
            </div>
          </div>
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      <section className={style.quizProduct_v2}>
        <div className={style.quizProduct_v2_left}>
          <div key={variant?.id} className={style.quizProduct_container}>
            <div>
              <h3 className={style.quizProduct_container_title}>
                {cardTitle?.values[0]?.name || ""}
              </h3>
              <div className={style.quizProduct_container_list}>
                <p className={style.quizProduct_container_list_text}>
                  what do you get:
                </p>
                <div className={style.quizProduct_container_list_cards}>
                  {Array.isArray(collectionProducts) ? (
                    collectionProducts?.map((product, ind) => {
                      const productVariant =
                      product?.node?.defaultVariant ||
                      product?.node?.variants[0];
                      
                      const productVariantMetaData = productVariant?.metadata;
                      const listPrice =
                        (productVariantMetaData &&
                          getMetadataValue(
                            productVariantMetaData,
                            "listPrice"
                          ) &&
                          parseJson(
                            getMetadataValue(
                              productVariantMetaData,
                              "listPrice"
                            )
                          )) ||
                        productVariant?.pricing?.price?.net?.amount;
                      if (productVariant && product?.node?.id !== productId) {
                        const price =
                          productVariant?.pricing?.priceUndiscounted?.gross
                            ?.amount;

                        productVariantSteps = {
                          boxType: variant?.name,
                          boxItemSKU: variant?.sku || "",
                          items: [
                            ...(productVariantSteps?.items || []),
                            {
                              variant_id: productVariant?.id,
                              stepNumber: steps,
                              sku: findUniCommerceSku(productVariant),
                              price,
                              name: product?.node?.name || productVariant?.name,
                              collectionID:
                                data?.product?.node?.collections[0]?.id,
                            },
                          ],
                        };
                        totalundiscountedItemPrice += Number(price);
                        totalListPrice += Number(listPrice || 0);
                        steps++;
                      }

                      return (
                        <React.Fragment key={product?.node?.name}>
                          {product?.node?.id !== productId ? (
                            <ProductCard
                              product={product}
                              productVariant={productVariant}
                              listPrice={listPrice}
                            />
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className={style.quizProduct_container_bottom}>
              <div className={style.quizProduct_container_bottom_subtotal}>
                <div>MRP</div>
                <div>₹{totalListPrice}</div>
              </div>
              <div className={style.quizProduct_container_bottom_bundle}>
                <div>Discounted Price</div>
                <div>₹{totalundiscountedItemPrice}</div>
              </div>
              <div className={style.quizProduct_container_bottom_bundle}>
                <div>Bundle Discount</div>
                <div>
                  ₹
                  {totalundiscountedItemPrice -
                    parseInt(variant?.pricing?.price?.gross?.amount)}
                </div>
              </div>
              <div className={style.quizProduct_container_bottom_total}>
                <div>
                  You pay only
                  <span>
                    {getQuizDiscountPercent(
                      totalListPrice,
                      variant?.pricing?.price?.gross?.amount
                    )}
                    % off
                  </span>
                </div>
                <span>₹{variant?.pricing?.price?.gross?.amount}</span>
              </div>
              {!isItemInCart ? (
                <div className={style.quizProduct_container_bottom_atc}>
                  <NewAddToCartButton
                    disabled={false}
                    onSubmit={(disabled, checkout) => {
                      handleClevertapEvent(data?.product, checkout);
                    }}
                    itemAdded={false}
                    mainText="ADD BUNDLE TO CART"
                    size={"none"}
                    variantId={variant?.id}
                    buttonClassName="quizProduct_container_bottom"
                    product={data?.product}
                    productCheckoutMetadata={[
                      {
                        key: "byobItems",
                        value: JSON.stringify([
                          ...boxItem,
                          productVariantSteps,
                        ]),
                      },
                    ]}
                  />
                </div>
              ) : (
                <div
                  className={style.quizProduct_container_bottom_atc_add}
                  onClick={() => {
                    messageUpdate("Already added in cart", "success");
                  }}
                >
                  ADD TO CART
                </div>
              )}
              <div className={style.quizProduct_container_bottom_timer}>
                <ExpireTimer />
              </div>
            </div>
          </div>
          <div className={style.quizProduct_container_top}>
            <h4>Individually add products to your cart</h4>
            <DividerWithText />
            <p>
              Buy the pre-curated bundle below at{" "}
              {getQuizDiscountPercent(
                totalListPrice,
                variant?.pricing?.price?.gross?.amount
              )}
              % off and save Rs.
              {totalundiscountedItemPrice -
                parseInt(variant?.pricing?.price?.gross?.amount)}
            </p>
          </div>
        </div>
        <div className={style.quizProduct_container_sticky}>
          <div className={style.quizProduct_container_sticky_width}>
            {!cartItemsQuantity ? (
              <div className={style.quizProduct_container_sticky_container}>
                <NewAddToCartButton
                  disabled={false}
                  onSubmit={(disabled, checkout) => {
                    handleClevertapEvent(data?.product, checkout);
                  }}
                  buttonClassName="quizProduct_container_sticky_button"
                  itemAdded={false}
                  mainText="ADD 1 MONTH PLAN TO CART"
                  size={"none"}
                  variantId={variant?.id}
                  product={data?.product}
                  productCheckoutMetadata={[
                    {
                      key: "byobItems",
                      value: JSON.stringify([...boxItem, productVariantSteps]),
                    },
                  ]}
                />
              </div>
            ) : (
              <div
                className={style.quizProduct_container_sticky_item}
                onClick={() => {
                  show(OverlayType.plixlifefcCart, OverlayTheme.right);
                }}
              >
                <div>{cartItemsQuantity} ITEM ADDED</div>
                <div>
                  VIEW CART{" "}
                  <span className={style.quizProduct_container_chevron}>
                    <RightChevron />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {quizBanner?.imagev2 ? (
        <div className={style.quizProduct_v2}>
          <div className={style.quizProduct_v2_right}>
            <CachedImage
              url={quizBanner?.imagev2}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuizProductCardV2;
