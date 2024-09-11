import React, { useEffect, useState } from "react";
import * as S from "./s";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import { ShopMetaContext } from "@temp/pages/_app";
import { useAuthState, useCartState, useCheckoutState } from "@saleor/sdk";
import MemoArtboard from "@components/atoms/SvgIcons/MemoArtboard";
import { Markup } from "interweave";
import { IProps } from "./types";
import MemoCompletedCouponIcon from "@components/atoms/SvgIcons/CompletedCouponIcon";
import MemoInCompleteCouponIcon from "@components/atoms/SvgIcons/IncompleteCouponIcon";
import Link from "next/link";
import MyCustomLink from "@components/next-react/MyCustomLink";

const BxGyProgressbar: React.FC<{
  checkoutLoading: any;
  isBoxInCart: any;
  handlePromoCodeApply: any;
  items: any;
  overlay: any;
}> = ({
  checkoutLoading,
  isBoxInCart,
  handlePromoCodeApply,
  items,
  overlay,
}) => {
  const { promoCodeDiscount, checkout } = useCheckoutState();

  const { subtotalPrice } = useCartState();
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const { user } = useAuthState();
  const [bxgyData, setBxgyData] = useState([]);
  const [nextData, setNextData] = useState(null);
  const offer_progressbar_data =
    getMetadataValue(ShopMetaContextValue, "bx_gy_offer_progress_bar") &&
    parseJson(
      getMetadataValue(ShopMetaContextValue, "bx_gy_offer_progress_bar")
    );
  const offersList =
    offer_progressbar_data && Array.isArray(offer_progressbar_data.offers)
      ? offer_progressbar_data.offers
      : [];
  const checkoutMetadata = checkout?.metadata || [];
  const discountedItemsBXGY =
    checkoutMetadata &&
    getMetadataValue(checkoutMetadata, "discounted_items") &&
    typeof parseJson(getMetadataValue(checkoutMetadata, "discounted_items")) ===
      "string"
      ? parseJson(
          getMetadataValue(checkoutMetadata, "discounted_items")?.replace(
            /'/g,
            '"'
          )
        )
      : parseJson(getMetadataValue(checkoutMetadata, "discounted_items"));

  useEffect(() => {
    if (items && items.length) {
      const bxgyMetaDatafilter = items.filter((item, i) => {
        const dd = item?.variant?.metadata;
        // const dd = item?.variant?.product?.metadata;
        const product_config_data =
          getMetadataValue(dd, "variant_config") &&
          parseJson(getMetadataValue(dd, "variant_config"));
        return product_config_data?.isBxGy;
      });
      const bxgyMetaData =
        Array.isArray(bxgyMetaDatafilter) &&
        bxgyMetaDatafilter.flatMap((item, index) => {
          // const dd = item?.variant?.product?.metadata;
          const dd = item?.variant?.metadata;
          const quantity = item?.quantity;
          const product_config_data =
            getMetadataValue(dd, "variant_config") &&
            parseJson(getMetadataValue(dd, "variant_config"));
          const isBxGy =
            product_config_data && product_config_data?.isBxGy
              ? product_config_data?.isBxGy
              : false;
          return Array.from({ length: quantity }, () => ({ isBxGy }));
        });
      // Update offersList with isBxGy key
      let updatedOffersList = [];

      offersList.forEach((offer, index) => {
        const isBxGy =
          index <= bxgyMetaData.length && bxgyMetaData[index]
            ? bxgyMetaData[index].isBxGy
            : false;
        updatedOffersList.push({
          isBxGy: isBxGy,
          ...offer,
        });
      });
      const bxgyLength = bxgyMetaData ? bxgyMetaData.length : 0;
      const updatedBxgyData =
        bxgyLength < 4 ? updatedOffersList.slice(0, 4) : updatedOffersList;

      // console.log({offersList,bxgyMetaData,updatedBxgyData,updatedOffersList})

      const sortData = Array.isArray(updatedBxgyData)
        ? updatedBxgyData.sort((a, b) => b.isBxGy - a.isBxGy)
        : [];
      setBxgyData(sortData);
      const findNextData = Array.isArray(updatedOffersList)
        ? updatedOffersList.filter((offer) => offer.isBxGy === true)
        : [];

      const nextDataList = findNextData.length
        ? findNextData.length > 1
          ? findNextData[findNextData.length - 1]
          : findNextData[0]
        : updatedBxgyData[0];
      setNextData(nextDataList);
    }
  }, [subtotalPrice?.gross?.amount, items]);

  const isCongratulationText = discountedItemsBXGY?.length ? true : false;
  return offer_progressbar_data?.enabled ? (
    <div className="bx-gy-container">
      <h4>{offer_progressbar_data?.title}</h4>
      <div className="bx-gy-progress-bar">
        {Array.isArray(bxgyData) ? (
          bxgyData.map((item, index) => {
            const isUnlocked = item.isBxGy;
            return (
              <div
                key={index}
                className={`progress-fill ${
                  isUnlocked ? "progress-complete" : "progress-incomplete"
                }`}
              >
                <span className={`progress-indicator`}></span>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      {nextData != null && nextData != "undefined" ? (
        <>
          <div className="applied-offer">
            <p>
              {isCongratulationText
                ? nextData?.afterText
                : nextData?.beforeText}
            </p>
            {!isCongratulationText && offer_progressbar_data.productUrl ? (
              <MyCustomLink
                href={offer_progressbar_data.productUrl}
                onClick={() => overlay.hide()}
              >
                + View Products
              </MyCustomLink>
            ) : (
              <></>
            )}
          </div>
          {isCongratulationText ? (
            <div className="upcoming-offer">
              <p>{nextData?.nextText}</p>
              {offer_progressbar_data.productUrl ? (
                <MyCustomLink
                  href={offer_progressbar_data.productUrl}
                  onClick={() => overlay.hide()}
                >
                  + View Products
                </MyCustomLink>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};
export default BxGyProgressbar;
