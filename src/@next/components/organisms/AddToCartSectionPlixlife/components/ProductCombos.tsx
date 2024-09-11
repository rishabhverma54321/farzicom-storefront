import React from "react";
import styles from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoProductsPlus from "@components/atoms/SvgIcons/MemoProductsPlus";

const ProductCombos = ({
  data,
  selectedVariant,
}: {
  data: any;
  selectedVariant?: any;
}) => {
  function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }
  const ProductComboLength = data && data?.items?.length;
  const priceRegex = /₹|\,/g;
  const totalUndiscountedPrice =
    data &&
    data?.items?.reduce((total: number, item: any) => {
      total += parseFloat(item?.undiscount_price?.replace(priceRegex, "")) || 0;
      return total;
    }, 0);

  const totalPrice =
    parseFloat(selectedVariant?.pricing?.priceUndiscounted?.gross?.amount) || 0;

  const bundleDiscount = totalUndiscountedPrice - totalPrice;

  return (
    <div className={styles.productCombos}>
      <h3 className={styles.productCombos_title}>{data?.title || ""}</h3>
      <div className={styles.productCombos_product}>
        {Array.isArray(data?.items) && data?.items?.length ? (
          data?.items?.map((item: any, index: number) => (
            <>
              <div className={styles.productCombos_product_cart}>
                <div className={styles.productCombos_product_cart_new}>
                  <div className={styles.productCombos_product_cart_img}>
                    <CachedImage
                      url={item?.img}
                      isNextImage
                      nextImageLayout="fill"
                    />
                  </div>
                  <div className={styles.productCombos_product_cart_details}>
                    <h4 className={styles.productCombos_product_cart_title}>
                      {truncateString(item?.heading, 40)}
                    </h4>
                    <p className={styles.productCombos_product_cart_text}>
                      {item?.text || ""}
                    </p>
                  </div>
                </div>
                <div className={styles.productCombos_product_cart_pricing}>
                  <div
                    className={
                      styles.productCombos_product_cart_pricing_undiscount
                    }
                  >
                    <span>MRP:</span> <span>{item?.undiscount_price}</span>
                  </div>
                  <div
                    className={
                      styles.productCombos_product_cart_pricing_discount
                    }
                  >
                    {item?.discount_price}
                  </div>
                  <div
                    className={styles.productCombos_product_cart_pricing_tax}
                  >
                    {item?.taxes || "Incl. of all taxes"}
                  </div>
                </div>
              </div>
              <div className={styles.productCombos_product_plusIcon}>
                {index !== ProductComboLength - 1 ? (
                  <MemoProductsPlus />
                ) : (
                  <></>
                )}
              </div>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.productCombos_pricing}>
        <div
          className={`${styles.productCombos_pricing_row} ${styles.productCombos_pricing_row1}`}
        >
          <div>Total MRP</div>
          <div>₹{totalUndiscountedPrice}</div>
        </div>
        <div className={styles.productCombos_pricing_row}>
          <div>Bundle Discount</div>
          <div>₹{bundleDiscount}</div>
        </div>
        <div className={styles.productCombos_pricing_row_latest}>
          <div>You pay only</div>
          <div>
            ₹{selectedVariant?.pricing?.priceUndiscounted?.gross?.amount || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCombos;
