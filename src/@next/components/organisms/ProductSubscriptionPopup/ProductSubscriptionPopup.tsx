import React, { useContext, useEffect, useState } from "react";
import * as styles from "./index.module.scss";
import * as S from "./styles";
// import CloseCrossIcon from "@components/atoms/SvgIcons/CloseCrossIcon";
import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";
import Image from "next/image";
// import { getThisVariantPrice } from "../AddToCartSectionPlixlife";
// import { getMetadataValue, parseJson } from "@utils/misc";
import { getThisVariantPrice } from "@components/molecules/ProductCardPlixlife/stockHelpers";
import { StyledAddToCartButton } from "@temp/themes/plixlifefc/views/Product/style";
import {
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import {
  OverlayContext,
  InnerOverlayContextInterface,
  OverlayType,
  OverlayTheme,
} from "@temp/components";
import { client } from "@temp/client";
import { addTags } from "./queries";
import MemoLearnMoreCloseIcon from "@components/atoms/SvgIcons/LearnMoreCloseIcon";
import {
  addToCartDataLayer,
  getCheckoutMetaForSubscription,
  getMetadataValue,
  getVariantDiscount,
  parseJson,
  trackItemsJourney,
} from "@utils/misc";
import MemoInfoIcon from "@components/atoms/SvgIcons/InfoIcon";
import MemoSideArrowTriangle from "@components/atoms/SvgIcons/SideArrowTriangle";
import { Markup } from "interweave";
import MemoizedImage from "./MemoizedImage";
import { ShopMetaContext } from "@temp/pages/_app";
import { getDBIdFromGraphqlId } from "@utils/core";

export interface IProductSubscriptionPopupProps {
  product: any;
  selectedVariant: any;
  showOneTimePurchase?: boolean;
  setOpen: any;
  disableButton: boolean;
  itemAdded: boolean;
  loading?: boolean;
  subscriptionData: any;
  subscriptionPopup: any;
  addToCartFunction: any;
}

export const ProductSubscriptionPopup: React.FC<IProductSubscriptionPopupProps> = ({
  product,
  selectedVariant,
  setSubscriptionPopup,
  disableButton,
  itemAdded,
  loading,
  subscriptionData,
  showOneTimePurchase,
  subscriptionPopup,
  addToCartFunction,
}) => {
  const { addToCartNext, addToCartRest, updateItemWithLinesRest } = useCart();
  const { checkout } = useCheckoutState();
  const { updateCheckoutMeta } = useCheckout();
  const { user } = useAuthState();
  const { items } = useCartState();
  const variantImage = Array.isArray(selectedVariant?.images)
    ? selectedVariant?.images[0]?.url
    : "";
  const { show } = useContext(OverlayContext);
  const shopmetadata = useContext(ShopMetaContext);
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const [selectedOption, setSelectedOption] = useState(
    showOneTimePurchase ? "oneTimePurchase" : "subscription"
  );

  const freebieData =
    getMetadataValue(selectedVariant?.metadata, "freebie_includes") &&
    parseJson(getMetadataValue(selectedVariant?.metadata, "freebie_includes"));

  const freebieAlreadyPresent =
    (items &&
      items?.length &&
      freebieData?.enable &&
      items?.some(item => item?.variant?.id == freebieData?.variant_id)) ||
    false;

  const [learnMorePopup, setLearnMorePopup] = useState(false);
  const onOptionChange = e => {
    // console.log("eeeeeeeeeee", e.tagrne);
    const val = e.target.value;
    setSelectedOption(val);
  };

  const handleAfterAtc = (res: any, isIncludeFreebie: boolean = false) => {
    const variantId = selectedVariant?.id;
    const ctTitle = typeof window !== "undefined" ? window?.navigated_from : "";
    const productListId =
      typeof window !== "undefined" ? window?.navigated_from_id : "";
    const index =
      typeof window !== "undefined" &&
      typeof window.itemIndexFromList === "number"
        ? window.itemIndexFromList
        : "NA";

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
        "",
        "",
        index
      );
      trackItemsJourney(
        res?.data?.lines,
        freebieData?.variant_id,
        "",
        ctTitle,
        productListId
      );
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
        "",
        "",
        index,
        ""
      );
      trackItemsJourney(
        res?.data?.lines,
        variantId,
        "",
        ctTitle,
        productListId
      );
    }
  };

  const onClose = async () => {
    setSubscriptionPopup({
      isOpen: false,
      showVariantOption: false,
    });
    show(OverlayType.plixlifefcCart, OverlayTheme.right);
    if (subscriptionPopup?.isOpen && subscriptionPopup?.showVariantOption) {
      if (
        freebieData?.enable &&
        freebieData?.variant_id &&
        !freebieAlreadyPresent
      ) {
        const linesToAdd: any = [
          {
            variantId: getDBIdFromGraphqlId(
              selectedVariant?.id,
              "ProductVariant"
            ),
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
        updateItemWithLinesRest(linesToAdd, false, true, false)
          .then(result => {
            const res = result?.data ? result : { data: result };
            handleAfterAtc(res, true);
          })
          .catch(e => console.log(e, "error"));
      } else {
        const res = await addToCartRest(
          selectedVariant?.id,
          1,
          undefined,
          null,
          false,
          isRecalculate
        ).then(result => {
          const res = result?.data ? result : { data: result };
          handleAfterAtc(res);
        });
      }
    } else if (subscriptionPopup?.isOpen) {
      const subscriptionSkus = JSON.stringify(
        getCheckoutMetaForSubscription(
          variantWithCurrentFlavourAndSubscriptionSize,
          checkout?.metadata,
          "ADD"
        )
      );
      const checkoutMetaInput = [
        {
          key: "subscription_skus",
          value: subscriptionSkus,
        },
      ];

      if (
        freebieData?.enable &&
        freebieData?.variant_id &&
        !freebieAlreadyPresent
      ) {
        const linesToAdd: any = [
          {
            variantId: getDBIdFromGraphqlId(
              selectedVariant?.id,
              "ProductVariant"
            ),
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
          checkoutMetaInput
        )
          .then(result => {
            const res = result?.data ? result : { data: result };
            handleAfterAtc(res, true);
          })
          .catch(e => console.log(e, "error"));
      } else {
        const addToCartNextRes = await addToCartRest(
          variantWithCurrentFlavourAndSubscriptionSize?.id,
          1,
          undefined,
          null,
          false,
          isRecalculate,
          checkoutMetaInput
        ).then(result => {
          const res = result?.data ? result : { data: result };
          handleAfterAtc(res);
          return result;
        });
        if (addToCartNextRes?.data?.id && !addToCartNextRes?.errors?.length) {
          const res = await client.query({
            query: addTags,
            variables: {
              id: addToCartNextRes?.data?.id,
              input: ["subscription_product"],
            },
            fetchPolicy: "no-cache",
          });
        }
      }
    }
  };

  const learnMoreData = subscriptionData?.learnMoreData;

  const variant_size = subscriptionData?.subscriptionPlanDetails?.size_variant;

  const falvorsAtt =
    selectedVariant &&
    selectedVariant.attributes.find(att => att.attribute.slug === "flavors");
  const currFlavor =
    falvorsAtt && falvorsAtt.values.length && falvorsAtt?.values[0]?.value;

  const selectedVariantSizeAttribute = selectedVariant.attributes.find(
    att => att.attribute.slug === "size"
  );
  const selectedVariantSizeAttributeValue =
    selectedVariantSizeAttribute &&
    selectedVariantSizeAttribute.values.length &&
    selectedVariantSizeAttribute?.values[0]?.value;

  const variantWithCurrentFlavourAndSubscriptionSize = product?.variants?.find(
    variant => {
      const flavourAttribute = variant.attributes.find(
        att => att.attribute.slug === "flavors"
      );
      const flavourValue =
        flavourAttribute &&
        flavourAttribute.values.length &&
        flavourAttribute?.values[0]?.value;

      const sizeAttribute = variant.attributes.find(
        att => att.attribute.slug === "size"
      );
      const sizeAttributeValue =
        sizeAttribute &&
        sizeAttribute.values.length &&
        sizeAttribute?.values[0]?.value;

      return flavourValue === currFlavor && sizeAttributeValue === variant_size;
    }
  );

  const InfoCard = ({
    infocardName,
    isSubscriptionCard,
    subscriptionSectionData,
  }) => {
    const subscriptionPlanDetails = subscriptionData?.subscriptionPlanDetails;

    const subscriptionPricing = {
      discounted: subscriptionPlanDetails?.discountedPrice,
      undiscounted: subscriptionPlanDetails?.undiscountedPrice,
    };

    if (isSubscriptionCard && subscriptionPlanDetails) {
      return (
        <>
          <div className={styles.subscriptionCardWrapper}>
            <div className={styles.subscriptionInfoCardWrapper}>
              <div className={styles.col1}>
                <div className={styles.radioInput}>
                  <input
                    type="radio"
                    id={infocardName}
                    value={infocardName}
                    name="subscriptionoptions"
                    checked={selectedOption === infocardName}
                    onChange={e => onOptionChange(e)}
                  />
                </div>
                <MemoizedImage
                  src={variantImage}
                  width={75}
                  height={75}
                  key="variant-image"
                />
                <div className={styles.cardTexts}>
                  <h5>{subscriptionPlanDetails?.text}</h5>
                  <span>{variant_size?.split("__")[0]} X 15</span>
                  <span
                    onClick={() => {
                      setLearnMorePopup(true);
                    }}
                  >
                    <MemoInfoIcon /> Learn
                  </span>
                </div>
              </div>
              <div className={styles.col2}>
                <div className={styles.pricing}>
                  {getThisVariantPrice(null, null, subscriptionPricing)}
                  <div className={styles.discountTag2}>
                    {getVariantDiscount(null, subscriptionPricing)}% OFF
                  </div>
                </div>
                <span className={styles.pricingSubtext}>(For 1st Month)</span>
              </div>
            </div>
            {subscriptionSectionData && (
              <>
                <div className={styles.sectionWrapper}>
                  <h4>{subscriptionSectionData?.sectionData?.header}</h4>
                  <div className={styles.benefitCardsWrapper}>
                    {subscriptionSectionData?.sectionData?.benefits?.map(
                      item => {
                        return (
                          <>
                            <div className={styles.benefitCard}>
                              <Image width={75} height={75} src={item.image} />
                              <span>{item.text}</span>
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                  <div className={styles.orderRateDetails}>
                    {subscriptionSectionData?.sectionData?.orderRates?.map(
                      item => {
                        let savingAmount = 0;
                        if (
                          typeof item?.undiscountedPrice === "number" &&
                          typeof item?.discountedPrice === "number"
                        ) {
                          savingAmount =
                            item?.undiscountedPrice - item?.discountedPrice;
                        }
                        return (
                          <>
                            <div className={styles.orderRateLine}>
                              <span>{item?.text}</span>
                              <span className={styles.undiscountedOrderRate}>
                                Rs. {item?.undiscountedPrice}
                              </span>
                              <span>Rs. {item?.discountedPrice}</span>
                              {savingAmount && (
                                <span>(Save Rs.{savingAmount})</span>
                              )}
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.cardWrapper}>
          <div className={styles.infoCardWrapper}>
            <div className={styles.col1}>
              <div className={styles.radioInput}>
                <input
                  type="radio"
                  id={infocardName}
                  name="subscriptionoptions"
                  value={infocardName}
                  checked={selectedOption === infocardName}
                  onChange={e => onOptionChange(e)}
                />
              </div>
              <Image src={variantImage} width={75} height={75} />
              <div className={styles.cardTexts}>
                <h5>One Time Purchase</h5>
                <span>
                  {selectedVariantSizeAttributeValue?.split("__")[0]} X 15
                </span>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.pricing}>
                {getThisVariantPrice(selectedVariant)}
                <div className={styles.discountTag}>
                  {getVariantDiscount(selectedVariant)}% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={styles.containerWrapper}>
        <div className={`${styles.container}`}>
          {!learnMorePopup && (
            <div className={styles.header}>
              {subscriptionData?.header || "Subscribe & Save more"}
              <span className={styles.crossButton} onClick={onClose}>
                <MemoNewCartcloseIcon width={14} height={14} />
              </span>
            </div>
          )}
          <div>
            <>
              <>
                {learnMorePopup && (
                  <div className={styles.learnMorePopup}>
                    <div className={styles.learnMoreBgImage}>
                      <img src="https://plixlifefc-media.farziengineer.co/hosted/Group_35006-2235c917d69f.png" />
                    </div>
                    <div className={styles.learnmorePopupHeader}>
                      {learnMoreData?.header && (
                        <h3>{learnMoreData?.header}</h3>
                      )}
                      <span onClick={() => setLearnMorePopup(false)}>
                        <MemoLearnMoreCloseIcon />
                      </span>
                    </div>
                    <div>
                      <ul>
                        {Array.isArray(learnMoreData?.points) &&
                          learnMoreData?.points?.map(point => {
                            return (
                              <li>
                                <Markup content={point} />
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                )}
              </>
              {!learnMorePopup && (
                <>
                  {showOneTimePurchase ? (
                    <InfoCard
                      infocardName="oneTimePurchase"
                      subscriptionSectionData={subscriptionData}
                    />
                  ) : (
                    <></>
                  )}
                  <InfoCard
                    infocardName="subscription"
                    subscriptionSectionData={subscriptionData}
                    isSubscriptionCard
                  />
                </>
              )}
            </>
            <div className={styles.atcButtonWrapper}>
              <StyledAddToCartButton
                // onSubmit={disabled => {
                //   if (disabled) {
                //     if (typeof refetch === "function") {
                //       refetch().then(res =>
                //         onVariantPickerChange(
                //           undefined,
                //           res.data.product.variants[0]
                //         )
                //       );
                //     }
                //   } else {
                //     // handleAddToCart(variantId, 1);
                //     // return null;
                //     productAddedToCart(
                //       product.name,
                //       variantId,
                //       selectedVariant?.pricing?.price?.gross.amount,
                //       product.category,
                //       1
                //     );
                //   }
                // }}
                onSubmit={async (disabled, checkout) => {
                  setSubscriptionPopup({
                    isOpen: false,
                    showVariantOption: false,
                  });
                  if (selectedOption === "subscription" || learnMorePopup) {
                    // const updateCheckoutMetaRes = await updateCheckoutMeta();
                    const res = await client.query({
                      query: addTags,
                      variables: {
                        id: checkout?.id,
                        input: ["subscription_product"],
                      },
                      fetchPolicy: "no-cache",
                    });
                  }
                }}
                isSubscriptionProduct={selectedOption === "subscription"}
                productCheckoutMetadata={
                  selectedOption === "subscription"
                    ? [
                        {
                          key: "subscription_skus",
                          value: JSON.stringify(
                            getCheckoutMetaForSubscription(
                              variantWithCurrentFlavourAndSubscriptionSize,
                              checkout?.metadata,
                              "ADD"
                            )
                          ),
                        },
                      ]
                    : null
                }
                ctTitle={
                  typeof window !== "undefined" ? window?.navigated_from : ""
                }
                productListId={
                  typeof window !== "undefined" ? window?.navigated_from_id : ""
                }
                index={
                  typeof window !== "undefined" &&
                  typeof window.itemIndexFromList === "number"
                    ? window.itemIndexFromList
                    : "NA"
                }
                disabled={disableButton}
                itemAdded={itemAdded}
                size="md"
                page="pdp"
                mainText={
                  <span className={styles.atcText}>
                    Buy Now <MemoSideArrowTriangle />
                  </span>
                }
                loading={loading}
                productId={product?.id}
                showGoToCart={false}
                // rightIcon={<MemoPdpAddToCartPlix fontSize="24px" />}
                withIcons
                buttonClassName="desktopAddToCartPdp"
                variantId={
                  learnMorePopup
                    ? variantWithCurrentFlavourAndSubscriptionSize?.id
                    : selectedOption === "subscription"
                    ? variantWithCurrentFlavourAndSubscriptionSize?.id
                    : selectedVariant?.id
                }
                forcedDisable={product?.category?.name === "Upsell Products"}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ProductSubscriptionPopup.displayName = "ProductSubscriptionPopup";
export default ProductSubscriptionPopup;
