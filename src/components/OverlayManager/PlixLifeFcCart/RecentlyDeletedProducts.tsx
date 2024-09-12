import React, { memo, useContext, useEffect, useState } from "react";
import Carousel from "@temp/components/ProductCarousel";
import {
  addToCartDataLayer,
  getMetadataValue,
  parseJson,
  RECENTLY_DELETED_PRODUCTS,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import { getThisVariantPrice } from "@components/molecules/ProductCardPlixlife/stockHelpers";
import { useCart, useCartState } from "@saleor/sdk";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@temp/pages/_app.page";
import makeClevertap from "@temp/themes/plixlifefc/lib/makeClevertap";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { OverlayTheme, OverlayType } from "@temp/components";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import { CircularProgress } from '@mui/material';

const RecentlyDeletedProducts = () => {
  const { items } = useCartState();
  const { updateItemWithLinesRest } = useCart();
  const shopmetadata = useContext(ShopMetaContext);
  const [loading, setLoading] = useState({ variantId: null, loader: false });
  const [deletedProducts, setDeletedProducts] = useState([]);

  const productslength = deletedProducts?.length;

  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const ratingImageUrlWithImgix = imageURLReplaceWithCDN(
    "https://plixlifefc-media.farziengineer.co/hosted/rating_star-148dc021bba0.svg"
  );

  useEffect(() => {
    if (!loading?.loader) {
      const recentlyDeletedProducts =
        parseJson(localStorage.getItem(RECENTLY_DELETED_PRODUCTS)) || [];
      setDeletedProducts(recentlyDeletedProducts);
    }
  }, [items?.length]);

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

  const handleATC = item => {
    setLoading({
      loader: true,
      variantId: item?.variantId,
    });
    const linesToAdd = [
      {
        variantId: getDBIdFromGraphqlId(
          item?.variantId,
          "ProductVariant"
        ).toString(),
        quantity:
          items?.find(line => line?.variant?.id === item?.variantId)?.quantity +
            1 || 1,
      },
    ];
    if (Array.isArray(item?.freebies) && item?.freebies?.length) {
      // adding free if included
      item?.freebies?.forEach(obj => {
        const isFreebieExists = items?.find(
          line => line?.variant?.id === obj?.variant_id
        );
        if (!isFreebieExists) {
          linesToAdd.push({
            variantId: getDBIdFromGraphqlId(
              obj?.variant_id,
              "ProductVariant"
            ).toString(),
            quantity: 1,
          });
        }
      });
    }

    updateItemWithLinesRest(linesToAdd, false, true, isRecalculate, [])
      .then(result => {
        const res = result?.data ? result : { data: result };
        const clevertap = makeClevertap();
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
        const newDeletedProducts = deletedProducts.filter(
          line => line?.variantId !== item?.variantId
        );
        setDeletedProducts(newDeletedProducts);
        try {
          localStorage.setItem(
            RECENTLY_DELETED_PRODUCTS,
            JSON.stringify(newDeletedProducts)
          );
        } catch (err) {
          console.log("error while saving recently deleted products");
        }
      })
      .catch(e => console.log(e, "error"))
      .finally(() => {
        setLoading({
          loader: false,
          variantId: null,
        });
      });
  };

  if (
    deletedProducts &&
    Array.isArray(deletedProducts) &&
    deletedProducts.length
  ) {
    return (
      <div className="cart-plix__recentlyDeleted">
        <h2
          className={`${
            productslength === 1 ? "cart-plix__recentlyDeleted_heading" : ""
          }`}
        >
          Add back to the cart
        </h2>
        <div
          className={`upsell_product_slider ${
            productslength === 1 ? "cart-plix__recentlyDeleted_slider" : ""
          }`}
        >
          <Carousel
            slidesOnDesktop={productslength === 1 ? 1 : 2}
            slidesOnMobile={productslength === 1 ? 1 : 2}
            slidesOnTab={productslength === 1 ? 1 : 2}
            dots
            infinite
          >
            {deletedProducts?.map((item: any, index: number) => (
              <div key={item?.tag + index} className="cart-plix__recentlyDeleted_box">
                <div className="cart-plix__recentlyDeleted_product">
                  <div className="cart-plix__recentlyDeleted_product_header">
                    {item?.tag ? (
                      <div className="cart-plix__recentlyDeleted_product_header_tag">
                        {item?.tag}
                      </div>
                    ) : (
                      <div />
                    )}
                    {item?.totalDiscount > 0 ? (
                      <div className="discount_percentage">
                        -{item?.totalDiscount}%
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="cart-plix__recentlyDeleted_product_img">
                    <CachedImage
                      url={item?.image}
                      isNextImage
                      imageDimensions={{ width: 200, height: 200 }}
                    />
                  </div>
                  <div className="cart-plix__recentlyDeleted_product_box">
                    <div className="cart-plix__recentlyDeleted_product_title productCard__name">
                      {item?.name}
                    </div>
                    <div className="rating_and_product_type_wrapper">
                      <div className="rating">
                        <img src={ratingImageUrlWithImgix} alt="Rating Star" />
                        {item?.rating || 5}
                      </div>
                      <div className="vertical_bar" />
                    </div>
                  </div>
                  <div>
                    {getThisVariantPrice(null, false, {
                      discounted: item?.discountedPrice,
                      undiscounted: item?.undiscountedPrice,
                    })}
                  </div>
                  <button
                    onClick={() => {
                      if (!loading?.loader) {
                        handleATC(item);
                      }
                    }}
                    className="cart-plix__recentlyDeleted_product_atc"
                  >
                    {loading?.loader &&
                    loading?.variantId === item?.variantId ? (
                      <CircularProgress style={{ color: "#000" }} size="14px" />
                    ) : (
                      <>+ ADD</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
  return <></>;
};

export default memo(RecentlyDeletedProducts);
