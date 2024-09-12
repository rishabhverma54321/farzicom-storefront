import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";

import {
  addToCartDataLayer,
  getCheckoutMetaForVariantAttributeWeight,
  getMetadataValue,
  parseJson,
  removeItemFromLinesJourney,
  trackItemsJourney,
} from "@utils/misc";
import React, { useEffect, useRef, useState, useContext } from "react";

import { Overlay2, OverlayContextInterface2 } from "../..";

import { TypedProductQuery } from "./queries";

import {
  useAuthState,
  useCart,
  useCartState,
  useCheckoutState,
} from "@saleor/sdk";
import { ShopMetaContext } from "@temp/pages/_app.page";
import styles from "./scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import { CircularProgress } from "@mui/material";
import { getDBIdFromGraphqlId } from "@utils/core";

interface ICouponOffersProps {
  overlay: OverlayContextInterface2;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const MonthlyPack: React.FunctionComponent<ICouponOffersProps> = ({
  overlay,
  testingContext,
}) => {
  const { updateItemWithLines, updateItemWithLinesRest } = useCart();
  const { items } = useCartState();
  const { user } = useAuthState();
  const { checkout } = useCheckoutState();

  const {
    id,
    flavours,
    concern,
    variantID,
    sku,
    switchPack,
    headerText,
  } = overlay?.context?.data;

  const item: any = items.filter(c => c?.variant?.id == variantID);
  const [selectedVariant, setselectedVariant] = useState(null);
  const [productdetail, setproductdetail] = useState(null);
  const [loading, setloading] = useState(false);
  let usernameRefs = useRef([]);
  const shopmetadata = useContext(ShopMetaContext);
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  useEffect(() => {
    if (usernameRefs.current[0]?.current) {
      usernameRefs.current[0]?.current?.classList.add("default_option");
      setselectedVariant(parseJson(usernameRefs.current[0]?.current?.value));
    }
  }, [productdetail]);

  const freebieData =
    item?.length &&
    item[0]?.variant?.metadata &&
    getMetadataValue(item[0]?.variant?.metadata, "freebie_includes") &&
    parseJson(getMetadataValue(item[0]?.variant?.metadata, "freebie_includes"));

  const selectedFreebieData =
    selectedVariant &&
    selectedVariant?.metadata &&
    getMetadataValue(selectedVariant?.metadata, "freebie_includes") &&
    parseJson(getMetadataValue(selectedVariant?.metadata, "freebie_includes"));

  const freebieAlreadyPresent =
    (items &&
      items?.length &&
      freebieData?.enable &&
      items?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
    false;

  const selectedFreebieAlreadyPresent =
    (items &&
      items?.length &&
      selectedFreebieData?.enable &&
      items?.some(
        item => item?.variant?.id == selectedFreebieData?.variant_id
      )) ||
    false;

  const removeclass = () => {
    usernameRefs.current.map(elem =>
      elem?.current?.classList.remove("default_option")
    );
  };

  // useEffect(()=>{
  // },[selectedVariant])

  const Listprice = item => {
    const listPrice =
      getMetadataValue(item?.metadata, "listPrice") &&
      parseJson(getMetadataValue(item?.metadata, "listPrice"));
    return listPrice;
  };

  const updateProductcart = async (e, productVariant) => {
    e.preventDefault();
    setloading(true); 
    const checkoutMetaData = productVariant?.enable
      ? [
          getCheckoutMetaForVariantAttributeWeight(
            selectedVariant?.id,
            checkout?.metadata,
            "UPDATE",
            productVariant?.weight_options[0] || "",
            item[0]?.variant?.id
          ),
        ]
      : null;
    if (selectedVariant) {
      let linesToAppend: Array<{ variantId: any; quantity: number }> = [
        {
          variantId: getDBIdFromGraphqlId(
            item[0]?.variant?.id,
            "ProductVariant"
          ),
          quantity: 0,
        },
        {
          variantId: getDBIdFromGraphqlId(
            selectedVariant?.id,
            "ProductVariant"
          ),
          quantity: item[0]?.quantity,
        },
      ];

      if (
        freebieData?.enable &&
        freebieData?.variant_id &&
        freebieAlreadyPresent
      ) {
        linesToAppend?.push({
          variantId: getDBIdFromGraphqlId(freebieData?.variant_id,"ProductVariant"),
          quantity:0
        });
      }

      if(
        selectedFreebieData?.enable &&
        selectedFreebieData?.variant_id &&
        !selectedFreebieAlreadyPresent
      ){
        linesToAppend?.push({
          variantId: getDBIdFromGraphqlId(selectedFreebieData?.variant_id,"ProductVariant"),
          quantity:1
        });
      }
      try {
        const result = await updateItemWithLinesRest(
          linesToAppend,
          false,
          true,
          isRecalculate,
          checkoutMetaData
        );
        addToCartDataLayer(
          result,
          productdetail,
          selectedVariant?.id,
          {
            variant: selectedVariant,
          },
          "variant-picker-cart",
          user
        );
        removeItemFromLinesJourney(item[0]?.variant?.id);
        trackItemsJourney(
          result?.data?.lines,
          selectedVariant?.id,
          productdetail?.id,
          "variant-picker-cart",
          "variant-picker-cart"
        );
        if (result?.data?.token) {
          overlay.hide();
        }
        setloading(false);
      } catch (err) {
        console.log(err);
      }
      setloading(false);
    }
  };
  const variantImage = item => {
    const sortImages =
      item?.images &&
      item?.images.sort((prev, next) =>
        prev.sortOrder > next.sortOrder ? 1 : -1
      );
    return sortImages[0]?.url;
  };

  const switchMonthPack = () => {
    overlay.hide();
    switchPack(false);
  };

  return (
    <Overlay2 context={overlay} testingContext={testingContext}>
      <div className={styles.monthlypack_wrapper}>
        <div className={styles.inner_monthlypack}>
          <div className={styles.monthlypack_header}>
            <p>{headerText || "Switch to Higher Pack"}</p>
            <span onClick={switchMonthPack}>
              <MemoNewCartcloseIcon />
            </span>
          </div>
          <form className={styles.monthlypack_form}>
            <TypedProductQuery
              variables={{
                id: id,
                metaFields: ["product_variants"],
              }}
              displayLoader={true}
              key={id}
              onCompleted={res => setproductdetail(res.product)}
            >
              {({ data, loading, error, refetch }) => {
                const metaData = data?.product?.metadata;
                const newProductVariant =
                  getMetadataValue(metaData, "product_variants") &&
                  parseJson(getMetadataValue(metaData, "product_variants"));
                const productFlavour = flavours;
                const filteredData =
                  data && newProductVariant?.enable
                    ? data?.product?.variants?.filter(v => {
                        const concernAttributes = v?.attributes?.find(
                          item => item?.attribute?.name === "concern"
                        );
                        return concernAttributes?.values[0]?.name?.includes(
                          concern
                        );
                      })
                    : data?.product?.variants?.filter(v => {
                        const flavourAttributes = v?.attributes?.find(
                          item => item?.attribute?.name === "Flavors"
                        );
                        return flavourAttributes?.values[0]?.name?.includes(
                          productFlavour
                        );
                      });
                let itemindex = 0;
                filteredData.find((c, i) =>
                  c.sku === sku ? (itemindex = i) : null
                );
                const oneMonthproductPrice =
                  data?.product?.variants[0]?.pricing?.price?.net?.amount;

                usernameRefs.current = filteredData.map(
                  (ref, index) =>
                    (usernameRefs.current[index] = React.createRef())
                );

                return (
                  <>
                    <div className={styles.monthlypack_options_wrapper}>
                      <div className={styles.monthlypack_options_inner_wrapper}>
                        {filteredData &&
                          Array.isArray(filteredData) &&
                          filteredData
                            ?.slice(itemindex + 1)
                            .map((item, index) => {
                              const sizeAttribute = item?.attributes?.find(
                                item => item?.attribute?.name === "Size"
                              );
                              return (
                                <label
                                  className={styles.monthlypack_options}
                                  htmlFor={`monthlypack_${index}`}
                                  key={`monthlypack_${index}`}
                                >
                                  <div className={styles.monthlypack_details}>
                                    <div className={styles.ratio_button}>
                                      <input
                                        type="radio"
                                        id={`monthlypack_${index}`}
                                        name="type"
                                        value={JSON.stringify(item)}
                                        onChange={() => {
                                          setselectedVariant(item);
                                          removeclass();
                                        }}
                                        ref={usernameRefs.current[index]}
                                      />
                                      <CachedImage
                                        className="wb_sideicon"
                                        url={variantImage(item)}
                                        isNextImage={true}
                                        nextImageLayout="fill"
                                        nextImageObjectFit="contain"
                                      />
                                      {/* <img src={variantImage(item)} /> */}
                                    </div>
                                    <div className={styles.monthlypack_detail}>
                                      <h3>
                                        {sizeAttribute?.values[0]?.name?.split(
                                          "__"
                                        )[1] ?? ""}
                                      </h3>
                                      <span>
                                        {sizeAttribute?.values[0]?.name?.split(
                                          "__"
                                        )[0] ?? ""}{" "}
                                        {`${
                                          sizeAttribute?.values[0]?.name
                                            ?.split("__")[2]
                                            ?.split(" ")[0] ?? ""
                                        }`}{" "}
                                        {sizeAttribute?.values[0]?.name
                                          ?.split("__")[2]
                                          ?.split(" ")[1] ?? ""}
                                      </span>

                                      <p>
                                        Save Rs.{" "}
                                        {(index + 2) * oneMonthproductPrice -
                                          item?.pricing?.price?.net
                                            ?.amount}{" "}
                                        compared to{" "}
                                        {filteredData[0]?.attributes
                                          ?.find(
                                            item =>
                                              item?.attribute?.name === "Size"
                                          )
                                          ?.values[0]?.name?.split("__")[1] ??
                                          ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className={styles.monthlypack_price}>
                                    <div className={styles.discount}>
                                      <span>
                                        {(
                                          100 -
                                          (item?.pricing?.price?.net?.amount /
                                            Listprice(item)) *
                                            100
                                        )?.toFixed(0)}
                                        % off
                                      </span>
                                    </div>
                                    <div className={styles.net_price}>
                                      ₹{Listprice(item)}
                                    </div>
                                    <div className={styles.discounted_price}>
                                      ₹{item?.pricing?.price?.net?.amount}
                                    </div>
                                  </div>
                                </label>
                              );
                            })}
                      </div>
                      <div className={styles.button_wrapper}>
                        <button onClick={switchMonthPack}>Cancel</button>
                        <button
                          onClick={e => updateProductcart(e, newProductVariant)}
                        >
                          {loading ? (
                            <>
                              <CircularProgress
                                style={{ color: "#000" }}
                                size="18px"
                              />
                            </>
                          ) : (
                            <>Save</>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                );
              }}
            </TypedProductQuery>
          </form>
        </div>
      </div>
    </Overlay2>
  );
};

export default MonthlyPack;
