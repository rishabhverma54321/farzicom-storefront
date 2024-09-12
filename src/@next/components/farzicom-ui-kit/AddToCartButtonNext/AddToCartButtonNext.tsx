import React, { useCallback, useContext, useState } from "react";
import ButtonNext from "@components/farzicom-ui-kit/ButtonNext";
import { useCart } from "@saleor/sdk";
import {
  OverlayType,
  OverlayTheme,
  OverlayContext,
  InnerOverlayContextInterface,
} from "@temp/components";
import { addToCartDataLayer, getMetadataValue, isAvailableForPurchase, parseJson } from "@utils/misc";
import styles from "./index.module.scss";
import { addToCartTrack } from "farzicom-ui/lib/Track/addToCartTrack";
import { ShopMetaContext } from "@temp/pages/_app.page";

function mmatchPropsAreEqual(prevMatch: any, nextMatch: any) {
  return prevMatch?.text === nextMatch?.text;
}

export interface IAddToCartButtonNextProps {
  text: string;
  variantId: string;
  product: any;
  quantity?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sideCart?: OverlayType;
}

export const AddToCartButtonNext: React.FC<IAddToCartButtonNextProps> = ({
  text,
  variantId,
  product,
  quantity = 1,
  leftIcon,
  rightIcon,
  sideCart,
}) => {
  const { addToCartNext } = useCart();
  const [loading, setLoading] = useState(false);
  const { show } = useContext(OverlayContext);
  const shopmetadata = useContext(ShopMetaContext);
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const handleAddToCart = useCallback(async () => {
    if (sideCart) {
      show(sideCart, OverlayTheme.right);
    }

    setLoading(true);
    const currentVariant =
      product?.variants?.find((v: any) => v?.id === variantId) ||
      product?.defaultVariant;

    const line_item = currentVariant
      ? {
          id: currentVariant?.id, // ideally this should be checkoutLineId
          quantity: 1,
          totalPrice: currentVariant?.pricing?.price,
          variant: {
            attributes: currentVariant?.attributes || [],
            id: currentVariant?.id,
            images:
              currentVariant?.images[0]?.sortOrder &&
              currentVariant?.images[0]?.alt
                ? currentVariant?.images
                : [],
            metadata: currentVariant?.metadata || [],
            name: currentVariant?.name,
            pricing: currentVariant?.pricing,
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
              id: product?.id || "",
              isAvailableForPurchase: product?.isAvailableForPurchase || true,
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
                product?.thumbnail?.url && product?.thumbnail?.alt !== undefined
                  ? product?.thumbnail
                  : {
                      url:
                        currentVariant?.images[0]?.url ||
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

    setTimeout(() => {
      setLoading(false);
    }, 120);

    const res = await addToCartNext(
      variantId,
      quantity,
      undefined,
      line_item,
      false,
      isRecalculate
    );
    addToCartDataLayer(res, product, variantId);
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
    setLoading(false);
  }, []);

  const handleNotifyMe = useCallback(async () => {
    const notifyMeContext: InnerOverlayContextInterface = {
      data: product?.id,
    };
    show(OverlayType.outOfStock, OverlayTheme.modal, notifyMeContext);
  }, []);

  const isAvailable = isAvailableForPurchase(product, variantId);

  if (!isAvailable) {
    return (
      <>
        <ButtonNext
          text="Notify Me"
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          handleClick={handleNotifyMe}
          variant={1}
          customStyles={styles}
        />
      </>
    );
  }

  return (
    <>
      <ButtonNext
        text={text}
        loader={{
          loading,
          circularLoaderProps: {
            size: "16px",
          },
        }}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        handleClick={handleAddToCart}
        variant={1}
        customStyles={styles}
      />
    </>
  );
};
AddToCartButtonNext.displayName = "AddToCartButtonNext";
export default React.memo(AddToCartButtonNext, mmatchPropsAreEqual);
