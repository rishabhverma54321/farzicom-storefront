import { getdiscount } from "@components/molecules/ProductCardPlixlife/stockHelpers";
import { useCart, useCartState, useCheckoutState } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { addToCartDataLayer, getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoProductsPlus from "@components/atoms/SvgIcons/MemoProductsPlus";
import { NewAddToCartButton } from "@components/molecules/NewAddToCartButton";
import { useMessageStateUpdate } from "@temp/MessageContext";
import makeClevertap from "Themes/lib/makeClevertap";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@temp/pages/_app";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import { CircularProgress } from "@mui/material";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import ExpireTimer from "@components/molecules/QuizComponents/ExpireTimer";
import { DividerWithText, getQuizDiscountPercent } from "./miniComponents";
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

const QuizProductCardV1 = ({
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
  isClientTired: any;
  productLinkedToQuestion: any;
  productId: any;
  metadata: any;
}) => {
  if (!isClientTired)
    collectionProducts = collectionProducts.filter(
      (product: any) => product?.node?.id !== productLinkedToQuestion
    );
  const route = useRouter();
  const { items } = useCartState();
  const { checkout } = useCheckoutState();
  const { updateItemWithLinesRest } = useCart();
  const { show } = useContext(OverlayContext);
  const messageUpdate = useMessageStateUpdate();
  const month: string = (route?.query?.month as string) || "1month";
  const monthInNumber: number = Number(month.split("")[0]);
  const shopmetadata = useContext(ShopMetaContext);
  const [loading, setLoading] = useState(false);

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

  const quizStickyButton =
    sessionStorage.getItem("quizv1_sticky_button") &&
    parseJson(sessionStorage.getItem("quizv1_sticky_button"));

  let productVariantSteps: any = [];
  let totalundiscountedItemPrice: number = 0;
  let totalListPrice: number = 0;

  const discount = getdiscount(null, variant);

  const isItemInCart = items?.find(
    product => variant?.id === product?.variant?.id
  );

  const showStickyATC = monthInNumber === index + 1;

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

  const handleQuizATC = (collectionProducts: any) => {
    setLoading(true);
    const linesToAdd = collectionProducts?.reduce((acc, curr) => {
      const isFreebie = curr?.node?.category?.slug === "freebies-with-product";
      const variantId =
        curr?.node?.defaultVariant?.id || curr?.node?.variants[0]?.id;
      const isFreebieAlreadyInCart =
        (isFreebie &&
          items?.find(product => product?.variant?.id === variantId)) ||
        null;
      if (
        curr?.node?.id !== productId &&
        curr?.node?.isAvailable &&
        !isFreebieAlreadyInCart
      ) {
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
        show(OverlayType.plixlifefcCart, OverlayTheme.right);
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
        setLoading(false);
      });
  };

  const ProductCard = ({
    product,
    productVariant,
    listPrice,
  }: {
    product: any;
    productVariant?: any;
    listPrice?: any;
  }) => {
    const getSpecificAttribute = (attributes: any) => {
      const findAttribute = attributes?.find(
        (att: any) => att?.attribute?.slug == "size"
      );
      return (findAttribute && findAttribute?.values[0]?.value) || null;
    };
    const metaData = productVariant?.metadata;
    const productName =
      metaData &&
      getMetadataValue(metaData, "product_name") &&
      parseJson(getMetadataValue(metaData, "product_name"));

    const variantConfig =
      metaData &&
      getMetadataValue(metaData, "variant_config") &&
      parseJson(getMetadataValue(metaData, "variant_config"));

    const Image = productVariant?.images?.length
      ? productVariant?.images[0]?.url
      : product?.node?.images[0]?.url || "";

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
                <h3>{productName || product?.node?.name}</h3>
                <p>{variantConfig?.pack}</p>
              </div>
            </div>
            <div className={style.product_card_price}>
              <span>MRP: ₹{listPrice || "0.00"}</span>
              <span>₹{productVariant?.pricing?.price?.gross?.amount}</span>
            </div>
          </div>
        </>
      );
    }
    return <></>;
  };

  function DividerWithTextHorizontal() {
    return (
      <>
        <section className={style.dividerContainer}>
          <div className={style.bar} />
          <div className={style.text}>OR</div>
          <div className={style.bar_bottom} />
        </section>
      </>
    );
  }

  return (
    <React.Fragment key={variant?.id}>
      <section className={style.quizProduct_v1}>
        <div className={style.quizProduct_container}>
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
                    const productMetaData = productVariant?.metadata;

                    const listPrice =
                      (productMetaData &&
                        getMetadataValue(productMetaData, "listPrice") &&
                        parseJson(
                          getMetadataValue(productMetaData, "listPrice")
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
              <div>Total</div>
              <div>₹{totalListPrice}</div>
            </div>
            <div className={style.quizProduct_container_bottom_bundle}>
              <div>Discount</div>
              <div>₹{totalListPrice - totalundiscountedItemPrice}</div>
            </div>
            <div className={style.quizProduct_container_bottom_total}>
              <div>
                You pay only{" "}
                <span>
                  {getQuizDiscountPercent(
                    totalListPrice,
                    totalundiscountedItemPrice
                  )}{" "}
                  % off
                </span>
              </div>
              <span>₹{totalundiscountedItemPrice}</span>
            </div>
            <div
              id="atcQuizProduct_v1"
              onClick={() => {
                if (!loading) {
                  handleQuizATC(collectionProducts);
                }
              }}
              className={style.quizProduct_container_bottom_atc_add}
            >
              {loading ? (
                <CircularProgress style={{ color: "#000" }} size="18px" />
              ) : (
                <>ADD TO CART</>
              )}
            </div>
          </div>
        </div>
        <div className={style.quizProduct_container_bottom_text}>
          You can modify the above bundle in your cart
        </div>
      </section>
      <div className={style.quizProduct_v1_bottom_line_mob}>
        <DividerWithText />
      </div>
      <section className={style.quizProduct_v1_bottom}>
        {/* <div className={style.quizProduct_v1_bottom_banner}>
          {quizBanner && quizBanner?.image ? (
            <div className={style.quizProduct_v1_bottom_img}>
              <CachedImage
                url={quizBanner?.image}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
        </div> */}
        <div className={style.quizProduct_v1_bottom_box}>
          <div className={style.quizProduct_v1_bottom_line}>
            <DividerWithTextHorizontal />
          </div>
          <div className={style.quizProduct_v1_bottom_container}>
            <div className={style.quizProduct_v1_bottom_title}>
              Buy the pre-curated bundle below at{" "}
              {getQuizDiscountPercent(
                totalListPrice,
                variant?.pricing?.price?.gross?.amount
              )}
              % off and save Rs.{" "}
              {totalundiscountedItemPrice -
                parseInt(variant?.pricing?.price?.gross?.amount)}
            </div>
            <div className={style.quizProduct_container}>
              <h3 className={style.quizProduct_container_title}>
                {cardTitle?.values[0]?.name || ""}
              </h3>
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
                    You pay only{" "}
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
                      buttonId="atcQuizBundle_v1"
                      mainText="ADD BUNDLE TO CART"
                      size={"none"}
                      variantId={variant?.id}
                      product={data?.product}
                      buttonClassName="quizProduct_container_bottom"
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
            <div className={style.quizProduct_v1_bottom_title_desk}>
              Buy the pre-curated bundle below at{" "}
              {getQuizDiscountPercent(
                totalListPrice,
                variant?.pricing?.price?.gross?.amount
              )}
              % off and save Rs.{" "}
              {totalundiscountedItemPrice -
                parseInt(variant?.pricing?.price?.gross?.amount)}
            </div>
          </div>
        </div>
      </section>
      <div className={style.quizProduct_container_sticky}>
        <div className={style.quizProduct_container_sticky_width}>
          {quizStickyButton && quizStickyButton?.isBundle ? (
            <div className={style.quizProduct_container_sticky_container}>
              {!isItemInCart ? (
                <NewAddToCartButton
                  disabled={false}
                  onSubmit={(disabled, checkout) => {
                    handleClevertapEvent(data?.product, checkout);
                  }}
                  buttonId="atcQuizBundle_sticky_v1"
                  buttonClassName="quizProduct_container_sticky_button"
                  itemAdded={false}
                  mainText="ADD 1 MONTH PLAN TO CART"
                  size={"none"}
                  variantId={variant?.id}
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
              ) : (
                <div
                  className={style.quizProduct_container_sticky_container_atc}
                  onClick={() => {
                    messageUpdate("Already added in cart", "success");
                  }}
                >
                  <span>ADD TO CART</span>
                </div>
              )}
            </div>
          ) : (
            <div
              id="atcQuizProduct_v1"
              onClick={() => {
                if (!loading) {
                  handleQuizATC(collectionProducts);
                }
              }}
              className={style.quizProduct_container_sticky_container}
            >
              <div className={style.quizProduct_container_sticky_container_atc}>
              {loading ? (
                <CircularProgress style={{ color: "#000" }} size="18px" />
              ) : (
                <>ADD 1 MONTH PLAN TO CART</>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizProductCardV1;
