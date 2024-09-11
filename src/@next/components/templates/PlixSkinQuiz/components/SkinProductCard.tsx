import React, { useContext, useState } from "react";
import style from "../scss/index.module.scss";
import { CircularProgress } from '@mui/material';
import { addToCartDataLayer, getMetadataValue, parseJson } from "@utils/misc";
import MemoProductsPlus from "@components/atoms/SvgIcons/MemoProductsPlus";
import { CachedImage } from "@components/molecules/CachedImage";
import { getQuizDiscountPercent } from "@components/templates/PlixMainQuiz/components/miniComponents";
import { getDBIdFromGraphqlId } from "@utils/core";
import { useCart, useCartState } from "@saleor/sdk";
import { ShopMetaContext } from "@temp/pages/_app";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { freebiesSort } from "@components/molecules";
import { Base64 } from "js-base64";
import makeClevertap from "Themes/lib/makeClevertap";

const ProductCard = ({
  product,
  productVariant,
  listPrice,
}: {
  product: any;
  productVariant?: any;
  listPrice?: any;
}) => {
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

const SkinProductCard = ({
  productDetails,
  productIds
}: {
  productDetails: {
    products: Array<any>;
    reviewData: any;
  };
  productIds: [];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { items } = useCartState();
  const { updateItemWithLinesRest } = useCart();
  const shopmetadata = useContext(ShopMetaContext);
  const { show } = useContext(OverlayContext);

  const products = productDetails?.products || [];
  let totalundiscountedItemPrice: number = 0;
  let totalListPrice: number = 0;
  let steps: number = 1;
  
  const decodedIds = productIds.map((id:string) => Base64.decode(id));

  products.sort((a: any, b: any) => {
    const idA = Base64.decode(a?.node?.id);
    const idB = Base64.decode(b?.node?.id);
    const indexA = decodedIds.indexOf(idA);
    const indexB = decodedIds.indexOf(idB);
    return indexA - indexB;
  });

  products.sort(freebiesSort);

  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

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
      if (curr?.node?.isAvailable && !isFreebieAlreadyInCart) {
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
        const clevertap = makeClevertap();
        show(OverlayType.plixlifefcCart, OverlayTheme.right);
        linesToAdd?.forEach((item: { variantId: string; quantity: number }) => {
          handleAfterATC(
            res,
            getGraphqlIdFromDBId(item?.variantId, "ProductVariant")
          );
        });
        const url = `/checkout/address?token=${res?.data?.token}`;
        clevertap.profile.push({
          Site: {
            quiz_skin_checkout_url: url,
          },
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

  if (products?.length) {
    return (
      <div
        className={`${style.quizpage_results_products} ${style.quizpage_padding}`}
      >
        <div className={style.quizProduct_container}>
          <div>
            <h3 className={style.quizProduct_container_title}>
              1 Month Skincare Regimen
            </h3>
            <div className={style.quizProduct_container_list}>
              <p className={style.quizProduct_container_list_text}>
                what do you get:
              </p>
              <div className={style.quizProduct_container_list_cards}>
                {Array.isArray(products) ? (
                  products?.map((product, ind) => {
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
                    const price =
                      productVariant?.pricing?.priceUndiscounted?.gross?.amount;

                    totalundiscountedItemPrice += Number(price);
                    totalListPrice += Number(listPrice || 0);
                    steps++;

                    return (
                      <React.Fragment key={product?.node?.name}>
                        <ProductCard
                          product={product}
                          productVariant={productVariant}
                          listPrice={listPrice}
                        />
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
            {/* <div className={style.quizProduct_container_bottom_bundle}>
              <div>Total</div>
              <div>₹{totalListPrice}</div>
            </div> */}
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
                  handleQuizATC(products);
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
        <div className={style.quizProduct_container_sticky}>
          <div className={style.quizProduct_container_sticky_width}>
            <div
              id="atcQuizProduct_v1"
              onClick={() => {
                if (!loading) {
                  handleQuizATC(products);
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
          </div>
        </div>
        <div className={style.quizProduct_container_bottom_text}>
          You can modify the above bundle in your cart
        </div>
      </div>
    );
  }
  return <></>;
};

export default SkinProductCard;
